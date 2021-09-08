import { request } from '../../request'

Page({
    data:{
        tabs:['综合','销量','价格'],
        current:0,
        QueryParams:{
            query:"",
            cid:"",
            pagenum:1,
            pagesize:10
          },
          goodlist:[]
    },
    
   onLoad:function(options){
       let page=1;
    this.data.QueryParams.cid=options.cid||"";
    this.data.QueryParams.query=options.query||"";
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',data:this.data.QueryParams}).
    then(res=>{
        console.log(res)
        this.setData({
            goodlist:[...this.data.goodlist,...res.message.goods]
        })
       const total=res.message.total
       this.page=Math.ceil(total/this.data.QueryParams.pagesize)
    })
   },
   handle(e){
    const {index}=e.currentTarget.dataset;
    this.setData({
        current:index
    })
},
onReachBottom(){
    if(this.data.QueryParams.pagenum>=this.page)
    {
        wx.showToast({ title: '没有下一页数据' });
    }
    else{
        this.data.QueryParams.pagenum++;
        request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',data:this.QueryParams}).
    then(res=>{
        console.log(res)
        this.setData({
            goodlist:[...this.data.goodlist,...res.message.goods]
        })
       const total=res.message.total
       this.page=Math.ceil(total/this.data.QueryParams.pagesize)
    })

    }
    
}
})