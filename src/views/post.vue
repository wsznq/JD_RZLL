<template>
  <div style="padding-bottom: 3rem;background: white;">
    <div class="content">
      <p>注释</p>
      <p>在应聘岗位处输入需要应聘的岗位，可输入岗位的简拼，</p>
      <p>例：针车普工，输入ZCPG后自动匹配到针车普工</p>
    </div>
    <div class="btm">
      <div class="title">应聘岗位</div>
      <div class="input-box">
        <input type="text" v-model="searchValue" @click="showBox1 = true" />
        <div class="val-box" v-if="dutyList.length && searchValue && showBox1">
          <ul>
            <li
              v-for="(item, index) in dutyList"
              :key="index"
              @click="(searchValue = item), (dutyList = []), (showBox1 = false)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class='title'>应聘部门</div>
      <div class='input-box'>
        <input type="text" v-model='departName' @click='showBox = true'>
        <div class='val-box' v-if='departList.length&&departName&&showBox'>
          <ul>
            <li v-for='(item, index) in departList' :key='index' @click='departName = item,departList = [], showBox = false'>{{item}}</li>
          </ul>
        </div>
      </div> -->
      <!-- <div class='title'>职务级别</div>
      <div class='input-box'>
        <input type="text" v-model='rankName' @click='showBox2 = true'>
        <div class='val-box' v-if='rankList.length&&rankName&&showBox2'>
          <ul>
            <li v-for='(item, index) in rankList' :key='index' @click='rankName = item,rankList = [], showBox2 = false'>{{item}}</li>
          </ul>
        </div>
      </div> -->
      <mt-button type="default" class="mtbutton" @click="toResume"
        >进入简历填写</mt-button
      >
    </div>
    <!-- <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="[dutyList]" v-model="FDutyID"></popup-picker> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// import { PopupPicker } from 'vux';
import { GetDutyList, GetDepartment, GetFunction } from "@/api/getData";
import "./post.less";
export default {
  data() {
    return {
      showBox2: false,
      showBox1: false,
      showBox: false,
      departName: "",
      rankName: "",
      searchValue: "",
      FDutyID: [],
      showPopupPicker: false,
      dutyList: [],
      departList: [],
      rankList: [],
      dutyList2: [],
      departList2: [],
      rankList2: [],
      FJobType: 0,
      form: {
        FOrganizeID: "",
        Fnumber: "",
        Fname: "",
        FsexID: "",
        FBirthday: "",
        FNationID: "",
        FmarriageID: "",
        FDegreeID: "",
        FDeptmentID: "",
        Fspecialty: "",
        FDutyID: [],
        FFunctionID: "",
        FDutyLevel: "",
        FtechnologyID: "",
        FenrolID: "",
        FtechnicalPost: "",
        FBeginHireDate: "",
        FpoliticsFace: "",
        FEmpGroupID: "",
        Fcertificate: "身份证",
        FofficialDate: "",
        FpostalCode: "",
        FHiredate: "",
        Fquarters: "",
        Fstature: "",
        Favoirdupois: "",
        FNativePlaceID: "",
        Faddreess: "",
        FID: "",
        FNowAddreess: "",
        FUserLifeBeginDate: "",
        FUserLifeEndDate: "",
        FPoliceStation: "",
        FExigencePhone: "",
        FPhone: "",
        FFutureWorkdate: "",
        departName: "",
        FDutyName: "",
        FFunctionName: "",
        FOtherPerformance: ""
      }
    };
  },
  components: {},
  watch: {
    searchValue() {
      this.GetDutyList();
    },
    departName() {
      this.GetDepartment();
    },
    rankName() {
      this.GetFunction();
    }
  },
  mounted() {
    // this.GetDutyList()
    //this.GetDepartment()
    // this.GetFunction()
  },
  methods: {
    // 职务级别
    async GetFunction() {
      let data = await GetFunction({ KeyWord: this.rankName });
      this.rankList2 = eval(data);
      this.rankList = eval(data).map(item => {
        return item.FName;
      });
    },
    // 应聘部门
    async GetDepartment() {
      let data = await GetDepartment({ KeyWord: this.departName });
      this.departList2 = eval(data);
      this.departList = eval(data).map(item => {
        return item.FName;
      });
    },
    // 应聘岗位
    async GetDutyList() {
      let data = await GetDutyList({ KeyWord: this.searchValue });
      this.dutyList2 = eval(data);
      this.dutyList = eval(data).map(item => {
        return item.FName;
      });
      //console.log(data);
    },
    toResume() {
      //console.log(this.getSession("main"));
      //console.log(this.getSession("main") == null);
      // eslint-disable-next-line no-unused-vars
      let data = "";
      if (this.getSession("main") == null) {
        data = this.form;
      } else {
        data = this.getSession("main") || {};
      }
      //console.log(data);
      // let depart = this.departList2.filter((item) => {
      //   return item.FName === this.departName
      // })
      // //data.FDeptmentID = depart[0].FNumber
      // //data.departName = depart[0].FName
      // this.form.FDeptmentID = depart[0].FNumber
      // this.form.departName = depart[0].FName

      let duty = this.dutyList2.filter(item => {
        return item.FName === this.searchValue;
      });
      //data.FDutyID = duty[0].FItemID
      //data.FDutyName = duty[0].FName
      this.form.FDutyID = duty[0].FItemID;
      this.form.FDutyName = duty[0].FName;
      this.FJobType = duty[0].FJobType;
      //console.info(this.FJobType);
      if (this.FJobType === 0) {
        Toast({ message: "请找人事专员添加岗位类别", duration: 3000 });
        return;
      }

      // // let rank = this.rankList2.filter((item) => {
      // //   return item.FName === this.rankName
      // // })
      // // //data.FFunctionID = rank[0].FItemID
      // // //data.FFunctionName = rank[0].FName
      // // this.form.FFunctionID = rank[0].FItemID
      // // this.form.FFunctionName = rank[0].FName

      if (
        //!this.departName ||
        !this.searchValue // //|| !this.rankName
      )
        return this.$toast("请完善信息");
      //console.log(data);
      //console.info(this.form);
      //this.saveSession('main', data)
      this.saveSession("main", this.form);
      this.$router.push({
        path: "/ctalog",
        query: { type: this.FJobType == 0 ? 3 : this.FJobType }
      });
    }
  }
};
</script>
