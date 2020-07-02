<template>
  <div class="wrap">
    <div class="content">
      <textarea placeholder="请输入工作经历及业绩"></textarea>
    </div>
    <mt-button type="default" class="mtbutton">提交</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.color1 {
  color: #aa0000;
}
.content {
  background: white;
  padding: 0.2rem;
  textarea {
    width: 100%;
    height: 3rem;
  }
}
.mtbutton {
  .backBtnColor;
  color: white;
  width: 95%;
  position: fixed;
  bottom: 0;
  // margin-left: 2.5%;
  // //margin-top: .3rem;
  // margin-top: 250px;
}
</style>
