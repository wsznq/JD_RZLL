<template>
  <div class="wrap" style="height: 100vh;background: white;">
    <div class="box">
      <i class="iconfont icon-xuanzhong-copy"></i>
      <p class="p1">入职履历提交成功</p>
      <p class="p2">您的履历正在审核中...</p>
      <mt-button type="default" class="mtbutton" @click="close">返回</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      WeixinJSBridge.call("closeWindow");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-xuanzhong-copy {
    font-size: 124px;
    color: #aa0000;
  }
  .p1 {
    color: #333;
    font-size: 20px;
  }
  .p2 {
    .mt20;
    color: #aa0000;
    font-size: 18px;
  }
  .mtbutton {
    margin-left: 0;
  }
}
</style>
