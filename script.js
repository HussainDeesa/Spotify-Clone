
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
gif.style.opacity=0;
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let bottom=document.getElementById("bottom")
let songItemContainer=document.querySelector('.songItemContainer');

let songs = [
    {songName: "BurjKhalifa- Lakshmi Bomb", filePath: "songs/1.mp3", coverPath: "covers/Burj Khalifa.jpg"},
    {songName: "Khairiyat- Kabir Singh", filePath: "songs/2.mp3", coverPath: "covers/Khairiyat.jpg"},
    {songName: "Tera Ban Jaunga", filePath: "songs/5.mp3", coverPath: "covers/Tera Ban Jaunga.jpg"},
    {songName: "Tera Jaisa Yaar Kahan", filePath: "songs/6.mp3", coverPath: "covers/Tere jaise yaar.jpg"},
    {songName: "Nashe Se Chad Gayi", filePath: "songs/3.25", coverPath: "covers/nashe se.jpg"},
    {songName: "Shape Of You-Ed Sheeran", filePath: "songs/4.51", coverPath: "covers/shape of u.jpg"},
    {songName: "Dil Diya Galan-Tiger Zinda Hai", filePath: "songs/7.39", coverPath: "covers/dil diya.jpg"},
    {songName: "Pal", filePath: "songs/8.23", coverPath: "covers/pal.jpg"},
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/9.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/18.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/11.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/12.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/11.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/12.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/14.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/18.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/16.mp3", coverPath: "covers/10.jpg"}
    
]
let i=0
let duration
const addDOM=()=>{
    
    for(i=0;i<songs.length;i++){ 
        duration=new Audio(songs[i].filePath)
    html=` <div class="card songItem my-2">
    <img src="${songs[i].coverPath}" class="card-img-top" alt="1" height="100px" >
    <span class="card-body songName">${songs[i].songName}</span>
    <div class="card-text songlistplay"><div class="timestamp"><img src="time.png">${parseInt(duration.duration)}<i id="${i}" class="fa songItemPlay fa-play"></i></div></div>
    </div> `
    songItemContainer.innerHTML +=html;
    }
}
addDOM();
// songItems.forEach((element, i)=>{ 
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
//     addDOM(i);
// })
 

// Handle play/pause click
masterPlay.addEventListener('click', (e)=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        bottom.classList.add('hide')

    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused){
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
        else{
            audioElement.pause()
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            bottom.classList.add('hide')
            gif.style.opacity = 0;
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=17){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})