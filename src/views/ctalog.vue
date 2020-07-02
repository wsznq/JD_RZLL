<template>
  <div class="wrap">
    <div class="list">
      <div
        class="button"
        @click="toUrl('/infomation')"
        :class="main ? 'backBtnColor' : 'bg'"
      >
        基本信息
        <i class="iconfont icon-gou"></i>
      </div>
      <div
        class="button"
        @click="toUrl('/members')"
        :class="qsgx ? 'backBtnColor' : 'bg'"
      >
        家庭主要成员
        <i v-if="qsgx" class="iconfont icon-gou"></i>
      </div>
      <div
        class="button"
        @click="toUrl('/train')"
        :class="jyxl ? 'backBtnColor' : 'bg'"
      >
        学习及培训经历
        <i v-if="jyxl" class="iconfont icon-gou"></i>
      </div>
      <!-- <div class='button' v-if='$route.query.type == 3' @click='toUrl("/train2")'> 
        技能培训经历
        <i class='iconfont icon-gou'></i>
      </div> -->
      <div
        class="button"
        @click="toUrl('/work')"
        :class="gzjl ? 'backBtnColor' : 'bg'"
      >
        主要工作经历
        <i v-if="gzjl" class="iconfont icon-gou"></i>
      </div>
      <!-- <div class='button' @click='toUrl("/work2")'>
        其他工作经历及业绩
        <i class='iconfont icon-gou'></i>
      </div> -->
      <div
        class="button"
        @click="toUrl('/other')"
        :class="main2 ? 'backBtnColor' : 'bg'"
      >
        其他信息
        <i class="iconfont icon-gou"></i>
      </div>
    </div>
    <mt-button type="default" class="mtbutton" @click.native="confirm"
      >提交</mt-button
    >
  </div>
</template>

<script>
import { confirmData } from "@/api/getData";
export default {
  data() {
    return {
      qsgx: false,
      gzjl: false,
      jyxl: false,
      main: false,
      main2: false,
      form: {
        jsonStrMain: [{ Fnumber: "123" }],
        jsonStrDetail1: [],
        jsonStrDetail2: [],
        jsonStrDetail3: [],
        jsonStrDetail4: ""
      }
    };
  },
  mounted() {
    if (this.getSession("qsgx")) {
      this.qsgx = true;
      this.form.jsonStrDetail1 = this.getSession("qsgx");
    }
    if (this.getSession("gzjl")) {
      this.gzjl = true;
      this.form.jsonStrDetail3 = this.getSession("gzjl");
    }
    if (this.getSession("jyxl")) {
      this.jyxl = true;
      this.form.jsonStrDetail2 = this.getSession("jyxl");
    }
    if (this.getSession("main") && this.getSession("main").Fname) {
      this.main = true;
      //console.log(this.getSession('main'))
      this.form.jsonStrMain = [
        Object.assign(
          this.getSession("main2") == null ? "{}" : this.getSession("main2"),
          this.getSession("main")
        )
      ];
    }
    //console.log(this.form.jsonStrMain)
    if (this.getSession("main2")) {
      this.main2 = true;
      // this.form.jsonStrMain = [ ...this.getSession('main2')]
    }
  },
  methods: {
    toUrl(url) {
      this.$router.push({ path: url, query: { type: this.$route.query.type } });
    },
    async confirm() {
      if (
        this.form.jsonStrMain == "" ||
        this.form.jsonStrDetail1 == "" ||
        this.form.jsonStrDetail2 == "" ||
        this.form.jsonStrDetail3 == ""
      ) {
        this.$toast("请先完善数据再提交");
        return;
      }
      for (let item in this.form) {
        this.form[item] = JSON.stringify(this.form[item]);
      }
      //console.log(this.form)
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      let data = await confirmData(this.form);
      // if (data === 40217) {
      //console.log(this.form)
      this.$store.commit("updateLoadingStatus", { isLoading: false });
      this.$router.push({ path: "/status" });
      // }
      //console.log(data)
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.bg {
  background: #f8f8f8;
  color: #333;
}
.list {
  background: white;
  width: 100%;
  padding: 0.2rem;
  .button {
    margin-top: 0.5rem;
    position: relative;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
    border: 0.02rem solid #dfdfdf;
    i {
      position: absolute;
      right: 0.2rem;
      color: white;
    }
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
