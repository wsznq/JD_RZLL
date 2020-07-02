<template>
  <div class="wrap">
    <form @submit="confirm()">
      <!-- <input type="file" accept="image/*" @change="changeImage($event)"/>accept
			<input type="file" accept="image/*" multiple @change="changeImage($event)"/>multiple
			<input type="file" accept="image/*" capture="camera" @change="changeImage($event)"/>capture
			<img :src="avatar" > -->
      <div class="upload1">证件识别</div>
      <div @click="clearFile" style="display:none;">清空 input 文件域</div>
      <input
        data-v-67bd53cf=""
        type="file"
        id="file-input"
        style="display: none;"
        multiple
        accept="image/*"
      />
      <!-- <input data-v-67bd53cf="" type="file"  style="display: none;" id="file-input" multiple  accept="image/"> -->
      <div class="phontBox">
        <img
          class="id-card"
          v-if="!photo1"
          src="../../assets/images/idCardImg.jpg"
          @click="addPic('photo1')"
        />
        <img
          class="id-card"
          v-if="photo1"
          :src="photo1"
          @click="addPic('photo1')"
        />
        <img
          class="id-card"
          v-if="!photo2"
          src="../../assets/images/idCard2.jpg"
          @click="addPic('photo2')"
        />
        <img class="id-card" v-else :src="photo2" @click="addPic('photo2')" />
      </div>
      <div class="upload">自拍证件照</div>
      <div class="phontBox">
        <img
          src="../../assets/images/person.png"
          v-if="!photo3"
          @click="addPic('photo3')"
        />
        <img :src="photo3" v-else @click="addPic('photo3')" />
      </div>
      <div class="infoList">
        <ul>
          <li>
            <div class="li-left">
              应聘职务*
            </div>
            <div class="liRight">
              <input
                type="text"
                placeholder="请选择"
                v-model="form.FDutyName"
                readonly
                required
                oninvalid="setCustomValidity('请填写应聘职务')"
                oninput="setCustomValidity('')"
              />
            </div>
          </li>
          <!-- <li>
						<div class='li-left'>
							职务级别
						</div>
						<div class='liRight'>
							<input type="text" placeholder="请选择" v-model='form.FFunctionName' readonly>
						</div>
					</li> -->
          <li>
            <div class="li-left">
              厂区*
            </div>
            <div class="li-right v-flex" @click="popupVisible7 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FOrganizeID"
                required
                oninvalid="setCustomValidity('请填写厂区')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              姓名*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Fname"
              required
              oninvalid="setCustomValidity('请填写姓名')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              出生年月*
            </div>
            <div class="li-right v-flex" @click="opendateTimePicker11">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FBirthday"
                required
                oninvalid="setCustomValidity('请填写出生年月')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              民族*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FNationID"
              required
              oninvalid="setCustomValidity('请填写民族')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              性别*
            </div>
            <div class="li-right v-flex" @click="popupVisible = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FsexID"
                required
                oninvalid="setCustomValidity('请填写性别')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              婚姻状况*
            </div>
            <div class="li-right v-flex" @click="popupVisible2 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FmarriageID"
                required
                oninvalid="setCustomValidity('请填写婚姻状况')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              籍贯*
            </div>
            <div class="li-right v-flex" @click="popupVisible6 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FNativePlaceID"
                required
                oninvalid="setCustomValidity('请填写籍贯')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <!-- <li>
						<div class='li-left'>
							籍贯*
						</div>
						<input type="text" placeholder="请填写" v-model='form.FNativePlaceID' required oninvalid="setCustomValidity('请填写籍贯')" oninput="setCustomValidity('')">
					</li> -->
          <li>
            <div class="li-left">
              户籍所在*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Faddreess"
              required
              oninvalid="setCustomValidity('请填写户籍所在')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              文化程度*
            </div>
            <div class="li-right v-flex" @click="popupVisible3 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FDegreeID"
                required
                oninvalid="setCustomValidity('请填写文化程度')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              持有证件*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Fcertificate"
              required
              oninvalid="setCustomValidity('请填写持有证件')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              招聘来源*
            </div>
            <div class="li-right v-flex" @click="popupVisible4 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FenrolID"
                required
                oninvalid="setCustomValidity('请填写招聘来源')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              身份证号*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FID"
              required
              oninvalid="setCustomValidity('请填写身份证号')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              职称（没有填无）*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FtechnicalPost"
              required
              oninvalid="setCustomValidity('请填写职称')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              现在住址*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FNowAddreess"
              required
              oninvalid="setCustomValidity('请填写现在住址')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              预计到岗时间*
            </div>
            <div class="li-right v-flex" @click="opendateTimePicker12">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FBeginHireDate"
                required
                oninvalid="setCustomValidity('请填写预计到岗时间')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              预计务工时间*
            </div>
            <div class="li-right v-flex" @click="opendateTimePicker13">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FFutureWorkdate"
                required
                oninvalid="setCustomValidity('请填写预计务工时间')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li>
            <div class="li-left">
              紧急联络人及电话*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FExigencePhone"
              required
              oninvalid="setCustomValidity('请填写紧急联络人及电话')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              本人电话*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FPhone"
              required
              oninvalid="setCustomValidity('请填写本人电话')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              专业*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Fspecialty"
              required
              oninvalid="setCustomValidity('请填写专业')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              政治面貌*
            </div>
            <div class="li-right v-flex" @click="popupVisible5 = true">
              <input
                type="text"
                placeholder="请选择"
                readonly
                v-model="form.FpoliticsFace"
                required
                oninvalid="setCustomValidity('请填写政治面貌')"
                oninput="setCustomValidity('')"
              />
              <i class="iconfont icon-iconfontyoujiantou"></i>
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              应聘部门*
            </div>
            <div class="li-right v-flex input-box">
              <input type="text" v-model="departName" @click="showBox = true" />
              <div
                class="val-box"
                v-if="departList.length && departName && showBox"
              >
                <ul>
                  <li
                    v-for="(item, index) in departList"
                    :key="index"
                    @click="
                      (departName = item), (departList = []), (showBox = false)
                    "
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              职员类别
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FEmpGroupID"
            />
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              身高（厘米）*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Fstature"
              required
              oninvalid="setCustomValidity('请填写身高')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              体重（公斤）*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.Favoirdupois"
              required
              oninvalid="setCustomValidity('请填写体重')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li v-if="$route.query.type == 2 || $route.query.type == 3">
            <div class="li-left">
              预计工作年限*
            </div>
            <input
              type="text"
              placeholder="请填写"
              required
              oninvalid="setCustomValidity('请填写预计工作年限')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li>
            <div class="li-left">
              邮政编码
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FpostalCode"
            />
          </li>
          <li>
            <div class="li-left">
              介绍人姓名/工号（没有填无）*
            </div>
            <input
              type="text"
              placeholder="请填写"
              v-model="form.FIntroducer"
              required
              oninvalid="setCustomValidity('介绍人姓名/工号')"
              oninput="setCustomValidity('')"
            />
          </li>
          <li v-if="$route.query.type == 3">
            <div class="li-left">
              电子邮箱
            </div>
            <input type="text" placeholder="请填写" />
          </li>
          <!-- <li>
						<div class='content'>
							<textarea placeholder="请输入工作经历及业绩" v-model='form.FOtherPerformance'></textarea>
						</div>
					</li> -->
        </ul>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm')">确定</div>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible2" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm2')">确定</div>
        </div>
        <mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible3" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm3')">确定</div>
        </div>
        <mt-picker :slots="slots3" @change="onValuesChange3"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible4" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm4')">确定</div>
        </div>
        <mt-picker :slots="slots4" @change="onValuesChange4"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible5" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm5')">确定</div>
        </div>
        <mt-picker :slots="slots5" @change="onValuesChange5"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible6" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm6')">确定</div>
        </div>
        <mt-picker :slots="slots6" @change="onValuesChange6"></mt-picker>
      </mt-popup>
      <mt-popup v-model="popupVisible7" position="bottom" class="mtPopup">
        <div class="popupTitle">
          <div class="close" @click="popupBtn('cancel')">取消</div>
          <div class="close" @click="popupBtn('confirm7')">确定</div>
        </div>
        <mt-picker :slots="slots7" @change="onValuesChange7"></mt-picker>
      </mt-popup>
      <mt-datetime-picker
        class="mtPopup"
        ref="dateTimePopup11"
        v-model="birthdayDate"
        type="date"
        :start-date="start"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="popupBtn('confirm11')"
        @visible-change="visibleChange"
      >
      </mt-datetime-picker>
      <mt-datetime-picker
        class="mtPopup"
        ref="dateTimePopup12"
        v-model="FBeginHireDate"
        type="date"
        :start-date="start"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="popupBtn('confirm12')"
        @visible-change="visibleChange"
      >
      </mt-datetime-picker>
      <mt-datetime-picker
        class="mtPopup"
        ref="dateTimePopup13"
        v-model="FFutureWorkdate"
        type="date"
        :start-date="start"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="popupBtn('confirm13')"
        @visible-change="visibleChange"
      >
      </mt-datetime-picker>

      <!-- <mt-button type="default" class='mtbutton' @click.native='confirm()'>提交</mt-button> -->
      <input
        type="submit"
        class="mint-button mtbutton mint-button--default mint-button--normal"
      />
    </form>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { GetDepartment, Idcard, GetBasicInformation } from "@/api/getData";
import $ from "jquery";
const date = new Date();
const dateToday =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1 < 10
    ? "0" + (date.getMonth() + 1)
    : date.getMonth() + 1) +
  "-" +
  date.getDate();
const dateThree =
  date.getFullYear() +
  3 +
  "-" +
  (date.getMonth() + 1 < 10
    ? "0" + (date.getMonth() + 1)
    : date.getMonth() + 1) +
  "-" +
  date.getDate();
export default {
  data() {
    return {
      handler: function(e) {
        e.preventDefault();
      },
      showPopupPicker: false,
      birthday: false,
      popupVisible: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      popupVisible5: false,
      popupVisible6: false,
      popupVisible7: false,
      start: new Date("1900-01-01"),
      slots: [
        {
          flex: 1,
          values: ["男", "女"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ["已婚", "未婚"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots3: [
        {
          flex: 1,
          values: [
            "小学",
            "初中",
            "高中",
            "中专",
            "大专",
            "本科",
            "硕士",
            "研究生"
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots4: [
        {
          flex: 1,
          values: [
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
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots5: [
        {
          flex: 1,
          values: ["群众", "团员", "党员"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots6: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots7: [
        {
          flex: 1,
          values: [
            "金帝集团股份有限公司",
            "金隆分公司",
            "温州金易鞋材科技有限公司",
            "温州金臻实业股份有限公司",
            "金意分公司",
            "金帝集团(江西)鞋业有限公司",
            "河南金帝鞋业有限公司",
            "金帝中底车间",
            "金帝模具车间",
            "上海金帝时尚文化有限公司",
            "上海金帝时尚文化有限公司武汉分公司",
            "上海金帝时尚文化有限公司南通分公司",
            "上海金帝时尚文化有限公司昆山分公司",
            "GTH"
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
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
        FpoliticsFace: "",
        FEmpGroupID: "",
        Fcertificate: "身份证",
        FBeginHireDate: "",
        FofficialDate: "",
        FpostalCode: "",
        FIntroducer: "",
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
        FOtherPerformance: "" //,
        // Fsmoke:''
      },
      FFunctionID: "",
      Fnumber: "",
      FsexID: "",
      FmarriageID: "",
      FDegreeID: "",
      FenrolID: "", // 招聘来源
      FBeginHireDate: dateToday, // 预计务工时间
      birthdayDate: "2009-1-01", // 出生年月
      FFutureWorkdate: dateThree,
      FpoliticsFace: "",
      type: "",
      imgBroadcastListBase64: [],
      photo1: "",
      photo2: "",
      photo3: "",
      departList: [],
      departList2: [],
      departName: "",
      showBox: false
      // avatar:''
    };
  },
  components: {},
  computed: {
    main() {
      return this.getSession("main");
    }
  },
  mounted() {
    if (this.main) {
      this.form = this.main;
      this.photo1 = this.form.FIDCardFront
        ? "data:image/jpeg;base64," + this.form.FIDCardFront
        : "";
      this.photo2 = this.form.FIDCardBack
        ? "data:image/jpeg;base64," + this.form.FIDCardBack
        : "";
      this.photo3 = this.form.FUserAvatar
        ? "data:image/jpeg;base64," + this.form.FUserAvatar
        : "";
      this.departName = this.form.departName;
    }
    this.getBasicInformation("");
  },
  watch: {
    departName() {
      this.GetDepartment();
    },
    // value(val) {
    // 	this.currentValue = val;
    // },
    // rims() {
    // 	this.generateSlots();
    // },
    visible(val) {
      this.$emit("visible-change", val);
    }
  },
  methods: {
    // changeImage(e){
    // 	var file = e.target.files[0]
    // 	var reader = new FileReader()
    // 	var that = this
    // 	reader.readAsDataURL(file)
    // 	reader.onload = function(e) {
    // 		that.avatar = this.result
    // 	}
    // },
    closeTouch() {
      document
        .getElementsByTagName("body")[0]
        .addEventListener("touchmove", this.handler, { passive: false }); //阻止默认事件
    },
    openTouch() {
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("touchmove", this.handler, { passive: false }); //打开默认事件
    },
    visibleChange(val) {
      if (val) {
        this.closeTouch();
      } else {
        this.openTouch();
      }
    },
    async getBasicInformation(KeyWord) {
      let data = await GetBasicInformation({
        KeyWord: KeyWord,
        ClassID: 6
      });
      for (let item in JSON.parse(data)) {
        this.slots6[0].values.push(JSON.parse(data)[item].FName);
      }
    },
    async getCardInfo() {
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      let data = await Idcard({
        picture: this.photo1.replace("data:image/jpeg;base64,", ""),
        id_card_side: "front"
      });
      this.$store.commit("updateLoadingStatus", { isLoading: false });
      if (data.image_status != "normal") {
        Toast({ message: "证件识别失败", duration: 1500 });
        this.photo1 = "";
        return;
      } else {
        Toast({ message: "证件识别成功", duration: 1000 });
      }
      this.form.FIDCardFront = this.photo1.replace(
        "data:image/jpeg;base64,",
        ""
      );
      this.$set(
        this.form,
        "Fname",
        data.words_result.姓名.words || this.form.Fname
      );
      this.$set(
        this.form,
        "FNationID",
        data.words_result.民族.words || this.form.FNationID
      );
      this.$set(
        this.form,
        "FID",
        data.words_result.公民身份号码.words || this.form.FID
      );
      this.$set(
        this.form,
        "FsexID",
        data.words_result.性别.words || this.form.FsexID
      );
      this.$set(
        this.form,
        "Faddreess",
        data.words_result.住址.words || this.form.Faddreess
      );
      var pattern = /.+?(省|市|自治区|自治州|县|区)/;
      this.$set(
        this.form,
        "FNativePlaceID",
        data.words_result.住址.words.match(pattern)[0] ||
          this.form.FNativePlaceID
      );
      let birthday = data.words_result.出生.words
        ? data.words_result.出生.words
        : "";
      birthday =
        birthday.slice(0, 4) +
        "-" +
        birthday.slice(4, 6) +
        "-" +
        birthday.slice(6, 8);
      this.$set(this.form, "FBirthday", birthday);
    },
    async getCardInfo2() {
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      let data = await Idcard({
        picture: this.photo2.replace("data:image/jpeg;base64,", ""),
        id_card_side: "back"
      });
      this.$store.commit("updateLoadingStatus", { isLoading: false });

      if (data.image_status != "normal") {
        Toast({ message: "证件识别失败", duration: 1500 });
        this.photo2 = "";
        return;
      } else {
        Toast({ message: "证件识别成功", duration: 1000 });
      }
      this.form.FIDCardBack = this.photo2.replace(
        "data:image/jpeg;base64,",
        ""
      );

      this.form.FUserLifeBeginDate = this.dateFormat(
        data.words_result.签发日期.words
      )
        ? this.dateFormat(data.words_result.签发日期.words)
        : this.form.FUserLifeBeginDate;
      this.form.FUserLifeEndDate = this.dateFormat(
        data.words_result.失效日期.words
      )
        ? this.dateFormat(data.words_result.失效日期.words)
        : this.form.FUserLifeEndDate;
      this.form.FPoliceStation = data.words_result.签发机关.words
        ? data.words_result.签发机关.words
        : this.form.FPoliceStation;
    },
    addPic(val) {
      this.type = val;
      let fileinput = $("#file-input");
      fileinput.click();
      fileinput.change(() => {
        this.imgChange();
      });
      return false;
    },
    //清除文件域
    clearFile() {
      let fileinput = $("#file-input");
      fileinput.after(fileinput.clone().val(""));
      fileinput.remove();
      //console.log("清空文件域");
    },
    upload() {},
    async imgChange() {
      let fileinput = $("#file-input");
      let e = fileinput[0];
      if (!e.files.length) return;
      let array = Object.keys(e.files).map(key => e.files[key]); // 对象转数组
      // if (array.length > 5) {
      //   array = array.filter((item, index) => {
      //     if (index < 5) {
      //       return item
      //     }
      //   })
      // }
      let fileList = array.map(async item => {
        // console.info("ceshi"+item.size/1024/1024);
        // if(item.size/1024/1024>10){
        // 	Toast({message: '图片大于10M，请重新上传',duration: 1000});
        // 	this.clearFile();
        // }
        let res = await this.uploadImgToBase64(item);
        //console.info(res);
        this.clearFile();
        return res; //.result
      });
      //console.info(fileList);
      for (const textPromise of fileList) {
        //console.info(textPromise);
        if (this.type === "photo1") {
          this.photo1 = await textPromise;
          this.getCardInfo();
        } else if (this.type === "photo2") {
          this.photo2 = await textPromise;
          this.getCardInfo2();
        } else if (this.type === "photo3") {
          this.photo3 = await textPromise;
          this.form.FUserAvatar = this.photo3.replace(
            "data:image/jpeg;base64,",
            ""
          );
        }
      }
      //this.$refs.inputImg.value = null;
      // console.log(imgBroadcastListBase64)
    },
    // 提交保存至缓存
    confirm() {
      //console.info(1);
      if (parseInt(this.$route.query.type) != 1) {
        if (this.departList2.length == 0) {
          this.$toast("请输入应聘部门");
          return;
        }

        let depart = this.departList2.filter(item => {
          return item.FName === this.departName;
        });
        this.form.FDeptmentID = depart[0].FNumber;
        this.form.departName = depart[0].FName;
      }

      // this.form.FDutyID = []
      //console.log(this.form)
      // let data = this.form.filter((item) => {
      //   return item.status === true
      // })
      // if (data.length === 0) return this.$toast('请至少选择一项资料进行上传');
      // delete this.form.FstrongSuit
      // delete this.form.FFunctionID
      // // if(this.form.FmarriageID === ''){
      // // 	this.$toast('请填写婚姻状况')
      // // 	return;
      // // }
      //证件签发日期
      let _FUserLifeBeginDate = this.form.FUserLifeBeginDate;
      if (!_FUserLifeBeginDate)
        this.form.FUserLifeBeginDate =
          _FUserLifeBeginDate.slice(0, 4) +
          "-" +
          _FUserLifeBeginDate.slice(4, 6) +
          "-" +
          _FUserLifeBeginDate.slice(6, 8);

      //证件签发结束日期
      let _FUserLifeEndDate = this.form.FUserLifeEndDate;
      var oDate1 = new Date(_FUserLifeEndDate);
      var oDate2 = new Date(
        new Date().getFullYear() +
          "-" +
          parseInt(new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
      );
      if (oDate1.getTime() < oDate2.getTime()) {
        this.$toast("该身份证已经过期，请重新办理");
        return;
      }
      if (!_FUserLifeEndDate)
        this.form.FUserLifeEndDate =
          _FUserLifeEndDate.slice(0, 4) +
          "-" +
          _FUserLifeEndDate.slice(4, 6) +
          "-" +
          _FUserLifeEndDate.slice(6, 8);

      this.saveSession("main", this.form);
      this.$router.push({
        path: "/ctalog",
        query: { type: this.$route.query.type }
      });
      //this.$router.go(-1)
    },
    opendateTimePicker11() {
      this.$refs["dateTimePopup11"].open();
    },
    opendateTimePicker12() {
      this.$refs["dateTimePopup12"].open();
    },
    opendateTimePicker13() {
      this.$refs["dateTimePopup13"].open();
    },
    // 性别
    onValuesChange(picker, values) {
      this.FsexID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    // 婚姻状况
    onValuesChange2(picker, values) {
      this.FmarriageID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    // 文化程度
    onValuesChange3(picker, values) {
      this.FDegreeID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    // 招聘来源
    onValuesChange4(picker, values) {
      this.FenrolID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    onValuesChange5(picker, values) {
      this.FpoliticsFace = values[0];
      picker.setSlotValue(1, values[0]);
    },
    onValuesChange6(picker, values) {
      this.FNativePlaceID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    onValuesChange7(picker, values) {
      this.FOrganizeID = values[0];
      picker.setSlotValue(1, values[0]);
    },
    popupBtn(value) {
      this.popupVisible = false;
      this.popupVisible2 = false;
      this.popupVisible3 = false;
      this.popupVisible4 = false;
      this.popupVisible5 = false;
      this.popupVisible6 = false;
      this.popupVisible7 = false;
      // eslint-disable-next-line no-empty
      if (value === "cancel") {
      } else if (value === "confirm") {
        this.form.FsexID = this.FsexID;
      } else if (value === "confirm2") {
        this.form.FmarriageID = this.FmarriageID;
      } else if (value === "confirm3") {
        this.form.FDegreeID = this.FDegreeID;
      } else if (value === "confirm4") {
        this.form.FenrolID = this.FenrolID;
      } else if (value === "confirm5") {
        this.$set(this.form, "FpoliticsFace", this.FpoliticsFace);
      } else if (value === "confirm6") {
        this.$set(this.form, "FNativePlaceID", this.FNativePlaceID);
      } else if (value === "confirm7") {
        this.$set(this.form, "FOrganizeID", this.FOrganizeID);
      } else if (value === "confirm11") {
        let date = new Date(this.birthdayDate);
        let fullDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.form, "FBirthday", fullDate);
      } else if (value === "confirm12") {
        let date = new Date(this.FBeginHireDate);
        let fullDate1 =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        let fullDate2 =
          date.getFullYear() +
          3 +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.form, "FBeginHireDate", fullDate1);
        this.$set(this.form, "FFutureWorkdate", fullDate2);
      } else if (value === "confirm13") {
        let date = new Date(this.FFutureWorkdate);
        let fullDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        this.$set(this.form, "FFutureWorkdate", fullDate);
      }
    },
    async GetDepartment() {
      let data = await GetDepartment({ KeyWord: this.departName });
      this.departList2 = eval(data);
      this.departList = eval(data).map(item => {
        return item.FName;
      });
    },
    dateFormat: function(time) {
      var r = time.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
      return r;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.upload,
.upload1 {
  height: 0.8rem;
  padding: 0.2rem;
  border-bottom: 1px solid #f5f5f5;
  background: white;
}
.mtPopup {
  background: white;
  width: 100%;
  .popupTitle {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    color: #26a2ff;
    font-size: 17px;
    border-bottom: 1px solid #f5f5f5;
  }
}
.color1 {
  color: #aa0000;
}
.phontBox {
  .id-card {
    width: 2.8rem;
    height: 2rem;
    &:first-child {
      margin-right: 0.2rem;
    }
  }
  i {
    font-size: 120px;
  }
  width: 100%;
  padding: 0.2rem;
  background: white;
  position: relative;
  border-bottom: 1px solid #eee;
  .v-flex;
  img {
    max-height: 160px;
    max-width: 160px;
  }
}
.infoList {
  width: 100%;
  ul {
    li {
      border-bottom: 1px solid #eee;
      background: white;
      padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      input {
        text-align: right;
        border: none;
        text-align: right;
      }
      > input {
        width: 70%;
      }
      .liRight {
        // input{
        //   width: 100%;
        // }
      }
      .content {
        background: white;
        width: 100%;
        textarea {
          width: 100%;
          height: 3rem;
        }
      }
    }
  }
}
// .mtbutton{
//   .backBtnColor;
//   color: white;
//   width: 95%;
//   // margin-left: 2.5%;
//   // margin-top: .3rem;
// }
.input-box .val-box {
  -webkit-overflow-scrolling: touch;
  height: 3rem;
  background: white;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 8000;
  overflow: scroll;
  border: 1px solid #eee;
  margin-top: 100px;
}
</style>
