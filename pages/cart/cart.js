import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../wx";
import { request } from '../../request'
Page({
    data:{
  address:{},
  cart:[],
  allcheck:true,
  allprice:0,
  allnum:0
    },
    onShow:function(){
         const address1=wx.getStorageSync('address')
         const cart1=wx.getStorageSync('cart')||[]
         console.log(cart1)
         this.setData({
            address:address1,
            cart: cart1

         })
    },
     handleaddress(){
        try {
            // 1 获取 权限状态
            const res1 =  getSetting();
            const scopeAddress = res1.authSetting["scope.address"];
            // 2 判断 权限状态
            if (scopeAddress === false) {
                openSetting();
            }
            // 4 调用获取收货地址的 api
            let address =chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
           
            // 5 存入到缓存中
            wx.setStorageSync("address", address);
      
          } catch (error) {
            console.log(error);
          }
    },
    handlecheck(e){
        const id=e.currentTarget.dataset.id;
        let index=this.data.cart.findIndex(v=>v.goods_id==id);
        this.data.cart[index].checked=!this.data.cart[index].checked;
        this.setCart(this.data.cart)
    },
    handleedit(e){
        const { operation, id } = e.currentTarget.dataset;
        let index=this.data.cart.findIndex(v=>v.goods_id==id);
        if (this.data.cart[index].num === 1 && operation === -1) {
            // 4.1 弹窗提示
            const res =  showModal({ content: "您是否要删除？" });
            if (!res.confirm) {
                let c=this.data.cart.splice(index, 1);
                console.log(1)
                
                this.setData({
                    cart:c
                })
              this.setCart(this.data.cart);
             
            }else
            {console.log(2)}
          } else {
            // 4  进行修改数量
            this.data.cart[index].num += operation;
          }
            // 5 设置回缓存和data中
           this.setCart(this.data.cart)
    },
    handleall(){
        this.allcheck = !this.allcheck;
        if(this.data.cart!==undefined)
        this.data.cart.forEach(v=>{v.checked = this.allcheck})
        
        // 3 循环修改cart数组 中的商品选中状态
        
        this.setCart(this.data.cart)
    },
    setCart(cart){
        this.setData({
            allcheck:true,
            allprice:0,
            allnum:0,
        })
        cart.forEach(v=>{
            if(v.checked){
                let a=this.data.allprice+v.goods_price*v.num;
                let b=this.data.allnum+v.num;
                this.setData({
                   
                    allprice:a,
                    allnum:b,
                    
                })
            }
            else{
                this.data.allcheck=false;
                this.setData({
                    allcheck:false
                   
                    
                })
            }
            let allChecked = cart.length != 0 ?this.data.allcheck : false;
            this.setData({
               cart:cart,
               allcheck:allChecked
            })
            
        })
      
    },
    handlepay(){
        if(!this.data.address){
             showToast({title:"您还没有选择收货地址"});
            return;
          }
          // 2 判断用户有没有选购商品
          if(totalNum===0){
             showToast({title:"您还没有选购商品"});
            return ;
          }
          // 3 跳转到 支付页面
          wx.navigateTo({
            url: '/pages/pay/index'
          });
    }
})