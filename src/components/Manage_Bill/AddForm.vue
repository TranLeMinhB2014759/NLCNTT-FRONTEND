<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Thêm Hóa Đơn</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-bill' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitBill" :validation-schema="billFormSchema">
          <div class="row">
            <div class="col-10 col-md-5">
              <div class="mb-3 mt-3">
                <Field name="search" type="text" class="form-control" v-model="billLocal.search" required
                  placeholder="Nhập vào mã số hồ sơ" autocomplete="off"/>
                <ErrorMessage name="MSHS" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-2 col-md-2">
              <div class="mb-3 mt-3">
                <button type="button" class="btn btn-light" @click="getRecordByMSHS(billLocal.search)">
                  <i class="fa-solid fa-rotate-right fa-2xl"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="mb-3 mt-3">
            <label for="MSHS">Đơn thuốc:</label>
            <Field name="MSHS" type="text" class="form-control" v-model="billLocal.MSHS" disabled/>
            <Field name="_id" type="text" v-model="billLocal._id" required hidden/>
            <Field name="MSHS" type="text" v-model="billLocal.MSHS" required hidden/>
          </div>
          <div class="mb-3 mt-3">
            <label for="name">Tên khách hàng:</label>
            <Field name="name" type="text" class="form-control" v-model="billLocal.name" required
              placeholder="Nhập vào tên khách hàng" />
            <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <label for="phoneNumber">Số điện thoại:</label>
            <Field name="phoneNumber" type="text" class="form-control" v-model="billLocal.phoneNumber" required
              placeholder="0123456789 (10 số)" />
            <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>

          <div class="mb-3 mt-3">
            <strong>Dịch vụ đã sử dụng: </strong>
            <div class="container-selected-medicine">
              <div class="mb-3 mt-3">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <input name="service" list="service" class="form-control" v-model="selectedService"
                      placeholder="Hãy nhập vào tên dịch vụ" required>
                    <datalist id="service">
                      <option v-for="service in services" :key="service._id" :value="service.tenDichVu"
                        :disabled="isServiceSelected(service)"></option>
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
                      <th>Tên dịch vụ</th>
                      <th>Số lượng</th>
                      <th>ĐVT</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(service, index) in selectedServices" :key="index">
                      <td> {{ index + 1 }} </td>
                      <td> {{ service.tenDichVu }} </td>
                      <td>
                        <div class="d-flex justify-content-around align-items-center">
                          <button type="button" class="btn btn-outline-secondary" @click="decreaseQuantity(service)"><i class="fa-solid fa-minus"></i></button>
                          <input type="number" v-model="service.SoLuongBan" placeholder="SL" min="1" max="999" required autocomplete="off" style="width: 60px;"/>
                          <button type="button" class="btn btn-outline-secondary" @click="increaseQuantity(service)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                      </td>
                      <td> Lần
                        <!-- {{ medicine.Donvi }}
                        <input v-model="medicine.Donvi" hidden /> -->
                      </td>
                      <td> {{ formatToVND(service.Gia) }} </td>
                      <td>
                        {{ formatToVND(calculateTotalPrice(service)) }}
                        <input type="number" :value="calculateTotalPrice(service)" hidden />
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeService(index)"><i
                            class="fa-solid fa-minus"></i></button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5">
                        <strong>Tổng tiền</strong>
                      </td>
                      <td>
                        <strong>{{ formatToVND(calculateTotalService()) }}</strong>
                        <input type="number" :value="calculateTotalService()" hidden />
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeAllService()">Delete All</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div v-else>
                <p class="text-danger"><i class="fas fa-exclamation-circle text-danger"></i> Không sử dụng dịch vụ</p>
              </div>
            </div>
          </div>

          <div class="mb-3 mt-3">
            <strong>Đơn thuốc: </strong>
            <div class="container-selected-medicine">
              <div class="mb-3 mt-3">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <input name="prescription" list="prescription" class="form-control" v-model="selectedMedicine"
                      placeholder="Hãy nhập vào tên thuốc" required>
                    <datalist id="prescription">
                      <option v-for="medicine in medicines" :key="medicine._id" :value="medicine.tenThuoc"
                        :disabled="isMedicineSelected(medicine)"></option>
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
                      <th>ĐVT</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
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
                        <input v-model="medicine.Donvi" hidden />
                      </td>
                      <td> {{ formatToVND(medicine.Gia) }} </td>
                      <td>
                        {{ formatToVND(calculateTotalPrice(medicine)) }}
                        <input type="number" :value="calculateTotalPrice(medicine)" hidden />
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeMedicine(index)"><i
                            class="fa-solid fa-minus"></i></button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5">
                        <strong>Tổng tiền</strong>
                      </td>
                      <td>
                        <strong>{{ formatToVND(calculateTotalPrescription()) }}</strong>
                        <input type="number" :value="calculateTotalPrescription()" hidden />
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger form-control" @click="removeAllMedicine()">Delete All</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div v-else>
                <p class="text-danger"><i class="fas fa-exclamation-circle text-danger"></i> Đơn thuốc rỗng</p>
              </div>
            </div>
          </div>

          <div class="mb-3 mt-3">
            Tổng hóa đơn: {{ formatToVND(calculateTotalBill()) }}
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
import MedicalrecordService from "@/services/medicalrecord.service.js";
import ServiceService from "@/services/service.service.js";
import MedicineService from "@/services/medicine.service.js";
import { ErrorMessage, Field, Form } from "vee-validate";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:bill"],
  data() {
    const billFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Hãy nhập vào tên khách hàng.")
        .min(10, "Tên phải có ít nhất 10 ký tự."),
      phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống.")
        .matches(
          /((09|03|07|08|05|01)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."),
    });
    return {
      record: null,
      selectedMedicine: null,
      selectedMedicines: [],
      selectedService: null,
      selectedServices: [],
      services: [],
      medicines: [],

      billLocal: {
        search: "",
        MSHS: "Bán lẻ",
        ngayLap: this.getCurrentDate(),
        name: "",
        phoneNumber: "",
        service: "",
        total_service: "",
        prescription: "",
        total_prescription: "",
        total_bill: "",
        nguoiLap: this.getStaff(),
      },
      billFormSchema,

    };
  },
  methods: {
    getStaff() {
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

    formatToVND(number) {
      let formattedNumber = number.toLocaleString('vi-VN');
      return formattedNumber;
    },

    async getRecordByMSHS(search) {
      try {
        const record = await MedicalrecordService.getRecordByMSHS(search);
        if(record && record[0].status === "unsold"){
          this.billLocal.MSHS = record[0].MSHS;
          this.billLocal.name = record[0].name;
          this.billLocal.phoneNumber = record[0].phoneNumber;
          this.billLocal._id = record[0]._id;
          this.selectedServices = record[0].service.map(service => ({
            tenDichVu: service.tenDichVu,
            SoLuongBan: service.SoLan,
            Gia: service.Gia,
            // Donvi: service.Donvi,
          }));
          this.selectedMedicines = record[0].prescription.map(presc => ({
            _id: presc._id,
            tenThuoc: presc.tenThuoc,
            Gia: presc.Gia,
            Donvi: presc.Donvi,
            SoLuongBan: presc.SoLuongBan,
          }));
          this.billLocal.search = "",
          toast.success("Hóa đơn của " + record[0].name);
        } else{
          toast.info("Đơn thuốc đã được bán");
        }
      } catch (error) {
        this.billLocal.MSHS = "Bán lẻ",
        this.billLocal.name = "",
        this.billLocal.phoneNumber = "",
        this.selectedMedicines = [],
        toast.info("Không tìm thấy mã đơn thuốc");
      }
    },
    // -------------------- Service --------------------
    async retrieveServices() {
      try {
        const dataService = await ServiceService.getAll();
        this.services =  dataService.filter(item => item.status === "on" );
      } catch (error) {
        console.log(error);
      }
    },

    isServiceSelected(service) {
      return this.selectedServices.some(selectedService => selectedService.tenDichVu === service.tenDichVu);
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
        } else if (selectedOption && this.selectedServices.some(ser => ser.tenDichVu === selectedOption.tenDichVu)) {
          this.selectedService = null;
          toast.warn("Dịch vụ đã được thêm vào");

        } else {
          this.selectedService = null;
          toast.error("Hãy điền đúng tên dịch vụ");
        }
      }
    },

    removeService(index) {
      this.selectedServices.splice(index, 1);
    },

    removeAllService() {
      this.selectedServices = [];
    },

    // -------------------- Medicine --------------------
    async retrieveMedicines() {
      try {
        const dataMedicine = await MedicineService.getAll()
        this.medicines = dataMedicine.filter(item => item.status === "on" );
      } catch (error) {
        console.log(error);
      }
    },

    isMedicineSelected(medicine) {
      return this.selectedMedicines.some(selectedMedicine => selectedMedicine.tenThuoc === medicine.tenThuoc);
    },

    addMedicine() {
      if (this.selectedMedicine) {
        const selectedOption = this.medicines.find(medicine => medicine.tenThuoc === this.selectedMedicine);
        if (selectedOption && !this.selectedMedicines.some(med => med.tenThuoc === selectedOption.tenThuoc)) {
          this.selectedMedicines.push({
            ...selectedOption,
            SoLuongBan: 1,
          });
          this.selectedMedicine = '';
        } else if (selectedOption && this.selectedMedicines.some(med => med.tenThuoc === selectedOption.tenThuoc)) {
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

    removeAllMedicine() {
      this.selectedMedicines = [];
    },

    // ------------------------ CALCULATE ------------------------
    calculateTotalPrice(object) {
      return (object.SoLuongBan || 0) * (object.Gia || 0);
    },

    calculateTotalService() {
      let total = 0;
      this.selectedServices.forEach(service => {
        total += this.calculateTotalPrice(service);
      });
      return total;
    },

    calculateTotalPrescription() {
      let total = 0;
      this.selectedMedicines.forEach(medicine => {
        total += this.calculateTotalPrice(medicine);
      });
      return total;
    },

    calculateTotalBill() {
      return this.calculateTotalService() + this.calculateTotalPrescription();
    },

    // ------------------------ SUBMIT ------------------------
    submitBill() {
      if (this.calculateTotalBill() <= 0) {
        toast.info("Không phát sinh chi phí nào")
      } else {
        this.billLocal.service = this.selectedServices.map(service => ({
          tenDichVu: service.tenDichVu,
          Gia: service.Gia,
          // Donvi: medicine.Donvi,
          SoLan: service.SoLuongBan,
        }));
        this.billLocal.prescription = this.selectedMedicines.map(medicine => ({
          _id: medicine._id,
          tenThuoc: medicine.tenThuoc,
          Gia: medicine.Gia,
          Donvi: medicine.Donvi,
          SoLuongBan: medicine.SoLuongBan,
        }));
        this.billLocal.total_service = this.calculateTotalService();
        this.billLocal.total_prescription = this.calculateTotalPrescription();
        this.billLocal.total_bill = this.calculateTotalBill();
        this.$emit("submit:bill", this.billLocal);
      }
    },
  },

  async created() {
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

.container-selected-medicine {
  background-color: rgb(248, 240, 224);
  border: 1px solid black;
  padding: 2%;
  min-height: 100px;
  border-radius: var(--bs-border-radius);
  ;
}

.btn-light {
  padding: 8px;
  border-radius: 50%;
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