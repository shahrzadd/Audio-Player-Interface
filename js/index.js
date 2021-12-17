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

// updates current audio by ID
function setCurrentAudio() {
    currentAudio = `songs/${currentPlaylist()[currentAudioIdx].src}`;
    audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = currentAudio;
    reloadCoverArea();
}

// update cover area
function reloadCoverArea() {
    const audio = currentPlaylist()[currentAudioIdx];
    document.getElementById("coverArt").src = `images/cover/${audio.cover}`;
    document.getElementById("audioName").innerText = audio.name;
    document.getElementById("artistName").innerText = audio.artist;
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

// handler for the filters
function applyFilter(elem, type) {
    if (type == 'name') {
        filters.name = elem.value;
    } else {
        filters.artist = elem.value;
    }
    finalList = allMusicOG.filter(item => {
        if (filters.name && !item.name.toUpperCase().includes(filters.name.toUpperCase())) return false;
        if (filters.artist && !item.artist.toUpperCase().includes(filters.artist.toUpperCase())) return false;
        return true;
    });
    loadPlayList();
}

function currentPlaylist() {
    return (filters.artist || filters.name) ? finalList : allMusicOG;
}

// load playlist table
function loadPlayList() {
    const pl = document.getElementById('playListBody');
    let tBody = "";
    currentPlaylist().forEach((song, idx) => {
        let tRow = `
            <tr class='audio-row' onClick=playRecordByIndex(${idx})>
                <td>
                    <p>${song.name}</p>
                </td>
                <td>
                    <p>${song.artist}</p>
                </td>
            </tr>
        `;
        tBody = tBody + tRow;
    });
    pl.innerHTML = tBody;
}

function updateTimer() {
    const cur = audioPlayer.currentTime;
    const rem = isNaN(audioPlayer.duration) ? 0 : audioPlayer.duration - audioPlayer.currentTime;
    const min = document.querySelector('.current-time').innerText = formatTime(cur);
    const max = document.querySelector('.max-duration').innerText = formatTime(rem)
}

function formatTime(timer) {
    let mins = Math.floor(timer / 60);
    let secs = Math.floor(timer % 60);
    if (secs < 10) {
        secs = `0${String(secs)}`;
    }

    return `${mins}:${secs}`;
}

// Initializes the app
initialize();
