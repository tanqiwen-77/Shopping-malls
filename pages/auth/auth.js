Page({
    data:{
        collectNums:0,
        userinfo:{}
    },
    onShow(){
        const user=wx.getStorageSync("userinfo");
        const collect=wx.getStorageSync("collect")||[];
          
        this.setData({userinfo:user,
            collectNums:collect.length});
          
      },
      handleGetUserInfo(e){
        const {userInfo}=e.detail;
        wx.setStorageSync("userinfo", userInfo);
      }
})