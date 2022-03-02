// component/ProgressBar/ProgressBar.ts
Component<any,any,any,any,any>({
    /**
     * 组件的属性列表
     */
    properties: {
        percent: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        canvasCtx: null,
        fullWidth: 0
    },
    observers:{
        percent:function(val){
            this.drawLine()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        initCanvas() {
            let _this = this
            setTimeout(()=>{
                const dom = wx.createSelectorQuery().select("#lineCanvas")
                dom.boundingClientRect(data=>{
                    console.log(data,"data.width")
                    // this.canvasWidth = Math.floor(data.width)-10
                }).exec()
                const query = wx.createSelectorQuery().in(this)
                query.select('#lineCanvas').fields({
                    node: true,
                    size: true,
                }).exec(res=>{
                    const canvas = res[0].node
                    const canvasCtx = canvas.getContext('2d')
                    const dpr = wx.getSystemInfoSync().pixelRatio
                    canvas.width = res[0].width * dpr
                    this.data.fullWidth = res[0].width
                    canvasCtx.scale(dpr, dpr)
                    _this.setData({
                        canvasCtx
                    })
                    _this.drawLine()
                })
            })
        },
        drawLine(){
            //画底线
            const _this = this
            if(!_this.data.canvasCtx)return
            _this.data.canvasCtx.beginPath()
            _this.data.canvasCtx.lineWidth = 2
            _this.data.canvasCtx.strokeStyle = "#eaeaea"
            _this.data.canvasCtx.lineCap = "round"
            _this.data.canvasCtx.moveTo(0,5)
            _this.data.canvasCtx.lineTo(_this.data.fullWidth,5)
            _this.data.canvasCtx.stroke()
            _this.data.canvasCtx.closePath()

            //进度条线
            const progress = (+_this.properties.percent/100)*(+_this.data.fullWidth)
            _this.data.canvasCtx.beginPath()
            _this.data.canvasCtx.lineWidth = 2
            _this.data.canvasCtx.strokeStyle = "#f90a0a"
            _this.data.canvasCtx.lineCap = "round"
            _this.data.canvasCtx.moveTo(0,5)
            _this.data.canvasCtx.lineTo(progress,5)
            _this.data.canvasCtx.stroke()
            _this.data.canvasCtx.closePath()
        }
    },
    attached(){
        this.initCanvas()
    },
})
