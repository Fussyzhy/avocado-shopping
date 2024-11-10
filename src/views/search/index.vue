<template>
  <div>
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.back()"
    />
    <van-search
      v-model="searchvalue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch(searchvalue)"
    >
      <template #action>
        <div @click="onSearch(searchvalue)">搜索</div>
      </template>
    </van-search>

    <div class="body">
      <span>最近搜索</span>
      <van-icon name="delete-o" style="float: right;" size="20" @click="clearhistory"/>
    </div>

    <div class="history">
      <ul>
        <li v-for="(item) in historyList" :key="item.id" @touchstart="handleTouchStart(item.id)" @touchend="handleTouchEnd(item)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchvalue: '',
      historyList: [],
      ClickState: 0
    }
  },
  methods: {
    onSearch (key) {
      this.addhistory(key)
      this.searchvalue = ''
      // localStorage.setItem('search_history', JSON.stringify(this.historyList))
      setHistory(this.historyList)
      this.$router.push(`/searchlist?search=${key}`)
    },
    addhistory (key) {
      if (this.historyList.some(item => item.name === key)) {
        this.historyList = this.historyList.filter(item => item.name !== key)
        this.historyList.unshift({ id: this.historyList.length === 0 ? 1 : this.historyList[0].id + 1, name: key })
      } else {
        this.historyList.unshift({ id: this.historyList.length === 0 ? 1 : this.historyList[0].id + 1, name: key })
      }
    },
    clearhistory () {
      if (this.historyList.length !== 0) {
        Dialog.confirm({
          title: '',
          message: '确认清除所有历史记录'
        })
          .then(() => {
            this.historyList = []
            // localStorage.setItem('search_history', JSON.stringify(this.historyList))
            setHistory(this.historyList)
          })
          .catch(() => {
          // on cancel
          })
      }
    },
    delhistory (id) {
      Dialog.confirm({
        title: '',
        message: '确认删除该历史记录'
      })
        .then(() => {
          // on confirm
          this.historyList = this.historyList.filter(item => item.id !== id)
          // localStorage.setItem('search_history', JSON.stringify(this.historyList))
          setHistory(this.historyList)
        })
        .catch(() => {
          // on cancel
        })
    },
    handleTouchStart (id) {
      this.pressTimer = setTimeout(() => {
        console.log('长按事件触发')
        this.delhistory(id)
        this.ClickState = 1
        // 执行长按操作的逻辑
      }, 1000) // 设置长按时间阈值，如500毫秒
    },
    handleTouchEnd (item) {
      clearTimeout(this.pressTimer)
      console.log('触摸结束，长按取消')
      if (this.ClickState === 0) {
        this.onSearch(item.name)
      }
      this.ClickState = 0
    }

  },
  created () {
    // this.historyList = JSON.parse(localStorage.getItem('search_history')) ? JSON.parse(localStorage.getItem('search_history')) : []
    this.historyList = getHistory()
    this.ClickState = 0
  },
  mounted () {
    document.querySelector('input').focus()
  }
}

</script>

<style lang="less" scoped>
  .body {
    margin : 20px;
  }
  .itm {
    border-radius: 50%;
  }

  li {
    display: inline-grid;
    width: 100px;
    height: 40px;
    background-color: white;
    border: #f3f3f3 solid 2px;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    margin: 12.5px;
    border-radius: 25px;
    font-size: 12px;
    place-items: center;
  }
</style>
