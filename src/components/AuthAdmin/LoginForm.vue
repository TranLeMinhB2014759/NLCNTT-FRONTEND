<template>
  <main class="d-flex w-100">
    <div class="video-background">
      <video autoplay muted loop>
        <source src="@/assets/video/background_login.mp4" type="video/mp4">
      </video>
    </div>
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
          <div class="d-table-cell align-middle main">

            <div class="text-center mt-4">
              <h1 class="h2">Welcome back!</h1>
              <p class="lead">
                Sign in to your account to continue
              </p>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="m-sm-3">
                  <Form @submit="submitLogin" :validation-schema="loginFormSchema">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <Field class="form-control form-control-lg" type="email" name="email"
                        placeholder="Enter your email" v-model="loginLocal.email" autocomplete="on" />
                      <ErrorMessage name="email" class="error-feedback" style="color: rgb(238, 15, 15);" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <div class="input-group">
                        <Field class="form-control form-control-lg" :type="passwordType" name="password"
                          placeholder="Enter your password" v-model="loginLocal.password" autocomplete="on" />
                        <button type="button" class="input-group-text" @click="togglePasswordVisibility">
                          <i :class="passwordIcon"></i>
                        </button>
                      </div>
                      <ErrorMessage name="password" class="error-feedback" style="color: rgb(238, 15, 15);" />
                    </div>
                    <!-- <div>
                                              <div class="form-check align-items-center">
                                                  <input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked>
                                                  <label class="form-check-label text-small" for="customControlInline">Remember me</label>
                                              </div>
                                          </div> -->
                    <div class="d-grid gap-2 mt-3">
                      <button class="btn btn-lg btn-primary" type="submit">Sign in</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div class="text-center mb-3">
              <!-- <router-link :to="{ name: 'signup' }"> -->
              Don't have an account? <a href="#">Sign up</a>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
    });

    return {
      loginLocal: {
        email: "",
        password: "",
      },
      loginFormSchema,
      passwordType: "password",
      passwordIcon: "fa fa-eye"
    };

  },

  methods: {
    togglePasswordVisibility() {
      this.passwordType = this.passwordType === "password" ? "text" : "password";
      this.passwordIcon = this.passwordIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
    },
    submitLogin() {
      this.$emit("submit:login", this.loginLocal);
    },
  },

};
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden !important;
}

.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
}

.video-background video {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.main {
  position: relative;
  left: 70% !important;
  z-index: 1;
}

@media (max-width: 1280px) {
  .main {
    position: static;
  }

  .video-background {
    display: none;
  }
}
</style>