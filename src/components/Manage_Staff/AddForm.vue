<template>
  <div class="container" style="padding: 20px 70px;">
    <h1 class="d-flex justify-content-center">Thêm Tài Khoản</h1>
    <Form @submit="submitStaff" :validation-schema="staffFormSchema">
      <div class="row">
        <div class="col">
          <div class="mb-3 mt-3">
            <label for="name">Tên tài khoản:</label>
            <Field name="name" type="text" class="form-control" v-model="staffLocal.name" required />
            <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
        </div>
        <div class="col">
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
        <div class="col">
          <div class="mb-3 mt-3">
            <label for="email">Email:</label>
            <Field name="email" type="email" class="form-control" v-model="staffLocal.email" required />
            <ErrorMessage name="email" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3 mt-3">
            <label for="password">Mật khẩu:</label>
            <Field name="password" type="password" class="form-control" v-model="staffLocal.password" required />
            <ErrorMessage name="password" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3 mt-3">
            <label for="phoneNumber">Số điện thoại:</label>
            <Field name="phoneNumber" type="text" class="form-control" v-model="staffLocal.phoneNumber" required />
            <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3 mt-3">
            <label for="address">Địa chỉ:</label>
            <Field name="address" type="text" class="form-control" v-model="staffLocal.address" required />
            <ErrorMessage name="address" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
        </div>
      </div>
      <div class="mb-3 mt-3">
        <label for="imgURL">Ảnh:</label>
        <Field name="imgURL" type="text" class="form-control" v-model="staffLocal.imgURL" required />
        <ErrorMessage name="imgURL" class="error-feedback" style="color: rgb(238, 15, 15);" />
      </div>

      <div class="mb-3 mt-3">
        <button type="submit" class="btn btn-primary">
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

    <router-link :to="{ name: 'admin-staff' }">
      <button class="exit-button">Thoát</button>
    </router-link>
  </div>
</template>
  
<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
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
        .required("Số điện thoại không được để trống."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(5, "Mật khẩu phải ít nhất 5 ký tự.")
        .max(10, "Mật khẩu có nhiều nhất 10 ký tự."),

      role: yup
        .string()
        .required("Hãy phân quyền cho tài khoản."),

      imgURL: yup.string().required("Vui lòng chọn một ảnh."),
    });
    return {
      staffLocal: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        role: "",
        imgURL: "",
      },
      staffFormSchema,

    };
  },
  methods: {
    submitStaff() {
      this.$emit("submit:staff", this.staffLocal);
      // Handle form submission here
    },
  },
};
</script>
  
<style scoped>
h1 {
  font-size: 24px;
  color: #333;
}

.exit-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 20px;
  cursor: pointer;
  float: right;
  position: relative;
  top: -70px;
}

/* ------------------- Button ----------------------- */
button {
  font-family: inherit;
  font-size: 20px;
  background: #212121;
  color: white;
  fill: rgb(155, 153, 153);
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  font-weight: 1000;
}

button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover {
  background: #000;
}

button:hover .svg-wrapper {
  transform: scale(1.25);
  transition: 0.5s linear;
}

button:hover svg {
  transform: translateX(1.2em) scale(1.1);
  fill: #fff;
}

button:hover span {
  opacity: 0;
  transition: 0.5s linear;
}

button:active {
  transform: scale(0.95);
}

</style>
  