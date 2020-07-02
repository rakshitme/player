// Songs CLass 
class Songs{
  constructor({name= 'unknown', artist = 'unknown', src = 'unknown', thumbNail_SRC = 'unknown'} = {name:'unknown', artist:'unknown', src:'unknown' , thumbNail_SRC: 'unknown'}) {
    this.name = name;
    this.artist = artist;
    this.src = src;
    this.thumbNail_SRC = thumbNail_SRC
  }
}

// song list with song Obj
var songList = [
  new Songs({name: "Calma", artist: "Pedro Capó, Farruko", src: "music/Pedro Capó, Farruko - Calma.mp3", thumbNail_SRC: "music/calma.jpg"}),
  new Songs({name: "We Don't Talk Anymore", src: "music/Charlie Puth - We Don t Talk Anymore feat. Selena Gomez.mp3", artist: "Charlie Puth,  feat. Selena Gomez",  thumbNail_SRC: "music/song-2.jpg"})
]


// Variables
var playingCount = 0
var playing = false
var backgroundThumbNail = songList[playingCount].thumbNail_SRC
const statBTN = document.querySelector(".playing .play-pause-btn")
const nextBTN = document.querySelector(".playing .play-next-btn")
const previousBTN = document.querySelector(".playing .play-previous-btn")
const musicBackground = document.querySelector(".playing .blur")
const rotatingCD = document.querySelector(".playing .rotateCD")
const songNameDisplay = document.querySelector(".player marquee")
const progressBar = document.querySelector(".player .progressBar")
const progress = document.querySelector(".player .progress")


// AUDIO Object
const music = new Audio(songList[playingCount].src)


// functions
function playMusic(){
  music.play()
  playing = true
  backgroundThumbNail = songList[playingCount].thumbNail_SRC
  statBTN.style.backgroundImage =  "url(icon/white/icons8-pause-50-3.png)"
  rotatingCD.style.animationPlayState = "running"

  if (backgroundThumbNail == 'unknown') {
    musicBackground.style.backgroundImage = "url(img/white-headphone-1037992.jpg)"
    rotatingCD.style.backgroundImage = "url(img/white-headphone-1037992.jpg)"
  }
  else{
    musicBackground.style.backgroundImage = `url(${backgroundThumbNail})`
    rotatingCD.style.backgroundImage = `url(${backgroundThumbNail})`
  }

  if ( (songList[playingCount].artist == 'unknown')&&(songList[playingCount].name == 'unknown') ) {
    songNameDisplay.innerHTML = "♪♪♪"
  }
  else if (songList[playingCount].artist == 'unknown') {
    songNameDisplay.innerHTML = songList[playingCount].name
  }
  else if (songList[playingCount].name == 'unknown'){
    songNameDisplay.innerHTML = "by- " + songList[playingCount].artist
  }
  else{
    songNameDisplay.innerHTML = `${songList[playingCount].artist} - ${songList[playingCount].name}`
  }

}

function pauseMusic(){
  music.pause()
  playing = false
  statBTN.style.backgroundImage =  "url(icon/white/icons8-play-50-3.png)"
  rotatingCD.classList.remove("rotating")
  rotatingCD.style.animationPlayState = "paused"
}


// Event Listners
nextBTN.addEventListener("click", ()=>{
  if (playingCount >= songList.length  - 1) {
    playingCount = 0
    music.src = songList[playingCount].src
    playMusic()
  }
  else{
    playingCount += 1
    music.src = songList[playingCount].src
    playMusic()
  }
} )

previousBTN.addEventListener("click", ()=>{
  if (playingCount <= 0) {
    playingCount = songList.length - 1
    music.src = songList[playingCount].src
    playMusic()
  }
  else{
    playingCount -= 1
    music.src = songList[playingCount].src
    playMusic()
  }
} )

statBTN.addEventListener("click", ()=>{
  if (playing){
    pauseMusic()
  }
  else{
    playMusic()
  }
})

music.addEventListener("timeupdate", (e)=>{
  if (music.currentTime) {
    progress.style.width = `${(music.currentTime / music.duration) * 100}%`
  }
  if (music.currentTime == music.duration) {
    if (playingCount >= songList.length  - 1) {
      playingCount = 0
      music.src = songList[playingCount].src
      playMusic()
    }
    else{
      playingCount += 1
      music.src = songList[playingCount].src
      playMusic()
    }
  }
})
progressBar.addEventListener("click", (e)=>{
  music.currentTime = ( music.duration / 300 ) * e.offsetX
})
