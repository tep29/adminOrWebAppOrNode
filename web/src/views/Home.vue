
<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/afdc514c9b4d22785c9d7e0016a4e80d.1559125999.b3259d2575226266179450a16d8beaf7.230x140_69065.jpg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/afdc514c9b4d22785c9d7e0016a4e80d.1559125999.b3259d2575226266179450a16d8beaf7.230x140_69065.jpg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/afdc514c9b4d22785c9d7e0016a4e80d.1559125999.b3259d2575226266179450a16d8beaf7.230x140_69065.jpg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right pr-2 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i :class="['sprite', 'sprite-item-' + n]"></i>
          <div class="fs-sm py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 sf-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <s-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-3">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </s-list-card>
    <s-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
             tag="div" :to="`/heroes/${hero._id}`"
          >
            <img :src="hero.avatar" alt="" class="w-100" />
            <span>{{ hero.name }}</span>
          </router-link>
        </div>
      </template>
    </s-list-card>
    <s-card title="精彩视频" icon="menu1"></s-card>
    <s-card title="图文攻略" icon="menu1"></s-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import SwiperCore, { Pagination } from "swiper";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Pagination]);
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".pagination-home",
          type: "bullets",
        },
      },
      newsCats: [],
      heroCats: [],
    };
  },
  created() {
    this.fetchNewsCats();
    this.fechHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      const { data } = await this.$http.get("/news/list");

      this.newsCats = data;
    },
    async fechHeroCats() {
      const { data } = await this.$http.get("/heroes/list");
      this.heroCats = data;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variabies.scss";
.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    border-radius: 2px;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "blue");
    }
  }
}
.nav-icons {
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>