<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back text-blue-1"></div>
      <strong class="flex-1 text-blue-1 pl-2">{{ model.title }}</strong>
      <div class="text-grey fs-xxs">2019-09-06</div>
    </div>
    <div v-html="model.body" class="body px-2 pb-3 fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center pt-2">
        <i class="iconfont icon-menu1"></i>
        <span class="text-blue-1 fs-lg ml-1">相关资讯</span>
      </div>
      <div class="mt-3 fs-lg">
        <router-link
          class="pb-3"
          tag="div"
          :to="`/articles/${item._id}`"
          :key="item._id"
          v-for="item in model.related"
          >{{ item.title }}</router-link
        >
      </div>
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
      model: null,
    };
  },
  watch: {
    id: "fetch",
    
  },
  methods: {
    async fetch() {
      const { data } = await this.$http.get(`/articles/${this.id}`);
      this.model = data;
    },
  },

  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" >
.page-article {
  .icon-Back {
    font-size: 1.5385rem;
  }
  .body {
    width: 100%;
    line-height: 1.2rem;

    img,
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>