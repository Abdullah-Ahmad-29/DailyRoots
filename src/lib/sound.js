// Lightweight Web Audio API Synthesizer for organic sound design

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function isMuted() {
  return localStorage.getItem('roots_sound_muted') === 'true';
}

export function playWaterDrip() {
  if (isMuted()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Sine oscillator for bubble bubble bubble drip
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    
    // Bubble upward sweep sweep frequency
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
    
    // Bubble volume curve
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.warn("Audio Context failed:", e);
  }
}

export function playSoilRustle() {
  if (isMuted()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Buffer for white noise
    const bufferSize = ctx.sampleRate * 0.12; // 120ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    // Lowpass filter to make it sound like dirt
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseNode.start(now);
    noiseNode.stop(now + 0.13);
  } catch (e) {
    console.warn("Audio Context failed:", e);
  }
}

export function playHarvestChime() {
  if (isMuted()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Chord arpeggio notes: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const noteTime = now + idx * 0.08;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.12, noteTime + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.52);
    });
  } catch (e) {
    console.warn("Audio Context failed:", e);
  }
}
