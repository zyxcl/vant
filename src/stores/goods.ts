import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGoodsListApi } from '@/api'
import type { GoodsItem } from '@/api'

export type Goods = GoodsItem & { count?: number }

export const useGoodsStore = defineStore('goods', () => {
  const goodsList = ref<Goods[]>([]) // 商品列表
  const cartList = ref<Goods[]>([]) // 购物车列表
  // 总价
  const total = computed(() => {
    return cartList.value.reduce((prev, val) => {
      return {
        count: prev.count + (val.checked ? val.count! : 0),
        price: prev.price + (val.checked ? val.count! * val.price * 100 : 0)
      }
    }, { count: 0, price: 0 })
  })
  const setGoodsList = async () => {
    const res = await getGoodsListApi()
    goodsList.value = res.data
  }
  const changeCount = (id: string, num: number) => {
    // 根据id去购物车中查找
    const index = cartList.value.findIndex(v => v.id === id)
    if (index > -1) {
      (cartList.value[index].count as number) += num
      // 数量为0删除商品
      if (cartList.value[index].count === 0) {
        cartList.value.splice(index, 1)
      }
    } else {
      const item = goodsList.value.find(v => v.id === id)!
      cartList.value.push({
        ...item,
        count: 1
      })
    }
  }
  const changeAll = (checked: boolean) => {
    cartList.value.forEach(item => {
      item.checked = checked
    })
  }

  return {
    cartList,
    goodsList,
    total,
    setGoodsList,
    changeCount,
    changeAll
  }
})