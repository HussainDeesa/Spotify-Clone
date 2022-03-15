let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
// gif.style.opacity = 0;
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let bottom = document.getElementById("bottom")
let songItemContainer = document.querySelector('.songItemContainer');
let songItemPlay
let songs = [
    { songName: "BurjKhalifa- Lakshmi Bomb", filePath: "songs/1.mp3", coverPath: "covers/Burj Khalifa.jpg", duration: "03:25" },
    { songName: "Khairiyat- Kabir Singh", filePath: "songs/2.mp3", coverPath: "covers/Khairiyat.jpg", duration: "04:40" },
    { songName: "Tera Ban Jaunga", filePath: "songs/5.mp3", coverPath: "covers/Tera Ban Jaunga.jpg", duration: "03:56" },
    { songName: "Tera Jaisa Yaar Kahan", filePath: "songs/6.mp3", coverPath: "covers/Tere jaise yaar.jpg", duration: "02:41" },
    { songName: "Nashe Se Chad Gayi", filePath: "songs/3.25", coverPath: "covers/nashe se.jpg", duration: "03:51" },
    { songName: "Shape Of You-Ed Sheeran", filePath: "songs/4.51", coverPath: "covers/shape of u.jpg", duration: "03:55" },
    { songName: "Dil Diya Galan-Tiger Zinda Hai", filePath: "songs/7.39", coverPath: "covers/dil diya.jpg", duration: "04:20" },
    { songName: "Pal", filePath: "songs/8.23", coverPath: "covers/pal.jpg", duration: "04:07" },
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/9.mp3", coverPath: "covers/1.jpg", duration: "03:50" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/18.mp3", coverPath: "covers/2.jpg", duration: "02:33" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/11.mp3", coverPath: "covers/3.jpg", duration: "04:33" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/12.mp3", coverPath: "covers/4.jpg", duration: "04:27" },
    { songName: "Janji-Heroes-Tonight", filePath: "songs/11.mp3", coverPath: "covers/5.jpg", duration: "03:28" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/12.mp3", coverPath: "covers/6.jpg", duration: "04:27" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/7.jpg", duration: "04:33" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/14.mp3", coverPath: "covers/8.jpg", duration: "04:25" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/18.mp3", coverPath: "covers/9.jpg", duration: "03:15" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/16.mp3", coverPath: "covers/10.jpg", duration: "02:25" }

]
let i = 0
let duration
const addDOM = () => {

    for (i = 0; i < songs.length; i++) {
        html = ` <div class="card songItem my-2">
    <img src="${songs[i].coverPath}" class="card-img-top" alt="1" height="100px" >
    <span class="card-body songName">${songs[i].songName}</span>
    <div class="card-text songlistplay"><div class="timestamp"><img src="time.png">${songs[i].duration}<i id="${i}" class="fa songItemPlay fa-play"></i></div></div>
    </div> `
        songItemContainer.innerHTML += html;
    }
}
addDOM();
songItemPlay = document.querySelectorAll('.songItemPlay')
masterPlay.addEventListener('click', (e) => {
    if(masterPlay.classList.contains('fa-pause-circle')){
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songItemPlay[songIndex].classList.remove('fa-pause')
        songItemPlay[songIndex].classList.add('fa-play')    
    }
    else{
        audioElement.play();
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
        songItemPlay[songIndex].classList.add('fa-pause')
        songItemPlay[songIndex].classList.remove('fa-play')
    
    }
    // bottom.classList.add('hide')
    // songItemPlay[songIndex].classList.remove('fa-pause')
    // songItemPlay[songIndex].classList.add('fa-play')
})

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        curr = songIndex
        songIndex = parseInt(e.target.id);
    
        if (audioElement.paused) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            bottom.classList.remove('hide')
            bottom.classList.add('show')
            audioElement.src = `${songs[songIndex].filePath}`;
            masterSongName.innerText = songs[songIndex].songName;
            curr = songIndex
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

        }
        else if (songIndex == curr) {
            audioElement.pause()
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            bottom.classList.add('hide')
            gif.style.opacity = 0;

        }
        else if (audioElement.played) {
            audioElement.pause()
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            bottom.classList.remove('hide')
            bottom.classList.add('show')
            audioElement.src = `${songs[songIndex].filePath}`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 17) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    if (songIndex != 0) {
        songItemPlay[songIndex - 1].classList.add('fa-play')
        songItemPlay[songIndex - 1].classList.remove('fa-pause')
    }
    songItemPlay[songIndex].classList.remove('fa-play')
    songItemPlay[songIndex].classList.add('fa-pause')

})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songItemPlay[songIndex + 1].classList.add('fa-play')
    songItemPlay[songIndex + 1].classList.remove('fa-pause')
    songItemPlay[songIndex].classList.remove('fa-play')
    songItemPlay[songIndex].classList.add('fa-pause')
})



