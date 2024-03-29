<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useGoodsStore } from '@/stores/goods'
import { ref, computed } from 'vue'
import { showSuccessToast } from 'vant'

const route = useRoute()
const router = useRouter()

const goodsStore = useGoodsStore()

const current = computed(() => {
  return goodsStore.goodsList.find(v => v.id === route.query.id)
})
const add = () => {
  goodsStore.changeCount(route.query.id, 1)
  showSuccessToast('添加成功')
}
</script>

<template>
  <h1>详情</h1>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in current.images" :key="item">
      <van-image :src="item"></van-image>
    </van-swipe-item>
  </van-swipe>
  <h2>{{ current.name }}</h2>
  <p>¥{{ current.price }}</p>

  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" dot />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="goodsStore.total.count" @click="router.push('/cart')" />
    <van-action-bar-button type="warning" text="加入购物车" @click="add" />
  </van-action-bar>
</template>

<style lang='scss' scoped>

</style>
