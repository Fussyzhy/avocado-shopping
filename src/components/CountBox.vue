<template>
  <div>
    <button @click="mincount">-</button>
    <input type="text" :value="value" @change="changevalue">
    <button @click="addcount">+</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    addcount () {
      this.$emit('input', this.value + 1)
    },
    mincount () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    changevalue (e) {
      // console.log(e.target.value)
      const num = +e.target.value // 转数字处理 (1) 数字 (2) NaN

      // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }

      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>

button {
  width: 20px;
  height: 22px;
  border: 0px;
  background-color: rgb(228, 228, 228);
}

input {
  width: 40px;
  height: 22px;
  background-color: rgb(228, 228, 228);
  border: 0px;
  text-align: center;
  margin: 0px 5px;
}

</style>
