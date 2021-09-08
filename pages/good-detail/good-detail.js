import { request } from '../../request'
Page({
    data:{
       
       goods_name:'',
       pics:[],
       goods_introduce:[],
       iscollect:false,
       good:{}
    },
    onShow:function(){
      var curPages =  getCurrentPages();
      let page=curPages[curPages.length-1];
      
     
      const { goods_id } = page.options;
       request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id}}).
       then(res=>{
           console.log(res)
          let collect=wx.getStorageSync('collect')||[];

          
          this.setData({
            iscollect:collect.some(v=>v.goods_id==res.message.goods_id),
              goods_name:res.message.goods_name,
              pics:res.message.pics,
              goods_introduce:res.message.goods_introduce,
              good:res.message
          })
       })
      
    },
    handlePrevewImage(e) {
        // 1 先构造要预览的图片数组 
        const urls = this.data.pics.map(v => v.pics_mid);
        // 2 接收传递过来的图片url
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
          current,
          urls
        });
    
      },
      handlejoin(){
          let cart=wx.getStorageSync('cart')||[];
          let index=cart.findIndex(v=>v.goods_id==this.data.good.goods_id)
          if(index==-1){
            this.data.good.num=1;
            this.data.good.checked=true;
            cart.push(this.data.good)
          }
          else
          {
            cart[index].num++;
          }
          wx.setStorageSync('cart', cart)
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮 
            mask: true
          });
      },
      handlecollect(){
          let collect=wx.getStorageSync('collect')||[];
          let index=collect.findIndex(v=>v.goods_id==this.data.good.goods_id)
          if(index==-1){
            collect.push(this.data.good)
            this.setData({
                iscollect:true
              })
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
              });
          }else{
            this.setData({
                iscollect:false
              })
            
            collect.splice(index,1);
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
              });
          }
          wx.setStorageSync("collect", collect);
         
      }
})