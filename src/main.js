import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "mint-ui/lib/style.css";
import Mint from "mint-ui";
import common from "./utils/common";
import { ToastPlugin } from "vux";
import EXIF from "exif-js";

Vue.config.productionTip = false;
Vue.use(common);
Vue.use(Mint);
Vue.use(ToastPlugin);
Vue.use(EXIF);
// 视图切换动画逻辑
const history = window.sessionStorage;
// history.clear()
history.removeItem("count");
history.removeItem("/");
let historyCount = history.getItem("count") * 1 || 0;
history.setItem("/", 0);

router.beforeEach((to, from, next) => {
  // 解决登录后，token没有更新
  // Vue.prototype.$http.defaults.headers.token = store.getters.getUserInfo

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // loading状态
  store.commit("updateLoadingStatus", { isLoading: true });

  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (
      !fromIndex ||
      parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
      (toIndex === "0" && fromIndex === "0")
    ) {
      store.commit("UPDATE_DIRECTION", { direction: "forward" });
    } else {
      store.commit("UPDATE_DIRECTION", { direction: "reverse" });
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount);
    to.path !== "/" && history.setItem(to.path, historyCount);
    store.commit("UPDATE_DIRECTION", { direction: "forward" });
  }

  next();
});

router.afterEach(function(to) {
  store.commit("updateLoadingStatus", { isLoading: false });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
