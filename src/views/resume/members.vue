<template>
  <div class="wrap">
    <div
      class="item"
      v-for="(item, index) in qsgx"
      :key="index"
      :class="index > 0 ? 'mt20' : ''"
    >
      <div class="title" @click="choose(index)">
        家庭主要成员{{ index + 1 }}
        <i class="iconfont icon-xuanzhong-copy" v-if="item.status"></i>
        <div class="unselect" v-else></div>
      </div>
      <div class="relations">
        <ul>
          <li>
            <div class="name">姓名</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.Fname" />
            </div>
          </li>
          <li>
            <div class="name">关系</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.Fguanxi" />
            </div>
          </li>
          <li>
            <div class="name">现工作单位</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.Faddree" />
            </div>
          </li>
          <li>
            <div class="name">职务</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.FdutyNam" />
            </div>
          </li>
          <li>
            <div class="name">联系电话</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.FTel" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="addreduce">
      <div class="add" @click="add">添加</div>
      <div class="reduce" @click="reduce">删除</div>
    </div>
    <mt-button type="default" class="mtbutton" @click.native="confirm"
      >提交</mt-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      qsgx: [
        {
          Fname: "",
          Fguanxi: "",
          Faddree: "",
          FdutyNam: "",
          FTel: "",
          status: false
        }
      ],
      defaultNumber1: 2,
      defaultNumber2: 2,
      defaultNumber3: 2,
      mustNumber1: 1,
      mustNumber2: 2,
      mustNumber3: 2,
      mustNumber: 0
    };
  },
  computed: {
    qsgx2() {
      return this.getSession("qsgx");
    }
  },
  mounted() {
    if (this.qsgx2) this.qsgx = this.qsgx2; //加载已填
    if (parseInt(this.$route.query.type) === 1) {
      for (let i = this.qsgx.length; i < this.defaultNumber1; i++) {
        this.add();
      } //默认两个
    } else if (parseInt(this.$route.query.type) === 2) {
      for (let i = this.qsgx.length; i < this.defaultNumber2; i++) {
        this.add();
      } //默认两个
    } else {
      for (let i = this.qsgx.length; i < this.defaultNumber3; i++) {
        this.add();
      } //默认两个
    }
    // this.saveSession('name', this.qsgx)
  },
  methods: {
    choose(index) {
      //判断资料是否填写完整
      let item = this.qsgx[index];
      // if(!item.Fname){
      //   this.$toast({message:'请填写姓名',duration:1500});
      //   return;
      // }
      // if(!item.Fguanxi){
      //   this.$toast({message:'请填写关系',duration:1500});
      //   return;
      // }
      // if(!item.FTel){
      //   this.$toast({message:'请填写联系电话',duration:1500});
      //   return;
      // }
      this.$set(this.qsgx[index], "status", !item.status);
    },
    add() {
      this.qsgx.push({
        Fname: "",
        Fguanxi: "",
        Faddree: "",
        FdutyNam: "",
        FTel: "",
        status: false
      });
    },
    reduce() {
      for (var i = this.qsgx.length - 1; i >= 0; i--) {
        if (this.qsgx[i].status == true) {
          if (this.$route.query.type === "1") {
            if (this.qsgx.length <= this.mustNumber1) {
              this.$toast("必须输入" + this.mustNumber1 + "项");
              return;
            }
          } else if (this.$route.query.type === "2") {
            if (this.qsgx.length <= this.mustNumber2) {
              this.$toast("必须输入" + this.mustNumber2 + "项");
              return;
            }
          } else {
            if (this.qsgx.length <= this.mustNumber3) {
              this.$toast("必须输入" + this.mustNumber3 + "项");
              return;
            }
          }
          this.qsgx.splice(i, 1);
        }
      }
      //console.info(this.qsgx);
      //this.qsgx.splice(this.qsgx.length-1, 1)
    },
    confirm() {
      for (var i = this.qsgx.length - 1; i >= 0; i--) {
        if (this.$route.query.type.toString() === "1") {
          if (this.qsgx.length > this.mustNumber1) {
            if (this.qsgx[i].Fname == "") {
              this.qsgx.splice(i, 1);
            }
          }
        } else if (this.$route.query.type.toString() === "2") {
          if (this.qsgx.length > this.mustNumber2) {
            if (this.qsgx[i].Fname == "") {
              this.qsgx.splice(i, 1);
            }
          }
        } else {
          if (this.qsgx.length > this.mustNumber3) {
            if (this.qsgx[i].Fname == "") {
              this.qsgx.splice(i, 1);
            }
          }
        }
      }
      for (var j = 0; j < this.qsgx.length; j++) {
        if (this.qsgx[j].Fname == "") {
          this.$toast({
            message: "请填写家庭主要成员" + (j + 1) + "姓名",
            duration: 1500
          });
          return;
        }
        if (this.qsgx[j].Fguanxi == "") {
          this.$toast({
            message: "请填写家庭主要成员" + (j + 1) + "关系",
            duration: 1500
          });
          return;
        }
        if (this.qsgx[j].FTel == "") {
          this.$toast({
            message: "请填写家庭主要成员" + (j + 1) + "联系电话",
            duration: 1500
          });
          return;
        }
      }
      this.saveSession("qsgx", this.qsgx);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";

.color1 {
  color: #aa0000;
}
.item {
  position: relative;
  .title {
    text-align: center;
    height: 0.8rem;
    color: #666;
    font-size: 16px;
    background: white;
    border-bottom: 1px solid #eee;
    .v-flex;
    .icon-xuanzhong-copy {
      font-size: 24px;
      position: absolute;
      color: #aa0000;
      right: 0.3rem;
    }
    .unselect {
      .wh(24px, 24px);
      border: 1px solid #b7aeae;
      position: absolute;
      right: 0.3rem;
      border-radius: 100%;
      top: 0.15rem;
    }
  }
  .relations {
    ul {
      li {
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        input {
          border: none;
          text-align: right;
        }
      }
    }
  }
}
</style>
