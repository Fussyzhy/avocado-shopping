<template>
  <div>

    <div v-if="this.$store.getters.token && cartlist.length !== 0">
      <div class="title">
        <span>共</span>
        <span style="color: red;">{{ cartTotal }}</span>
        <span style="margin-right: 230px;">件商品</span>

        <span @click="isEdit = !isEdit"><van-icon name="edit" />编辑</span>
      </div>
      <div class="pro-card" v-for="(item,index) in cartlist" :key="index">
        <van-checkbox style="padding-right: 18px;" :value="item.checked" @click="changeCheck(index)"></van-checkbox>
        <img :src="item.goods.goods_image" alt="" style="width: 100px; margin: 0px 20px 0px 10px;">
        <div style="display: flex; flex-direction: column; margin: 0px 10px 0px 0px;">
          <p class="two-line-clamp">{{ item.goods.goods_name }}</p><br>
          <div>
            <span style="color: red; ">￥{{ item.goods.goods_price_min }}</span>
            <span style="display: inline-block; position: absolute; right: 25px;">
              <CountBox :value="item.goods_num" @input="(value) => changeCount(value,item.goods_id,item.goods_sku_id)"></CountBox>
            </span>
          </div>
        </div>
      </div>
      <div style="height: 100px;">

      </div>
      <van-submit-bar :price="selPrice*100" button-text="结算" @submit="onSubmit" v-if="!isEdit" button-color="#3CB371">
        <van-checkbox v-model="checked" @click="allcheck">全选</van-checkbox>
      </van-submit-bar>

      <van-submit-bar  button-text="删除" @submit="onDel" v-if="isEdit" button-color="#3CB371">
        <van-checkbox v-model="checked" @click="allcheck" style="margin-right: 195px;">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-else class="nullCart">
      <van-icon name="shopping-cart-o" size="100px"/>
      <p style="margin: 40px;">您的购物车是空的，快去逛逛吧~</p>
      <van-button type="primary" :round="true" @click="$router.push('/home')" color="#3CB371" style="width: 130px;">去逛逛</van-button>
    </div>

  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapGetters, mapState } from 'vuex'
// import { getCart } from '@/api/cart'
export default {
  name: 'CartIndex',
  async created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartAction')
      console.log(this.cartlist)
    }
    // const res = await getCart()
    // console.log(res)
    // this.cartList = res.data.list
    // this.cartTotal = res.data.cartTotal
  },
  computed: {
    ...mapState('cart', ['cartTotal', 'cartlist']),
    ...mapGetters('cart', ['selList', 'selCount', 'selPrice'])
  },
  mounted () {
    document.querySelector('.van-nav-bar__content div').innerHTML = '购物车'
    document.querySelector('body').style.backgroundColor = '#f5f5f5'
  },
  data () {
    return {
      checked: false,
      isEdit: false
    }
  },
  components: {
    CountBox
  },
  methods: {
    onSubmit () {
      if (this.selCount > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.cartlist.filter(item => item.checked === true).map(item => item.id).join(',')
          }
        })
      }
    },
    async onDel () {
      if (this.selCount === 0) return
      const cartIds = this.cartlist.filter(item => item.checked === true).map(item => item.id)
      console.log(cartIds)

      await this.$store.dispatch('cart/delAction', {
        cartIds
      })
      this.$store.dispatch('cart/getCartAction')
    },
    changeCheck (key) {
      this.cartlist[key].checked = !this.cartlist[key].checked
      if (this.cartlist.filter(item => item.checked === true).length === this.cartlist.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    allcheck () {
      if (this.checked === true) {
        this.cartlist.forEach(item => {
          item.checked = true
        })
      } else {
        this.cartlist.forEach(item => {
          item.checked = false
        })
      }
    },
    changeCount (value, id, skuid) {
      this.$store.dispatch('cart/updateAction', {
        value,
        id,
        skuid
      })
    }
  },
  updated () {
    if (this.cartlist.length === 0) {
      this.checked = false
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    margin: 10px;
    font-size: 16px;
  }

  .pro-card{
    background-color: #fff;
    width: 340px;
    // height: 80px;
    margin: 20px auto;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 20px 0px 20px 20px;
  }

  .two-line-clamp {
    display: -webkit-box; /* 将元素设置为webkit的盒模型，这是必需的 */
    -webkit-box-orient: vertical; /* 设置盒模型的方向为垂直 */
    -webkit-line-clamp: 2; /* 限制显示的行数 */
    overflow: hidden; /* 隐藏超出的部分 */
    text-overflow: ellipsis; /* 在超出部分显示省略号，这通常与overflow: hidden一起使用 */
    line-height: 1.2em; /* 可选，设置行高以控制每行的高度 */
    max-height: 2.4em; /* 可选，设置一个最大高度来确保只有两行被显示，行高的两倍 */
  }

  .van-submit-bar__bar{
    position: fixed;
    bottom: 50px;
    background-color: #fff;
    width: 100%;
  }

  .nullCart {
    text-align: center;
    color: #cecece;
    font-size: 20px;
    // line-height:714px;
    margin-top: 200px;
  }
</style>
