<template>
  <div>
    <van-nav-bar
      title="商品详情页"
      left-arrow
      @click-left="$router.back()"
      :fixed="true"
      :placeholder="true"
    />
    <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(image, index) in detailList.goods_images" :key="index">
      <img v-lazy="image.external_url" width="420px"/>
    </van-swipe-item>
    </van-swipe>

   <div style="height: 30px;">
      <span class="newprice">￥{{ detailList.goods_price_max }}</span>
      <span class="oldprice">￥{{ detailList.goods_price_min }}</span>
      <span class="count">已售{{ detailList.goods_sales }}件</span>
    </div>

    <div class="title text-ellipsis-2">
      <span>
        {{ detailList.goods_name }}
      </span>
    </div>

    <div class="service">

      <span class="leftService"><van-icon name="passed" color="red"/> 七天无理由退货</span>
      <span class="leftService"><van-icon name="passed" color="red"/> 48小时发货</span>
      <span class="rightService"><van-icon name="arrow" /></span>

    </div>

    <div>
      <div class="comment-title">
        <span>商品评价({{ CommentList.total }}条)</span>
        <span class="btn">查看更多<van-icon name="arrow" /></span>
      </div>

      <div v-for="(item,index) in CommentList.list" :key="index" class="comment-body">
        <div >
          <span><img :src="item.user.avatar_url ||defaultImg" alt="" style="width: 20px; margin: 10px 10px 0px 10px;"></span>
          <span style="font-size: 18px;">{{ item.user.nick_name }}</span>
          <span class="score">
            <van-rate v-model="item.score" size="17px" color="orange" :readonly="true" void-color="#999" style="margin-top: 10px;"/>
          </span>
        </div>
        <div style="margin-top: 10px;">
          <span>{{ item.content }}</span>
        </div>
        <div class="time">
          <span>{{ item.create_time }}</span>
        </div>

      </div>
    </div>

    <div class="desc">商品描述</div>
    <div v-html="detailList.content" class="descimg"></div>

    <van-goods-action style="height: 60px;" :fixed="true">
      <van-goods-action-icon icon="wap-home" text="首页" color="#3CB371" @click="$router.push('/home')"/>
      <van-goods-action-icon icon="shopping-cart" text="购物车" color="#3CB371" @click="$router.push('/cart')" :badge="cartTotal === 0 ? '':cartTotal"/>
      <van-goods-action-button type="warning" text="加入购物车" color="#93e2b5" @click="goCart"/>
      <van-goods-action-button type="danger" text="立即购买" color="#3CB371" @click="goBuy"/>
    </van-goods-action>

    <div style="height: 20px;"></div>
    <van-action-sheet v-model="showCart" :title=" mode === 1 ? '加入购物车':'立即购买'">
      <div class="content">
        <span>
          <img :src="detailList.goods_image" alt="" style="width: 160px; margin: 20px;">
        </span>
        <span class="cartprice">￥{{ detailList.goods_price_max * countValue }}</span>
        <span class="cartcount">库存{{ detailList.stock_total }}件</span>
      </div>
      <div>
        <span style="font-size: 20px; margin-right: 260px; margin-left: 10px;">数量</span>
        <span style="display: inline-block; margin-bottom: 3px;">
          <CountBox v-model="countValue"></CountBox>
        </span>
      </div>
      <div class="cartbtn">
        <button @click="buyNow">{{ mode === 1 ? '加入购物车':'立即购买' }}</button>
      </div>
    </van-action-sheet>
  </div>

</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { getdetail, getcomment } from '@/api/prodetail'
import defaultImg from '@/assets/default-avatar.png'
import { Dialog, Toast } from 'vant'
import { addCart, getCart } from '@/api/cart'
export default {
  name: 'ProDetailIndex',
  data () {
    return {
      detailList: {},
      CommentList: {},
      defaultImg,
      showCart: false,
      countValue: 1,
      mode: 1,
      cartTotal: ''
    }
  },
  components: {
    CountBox
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    goCart () {
      this.mode = 1
      this.showCart = true
    },
    goBuy () {
      this.mode = 0
      this.showCart = true
    },
    async buyNow () {
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛',
          confirmButtonColor: '#3CB371'
        })
          .then(() => {
            // on confirm
            this.$router.push({
              path: '/login',
              query: {
                backurl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      } else {
        if (this.mode === 1) {
          const res = await addCart(this.goodsId, this.countValue, this.detailList.skuList[0].goods_sku_id)
          console.log(res)
          this.cartTotal = res.data.cartTotal
          this.showCart = false
          Toast.success('加入成功！')
        }
      }
    }
  },
  async created () {
    const res = await getdetail(this.goodsId)
    this.detailList = res.data.detail
    const tess = await getcomment(this.goodsId, 5)
    console.log(tess)
    this.CommentList = tess.data
    const ress = await getCart()
    console.log(ress)
    this.cartTotal = ress.data.cartTotal
  },
  updated () {
    const descimg = document.querySelectorAll('.descimg img')
    descimg.forEach(item => { item.style.width = '410px' })
  }
}
</script>

<style lang="less" scoped>
  .newprice {
    color: red;
    font-size: 25px;
    margin: 5px 10px;
  }

  .oldprice {
    color: #999;
    font-size: 17px;
    text-decoration-line: line-through;
  }

  .count {
    position: absolute;
    right: 10px;
    top: 440px;
    color: #999;
  }

  .title {
    margin: 10px;
    height: 40px;

  }

  .leftService {
    margin: 10px 0px 0px 10px;
  }

  .rightService {
    position: absolute;
    right: 5px;
    top: 525px;
  }

  .service{
    background-color: #f8f8f8;
    height: 30px;
    padding-top: 5px;
  }

  .comment-title{
    margin: 10px;
  }

  .comment-title .btn {
    position: absolute;
    right: 5px;
    top: 557px;
    color: #999;
  }

  .comment-body {
    margin: 10px;
  }

  .score {
    float: right;
  }

  .time {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }

  .desc {
    text-align: center;
    font-size: 20px;
    margin: 20px 0px 10px;
  }

  .content {
    position: relative;
  }

  .cartprice {
    position: absolute;
    top: 0;
    font-size: 30px;
    color: red;
  }

  .cartcount {
    position: absolute;
    top: 40px;
    color: #999;
    padding-left: 10px;
  }

  .cartbtn {
    text-align: center;
  }

  .cartbtn button {
    border: 0px;
    height: 50px;
    margin: 15px;
    width: 340px;
    border-radius: 30px;
    background: rgb(93,218,149);
    background: linear-gradient(90deg, rgba(93,218,149,1) 25%, rgba(60,179,113,1) 100%);
    color: #fff;
  }
</style>
