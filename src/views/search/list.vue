<template>
  <div>
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.back()"
    />
    <van-search
      v-model="searchvalue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch(searchvalue,Categorykey)"
    >
      <template #action>
        <van-icon name="apps-o" size="30" style="margin-top: 7px;" @click="$router.push('/category')"/>
      </template>
    </van-search>

    <div class="sort">
      <ul>

        <li id="default" @click="defaultSort(key,Categorykey)">综合</li>

        <li @click="salesSort">
          <p id="sales">销量</p>
        </li>

        <li @click="priceSort">
          <p id="price">价格</p>

          <div class="icoup">
            <van-icon name="arrow-up" size="10" ref="priceup"/>
          </div>
          <div class="icodown">
            <van-icon name="arrow-down" size="10" ref="pricedown"/>
          </div>
        </li>

      </ul>
    </div>

    <div>
      <GoodsItem v-for="(item,index) in SearchResult.data" :key="index" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { SearchKey } from '@/api/searchlist'
import GoodsItem from '@/components/GoodsItem'
export default {
  name: 'ListIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      searchvalue: '',
      key: '',
      Categorykey: '',
      SearchResult: {
        current_page: 1,
        data: [],
        last_page: 1,
        per_page: 15,
        total: 2
      },
      pricesort: 0,
      historyTest: []

    }
  },
  methods: {
    async onSearch (key, Categorykey) {
      const res = await SearchKey(key, Categorykey)
      this.SearchResult = res.data.list
      this.key = key

      // 搜索历史记录
      this.historyTest = JSON.parse(localStorage.getItem('search_history'))
      if (this.historyTest.some(item => item.name === key)) {
        this.historyTest = this.historyTest.filter(item => item.name !== key)
        this.historyTest.unshift({ id: this.historyTest.length === 0 ? 1 : this.historyTest[0].id + 1, name: key })
      } else {
        this.historyTest.unshift({ id: this.historyTest.length === 0 ? 1 : this.historyTest[0].id + 1, name: key })
      }
      localStorage.setItem('search_history', JSON.stringify(this.historyTest))
    },
    async defaultSort (key, Categorykey) {
      document.querySelector('#default').style.color = '#3CB371'
      document.querySelector('#sales').style.color = 'black'
      document.querySelector('#price').style.color = 'black'

      document.querySelector('.icodown').style.color = 'black'
      document.querySelector('.icoup').style.color = 'black'
      const res = await SearchKey(key, Categorykey)
      this.SearchResult = res.data.list
      this.pricesort = 0
    },
    priceSort () {
      document.querySelector('#default').style.color = 'black'
      document.querySelector('#sales').style.color = 'black'
      document.querySelector('#price').style.color = '#3CB371'
      if (this.pricesort === 0) {
        document.querySelector('.icodown').style.color = '#3CB371'
        document.querySelector('.icoup').style.color = 'black'
        this.pricesort = 1
        this.SearchResult.data = this.SearchResult.data.sort((a, b) => {
          return (b.goods_price_max || 0) - (a.goods_price_max || 0)
        })
      } else {
        document.querySelector('.icodown').style.color = 'black'
        document.querySelector('.icoup').style.color = '#3CB371'
        this.pricesort = 0
        this.SearchResult.data = this.SearchResult.data.sort((a, b) => {
          return (a.goods_price_max || 0) - (b.goods_price_max || 0)
        })
      }
    },
    salesSort () {
      document.querySelector('#default').style.color = 'black'
      document.querySelector('#sales').style.color = '#3CB371'
      document.querySelector('#price').style.color = 'black'

      document.querySelector('.icodown').style.color = 'black'
      document.querySelector('.icoup').style.color = 'black'
      this.SearchResult.data = this.SearchResult.data.sort((a, b) => {
        return (b.goods_sales || 0) - (a.goods_sales || 0)
      })
      this.pricesort = 0
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    },
    queryCategory () {
      return this.$route.query.category
    }
  },
  async created () {
    const res = await SearchKey(this.querySearch, this.queryCategory)
    this.SearchResult = res.data.list
    this.key = this.querySearch
    this.searchvalue = this.key
    this.Categorykey = this.queryCategory

    document.querySelector('#default').style.color = '#3CB371'
  }
}
</script>

<style lang="less" scoped>
  .sort li {
    height: 40px;
    // width: 100px;
    width: 33.33333%;
    background-color: #ffffff;
    display: inline-grid;
    text-align: center;
    align-content: center;
    border-bottom: #f3f3f3 solid 3px;
    position: relative;
  }
  .icoup {
    display: flex;
    position: absolute;
    width: 10px;
    top:10px;
    right: 30px;
  }
  .icodown {
    display: flex;
    position: absolute;
    width: 10px;
    bottom:10px;
    right: 30px;
  }
</style>
