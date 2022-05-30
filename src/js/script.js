'use strict';

/////////////////////
// Map section

// all the songs
let songs = [
  {
    src: 'assets/media/section-serie/song-1.mp3',
    cover: 'assets/media/section-serie/bg1.jpg',
  },
  {
    src: 'assets/media/section-serie/song-2.mp3',
    cover: 'assets/media/section-serie/bg2.webp',
  },
  {
    src: 'assets/media/section-serie/song-3.mp3',
    cover: 'assets/media/section-serie/bg3.webp',
  },
  {
    src: 'assets/media/section-serie/song-4.mp3',
    cover: 'assets/media/section-serie/bg4.webp',
  },
  {
    src: 'assets/media/section-serie/song-5.mp3',
    cover: 'assets/media/section-serie/bg5.jpg',
  },
  {
    src: 'assets/media/section-serie/song-6.mp3',
    cover: 'assets/media/section-serie/bg6.webp',
  },
  {
    src: 'assets/media/section-serie/song-7.mp3',
    cover: 'assets/media/section-serie/bg7.webp',
  },
  {
    src: 'assets/media/section-serie/song-8.mp3',
    cover: 'assets/media/section-serie/bg8.webp',
  },
];

let currentMusic = 0;
let clickNum = 0;
const audio = document.querySelector('#audio');
const player = document.querySelector('.player');
const seekBar = document.querySelector('.progress-bar');
const playPauseBtn = document.querySelector('.play-pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const tape = document.querySelector('.cover');
const playlist = [...document.querySelectorAll('.song')];
console.log(playlist);

// audio.addEventListener('timeupdate', e => {
//   const currentTime = e.target.currentTime;
//   const duration = e.target.duration;
// });

// setting up the music
const setMusic = i => {
  // seek bar value update
  seekBar.value = 0;

  // set the song
  let song = songs[i];
  currentMusic = i;
  audio.src = song.src;
  playlist.forEach(e => {
    e.classList.remove('selected');
  });
  playlist[i].classList.add('selected');

  // current time
  currentTime.innerHTML = '00 : 00';

  // total time + max seek bar value
  setTimeout(() => {
    seekBar.max = audio.duration;
    musicDuration.innerHTML = formatTime(audio.duration);
  }, 600);

  // cover
  tape.style.backgroundImage = `url('${song.cover}')`;
};

// converting seconds to min:sec
const formatTime = time => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

// setMusic(0);

const playMusic = () => {
  player.classList.remove('ispaused');
  playPauseBtn.querySelector('span').innerText = 'pause_circle';
  audio.play();
};
const pauseMusic = () => {
  player.classList.add('ispaused');
  playPauseBtn.querySelector('span').innerText = 'play_circle';
  audio.pause();
};

playlist.forEach((playlistItem, i) => {
  playlistItem.addEventListener('click', () => {
    if (currentMusic === i) {
      clickNum++;
      if (clickNum === 1) {
        setMusic(i);
        playMusic();
      } else if (clickNum % 2 === 0) {
        pauseMusic();
      } else {
        playMusic();
      }
    } else {
      setMusic(i);
      playMusic();
    }
  });
});

audio.addEventListener('timeupdate', e => {
  seekBar.value = e.target.currentTime;
  currentTime.innerHTML = formatTime(e.target.currentTime);
});

seekBar.addEventListener('change', () => {
  audio.currentTime = seekBar.value;
});

// play/pause button
playPauseBtn.addEventListener('click', () => {
  const isPlaying = !player.classList.contains('ispaused');

  isPlaying ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click', () => {
  currentMusic--;
  if (currentMusic >= 0) {
    setMusic(currentMusic);
    playMusic();
  } else {
    currentMusic = playlist.length - 1;
    setMusic(currentMusic);
    playMusic();
  }
});

nextBtn.addEventListener('click', () => {
  currentMusic++;
  if (currentMusic < playlist.length) {
    setMusic(currentMusic);
    playMusic();
  } else {
    currentMusic = 0;
    setMusic(currentMusic);
    playMusic();
  }
});

audio.addEventListener('ended', () => {
  // player.currentTime = 0;
  setMusic(currentMusic);
  playMusic();
});

/////////////////////
// Map section

const sectionMap = document.querySelector('.section-app');
const map = document.querySelector('.map');

const circleAppear = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  map.classList.add('circle-appear');
  observer.unobserve(entry.target);
};

const sectionMapObserver = new IntersectionObserver(circleAppear, {
  root: null,
  threshold: 0.55,
});

sectionMapObserver.observe(sectionMap);
// map.classList.remove('circle-appear');

// Constructing an IntersectionObserver(callbackfunction, options)
// The callback function is called whenever the target is intersecting with the root at the threshold (entries(isARR), observeritself)
// each entry for each target
// const options = {
//   root: null, the element that target is intersecting. by default -> viewport
//   threshold: , percentage of the target in/out (isIntersecting) of the root 0-1 (could also be an array)
//   rootMargin: , percentage/px of the root to account for (t, r, b,l)
// }
// one fires off immediately when its setting up to observe

// Sticky navigation: (1) Intersection Observer API
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;
const heroSection = document.querySelector('.section-hero');

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const headerObserver = new IntersectionObserver((entries, headerObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add('sticky');
      // console.log('not');
    } else {
      header.classList.remove('sticky');
      // console.log('is');
    }
  });
}, headerOptions);

headerObserver.observe(heroSection);

// ////////2/////////////
// // Sticky navigation: (2) Scroll Event
// // its bad because it fires each time we scroll
// const initHeroCoords = heroSection.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // window.scrollY : top of the vp from very top of the entire page
//   console.log(initHeroCoords.top);
//   // if (window.scrollY > nextsectionsboudingclientrect.top which is from the vp)
//   if (window.scrollY > initHeroCoords.height)
//     header.classList.add('sticky');
//   else header.classList.remove('sticky');
// });

const newsimages = document.querySelectorAll('.news figure');
console.log(newsimages);
const newsimagesoptions = {
  root: null,
  threshold: 0,
  rootMargin: '0% 0% -50% 0%',
};
const newsimagesobserver = new IntersectionObserver(
  (entries, newsimagesobserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (entry.target.classList.contains('img--1')) {
        entry.target.classList.add('from-left');
        // console.log('left');
      } else {
        entry.target.classList.add('from-right');
        // console.log('right');
      }

      newsimagesobserver.unobserve(entry.target);
    });
  },
  newsimagesoptions
);

newsimages.forEach(newsimg => newsimagesobserver.observe(newsimg));
