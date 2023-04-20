<!-- 登录页面 -->
<template>
  <div id="login">
    <aside class="loginInput">
      <div class="text">
        <i>
          <p>welcome!</p>
          <p>通用事务督办系统</p>
        </i>
      </div>
      <div class="input">
        <!-- <a-form :form="form" @submit="handleSubmit" class="input-form">
          <a-form-item
            :validate-status="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
          >
            <a-input
              size="large"
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入您的用户名!' }],
                },
              ]"
              placeholder="用户名"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            :validate-status="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
          >
            <a-input
              size="large"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入您的密码!' }],
                },
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            :validate-status="validateCodeError() ? 'error' : ''"
            :help="validateCodeError() || ''"
          >
            <a-input
              style="width: 50%"
              size="large"
              :max-length="4"
              v-decorator="[
                'validateCode',
                {
                  rules: [{ required: true, message: '请输入验证码!' }],
                },
              ]"
              type="text"
              placeholder="验证码"
            >
            </a-input>
            <ValidateCode ref="validateCode" @change="changeCode" />
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              :disabled="hasErrors(form.getFieldsError())"
              block
            >
              立即登录
            </a-button>
          </a-form-item>
        </a-form> -->
      </div>
    </aside>
  </div>
</template>

<script>
// 引入API接口
import {login} from "@/api"

import ValidateCode from "@/components/ValidateCode";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  name: "login",
  components: {
    ValidateCode,
  },
  data() {
    return {
      hasErrors,
      // 验证码
      checkCode: "",
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    validateCodeError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("validateCode") && getFieldError("validateCode");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // 首先验证验证码是否正确
          const compareResult = this.checkCode.localeCompare(values.validateCode);
          if (!compareResult) return console.log("验证码错误");
          // 发送请求
          // console.log("发送请求")
          login(values)
        }
      });
    },
    // 修改验证码
    changeCode(value) {
      this.checkCode = value;
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("https://images.pexels.com/photos/2093252/pexels-photo-2093252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  ")
    no-repeat;
  background-size: 100%;

  .loginInput {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 500px;
    box-shadow: 3px 3px 8px black;
    transform: translate(-50%, -50%);

    .text {
      width: 50%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      background-color: rgba(255, 255, 255, 0.3);
      text-align: center;
      font-size: 3rem;
    }

    .input {
      width: 50%;
      box-sizing: border-box;
      padding: 100px 20px;
      background-color: rgba(255, 255, 255, 0.97);
      img {
        width: 50%;
        height: 100%;
        background: pink;
      }
    }
  }
}
</style>
