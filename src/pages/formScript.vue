<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '../store/user'

const router = useRouter()
const store = useUserStore()

const { handleSubmit, errors, isSubmitting, meta } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required'
  }
})

const { value: password } = useField('password')
const { value: email } = useField('email')

const submit = handleSubmit(() => {
  store.setUserInfo(email.value as string, password.value as string)
  router.push('/myPage')
})
</script>

<template>
  <div class="login-page">
    <div class="form">
      <h1 data-testid="page-title">
        Login
      </h1>
      <div class="login-form">
        <div class="field">
          <input
            v-model="email"
            class="form-text"
            type="text"
            name="email"
            placeholder="email"
            data-testid="input-email"
          >
          <span v-if="errors.email" class="message invalid" data-testid="email-error-msg">{{ errors.email }}</span>
        </div>
        <div class="field">
          <input
            v-model="password"
            class="form-text"
            type="text"
            name="password"
            placeholder="password"
            data-testid="input-password"
          >
          <span v-if="errors.password" class="message invalid" data-testid="password-error-msg">{{ errors.password }}</span>
        </div>
        <div class="field">
          <!-- If the form submission function is being run, isSubmitting return true. -->
          <!-- When all field value is valid, meta.valid return true. -->
          <!-- show detail https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
          <button
            :disabled="isSubmitting || !meta.valid"
            :class="{ 'btn-disabled' : isSubmitting || !meta.valid}"
            class="form-submit"
            data-testid="submit-btn"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
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
.form input {
  background: #f2f2f2;
  border: 0;
  box-sizing: border-box;
  margin-top: 17px;
  padding: 15px;
  width: 100%;
}

.form .form-submit.btn-disabled {
  background: #858585;
  cursor: not-allowed;
}

.form .form-submit {
  background: #000000;
  border: 0;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 14px;
  margin-top: 17px;
  padding: 15px;
  width: 100%;
}

.form button:hover,.form button:active,.form button:focus {
  background: #2a2a2a;
}
.form .message {
  color: #ff0000;
  font-size: 14px;
}
</style>
