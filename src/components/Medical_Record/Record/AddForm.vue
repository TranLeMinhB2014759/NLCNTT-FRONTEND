<template>
  <div v-if="patient" class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <!-- Phần tiêu đề -->
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Thêm toa thuốc</h1>
          </div>
          <div class="col-2">
            <!-- Nút đóng -->
            <router-link :to="{ name: 'medicalrecord', params: { id: patient._id } }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <!-- Form thêm toa thuốc -->
        <Form @submit="submitMedicalrecord" :validation-schema="medicalrecordFormSchema">
          <!-- Thông tin bệnh nhân -->
          <div class="row">
            <Field name="MSBN" type="text" v-model="medicalrecordLocal.MSBN" required hidden />
            <Field name="status" type="text" v-model="medicalrecordLocal.status" required hidden />
            <Field name="MSHS" type="text" class="form-control" v-model="formatMSHS" hidden />
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="name"><strong>Họ và tên: </strong>{{ medicalrecordLocal.name }}</label>
                <Field name="name" type="text" class="form-control" v-model="medicalrecordLocal.name" required hidden />
                <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="gender"><strong>Giới tính: </strong>{{ medicalrecordLocal.gender }}</label>
                <Field as="select" name="gender" class="form-control" v-model="medicalrecordLocal.gender" required
                  hidden>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Field>
                <ErrorMessage name="gender" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="mb-3 mt-3">
                <label for="year"><strong>Năm sinh: </strong>{{ medicalrecordLocal.year }}</label>
                <Field name="year" type="number" class="form-control" v-model="medicalrecordLocal.year" required
                  hidden />
                <ErrorMessage name="year" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <!-- Thông tin liên hệ -->
          <div class="row">
            <div class="col-12 col-md-5">
              <div class="mb-3 mt-3">
                <label for="phoneNumber"><strong>Số điện thoại: </strong>{{ medicalrecordLocal.phoneNumber }}</label>
                <Field name="phoneNumber" type="text" class="form-control" v-model="medicalrecordLocal.phoneNumber"
                  required hidden />
                <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-12 col-md-7">
              <div class="mb-3 mt-3">
                <label for="address"><strong>Địa chỉ: </strong>{{ medicalrecordLocal.address }}</label>
                <Field name="address" type="text" class="form-control" v-model="medicalrecordLocal.address" required
                  hidden />
                <ErrorMessage name="address" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
          </div>

          <!-- Symptom -->
          <div class="mb-3 mt-3">
            <label for="symptom"><strong>Triệu chứng: </strong></label>
            <Field name="symptom" type="text" class="form-control" v-model="medicalrecordLocal.symptom" required placeholder="Nhập vào triệu chứng" autocomplete="off"/>
            <ErrorMessage name="symptom" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <!-- Diagnosis -->
          <div class="mb-3 mt-3">
            <strong>Chẩn đoán: </strong>
            <div class="container-selected">
              <div class="mb-3 mt-3">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <input name="diagnosis" list="diagnosis" class="form-control" v-model="selectedDisease" placeholder="Hãy nhập vào mã ICD 10 hoặc tên bệnh " required autocomplete="off">
                      <datalist id="diagnosis">
                        <option v-for="disease in diseases" :key="disease._id" :value="disease.tenBenh" :disabled="isDiseaseSelected(disease)">{{ disease.code }}</option>
                      </datalist>
                    </input>
                  </div>
                  <div class="col-12 col-md-2">
                    <button type="button" @click="addDiagnosis" :disabled="!selectedDisease"
                      class="btn btn-primary form-control"><i class="fa-solid fa-plus"></i></button>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedDiseases != ''" class="table-responsive">
                <table class="table table-bordered text-center">
                  <thead class="table-success">
                    <tr>
                      <th>STT</th>
                      <th>Mã ICD 10</th>
                      <th>Tên bệnh</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(disease, index) in selectedDiseases" :key="index">
                      <td> {{ index + 1 }} </td>
                      <td> {{ disease.code }} </td>
                      <td> {{ disease.tenBenh }} </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeDiagnosis(index)"><i class="fa-solid fa-minus"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <p class="text-danger"><i class="fas fa-exclamation-circle text-danger"></i> Hãy thêm chuẩn đoán</p>
              </div>
            </div>
          </div>

          <!-- Services -->
          <div class="mb-3 mt-3">
            <strong>Dịch vụ sử dụng: </strong>
            <div class="container-selected">
              <div class="mb-3 mt-3">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <input name="services" list="services" class="form-control" v-model="selectedService" placeholder="Hãy nhập vào mã hoặc tên dịch vụ " required autocomplete="off">
                      <datalist id="services">
                        <option v-for="service in services" :key="service._id" :value="service.tenDichVu" :disabled="isServiceSelected(service)">{{ service.code }}</option>
                      </datalist>
                    </input>
                  </div>
                  <div class="col-12 col-md-2">
                    <button type="button" @click="addService" :disabled="!selectedService"
                      class="btn btn-primary form-control"><i class="fa-solid fa-plus"></i></button>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedServices != ''" class="table-responsive">
                <table class="table table-bordered text-center">
                  <thead class="table-success">
                    <tr>
                      <th>STT</th>
                      <th>Mã dịch vụ</th>
                      <th>Số lần</th>
                      <th>Tên dịch vụ</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(service, index) in selectedServices" :key="index">
                      <td> {{ index + 1 }} </td>
                      <div class="d-flex justify-content-around align-items-center">
                          <button type="button" class="btn btn-outline-secondary" @click="decreaseQuantity(service)"><i class="fa-solid fa-minus"></i></button>
                          <input type="number" v-model="service.SoLuongBan" placeholder="SL" min="1" max="999" required autocomplete="off" style="width: 60px;"/>
                          <button type="button" class="btn btn-outline-secondary" @click="increaseQuantity(service)"><i class="fa-solid fa-plus"></i></button>
                      </div>
                      <td> {{ service.code }} </td>
                      <td> {{ service.tenDichVu }} </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeServices(index)"><i class="fa-solid fa-minus"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <p class="text-danger"><i class="fas fa-exclamation-circle text-danger"></i> Hãy thêm chuẩn đoán</p>
              </div>
            </div>
          </div>

          <!-- Prescriptions -->
          <div class="mb-3 mt-3">
            <strong>Đơn thuốc: </strong>
            <div class="container-selected">
              <div class="mb-3 mt-3">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <input name="prescription" list="prescription" class="form-control" v-model="selectedMedicine" placeholder="Hãy nhập vào tên thuốc" required autocomplete="off">
                      <datalist id="prescription">
                        <option v-for="medicine in medicines" :key="medicine._id" :value="medicine.tenThuoc" :disabled="isMedicineSelected(medicine)"></option>
                      </datalist>
                    </input>
                  </div>
                  <div class="col-12 col-md-2">
                    <button type="button" @click="addMedicine" :disabled="!selectedMedicine"
                      class="btn btn-primary form-control"><i class="fa-solid fa-plus"></i></button>
                  </div>
                </div>
              </div>

              <div v-if="selectedMedicines != ''" class="table-responsive">
                <table class="table table-bordered text-center">
                  <thead class="table-success">
                    <tr>
                      <th>STT</th>
                      <th>Tên thuốc</th>
                      <th>Số lượng</th>
                      <th>DVT</th>
                      <th>HDSD</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(medicine, index) in selectedMedicines" :key="index">
                      <td> {{ index + 1 }} </td>
                      <td> {{ medicine.tenThuoc }} </td>
                      <td>
                        <div class="d-flex justify-content-around align-items-center">
                          <button type="button" class="btn btn-outline-secondary" @click="decreaseQuantity(medicine)"><i class="fa-solid fa-minus"></i></button>
                          <input type="number" v-model="medicine.SoLuongBan" placeholder="SL" min="1" max="999" required autocomplete="off" style="width: 60px;"/>
                          <button type="button" class="btn btn-outline-secondary" @click="increaseQuantity(medicine)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                      </td>
                      <td>
                        {{ medicine.Donvi }}
                        <input v-model="medicine.Donvi" hidden>
                      </td>
                      <td>
                        <input name="HDSD" list="HDSD" class="form-control" v-model="medicine.HDSD" required placeholder="E.g: 'U1S' là Uống 1 lần vào buổi sáng" autocomplete="off">
                          <datalist id="HDSD">
                              <option value="Ngày uống 1 lần, mỗi lần 1 viên | sáng">U1S</option>
                              <option value="Ngày uống 1 lần, mỗi lần 1 viên | trưa">U1T</option>
                              <option value="Ngày uống 1 lần, mỗi lần 1 viên | chiều">U1C</option>
                              <option value="Ngày uống 2 lần, mỗi lần 1 viên | sáng, trưa">U2ST</option>
                              <option value="Ngày uống 2 lần, mỗi lần 1 viên | sáng, chiều">U2SC</option>
                              <option value="Ngày uống 2 lần, mỗi lần 1 viên | trưa, chiều">U2TC</option>
                              <option value="Ngày uống 3 lần, mỗi lần 1 viên | sáng, trưa, chiều">U3</option>
                              <option value="Ngày thoa 1 lần | sáng">T1S</option>
                              <option value="Ngày thoa 1 lần | trưa">T1T</option>
                              <option value="Ngày thoa 1 lần | chiều">T1C</option>
                              <option value="Ngày thoa 2 lần | sáng, trưa">T2ST</option>
                              <option value="Ngày thoa 2 lần | sáng, chiều">T2SC</option>
                              <option value="Ngày thoa 2 lần | trưa, chiều">T2TC</option>
                              <option value="Ngày thoa 3 lần | sáng, trưa, chiều">T3</option>
                          </datalist>
                        </input>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeMedicine(index)"><i class="fa-solid fa-minus"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <p class="text-danger"><i class="fas fa-exclamation-circle text-danger"></i> Đơn thuốc rỗng</p>
              </div>
            </div>
          </div>

          <!-- Nút lưu -->
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
  <div class="card" v-else>
    <div class="card-body">
      <div class="d-flex justify-content-center">
        <span class="loader"></span>
      </div>
    </div>
  </div>

</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import MedicalrecordService from "@/services/medicalrecord.service.js";
import DiseaseService from "@/services/disease.service.js";
import ServiceService from "@/services/service.service.js";
import MedicineService from "@/services/medicine.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:medicalrecord"],
  props: {
    patient: { type: Object, required: true },
  },
  data() {
    return {
      // patient: [],
      medicalrecords: [],
      selectedDisease: null,
      selectedDiseases: [],
      selectedService: null,
      selectedServices: [],
      selectedMedicine: null,
      selectedMedicines: [],
      diseases: [],
      services: [],
      medicines: [],
      medicalrecordLocal: {
        MSBN: this.patient.MSBN,
        MSHS: "",
        name: this.patient.name,
        year: this.patient.year,
        gender: this.patient.gender,
        phoneNumber: this.patient.phoneNumber,
        address: this.patient.address,
        ngayKham: this.getCurrentDate(),
        bacsi: this.getBacsi(),
        symptom: "",
        diagnosis: "",
        service: "",
        prescription: "",
        status: "unsold",
      },
      medicalrecordFormSchema: yup.object().shape({
        symptom: yup
          .string()
          .required("Triệu chứng không dược để trống"),
      }),
    };
  },
  computed: {
    formatMSHS() {
      let recordCount;
      if (this.medicalrecords.length > 0) {
        const latestRecord = this.medicalrecords[this.medicalrecords.length - 1];
        const lastSection = latestRecord.MSHS.split('.').pop();
        const latestCount = parseInt(lastSection) + 1;
        recordCount = String(latestCount).padStart(4, '0');
      } else {
        recordCount = '0001';
      }
      const MSHS = `${this.patient.MSBN.split('.').pop()}.${recordCount}`;
      this.medicalrecordLocal.MSHS = MSHS;
      return MSHS;
    }
  },
  methods: {
    async retrieveRecords() {
      try {
        this.medicalrecords = await MedicalrecordService.getAll();
      } catch(error) {
        toast.error("Đã xảy ra lỗi trong quá trình truy vấn");
      }
    },

    getBacsi() {
      const staffData = JSON.parse(window.localStorage.getItem('staff'));
      this.staff = staffData || {};
      return `${this.staff.name}`;
    },
    getCurrentDate() {
      const currentDate = new Date();
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      return `${hours}:${minutes}, ${day}/${month}/${year}`;
    },

    decreaseQuantity(object) {
      if (object.SoLuongBan > 1) {
        object.SoLuongBan--;
      }
    },

    increaseQuantity(object) {
      if (object.SoLuongBan < 999) {
        object.SoLuongBan++;
      }
    },

    // --------------- selectedDisease -----------------------
    async retrieveDiseases() {
      try {
        this.diseases = await DiseaseService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    isDiseaseSelected(disease) {
      return this.selectedDiseases.some(selectedDisease => selectedDisease._id === disease._id);
    },

    addDiagnosis() {
      if (this.selectedDisease) {
        const selectedOption = this.diseases.find(disease => disease.tenBenh === this.selectedDisease);
        if (selectedOption && !this.selectedDiseases.some(dis => dis.tenBenh === selectedOption.tenBenh)) {
          this.selectedDiseases.push({
            ...selectedOption,
          });
          this.selectedDisease = '';
        } else if(selectedOption && this.selectedDiseases.some(dis => dis.tenBenh === selectedOption.tenBenh)){
          this.selectedDisease = null;
          toast.warn("Đã thêm chẩn đoán này");

        } else {
          this.selectedDisease = null;
          toast.error("Hãy điền đúng tên bệnh");
        }
      }
    },

    removeDiagnosis(index) {
      this.selectedDiseases.splice(index, 1);
    },

    // --------------- selectedService -----------------------
    async retrieveServices() {
      try {
        const dataService = await ServiceService.getAll();
        this.services =  dataService.filter(item => item.status === "on" );
      } catch (error) {
        console.log(error);
      }
    },

    isServiceSelected(service) {
      return this.selectedServices.some(selectedService => selectedService._id === service._id);
    },

    addService() {
      if (this.selectedService) {
        const selectedOption = this.services.find(service => service.tenDichVu === this.selectedService);
        if (selectedOption && !this.selectedServices.some(ser => ser.tenDichVu === selectedOption.tenDichVu)) {
          this.selectedServices.push({
            ...selectedOption,
            SoLuongBan: 1,
          });
          this.selectedService = '';
        } else if(selectedOption && this.selectedServices.some(ser => ser.tenDichVu === selectedOption.tenDichVu)){
          this.selectedService = null;
          toast.warn("Đã thêm dịch vụ này");

        } else {
          this.selectedService = null;
          toast.error("Hãy điền đúng tên dịch vụ");
        }
      }
    },

    removeServices(index) {
      this.selectedServices.splice(index, 1);
    },

    // --------------- selectedMedicine -----------------------
    async retrieveMedicines() {
      try {
        const dataMedicine = await MedicineService.getAll()
        this.medicines = dataMedicine.filter(item => item.status === "on" );
      } catch (error) {
        console.log(error);
      }
    },

    isMedicineSelected(medicine) {
      return this.selectedMedicines.some(selectedMedicine => selectedMedicine._id === medicine._id);
    },

    addMedicine() {
      if (this.selectedMedicine) {
        const selectedOption = this.medicines.find(medicine => medicine.tenThuoc === this.selectedMedicine);
        if (selectedOption && !this.selectedMedicines.some(med => med.tenThuoc === selectedOption.tenThuoc)) {
          this.selectedMedicines.push({
            ...selectedOption,
            SoLuongBan: 1,
            HDSD: ''
          });
          this.selectedMedicine = '';
        } else if(selectedOption && this.selectedMedicines.some(med => med.tenThuoc === selectedOption.tenThuoc)){
          this.selectedMedicine = null;
          toast.warn("Thuốc đã được thêm vào toa");

        } else {
          this.selectedMedicine = null;
          toast.error("Hãy điền đúng tên thuốc");
        }
      }
    },

    removeMedicine(index) {
      this.selectedMedicines.splice(index, 1);
    },

    // ------------------------- Submit Form -------------------------
    submitMedicalrecord() {
      if (this.selectedMedicines.length === 0 || this.selectedDiseases.length === 0 || this.selectedServices.length === 0) {
        toast.error("Hãy điền đầy đủ các thông tin");
      } else {
        this.medicalrecordLocal.diagnosis = this.selectedDiseases.map(disease => ({
          code: disease.code,
          tenBenh: disease.tenBenh
        }));
        this.medicalrecordLocal.service = this.selectedServices.map(service => ({
          code: service.code,
          tenDichVu: service.tenDichVu,
          SoLan: service.SoLuongBan,
          Gia: service.Gia
        }));
        this.medicalrecordLocal.prescription = this.selectedMedicines.map(medicine => ({
          _id: medicine._id,
          tenThuoc: medicine.tenThuoc,
          Gia: medicine.Gia,
          Donvi: medicine.Donvi,
          SoLuongBan: medicine.SoLuongBan,
          HDSD: medicine.HDSD
        }));
        this.$emit("submit:medicalrecord", this.medicalrecordLocal);
      }
    },
  },
  async created() {
    await this.retrieveRecords();
    await this.retrieveDiseases();
    await this.retrieveServices();
    await this.retrieveMedicines();
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

.container-selected {
  background-color: lightcyan;
  border: 1px solid black;
  padding: 2%;
  min-height: 100px;
  border-radius: var(--bs-border-radius);
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


/* ----------------- LOADING -------------------- */
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #FFF #FFF transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent #FF3D00 #FF3D00;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
    
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
