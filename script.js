// Global references
const overlay       = document.getElementById('overlay');
const circle        = document.getElementById('breathing-circle');
const titleEl       = document.getElementById('exercise-title');
const guideEl       = document.getElementById('exercise-guide');
const timerEl       = document.getElementById('timer');
const audioVoiceover= document.getElementById('audio-voiceover');
const audioBg       = document.getElementById('audio-bg');

let currentExercise = null;
let isRunning       = false;
let cycleCount      = 0;
const totalCycles   = 10; // max cycles
let intervalId      = null;
let secondsElapsed  = 0;

/**
 * Called from HTML: <div onclick="showOverlay('box')">
 * Must be in the global scope (no "type=module").
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

  resetAnimation();
}

/**
 * Clicking the circle starts/stops the session.
 */
circle.onclick = function() {
  if (!isRunning) {
    startBreathing();
  } else {
    stopBreathing();
  }
};

/**
 * Start the breathing animation, background music, voiceover, and timer.
 */
function startBreathing() {
  isRunning = true;
  cycleCount = 0;
  secondsElapsed = 0;
  timerEl.textContent = '00:00';

  // Assign the correct animations and audio
  switch (currentExercise) {
    case 'box':
      // 16s each cycle, repeated 10 times
      circle.style.animation =
        'boxBreathing 16s linear 10, ' +
        'boxOutline 16s linear 10';
      audioVoiceover.src = 'assets/sounds/box-breathing.mp3';
      audioBg.src        = 'assets/sounds/meditation-bg.mp3';
      break;

    case '478':
      // 19s each cycle, repeated 10 times
      circle.style.animation =
        'fourSevenEight 19s linear 10, ' +
        'fourSevenEightOutline 19s linear 10';
      audioVoiceover.src = 'assets/sounds/4-7-8-breathing.mp3';
      audioBg.src        = 'assets/sounds/meditation-bg.mp3';
      break;

    case 'pranayama':
      // 12s each cycle, repeated 10 times
      circle.style.animation =
        'pranayama 12s linear 10, ' +
        'pranayamaOutline 12s linear 10';
      audioVoiceover.src = 'assets/sounds/pranayama.mp3';
      audioBg.src        = 'assets/sounds/meditation-bg.mp3';
      break;
  }

  // Play voiceover & background
  audioVoiceover.play();
  audioBg.play();

  // Listen for cycle iterations and final end
  circle.addEventListener('animationiteration', onAnimationIteration);
  circle.addEventListener('animationend', onAnimationEnd);

  // Start the timer
  intervalId = setInterval(updateTimer, 1000);
}

/**
 * Stop breathing animation, audio, and timer.
 */
function stopBreathing() {
  isRunning = false;
  circle.style.animation = 'none';

  circle.removeEventListener('animationiteration', onAnimationIteration);
  circle.removeEventListener('animationend', onAnimationEnd);

  audioVoiceover.pause();
  audioVoiceover.currentTime = 0;
  audioBg.pause();
  audioBg.currentTime = 0;

  clearInterval(intervalId);
}

/**
 * Each cycle triggers animationiteration. After the 10th iteration,
 * the final end event fires.
 */
function onAnimationIteration() {
  cycleCount++;
  if (cycleCount >= totalCycles) {
    // The next animationend event is final
  }
}

/**
 * Called when the final iteration completes (10 cycles).
 */
function onAnimationEnd() {
  stopBreathing();
}

/**
 * Reset the circle animations & audio in preparation for a new session.
 */
function resetAnimation() {
  circle.style.animation = 'none';
  audioVoiceover.pause();
  audioVoiceover.currentTime = 0;
  audioBg.pause();
  audioBg.currentTime = 0;
  clearInterval(intervalId);
}

/**
 * Increment the timer every second, show as mm:ss.
 */
function updateTimer() {
  secondsElapsed++;
  let mins = Math.floor(secondsElapsed / 60);
  let secs = secondsElapsed % 60;
  let mm = mins < 10 ? '0' + mins : mins;
  let ss = secs < 10 ? '0' + secs : secs;
  timerEl.textContent = `${mm}:${ss}`;
}

/**
 * Closes the overlay & stops everything immediately.
 */
function closeOverlay() {
  overlay.style.display = 'none';
  stopBreathing();
}
