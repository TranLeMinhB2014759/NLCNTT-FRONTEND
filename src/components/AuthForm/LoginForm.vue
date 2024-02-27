<style>
@import "@/assets/css/formLogin.css";
</style>
<template>
  <div class="limiter">
    <div class="container-login">
      <div class="wrap-login slide">
        <div class="login-pic" data-tilt>
          <img src="@/assets/images/img-login.jpg" alt="IMG">
        </div>

        <Form  class="login-form validate-form"  @submit="submitLogin" :validation-schema="loginFormSchema">
          <strong class="login-form-title">
            Member Login
          </strong>

          <div class="wrap-input">
            <Field type="email" id="email" class="input" name="email" placeholder="Enter your email" v-model="loginLocal.email" />
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="fa-solid fa-user" aria-hidden="true"></i>
            </span>
          </div>
          <div class="error-message">
            <ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="wrap-input">
            <Field :type="showPassword ? 'text' : 'password'" id="password" class="input" name="password"  placeholder="Enter your password" v-model="loginLocal.password" />
            <i class="far fa-eye" @click="showPassword = !showPassword"
                                    style="cursor: pointer; position: absolute; right: 130px; top: 270px ">
                                </i>
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>
          <div class="error-message">
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="container-login-form-btn">
            <button class="login-form-btn" type="submit">
              Login
            </button>
          </div>

          <div class="text-center login-signup">
            <a class="txt" @click="goToAddUsers()">
              <router-link :to="{ name: 'signup' }">
                Create your Account
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </router-link>
            </a>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { ErrorMessage, Field, Form } from "vee-validate";

import * as yup from "yup";

export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },


    emits: ["submit:login"],


    data() {
        const loginFormSchema = yup.object().shape({

            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),

            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(5, "Mật khẩu phải ít nhất 5 ký tự.")
                .max(10, "Mật khẩu có nhiều nhất 10 ký tự."),
        });

        return {
            loginLocal: {
                email: "",
                password: "",
            },
            loginFormSchema,
            showPassword: false,
        };

    },

    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginLocal);
        },
        goToAddUsers() {
            this.$router.push({ name: 'signup' });
        },
    },

};
</script>