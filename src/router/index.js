import Vue from "vue";
import Router from "vue-router";
// import { routerMode } from '../config/env'

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/agreement"
    },
    {
      path: "/agreement",
      name: "agreement",
      meta: {
        title: "入职履历填写"
      },
      component: resovle => {
        require(["../views/agreement.vue"], resovle);
      }
    },
    {
      path: "/Post",
      name: "Post",
      meta: {
        title: "入职履历填写"
      },
      component: resovle => {
        require(["../views/post.vue"], resovle);
      }
    },
    {
      path: "/ctalog",
      name: "ctalog",
      meta: {
        title: "内容填写"
      },
      component: resovle => {
        require(["../views/ctalog.vue"], resovle);
      }
    },
    {
      path: "/infomation",
      name: "infomation",
      meta: {
        title: "基本信息"
      },
      component: resovle => {
        require(["../views/resume/infomation.vue"], resovle);
      }
    },
    {
      path: "/members",
      name: "members",
      meta: {
        title: "家庭主要成员"
      },
      component: resovle => {
        require(["../views/resume/members.vue"], resovle);
      }
    },
    {
      path: "/train",
      name: "train",
      meta: {
        title: "学习及培训经历"
      },
      component: resovle => {
        require(["../views/resume/train.vue"], resovle);
      }
    },
    {
      path: "/train2",
      name: "train2",
      meta: {
        title: "技能培训经历"
      },
      component: resovle => {
        require(["../views/resume/train2.vue"], resovle);
      }
    },
    {
      path: "/work",
      name: "work",
      meta: {
        title: "主要工作经历"
      },
      component: resovle => {
        require(["../views/resume/work.vue"], resovle);
      }
    },
    {
      path: "/work2",
      name: "work2",
      meta: {
        title: "其他工作经历及业绩"
      },
      component: resovle => {
        require(["../views/resume/work2.vue"], resovle);
      }
    },
    {
      path: "/other",
      name: "other",
      meta: {
        title: "其他信息"
      },
      component: resovle => {
        require(["../views/resume/other.vue"], resovle);
      }
    },
    {
      path: "/status",
      name: "status",
      meta: {
        title: "入职状态"
      },
      component: resovle => {
        require(["../views/status.vue"], resovle);
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
