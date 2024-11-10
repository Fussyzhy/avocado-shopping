<template>
  <div>
    <van-search
    background="#f1f1f2"
    v-model="searchvalue"
    shape="round"
    placeholder="搜索你要找的商品"
    @click="$router.push('/search')"/>
    <div class="left">
      <ul>

        <li v-for="(item,index) in categoryList" :ref="item.id" :key="index" @click="changeCategory(item.children,index)">{{ item.name }}</li>

      </ul>
    </div>
    <div class="right">
      <ul>

        <li v-for="(item,index) in proList" :key="index" @click="goSearch(item.category_id)">
          <img :src="item.image.external_url" alt="" style="width: 76px; height: 76px; margin-left: 9.5px;">
          <p style="text-align: center; font-size: 14px;">{{ item.name }}</p>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { getCategory } from '@/api/category'

export default {
  name: 'CategoryIndex',
  data () {
    return {
      categoryList: [],
      proList: [],
      searchvalue: '',
      indexid: 0

    }
  },
  async created () {
    const res = await getCategory()
    console.log(res)
    this.categoryList = res.data.list
    this.proList = this.categoryList[0].children
    this.indexid = 0
  },
  mounted () {
    document.querySelector('.van-nav-bar__content div').innerHTML = '全部分类'
  },
  methods: {
    changeCategory (arr, index) {
      this.proList = arr
      this.indexid = index
      const listItems = document.querySelectorAll('.left li')
      listItems.forEach(item => { item.style.backgroundColor = '#f1f1f2' })
      listItems[index].style.backgroundColor = '#fff'

      listItems.forEach(item => { item.style.color = 'black' })
      listItems[index].style.color = '#3CB371'
    },
    goSearch (id) {
      this.$router.push(`/searchlist?category=${id}`)
    }
  },
  updated () {
    if (this.indexid === 0) {
      document.querySelector('.left li').style.backgroundColor = '#fff'
      document.querySelector('.left li').style.color = '#3CB371'
    }
  }
}
</script>

<style lang="less" scoped>
  .left {
    overflow: scroll;
    width: 90px;
    height: 670px;
    background-color: #f1f1f2;
    display: inline-block;
  }
  .left li {
    height: 60px;
    width: 90px;
    background-color: #f1f1f2;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
  }
  .right {
    overflow: scroll;
    width: 285px;
    height: 670px;
    background-color: #fff;
    display: inline-block;

  }
  .right li {
    display: inline-grid;
    background-color: #fff;
    width: 95px;
    height: 95px;
  }
</style>
