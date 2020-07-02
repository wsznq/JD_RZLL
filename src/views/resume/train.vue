<template>
  <div class="wrap">
    <div
      class="item"
      v-for="(item, index) in studyList"
      :key="index"
      :class="index > 0 ? 'mt20' : ''"
    >
      <div class="title" @click="choose(index)">
        学习培训经历{{ index + 1 }}
        <i class="iconfont icon-xuanzhong-copy" v-if="item.status"></i>
        <div class="unselect" v-else></div>
      </div>
      <div class="relations">
        <ul>
          <li>
            <div class="name" v-if="$route.query.type == 1">最高学历</div>
            <div class="name" v-if="$route.query.type == 2">等别</div>
            <div class="name" v-if="$route.query.type == 3">学历</div>
            <div class="li-right v-flex">
              <input
                type="text"
                placeholder="请选择"
                readonly
                @click="(popupVisible2 = true), (study_index = index)"
                v-model="item.Fdengji"
              />
              <i
                class="iconfont icon-iconfontyoujiantou"
                @click="(popupVisible2 = true), (study_index = index)"
              ></i>
            </div>
          </li>
          <li>
            <div class="name color1">由年月</div>
            <div
              class="li-right v-flex"
              @click="openPickdate(index, 'dateTimePopup')"
            >
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="item.Ffromdate"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="name color1">至年月</div>
            <div
              class="li-right v-flex"
              @click="openPickdate(index, 'dateTimePopup2')"
            >
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="item.Ftodate"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="name">学校及培训单位</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.Fxuexiao" />
            </div>
          </li>
          <li>
            <div class="name">专业</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.Fzhuanye" />
            </div>
          </li>
          <li>
            <div class="name">是否毕业/是否领证</div>
            <div
              class="li-right v-flex"
              @click="(popupVisible = true), (study_index = index)"
            >
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="item.Fbiye"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
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
    <!-- 最高学历 -->
    <mt-popup v-model="popupVisible2" position="bottom" class="mtPopup">
      <div class="popupTitle">
        <div class="close" @click="popupBtn('cancel')">取消</div>
        <div class="close" @click="popupBtn('confirm2')">确定</div>
      </div>
      <mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
    </mt-popup>
    <!-- 由年月 -->
    <mt-datetime-picker
      class="mtPopup"
      ref="dateTimePopup"
      v-model="startDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="start"
      @confirm="popupBtn('confirm3')"
    ></mt-datetime-picker>
    <!-- 至年月 -->
    <mt-datetime-picker
      class="mtPopup"
      ref="dateTimePopup2"
      v-model="endDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="start"
      @confirm="popupBtn('confirm4')"
    ></mt-datetime-picker>
    <!-- 是否毕业 -->
    <mt-popup v-model="popupVisible" position="bottom" class="mtPopup">
      <div class="popupTitle">
        <div class="close" @click="popupBtn('cancel')">取消</div>
        <div class="close" @click="popupBtn('confirm')">确定</div>
      </div>
      <mt-picker :slots="slots4" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endDate: "2000-01-01",
      startDate: "2000-01-01",
      start: new Date("1900-01-01"),
      study_index: "",
      studyList: [
        {
          Fdengji: "",
          Ffromdate: "",
          Ftodate: "",
          Fxuexiao: "",
          Fzhuanye: "",
          Fbiye: "",
          status: false
        }
      ],
      popupVisible3: false,
      popupVisible2: false,
      popupVisible: false,
      slots4: [
        {
          flex: 1,
          values: ["是", "否"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ["小学", "初中", "高中", "大学", "更高学历"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      biye: "",
      education: "",
      defaultNumber1: 1,
      defaultNumber2: 2,
      defaultNumber3: 3,
      mustNumber1: 1,
      mustNumber2: 1,
      mustNumber3: 2
    };
  },
  computed: {
    jyxl() {
      return this.getSession("jyxl");
    }
  },
  mounted() {
    if (this.jyxl) {
      this.studyList = this.jyxl;
    }
    if (parseInt(this.$route.query.type) === 1) {
      for (let i = this.studyList.length; i < this.defaultNumber1; i++)
        this.add(); //默认两个
    } else if (parseInt(this.$route.query.type) === 2) {
      for (let i = this.studyList.length; i < this.defaultNumber2; i++)
        this.add(); //默认三个
    } else {
      for (let i = this.studyList.length; i < this.defaultNumber3; i++)
        this.add(); //默认三个
    }
  },
  methods: {
    confirm() {
      for (var i = this.studyList.length - 1; i >= 0; i--) {
        if (this.$route.query.type === "1") {
          if (this.studyList.length > this.mustNumber1) {
            if (this.studyList[i].Fdengji == "") {
              this.studyList.splice(i, 1);
            }
          }
        } else if (this.$route.query.type === "2") {
          if (this.studyList.length > this.mustNumber2) {
            if (this.studyList[i].Fdengji == "") {
              this.studyList.splice(i, 1);
            }
          }
        } else {
          if (this.studyList.length > this.mustNumber3) {
            if (this.studyList[i].Fdengji == "") {
              this.studyList.splice(i, 1);
            }
          }
        }
      }
      for (var j = 0; j < this.studyList.length; j++) {
        if (this.studyList[j].Fdengji === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "学历",
            duration: 1500
          });
          return;
        }
        if (this.studyList[j].Ffromdate === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "开始年月",
            duration: 1500
          });
          return;
        }
        if (this.studyList[j].Ftodate === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "结束年月",
            duration: 1500
          });
          return;
        }
        if (this.studyList[j].Fxuexiao === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "学校及培训单位",
            duration: 1500
          });
          return;
        }
        if (this.studyList[j].Fzhuanye === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "专业",
            duration: 1500
          });
          return;
        }
        if (this.studyList[j].Fbiye === "") {
          this.$toast({
            message: "请选择学习培训经历" + (j + 1) + "是否毕业/是否领证",
            duration: 1500
          });
          return;
        }
      }
      this.saveSession("jyxl", this.studyList);
      this.$router.go(-1);
    },
    // 是否毕业
    onValuesChange(picker, values) {
      this.biye = values[0];
      picker.setSlotValue(1, values[0]);
    },
    // 由年月 至年月
    openPickdate(index, value) {
      this.study_index = index;
      this.$refs[value].open();
    },
    onValuesChange2(picker, values) {
      this.education = values[0];
      picker.setSlotValue(1, values[0]);
    },
    popupBtn(value) {
      this.popupVisible = false;
      this.popupVisible2 = false;
      // eslint-disable-next-line no-empty
      if (value === "cancel") {
      } else if (value === "confirm") {
        this.$set(this.studyList[this.study_index], "Fbiye", this.biye);
      } else if (value === "confirm2") {
        this.$set(this.studyList[this.study_index], "Fdengji", this.education);
      } else if (value === "confirm3") {
        let date = new Date(this.startDate);
        let _date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.studyList[this.study_index], "Ffromdate", _date);
      } else if (value === "confirm4") {
        let date = new Date(this.endDate);
        let _date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.studyList[this.study_index], "Ftodate", _date);
      }
    },
    choose(index) {
      let item = this.studyList[index];

      this.$set(this.studyList[index], "status", !item.status);
    },
    add() {
      this.studyList.push({
        Fdengji: "",
        Ffromdate: "",
        Ftodate: "",
        Fxuexiao: "",
        Fzhuanye: "",
        Fbiye: "",
        status: false
      });
    },
    reduce() {
      for (var i = this.studyList.length - 1; i >= 0; i--) {
        if (this.studyList[i].status == true) {
          if (this.$route.query.type === "1") {
            if (this.studyList.length <= this.mustNumber1) {
              this.$toast("必须输入" + this.mustNumber1 + "项");
              return;
            }
          } else if (this.$route.query.type === "2") {
            if (this.studyList.length <= this.mustNumber2) {
              this.$toast("必须输入" + this.mustNumber2 + "项");
              return;
            }
          } else {
            if (this.studyList.length <= this.mustNumber3) {
              this.$toast("必须输入" + this.mustNumber3 + "项");
              return;
            }
          }
          this.studyList.splice(i, 1);
        }
      }
      //console.info(this.studyList);
      // if (this.studyList.length === 1) return;
      // this.studyList.splice(this.studyList.length - 1, 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.color1 {
  color: #aa0000;
}
.icon-xuanzhong-copy {
  font-size: 24px;
  color: #aa0000;
  right: 0.3rem;
}
.unselect {
  top: 0.15rem;
  .wh(24px, 24px);
  border: 1px solid #b7aeae;
  // position: absolute;
  // right: .3rem;
  border-radius: 100%;
}
.title {
  text-align: center;
  height: 0.8rem;
  color: #666;
  font-size: 16px;
  background: white;
  border-bottom: 1px solid #eee;
  position: relative;
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
  }
}
</style>
