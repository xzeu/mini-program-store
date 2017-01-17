// pages/cart/cart.js
Page({
  data: {
    condition: false,
    tipsWords: "",
    deleteModalHidden: true,
    cartItems: [],
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    carts: [],
    goodsList: [],
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    selectedAllStatus: false,
    total: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  onShow: function () {
    //页面显示
    var that = this
    var cartItems = wx.getStorageSync('cartItems')
    if (!cartItems.length == 0) {
      that.setData({
        condition: false,
        cartItems: cartItems
      })
      that.changeCartAmount()
      console.log(cartItems)
    }
  },
  //更改商品数量后，总价更改方法
  changeCartAmount: function () {
    var amount = 0
    this.data.cartItems.forEach(function (entry) {
      amount += entry.quantity * entry.price
    })
    this.setData({
      amount: amount
    })
  },
  // 删除商品
  catchTapOnItem: function (e) {
    console.log(e)
    var that = this
    that.setData({
      wantToDeleteItem: e.currentTarget.dataset.id
    })
    wx.showModal({
        title: '是否删除该商品',
        showCancel: true,
        cancelText: '否',
        confirmText: '是',
        content: '想让我求你不删，没门儿',
        //用户点击确定按钮时触发
        success: function (res) {
          if (res.confirm) {
            var cartItems = that.data.cartItems
            var index = cartItems.findIndex(function(element){
              return element.id === that.data.wantToDeleteItem
            })
            console.log(cartItems.quantity)
            cartItems.splice(index,1)
            that.setData({
              cartItems: cartItems
            })
          }
          wx.setStorage({
            key: 'cartItems',
            data: cartItems,
          })
          that.changeCartAmount()
          if(cartItems.length == 0) {
            that.setData({
              condition: true
            })
          }
        }
      })
  },
  bindchangeQuantity: function(e) {
    console.log('bindchangeQuantity:'+e)
    var cartItems = this.data.cartItems
    var item = cartItems.find(function(element){
      return element.id === e.currentTarget.dataset.id
    })
    item.quantity = e.detail.value
    this.setData({
      cartItems: cartItems
    })
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
    this.changeCartAmount()
  },
  //立即结算方法
  bindCheckout: function() {
    //调用微信支付接口
  }

})