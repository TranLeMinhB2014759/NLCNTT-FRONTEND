<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Thêm Bác Sĩ Mới</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-doctor' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitDoctor" :validation-schema="doctorFormSchema">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="name">Họ và tên:</label>
                <Field name="name" type="text" class="form-control" v-model="doctorLocal.name" required placeholder="Nhập vào tên bác sĩ"/>
                <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="hocVi">Học vị:</label>
                <Field as="select" name="hocVi" class="form-control" v-model="doctorLocal.hocVi" required>
                  <option value="Bác sĩ nội trú">Bác sĩ nội trú</option>
                  <option value="Bác sĩ">Bác sĩ</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                  <option value="Bác sĩ chuyên khoa I">Bác sĩ chuyên khoa I</option>
                  <option value="Bác sĩ chuyên khoa II">Bác sĩ chuyên khoa II</option>
                  <option value="Bác sĩ cao cấp">Bác sĩ cao cấp</option>
                </Field>
                <ErrorMessage name="hocVi" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="thamNien">Thâm niên:</label>
                <Field as="select" name="thamNien" class="form-control" v-model="doctorLocal.thamNien" required>
                  <option value="Dưới 5 năm">Dưới 5 năm</option>
                  <option value="5 năm">5 năm</option>
                  <option value="10 năm">10 năm</option>
                  <option value="20 năm">20 năm</option>
                  <option value="30 năm">30 năm</option>
                  <option value="40 năm">40 năm</option>
                  <option value="Trên 50 năm">Trên 50 năm</option>
                </Field>
                <ErrorMessage name="thamNien" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3 mt-3">
                <label for="chuyenMon">Chuyên môn:</label>
                <Field name="chuyenMon" type="text" class="form-control" v-model="doctorLocal.chuyenMon" required placeholder="Hãy nhập vào chuyên môn"/>
                <ErrorMessage name="chuyenMon" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3">
              <img class="rounded-circle" v-if="doctorLocal.imgURL" :src="doctorLocal.imgURL" alt="Doctor Image"
                width="200" height="200" />
            </div>
            <div class="col-12 col-md-9">
              <div class="mb-3 mt-3">
                <label for="imgURL">Ảnh:</label>
                <Field name="imgURL" type="text" class="form-control" v-model="doctorLocal.imgURL" required placeholder="https://example.jpg"/>
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
  emits: ["submit:doctor"],
  data() {
    const doctorFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên không được để trống.")
        .min(2, "Tên phải có ít nhất 10 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      hocVi: yup
        .string()
        .required("Hãy chọn học vị của bác sĩ."),
      chuyenMon: yup
        .string()
        .required("Chuyên môn không được để trống."),
      thamNien: yup
        .string()
        .required("Hãy chọn số năm kinh nghiệm."),
      imgURL: yup
        .string()
        .required("Vui lòng chọn một ảnh.")
        .matches(/(\.jpg|\.png|\.webp)$/, "Định dạng ảnh phải là jpg, png hoặc webp."),
    });
    return {
      doctorLocal: {
        name: "",
        hocVi: "",
        chuyenMon: "",
        thamNien: "",
        imgURL: "",
      },
      doctorFormSchema,

    };
  },
  methods: {
    submitDoctor() {
      this.$emit("submit:doctor", this.doctorLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>