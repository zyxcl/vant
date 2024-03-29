<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showNotify } from 'vant'
import { useGoodsStore } from '@/stores/goods'
// 引入变量
import { getBanner, getGoodsListApi } from '@/api'
// 引入类型
import type { BannerItem, GoodsItem } from '@/api'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const router = useRouter()
const goodsStore = useGoodsStore()
const modules = [Navigation, Pagination, Autoplay]
const banners = ref<BannerItem[]>([])

const init = async () => {
  // 同时发送多个请求
  // const [bannerRes, goodsRes] = await Promise.all([getBanner(), getGoodsListApi()])
  goodsStore.setGoodsList()
  const [bannerRes] = await Promise.all([getBanner()])
  banners.value = bannerRes.data.banners
}
init()

const add = (id: string) => {
  // 调用store中的方法修改商品数量
  goodsStore.changeCount(id, 1)
  showNotify({ type: 'success', message: '添加成功！' })
}

const goDetail = (id: string) => {
  router.push({
    path: '/detail',
    query: { id }
  })
}
</script>

<template>
  <swiper
    :modules="modules"
    autoplay
    loop
    navigation
    :pagination="{ clickable: true }"
  >
    <swiper-slide class="slide" v-for="item in banners" :key="item.targetId">
      <img :src="item.imageUrl" alt="">
    </swiper-slide>
  </swiper>
  <van-grid :column-num="3" :center="false">
    <van-grid-item
      v-for="item in goodsStore.goodsList"
      :key="item.id"
      @click="goDetail(item.id)"
      class="goods-item"
    >
      <van-image :src="item.imgUrl"/>
      <h3>{{ item.name }}</h3>
      <div class="btm">
        <b>¥{{ item.price }}</b>
        <van-button size="mini" @click.stop="add(item.id)">+</van-button>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<style lang='scss' scoped>
.slide img {
  width: 100%;
}
.goods-item {
  // 覆盖vant组件内的css变量
  --van-grid-item-content-padding: 0px;
  h3 {
    padding: 0 10px;
  }
}
.btm {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
