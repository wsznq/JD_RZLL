<template>
  <div class="wrap">
    <div class="content">
      {{ content }}
    </div>
    <div class="buttons">
      <!-- <x-button :gradients="['#d93309', '#aa0000']">不同意</x-button>
      <x-button :gradients="['#d93309', '#aa0000']">同意</x-button> -->
      <mt-button type="default" class="mtbuttons" @click.native="unAgreement"
        >不同意</mt-button
      >
      <mt-button type="default" class="mtbuttons" @click.native="agreement"
        >同意</mt-button
      >
    </div>
  </div>
</template>

<script>
// import { getAll } from '@/api/getData'
// import { xButton } from 'vux'
export default {
  data() {
    return {
      content:
        "本人保证以下入职所填写的教育培训经历、工作经历等各项料真实有效，没有填写虚假信息或隐瞒事实真相；同时保证与之前曾任职单位无存在任何遗留问题，更无任何违法乱纪行为，如有捷饰任何不利于申请此职位的资料，自愿接受公司的解雇处理，同时承担因隐瞒事实而带来的一切后果。"
    };
  },
  mounted() {
    //getAll().then((res) => {console.log(res)})
  },
  methods: {
    unAgreement() {
      WeixinJSBridge.call("closeWindow");
    },
    agreement() {
      this.$router.push({ path: "/Post" });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.content {
  background: white;
  padding: 0.3rem;
  color: #666666;
  line-height: 0.56rem;
  font-size: 14px;
}
.buttons {
  .mt20;
  width: 100%;
  // display: flex;
  padding: 0.2rem;
  // justify-content: space-around;
  .mtbuttons {
    flex: 1;
    width: 3.3rem;
    .backBtnColor;
    color: white;
    &:first-child {
      margin-right: 0.35rem;
    }
  }
}
</style>
