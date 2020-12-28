<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <a href="#" class="logo"></a>
      <div class="pl-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="nav bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <router-link tag="div" to="/" class="nav-link"
            >首页</router-link
          >
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link"
            >攻略中心</router-link
          >
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link"
            >赛事中心</router-link
          >
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.logo {
  background-image: url("../assets/images/index.png");
  width: 2.3077rem;
  height: 2.3077rem;
  background-position: 0 -21rem;
  background-size: 25.6154rem;
}
</style>