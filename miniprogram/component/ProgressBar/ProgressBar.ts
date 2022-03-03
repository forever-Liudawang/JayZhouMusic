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
        fullWidth: 0,
        fullHeight: 0
    },
    observers:{
        percent:function(val){
            this.drawLine(val)
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
                const query = wx.createSelectorQuery().in(this)
                query.select('#lineCanvas').fields({
                    node: true,
                    size: true,
                }).exec(res=>{
                    const canvas = res[0].node
                    console.log('res', res)
                    const canvasCtx = canvas.getContext('2d')
                    const dpr = wx.getSystemInfoSync().pixelRatio
                    canvas.width = res[0].width * dpr
                    this.setData({
                        fullHeight:res[0].height,
                        fullWidth:res[0].width
                    })
                    canvasCtx.scale(dpr, dpr)
                    _this.setData({
                        canvasCtx
                    })
                    _this.drawLine()
                })
            })
        },
        drawLine(percent=0){
            //画底线
            const _this = this
            if(!_this.data.canvasCtx)return
            let origin = this.data.fullHeight+12
            console.log('origin', origin)
            _this.data.canvasCtx.beginPath()
            _this.data.canvasCtx.lineWidth = 6
            _this.data.canvasCtx.strokeStyle = "#eaeaea"
            _this.data.canvasCtx.lineCap = "round"
            _this.data.canvasCtx.moveTo(0,origin)
            _this.data.canvasCtx.lineTo(_this.data.fullWidth,origin)
            _this.data.canvasCtx.stroke()
            _this.data.canvasCtx.closePath()

            //进度条线
            const progress = (+percent/100)*(+_this.data.fullWidth)
            _this.data.canvasCtx.beginPath()
            _this.data.canvasCtx.lineWidth = 6
            _this.data.canvasCtx.strokeStyle = "#f90a0a"
            _this.data.canvasCtx.lineCap = "round"
            _this.data.canvasCtx.moveTo(0,origin)
            _this.data.canvasCtx.lineTo(progress,origin)
            _this.data.canvasCtx.stroke()
            _this.data.canvasCtx.closePath()
        },
        handBindtouchstart(e: any) {
            console.log('e', e)
            const dis = e.touches[0]['x']
            const percent = (dis>0?dis:0)/this.data.fullWidth*100
            this.drawLine(percent)
            this.triggerEvent('myevent',{currentPercent: percent})
            console.log('dis', dis,this.data.fullWidth)
        },
        handBindtouchmove(e:any) {
            const dis = e.touches[0]['x']
            const percent = dis/this.data.fullWidth*100
            this.drawLine(percent)
            this.triggerEvent('myevent',{currentPercent: percent})
        }
    },
    attached(){
        this.initCanvas()
    },
})
