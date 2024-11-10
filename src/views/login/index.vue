<template>
  <div>

    <van-nav-bar
      title="会员登陆"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="body">
      <h2 class="title">手机号登录</h2>
      <p class="tit">未注册的手机号登录后将自动注册</p>
      <form action="">
        <div class="inputbox">
          <input type="text" placeholder="请输入手机号码" v-model="phonecode.inputvalue">
        </div>
        <div class="inputbox">
          <input type="text" placeholder="请输入图形验证码" v-model="imgcode">
          <img v-if="imgurl" :src="imgurl" alt="" @click="imgchange">
        </div>
        <div class="inputbox">
          <input type="text" placeholder="请输入短信验证码" v-model="msgcode">
          <button @click="getphonecode" :style="{color:phonecode.color}">{{ phonecode.name }}</button>
        </div>
      </form>

      <button class="login" @click="login">登录</button>

    </div>
  </div>
</template>

<script>
import { getimg, getmsgcode, login } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  async created () {
    this.imgchange()
  },
  data () {
    return {
      imgurl: '',
      imgkey: '',
      imgcode: '',
      phonecode: {
        name: '获取验证码',
        color: '#3CB371',
        state: 1,
        second: 60,
        inputvalue: ''
      },
      msgcode: ''
    }
  },
  methods: {
    async imgchange () {
      const res = await getimg()
      // console.log(res)
      this.imgurl = res.data.base64
      this.imgkey = res.data.key
    },
    async getphonecode () {
      if (this.phonecode.state === 1) {
        if (/1[3-9]\d{9}$/.test(this.phonecode.inputvalue)) {
          if (/^\w{4}$/.test(this.imgcode)) {
            await getmsgcode(this.imgcode, this.imgkey, this.phonecode.inputvalue)
            // console.log(res)

            this.phonecode.name = `${this.phonecode.second}后重新获取`
            this.phonecode.color = '#b8b8b8'
            this.phonecode.second--
            this.phonecode.state = 0
            Toast('验证码已发送')

            const timer = setInterval(() => {
              this.phonecode.name = `${this.phonecode.second}后重新获取`
              this.phonecode.second--
            }, 1000)

            setTimeout(() => {
              this.phonecode.name = '获取验证码'
              this.phonecode.color = '#3CB371'
              this.phonecode.second = 60
              clearInterval(timer)
              this.phonecode.state = 1
            }, 60000)
          } else {
            Toast('请输入正确的图形验证码')
            this.imgcode = ''
          }
        } else {
          Toast('请输入正确的手机号')
          this.phonecode.inputvalue = ''
        }
      }
    },
    async login () {
      if (/1[3-9]\d{9}$/.test(this.phonecode.inputvalue) && /^\w{4}$/.test(this.imgcode)) {
        const res = await login(this.msgcode, this.phonecode.inputvalue)
        console.log('登录成功')
        console.log(res)
        Toast.success('登录成功！')

        this.$store.commit('user/settoken', { token: res.data.token, userid: res.data.userid })

        const url = this.$route.query.backurl || '/'

        setTimeout(() => {
          this.$router.push(url)
        }, 500)
        // 加了一个延时跳转
      } else {
        Toast('请输入正确的信息')
      }
    }
  }
}
</script>

<style lang="less" scoped>

  .body{

    padding: 89px 29px;

    .title {
      font-size: 31px;
      font-weight: normal;
    }

    .tit {
      margin-top: 22px;
      font-size: 17px;
      color: #b8b8b8;
    }

    form {
      margin-top: 80px;
    }

    .inputbox {
      height: 35px;
      width: 300px;
      display: flex;
      border-bottom: #b8b8b8 solid 1px;
      margin-bottom: 50px;
      padding-bottom: 40px;
    }

    .inputbox input {
      height: 20px;
      width: 200px;
      border: 0px;

    }

    .inputbox img {
      height: 30px;
      display: inline;
      line-height: 10px;
    }

    .inputbox button {
      background-color: #fff;
      border: 0px;
      // color: #3CB371;
      width: 100px;
    }

    .login {
      margin-top: 60px;
      padding: 15px 29px;
      width:300px;
      border-radius: 50px;
      border: #3CB371 0px;
      // background-color: #3CB371;
      background: rgb(93,218,149);
      background: linear-gradient(90deg, rgba(93,218,149,1) 25%, rgba(60,179,113,1) 100%);
      color:#fff;
    }

  }

</style>
