import { request } from '../../request'
Page({
    data:{
        tabs:["全部","待付款","待发货","退款/退货"],
        current:0,
        orders:[]
    },
    onShow:function(){
        const token = wx.getStorageSync("token");
        if (!token) {
          wx.navigateTo({
            url: '/pages/token/token'
          });
          return;
        }
        const page=getCurrentPages();
        const current=page[page.length-1];
        const { type } = current.options;
    // 4 激活选中页面标题 当 type=1 index=0 
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
    },
    changeTitleByIndex(index){
        this.data.current=index
    },
    getOrders(index){
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all",data:{index} }).then(res=>{
            console.log(res)
        this.setData({
                
                orders: res.message.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
              })
            }
        )
    },
    handle(e){
        const {index}=e.currentTarget.dataset;
        this.setData({
            current:index
        })
        this.getOrders(index)
    }
})