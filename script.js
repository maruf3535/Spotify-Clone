/*
 * Set the songDuration
 * play, pause with every individual song.
 * and so on etc...
*/


// Initializing the variables
let songIndex = 0;
let backward = document.getElementsByClassName('backward');
let forward = document.getElementsByClassName('forward');
let progressBar = document.getElementById('progressBar');
let master_play_pause = Array.from(document.getElementsByClassName('master_play_pause'));
let item_play_pause = Array.from(document.getElementsByClassName('item_play_pause'));
let songDuration = Array.from(document.getElementsByClassName('song-duration'));
let set_song_duration = document.getElementById('set_song_duration');
let masterSongName = document.getElementById('masterSongName');
let songPlayGif = document.getElementById('songPlayGif');

let audioElement = new Audio('../songs/7.mp3');

let songItems = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "7.mp3", coverPath: "1.jpg" },
    { songName: "DEAF KEV - Invincible Huma-Huma", filePath: "4.mp3", coverPath: "2.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart", filePath: "3.mp3", coverPath: "3.jpg" },
]

var togglePlayPause = () => {
    if (audioElement.paused) {
        audioElement.play();
        songPlayGif.style.opacity = '1';
    }
    else {
        audioElement.pause();
        songPlayGif.style.opacity = '0';
    }
};

var masterPlayPause = () => {
    if (audioElement.paused) {
        master_play_pause[0].style.display = 'inline-block';
        master_play_pause[1].style.display = 'none';
        manageOtherItem();
    }
    else {
        master_play_pause[0].style.display = 'none';
        master_play_pause[1].style.display = 'inline-block';
    }
}

master_play_pause.forEach((element) => {
    element.addEventListener('click', (elm) => {
        elm = elm.target;
        togglePlayPause();
        masterPlayPause();
    });
});

var manageOtherItem = () => {
    item_play_pause.forEach(item => {
        item.children[0].style.display = 'inline-block';
        item.children[1].style.display = 'none';
    });
    audioElement.pause();
};

// Set the song details into the HTML from 'songItems' details
// 1. set the song cover
Array.from(document.getElementsByClassName('songItemImage')).forEach((element, i) => {
    let elmImg = element.getElementsByTagName('img')[0];
    elmImg.src = songItems[i]['coverPath'];
});
// 2. set the song name
Array.from(document.getElementsByClassName('songName')).forEach((element, i) => {
    element.innerText = songItems[i]['songName'];
});
// 3. set the song duration
// set_song_duration.addEventListener('click', () => {
//     songDuration.forEach((element) => {
//         element.innerText = audioElement.duration;
//     });
// })
// songDuration.forEach((element, i) => {
//     element.innerText = audioElement.duration;
// });


item_play_pause.forEach((element, i) => {
    element.addEventListener('click', () => {
        manageOtherItem();
        element.children[0].style.display = 'none';
        element.children[1].style.display = 'inline-block';
        audioElement.src = songItems[i]['filePath'];
        masterSongName.innerText = songItems[i]['songName'];
        audioElement.currentTime = 0;
        audioElement.play();
        songPlayGif.style.opacity = '1';
        masterPlayPause()
    });
});

// previous button logic
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1
    }
    audioElement.src = songItems[songIndex]['filePath'];
    masterSongName.innerText = songItems[songIndex]['songName'];
    audioElement.currentTime = 0;
    audioElement.play();
    songPlayGif.style.opacity = '1';
    masterPlayPause()
});
// next button logic
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 2) {
        songIndex = 0;
    }
    else {
        songIndex += 1
    }
    audioElement.src = songItems[songIndex]['filePath'];
    masterSongName.innerText = songItems[songIndex]['songName'];
    audioElement.currentTime = 0;
    audioElement.play();
    songPlayGif.style.opacity = '1';
    masterPlayPause()
});

// handle the progressbar
audioElement.addEventListener('timeupdate', () => {
    progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

