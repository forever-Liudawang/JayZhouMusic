// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page<any, any>({
  data: {
    audio: {},
    circleLeft: {},
    barWidth: {},
    duration: {},
    currentTime: null,
    percent: 0,
    isTimerPlaying: false,
    tracks: [
      {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/1.jpg",
        source:
          "http://blog-andy-liu.oss-cn-beijing.aliyuncs.com/jayZhou/jayZhou/%E4%B8%89%E5%B9%B4%E4%BA%8C%E7%8F%AD.mp3",
        url: "https://www.17sucai.com/",
        favorited: false,
      },
      {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/2.jpg",
        source: "https://physical-authority.surge.sh/music/2.mp3",
        url: "https://www.17sucai.com/",
        favorited: true,
      },
      {
        name: "Extreme Ways",
        artist: "Moby",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/3.jpg",
        source: "https://physical-authority.surge.sh/music/3.mp3",
        url: "https://www.17sucai.com/",
        favorited: false,
      },
      {
        name: "Butterflies",
        artist: "Sia",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/4.jpg",
        source: "https://physical-authority.surge.sh/music/4.mp3",
        url: "https://www.17sucai.com/",
        favorited: false,
      },
      {
        name: "The Final Victory",
        artist: "Haggard",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/5.jpg",
        source: "https://physical-authority.surge.sh/music/5.mp3",
        url: "https://www.17sucai.com/",
        favorited: true,
      },
      {
        name: "Genius ft. Sia, Diplo, Labrinth",
        artist: "LSD",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/6.jpg",
        source: "https://physical-authority.surge.sh/music/6.mp3",
        url: "https://www.17sucai.com/",
        favorited: false,
      },
      {
        name: "Rag'n'Bone Man",
        artist: "Human",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/7.jpg",
        source: "https://physical-authority.surge.sh/music/7.mp3",
        url: "https://www.17sucai.com/",
        favorited: false,
      },
    ],
    currentTrack: null,
    currentTrackIndex: 0,
    transitionName: null,
    audioCtx: null,
    bgImg: "",
  },
  onLoad() {
    const appInstance = getApp();
    this.init();
  },
  init() {
    const ctx = wx.createInnerAudioContext();
    this.data.audioCtx = ctx;
    let vm = this;
    this.data.currentTrack = this.data.tracks[0];
    this.data.bgImg = this.data.tracks[0]["cover"];
    ctx.src = this.data.tracks[0]["source"];
    ctx.onTimeUpdate((e) => {
      vm.generateTime();
    });
    ctx.onCanplay(() => {
      // this.data.audioCtx.play()
      vm.generateTime();
    });
    ctx.onEnded(() => {
      vm.nextTrack();
      this.data.isTimerPlaying = true;
    });

    this.data.audio.onended = function () {
      vm.nextTrack();
      this.data.isTimerPlaying = true;
    };
  },
  play() {
    if (this.data.audioCtx.paused) {
      this.data.audioCtx.play();
      this.setData({
        isTimerPlaying: true,
      });
      this.data.isTimerPlaying = true;
    } else {
      this.data.audioCtx.pause();
      this.setData({
        isTimerPlaying: false,
      });
    }
  },
  generateTime() {
    const percent =
      (this.data.audioCtx.currentTime / this.data.audioCtx.duration) * 100;
    this.setData({
      percent,
    });
    // this.data.barWidth = width + "%";
    // this.data.circleLeft = width + "%";
    let durmin: string | number = Math.floor(this.data.audioCtx.duration / 60);
    let dursec: string | number = Math.floor(
      this.data.audioCtx.duration - durmin * 60
    );
    let curmin: string | number = Math.floor(
      this.data.audioCtx.currentTime / 60
    );
    let cursec: string | number = Math.floor(
      this.data.audioCtx.currentTime - curmin * 60
    );
    if (durmin < 10) {
      durmin = "0" + durmin;
    }
    if (dursec < 10) {
      dursec = "0" + dursec;
    }
    if (curmin < 10) {
      curmin = "0" + curmin;
    }
    if (cursec < 10) {
      cursec = "0" + cursec;
    }
    this.setData({
      duration:durmin + ":" + dursec,
      currentTime: curmin + ":" + cursec
    })
  },
  prevTrack() {
    this.data.transitionName = "scale-in";
    this.data.isShowCover = false;
    if (this.data.currentTrackIndex > 0) {
      this.data.currentTrackIndex--;
    } else {
      this.data.currentTrackIndex = this.data.tracks.length - 1;
    }
    this.data.currentTrack = this.data.tracks[this.data.currentTrackIndex];
    this.resetPlayer();
  },
  nextTrack() {
    this.data.transitionName = "scale-out";
    this.data.isShowCover = false;
    if (this.data.currentTrackIndex < this.data.tracks.length - 1) {
      this.data.currentTrackIndex++;
    } else {
      this.data.currentTrackIndex = 0;
    }
    this.data.currentTrack = this.data.tracks[this.data.currentTrackIndex];
    this.resetPlayer();
  },
  updateMusicProgress(e:any) {
    const percent = e.detail.currentPercent
    const currentTimer = percent/100 * this.data.audioCtx.duration
    this.data.audioCtx.seek(currentTimer)
  },
  resetPlayer() {
    this.data.barWidth = 0;
    this.data.circleLeft = 0;
    this.data.audio.currentTime = 0;
    this.data.audio.src = this.data.currentTrack.source;
    setTimeout(() => {
      if (this.data.isTimerPlaying) {
        this.data.audioCtx.play();
      } else {
        this.data.audioCtx.pause();
      }
    }, 300);
  },
  onHide(){
    console.log('123', 123)
  }
});
