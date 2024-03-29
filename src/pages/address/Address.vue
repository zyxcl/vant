<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/address'
import type { AddressItem } from '@/stores/address'

const router = useRouter()
// 引入address store
const addressStore = useAddressStore()

const onAdd = () => {
  router.push('/createAddress')
}
const onEdit = (item: AddressItem, index: number) => {
  router.push({
    path: '/createAddress',
    query: {
      id: item.id
    }
  })
}
const onSelect = () => {
  router.back()
}
</script>

<template>
  <div class="address">
    <van-empty v-if="addressStore.addressList.length === 0" class="empty" description="当前还没有地址，快去新增地址吧" />
    <van-address-list
      v-model="addressStore.chosenAddressId"
      :list="addressStore.addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<style lang='scss' scoped>
.address {
  height: 100%;
  background: #f7f8fa;
}
.empty {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
