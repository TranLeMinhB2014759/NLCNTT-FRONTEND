<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Chỉnh Sửa Thông Tin</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-patient' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitPatient" :validation-schema="patientFormSchema">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="name">Họ và tên</label>
                <Field name="name" type="text" class="form-control" v-model="patientLocal.name" required placeholder="Trần Văn A"/>
                <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="gender">Giới tính:</label>
                <Field as="select" name="gender" class="form-control" v-model="patientLocal.gender" required>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Field>
                <ErrorMessage name="gender" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="year">Năm sinh:</label>
                <Field name="year" type="number" class="form-control" v-model="patientLocal.year" required placeholder="Không quá năm hiện tại"/>
                <ErrorMessage name="year" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-12 col-md-5">
              <div class="mb-3 mt-3">
                <label for="phoneNumber">Số điện thoại:</label>
                <Field name="phoneNumber" type="text" class="form-control" v-model="patientLocal.phoneNumber"
                  required placeholder="0123456789 (10 chữ số)"/>
                <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-7">
              <div class="mb-3 mt-3">
                <label for="address">Địa chỉ:</label>
                <Field name="address" type="text" class="form-control" v-model="patientLocal.address" required placeholder="Khu II Đại học Cần Thơ"/>
                <ErrorMessage name="address" class="error-feedback" style="color: rgb(238, 15, 15);" />
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:patient"],
  props: {
    patient: { type: Object, required: true },
  },
  data() {
    const patientFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên không được để trống.")
        .min(10, "Tên phải có ít nhất 10 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      year: yup
        .string()
        .required("Hãy nhập vào năm sinh")
        .test("valid-year", "Năm sinh không hợp lệ", (value) => {
          return value > 1800 && value < new Date().getFullYear();
        }),
      gender: yup
        .string()
        .required("Hãy chọn giới tính"),
      phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống.")
        .matches(
          /((09|03|07|08|05|01)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      address: yup
        .string()
        .required("Địa chỉ không được để trống."),
    });
    const patientCopy = JSON.parse(JSON.stringify(this.patient));
    return {
      patientLocal: patientCopy,
      patientFormSchema,
    };
  },
  methods: {
    submitPatient() {
      this.$emit("submit:patient", this.patientLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>