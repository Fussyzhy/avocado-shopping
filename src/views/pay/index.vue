<template>
  <div>
    <van-nav-bar
      title="订单结算台"
      left-arrow
      @click-left="$router.back()"
      :fixed="true"
      :placeholder="true"
    />
    <div class="adress">
      <van-icon name="logistics" size="30px" style="float: left; margin: 10px 20px 0px 0px;" color="#666666"/>
      <span v-if="addressList.length !== 0">
        <p>{{addressList[0].name}} {{ addressList[0].phone }}</p>
        <p>{{ addressList[0].region.province }}{{ addressList[0].region.city }}{{ addressList[0].region.region }}{{ addressList[0].detail }}</p>
      </span>
      <van-icon name="arrow" size="30px" style="float: right; margin-top: 5px;" color="#666666"/>
      <br>

      <div style="text-align: center; margin: 10px 0px;">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
        <img src="@/assets/border-line.png" alt="">
      </div>

    </div>

    <div class="price-card">
      <img src="../../assets/product.jpg" alt="">
      <div style="display: inline-block; ">
        <div class="title">
          超级无敌苹果手机
        </div>
        <div >
          <span class="count">x4</span>
          <span class="price">￥1999</span>
        </div>
      </div>
    </div>

    <div class="price-card">
      <img src="../../assets/product.jpg" alt="">
      <div style="display: inline-block; ">
        <div class="title">
          超级无敌苹果手机
        </div>
        <div >
          <span class="count">x4</span>
          <span class="price">￥1999</span>
        </div>
      </div>
    </div>

    <div style="padding: 0px 20px;">
      <p style="float: right;">共1件商品，合计：<span style="color: red;">￥1999</span></p><br>
      <br>
    </div>

    <hr style="background-color: #f3f3f3; height: 2px; border: none;">

    <div>
      <div style="padding: 15px 10px;">
        <span>订单总金额：</span>
        <span style="float: right; color: red;">￥1999</span>
      </div>

      <div style="padding: 15px 10px;">
        <span>优惠券：</span>
        <span style="float: right;">无优惠券可用</span>
      </div>

      <div style="padding: 15px 10px;">
        <span>配送费用：</span>
        <span style="float: right; color: red;">+￥0.00</span>
      </div>
    </div>

    <hr style="background-color: #f3f3f3; height: 2px; border: none;">
    <div style="padding: 20px;">
      <div>
        支付方式
      </div>
      <div style="padding: 10px 0px 0px;">
        <van-icon name="balance-o" size="25px"/>
        <span style="padding-left: 10px;">余额支付（可用￥6257687元）</span>
        <van-icon name="passed" size="20px" color="red" style="float: right;"/>
      </div>
    </div>
    <hr style="background-color: #f3f3f3; height: 2px; border: none;">

    <div style="text-align: center; padding: 10px;">
      <textarea name="notes" id="" placeholder="选填：买家留言（50字以内）" style="width: 370px; height: 200px; border: 0px;"></textarea>
    </div>

    <hr style="background-color: #f3f3f3; height: 2px; border: none;">
    <div style="height: 49px; padding-left: 20px;">
      <span style="line-height: 49px;">实付款：</span>
      <span style="color: red;">￥1999.00</span>
      <van-button type="primary" style="float: right; width: 150px;">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import { getAdress } from '@/api/adress'
import { addOrder, checkOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      orderID: ''
    }
  },
  computed: {
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    }
  },
  async created () {
    const res = await getAdress()
    this.addressList = res.data.list

    const ress = await addOrder(this.mode, { cartIds: this.cartIds })

    this.orderID = ress.data.orderId

    const tes = await checkOrder(this.orderID)
    console.log(tes)
  }
}
</script>

<style lang="less" scoped>
  .adress{
    margin: 30px 10px 10px;

  }
  .adress  span {
    display: inline-block;
    text-align: left;
    color: #666666;
  }

  .adress  img {
    display: inline-block;
    height: 3px;
  }

  .price-card {
    position: relative;
    padding: 20px;
  }

  .price-card img {
    height: 100px;
    margin-right: 20px;
  }

  .price-card .title {
    position: absolute;
    top: 20px;
    font-size: 15px;
    color: #333333;
  }

  .price-card .count {
    position: absolute;
    top: 90px;
    color: #333333;
  }

  .price-card .price {
    position: absolute;
    top: 85px;
    right: 30px;
    color: red;
    font-size: 16px;
  }
</style>
