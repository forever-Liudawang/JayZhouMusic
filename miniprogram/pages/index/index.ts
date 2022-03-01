// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page<any,any>({
  data: {
    audio: {},
    circleLeft: {},
    barWidth: {},
    duration: {},
    currentTime: null,
    isTimerPlaying: false,
    tracks: [
      {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/1.jpg",
        source: "https://physical-authority.surge.sh/music/1.mp3",
        url: "https://www.17sucai.com/",
        favorited: false
      },
      {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/2.jpg",
        source: "https://physical-authority.surge.sh/music/2.mp3",
        url: "https://www.17sucai.com/",
        favorited: true
      },
      {
        name: "Extreme Ways",
        artist: "Moby",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/3.jpg",
        source: "https://physical-authority.surge.sh/music/3.mp3",
        url: "https://www.17sucai.com/",
        favorited: false
      },
      {
        name: "Butterflies",
        artist: "Sia",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/4.jpg",
        source: "https://physical-authority.surge.sh/music/4.mp3",
        url: "https://www.17sucai.com/",
        favorited: false
      },
      {
        name: "The Final Victory",
        artist: "Haggard",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/5.jpg",
        source: "https://physical-authority.surge.sh/music/5.mp3",
        url: "https://www.17sucai.com/",
        favorited: true
      },
      {
        name: "Genius ft. Sia, Diplo, Labrinth",
        artist: "LSD",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/6.jpg",
        source: "https://physical-authority.surge.sh/music/6.mp3",
        url: "https://www.17sucai.com/",
        favorited: false
      },
      {
        name: "Rag'n'Bone Man",
        artist: "Human",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/7.jpg",
        source: "https://physical-authority.surge.sh/music/7.mp3",
        url: "https://www.17sucai.com/",
        favorited: false
      }
    ],
    currentTrack: null,
    currentTrackIndex: 0,
    transitionName: null  
  },
  onLoad() {
    const appInstance = getApp()
    console.log(this.audio)
    console.log(appInstance.globalData,'data')
  },
  play() {
    if (this.data.audio.paused) {
      this.data.audio.play();
      this.data.isTimerPlaying = true;
    } else {
      this.data.audio.pause();
      this.data.isTimerPlaying = false;
    }
  },
})
