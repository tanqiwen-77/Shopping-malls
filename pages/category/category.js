import { request } from '../../request'
Page({
   data:{
       leftlist:[],
        rightlist:[],
        currentindex:0,
        scrollTop: 0
   },
   
   onLoad:function(options){
       let total=wx.getStorageSync("total")
       if(!total){
       
        request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'}).
       then(res=>{
            
           console.log(res)
           this.total=res.message;
           wx.setStorageSync("total", { time: Date.now(), data:this.total  });
           this.setData(
               {
                leftlist:this.total.map(v=>v.cat_name),
                rightlist:this.total[0].children
               }
           )
       })
   }
   else{
       if(Date.now()-total.time>=1000*10){
        request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'}).
        then(res=>{
             
            console.log(res)
            this.total=res.message;
            wx.setStorageSync("total", { time: Date.now(), data: this.total });
            this.setData(
                {
                 leftlist:this.total.map(v=>v.cat_name),
                 rightlist:this.total[0].children
                }
            )
        })
       }
       else{
        
        this.setData(
            {
             leftlist:total.data.map(v=>v.cat_name),
             rightlist:total.data[0].children
            })
       }
   }
},
handle(e){
     const {index}=e.currentTarget.dataset;
     this.setData({
         currentindex:index,
         rightlist:this.total[index].children,
         scrollTop: 0
     })
     
}
})