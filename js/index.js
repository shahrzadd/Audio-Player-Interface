let isPlaying;
let currentAudioIdx;
let audioPlayer;
let musicList;
let nameFilter;
let filters = {
    artist: '',
    name: ''
}

let finalList;

function initialize() {
    isPlaying = false;
    currentAudioIdx = 0;
    setCurrentAudio();
    loadPlayList();
    playPauseToggle();
}

// play next
function nextClicked(elem) {
    console.log('next clicked');
    if (currentAudioIdx < currentPlaylist().length - 1) {
        currentAudioIdx++;
        setCurrentAudio();
    }
}

// play previous
function prevClicked(elem) {
    console.log('play clicked');
    if (currentAudioIdx > 0) {
        currentAudioIdx--;
        setCurrentAudio();
    }
}

function playRecordByIndex(idx) {
    currentAudioIdx = idx;
    isPlaying = true;
    playPauseToggle();
    setCurrentAudio();
    audioPlayer.play();
}

// Play audio
function play() {
    console.log('play clicked');
    isPlaying = true;
    playPauseToggle();
    
}

// Pause audio
function pause() {
    console.log('pause clicked');
    isPlaying = false;
    playPauseToggle();
}

function playPauseToggle() {
    if (isPlaying) {
        document.getElementById("pauseButton").style.display = "inline-flex";
        document.getElementById("playButton").style.display = "none";
        audioPlayer.play();
    } else {
        document.getElementById("pauseButton").style.display = "none";
        document.getElementById("playButton").style.display = "inline-flex";
        audioPlayer.pause();
    }
}

function handlePlayPause(elem) {
    if (isPlaying) {
        elem.src = 'images/icons/pause.png';
        
    } else {
        elem.src = 'images/icons/play.png';
        audioPlayer.pause();
    }
}