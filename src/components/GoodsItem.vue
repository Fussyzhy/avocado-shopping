<template>
  <div class="box" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div><img :src="item.goods_image" alt=""></div>
    <div class="text">
      <p class="tit text-ellipsis-2">{{ item.goods_name }}</p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <div class="price">
        <span class="newprice">¥{{ item.goods_price_max }}</span>
        <span class="oldprice">¥{{ item.goods_price_min}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object
    }
  }

}

</script>

<style lang="less" scoped>

 .box {
  height: 150px;
  width: 50vm;
  display: flex;
  margin-bottom: 6px;
  margin-top: 6px;
  background-color: #f7fff7;

 }

.box img {
    display: flex;
    width: 150px;
}

.text {
  margin-left: 15px;
  margin-top: 10px;

  position: relative;
}

.tit {
  /* 定义tit类的样式 */
  font-size: 13px;
  color: black;
}

.text-ellipsis-2 {
    /* 定义text-ellipsis-2类的样式，实现文本溢出省略号效果 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: block; /* 或者其他适合的display值，比如inline-block */
}

.count {
  font-size: 11px;
  margin: 15px 0px;
  color: #999;
}

.price {
  margin-top: 20px;
  position: absolute;
  bottom: 0;
}

.newprice {
  color: red;
}

.oldprice {
  margin-left: 10px;
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
}

</style>
