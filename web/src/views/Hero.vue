<template>
  <div class="page-heroes" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <a href="#" class="logo"></a>
      <div class="pl-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="fs-xxs ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
       return {
            model: null
       }
  },
  created() {
       this.fetch()
  },
  methods: {
       async fetch() {
            const {data } = await this.$http.get(`/heroes/${this.id}`)
            this.model  = data
       }
  }
};
</script>

<style lang="scss" scoped>
</style>