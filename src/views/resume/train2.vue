<template>
  <div class="wrap">
    <div
      class="item"
      v-for="(item, index) in studyList"
      :key="index"
      :class="index > 0 ? 'mt20' : ''"
    >
      <div class="title" @click="choose(index)">
        技能培训{{ index + 1 }}
        <i class="iconfont icon-xuanzhong-copy" v-if="item.status"></i>
        <div class="unselect" v-else></div>
      </div>
      <div class="relations">
        <ul>
          <li>
            <div class="name">由年月</div>
            <div
              class="li-right v-flex"
              @click="opendateTimePicker(index, 'dateTimePopup')"
            >
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="item.startDate"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="name">至年月</div>
            <div
              class="li-right v-flex"
              @click="opendateTimePicker(index, 'dateTimePopup2')"
            >
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="item.endDate"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="name">学校及培训单位</div>
            <div class="content">
              <input type="text" placeholder="请填写" />
            </div>
          </li>
          <li>
            <div class="name">培训项目</div>
            <div class="content">
              <input type="text" placeholder="请填写" />
            </div>
          </li>
          <li>
            <div class="name">获取证书</div>
            <div class="content">
              <input type="text" placeholder="请填写" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="addreduce">
      <div class="add" @click="add">添加</div>
      <div class="reduce" @click="reduce">删除</div>
    </div>
    <mt-button type="default" class="mtbutton">提交</mt-button>
    <mt-datetime-picker
      class="mtPopup"
      ref="dateTimePopup"
      v-model="startDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="start"
      @confirm="popupBtn('confirm')"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      class="mtPopup"
      ref="dateTimePopup2"
      v-model="endDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="start"
      @confirm="popupBtn('confirm2')"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "2009-09-09",
      endDate: "2009-09-09",
      start: new Date("1900-01-01"),
      studyList: [
        {
          endDate: "",
          startDate: "",
          education: "",
          biye: "",
          status: false
        }
      ],
      index: ""
    };
  },
  methods: {
    popupBtn(value) {
      let _date;
      if (value === "confirm") {
        let date = new Date(this.startDate);
        _date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.studyList[this.index], "startDate", _date);
      } else if (value === "confirm2") {
        let date = new Date(this.endDate);
        _date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.studyList[this.index], "endDate", _date);
      }
    },
    opendateTimePicker(index, value) {
      this.index = index;
      this.$refs[value].open();
    },
    choose(index) {
      this.$set(this.studyList[index], "status", !this.studyList[index].status);
    },
    add() {
      this.studyList.push({
        endDate: "",
        startDate: "",
        education: "",
        biye: "",
        status: false
      });
    },
    reduce() {
      if (this.studyList.length === 1) return;
      this.studyList.splice(this.studyList.length - 1, 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.color1 {
  color: #aa0000;
}
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
