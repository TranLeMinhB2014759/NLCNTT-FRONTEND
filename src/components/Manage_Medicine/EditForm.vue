<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Chỉnh Sửa Thông Tin Thuốc</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-medicine' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitMedicine" :validation-schema="medicineFormSchema">
          <div class="mb-3 mt-3">
            <label for="tenThuoc">Tên thuốc:</label>
            <Field name="tenThuoc" type="text" class="form-control" v-model="medicineLocal.tenThuoc" required placeholder="Nhập vào tên thuốc"/>
            <ErrorMessage name="tenThuoc" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

            <div class="mb-3 mt-3">
              <div class="p=1 d-flex align-items-center">
                  <label>Kích hoạt: </label>
                &nbsp;&nbsp;&nbsp;
                <label class="text-center">
                  <input class="toggle-checkbox" type="checkbox" name="status" :checked="medicineLocal.status === 'on'" @change="updateStatus"/>
                  <div class="toggle-slot">
                    <div class="sun-icon-wrapper">
                      <div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                    </div>
                    <div class="toggle-button"></div>
                    <div class="moon-icon-wrapper">
                      <div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
        
          <div class="row">
            <div class="col-md-5 col-8">
              <div class="mb-3 mt-3">
                <label for="Gia">Giá:</label>
                <div class="input-group">
                  <Field name="Gia" type="number" class="form-control" v-model="medicineLocal.Gia" required placeholder="Nhập vào giá"/>
                  <span class="input-group-text">VND</span>
                </div>
                <ErrorMessage name="Gia" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-md-3 col-4">
              <div class="mb-3 mt-3">
                <label for="Donvi">Đơn vị tính:</label>
                <Field as="select" name="Donvi" class="form-control" v-model="medicineLocal.Donvi" required>
                  <option value="Tuýp">Tuýp</option>
                  <option value="Hộp">Hộp</option>
                  <option value="Viên">Viên</option>
                  <option value="Chai">Chai</option>
                </Field>
                <ErrorMessage name="Donvi" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-md-4 col-12">
              <div class="mb-3 mt-3">
                <label for="SoLuong">Số lượng:</label>
                <Field name="SoLuong" type="number" class="form-control" v-model="medicineLocal.SoLuong" required placeholder="Nhập vào số lượng"/>
                <ErrorMessage name="SoLuong" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <div class="mb-3 mt-3">
            <label for="HSD">Hạn sử dụng:</label>
            <Field type="date" name="HSD" class="form-control" v-model="medicineLocal.HSD" required/>
            <ErrorMessage name="HDSD" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <label for="MoTa">Mô tả:</label>
            <Field name="MoTa" type="text" class="form-control" v-model="medicineLocal.MoTa" required placeholder="Nhập vào mô tả thuốc"/>
            <ErrorMessage name="MoTa" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <label for="GhiChu">Ghi Chú:</label>
            <Field name="GhiChu" type="text" class="form-control" v-model="medicineLocal.GhiChu" />
            <ErrorMessage name="GhiChu" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <label for="nhaCungCap">Nhà Cung Cấp:</label>
            <Field name="nhaCungCap" type="text" class="form-control" v-model="medicineLocal.nhaCungCap" placeholder="Nhập vào nhà cung cấp thuốc"/>
            <ErrorMessage name="nhaCungCap" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="row">
            <div class="col-12 col-md-5 col-lg-4 d-flex justify-content-center">
              <img class="rounded-circle" v-if="renderPhoto || medicineLocal.imgURL" :src="renderPhoto || medicineLocal.imgURL" alt="Medicine Image"
                width="200" height="200" />
            </div>
            <div class="col-12 col-md-7 col-lg-8">
              <div class="mb-3 mt-3">
                <label for="imgURL">Ảnh:</label>
                <Field name="imgURL" type="file" class="form-control" v-model="medicineLocal.imgURL" required accept='image/png, image/jpeg, image/webp, image/jpg' @change="onFileChange"/>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:medicine"],
  props: {
    medicine: { type: Object, required: true },
  },
  data() {
    const medicineFormSchema = yup.object().shape({
      tenThuoc: yup
        .string()
        .required("Hãy nhập vào tên thuốc."),
      Gia: yup
        .string()
        .required("Hãy nhập vào giá tiền."),
      SoLuong: yup
        .string()
        .required("Hãy nhập vào số lượng."),
      Donvi: yup
        .string()
        .required("Hãy chọn một đơn vị tính."),
      HSD: yup
        .string()
        .required("Hãy nhập vào hạn sử dụng."),
      MoTa: yup
        .string()
        .required("Mô tả không được để trống.")
        .min(5, "Nhập ít nhất 5 ký tự.")
        .max(1000, "Quá số kí tự được phép."),
      GhiChu: yup
        .string(),
      nhaCungCap: yup
        .string()
        .required("Mô tả không được để trống.")
        .min(5, "Nhập ít nhất 5 ký tự.")
        .max(255, "Quá số kí tự được phép."),
      imgURL: yup
        .string()
        .required("Vui lòng chọn một ảnh.")
        // .matches(/\.(jpg|jpeg|png|webp)$/i, "Định dạng ảnh phải là jpg, jpeg, png hoặc webp.")
    });
    const medicineCopy = JSON.parse(JSON.stringify(this.medicine));
    return {
      renderPhoto: "",
      medicineLocal: medicineCopy,
      medicineFormSchema,
    };
  },
  methods: {
    updateStatus() {
      this.medicineLocal.status = this.medicineLocal.status === 'on' ? 'off' : 'on';
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.medicineLocal.imgURL = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.renderPhoto = reader.result;
      };
    },

    submitMedicine() {
      this.$emit("submit:medicine", this.medicineLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>