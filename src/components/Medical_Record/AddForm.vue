<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Thêm Bệnh Nhân Mới</h1>
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
          <Field name="MSBN" type="number" class="form-control" v-model="formatMSBN" hidden />
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
import { ErrorMessage, Field, Form } from "vee-validate";
import PatientService from "@/services/patient.service.js";
import * as yup from "yup";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:patient"],
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
    
    return {
      patients: [],
      patientLocal: {
        MSBN: "",
        name: "",
        year: "",
        gender: "",
        phoneNumber: "",
        address: "",
      },
      patientFormSchema,

    };
  },
  computed: {
    formatMSBN() {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear()).slice(-2);
      let patientCount;
      if (this.patients.length > 0) {
        const latestPatient = this.patients[this.patients.length - 1];
        const lastSection = latestPatient.MSBN.split('.').pop();
        const latestCount = parseInt(lastSection) + 1;
        patientCount = String(latestCount).padStart(4, '0');
      } else {
        patientCount = '0001';
      }
      const MSBN = `${day}${month}${year}.1101.${patientCount}`;
      this.patientLocal.MSBN = MSBN;
      return MSBN;
    }
  },

  methods: {
    async retrievePatients() {
      try {
        this.patients = await PatientService.getAll();
      } catch (error) {
        console.error(error);
      }
    },

    submitPatient() {
      this.$emit("submit:patient", this.patientLocal);
    },
  },

  async created() {
    await this.retrievePatients();
  },
};
</script>

<style scoped>
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
  transform: translateX(1.1em) scale(1.1);
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