<template>
  <div class="wrap">
    <div class="item">
      <div class="relations">
        <ul>
          <li>
            <div class="name">是否就餐住宿</div>
            <div class="li-right v-flex" @click="showPopupPicker = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FeatStay"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="name">有无吸烟</div>
            <div class="li-right v-flex" @click="showPopupPicker2 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.Fsmoke"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">所学外语及掌握程度</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="form.FlanguageLevel"
              />
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">计算机掌握程度</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="form.FcomputerLevel"
              />
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">专业特长</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="form.FstrongSuit"
              />
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">兴趣爱好</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="form.Ffond" />
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">最低待遇要求</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="form.Ftreatment"
              />
            </div>
          </li>
          <!-- <li v-if='$route.query.type == 3'>
            <div class='name'>获取招聘途径</div>
            <div class='li-right v-flex' @click='showPopupPicker3 = true'>
              <input type="text" placeholder="请选择" readonly v-model='form.FenrolID'>
              <i class='iconfont icon-iconfontyoujiantou'></i>
            </div>
          </li> -->
          <li>
            <div class="name">是否同意加班</div>
            <div class="li-right v-flex" @click="showPopupPicker4 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FWhetherOvertime"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <mt-button type="default" class="mtbutton" @click.native="confirm()"
      >提交</mt-button
    >
    <popup-picker
      :show.sync="showPopupPicker"
      :show-cell="false"
      title="TEST"
      :data="[['是', '否']]"
      v-model="form.FeatStay"
    ></popup-picker>
    <popup-picker
      :show.sync="showPopupPicker2"
      :show-cell="false"
      title="TEST"
      :data="[['有', '无']]"
      v-model="form.Fsmoke"
    ></popup-picker>
    <popup-picker
      :show.sync="showPopupPicker3"
      :show-cell="false"
      title="TEST"
      :data="[list]"
      v-model="form.FenrolID"
    ></popup-picker>
    <popup-picker
      :show.sync="showPopupPicker4"
      :show-cell="false"
      title="TEST"
      :data="[['是', '否']]"
      v-model="form.FWhetherOvertime"
    ></popup-picker>
  </div>
</template>

<script>
import { PopupPicker } from "vux";
export default {
  data() {
    return {
      list: [
        "外部招聘",
        "推荐",
        "内部晋升",
        "员工介绍",
        "老员工返厂",
        "校园招聘",
        "网络招聘（58同城）",
        "网络招聘（鞋业人才网）",
        "网络招聘（温州人力资源网）",
        "网络招聘（前程无忧）"
      ],
      showPopupPicker: false,
      showPopupPicker2: false,
      showPopupPicker3: false,
      showPopupPicker4: false,
      // FeatStay: [],
      // Fsmoke: [],
      // FenrolID: [],
      // FWhetherOvertime: [],
      form: {
        FcomputerLevel: "",
        FlanguageLevel: "",
        Ffond: "",
        Ftreatment: "",
        FeatStay: [],
        Fnotes: "",
        Fsmoke: [],
        FstrongSuit: "",
        // FenrolID: [],
        Fleavedate: "",
        FleaveTypeID: "",
        FleaveBecuase: "",
        FWhetherOvertime: ["是"]
      }
    };
  },
  computed: {
    main2() {
      return this.getSession("main2");
    }
  },
  components: {
    PopupPicker
  },
  mounted() {
    if (this.main2) {
      this.form = this.main2;
      //this.form.FeatStay = this.form.FeatStay
      //this.form.Fsmoke = this.form.Fsmoke
      //this.form.FWhetherOvertime = this.form.FWhetherOvertime
    }
  },
  methods: {
    confirm() {
      //console.info("this.form.FeatStay[0]"+this.form.FeatStay[0]);
      //this.form.FeatStay = this.form.FeatStay[0]==null?"":this.form.FeatStay[0]
      //console.info("this.form.Fsmoke[0]"+this.form.Fsmoke[0]);
      //this.form.Fsmoke = this.form.Fsmoke[0]==null?"":this.form.Fsmoke[0]
      //console.info("this.form.FWhetherOvertime[0]"+this.form.FWhetherOvertime[0]);
      //this.form.FWhetherOvertime = this.form.FWhetherOvertime[0]==null?"":this.form.FWhetherOvertime[0]
      // this.form.FenrolID = this.FenrolID
      this.saveSession("main2", this.form);
      //console.log(this.form)
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
      position: absolute;
      color: #aa0000;
      right: 0.3rem;
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
