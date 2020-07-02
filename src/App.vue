<template>
  <div id="app" class="wrap">
    <loading v-model="isLoading"></loading>
    <transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { Loading } from "vux";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isLoading: state => state.common.isLoading,
      direction: state => state.common.direction
    })
  },
  mounted() {
    console.log(this.$route);
  },
  components: {
    Loading
  }
};
</script>

<style lang="less">
@import "~@/assets/less/main.less";
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
