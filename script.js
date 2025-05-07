console.log("Welcome to Spotify");

// Initialize the variables
let songidx = 0;
let audioElement = new Audio('songs/Adhento_Gaani_Vunnapaatuga.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: 'Adento Gaani Vunnapaatuga', filePath: "songs/Adhento_Gaani_Vunnapaatuga.mp3", coverPath: "cover/Adentogani.jpg" },
    { songName: 'Chuttamalle', filePath: "songs/Chuttamalle.mp3", coverPath: "cover/Chuttamalle.jpg" },
    { songName: 'Kolla Kalle llaa', filePath: "songs/Kola_Kalle_Ilaa.mp3", coverPath: "cover/Finding_her.jpg" },
    { songName: 'Manasa Manasa', filePath: "songs/Manasa_Manasa.mp3", coverPath: "cover/kollakalleilla.webp" },
    { songName: 'Nee choopule', filePath: "songs/Nee_choopule.mp3", coverPath: "cover/manasa_manasa.jpg" },
    { songName: 'Saiyaan', filePath: "songs/Saiyyan.mp3", coverPath: "cover/nee_chupule.jpg" },
    { songName: 'Finding her', filePath: "songs/Finding_her.mp3", coverPath: "cover/saiyaan.jpg" },
    { songName: 'Urike Urike', filePath: "songs/Urike_Urike.mp3", coverPath: "cover/urikeurike.jpg" },
];

// Update UI with songs data
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to reset all play icons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play/Pause click for master play button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
        // Set the clicked song's icon to paused
        document.getElementsByClassName('songItemPlay')[songidx].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songidx].classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        
        // Set the clicked song's icon to play again
        document.getElementsByClassName('songItemPlay')[songidx].classList.remove('fa-pause-circle');
        document.getElementsByClassName('songItemPlay')[songidx].classList.add('fa-play-circle');
    }
});

// Update progress bar while audio is playing
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change song time when progress bar value changes
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle click on individual song play/pause buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        const clickedSongIdx = i; // Get the index of the clicked song
        
        if (songidx === clickedSongIdx && !audioElement.paused) {
            // If the clicked song is already playing, pause it
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
        } else {
            // Reset all song buttons to play state
            makeAllPlays();
            songidx = clickedSongIdx;

            // Set the clicked song's icon to pause and play the song
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songidx].filePath;
            masterSongName.innerText = songs[songidx].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            // Change the master play button icon to pause
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
        }
    });
});

// Next button click functionality
document.getElementById('next').addEventListener('click', () => {
    if (songidx >= 7) {
        songidx = 0;
    } else {
        songidx += 1;
    }
    audioElement.src = songs[songidx].filePath;
    masterSongName.innerText = songs[songidx].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    
    // Reset all play buttons and update the current song row to paused
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songidx].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songidx].classList.add('fa-pause-circle');

    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});

// Previous button click functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songidx <= 0) {
        songidx = 0;
    } else {
        songidx -= 1;
    }
    audioElement.src = songs[songidx].filePath;
    masterSongName.innerText = songs[songidx].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    // Reset all play buttons and update the current song row to paused
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songidx].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songidx].classList.add('fa-pause-circle');

    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});
