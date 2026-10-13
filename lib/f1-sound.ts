// Flyby clip for the F1 intro pass. Plays on theme switch (always allowed,
// it's a click) and on page load (only where the browser's autoplay policy allows).
let audio: HTMLAudioElement | null = null;
let lastPlay = 0;

/** Creates the shared element so the mp3 is cached before the first switch. */
export function primeF1Pass() {
  if (audio) return audio;
  audio = new Audio("/sounds/f1-pass.mp3");
  audio.preload = "auto";
  audio.volume = 0.35;
  return audio;
}

export function playF1Pass() {
  // StrictMode's double mount effect (or two triggers on one frame) must not restart the clip.
  const now = performance.now();
  if (now - lastPlay < 300) return;
  lastPlay = now;

  const clip = primeF1Pass();
  clip.currentTime = 0;
  clip.play().catch(() => {});
}
