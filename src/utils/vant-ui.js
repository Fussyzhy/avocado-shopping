import Vue from 'vue'
// 按需导入vant组件

import { Tabbar, TabbarItem, NavBar, Form, Field, Button, Toast, Search, Swipe, SwipeItem, Grid, GridItem, Card, Icon, Dialog, Rate, GoodsAction, GoodsActionIcon, GoodsActionButton, ActionSheet, SubmitBar, Checkbox, CheckboxGroup } from 'vant'

// navbar顶部导航栏引入
Vue.use(NavBar)

// Tabbar导航栏引入
Vue.use(Tabbar)
Vue.use(TabbarItem)

// Form 表单引入
Vue.use(Form)
Vue.use(Field)

// button 引入
Vue.use(Button)

// toast轻提示引入
Vue.use(Toast)

// Search 搜索引入
Vue.use(Search)

// 轮播图引入
Vue.use(Swipe)
Vue.use(SwipeItem)

// 宫格导入
Vue.use(Grid)
Vue.use(GridItem)

// 商品卡导入
Vue.use(Card)

// icon导入
Vue.use(Icon)

// 确认弹窗导入
Vue.use(Dialog)

// 评分导入
Vue.use(Rate)

// 购物车导航条
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)

// 弹层框导入
Vue.use(ActionSheet)

// 提交订单导入
Vue.use(SubmitBar)

// 复选框导入
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
