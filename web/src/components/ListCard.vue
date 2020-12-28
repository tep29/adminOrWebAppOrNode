<template>
  <s-card :title="title" :icon="icon">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        @click="$refs.list.$swiper.slideTo(i)"
        v-for="(category, i) in categories"
        :key="i"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>

    <swiper
      class="mt-3"
      ref="list"
      :options="{autoHeight: true}"
      @slide-change="() => (active = $refs.list.$swiper.activeIndex)"
    >
      <swiper-slide v-for="(category, i) in categories" :key="i">
        <slot name="items" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </s-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>