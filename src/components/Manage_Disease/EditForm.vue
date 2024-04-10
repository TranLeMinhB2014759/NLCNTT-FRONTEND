<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Chỉnh Sửa</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-disease' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitDisease" :validation-schema="diseaseFormSchema">
          <div class="mb-3 mt-3">
            <label for="code">Mã bệnh theo ICD 10:</label>
            <Field name="code" type="text" class="form-control" v-model="diseaseLocal.code" required placeholder="Nhập vào mã ICD 10 theo cập nhật của Bộ Y Tế"/>
            <ErrorMessage name="code" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <label for="tenBenh">Tên loại bệnh:</label>
            <Field name="tenBenh" class="form-control" v-model="diseaseLocal.tenBenh" required placeholder="Nhập vào tên loại bệnh"/>
            <ErrorMessage name="tenBenh" class="error-feedback" style="color: rgb(238, 15, 15);" />
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
  emits: ["submit:disease"],
  props: {
    disease: { type: Object, required: true },
  },
  data() {
    const diseaseFormSchema = yup.object().shape({
      code: yup
        .string()
        .required("Mã bệnh theo ICD 10 không được để trống."),
      tenBenh: yup
        .string()
        .required("Hãy nhập vào tên loại bệnh"),
    });

    const diseaseCopy = JSON.parse(JSON.stringify(this.disease));
    
    return {
      diseaseLocal: diseaseCopy,
      diseaseFormSchema,

    };
  },

  methods: {
    submitDisease() {
      this.$emit("submit:disease", this.diseaseLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>