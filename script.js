let audioPlayer;

function startExercise(type) {
    const overlay = document.getElementById('overlay');
    const title = document.getElementById('exercise-title');
    const guide = document.getElementById('exercise-guide');
    audioPlayer = document.getElementById('audio-player');

    overlay.style.display = 'flex';

    switch (type) {
        case 'box':
            title.innerText = 'Box Breathing';
            guide.innerText = 'Inhale 4s - Hold 4s - Exhale 4s - Hold 4s';
            startAnimation(4);
            playAudio('assets/sounds/box-breathing.mp3');
            break;
        case '4-7-8':
            title.innerText = '4-7-8 Breathing';
            guide.innerText = 'Inhale 4s - Hold 7s - Exhale 8s';
            startAnimation(7);
            playAudio('assets/sounds/4-7-8-breathing.mp3');
            break;
        case 'pranayama':
            title.innerText = 'Pranayama';
            guide.innerText = 'Inhale deeply and exhale slowly.';
            startAnimation(5);
            playAudio('assets/sounds/pranayama.mp3');
            break;
    }
}

// 🆕 Add this function to handle the animation
function startAnimation(duration) {
    const circle = document.querySelector('.circle-animation');
    circle.style.animation = `breathing ${duration}s infinite ease-in-out`;
}

function playAudio(filePath) {
    audioPlayer.src = filePath;
    audioPlayer.play();
}

function stopExercise() {
    document.getElementById('overlay').style.display = 'none';
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}
