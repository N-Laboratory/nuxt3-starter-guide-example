<script lang="ts" setup>
import { useUserStore } from '../store/user'

const store = useUserStore()
const email = store.user.email
const password = store.user.password
</script>

<template>
  <div class="mypage">
    <div class="form">
      <h1>
        MyPage
      </h1>
      <div>
        <div class="field">
          Email: <span v-text="email" />
        </div>
        <div class="field">
          Password: <span v-text="password" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mypage {
  margin: auto;
  padding: 15% 0 0;
  width: 40%;
}
.form {
  background: #FFFFFF;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.3), 0 5px 5px 0 rgba(0, 0, 0, 0.25);
  padding: 40px;
  position: relative;
  text-align: center;
}
.field {
  font-size: 20px;
}
</style>
