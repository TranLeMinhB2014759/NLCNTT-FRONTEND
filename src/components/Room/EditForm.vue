<template>
  <div class="card">
    <div class="card-body">
      <div class="container" style="padding: 20px 70px;">
        <div class="row">
          <div class="col-10">
            <h1 class="d-flex justify-content-center">Chỉnh Sửa Thông Tin</h1>
          </div>
          <div class="col-2">
            <router-link :to="{ name: 'admin-room' }">
              <button class="button-close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
            </router-link>
          </div>
        </div>

        <Form @submit="submitRoom" :validation-schema="roomFormSchema">
          <div class="row">
            <div class="col-4">
              <div class="mb-3 mt-3">
                <label for="floor">Tầng:</label>
                <Field as="select" name="floor" class="form-control" v-model="roomLocal.floor" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Field>
                <ErrorMessage name="floor" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3 mt-3">
                <label for="stt">Số thứ tự:</label>
                <Field name="stt" type="number" class="form-control" v-model="roomLocal.stt" required placeholder="Nhập vào mã phòng"/>
                <ErrorMessage name="stt" class="error-feedback" style="color: rgb(238, 15, 15);" />
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3 mt-3">
                <label for="maPhong">Mã phòng:</label>
                <Field name="maPhong" class="form-control" v-model="formatmaPhong" required disabled />
                <Field name="maPhong" class="form-control" v-model="formatmaPhong" required hidden />
              </div>
            </div>
          </div>

          <div class="mb-3 mt-3">
            <label for="bacSiChinh">Bác sĩ chính:</label>
            <Field as="select" name="bacSiChinh" class="form-control" v-model="roomLocal.bacSiChinh" required>
              <option value="">Phòng trống</option>
              <option v-if="doctors.length === 0" disabled selected>Các bác sĩ đã được phân công hết</option>
              <option v-else v-for="(doctor, index) in doctors" :key="index" :value="doctor">{{ doctor }}</option>
            </Field>
            <ErrorMessage name="bacSiChinh" class="error-feedback" style="color: rgb(238, 15, 15);" />
          </div>
          <div class="mb-3 mt-3">
            <label for="dichVu">Chuyên môn:</label>
            <Field as="select" name="dichVu" class="form-control" v-model="roomLocal.dichVu" required>
              <option value="">Phòng trống</option>
              <option value="Khám về da tay">Khám về da tay - chân - miệng</option>
              <option value="Khám về da mặt">Khám về mặt</option>
              <option value="Khám về da đầu">Khám về da đầu</option>
              <option value="Khám các vùng da khác">Khám các vùng da khác</option>
            </Field>
            <ErrorMessage name="dichVu" class="error-feedback" style="color: rgb(238, 15, 15);" />
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
import RoomService from "@/services/room.service.js";
import DoctorService from "@/services/doctor.service.js";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:room"],
  props: {
    room: { type: Object, required: true },
  },
  data() {
    const roomFormSchema = yup.object().shape({
      floor: yup
        .string()
        .required("Tầng không được để trống"),
      stt: yup
        .string()
        .required("Số thứ tự không được để trống")
    });
    const roomCopy = JSON.parse(JSON.stringify(this.room));
    return {
      doctor: [],
      doctorselected: [],
      doctors: [],
      roomLocal: roomCopy,
      roomFormSchema,
    };
  },
  computed: {
    formatmaPhong(){
      const stt = String(this.roomLocal.stt).padStart(2, '0');
      const maPhong = `${this.roomLocal.floor}${stt}`
      this.roomLocal.maPhong = maPhong;
      return maPhong;
    },
  },
  methods: {
    async retrieveDoctor() {
      try {
        const doctorData = await DoctorService.getAll();
        this.doctor = doctorData.map(item => item.name);
        const doctorDataSelected = await RoomService.getAll();
        this.doctorselected = doctorDataSelected.map(item => item.bacSiChinh !== "" ? item.bacSiChinh : null).filter(Boolean);
        this.doctors = this.doctor.filter(doctor => !this.doctorselected.includes(doctor));
        if (this.roomLocal.bacSiChinh !== "") {
            this.doctors.push(this.roomLocal.bacSiChinh);
        }
      } catch (error) {
          console.error(error);
      }
    },
    submitRoom() {
      this.$emit("submit:room", this.roomLocal);
    },
  },
  async created() {
    await this.retrieveDoctor();
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>