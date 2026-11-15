/* ============================================================================
 * src/nails-stage.js
 * 2.5D Interactive Nail Salon, Catwalk & Idol Dance Stage Show, and Offline
 * Web Audio API Synthesizer for the 2.5D Anime Princess Fashion Game.
 * Exports on window: SOUND_FX, NAIL_SALON, STAGE_SHOW, NAILS_STAGE_CSS
 * ============================================================================ */
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. OFFLINE WEB AUDIO API SYNTHESIZER (window.SOUND_FX)
  // --------------------------------------------------------------------------
  var audioCtx = null;
  var muted = false;
  var musicTimer = null;
  var musicMasterGain = null;
  var musicPlaying = false;
  var musicStep = 0;
  var nextNoteTime = 0;
  var noiseBufferCache = null;
  var muteListeners = [];

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      muted = window.localStorage.getItem('princess_sound_muted') === '1';
    }
  } catch (e) {
    muted = false;
  }

  function getAudioContext() {
    if (typeof window === 'undefined') return null;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try {
      if (!audioCtx) {
        audioCtx = new Ctx();
      }
      if (audioCtx.state === 'suspended' && typeof audioCtx.resume === 'function') {
        audioCtx.resume().catch(function () {});
      }
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function unlockAudio() {
    var ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      ctx.resume().catch(function () {});
    }
  }

  if (typeof document !== 'undefined') {
    ['pointerdown', 'touchstart', 'mousedown', 'keydown'].forEach(function (evt) {
      document.addEventListener(evt, unlockAudio, { passive: true, capture: true });
    });
  }

  function getNoiseBuffer(ctx) {
    if (noiseBufferCache && noiseBufferCache.sampleRate === ctx.sampleRate) {
      return noiseBufferCache;
    }
    var length = Math.floor(ctx.sampleRate * 2.0);
    var buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0;
    for (var i = 0; i < length; i++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.22;
    }
    noiseBufferCache = buffer;
    return buffer;
  }

  function playTone(ctx, dest, opts) {
    var now = opts.time || ctx.currentTime;
    var dur = opts.duration || 0.22;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, now);
    if (opts.endFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.endFreq), now + dur);
    }
    var peak = opts.gain || 0.12;
    var attack = opts.attack || 0.01;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  function playNoiseBurst(ctx, dest, opts) {
    var now = opts.time || ctx.currentTime;
    var dur = opts.duration || 0.12;
    var src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx);
    var filter = ctx.createBiquadFilter();
    filter.type = opts.filterType || 'bandpass';
    filter.frequency.setValueAtTime(opts.freq || 1400, now);
    if (opts.endFreq) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(80, opts.endFreq), now + dur);
    }
    filter.Q.value = opts.q || 1.2;
    var gain = ctx.createGain();
    var attack = opts.attack || 0.008;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(opts.gain || 0.15, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    src.start(now, opts.offset || 0, dur + 0.05);
  }

  // Princess Pop loop (~124 BPM -> 16th note = 0.12096s)
  var STEP_SEC = 60 / 124 / 4;
  // 32-step (2-bar) joyful princess idol melody (MIDI notes, 0 = rest)
  var MELODY_SEQ = [
    72, 0, 76, 79, 84, 0, 79, 0,  81, 0, 84, 83, 79, 0, 76, 0,
    77, 0, 81, 79, 76, 0, 72, 74, 76, 79, 84, 0, 88, 0, 84, 0
  ];
  var BASS_SEQ = [
    48, 0, 60, 0, 48, 0, 60, 0,  45, 0, 57, 0, 43, 0, 55, 0,
    41, 0, 53, 0, 48, 0, 60, 0,  43, 0, 55, 0, 48, 55, 48, 0
  ];
  var CHIME_CHORDS = {
    0: [72, 76, 79],
    8: [69, 72, 76],
    16: [65, 69, 72],
    24: [67, 71, 74]
  };

  function midiToHz(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function scheduleMusicStep(ctx, dest, step, time) {
    var idx = step % 32;
    var mel = MELODY_SEQ[idx];
    if (mel) {
      var freq = midiToHz(mel);
      playTone(ctx, dest, { time: time, freq: freq, duration: 0.24, type: 'triangle', gain: 0.12 });
      playTone(ctx, dest, { time: time, freq: freq * 2, duration: 0.14, type: 'sine', gain: 0.035 });
    }
    var bass = BASS_SEQ[idx];
    if (bass) {
      playTone(ctx, dest, { time: time, freq: midiToHz(bass), duration: 0.2, type: 'sine', gain: 0.14 });
    }
    if (CHIME_CHORDS[idx]) {
      CHIME_CHORDS[idx].forEach(function (note, nIdx) {
        playTone(ctx, dest, {
          time: time + nIdx * 0.03,
          freq: midiToHz(note + 12),
          duration: 0.42,
          type: 'sine',
          gain: 0.045
        });
      });
    }
    // Soft dance beat: kick on 0, 4, 8, 12... + sparkle hi-hat on off-beats
    if (idx % 4 === 0) {
      playTone(ctx, dest, {
        time: time,
        freq: 140,
        endFreq: 48,
        duration: 0.11,
        type: 'sine',
        gain: 0.16,
        attack: 0.004
      });
    } else if (idx % 2 === 0) {
      playNoiseBurst(ctx, dest, {
        time: time,
        freq: 6200,
        q: 2.2,
        duration: 0.045,
        gain: 0.045,
        attack: 0.002,
        filterType: 'highpass'
      });
    }
  }

  var SOUND_FX = {
    get isMuted() {
      return muted;
    },
    set isMuted(val) {
      SOUND_FX.setMuted(Boolean(val));
    },
    setMuted: function (bool) {
      muted = Boolean(bool);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('princess_sound_muted', muted ? '1' : '0');
        }
      } catch (e) {}
      if (musicMasterGain && audioCtx) {
        try {
          musicMasterGain.gain.setTargetAtTime(muted ? 0 : 0.48, audioCtx.currentTime, 0.03);
        } catch (e) {}
      }
      muteListeners.forEach(function (fn) {
        try { fn(muted); } catch (e) {}
      });
      return muted;
    },
    toggleMute: function () {
      return SOUND_FX.setMuted(!muted);
    },
    onMuteChange: function (fn) {
      if (typeof fn === 'function' && muteListeners.indexOf(fn) === -1) {
        muteListeners.push(fn);
      }
    },
    playPop: function () {
      if (muted) return;
      var ctx = getAudioContext();
      if (!ctx) return;
      try {
        var now = ctx.currentTime;
        playTone(ctx, ctx.destination, {
          time: now,
          freq: 330,
          endFreq: 760,
          duration: 0.075,
          type: 'sine',
          gain: 0.16,
          attack: 0.004
        });
        playTone(ctx, ctx.destination, {
          time: now + 0.025,
          freq: 880,
          endFreq: 540,
          duration: 0.06,
          type: 'sine',
          gain: 0.06,
          attack: 0.003
        });
      } catch (e) {}
    },
    playChime: function () {
      if (muted) return;
      var ctx = getAudioContext();
      if (!ctx) return;
      try {
        var now = ctx.currentTime;
        var notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];
        notes.forEach(function (freq, i) {
          var t = now + i * 0.048;
          playTone(ctx, ctx.destination, {
            time: t,
            freq: freq,
            duration: 0.45,
            type: 'sine',
            gain: 0.11
          });
          playTone(ctx, ctx.destination, {
            time: t,
            freq: freq * 2,
            duration: 0.25,
            type: 'triangle',
            gain: 0.03
          });
        });
      } catch (e) {}
    },
    playSparkle: function () {
      if (muted) return;
      var ctx = getAudioContext();
      if (!ctx) return;
      try {
        var now = ctx.currentTime;
        var notes = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0, 2349.32, 2637.02];
        notes.forEach(function (freq, i) {
          var t = now + i * 0.032;
          playTone(ctx, ctx.destination, {
            time: t,
            freq: freq,
            duration: 0.22,
            type: 'sine',
            gain: 0.075
          });
          playTone(ctx, ctx.destination, {
            time: t + 0.008,
            freq: freq * 1.5,
            duration: 0.14,
            type: 'triangle',
            gain: 0.025
          });
        });
      } catch (e) {}
    },
    playCamera: function () {
      if (muted) return;
      var ctx = getAudioContext();
      if (!ctx) return;
      try {
        var now = ctx.currentTime;
        playNoiseBurst(ctx, ctx.destination, {
          time: now,
          freq: 2600,
          endFreq: 900,
          duration: 0.045,
          gain: 0.22,
          attack: 0.002
        });
        playNoiseBurst(ctx, ctx.destination, {
          time: now + 0.06,
          freq: 2100,
          endFreq: 700,
          duration: 0.055,
          gain: 0.18,
          attack: 0.002
        });
        [1318.51, 1661.22, 1975.53, 2637.02].forEach(function (f, i) {
          playTone(ctx, ctx.destination, {
            time: now + 0.12 + i * 0.04,
            freq: f,
            duration: 0.32,
            type: 'sine',
            gain: 0.07
          });
        });
      } catch (e) {}
    },
    startShowMusic: function () {
      var ctx = getAudioContext();
      if (!ctx) return;
      SOUND_FX.stopShowMusic();
      try {
        musicPlaying = true;
        musicStep = 0;
        musicMasterGain = ctx.createGain();
        musicMasterGain.gain.setValueAtTime(muted ? 0 : 0.48, ctx.currentTime);
        musicMasterGain.connect(ctx.destination);
        nextNoteTime = ctx.currentTime + 0.06;

        musicTimer = setInterval(function () {
          if (!musicPlaying || !audioCtx || !musicMasterGain) return;
          if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(function () {});
          }
          while (nextNoteTime < audioCtx.currentTime + 0.22) {
            scheduleMusicStep(audioCtx, musicMasterGain, musicStep, nextNoteTime);
            nextNoteTime += STEP_SEC;
            musicStep++;
          }
        }, 70);
      } catch (e) {}
    },
    stopShowMusic: function () {
      musicPlaying = false;
      if (musicTimer) {
        clearInterval(musicTimer);
        musicTimer = null;
      }
      if (musicMasterGain && audioCtx) {
        var oldGain = musicMasterGain;
        musicMasterGain = null;
        try {
          var now = audioCtx.currentTime;
          oldGain.gain.setValueAtTime(oldGain.gain.value, now);
          oldGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
          setTimeout(function () {
            try { oldGain.disconnect(); } catch (e) {}
          }, 160);
        } catch (e) {}
      }
    },
    playApplause: function () {
      if (muted) return;
      var ctx = getAudioContext();
      if (!ctx) return;
      try {
        var now = ctx.currentTime;
        // Crowd cheer swell
        playNoiseBurst(ctx, ctx.destination, {
          time: now,
          freq: 1150,
          endFreq: 1650,
          q: 0.7,
          duration: 2.5,
          gain: 0.16,
          attack: 0.28,
          offset: 0.1
        });
        // Individual hand claps layered across stereo-like frequencies
        for (var i = 0; i < 20; i++) {
          var delay = 0.05 + i * 0.11 + (Math.random() * 0.05);
          playNoiseBurst(ctx, ctx.destination, {
            time: now + delay,
            freq: 1500 + Math.random() * 1400,
            endFreq: 800,
            q: 1.8,
            duration: 0.055 + Math.random() * 0.03,
            gain: 0.11 * (1 - i / 28),
            attack: 0.003,
            offset: Math.random() * 0.9
          });
        }
        // Royal victory fanfare chime
        [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach(function (f, idx) {
          playTone(ctx, ctx.destination, {
            time: now + 0.08 + idx * 0.08,
            freq: f,
            duration: 0.65,
            type: 'triangle',
            gain: 0.09
          });
        });
      } catch (e) {}
    }
  };

  // --------------------------------------------------------------------------
  // 2. SHARED CSS & STYLE INJECTOR (window.NAILS_STAGE_CSS)
  // --------------------------------------------------------------------------
  var NAILS_STAGE_CSS = [
    '/* === Nail Salon Modal === */',
    '#nail-salon-modal {',
    '  position: fixed; inset: 0; width: 100vw; height: var(--app-height, 100vh); min-height: var(--app-height, 100vh); z-index: 9000;',
    '  display: none; align-items: center; justify-content: center;',
    '  padding: 14px; box-sizing: border-box;',
    '  background: radial-gradient(circle at 50% 25%, rgba(255, 214, 240, 0.88), rgba(145, 58, 145, 0.78));',
    '  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);',
    '  font-family: "Quicksand", "Nunito", "Rounded Mplus 1c", system-ui, -apple-system, sans-serif;',
    '  user-select: none; -webkit-user-select: none; touch-action: manipulation;',
    '}',
    '#nail-salon-modal.open { display: flex; animation: nsPopIn 0.34s cubic-bezier(0.34, 1.56, 0.64, 1); }',
    '@keyframes nsPopIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }',
    '.ns-card {',
    '  width: min(980px, 100%); max-height: 94vh;',
    '  background: linear-gradient(155deg, #fff6fb 0%, #ffe6f4 55%, #f5e6ff 100%);',
    '  border: 4px solid #ffffff; border-radius: 32px;',
    '  box-shadow: 0 22px 60px rgba(138, 22, 92, 0.35), inset 0 4px 14px rgba(255,255,255,0.9);',
    '  display: flex; flex-direction: column; overflow: hidden; position: relative;',
    '}',
    '.ns-header {',
    '  display: flex; align-items: center; justify-content: space-between; gap: 10px;',
    '  padding: 12px 20px;',
    '  background: linear-gradient(90deg, #ff7eb9, #ff4da6, #c084fc);',
    '  color: #fff; box-shadow: 0 4px 14px rgba(255, 77, 166, 0.3);',
    '}',
    '.ns-title { font-size: clamp(18px, 2.5vw, 24px); font-weight: 800; letter-spacing: 0.3px; text-shadow: 0 2px 6px rgba(130, 0, 70, 0.35); margin: 0; }',
    '.ns-header-actions { display: flex; align-items: center; gap: 8px; }',
    '.ns-icon-pill {',
    '  border: 2.5px solid rgba(255,255,255,0.85); border-radius: 999px;',
    '  background: rgba(255,255,255,0.25); color: #fff; font-weight: 700;',
    '  font-size: 15px; padding: 6px 13px; cursor: pointer;',
    '  transition: transform 0.15s ease, background 0.15s ease;',
    '}',
    '.ns-icon-pill:active { transform: scale(0.92); }',
    '.ns-body {',
    '  display: grid; grid-template-columns: 1.05fr 1fr; gap: 16px;',
    '  padding: 16px 20px 18px; overflow-y: auto; align-items: center;',
    '}',
    '.ns-hand-stage {',
    '  position: relative; display: flex; flex-direction: column; align-items: center;',
    '  background: radial-gradient(circle at 50% 42%, #ffffff 0%, #ffe8f6 68%, #fbd0ee 100%);',
    '  border: 3px solid #fff; border-radius: 26px; padding: 10px 12px 12px;',
    '  box-shadow: inset 0 4px 16px rgba(255, 130, 195, 0.22), 0 8px 20px rgba(200, 80, 150, 0.14);',
    '}',
    '.ns-finger-hint {',
    '  background: linear-gradient(90deg, #ffecf6, #f4e6ff); border: 2px solid #ffc2e2;',
    '  color: #a61e69; font-weight: 800; font-size: 14px; padding: 5px 14px;',
    '  border-radius: 999px; margin-bottom: 4px; text-align: center;',
    '  box-shadow: 0 3px 8px rgba(255, 105, 180, 0.15);',
    '}',
    '.ns-hand-svg { width: 100%; max-width: 360px; height: auto; max-height: 330px; overflow: visible; filter: drop-shadow(0 10px 16px rgba(185, 70, 130, 0.2)); }',
    '.ns-finger-hit { cursor: pointer; touch-action: manipulation; }',
    '.ns-finger-visual { transition: transform 0.14s ease; }',
    '.ns-finger-hit:hover { filter: brightness(1.04); }',
    '.ns-finger-hit:active .ns-finger-visual { transform: scale(0.94); }',
    '.ns-finger-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; width: 100%; margin-top: 4px; }',
    '.ns-finger-pill {',
    '  border: 2px solid #ffd1e8; border-radius: 999px; background: #fff;',
    '  color: #9d2466; font-weight: 800; font-size: 12px; padding: 5px 10px;',
    '  cursor: pointer; transition: transform 0.14s ease, background 0.14s ease, color 0.14s ease;',
    '  box-shadow: 0 2px 6px rgba(210, 80, 150, 0.14);',
    '}',
    '.ns-finger-pill:active { transform: scale(0.94); }',
    '.ns-finger-pill.active {',
    '  background: linear-gradient(180deg, #ff7eb9 0%, #e11d88 100%); color: #fff;',
    '  border-color: #fff; box-shadow: 0 4px 10px rgba(225, 29, 136, 0.3);',
    '}',
    '.ns-halo-ring { animation: nsHaloPulse 1.3s ease-in-out infinite; pointer-events: none; }',
    '@keyframes nsHaloPulse { 0%,100% { opacity: 0.95; stroke-width: 3.5; } 50% { opacity: 0.45; stroke-width: 5.5; } }',
    '.ns-sparkle-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }',
    '.ns-burst-star {',
    '  position: absolute; font-size: 20px; pointer-events: none;',
    '  animation: nsBurst 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;',
    '}',
    '@keyframes nsBurst {',
    '  0% { opacity: 1; transform: translate(-50%, -50%) scale(0.4) rotate(0deg); }',
    '  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.25) rotate(140deg); }',
    '}',
    '.ns-hand-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; width: 100%; margin-top: 8px; }',
    '.ns-btn-all, .ns-btn-done {',
    '  border: 3px solid #fff; border-radius: 999px; cursor: pointer;',
    '  font-weight: 800; font-size: clamp(15px, 2vw, 17px); padding: 11px 20px;',
    '  color: #fff; box-shadow: 0 7px 18px rgba(255, 65, 155, 0.32), inset 0 2px 4px rgba(255,255,255,0.65);',
    '  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);',
    '}',
    '.ns-btn-all { background: linear-gradient(180deg, #ff99d6 0%, #ff4da6 100%); }',
    '.ns-btn-done { background: linear-gradient(180deg, #a78bfa 0%, #ec4899 100%); }',
    '.ns-btn-all:hover, .ns-btn-done:hover { transform: translateY(-2px) scale(1.03); }',
    '.ns-btn-all:active, .ns-btn-done:active { transform: scale(0.95); }',
    '.ns-controls-panel { display: flex; flex-direction: column; gap: 12px; height: 100%; }',
    '.ns-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }',
    '.ns-tab {',
    '  border: 3px solid #fff; border-radius: 18px; padding: 10px 6px;',
    '  background: #ffeaf5; color: #9d2466; font-weight: 800; font-size: 14px;',
    '  cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px;',
    '  box-shadow: 0 4px 10px rgba(210, 80, 150, 0.12); transition: all 0.18s ease;',
    '}',
    '.ns-tab-ico { font-size: 20px; line-height: 1.1; }',
    '.ns-tab.active {',
    '  background: linear-gradient(180deg, #ff6eb4 0%, #e11d88 100%); color: #fff;',
    '  transform: translateY(-2px); box-shadow: 0 7px 16px rgba(225, 29, 136, 0.32);',
    '}',
    '.ns-palette-grid {',
    '  display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px;',
    '  background: rgba(255,255,255,0.72); border: 2.5px solid #fff; border-radius: 22px;',
    '  padding: 12px; box-shadow: inset 0 2px 10px rgba(255, 160, 210, 0.15);',
    '}',
    '.ns-swatch-btn {',
    '  border: 2.5px solid #ffe0f0; border-radius: 18px; background: #fff;',
    '  padding: 8px 4px; display: flex; flex-direction: column; align-items: center; gap: 5px;',
    '  cursor: pointer; transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;',
    '}',
    '.ns-swatch-btn:hover { transform: translateY(-2px); border-color: #ff85c0; }',
    '.ns-swatch-btn:active { transform: scale(0.94); }',
    '.ns-swatch-btn.selected {',
    '  border-color: #ff2e93; background: #fff0f7;',
    '  box-shadow: 0 0 0 3px rgba(255, 46, 147, 0.22), 0 6px 14px rgba(255, 46, 147, 0.2);',
    '}',
    '.ns-color-orb {',
    '  width: 38px; height: 38px; border-radius: 50%; border: 2.5px solid #fff;',
    '  box-shadow: 0 3px 8px rgba(0,0,0,0.18), inset -4px -5px 8px rgba(0,0,0,0.18), inset 4px 5px 8px rgba(255,255,255,0.75);',
    '  position: relative; overflow: hidden;',
    '}',
    '.ns-swatch-label { font-size: 11.5px; font-weight: 800; color: #6d214f; text-align: center; line-height: 1.15; }',
    '@media (max-width: 760px) {',
    '  .ns-body { grid-template-columns: 1fr; padding: 10px 12px 14px; gap: 10px; }',
    '  .ns-hand-svg { max-height: 225px; max-width: 245px; }',
    '  .ns-palette-grid { grid-template-columns: repeat(4, 1fr); gap: 6px; padding: 8px; }',
    '  .ns-color-orb { width: 32px; height: 32px; }',
    '  .ns-swatch-label { font-size: 10.5px; }',
    '}',
    '',
    '/* === 2.5D Catwalk & Idol Dance Stage Show === */',
    '#stage-show-overlay {',
    '  position: fixed; inset: 0; width: 100vw; height: var(--app-height, 100vh); min-height: var(--app-height, 100vh); z-index: 9500; display: none;',
    '  overflow: hidden; background: radial-gradient(ellipse at 50% 28%, #5e1772 0%, #26093a 58%, #10031c 100%);',
    '  font-family: "Quicksand", "Nunito", system-ui, -apple-system, sans-serif;',
    '  user-select: none; -webkit-user-select: none;',
    '}',
    '#stage-show-overlay.active { display: block; animation: stgFadeIn 0.35s ease; }',
    '@keyframes stgFadeIn { from { opacity: 0; } to { opacity: 1; } }',
    '.stg-backdrop { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }',
    '.stg-star {',
    '  position: absolute; border-radius: 50%; background: #fff;',
    '  box-shadow: 0 0 8px #ffd6fa; animation: stgTwinkle var(--dur, 2.2s) ease-in-out infinite;',
    '}',
    '@keyframes stgTwinkle { 0%,100% { opacity: 0.25; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.25); } }',
    '.stg-bokeh {',
    '  position: absolute; border-radius: 50%; filter: blur(2px); opacity: 0.35;',
    '  animation: stgBokehFloat var(--dur, 7s) linear infinite;',
    '}',
    '@keyframes stgBokehFloat {',
    '  0% { transform: translateY(105vh) scale(0.7); opacity: 0; }',
    '  15% { opacity: 0.38; } 85% { opacity: 0.38; }',
    '  100% { transform: translateY(-15vh) scale(1.15); opacity: 0; }',
    '}',
    '.stg-arch {',
    '  position: absolute; top: 7%; left: 50%; transform: translateX(-50%);',
    '  width: min(560px, 86vw); height: 220px;',
    '  border-radius: 280px 280px 0 0; border: 5px solid rgba(255, 200, 240, 0.55); border-bottom: none;',
    '  box-shadow: 0 0 36px rgba(255, 90, 190, 0.55), inset 0 0 30px rgba(255, 190, 240, 0.35);',
    '  display: flex; justify-content: center; align-items: flex-start; padding-top: 14px;',
    '}',
    '.stg-neon-badge {',
    '  background: linear-gradient(90deg, #ff4da6, #ffd700, #ff4da6);',
    '  -webkit-background-clip: text; background-clip: text; color: transparent;',
    '  font-weight: 900; font-size: clamp(16px, 2.6vw, 24px); letter-spacing: 3px;',
    '  filter: drop-shadow(0 0 10px rgba(255, 120, 210, 0.85));',
    '}',
    '.stg-spotlights { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; }',
    '.stg-beam {',
    '  position: absolute; top: -10%; width: 42vw; height: 120vh; transform-origin: 50% 0%;',
    '  clip-path: polygon(45% 0%, 55% 0%, 96% 100%, 4% 100%);',
    '}',
    '.stg-beam-left {',
    '  left: 8%; background: linear-gradient(180deg, rgba(255,190,245,0.52) 0%, rgba(255,110,200,0.06) 85%, transparent 100%);',
    '  animation: stgSweepLeft 4.4s ease-in-out infinite alternate;',
    '}',
    '.stg-beam-right {',
    '  right: 8%; background: linear-gradient(180deg, rgba(160,235,255,0.48) 0%, rgba(190,130,255,0.06) 85%, transparent 100%);',
    '  animation: stgSweepRight 4.4s ease-in-out infinite alternate;',
    '}',
    '.stg-beam-center {',
    '  left: 29%; background: linear-gradient(180deg, rgba(255,245,185,0.45) 0%, rgba(255,200,120,0.08) 85%, transparent 100%);',
    '  animation: stgPulseCenter 2.4s ease-in-out infinite;',
    '}',
    '@keyframes stgSweepLeft { from { transform: rotate(-16deg); } to { transform: rotate(14deg); } }',
    '@keyframes stgSweepRight { from { transform: rotate(16deg); } to { transform: rotate(-14deg); } }',
    '@keyframes stgPulseCenter { 0%,100% { opacity: 0.65; } 50% { opacity: 1; } }',
    '.stg-runway-wrap {',
    '  position: absolute; left: 0; right: 0; bottom: 0; height: 52vh;',
    '  perspective: 620px; pointer-events: none; overflow: hidden;',
    '}',
    '.stg-runway-floor {',
    '  position: absolute; left: 50%; bottom: -4vh;',
    '  width: min(680px, 118vw); height: 78vh;',
    '  transform: translateX(-50%) rotateX(62deg); transform-origin: 50% 100%;',
    '  background: linear-gradient(180deg, #ff70c8 0%, #c0268d 32%, #6e0f58 75%, #3c0633 100%);',
    '  border-left: 12px solid #ffd76a; border-right: 12px solid #ffd76a;',
    '  box-shadow: 0 0 55px rgba(255, 80, 190, 0.75), inset 0 0 40px rgba(255, 220, 250, 0.35);',
    '}',
    '.stg-runway-sheen {',
    '  position: absolute; inset: 0 28%;',
    '  background: linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,190,240,0.12) 60%, transparent);',
    '}',
    '.stg-runway-lights {',
    '  position: absolute; top: 0; bottom: 0; width: 10px;',
    '  background-image: radial-gradient(circle, #fff8c9 40%, #ffcf33 65%, transparent 72%);',
    '  background-size: 10px 36px; animation: stgLightsChase 0.9s linear infinite;',
    '}',
    '.stg-runway-lights.left { left: -11px; }',
    '.stg-runway-lights.right { right: -11px; }',
    '@keyframes stgLightsChase { from { background-position-y: 0; } to { background-position-y: 36px; } }',
    '.stg-performer-anchor {',
    '  position: absolute; left: 50%; bottom: 7vh; transform: translateX(-50%);',
    '  width: min(360px, 68vw); height: min(560px, 72vh);',
    '  display: flex; align-items: flex-end; justify-content: center; pointer-events: none; z-index: 4;',
    '}',
    '.stg-performer-mover {',
    '  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;',
    '  transform-origin: 50% 88%; will-change: transform;',
    '  filter: drop-shadow(0 16px 26px rgba(18, 0, 32, 0.55));',
    '}',
    '.stg-performer-mover svg { width: 100%; height: 100%; max-height: 100%; overflow: visible; }',
    '.stg-floor-aura {',
    '  position: absolute; left: 50%; bottom: 4vh; transform: translateX(-50%);',
    '  width: 240px; height: 56px; border-radius: 50%;',
    '  background: radial-gradient(ellipse, rgba(255,240,180,0.75) 0%, rgba(255,105,190,0.4) 52%, transparent 75%);',
    '  z-index: 3; pointer-events: none;',
    '}',
    '.stg-crowd {',
    '  position: absolute; left: 0; right: 0; bottom: -6px; height: 110px;',
    '  display: flex; justify-content: space-between; padding: 0 2vw; pointer-events: none; z-index: 6;',
    '}',
    '.stg-crowd-side { display: flex; align-items: flex-end; gap: 6px; }',
    '.stg-fan {',
    '  width: 44px; height: 68px; position: relative;',
    '  animation: stgFanBounce 0.48s ease-in-out infinite alternate;',
    '}',
    '.stg-fan:nth-child(2n) { animation-delay: 0.24s; height: 74px; }',
    '@keyframes stgFanBounce { from { transform: translateY(4px); } to { transform: translateY(-8px); } }',
    '.stg-glowstick {',
    '  position: absolute; top: -18px; right: 4px; width: 6px; height: 26px; border-radius: 4px;',
    '  transform-origin: 50% 100%; animation: stgWaveStick 0.48s ease-in-out infinite alternate;',
    '}',
    '@keyframes stgWaveStick { from { transform: rotate(-28deg); } to { transform: rotate(24deg); } }',
    '.stg-curtain {',
    '  position: absolute; top: 0; bottom: 0; width: 52vw; z-index: 8; pointer-events: none;',
    '  background: repeating-linear-gradient(90deg, #740024 0px, #c80842 22px, #92002c 44px, #58001a 60px);',
    '  box-shadow: inset 0 0 60px rgba(0,0,0,0.55);',
    '  transition: transform 1.25s cubic-bezier(0.22, 1, 0.36, 1);',
    '}',
    '.stg-curtain.left { left: 0; border-right: 8px solid #ffd86b; }',
    '.stg-curtain.right { right: 0; border-left: 8px solid #ffd86b; }',
    '.stg-curtain.left.open { transform: translateX(-89%); }',
    '.stg-curtain.right.open { transform: translateX(89%); }',
    '.stg-curtain-valance {',
    '  position: absolute; top: 0; left: 0; right: 0; height: 34px; z-index: 9; pointer-events: none;',
    '  background: linear-gradient(180deg, #980030 0%, #60001d 85%);',
    '  border-bottom: 4px solid #ffd86b; box-shadow: 0 6px 18px rgba(0,0,0,0.45);',
    '}',
    '.stg-fx-layer { position: absolute; inset: 0; pointer-events: none; z-index: 7; overflow: hidden; }',
    '.stg-float-emote {',
    '  position: absolute; font-size: 26px; pointer-events: none;',
    '  animation: stgFloatEmote 1.4s ease-out forwards;',
    '}',
    '@keyframes stgFloatEmote {',
    '  0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); }',
    '  20% { opacity: 1; transform: translate(-50%, -25px) scale(1.15); }',
    '  100% { opacity: 0; transform: translate(calc(-50% + var(--drift, 0px)), -150px) scale(0.95); }',
    '}',
    '.stg-confetti-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }',
    '.stg-flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; z-index: 11; }',
    '.stg-flash.boom { animation: stgCameraFlash 0.55s ease-out; }',
    '@keyframes stgCameraFlash { 0% { opacity: 0.85; } 100% { opacity: 0; } }',
    '.stg-hud {',
    '  position: absolute; top: max(14px, env(safe-area-inset-top)); left: 16px; right: 16px;',
    '  display: flex; align-items: center; justify-content: space-between; gap: 10px;',
    '  z-index: 15; pointer-events: none;',
    '}',
    '.stg-hud-group { display: flex; align-items: center; gap: 8px; pointer-events: auto; }',
    '.stg-pill-btn {',
    '  border: 2.5px solid rgba(255,255,255,0.88); border-radius: 999px;',
    '  background: rgba(66, 12, 74, 0.72); color: #fff; font-weight: 800;',
    '  font-size: 14px; padding: 8px 14px; cursor: pointer;',
    '  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);',
    '  box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.14s ease;',
    '}',
    '.stg-pill-btn:active { transform: scale(0.92); }',
    '.stg-phase-pill {',
    '  background: linear-gradient(90deg, rgba(255,77,166,0.88), rgba(168,85,247,0.88));',
    '  border: 2px solid rgba(255,255,255,0.85); color: #fff; font-weight: 800;',
    '  font-size: clamp(13px, 2vw, 16px); padding: 7px 16px; border-radius: 999px;',
    '  box-shadow: 0 4px 16px rgba(255, 77, 166, 0.45);',
    '}',
    '.stg-trophy-card {',
    '  position: absolute; left: 50%; top: 15%; transform: translate(-50%, 0) scale(0.5);',
    '  opacity: 0; pointer-events: none; z-index: 14;',
    '  width: min(410px, 88vw); padding: 18px 22px 20px; border-radius: 30px;',
    '  background: linear-gradient(155deg, rgba(255,248,253,0.96), rgba(255,224,244,0.96));',
    '  border: 4px solid #ffd86b; text-align: center;',
    '  box-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 0 36px rgba(255, 208, 70, 0.65);',
    '  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;',
    '}',
    '.stg-trophy-card.show { opacity: 1; pointer-events: auto; transform: translate(-50%, 0) scale(1); }',
    '.stg-trophy-stars { font-size: 28px; letter-spacing: 4px; margin: 2px 0 4px; filter: drop-shadow(0 2px 4px rgba(255,170,0,0.5)); }',
    '.stg-trophy-title { margin: 4px 0; font-size: clamp(20px, 3vw, 26px); font-weight: 900; color: #b91c7c; }',
    '.stg-trophy-sub { margin: 0 0 14px; font-size: 14px; font-weight: 700; color: #7e22ce; }',
    '.stg-trophy-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }',
    '.stg-action-btn {',
    '  border: 3px solid #fff; border-radius: 999px; padding: 11px 20px;',
    '  font-size: 15px; font-weight: 800; color: #fff; cursor: pointer;',
    '  box-shadow: 0 6px 16px rgba(185, 28, 124, 0.35); transition: transform 0.15s ease;',
    '}',
    '.stg-action-btn.replay { background: linear-gradient(180deg, #ff85c0, #e11d88); }',
    '.stg-action-btn.back { background: linear-gradient(180deg, #8b5cf6, #6d28d9); }',
    '.stg-action-btn:hover { transform: translateY(-2px) scale(1.03); }',
    '.stg-action-btn:active { transform: scale(0.95); }',
    '@media (max-width: 760px) {',
    '  .stg-trophy-card { top: auto; bottom: 10%; }',
    '  .stg-phase-pill { display: none; }',
    '}'
  ].join('\n');

  function ensureStyles() {
    if (typeof document === 'undefined' || !document.head) return;
    if (document.getElementById('nails-stage-styles')) return;
    var style = document.createElement('style');
    style.id = 'nails-stage-styles';
    style.textContent = NAILS_STAGE_CSS;
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE 2.5D NAIL SALON (window.NAIL_SALON)
  // --------------------------------------------------------------------------
  var NAIL_COLORS = [
    { id: 'barbie-pink', name: 'Hồng Barbie', color: '#ff4da6', highlight: '#ffd1ea' },
    { id: 'strawberry-red', name: 'Đỏ Dâu', color: '#ff2e55', highlight: '#ffbdcb' },
    { id: 'lavender', name: 'Tím Oải Hương', color: '#b388ff', highlight: '#ece0ff' },
    { id: 'ice-blue', name: 'Xanh Băng Tuyết', color: '#66d9ff', highlight: '#dff8ff' },
    { id: 'gold-metallic', name: 'Vàng Ánh Kim', color: '#ffd23f', highlight: '#fff7cc' },
    { id: 'peach-pink', name: 'Hồng Đào', color: '#ff9a8b', highlight: '#ffe2dc' },
    { id: 'mint', name: 'Bạc Hà', color: '#5ef2c0', highlight: '#dcfff2' },
    { id: 'coral', name: 'Cam San Hô', color: '#ff785a', highlight: '#ffdcd4' },
    { id: 'pastel-pink', name: 'Hồng Phấn', color: '#ffb6d9', highlight: '#fff0f8' },
    { id: 'pearl-white', name: 'Ngọc Trai Trắng', color: '#fff4fa', highlight: '#ffffff' },
    { id: 'rainbow-glitter', name: 'Cầu Vồng Nhũ', color: '#ff73c6', highlight: '#ffffff', rainbow: true, glitter: true },
    { id: 'black-sequin', name: 'Đen Kim Sa', color: '#241d38', highlight: '#e5d4ff', glitter: true }
  ];

  var NAIL_PATTERNS = [
    { id: 'glossy', name: 'Trơn Bóng' },
    { id: 'french', name: 'Đầu Móng French' },
    { id: 'glitter', name: 'Nhũ Kim Tuyến' },
    { id: 'dots', name: 'Chấm Bi' },
    { id: 'hearts', name: 'Trái Tim' },
    { id: 'stars', name: 'Ngôi Sao' }
  ];

  var NAIL_CHARMS = [
    { id: 'none', name: 'Không gắn' },
    { id: 'crown', name: 'Vương miện vàng' },
    { id: 'heart_gem', name: 'Trái tim pha lê' },
    { id: 'bow', name: 'Nơ hồng' },
    { id: 'sakura', name: 'Hoa anh đào' },
    { id: 'butterfly', name: 'Bướm tím' },
    { id: 'diamond', name: 'Kim cương' },
    { id: 'star', name: 'Ngôi sao vàng' },
    { id: 'pearl', name: 'Ngọc trai' },
    { id: 'shooting_star', name: 'Ngôi sao băng' },
    { id: 'strawberry', name: 'Dâu tây' },
    { id: 'kitty', name: 'Mèo con' }
  ];

  var FINGER_NAMES = ['Ngón Cái', 'Ngón Trỏ', 'Ngón Giữa', 'Ngón Áp Út', 'Ngón Út'];

  // Exact placement of each nail on the 420x440 2.5D princess hand
  var HAND_NAILS_GEOM = [
    { idx: 0, cx: 88, cy: 235, rot: -40, sx: 1.0, sy: 0.94 },
    { idx: 1, cx: 141, cy: 112, rot: -8, sx: 0.96, sy: 1.0 },
    { idx: 2, cx: 204, cy: 88, rot: 0, sx: 1.04, sy: 1.05 },
    { idx: 3, cx: 266, cy: 111, rot: 8, sx: 0.96, sy: 1.0 },
    { idx: 4, cx: 318, cy: 162, rot: 15, sx: 0.85, sy: 0.88 }
  ];

  // Standardized almond nail path centered at (0,0), width ~28 (-14..14), height ~38 (-19..19)
  var NAIL_ALMOND_PATH = 'M 0,-19 C 9,-19 14,-11 14,3 C 14,13 9,19 0,19 C -9,19 -14,13 -14,3 C -14,-11 -9,-19 0,-19 Z';

  function getColorDef(nailObj) {
    if (!nailObj) return NAIL_COLORS[0];
    if (nailObj.color === 'rainbow') return NAIL_COLORS[10];
    for (var i = 0; i < NAIL_COLORS.length; i++) {
      if (nailObj.colorId && NAIL_COLORS[i].id === nailObj.colorId) return NAIL_COLORS[i];
    }
    for (var j = 0; j < NAIL_COLORS.length; j++) {
      if (NAIL_COLORS[j].color.toLowerCase() === String(nailObj.color || '').toLowerCase()) return NAIL_COLORS[j];
    }
    return { id: 'custom', name: 'Tùy Chọn', color: nailObj.color || '#ff4da6', highlight: '#ffffff' };
  }

  function renderPatternMarkup(patternId, isDarkBase) {
    var ink = isDarkBase ? '#fff4b8' : '#ffffff';
    var accent = isDarkBase ? '#ff85c0' : '#ffd86b';
    switch (patternId) {
      case 'french':
        return '<path d="M -15,-19 L 15,-19 L 15,-6 C 8,-10 -8,-10 -15,-6 Z" fill="#fffafd" opacity="0.95"/>' +
               '<path d="M -13,-6 C -6,-10 6,-10 13,-6" fill="none" stroke="' + accent + '" stroke-width="1.3" opacity="0.85"/>';
      case 'glitter':
        return '<circle cx="-6" cy="-11" r="1.5" fill="' + ink + '" opacity="0.9"/>' +
               '<circle cx="5" cy="-13" r="1.8" fill="' + accent + '" opacity="0.95"/>' +
               '<circle cx="0" cy="-6" r="1.3" fill="' + ink + '" opacity="0.85"/>' +
               '<circle cx="-7" cy="2" r="1.6" fill="#ff9fe5" opacity="0.9"/>' +
               '<circle cx="6" cy="4" r="1.5" fill="' + ink + '" opacity="0.9"/>' +
               '<circle cx="-2" cy="11" r="1.2" fill="' + accent + '" opacity="0.85"/>' +
               '<path d="M 4,-4 L 5,-1 L 8,0 L 5,1 L 4,4 L 3,1 L 0,0 L 3,-1 Z" fill="#ffffff" opacity="0.95"/>' +
               '<path d="M -5,-8 L -4.3,-6 L -2.3,-5.3 L -4.3,-4.6 L -5,-2.6 L -5.7,-4.6 L -7.7,-5.3 L -5.7,-6 Z" fill="#fff7b2" opacity="0.95"/>';
      case 'dots':
        return '<circle cx="-5" cy="-10" r="2.3" fill="' + ink + '" opacity="0.92"/>' +
               '<circle cx="5" cy="-8" r="2.0" fill="' + accent + '" opacity="0.92"/>' +
               '<circle cx="0" cy="0" r="2.4" fill="' + ink + '" opacity="0.92"/>' +
               '<circle cx="-6" cy="8" r="2.1" fill="' + accent + '" opacity="0.92"/>' +
               '<circle cx="5" cy="9" r="2.3" fill="' + ink + '" opacity="0.92"/>';
      case 'hearts':
        return '<path d="M -4,-9 C -4,-11.5 -7.5,-11.5 -7.5,-8.8 C -7.5,-6.5 -4,-4.5 -4,-4.5 C -4,-4.5 -0.5,-6.5 -0.5,-8.8 C -0.5,-11.5 -4,-11.5 -4,-9 Z" fill="' + ink + '" opacity="0.94"/>' +
               '<path d="M 4,0 C 4,-2.5 0.5,-2.5 0.5,0.2 C 0.5,2.5 4,4.5 4,4.5 C 4,4.5 7.5,2.5 7.5,0.2 C 7.5,-2.5 4,-2.5 4,0 Z" fill="' + accent + '" opacity="0.95"/>' +
               '<path d="M -3,9 C -3,7 -6,7 -6,9.2 C -6,11.2 -3,12.8 -3,12.8 C -3,12.8 0,11.2 0,9.2 C 0,7 -3,7 -3,9 Z" fill="' + ink + '" opacity="0.9"/>';
      case 'stars':
        return '<path d="M -4,-13 L -2.7,-9.8 L 0.6,-9.5 L -2,-7.3 L -1.2,-4 L -4,-5.8 L -6.8,-4 L -6,-7.3 L -8.6,-9.5 L -5.3,-9.8 Z" fill="' + accent + '"/>' +
               '<path d="M 5,-3 L 6,-0.5 L 8.6,-0.3 L 6.6,1.4 L 7.2,4 L 5,2.6 L 2.8,4 L 3.4,1.4 L 1.4,-0.3 L 4,-0.5 Z" fill="' + ink + '"/>' +
               '<path d="M -3,6 L -2.2,8 L 0,8.2 L -1.7,9.6 L -1.2,11.8 L -3,10.6 L -4.8,11.8 L -4.3,9.6 L -6,8.2 L -3.8,8 Z" fill="' + ink + '"/>';
      default:
        return '';
    }
  }

  function renderCharmSvg(charmId) {
    switch (charmId) {
      case 'crown':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M -9,5 L -10,-4 L -4,0 L 0,-7 L 4,0 L 10,-4 L 9,5 Z" fill="#ffd43b" stroke="#b45309" stroke-width="1"/>' +
          '<rect x="-9" y="4" width="18" height="3" rx="1.2" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>' +
          '<circle cx="0" cy="-7" r="1.7" fill="#ff3b8b"/><circle cx="-10" cy="-4" r="1.4" fill="#38bdf8"/><circle cx="10" cy="-4" r="1.4" fill="#38bdf8"/>' +
          '<circle cx="0" cy="1.8" r="1.8" fill="#ff3b8b"/>' +
          '</g>';
      case 'heart_gem':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M 0,-4 C 0,-8.5 -8,-8.5 -8,-2.5 C -8,3 0,8.5 0,8.5 C 0,8.5 8,3 8,-2.5 C 8,-8.5 0,-8.5 0,-4 Z" fill="#ff2e83" stroke="#ffd8ec" stroke-width="1.2"/>' +
          '<path d="M -4,-4 L 0,-1 L 4,-4 L 2,2 L 0,6 L -2,2 Z" fill="#ff94c2" opacity="0.72"/>' +
          '<circle cx="-3.5" cy="-3.8" r="1.3" fill="#ffffff" opacity="0.9"/>' +
          '</g>';
      case 'bow':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M -2,1 L -6,8 L -2,6 Z M 2,1 L 6,8 L 2,6 Z" fill="#ff4da6" stroke="#be185d" stroke-width="0.7"/>' +
          '<path d="M 0,0 C -5,-6 -11,-4 -10,1 C -10,5 -4,4 0,1 Z" fill="#ff74bc" stroke="#be185d" stroke-width="0.9"/>' +
          '<path d="M 0,0 C 5,-6 11,-4 10,1 C 10,5 4,4 0,1 Z" fill="#ff74bc" stroke="#be185d" stroke-width="0.9"/>' +
          '<circle cx="0" cy="0.5" r="2.5" fill="#fff5fa" stroke="#ff4da6" stroke-width="1"/>' +
          '</g>';
      case 'sakura':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<g fill="#ffb3d9" stroke="#ec4899" stroke-width="0.7">' +
          '<ellipse cx="0" cy="-5.2" rx="3.2" ry="4.5" transform="rotate(0)"/>' +
          '<ellipse cx="0" cy="-5.2" rx="3.2" ry="4.5" transform="rotate(72)"/>' +
          '<ellipse cx="0" cy="-5.2" rx="3.2" ry="4.5" transform="rotate(144)"/>' +
          '<ellipse cx="0" cy="-5.2" rx="3.2" ry="4.5" transform="rotate(216)"/>' +
          '<ellipse cx="0" cy="-5.2" rx="3.2" ry="4.5" transform="rotate(288)"/>' +
          '</g>' +
          '<circle cx="0" cy="0" r="2.3" fill="#ffd43b"/>' +
          '</g>';
      case 'butterfly':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M -1,0 C -6,-8 -11,-5 -9,0 C -8,3 -4,2 -1,1 Z" fill="#c084fc" stroke="#7e22ce" stroke-width="0.8"/>' +
          '<path d="M 1,0 C 6,-8 11,-5 9,0 C 8,3 4,2 1,1 Z" fill="#c084fc" stroke="#7e22ce" stroke-width="0.8"/>' +
          '<path d="M -1,1 C -7,2 -8,7 -4,7 C -2,7 -1,4 -1,2 Z" fill="#e9d5ff" stroke="#7e22ce" stroke-width="0.7"/>' +
          '<path d="M 1,1 C 7,2 8,7 4,7 C 2,7 1,4 1,2 Z" fill="#e9d5ff" stroke="#7e22ce" stroke-width="0.7"/>' +
          '<ellipse cx="0" cy="1.5" rx="1.2" ry="4.5" fill="#fff7ed" stroke="#7e22ce" stroke-width="0.7"/>' +
          '</g>';
      case 'diamond':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<polygon points="-6,-5 6,-5 9,0 0,8 -9,0" fill="#7dd3fc" stroke="#ffffff" stroke-width="1.2"/>' +
          '<polygon points="-4,-5 4,-5 5,0 0,6 -5,0" fill="#e0f2fe" opacity="0.85"/>' +
          '<line x1="-9" y1="0" x2="9" y2="0" stroke="#0284c7" stroke-width="0.8"/>' +
          '<line x1="-4" y1="-5" x2="0" y2="8" stroke="#bae6fd" stroke-width="0.8"/>' +
          '<line x1="4" y1="-5" x2="0" y2="8" stroke="#bae6fd" stroke-width="0.8"/>' +
          '</g>';
      case 'star':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M 0,-9 L 2.6,-3.2 L 9,-2.4 L 4.2,2 L 5.5,8.2 L 0,5 L -5.5,8.2 L -4.2,2 L -9,-2.4 L -2.6,-3.2 Z" fill="#ffd43b" stroke="#d97706" stroke-width="0.9"/>' +
          '<circle cx="-1.5" cy="-2" r="1.4" fill="#ffffff" opacity="0.85"/>' +
          '</g>';
      case 'pearl':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<circle cx="-5.5" cy="0" r="1.4" fill="#fbbf24"/><circle cx="5.5" cy="0" r="1.4" fill="#fbbf24"/>' +
          '<circle cx="0" cy="-5.5" r="1.4" fill="#fbbf24"/><circle cx="0" cy="5.5" r="1.4" fill="#fbbf24"/>' +
          '<circle cx="0" cy="0" r="4.8" fill="#fff7fb" stroke="#f9a8d4" stroke-width="0.9"/>' +
          '<circle cx="-1.6" cy="-1.7" r="1.6" fill="#ffffff"/>' +
          '</g>';
      case 'shooting_star':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M -8,6 Q -2,2 2,-1" fill="none" stroke="#ffd43b" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M -7,3 Q -2,0 1,-2" fill="none" stroke="#ff70c8" stroke-width="1.4" stroke-linecap="round"/>' +
          '<path d="M 3,-7 L 4.6,-3.3 L 8.5,-2.8 L 5.6,-0.2 L 6.4,3.6 L 3,1.7 L -0.4,3.6 L 0.4,-0.2 L -2.5,-2.8 L 1.4,-3.3 Z" fill="#ffe066" stroke="#d97706" stroke-width="0.7"/>' +
          '</g>';
      case 'strawberry':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M 0,-4 C 5,-4 7,0 5,4.5 C 3.5,7.5 1.5,8.5 0,8.5 C -1.5,8.5 -3.5,7.5 -5,4.5 C -7,0 -5,-4 0,-4 Z" fill="#ff2e63" stroke="#be123c" stroke-width="0.8"/>' +
          '<path d="M -4,-4 L -1,-7 L 0,-4 L 1,-7 L 4,-4 L 0,-2.5 Z" fill="#4ade80" stroke="#15803d" stroke-width="0.7"/>' +
          '<circle cx="-2" cy="0" r="0.7" fill="#fef08a"/><circle cx="2" cy="0.5" r="0.7" fill="#fef08a"/>' +
          '<circle cx="0" cy="3.5" r="0.7" fill="#fef08a"/><circle cx="-1.8" cy="5" r="0.7" fill="#fef08a"/>' +
          '</g>';
      case 'kitty':
        return '<g filter="url(#ns-charm-shadow)">' +
          '<path d="M -7,-2 L -8,-8 L -3,-5 C -1,-5.5 1,-5.5 3,-5 L 8,-8 L 7,-2 C 8.5,1 7,6 0,6 C -7,6 -8.5,1 -7,-2 Z" fill="#ffffff" stroke="#e11d88" stroke-width="0.9"/>' +
          '<circle cx="-3" cy="0.5" r="0.9" fill="#334155"/><circle cx="3" cy="0.5" r="0.9" fill="#334155"/>' +
          '<ellipse cx="0" cy="2" rx="1.2" ry="0.8" fill="#fbbf24"/>' +
          '<circle cx="-4.5" cy="2.2" r="1.2" fill="#fda4af" opacity="0.7"/><circle cx="4.5" cy="2.2" r="1.2" fill="#fda4af" opacity="0.7"/>' +
          '<circle cx="-4.5" cy="-5" r="2" fill="#ff4da6"/>' +
          '</g>';
      default:
        return '';
    }
  }

  var nailState = {
    containerEl: null,
    getState: null,
    onUpdate: null,
    onClose: null,
    activeTab: 'color',
    selectedFinger: 1,
    activeBrush: {
      color: NAIL_COLORS[0].color,
      colorId: NAIL_COLORS[0].id,
      pattern: 'glossy',
      charm: 'none'
    },
    modalEl: null
  };

  function defaultNailsArray() {
    return [0, 1, 2, 3, 4].map(function () {
      return {
        color: NAIL_COLORS[0].color,
        colorId: NAIL_COLORS[0].id,
        pattern: 'glossy',
        charm: 'none'
      };
    });
  }

  function getNormalizedNails() {
    var st = typeof nailState.getState === 'function' ? nailState.getState() : null;
    if (!st) {
      if (!nailState._fallbackState) {
        nailState._fallbackState = { nails: defaultNailsArray() };
      }
      st = nailState._fallbackState;
    }
    if (!Array.isArray(st.nails) || st.nails.length !== 5) {
      var prev = Array.isArray(st.nails) ? st.nails : [];
      st.nails = [0, 1, 2, 3, 4].map(function (i) {
        var item = prev[i];
        if (item && typeof item === 'object') {
          var def = getColorDef(item);
          return {
            color: item.color || def.color,
            colorId: item.colorId || def.id,
            pattern: item.pattern || 'glossy',
            charm: item.charm || 'none'
          };
        }
        return {
          color: NAIL_COLORS[0].color,
          colorId: NAIL_COLORS[0].id,
          pattern: 'glossy',
          charm: 'none'
        };
      });
    }
    return { state: st, nails: st.nails };
  }

  function syncMainDollNails(nails) {
    if (typeof document === 'undefined') return;
    var princessSvg = document.getElementById('princess-svg');
    if (!princessSvg) return;
    var hasRainbowGrad = !!princessSvg.querySelector('#doll-nail-rainbow');
    var nailEls = princessSvg.querySelectorAll('.doll-nail');
    for (var i = 0; i < nailEls.length; i++) {
      var el = nailEls[i];
      var fIdx = parseInt(el.getAttribute('data-finger'), 10);
      if (isNaN(fIdx) || fIdx < 0 || fIdx > 4) continue;
      var n = nails[fIdx];
      if (!n) continue;
      if ((n.colorId === 'rainbow-glitter' || n.color === 'rainbow') && hasRainbowGrad) {
        el.setAttribute('fill', 'url(#doll-nail-rainbow)');
      } else {
        el.setAttribute('fill', n.color || '#ff4da6');
      }
      if (n.pattern === 'french') {
        el.setAttribute('stroke', '#ffffff');
        el.setAttribute('stroke-width', '0.9');
      } else if (n.pattern === 'glitter' || n.colorId === 'rainbow-glitter' || n.colorId === 'black-sequin') {
        el.setAttribute('stroke', '#ffe677');
        el.setAttribute('stroke-width', '0.8');
      } else {
        el.setAttribute('stroke', 'rgba(255,255,255,0.65)');
        el.setAttribute('stroke-width', '0.5');
      }
    }
  }

  function notifyNailUpdate() {
    var data = getNormalizedNails();
    if (typeof nailState.onUpdate === 'function') {
      try { nailState.onUpdate(data.state); } catch (e) {}
    } else if (typeof window !== 'undefined' && typeof window.applyDollMakeup === 'function') {
      try { window.applyDollMakeup(data.state); } catch (e) {}
    }
    syncMainDollNails(data.nails);
  }

  function spawnFingerSparkles(fingerIdx) {
    if (!nailState.modalEl) return;
    var fxLayer = nailState.modalEl.querySelector('.ns-sparkle-layer');
    var svg = nailState.modalEl.querySelector('.ns-hand-svg');
    if (!fxLayer || !svg) return;
    var g = HAND_NAILS_GEOM[fingerIdx] || HAND_NAILS_GEOM[1];
    var stageRect = fxLayer.getBoundingClientRect();
    var svgRect = svg.getBoundingClientRect();
    if (!svgRect.width || !stageRect.width) return;

    var px = (svgRect.left - stageRect.left) + (g.cx / 420) * svgRect.width;
    var py = (svgRect.top - stageRect.top) + (g.cy / 440) * svgRect.height;
    var icons = ['✨', '💖', '⭐', '🌸', '💎'];
    for (var i = 0; i < 6; i++) {
      var sp = document.createElement('span');
      sp.className = 'ns-burst-star';
      sp.textContent = icons[i % icons.length];
      var angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.4;
      var dist = 26 + Math.random() * 24;
      sp.style.left = px + 'px';
      sp.style.top = py + 'px';
      sp.style.setProperty('--dx', Math.round(Math.cos(angle) * dist) + 'px');
      sp.style.setProperty('--dy', Math.round(Math.sin(angle) * dist) + 'px');
      fxLayer.appendChild(sp);
      (function (el) {
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 760);
      })(sp);
    }
  }

  function buildHandSvgMarkup() {
    var clips = HAND_NAILS_GEOM.map(function (g) {
      return '<clipPath id="ns-nail-clip-' + g.idx + '"><path d="' + NAIL_ALMOND_PATH + '"/></clipPath>';
    }).join('');

    var nailsMarkup = HAND_NAILS_GEOM.map(function (g) {
      return (
        '<g class="ns-finger-hit" data-finger="' + g.idx + '" transform="translate(' + g.cx + ',' + g.cy + ') rotate(' + g.rot + ') scale(' + g.sx + ',' + g.sy + ')">' +
          '<path class="ns-finger-hitbox" d="M 0,-34 C 24,-34 28,-10 28,65 C 28,85 -28,85 -28,65 C -28,-10 -24,-34 0,-34 Z" fill="rgba(255,255,255,0.001)"/>' +
          '<g class="ns-finger-visual">' +
            '<path id="ns-nail-halo-' + g.idx + '" class="ns-halo-ring" d="M 0,-24 C 12,-24 19,-14 19,3 C 19,16 12,24 0,24 C -12,24 -19,16 -19,3 C -19,-14 -12,-24 0,-24 Z" fill="none" stroke="#ffd43b" stroke-width="3.5" stroke-dasharray="5 3" style="display:none"/>' +
            '<g clip-path="url(#ns-nail-clip-' + g.idx + ')">' +
              '<path id="ns-nail-base-' + g.idx + '" d="' + NAIL_ALMOND_PATH + '" fill="#ff4da6"/>' +
              '<path d="' + NAIL_ALMOND_PATH + '" fill="url(#ns-nail-depth)" pointer-events="none"/>' +
              '<g id="ns-nail-pattern-' + g.idx + '"></g>' +
              '<path d="M -8,-14 C -4,-16 0,-12 -2,2 C -3,10 -6,14 -9,10 C -11,4 -11,-10 -8,-14 Z" fill="#ffffff" opacity="0.45"/>' +
              '<ellipse cx="5" cy="-11" rx="2.5" ry="4" fill="#ffffff" opacity="0.52"/>' +
            '</g>' +
            '<path d="' + NAIL_ALMOND_PATH + '" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.6"/>' +
            '<path d="M -11,15 C -5,21 5,21 11,15" fill="none" stroke="#d8828c" stroke-width="1.4" opacity="0.55"/>' +
            '<g id="ns-nail-charm-' + g.idx + '" transform="translate(0, 3)"></g>' +
          '</g>' +
        '</g>'
      );
    }).join('');

    return (
      '<svg class="ns-hand-svg" viewBox="0 0 420 440" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<radialGradient id="ns-cushion-grad" cx="50%" cy="38%" r="60%">' +
            '<stop offset="0%" stop-color="#fff4fa"/>' +
            '<stop offset="58%" stop-color="#ffcce8"/>' +
            '<stop offset="100%" stop-color="#eb82bc"/>' +
          '</radialGradient>' +
          '<linearGradient id="ns-skin-grad" x1="15%" y1="10%" x2="85%" y2="90%">' +
            '<stop offset="0%" stop-color="#ffede4"/>' +
            '<stop offset="55%" stop-color="#ffd5c6"/>' +
            '<stop offset="100%" stop-color="#f4b19e"/>' +
          '</linearGradient>' +
          '<radialGradient id="ns-palm-blush" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0%" stop-color="#ff9ab5" stop-opacity="0.32"/>' +
            '<stop offset="100%" stop-color="#ff9ab5" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<radialGradient id="ns-nail-depth" cx="42%" cy="35%" r="65%">' +
            '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>' +
            '<stop offset="68%" stop-color="#000000" stop-opacity="0"/>' +
            '<stop offset="100%" stop-color="#4a0428" stop-opacity="0.28"/>' +
          '</radialGradient>' +
          '<linearGradient id="ns-rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#ff5fa2"/>' +
            '<stop offset="28%" stop-color="#ffd166"/>' +
            '<stop offset="55%" stop-color="#6ef2c4"/>' +
            '<stop offset="80%" stop-color="#7dd3fc"/>' +
            '<stop offset="100%" stop-color="#c084fc"/>' +
          '</linearGradient>' +
          '<linearGradient id="ns-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#fff3a8"/>' +
            '<stop offset="50%" stop-color="#ffd034"/>' +
            '<stop offset="100%" stop-color="#e58e00"/>' +
          '</linearGradient>' +
          '<filter id="ns-charm-shadow" x="-40%" y="-40%" width="180%" height="180%">' +
            '<feDropShadow dx="0" dy="1.8" stdDeviation="1.4" flood-color="#580a36" flood-opacity="0.45"/>' +
          '</filter>' +
          clips +
        '</defs>' +
        // Plush princess manicure pillow at bottom
        '<ellipse cx="215" cy="402" rx="176" ry="34" fill="#d45d9f" opacity="0.22"/>' +
        '<path d="M 48,382 C 45,350 98,334 215,334 C 332,334 385,350 382,382 C 380,414 328,426 215,426 C 102,426 50,414 48,382 Z" fill="url(#ns-cushion-grad)" stroke="#ffffff" stroke-width="3"/>' +
        '<path d="M 68,376 Q 215,352 362,376" fill="none" stroke="#ffd86b" stroke-width="2.5" stroke-dasharray="6 5" opacity="0.85"/>' +
        // Soft hand cast shadow on pillow
        '<ellipse cx="222" cy="366" rx="76" ry="20" fill="#a83273" opacity="0.22"/>' +
        // Wrist + Palm + 5 plump rounded anime princess fingers
        '<path d="' +
          'M 168,395 C 166,356 162,330 144,312 ' +
          'C 122,292 92,278 72,254 ' +
          'C 57,236 66,208 90,213 ' +
          'C 110,218 134,242 152,256 ' +
          'C 151,232 135,190 124,142 ' +
          'C 118,112 126,86 144,86 ' +
          'C 162,86 168,110 174,148 ' +
          'C 178,170 181,182 184,186 ' +
          'C 184,154 182,110 184,84 ' +
          'C 186,62 222,62 224,84 ' +
          'C 226,112 225,156 226,188 ' +
          'C 232,182 238,144 245,112 ' +
          'C 250,86 284,86 284,114 ' +
          'C 284,146 276,186 276,208 ' +
          'C 282,202 292,174 298,154 ' +
          'C 305,134 334,138 334,164 ' +
          'C 334,192 316,246 302,286 ' +
          'C 292,314 276,336 274,395 Z' +
        '" fill="url(#ns-skin-grad)" stroke="#d9897c" stroke-width="2.2" stroke-linejoin="round"/>' +
        // Soft anime blush tint on fingertips & palm
        '<ellipse cx="222" cy="285" rx="52" ry="42" fill="url(#ns-palm-blush)"/>' +
        '<ellipse cx="86" cy="235" rx="18" ry="18" fill="url(#ns-palm-blush)"/>' +
        '<ellipse cx="141" cy="112" rx="16" ry="18" fill="url(#ns-palm-blush)"/>' +
        '<ellipse cx="204" cy="88" rx="18" ry="20" fill="url(#ns-palm-blush)"/>' +
        '<ellipse cx="266" cy="111" rx="16" ry="18" fill="url(#ns-palm-blush)"/>' +
        '<ellipse cx="317" cy="162" rx="14" ry="16" fill="url(#ns-palm-blush)"/>' +
        // Subtle delicate knuckle creases
        '<path d="M 134,162 Q 146,158 158,162" fill="none" stroke="#e49d8f" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>' +
        '<path d="M 192,148 Q 204,144 216,148" fill="none" stroke="#e49d8f" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>' +
        '<path d="M 252,162 Q 264,158 276,162" fill="none" stroke="#e49d8f" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>' +
        '<path d="M 299,205 Q 310,202 319,207" fill="none" stroke="#e49d8f" stroke-width="1.4" stroke-linecap="round" opacity="0.65"/>' +
        // Cute Princess Diamond Ring on Finger 3 (Ring Finger)
        '<path d="M 244,174 Q 260,180 276,177" fill="none" stroke="url(#ns-gold-grad)" stroke-width="4.2" stroke-linecap="round"/>' +
        '<polygon points="260,167 266,173 260,179 254,173" fill="#ff4da6" stroke="#ffffff" stroke-width="1.2"/>' +
        // Pearl Princess Bracelet on Wrist
        '<g id="ns-wrist-bracelet">' +
          '<circle cx="173" cy="364" r="6" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="187" cy="368" r="6.2" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="202" cy="371" r="6.5" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="218" cy="372" r="6.5" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="234" cy="371" r="6.5" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="250" cy="368" r="6.2" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<circle cx="265" cy="364" r="6" fill="#fff7fb" stroke="#f9a8d4" stroke-width="1.2"/>' +
          '<path d="M 218,376 C 218,372 211,372 211,377 C 211,382 218,386 218,386 C 218,386 225,382 225,377 C 225,372 218,372 218,376 Z" fill="#ff3b8b" stroke="#ffd86b" stroke-width="1.2"/>' +
        '</g>' +
        // 5 Interactive Glossy Nails
        nailsMarkup +
      '</svg>'
    );
  }

  function renderPaletteItems() {
    if (!nailState.modalEl) return;
    var grid = nailState.modalEl.querySelector('.ns-palette-grid');
    if (!grid) return;
    var html = '';
    if (nailState.activeTab === 'color') {
      html = NAIL_COLORS.map(function (c) {
        var isSel = nailState.activeBrush.colorId === c.id;
        var bg = c.rainbow
          ? 'linear-gradient(135deg, #ff5fa2, #ffd166, #6ef2c4, #7dd3fc, #c084fc)'
          : c.color;
        var sparkleDot = c.glitter ? '<span style="position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,#fff 1px,transparent 2px),radial-gradient(circle at 70% 60%,#ffe066 1.5px,transparent 2.5px);opacity:0.9;"></span>' : '';
        return (
          '<button type="button" class="ns-swatch-btn' + (isSel ? ' selected' : '') + '" data-kind="color" data-id="' + c.id + '">' +
            '<span class="ns-color-orb" style="background:' + bg + ';">' + sparkleDot + '</span>' +
            '<span class="ns-swatch-label">' + c.name + '</span>' +
          '</button>'
        );
      }).join('');
    } else if (nailState.activeTab === 'pattern') {
      html = NAIL_PATTERNS.map(function (p) {
        var isSel = nailState.activeBrush.pattern === p.id;
        var previewColor = nailState.activeBrush.color || '#ff4da6';
        var isDark = nailState.activeBrush.colorId === 'black-sequin';
        return (
          '<button type="button" class="ns-swatch-btn' + (isSel ? ' selected' : '') + '" data-kind="pattern" data-id="' + p.id + '">' +
            '<svg width="36" height="40" viewBox="-16 -21 32 42">' +
              '<path d="' + NAIL_ALMOND_PATH + '" fill="' + previewColor + '" stroke="#f472b6" stroke-width="1.3"/>' +
              renderPatternMarkup(p.id, isDark) +
              '<path d="M -7,-12 C -4,-14 -2,-8 -3,2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>' +
            '</svg>' +
            '<span class="ns-swatch-label">' + p.name + '</span>' +
          '</button>'
        );
      }).join('');
    } else {
      html = NAIL_CHARMS.map(function (ch) {
        var isSel = nailState.activeBrush.charm === ch.id;
        var iconSvg = ch.id === 'none'
          ? '<svg width="36" height="36" viewBox="-14 -14 28 28"><circle cx="0" cy="0" r="10" fill="#fff0f7" stroke="#f9a8d4" stroke-width="1.5" stroke-dasharray="3 2"/><line x1="-6" y1="6" x2="6" y2="-6" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/></svg>'
          : '<svg width="36" height="36" viewBox="-12 -12 24 24">' + renderCharmSvg(ch.id) + '</svg>';
        return (
          '<button type="button" class="ns-swatch-btn' + (isSel ? ' selected' : '') + '" data-kind="charm" data-id="' + ch.id + '">' +
            iconSvg +
            '<span class="ns-swatch-label">' + ch.name + '</span>' +
          '</button>'
        );
      }).join('');
    }
    grid.innerHTML = html;
  }

  function renderHandNails() {
    if (!nailState.modalEl) return;
    var data = getNormalizedNails();
    var nails = data.nails;
    for (var i = 0; i < 5; i++) {
      var n = nails[i];
      var colorDef = getColorDef(n);
      var baseEl = nailState.modalEl.querySelector('#ns-nail-base-' + i);
      var patEl = nailState.modalEl.querySelector('#ns-nail-pattern-' + i);
      var charmEl = nailState.modalEl.querySelector('#ns-nail-charm-' + i);
      var haloEl = nailState.modalEl.querySelector('#ns-nail-halo-' + i);

      if (baseEl) {
        baseEl.setAttribute('fill', colorDef.rainbow ? 'url(#ns-rainbow-grad)' : (n.color || colorDef.color));
      }
      if (patEl) {
        var isDark = colorDef.id === 'black-sequin';
        var patMarkup = renderPatternMarkup(n.pattern, isDark);
        if (colorDef.glitter && n.pattern !== 'glitter') {
          patMarkup += renderPatternMarkup('glitter', isDark);
        }
        patEl.innerHTML = patMarkup;
      }
      if (charmEl) {
        charmEl.innerHTML = renderCharmSvg(n.charm);
      }
      if (haloEl) {
        haloEl.style.display = (i === nailState.selectedFinger) ? 'block' : 'none';
      }
    }
    var hintEl = nailState.modalEl.querySelector('.ns-finger-hint');
    if (hintEl) {
      hintEl.textContent = '👆 Đang chọn: ' + FINGER_NAMES[nailState.selectedFinger] + ' — Chạm vào ngón tay để sơn!';
    }
    var pills = nailState.modalEl.querySelectorAll('.ns-finger-pill');
    for (var p = 0; p < pills.length; p++) {
      var pIdx = parseInt(pills[p].getAttribute('data-finger'), 10);
      pills[p].classList.toggle('active', pIdx === nailState.selectedFinger);
    }
  }

  function applyActiveTabBrushToFinger(fingerIdx) {
    var data = getNormalizedNails();
    var n = data.nails[fingerIdx];
    if (nailState.activeTab === 'color') {
      n.color = nailState.activeBrush.color;
      n.colorId = nailState.activeBrush.colorId;
    } else if (nailState.activeTab === 'pattern') {
      n.pattern = nailState.activeBrush.pattern;
    } else {
      n.charm = nailState.activeBrush.charm;
    }
    SOUND_FX.playSparkle();
    renderHandNails();
    spawnFingerSparkles(fingerIdx);
    notifyNailUpdate();
  }

  function paintAllFiveFingers() {
    var data = getNormalizedNails();
    for (var i = 0; i < 5; i++) {
      if (nailState.activeTab === 'color') {
        data.nails[i].color = nailState.activeBrush.color;
        data.nails[i].colorId = nailState.activeBrush.colorId;
      } else if (nailState.activeTab === 'pattern') {
        data.nails[i].pattern = nailState.activeBrush.pattern;
      } else {
        data.nails[i].charm = nailState.activeBrush.charm;
      }
      (function (idx) {
        setTimeout(function () { spawnFingerSparkles(idx); }, idx * 55);
      })(i);
    }
    SOUND_FX.playChime();
    renderHandNails();
    notifyNailUpdate();
  }

  function resetAllNails() {
    var data = getNormalizedNails();
    for (var i = 0; i < 5; i++) {
      data.nails[i].color = '#ffb6d9';
      data.nails[i].colorId = 'pastel-pink';
      data.nails[i].pattern = 'glossy';
      data.nails[i].charm = 'none';
    }
    SOUND_FX.playPop();
    renderHandNails();
    notifyNailUpdate();
  }

  function buildModalDom(hostContainer) {
    ensureStyles();
    var existing = document.getElementById('nail-salon-modal');
    if (existing && existing.querySelector('.ns-card')) {
      nailState.modalEl = existing;
      return existing;
    }
    var modal = existing || (hostContainer && hostContainer.id === 'nail-salon-modal' ? hostContainer : null);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'nail-salon-modal';
      var target = hostContainer || document.body;
      target.appendChild(modal);
    }
    var fingerPillsMarkup = FINGER_NAMES.map(function (fname, idx) {
      return '<button type="button" class="ns-finger-pill' + (idx === nailState.selectedFinger ? ' active' : '') + '" data-finger="' + idx + '">' + fname + '</button>';
    }).join('');

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Tiệm Làm Móng Công Chúa');
    modal.innerHTML =
      '<div class="ns-card">' +
        '<div class="ns-header">' +
          '<h2 class="ns-title">💅 Tiệm Làm Móng Công Chúa ✨</h2>' +
          '<div class="ns-header-actions">' +
            '<button type="button" class="ns-icon-pill ns-reset-btn" title="Tẩy móng">🧽 Tẩy Sạch</button>' +
            '<button type="button" class="ns-icon-pill ns-close-x" aria-label="Đóng">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="ns-body">' +
          '<div class="ns-hand-stage">' +
            '<div class="ns-finger-hint">👆 Chạm ngón tay để sơn móng nhé!</div>' +
            buildHandSvgMarkup() +
            '<div class="ns-finger-pills" aria-label="Chọn ngón tay">' + fingerPillsMarkup + '</div>' +
            '<div class="ns-sparkle-layer"></div>' +
            '<div class="ns-hand-actions">' +
              '<button type="button" class="ns-btn-all">✨ Sơn Cả 5 Ngón</button>' +
              '<button type="button" class="ns-btn-done">Xong Rồi! 💖</button>' +
            '</div>' +
          '</div>' +
          '<div class="ns-controls-panel">' +
            '<div class="ns-tabs">' +
              '<button type="button" class="ns-tab active" data-tab="color"><span class="ns-tab-ico">🎨</span><span>Màu Sơn</span></button>' +
              '<button type="button" class="ns-tab" data-tab="pattern"><span class="ns-tab-ico">✨</span><span>Họa Tiết</span></button>' +
              '<button type="button" class="ns-tab" data-tab="charm"><span class="ns-tab-ico">💎</span><span>Sticker 3D</span></button>' +
            '</div>' +
            '<div class="ns-palette-grid"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    nailState.modalEl = modal;

    if (!modal._nsBound) {
      modal._nsBound = true;
      var lastFingerDown = { idx: -1, time: 0 };

      function selectAndPaintFinger(fIdx) {
        if (isNaN(fIdx) || fIdx < 0 || fIdx > 4) return;
        nailState.selectedFinger = fIdx;
        applyActiveTabBrushToFinger(fIdx);
      }

      // Immediate touch/pointer selection on SVG nails so even quick or slight-drag iPad taps work reliably
      modal.addEventListener('pointerdown', function (e) {
        var fingerHit = e.target && e.target.closest && e.target.closest('.ns-finger-hit');
        if (!fingerHit) return;
        var fIdx = parseInt(fingerHit.getAttribute('data-finger'), 10);
        if (isNaN(fIdx) || fIdx < 0 || fIdx > 4) return;
        lastFingerDown.idx = fIdx;
        lastFingerDown.time = Date.now();
        selectAndPaintFinger(fIdx);
      });

      // Event delegation inside Nail Salon modal
      modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        NAIL_SALON.close();
        return;
      }
      var closeBtn = e.target.closest('.ns-close-x, .ns-btn-done');
      if (closeBtn) {
        NAIL_SALON.close();
        return;
      }
      var resetBtn = e.target.closest('.ns-reset-btn');
      if (resetBtn) {
        resetAllNails();
        return;
      }
      var allBtn = e.target.closest('.ns-btn-all');
      if (allBtn) {
        paintAllFiveFingers();
        return;
      }
      var tabBtn = e.target.closest('.ns-tab');
      if (tabBtn) {
        SOUND_FX.playPop();
        nailState.activeTab = tabBtn.getAttribute('data-tab') || 'color';
        var tabs = modal.querySelectorAll('.ns-tab');
        for (var t = 0; t < tabs.length; t++) {
          tabs[t].classList.toggle('active', tabs[t] === tabBtn);
        }
        renderPaletteItems();
        return;
      }
      var fingerPill = e.target.closest('.ns-finger-pill');
      if (fingerPill) {
        var pIdx = parseInt(fingerPill.getAttribute('data-finger'), 10);
        if (!isNaN(pIdx) && pIdx >= 0 && pIdx <= 4) {
          nailState.selectedFinger = pIdx;
          SOUND_FX.playPop();
          renderHandNails();
        }
        return;
      }
      var swatchBtn = e.target.closest('.ns-swatch-btn');
      if (swatchBtn) {
        var kind = swatchBtn.getAttribute('data-kind');
        var id = swatchBtn.getAttribute('data-id');
        if (kind === 'color') {
          var foundC = NAIL_COLORS.filter(function (c) { return c.id === id; })[0];
          if (foundC) {
            nailState.activeBrush.color = foundC.color;
            nailState.activeBrush.colorId = foundC.id;
          }
        } else if (kind === 'pattern') {
          nailState.activeBrush.pattern = id;
        } else if (kind === 'charm') {
          nailState.activeBrush.charm = id;
        }
        applyActiveTabBrushToFinger(nailState.selectedFinger);
        renderPaletteItems();
        return;
      }
      var fingerHit = e.target.closest('.ns-finger-hit');
      if (fingerHit) {
        var fIdx = parseInt(fingerHit.getAttribute('data-finger'), 10);
        if (!isNaN(fIdx) && fIdx >= 0 && fIdx <= 4) {
          if (lastFingerDown.idx === fIdx && (Date.now() - lastFingerDown.time) < 600) {
            lastFingerDown.idx = -1;
            return;
          }
          selectAndPaintFinger(fIdx);
        }
      }
      });
    }

    return modal;
  }

  var NAIL_SALON = {
    COLORS: NAIL_COLORS,
    PATTERNS: NAIL_PATTERNS,
    CHARMS: NAIL_CHARMS,
    init: function (containerEl, getState, onUpdate) {
      nailState.containerEl = containerEl || null;
      if (typeof getState === 'function') nailState.getState = getState;
      if (typeof onUpdate === 'function') nailState.onUpdate = onUpdate;
      if (typeof document !== 'undefined') {
        buildModalDom(nailState.containerEl);
        renderPaletteItems();
        renderHandNails();
      }
      return NAIL_SALON;
    },
    open: function (stateOrGetter, onApply, onClose) {
      if (typeof stateOrGetter === 'function') {
        nailState.getState = stateOrGetter;
      } else if (stateOrGetter && typeof stateOrGetter === 'object') {
        nailState.getState = function () { return stateOrGetter; };
      }
      if (typeof onApply === 'function') nailState.onUpdate = onApply;
      if (typeof onClose === 'function') nailState.onClose = onClose;

      if (typeof document === 'undefined') return NAIL_SALON;
      var modal = nailState.modalEl || buildModalDom(nailState.containerEl);
      var data = getNormalizedNails();
      var firstDef = getColorDef(data.nails[nailState.selectedFinger]);
      nailState.activeBrush.color = data.nails[nailState.selectedFinger].color || firstDef.color;
      nailState.activeBrush.colorId = data.nails[nailState.selectedFinger].colorId || firstDef.id;
      nailState.activeBrush.pattern = data.nails[nailState.selectedFinger].pattern || 'glossy';
      nailState.activeBrush.charm = data.nails[nailState.selectedFinger].charm || 'none';

      renderPaletteItems();
      renderHandNails();
      modal.classList.add('open');
      SOUND_FX.playPop();
      return NAIL_SALON;
    },
    close: function () {
      if (nailState.modalEl) {
        nailState.modalEl.classList.remove('open');
      }
      SOUND_FX.playPop();
      notifyNailUpdate();
      if (typeof nailState.onClose === 'function') {
        try { nailState.onClose(); } catch (e) {}
      }
      return NAIL_SALON;
    }
  };

  // --------------------------------------------------------------------------
  // 4. 2.5D CATWALK & IDOL DANCE STAGE SHOW (window.STAGE_SHOW)
  // --------------------------------------------------------------------------
  var stageState = {
    overlayEl: null,
    rafId: null,
    confettiRafId: null,
    running: false,
    startTime: 0,
    phase: 0,
    trophyShown: false,
    lastEmoteTime: 0,
    lastStepTime: 0,
    onFinish: null,
    princessSrc: null,
    getState: null,
    rig: null,
    particles: []
  };

  function clonePrincessForStage(sourceSvg) {
    if (!sourceSvg) return null;
    var clone = sourceSvg.cloneNode(true);
    clone.setAttribute('id', 'stage-princess-svg');
    clone.style.transform = '';
    clone.style.transition = '';

    // Capture direct references to rig limbs before prefixing IDs so zero duplicate IDs exist in DOM
    var rigRefs = {
      svg: clone,
      head: clone.querySelector('#rig-head'),
      backHair: clone.querySelector('#layer-back-hair'),
      torso: clone.querySelector('#rig-torso'),
      arms: clone.querySelector('#rig-arms'),
      armLeft: clone.querySelector('#rig-arm-left'),
      armRight: clone.querySelector('#rig-arm-right'),
      legs: clone.querySelector('#rig-legs'),
      legLeft: clone.querySelector('#rig-leg-left'),
      legRight: clone.querySelector('#rig-leg-right'),
      eyelids: clone.querySelector('#doll-eyelids')
    };

    // Clear inline CSS transform-origin on animated rig groups because applyRigPose()
    // embeds exact SVG pivot coordinates inside transform="rotate(angle cx cy)"
    [rigRefs.head, rigRefs.backHair, rigRefs.armLeft, rigRefs.armRight, rigRefs.legLeft, rigRefs.legRight].forEach(function (el) {
      if (el && el.style) {
        if (typeof el.style.removeProperty === 'function') {
          el.style.removeProperty('transform-origin');
        }
        el.style.transformOrigin = '0px 0px';
      }
    });

    // Preserve any CSS animation on #doll-eyelids before renaming IDs
    if (rigRefs.eyelids && typeof window !== 'undefined' && window.getComputedStyle) {
      try {
        var origEyelids = sourceSvg.querySelector('#doll-eyelids');
        if (origEyelids) {
          var cs = window.getComputedStyle(origEyelids);
          if (cs && cs.animationName && cs.animationName !== 'none') {
            rigRefs.eyelids.style.animation = cs.animation;
          }
        }
      } catch (e) {}
    }

    // Rewrite every internal id + url(#id) / href="#id" to prevent cross-SVG collisions
    var idMap = {};
    var allWithId = clone.querySelectorAll('[id]');
    for (var i = 0; i < allWithId.length; i++) {
      var oldId = allWithId[i].getAttribute('id');
      if (!oldId || oldId === 'stage-princess-svg') continue;
      var newId = 'stgclone-' + oldId;
      idMap[oldId] = newId;
      allWithId[i].setAttribute('id', newId);
    }

    var allEls = clone.querySelectorAll('*');
    for (var j = 0; j < allEls.length; j++) {
      var el = allEls[j];
      var attrs = el.attributes;
      for (var k = 0; k < attrs.length; k++) {
        var attr = attrs[k];
        var val = attr.value;
        if (!val) continue;
        if (val.indexOf('url(#') !== -1) {
          attr.value = val.replace(/url\(#([^)]+)\)/g, function (m, refId) {
            return 'url(#' + (idMap[refId] || refId) + ')';
          });
        } else if ((attr.name === 'href' || attr.name === 'xlink:href') && val.charAt(0) === '#') {
          var ref = val.slice(1);
          if (idMap[ref]) attr.value = '#' + idMap[ref];
        }
      }
    }

    return rigRefs;
  }

  function buildStageFansMarkup(side) {
    var colors = ['#ff69b4', '#38bdf8', '#fde047', '#c084fc'];
    var fans = '';
    for (var i = 0; i < 4; i++) {
      var col = colors[(i + (side === 'right' ? 2 : 0)) % colors.length];
      fans +=
        '<div class="stg-fan">' +
          '<div class="stg-glowstick" style="background:' + col + ';box-shadow:0 0 12px ' + col + '"></div>' +
          '<svg viewBox="0 0 44 68" width="44" height="68">' +
            '<circle cx="22" cy="18" r="11" fill="#170626"/>' +
            '<path d="M 8,68 C 8,40 12,31 22,31 C 32,31 36,40 36,68 Z" fill="#170626"/>' +
          '</svg>' +
        '</div>';
    }
    return '<div class="stg-crowd-side">' + fans + '</div>';
  }

  function buildStageStarsAndBokeh() {
    var html = '';
    for (var i = 0; i < 28; i++) {
      var size = 2 + (i % 4);
      var left = ((i * 37) % 98) + 1;
      var top = ((i * 23) % 52) + 2;
      var dur = (1.6 + (i % 5) * 0.45).toFixed(2) + 's';
      html += '<span class="stg-star" style="width:' + size + 'px;height:' + size + 'px;left:' + left + '%;top:' + top + '%;--dur:' + dur + ';animation-delay:' + (i * 0.13).toFixed(2) + 's"></span>';
    }
    var bokehColors = ['#ff7eb9', '#fde047', '#a78bfa', '#67e8f9'];
    for (var b = 0; b < 10; b++) {
      var bSize = 18 + (b % 4) * 14;
      var bLeft = ((b * 43 + 9) % 92) + 4;
      var bDur = (6 + (b % 4) * 1.6).toFixed(1) + 's';
      html += '<span class="stg-bokeh" style="width:' + bSize + 'px;height:' + bSize + 'px;left:' + bLeft + '%;background:' + bokehColors[b % 4] + ';--dur:' + bDur + ';animation-delay:-' + (b * 0.9).toFixed(1) + 's"></span>';
    }
    return html;
  }

  function createStageOverlayDom() {
    ensureStyles();
    var existing = document.getElementById('stage-show-overlay');
    if (existing && existing.querySelector('.stg-performer-mover')) {
      stageState.overlayEl = existing;
      return existing;
    }
    var overlay = existing || document.createElement('div');
    overlay.id = 'stage-show-overlay';
    if (!overlay.parentNode) {
      document.body.appendChild(overlay);
    }
    overlay.innerHTML =
      '<div class="stg-backdrop">' +
        buildStageStarsAndBokeh() +
        '<div class="stg-arch"><span class="stg-neon-badge">★ PRINCESS IDOL ★</span></div>' +
      '</div>' +
      '<div class="stg-spotlights">' +
        '<div class="stg-beam stg-beam-left"></div>' +
        '<div class="stg-beam stg-beam-center"></div>' +
        '<div class="stg-beam stg-beam-right"></div>' +
      '</div>' +
      '<div class="stg-runway-wrap">' +
        '<div class="stg-runway-floor">' +
          '<div class="stg-runway-sheen"></div>' +
          '<div class="stg-runway-lights left"></div>' +
          '<div class="stg-runway-lights right"></div>' +
        '</div>' +
      '</div>' +
      '<div class="stg-floor-aura"></div>' +
      '<div class="stg-performer-anchor"><div class="stg-performer-mover"></div></div>' +
      '<div class="stg-fx-layer"></div>' +
      '<div class="stg-crowd">' +
        buildStageFansMarkup('left') +
        buildStageFansMarkup('right') +
      '</div>' +
      '<div class="stg-curtain left"></div>' +
      '<div class="stg-curtain right"></div>' +
      '<div class="stg-curtain-valance"></div>' +
      '<canvas class="stg-confetti-canvas"></canvas>' +
      '<div class="stg-flash"></div>' +
      '<div class="stg-hud">' +
        '<div class="stg-hud-group">' +
          '<button type="button" class="stg-pill-btn stg-mute-btn">' + (SOUND_FX.isMuted ? '🔇 Tắt Nhạc' : '🔊 Nhạc Bật') + '</button>' +
          '<div class="stg-phase-pill">✨ Sân Khấu Công Chúa ✨</div>' +
        '</div>' +
        '<div class="stg-hud-group">' +
          '<button type="button" class="stg-pill-btn stg-skip-btn">⏭️ Bỏ Qua</button>' +
          '<button type="button" class="stg-pill-btn stg-replay-btn">🔄 Diễn Lại</button>' +
          '<button type="button" class="stg-pill-btn stg-exit-btn">✕ Thoát</button>' +
        '</div>' +
      '</div>' +
      '<div class="stg-trophy-card">' +
        '<div class="stg-trophy-stars">⭐⭐⭐⭐⭐</div>' +
        '<h2 class="stg-trophy-title">🌟 Công Chúa Siêu Sao 🌟</h2>' +
        '<p class="stg-trophy-sub">Màn trình diễn catwalk & vũ điệu tuyệt vời quá!</p>' +
        '<div class="stg-trophy-actions">' +
          '<button type="button" class="stg-action-btn replay stg-trophy-replay">🔄 Diễn Lại</button>' +
          '<button type="button" class="stg-action-btn back stg-trophy-back">👗 Thay Đồ Tiếp</button>' +
        '</div>' +
      '</div>';

    stageState.overlayEl = overlay;

    if (!overlay._stgBound) {
      overlay._stgBound = true;
      SOUND_FX.onMuteChange(function (isNowMuted) {
        var btn = overlay.querySelector('.stg-mute-btn');
        if (btn) btn.textContent = isNowMuted ? '🔇 Tắt Nhạc' : '🔊 Nhạc Bật';
      });

      overlay.addEventListener('click', function (e) {
        if (e.target.closest('.stg-mute-btn')) {
          SOUND_FX.toggleMute();
          return;
        }
        if (e.target.closest('.stg-exit-btn, .stg-trophy-back')) {
          SOUND_FX.playPop();
          STAGE_SHOW.stop();
          return;
        }
        if (e.target.closest('.stg-replay-btn, .stg-trophy-replay')) {
          SOUND_FX.playPop();
          STAGE_SHOW.start(stageState.princessSrc, stageState.getState, stageState.onFinish);
          return;
        }
        if (e.target.closest('.stg-skip-btn')) {
          SOUND_FX.playPop();
          jumpToStageFinale();
        }
      });
    }

    return overlay;
  }

  function spawnStageEmote(emoji, xPct, yPct) {
    if (!stageState.overlayEl) return;
    var layer = stageState.overlayEl.querySelector('.stg-fx-layer');
    if (!layer) return;
    var el = document.createElement('span');
    el.className = 'stg-float-emote';
    el.textContent = emoji;
    el.style.left = xPct + '%';
    el.style.top = yPct + '%';
    el.style.setProperty('--drift', Math.round((Math.random() - 0.5) * 90) + 'px');
    layer.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1450);
  }

  function launchConfetti() {
    if (!stageState.overlayEl) return;
    var canvas = stageState.overlayEl.querySelector('.stg-confetti-canvas');
    if (!canvas || !canvas.getContext) return;
    canvas.width = window.innerWidth || 1024;
    canvas.height = window.innerHeight || 768;
    var ctx = canvas.getContext('2d');
    var palette = ['#ff4da6', '#ffd43b', '#38bdf8', '#c084fc', '#5ef2c0', '#ffffff'];
    var list = [];
    for (var i = 0; i < 110; i++) {
      var fromLeft = i % 2 === 0;
      list.push({
        x: fromLeft ? canvas.width * 0.14 : canvas.width * 0.86,
        y: canvas.height * 0.78,
        vx: (fromLeft ? 1 : -1) * (3.5 + Math.random() * 8.5),
        vy: -(8 + Math.random() * 11),
        size: 6 + Math.random() * 6,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 14,
        color: palette[i % palette.length],
        shape: i % 3 === 0 ? 'circle' : 'rect'
      });
    }
    stageState.particles = list;

    function tickConfetti() {
      if (!stageState.running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      for (var p = 0; p < stageState.particles.length; p++) {
        var c = stageState.particles[p];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.24;
        c.vx *= 0.992;
        c.rot += c.vRot;
        if (c.y < canvas.height + 30) alive = true;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rot * Math.PI) / 180);
        ctx.fillStyle = c.color;
        if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, c.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-c.size / 2, -c.size * 0.35, c.size, c.size * 0.7);
        }
        ctx.restore();
      }
      if (alive && stageState.running) {
        stageState.confettiRafId = requestAnimationFrame(tickConfetti);
      }
    }
    if (stageState.confettiRafId) cancelAnimationFrame(stageState.confettiRafId);
    stageState.confettiRafId = requestAnimationFrame(tickConfetti);
  }

  function applyRigPose(rig, opts) {
    if (!rig) return;
    var headTf = 'rotate(' + (opts.headRot || 0).toFixed(2) + ' 300 285)';
    if (rig.head) rig.head.setAttribute('transform', headTf);
    if (rig.backHair) rig.backHair.setAttribute('transform', headTf);
    if (rig.armLeft) rig.armLeft.setAttribute('transform', 'rotate(' + (opts.armL || 0).toFixed(2) + ' 230 330)');
    if (rig.armRight) rig.armRight.setAttribute('transform', 'rotate(' + (opts.armR || 0).toFixed(2) + ' 370 330)');
    if (rig.legLeft) {
      var lLift = opts.legLiftL || 0;
      rig.legLeft.setAttribute('transform', 'translate(0,' + lLift.toFixed(2) + ') rotate(' + (opts.legL || 0).toFixed(2) + ' 274 500)');
    }
    if (rig.legRight) {
      var rLift = opts.legLiftR || 0;
      rig.legRight.setAttribute('transform', 'translate(0,' + rLift.toFixed(2) + ') rotate(' + (opts.legR || 0).toFixed(2) + ' 326 500)');
    }
  }

  function triggerFinaleCelebration() {
    if (!stageState.overlayEl || stageState.trophyShown) return;
    stageState.trophyShown = true;
    var phasePill = stageState.overlayEl.querySelector('.stg-phase-pill');
    if (phasePill) phasePill.textContent = '🌟 Công Chúa Siêu Sao 🌟';
    var skipBtn = stageState.overlayEl.querySelector('.stg-skip-btn');
    if (skipBtn) skipBtn.style.display = 'none';

    var flash = stageState.overlayEl.querySelector('.stg-flash');
    if (flash) {
      flash.classList.remove('boom');
      void flash.offsetWidth;
      flash.classList.add('boom');
    }
    SOUND_FX.playCamera();
    setTimeout(function () {
      if (stageState.running) SOUND_FX.playApplause();
    }, 180);
    launchConfetti();

    var trophy = stageState.overlayEl.querySelector('.stg-trophy-card');
    if (trophy) trophy.classList.add('show');
  }

  function jumpToStageFinale() {
    if (!stageState.running || !stageState.overlayEl) return;
    var curtains = stageState.overlayEl.querySelectorAll('.stg-curtain');
    for (var i = 0; i < curtains.length; i++) curtains[i].classList.add('open');
    stageState.startTime = performance.now() - 8300;
    triggerFinaleCelebration();
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function stageChoreographyLoop(now) {
    if (!stageState.running || !stageState.overlayEl) return;
    var elapsed = (now - stageState.startTime) / 1000;
    var mover = stageState.overlayEl.querySelector('.stg-performer-mover');
    var phasePill = stageState.overlayEl.querySelector('.stg-phase-pill');
    var rig = stageState.rig;

    if (elapsed < 3.8) {
      // Phase 1: Catwalk Entrance (0 - 3.8s)
      if (stageState.phase !== 1) {
        stageState.phase = 1;
        if (phasePill) phasePill.textContent = '👠 Bước Ra Sân Khấu ✨';
      }
      var p = Math.min(1, Math.max(0, elapsed / 3.8));
      var ep = easeInOutCubic(p);
      var scale = 0.55 + (1.05 - 0.55) * ep;
      var ty = -130 + (15 - (-130)) * ep;
      var walkCycle = elapsed * Math.PI * 2.7;
      var bounceY = Math.abs(Math.sin(walkCycle)) * -8;
      var bodyTilt = Math.sin(walkCycle) * 2.2;
      if (mover) {
        mover.style.transform = 'translateY(' + (ty + bounceY).toFixed(1) + 'px) scale(' + scale.toFixed(3) + ') rotate(' + bodyTilt.toFixed(2) + 'deg)';
      }
      var legPhase = Math.sin(walkCycle);
      applyRigPose(rig, {
        headRot: Math.sin(walkCycle * 0.5) * 4,
        armL: 10 - legPhase * 12,
        armR: -10 - legPhase * 12,
        legL: Math.max(0, legPhase) * 3.5,
        legR: -Math.max(0, -legPhase) * 3.5,
        legLiftL: Math.max(0, legPhase) * -12,
        legLiftR: Math.max(0, -legPhase) * -12
      });
      if (elapsed - stageState.lastStepTime > 0.55) {
        stageState.lastStepTime = elapsed;
        spawnStageEmote('✨', 46 + (Math.random() * 8 - 4), 70);
      }
    } else if (elapsed < 8.2) {
      // Phase 2: Idol Princess Dance (3.8 - 8.2s)
      if (stageState.phase !== 2) {
        stageState.phase = 2;
        if (phasePill) phasePill.textContent = '💃 Vũ Điệu Thần Tượng 💖';
      }
      var d = elapsed - 3.8;
      var beat = d * (124 / 60) * Math.PI * 2;
      var danceBounce = Math.abs(Math.sin(beat)) * -15;
      var swayX = Math.sin(beat * 0.5) * 14;
      var spinFactor = 1;
      // Joyful 360-degree 2.5D pirouette spin around 5.6s..6.5s
      if (elapsed >= 5.6 && elapsed <= 6.5) {
        var sp = (elapsed - 5.6) / 0.9;
        spinFactor = Math.cos(sp * Math.PI * 2);
      }
      if (mover) {
        mover.style.transform =
          'translate(' + swayX.toFixed(1) + 'px, ' + (15 + danceBounce).toFixed(1) + 'px) ' +
          'scale(' + (1.05 * spinFactor).toFixed(3) + ', 1.05) ' +
          'rotate(' + (Math.sin(beat * 0.5) * 3.5).toFixed(2) + 'deg)';
      }
      // Show off painted nails by waving both arms brightly!
      var swayLeg = Math.sin(beat * 0.5);
      applyRigPose(rig, {
        headRot: swayLeg * 7,
        armL: 78 + Math.sin(beat) * 34,
        armR: -78 - Math.cos(beat) * 34,
        legL: Math.max(0, swayLeg) * 4.5,
        legR: -Math.max(0, -swayLeg) * 4.5,
        legLiftL: Math.max(0, swayLeg) * -10,
        legLiftR: Math.max(0, -swayLeg) * -10
      });
      if (elapsed - stageState.lastEmoteTime > 0.42) {
        stageState.lastEmoteTime = elapsed;
        var emotes = ['💖', '🎵', '⭐', '✨', '🌸'];
        var pick = emotes[Math.floor(Math.random() * emotes.length)];
        spawnStageEmote(pick, 34 + Math.random() * 32, 32 + Math.random() * 26);
      }
    } else {
      // Phase 3: Grand Pose & 5-Star Trophy (8.2s+)
      if (stageState.phase !== 3) {
        stageState.phase = 3;
        triggerFinaleCelebration();
      }
      var idleWave = Math.sin((elapsed - 8.2) * 3.2);
      if (mover) {
        mover.style.transform = 'translateY(' + (15 + idleWave * 3).toFixed(1) + 'px) scale(1.06)';
      }
      applyRigPose(rig, {
        headRot: -5 + idleWave * 2.5,
        armL: 118 + idleWave * 10,
        armR: -32,
        legL: -4,
        legR: 4
      });
    }

    if (stageState.running) {
      stageState.rafId = requestAnimationFrame(stageChoreographyLoop);
    }
  }

  var STAGE_SHOW = {
    start: function (princessSvgElement, getState, onFinish) {
      if (typeof document === 'undefined') return STAGE_SHOW;
      STAGE_SHOW.stop(true);

      var srcSvg = princessSvgElement || document.getElementById('princess-svg');
      stageState.princessSrc = srcSvg;
      stageState.getState = typeof getState === 'function' ? getState : null;
      stageState.onFinish = typeof onFinish === 'function' ? onFinish : null;

      var overlay = createStageOverlayDom();
      var anchor = overlay.querySelector('.stg-performer-mover');
      var trophy = overlay.querySelector('.stg-trophy-card');
      var skipBtn = overlay.querySelector('.stg-skip-btn');
      var curtains = overlay.querySelectorAll('.stg-curtain');
      var fxLayer = overlay.querySelector('.stg-fx-layer');
      var canvas = overlay.querySelector('.stg-confetti-canvas');

      if (anchor) {
        anchor.innerHTML = '';
        anchor.style.transform = 'translateY(-130px) scale(0.55)';
      }
      if (trophy) trophy.classList.remove('show');
      if (skipBtn) skipBtn.style.display = '';
      if (fxLayer) fxLayer.innerHTML = '';
      if (canvas && canvas.getContext) {
        try { canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); } catch (e) {}
      }
      for (var c = 0; c < curtains.length; c++) curtains[c].classList.remove('open');

      stageState.rig = clonePrincessForStage(srcSvg);
      if (anchor && stageState.rig && stageState.rig.svg) {
        anchor.appendChild(stageState.rig.svg);
      }

      overlay.classList.add('active');
      stageState.running = true;
      stageState.phase = 0;
      stageState.trophyShown = false;
      stageState.lastEmoteTime = 0;
      stageState.lastStepTime = 0;
      stageState.startTime = (typeof performance !== 'undefined' ? performance.now() : Date.now());

      SOUND_FX.startShowMusic();
      setTimeout(function () {
        if (!stageState.running || !stageState.overlayEl) return;
        var cs = stageState.overlayEl.querySelectorAll('.stg-curtain');
        for (var i = 0; i < cs.length; i++) cs[i].classList.add('open');
      }, 90);

      if (typeof requestAnimationFrame === 'function') {
        stageState.rafId = requestAnimationFrame(stageChoreographyLoop);
      }
      return STAGE_SHOW;
    },
    stop: function (silent) {
      stageState.running = false;
      if (stageState.rafId && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(stageState.rafId);
        stageState.rafId = null;
      }
      if (stageState.confettiRafId && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(stageState.confettiRafId);
        stageState.confettiRafId = null;
      }
      SOUND_FX.stopShowMusic();
      if (stageState.overlayEl) {
        stageState.overlayEl.classList.remove('active');
      }
      if (!silent && typeof stageState.onFinish === 'function') {
        try { stageState.onFinish(); } catch (e) {}
      }
      return STAGE_SHOW;
    }
  };

  if (typeof document !== 'undefined') {
    if (document.head) {
      ensureStyles();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', ensureStyles);
    }
  }

  if (typeof window !== 'undefined') {
    window.SOUND_FX = SOUND_FX;
    window.NAIL_SALON = NAIL_SALON;
    window.STAGE_SHOW = STAGE_SHOW;
    window.NAILS_STAGE_CSS = NAILS_STAGE_CSS;
  }
})();
