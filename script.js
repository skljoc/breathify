// If you keep the script as a normal script, this is all you need:
// (No "type=module" in the HTML)
const overlay = document.getElementById('overlay');
const circle = document.getElementById('breathing-circle');
const titleEl = document.getElementById('exercise-title');
const guideEl = document.getElementById('exercise-guide');
const timerEl = document.getElementById('timer');

const audioVoiceover = document.getElementById('audio-voiceover');
const audioBg = document.getElementById('audio-bg');

let currentExercise = null;
let isRunning = false;
let cycleCount = 0;
const totalCycles = 10;
let intervalId = null;
let secondsElapsed = 0;

/**
 * This function needs to be defined in the global scope
 * so it can be called by onclick in the HTML.
 */
function showOverlay(exercise) {
  currentExercise = exercise;
  isRunning = false;
  cycleCount = 0;
  secondsElapsed = 0;
  timerEl.textContent = '00:00';

  overlay.style.display = 'flex';

  switch (exercise) {
    case 'box':
      titleEl.textContent = 'Box Breathing';
      guideEl.textContent = 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s';
      break;
    case '478':
      titleEl.textContent = '4-7-8 Breathing';
      guideEl.textContent = 'Inhale 4s, Hold 7s, Exhale 8s';
      break;
    case 'pranayama':
      titleEl.textContent = 'Pranayama';
      guideEl.textContent = 'Inhale 4s, Hold 1s, Exhale 7s';
      break;
  }

  // Reset animations & audio
  resetAnimation();
}

/**
 * Called when the user clicks the circle (start/stop).
 */
circle.onclick = function() {
  if (!isRunning) {
    startBreathing();
  } else {
    stopBreathing();
  }
};

function startBreathing() {
  isRunning = true;
  cycleCount = 0;
  secondsElapsed = 0;
  timerEl.textContent = '00:00';

  // Apply specific animation
  switch (currentExercise) {
    case 'box':
      circle.style.animation = 'boxBreathing 16s linear 10';
      audioVoiceover.src = 'assets/sounds/box-breathing.mp3';
      audioBg.src = 'assets/sounds/meditation-bg.mp3';
      break;
    case '478':
      circle.style.animation = 'fourSevenEight 19s linear 10';
      audioVoiceover.src = 'assets/sounds/4-7-8-breathing.mp3';
      audioBg.src = 'assets/sounds/meditation-bg.mp3';
      break;
    case 'pranayama':
      circle.style.animation = 'pranayama 12s linear 10';
      audioVoiceover.src = 'assets/sounds/pranayama.mp3';
      audioBg.src = 'assets/sounds/meditation-bg.mp3';
      break;
  }

  // Play voiceover + background
  audioVoiceover.play();
  audioBg.play();

  // Listen for each animation iteration (cycle)
  circle.addEventListener('animationiteration', onAnimationIteration);
  // Listen for the final animation end (after 10 cycles)
  circle.addEventListener('animationend', onAnimationEnd);

  // Start the timer
  intervalId = setInterval(updateTimer, 1000);
}

function stopBreathing() {
  isRunning = false;
  circle.style.animation = 'none';

  // Remove event listeners
  circle.removeEventListener('animationiteration', onAnimationIteration);
  circle.removeEventListener('animationend', onAnimationEnd);

  // Stop audio
  audioVoiceover.pause();
  audioVoiceover.currentTime = 0;
  audioBg.pause();
  audioBg.currentTime = 0;

  // Stop timer
  clearInterval(intervalId);
}

function onAnimationIteration() {
  cycleCount++;
  if (cycleCount >= totalCycles) {
    // The next end event is final
  }
}

function onAnimationEnd() {
  // This means 10 cycles done
  stopBreathing();
}

function resetAnimation() {
  circle.style.animation = 'none';
  audioVoiceover.pause();
  audioVoiceover.currentTime = 0;
  audioBg.pause();
  audioBg.currentTime = 0;
  clearInterval(intervalId);
}

function updateTimer() {
  secondsElapsed++;
  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;
  let mm = mins < 10 ? '0' + mins : mins;
  let ss = secs < 10 ? '0' + secs : secs;
  timerEl.textContent = `${mm}:${ss}`;
}

/* 
  If you must use type="module" in index.html, 
  attach showOverlay to the window object like this:

  window.showOverlay = showOverlay;
*/
