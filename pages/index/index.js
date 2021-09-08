// index.js
// 获取应用实例
import { request } from '../../request'

Page({
  data: {
    backgroun: [],
    list:[],
    shop:[],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  
  

  
  // 事件处理函数
 /* bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function (options) {
    
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'}).
    then(res=>{
      
this.setData({
    backgroun:res.message
  }
)

    })
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'}).
    then(res=>{
      console.log(res)
this.setData({
  list:res.message
}
)
    })
      request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'}).
    then(res=>{
      console.log(res)
this.setData({
  shop:res.message
}
)
    })
    /*if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  /*request(params){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: params, //仅为示例，并非真实的接口地址
        data: {
          
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          resolve(res.data)
        }
      })
    }
    )
},
  /*getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }*/
})

