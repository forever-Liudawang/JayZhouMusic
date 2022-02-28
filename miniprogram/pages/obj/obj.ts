import * as THREE from '../../libs/three.weapp.js'
import loadObj from './loadObj'

Page({
	data: {},
	onLoad: function () {
		wx.createSelectorQuery()
			.select('#c')
			.node()
			.exec((res) => {
				const canvas = new THREE.global.registerCanvas(res[0].node)
				loadObj(canvas, THREE)
			})
	},
	onUnload: function () {
		THREE.global.clearCanvas()
	},
	touchStart(e: any) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
	},
	touchMove(e: any) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
	},
	touchEnd(e: any) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
	},
	touchCancel(e: any) {
		// console.log('canvas', e)
	},
	longTap(e: any) {
		// console.log('canvas', e)
	},
	tap(e: any) {
		// console.log('canvas', e)
	},
})
