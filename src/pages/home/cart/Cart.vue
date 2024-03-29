<script setup lang="ts">
import { useGoodsStore } from '@/stores/goods'
import { useAddressStore } from '@/stores/address'
import { ref, watch } from 'vue'
import { showConfirmDialog, showNotify } from 'vant'
import { useRouter } from 'vue-router'

const addressStore = useAddressStore()
const goodsStore = useGoodsStore()
const checkeAll = ref(false)
const router = useRouter()

// 监听购物车改变，修改全选状态
watch(() => goodsStore.cartList, () => {
  if (goodsStore.cartList.length > 0) {
    checkeAll.value = goodsStore.cartList.every(v => v.checked)
  }
}, { deep: true, immediate: true })
// 点击全选
const changeAll = () => {
  goodsStore.changeAll(checkeAll.value)
}

const onSubmit = () => {
  console.log('提交')
}

const sub = async (id: string, count: number) => {
  // 数量大于1直接 -1
  if (count - 1 > 0) {
    goodsStore.changeCount(id, -1)
  } else {
    try {
      // 数量等于1时先提示是否删除
      await showConfirmDialog({
        title: '提示',
        message: '确定要删除此商品吗？',
      })
      // 点击确定
      goodsStore.changeCount(id, -1)
      showNotify({ type: 'success', message: '删除成功!' })
    } catch(e) {}
  }
}

</script>

<template>
  <van-contact-card
    :type="addressStore.currentInfo ? 'edit' : 'add'"
    :tel="addressStore.currentInfo?.tel"
    :name="addressStore.currentInfo?.name"
    @click="router.push('/address')"
  />
  <van-empty v-if="goodsStore.cartList.length === 0" description="购物车空空如也" />
  <template v-else>
    <div class="cartlist">
      <van-cell
        v-for="item in goodsStore.cartList"
        :key="item.id"
        :icon="item.checked ? 'checked' : 'circle'"
        center
        @click="item.checked = !item.checked"
      >
        <template #title>
          <h4>{{ item.name }}</h4>
          <p>¥{{ item.price }}</p>
        </template>
        <template #value>
          <div class="btns">
            <van-button class="btn" size="mini" type="primary" @click.stop="sub(item.id, item.count!)">-</van-button>
            <span>{{ item.count }}</span>
            <van-button class="btn" size="mini" type="primary" @click.stop="goodsStore.changeCount(item.id, 1)">+</van-button>
          </div>
        </template>
      </van-cell>
    </div>
    <van-submit-bar class="submit-bar" :price="goodsStore.total.price" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkeAll" @click="changeAll">全选</van-checkbox>
    </van-submit-bar>
  </template>
</template>

<style lang='scss' scoped>
.cartlist {
  padding-bottom: var(--van-submit-bar-height);
}
.submit-bar {
  bottom: var(--van-tabbar-height);
}
.btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    width: 40px;
    text-align: center;
  }
  .btn {
    width: 20px;
  }
}
</style>
