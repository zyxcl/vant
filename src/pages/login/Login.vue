<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')

const onSubmit = (values) => {
  const token = values.username + values.password
  localStorage.setItem('token', token)
  showSuccessToast('登录成功')
  const path = decodeURIComponent(route.query.redirect || '/')
  router.push(path)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style lang='scss' scoped>

</style>
