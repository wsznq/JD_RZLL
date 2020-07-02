<template>
  <div class="wrap">
    <div
      class="item"
      v-for="(item, index) in workList"
      :key="index"
      :class="index > 0 ? 'mt20' : ''"
    >
      <div class="title" @click="choose(index)">
        工作经历{{ index + 1 }}
        <i class="iconfont icon-xuanzhong-copy" v-if="item.status"></i>
        <div class="unselect" v-else></div>
      </div>
      <div class="relations">
        <ul>
          <li>
            <div class="name">由年月</div>
            <div class="li-right v-flex" @click="opendateTimePicker(index)">
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
            <div class="name">至年月</div>
            <div class="li-right v-flex" @click="opendateTimePicker2(index)">
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
            <div class="name">工作单位</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="item.FWorkCompany"
              />
            </div>
          </li>
          <li>
            <div class="name">所任职务</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="item.FdutyName"
              />
            </div>
          </li>
          <li>
            <div class="name">离职原因</div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写"
                v-model="item.FleaveBecuase"
              />
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="name">证明人/电话</div>
            <div class="content">
              <input type="text" placeholder="请填写" v-model="item.FWitness" />
            </div>
          </li>
          <li v-if="$route.query.type == 3" style="display:inherit">
            <div class="name">岗位主要职责及业绩</div>
            <x-textarea v-model="item.FPerformance" class="mt20"></x-textarea>
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
import { XTextarea } from "vux";
export default {
  data() {
    return {
      FPerformance: "",
      startDate: "2009-01-01",
      endDate: "2009-04-01",
      start: new Date("1900-01-01"),
      workList: [
        {
          Ffromdate: "",
          Ftodate: "",
          FWorkCompany: "",
          FdutyName: "",
          FleaveBecuase: "",
          FWitness: "",
          FPerformance: "",
          status: false
        }
      ],
      index: "",
      defaultNumber1: 2,
      defaultNumber2: 3,
      defaultNumber3: 5,
      mustNumber1: 1,
      mustNumber2: 1,
      mustNumber3: 3
    };
  },
  computed: {
    gzjl() {
      return this.getSession("gzjl");
    }
  },
  components: {
    XTextarea
  },
  mounted() {
    if (this.gzjl && this.gzjl.length) this.workList = this.gzjl;
    if (parseInt(this.$route.query.type) === 1) {
      for (let i = this.workList.length; i < this.defaultNumber1; i++)
        this.add(); //默认两个
    } else if (parseInt(this.$route.query.type) === 2) {
      for (let i = this.workList.length; i < this.defaultNumber2; i++)
        this.add(); //默认三个
    } else {
      for (let i = this.workList.length; i < this.defaultNumber3; i++)
        this.add(); //默认五个
    }
  },
  methods: {
    confirm() {
      for (var i = this.workList.length - 1; i >= 0; i--) {
        if (this.$route.query.type === "1") {
          if (this.workList.length > this.mustNumber1) {
            if (this.workList[i].Ffromdate === "") {
              this.workList.splice(i, 1);
            }
          }
        } else if (this.$route.query.type === "2") {
          if (this.workList.length > this.mustNumber2) {
            if (this.workList[i].Ffromdate === "") {
              this.workList.splice(i, 1);
            }
          }
        } else {
          if (this.workList.length > this.mustNumber3) {
            if (this.workList[i].Ffromdate === "") {
              this.workList.splice(i, 1);
            }
          }
        }
      }
      for (var j = 0; j < this.workList.length; j++) {
        if (this.workList[j].Ffromdate === "") {
          this.$toast({
            message: "请选择工作经历" + (j + 1) + "开始年月",
            duration: 1500
          });
          return;
        }
        if (this.workList[j].Ftodate === "") {
          this.$toast({
            message: "请选择工作经历" + (j + 1) + "结束年月",
            duration: 1500
          });
          return;
        }
        if (this.workList[j].FWorkCompany === "") {
          this.$toast({
            message: "请填写工作经历" + (j + 1) + "工作单位",
            duration: 1500
          });
          return;
        }
      }
      this.saveSession("gzjl", this.workList);
      this.$router.go(-1);
    },
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
        this.$set(this.workList[this.index], "Ffromdate", _date);
      } else {
        let date = new Date(this.endDate);
        _date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        if (
          this.workList[this.index].Ffromdate > _date &&
          this.workList[this.index].Ffromdate != ""
        ) {
          this.$vux.toast.text("请重新填写至年月");
        } else {
          this.$set(this.workList[this.index], "Ftodate", _date);
        }
      }
    },
    opendateTimePicker2(index) {
      this.index = index;
      this.$refs["dateTimePopup2"].open();
    },
    opendateTimePicker(index) {
      this.index = index;
      this.$refs["dateTimePopup"].open();
    },
    choose(index) {
      let item = this.workList[index];

      this.$set(this.workList[index], "status", !item.status);
    },
    add() {
      this.workList.push({
        // name: "",
        // relat: "",
        // danwei: "",
        // zhiwu: "",
        // tel: "",
        // status: false
        Ffromdate: "",
        Ftodate: "",
        FWorkCompany: "",
        FdutyName: "",
        FleaveBecuase: "",
        FWitness: "",
        FPerformance: "",
        status: false
      });
    },
    reduce() {
      //console.info(this.workList);
      for (var i = this.workList.length - 1; i >= 0; i--) {
        if (this.workList[i].status == true) {
          if (this.$route.query.type === "1") {
            if (this.workList.length <= this.mustNumber1) {
              this.$toast("必须输入" + this.mustNumber1 + "项");
              return;
            }
          } else if (this.$route.query.type === "2") {
            if (this.workList.length <= this.mustNumber2) {
              this.$toast("必须输入" + this.mustNumber2 + "项");
              return;
            }
          } else {
            if (this.workList.length <= this.mustNumber3) {
              this.$toast("必须输入" + this.mustNumber3 + "项");
              return;
            }
          }
          this.workList.splice(i, 1);
        }
      }
      //console.info(this.workList);
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
      font-size: 24px;
    }
    .unselect {
      .wh(24px, 24px);
      border: 1px solid #b7aeae;
      position: absolute;
      right: 0.3rem;
      top: 0.15rem;
      border-radius: 100%;
    }
  }
}
</style>
