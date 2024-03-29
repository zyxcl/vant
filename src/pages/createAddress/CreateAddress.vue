<script setup lang="ts">
import { areaList } from '@vant/area-data'
import { useAddressStore } from '@/stores/address'
import type { AddressItem } from '@/stores/address'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { showNotify, showConfirmDialog } from 'vant'

const addressStore = useAddressStore()
const router = useRouter()
const route = useRoute()
// 根据query的id查找数据，有数据表示是编辑页面，反显到页面
const addressInfo = ref(addressStore.addressList.find(v => v.id === route.query.id))

// url有id但是stroe中查找不到对应的数据，表示id错误，自动跳转到首页
if (route.query.id && !addressInfo.value) {
  showNotify({ type: 'warning', message: '参数错误！' });
  router.replace('/')
}

const onSave = (info: AddressItem) => {
  if (addressInfo.value) {
    showNotify({ type: 'success', message: '修改成功！' })
    addressStore.update(info)
  } else {
    // 新增地址
    addressStore.push(info)
    showNotify({ type: 'success', message: '新增成功！' });
  }
  // 返回到上一页
  router.back()
}
const onDelete = async () => {
  try {
    await showConfirmDialog({
      title: '警告',
      message:
        '确定要删除此地址吗？',
    })
    addressStore.del(addressInfo.value!.id)
    showNotify({
      type: 'success',
      message: '删除成功'
    })
    router.back()
  } catch(e) {
    showNotify({
      type: 'warning',
      message: '取消删除'
    })
  }
}
const onChangeDetail = () => {
  console.log('输入详情地址')
}
</script>

<template>
  <div class="address">
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :show-delete="!!addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<style lang='scss' scoped>
.address {
  height: 100%;
  background: #f7f8fa;
}
</style>
