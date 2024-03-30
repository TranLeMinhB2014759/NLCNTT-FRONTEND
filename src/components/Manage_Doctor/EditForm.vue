<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Chỉnh Sửa Thông Tin</h1>
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
              <span>Update</span>
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
  emits: ["submit:doctor"],
  props: {
    doctor: { type: Object, required: true },
  },
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
    const doctorCopy = JSON.parse(JSON.stringify(this.doctor));
    return {
      doctorLocal: doctorCopy,
      doctorFormSchema,
    };
  },
  methods: {
    submitDoctor() {
      this.$emit("submit:doctor", this.doctorLocal);
      // Handle form submission here
    },
  },
};
</script>

<style scoped>
/* Improved styling */
h1 {
  font-size: 24px;
  color: #333;
}

img {
  border: 1px solid;
}

/* ------------------- Button ----------------------- */
.button-submit {
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

.button-submit span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.button-submit svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.button-submit:hover {
  background: #000;
}

.button-submit:hover .svg-wrapper {
  transform: scale(1.25);
  transition: 0.5s linear;
}

.button-submit:hover svg {
  transform: translateX(1.6em) scale(1.1);
  fill: #fff;
}

.button-submit:hover span {
  opacity: 0;
  transition: 0.5s linear;
}

.button-submit:active {
  transform: scale(0.95);
}

/* ------------------- Button Close----------------------- */
.button-close {
  position: relative;
  width: 2.8em;
  height: 2.8em;
  border: none;
  background: red;
  border-radius: 50%;
  transition: background 0.5s;
}

.X {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2em;
  height: 1.5px;
  background-color: rgb(255, 255, 255);
  transform: translateX(-50%) rotate(45deg);
}

.Y {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2em;
  height: 1.5px;
  background-color: #fff;
  transform: translateX(-50%) rotate(-45deg);
}

.button-close:hover {
  background-color: gray;
}

.button-close:active {
  background-color: gray;
}
</style>