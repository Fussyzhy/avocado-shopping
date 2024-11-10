<template>
  <div>

    <van-search v-model="searchvalue"  shape="round" placeholder="搜索你要找的商品" @click="$router.push('/search')"/>

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in bannerList" :key="index">
        <img v-lazy="image.imgUrl" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5">
      <van-grid-item :icon="item.imgUrl" :text="item.text" v-for="(item,index) in iconList" :key="index" @click="$router.push('/category')"/>
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img :src="mainImg" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in productList" :key="item.goods_id" :item="item">
        </GoodsItem>
      </div>
    </div>
    <div style="height: 50px;"></div>

  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem'
import Vue from 'vue'
import { gethomedata } from '@/api/home'
import { Lazyload } from 'vant'

Vue.use(Lazyload)

export default {
  name: 'HomeIndex',
  data () {
    return {
      searchvalue: '',
      productList: [],
      bannerList: [],
      iconList: [],
      mainImg: ''

    }
  },
  components: {
    GoodsItem
  },
  async created () {
    const res = await gethomedata()
    console.log(res.data.pageData.items)
    this.productList = res.data.pageData.items[6].data
    this.bannerList = res.data.pageData.items[1].data
    this.iconList = res.data.pageData.items[3].data
    this.mainImg = res.data.pageData.items[4].data[0].imgUrl
  },
  mounted () {
    document.querySelector('.van-nav-bar__content div').innerHTML = '牛油果商城'
  }

}
</script>

<style lang="less" scoped>
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;

  }
  .van-swipe-item img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }

  .main img {
    display: block;
    width: 100%;
  }

  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 0pxpx;
  }

  .goods-list {
    background-color: #f6f6f6;
  }
</style>
