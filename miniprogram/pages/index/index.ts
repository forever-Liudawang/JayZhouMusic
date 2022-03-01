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
    isTimerPlaying: false,
    tracks: [
      {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://www.17sucai.com/preview/776298/2020-12-28/mp/img/1.jpg",
        source: "http://blog-andy-liu.oss-cn-beijing.aliyuncs.com/jayZhou/jayZhou/%E4%B8%89%E5%B9%B4%E4%BA%8C%E7%8F%AD.mp3",
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
    bgImg: ""
  },
  onLoad() {
    const appInstance = getApp();
    this.init()
    console.log(appInstance.globalData, "data");
  },
  init() {
    const ctx = wx.createInnerAudioContext()
    this.data.audioCtx = ctx;
    let vm = this;
    this.data.currentTrack = this.data.tracks[0];
    this.data.bgImg = this.data.tracks[0]['cover']
    console.log('this.da', this.data.tracks[0]['cover'])
    // this.data.audio = new Audio();
    // this.data.audio.src = this.data.currentTrack.source;
    ctx.src =  this.data.currentTrack.source;
    ctx.onTimeUpdate((e)=>{
      vm.generateTime();
    })
    ctx.onCanplay(()=>{
      // this.data.audioCtx.play()
      vm.generateTime();
    })
    ctx.onEnded(()=>{
      vm.nextTrack();
      this.data.isTimerPlaying = true;
    })
    
    this.data.audio.onended = function() {
      vm.nextTrack();
      this.data.isTimerPlaying = true;
    };
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
  generateTime() {
    let width = (100 / this.data.audioCtx.duration) * this.data.audioCtx.currentTime;
    this.data.barWidth = width + "%";
    this.data.circleLeft = width + "%";
    let durmin: string | number = Math.floor(this.data.audioCtx.duration / 60);
    let dursec: string | number = Math.floor(
      this.data.audioCtx.duration - durmin * 60
    );
    let curmin: string | number = Math.floor(this.data.audioCtx.currentTime / 60);
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
    this.data.duration = durmin + ":" + dursec;
    this.data.currentTime = curmin + ":" + cursec;
  },
  updateBar(x: number) {
    //
    let progress = this.$refs.progress;
    let maxduration = this.data.audio.duration;
    let position = x - progress.offsetLeft;
    let percentage = (100 * position) / progress.offsetWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    this.data.barWidth = percentage + "%";
    this.data.circleLeft = percentage + "%";
    this.data.audioCtx.currentTime = (maxduration * percentage) / 100;
    this.data.audioCtx.play();
  },
  clickProgress(e: { pageX: any }) {
    this.data.isTimerPlaying = true;
    this.data.audioCtx.pause();
    this.updateBar(e.pageX);
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
});
