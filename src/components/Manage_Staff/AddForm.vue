<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Thêm Tài Khoản Mới</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-staff' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitStaff" :validation-schema="staffFormSchema" enctype="multipart/form-data">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="name">Tên tài khoản:</label>
                <Field name="name" type="text" class="form-control" v-model="staffLocal.name" required
                  placeholder="Nhập vào tên nhân viên" />
                <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="role">Vai trò:</label>
                <Field as="select" name="role" class="form-control" v-model="staffLocal.role" required>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="cashier">Cashier</option>
                  <option value="receptionist">Receptionist</option>
                </Field>
                <ErrorMessage name="role" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="email">Email:</label>
                <Field name="email" type="email" class="form-control" v-model="staffLocal.email" required
                  placeholder="example@gmail.com" />
                <ErrorMessage name="email" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="password">Mật khẩu:</label>
                <div class="input-group">
                  <Field name="password" :type="passwordType" class="form-control" v-model="staffLocal.password"
                    required placeholder="Nhập vào mật khẩu" />
                  <button type="button" class="input-group-text" @click="togglePasswordVisibility">
                    <i :class="passwordIcon"></i>
                  </button>
                </div>
                <ErrorMessage name="password" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="phoneNumber">Số điện thoại:</label>
                <Field name="phoneNumber" type="text" class="form-control" v-model="staffLocal.phoneNumber" required
                  placeholder="0123456789 (10 chữ số)" />
                <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="address">Địa chỉ:</label>
                <Field name="address" type="text" class="form-control" v-model="staffLocal.address" required
                  placeholder="Khu II Đại học Cần Thơ" />
                <ErrorMessage name="address" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-5 col-lg-4 d-flex justify-content-center">
              <img class="rounded-circle" v-if="renderPhoto" :src="renderPhoto" alt="Staff Image" width="200"
                height="200" />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
              <div class="mb-3 mt-3">
                <label for="imgURL">Ảnh:</label>
                <Field name="imgURL" type="file" class="form-control" v-model="staffLocal.imgURL" required
                  accept='image/png, image/jpeg, image/webp, image/jpg' @change="onFileChange" />
                <ErrorMessage name="imgURL" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="mb-3 mt-3 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary button-submit">
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" class="icon">
                    <path
                      d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z">
                    </path>
                  </svg>
                </div>
              </div>
              <span>Save</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:staff"],
  data() {
    const staffFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên không được để trống.")
        .min(2, "Tên phải có ít nhất 10 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .required("Email không được để trống.")
        .email("E-mail không đúng."),
      address: yup
        .string()
        .required("Địa chỉ không được để trống."),
      phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống.")
        .matches(
          /((09|03|07|08|05|01)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(5, "Mật khẩu phải ít nhất 5 ký tự."),
      role: yup
        .string()
        .required("Hãy phân quyền cho tài khoản."),

      imgURL: yup
        .mixed()
        .required("Vui lòng chọn một ảnh.")
      // .matches(/\.(jpg|jpeg|png|webp)$/i, "Định dạng ảnh phải là jpg, jpeg, png hoặc webp.")

    });
    return {
      renderPhoto: "",
      passwordType: "password",
      passwordIcon: "fa fa-eye",
      staffLocal: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        role: "",
        imgURL: null,
      },
      staffFormSchema,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordType = this.passwordType === "password" ? "text" : "password";
      this.passwordIcon = this.passwordIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.staffLocal.imgURL = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.renderPhoto = reader.result;
      };
    },
    submitStaff() {
      this.$emit("submit:staff", this.staffLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>