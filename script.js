let currentExercise = null;
let isRunning = false;
let cycleCount = 0;
let totalCycles = 10;
let intervalId = null;
let secondsElapsed = 0;

const overlay = document.getElementById('overlay');
const circle = document.getElementById('breathing-circle');
const titleEl = document.getElementById('exercise-title');
const guideEl = document.getElementById('exercise-guide');
const timerEl = document.getElementById('timer');

const audioVoiceover = document.getElementById('audio-voiceover');
const audioBg = document.getElementById('audio-bg');

/**
 * Show the overlay for a selected exercise.
 * Set titles, instructions, and reset states.
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

  // Remove any animation classes
  resetAnimationClasses();

  // Pause audio if it was playing before
  audioVoiceover.pause();
  audioBg.pause();
  audioVoiceover.currentTime = 0;
  audioBg.currentTime = 0;
}

/**
 * Toggle the breathing animation and audio when circle is clicked.
 */
circle.onclick = function () {
  if (!isRunning) {
    startBreathing();
  } else {
    stopBreathing();
  }
};

/**
 * Start the breathing animation, background music, and timer.
 */
function startBreathing() {
  isRunning = true;
  cycleCount = 0;
  secondsElapsed = 0;
  timerEl.textContent = '00:00';

  // Set the correct CSS animation for each exercise
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

  // Play both voiceover & background
  audioVoiceover.play();
  audioBg.play();

  // Listen for each animation iteration
  circle.addEventListener('animationiteration', handleIteration);
  // Listen for final animation end
  circle.addEventListener('animationend', handleAnimationEnd);

  // Start timer
  intervalId = setInterval(updateTimer, 1000);
}

/**
 * On each iteration, increment cycle count and check if we've hit 10 cycles.
 */
function handleIteration() {
  cycleCount++;
  if (cycleCount >= totalCycles) {
    // Next iteration is the final end
    // No immediate action needed, final end triggers handleAnimationEnd
  }
}

/**
 * Called when the final iteration ends (10 cycles).
 */
function handleAnimationEnd() {
  stopBreathing();
}

/**
 * Stop breathing animation, audio, and timer.
 */
function stopBreathing() {
  isRunning = false;
  circle.style.animation = 'none';

  circle.removeEventListener('animationiteration', handleIteration);
  circle.removeEventListener('animationend', handleAnimationEnd);

  audioVoiceover.pause();
  audioVoiceover.currentTime = 0;
  audioBg.pause();
  audioBg.currentTime = 0;

  clearInterval(intervalId);
}

/**
 * Reset any animation classes or inline styles on the circle.
 */
function resetAnimationClasses() {
  circle.style.animation = 'none';
}

/**
 * Update timer in mm:ss format.
 */
function updateTimer() {
  secondsElapsed++;
  let mins = Math.floor(secondsElapsed / 60);
  let secs = secondsElapsed % 60;

  // Format as mm:ss
  let mm = mins < 10 ? '0' + mins : mins;
  let ss = secs < 10 ? '0' + secs : secs;
  timerEl.textContent = `${mm}:${ss}`;
}
