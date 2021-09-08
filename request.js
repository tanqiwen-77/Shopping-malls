let ajaxTimes=0;
export const request=params=>{
    return new Promise((resolve,reject)=>{
        ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
      wx.request({
        ...params, //仅为示例，并非真实的接口地址
        
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          resolve(res.data)
        },
        fail(err) {
            reject(err)
        },
        complete: function() {
            ajaxTimes--;
            // 显示加载中 效果
            if(ajaxTimes==0)
            wx.hideLoading();
        }
      })
    })
}