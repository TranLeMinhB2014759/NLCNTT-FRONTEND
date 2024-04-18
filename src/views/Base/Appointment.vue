<template>
    <div class="container">
        <div class="back d-flex align-items-center">
            <router-link :to="{ name: 'trangchu' }">
                <button class="button-back">
                    <div class="button-box">
                        <span class="button-elem">
                            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                        <span class="button-elem">
                            <svg viewBox="0 0 46 40">
                                <path
                                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </button>
            </router-link>
            Trang chủ
        </div>
        <div class="row main-content">
            <div class="col-12 col-lg-6 guide">
                <p class="text-start">
                    Phòng khám Dermatology Clinic chất lượng cao với mô hình tiêu chuẩn 5* đang được
                    đông đảo người dân trong và ngoài tỉnh lựa chọn là đơn vị chăm sóc sức khỏe da cho bản thân và gia
                    đình.
                </p>
                <p>
                    Phòng khám triển khai dịch vụ: ĐẶT HẸN KHÁM nhằm mục đích hỗ trợ bệnh nhân tự chủ động làm thủ tục
                    đăng kí trước ít nhất 1 ngày và không cần phải phải xếp hàng lấy số đợi lâu. Bệnh nhân chỉ việc điền
                    thông tin đăng kí vào mẫu dưới đây và sẽ nhận được ưu tiên khám. Sau khi đăng kí xong, bệnh nhân đến
                    quầy tiếp đón, tại sảnh tầng 1 không cần xếp hàng lấy số.
                </p>
                <img src="/src/assets/images/huong-dan-dat-lich-hen.png" alt="Hướng dẫn lấy mã hồ sơ">
            </div>
            <div class="col-12 col-lg-6">
                <h1 class="text-center">Đặt lịch khám</h1>
                <div class="form__search">
                    <div class="form__top">
                        <Form @submit="submitAppointment" :validation-schema="appointmentFormSchema">
                            <h5>Thông tin bệnh nhân</h5>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="name">Họ và tên: <span class="text-danger">(Yêu cầu)</span></label>
                                        <span v-if="loadingInput" class="form-control-loading"></span>
                                        <span v-else>
                                            <Field name="name" type="text" class="form-control"
                                                v-model="appointmentLocal.name" required placeholder="Trần Văn A"
                                                :disabled="disabled" />
                                            <ErrorMessage name="name" class="error-feedback"
                                                style="color: rgb(238, 15, 15);" />
                                        </span>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="phoneNumber">Số điện thoại: <span class="text-danger">(Yêu
                                                cầu)</span></label>
                                        <Field name="phoneNumber" type="text" class="form-control"
                                            v-model="appointmentLocal.phoneNumber" required
                                            placeholder="0123456789 (10 chữ số)" @input="handlePhoneNumberInput" />
                                        <ErrorMessage name="phoneNumber" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <label>Giới tính: <span class="text-danger">(Yêu cầu)</span></label>
                                    <span v-if="loadingInput" class="form-control-loading"></span>
                                    <span v-else>
                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" id="radio1" name="gender"
                                                value="Nam" v-model="appointmentLocal.gender" :disabled="disabled" />
                                            <label class="form-check-label" for="radio1">Nam</label>
                                        </div>
                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" id="radio2" name="gender"
                                                value="Nữ" v-model="appointmentLocal.gender" :disabled="disabled" />
                                            <label class="form-check-label" for="radio2">Nữ</label>
                                        </div>
                                        <div class="form-check">
                                            <Field type="radio" class="form-check-input" id="radio3" name="gender"
                                                value="Khác" v-model="appointmentLocal.gender" :disabled="disabled" />
                                            <label class="form-check-label" for="radio3">Khác</label>
                                        </div>
                                        <ErrorMessage name="gender" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </span>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label for="year">Năm sinh:</label>
                                    <span v-if="loadingInput" class="form-control-loading"></span>
                                    <span v-else>
                                        <Field name="year" type="number" class="form-control"
                                            v-model="appointmentLocal.year" required
                                            placeholder="Không quá năm hiện tại" :disabled="disabled" />
                                        <ErrorMessage name="year" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </span>
                                </div>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="address">Địa chỉ: <span class="text-danger">(Yêu cầu)</span></label>
                                <span v-if="loadingInput" class="form-control-loading"></span>
                                <span v-else>
                                    <Field name="address" type="text" class="form-control"
                                        v-model="appointmentLocal.address" required :disabled="disabled" />
                                    <ErrorMessage name="address" class="error-feedback"
                                        style="color: rgb(238, 15, 15);" />
                                </span>
                            </div>
                            <h5>Thông tin cuộc hẹn</h5>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="service">Chọn dịch vụ: <span class="text-danger">(Yêu
                                                cầu)</span></label>
                                        <Field as="select" name="service" class="form-control"
                                            v-model="appointmentLocal.service" required @change="updateDoctors">
                                            <option v-for="service in filteredServices" :key="service" :value="service">
                                                {{ service }} </option>
                                        </Field>
                                        <ErrorMessage name="service" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="type">Chọn loại khám: <span class="text-danger">(Yêu
                                                cầu)</span></label>
                                        <Field as="select" name="type" class="form-control"
                                            v-model="appointmentLocal.type" required>
                                            <option value="Khám bệnh">Khám bệnh - 50.000₫</option>
                                            <option value="Khám đặc biệt">Khám đặc biệt - 100.000₫</option>
                                        </Field>
                                        <ErrorMessage name="type" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="doctor">Chọn bác sĩ: <span class="text-danger">(Yêu
                                                cầu)</span></label>
                                        <Field as="select" name="doctor" class="form-control"
                                            v-model="appointmentLocal.doctor" required @change="updateMaPhong">
                                            <option v-for="doctor in doctorsByService" :key="doctor" :value="doctor"> {{
                                                doctor }} </option>
                                        </Field>
                                        <ErrorMessage name="doctor" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="room">Phòng:</label>
                                        <Field name="room" class="form-control" v-model="appointmentLocal.room" required
                                            placeholder="Hãy chọn bác sĩ" disabled />
                                        <ErrorMessage name="room" class="error-feedback"
                                            style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3 mt-3">
                                <label for="day">Chọn ngày: <span class="text-danger">(Yêu cầu)</span></label>
                                <Field name="day" type="date" class="form-control" v-model="appointmentLocal.day"
                                    required placeholder="Hãy chọn ngày khám" />
                                <ErrorMessage name="day" class="error-feedback" style="color: rgb(238, 15, 15);" />
                            </div>

                            <div class="mb-3 mt-3 d-flex justify-content-center" v-if="loading">
                                <span class="loader"></span>
                            </div>

                            <div class="mb-3 mt-3" v-else>
                                <div class="d-flex justify-content-evenly">
                                    <div>
                                        <div class="radio-wrapper-16">
                                            <Field type="radio" class="radio-input" id="8:00" name="time" value="8:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('8:00')"
                                                required />
                                            <label class="radio-tile" for="8:00">
                                                <span class="radio-label">8:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="8:30" name="time" value="8:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('8:30')"
                                                required />
                                            <label class="radio-tile" for="8:30">
                                                <span class="radio-label">8:30</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="9:00" name="time" value="9:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('9:00')"
                                                required />
                                            <label class="radio-tile" for="9:00">
                                                <span class="radio-label">9:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="9:30" name="time" value="9:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('9:30')"
                                                required />
                                            <label class="radio-tile" for="9:30">
                                                <span class="radio-label">9:30</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="radio-wrapper-16">
                                            <Field type="radio" class="radio-input" id="10:00" name="time" value="10:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('10:00')"
                                                required />
                                            <label class="radio-tile" for="10:00">
                                                <span class="radio-label">10:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="10:30" name="time" value="10:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('10:30')"
                                                required />
                                            <label class="radio-tile" for="10:30">
                                                <span class="radio-label">10:30</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="11:00" name="time" value="11:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('11:00')"
                                                required />
                                            <label class="radio-tile" for="11:00">
                                                <span class="radio-label">11:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="11:30" name="time" value="11:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('11:30')"
                                                required />
                                            <label class="radio-tile" for="11:30">
                                                <span class="radio-label">11:30</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="radio-wrapper-16">
                                            <Field type="radio" class="radio-input" id="12:00" name="time" value="12:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('12:00')"
                                                required />
                                            <label class="radio-tile" for="12:00">
                                                <span class="radio-label">12:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="12:30" name="time" value="12:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('12:30')"
                                                required />
                                            <label class="radio-tile" for="12:30">
                                                <span class="radio-label">12:30</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="13:00" name="time" value="13:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('13:00')"
                                                required />
                                            <label class="radio-tile" for="13:00">
                                                <span class="radio-label">13:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="13:30" name="time" value="13:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('13:30')"
                                                required />
                                            <label class="radio-tile" for="13:30">
                                                <span class="radio-label">13:30</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="radio-wrapper-16">
                                            <Field type="radio" class="radio-input" id="14:00" name="time" value="14:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('14:00')"
                                                required />
                                            <label class="radio-tile" for="14:00">
                                                <span class="radio-label">14:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="14:30" name="time" value="14:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('14:30')"
                                                required />
                                            <label class="radio-tile" for="14:30">
                                                <span class="radio-label">14:30</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="15:00" name="time" value="15:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('15:00')"
                                                required />
                                            <label class="radio-tile" for="15:00">
                                                <span class="radio-label">15:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="15:30" name="time" value="15:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('15:30')"
                                                required />
                                            <label class="radio-tile" for="15:30">
                                                <span class="radio-label">15:30</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="radio-wrapper-16">
                                            <Field type="radio" class="radio-input" id="16:00" name="time" value="16:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('16:00')"
                                                required />
                                            <label class="radio-tile" for="16:00">
                                                <span class="radio-label">16:00</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="16:30" name="time" value="16:30"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('16:30')"
                                                required />
                                            <label class="radio-tile" for="16:30">
                                                <span class="radio-label">16:30</span>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper-16 mt-2">
                                            <Field type="radio" class="radio-input" id="17:00" name="time" value="17:00"
                                                v-model="appointmentLocal.time" :disabled="disabledRaido('17:00')"
                                                required />
                                            <label class="radio-tile" for="17:00">
                                                <span class="radio-label">17:00</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <ErrorMessage name="time" class="error-feedback" style="color: rgb(238, 15, 15);" />
                            </div>

                            <div class="mt-3 mt-3">
                                <div class="row">
                                    <div class="col-12 col-md-5">
                                        <input type="text" class="form-control" v-model.trim="captchaInput"
                                            placeholder="Nhập mã bảo vệ" name="captcha">
                                    </div>
                                    <div class="col-12 col-md-3">
                                        <div class="d-flex">
                                            <img :src="captchaImage" alt="Captcha">
                                            <button type="button" class="btn btn-light" @click="refreshCaptcha"><i
                                                    class="fa-solid fa-rotate"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3 mt-3 d-flex justify-content-center">
                                <div class="btn-submit d-flex justify-content-center">
                                    <button type="submit" class="btn-search">Xác nhận</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PatientService from "@/services/patient.service";
import AppointmentService from "@/services/appointment.service";
import RoomService from "@/services/room.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { debounce } from 'lodash';
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const appointmentFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập họ và tên.")
                .min(8, "Tên phải có ít nhất 8 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            phoneNumber: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(
                    /((09|03|07|08|05|01)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            gender: yup
                .string()
                .required("Vui lòng chọn giới tính."),
            year: yup
                .string()
                .required("Hãy nhập vào năm sinh")
                .test("valid-year", "Năm sinh không hợp lệ", (value) => {
                    return value > 1800 && value < new Date().getFullYear();
                }),
            address: yup
                .string()
                .required("Vui lòng nhập địa chỉ."),
            service: yup
                .string()
                .required("Vui lòng chọn loại dịch vụ."),
            type: yup
                .string()
                .required("Vui lòng chọn loại khám."),
            doctor: yup
                .string()
                .required("Vui lòng chọn bác sĩ."),
            day: yup
                .string()
                .required("Vui lòng chọn ngày khám bệnh")
                .test('is-future-date', 'Vui lòng đăng kí trước ít nhất 1 ngày ', function (value) {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    return selectedDate > currentDate;
                }),
            time: yup
                .string()
                .required("Vui lòng chọn giờ")
        });
        return {
            loadingInput: false,
            loading: false,
            disabled: false,
            captchaInput: '',
            captchaCode: '',
            captchaImage: '',
            rooms: [],
            doctorsByService: [],
            appointmentDatas: [],
            appointmentLocal: {
                MSTN: "",
                name: "",
                phoneNumber: "",
                gender: "",
                address: "",
                service: "",
                type: "",
                doctor: "",
                room: "",
                day: "",
                time: "",
                confirmer: "",
                confirm: "no",
                lastUpdated: this.getLastUpdated(),
            },
            appointmentFormSchema,

        };
    },
    computed: {
        filteredServices() {
            if (this.rooms.length > 0) {
                const dataRoom = this.rooms.filter(item => item.dichVu != '' && item.doctor != '');
                const uniqueServices = new Set(dataRoom.map(item => item.dichVu));
                return [...uniqueServices];
            }
            return [];
        },

    },
    methods: {
        handlePhoneNumberInput: debounce(async function () {
            if (this.appointmentLocal.phoneNumber.length === 10) {
                const phoneNumber = this.appointmentLocal.phoneNumber;
                const patientData = await this.getPatientByPhoneNumber(phoneNumber);
                if (patientData && patientData.length > 0) {
                    this.disabled = true;
                    const patient = patientData[0];
                    this.appointmentLocal = {
                        ...this.appointmentLocal,
                        name: patient.name ?? this.appointmentLocal.name,
                        gender: patient.gender ?? this.appointmentLocal.gender,
                        year: patient.year ?? this.appointmentLocal.year,
                        address: patient.address ?? this.appointmentLocal.address
                    };
                } else {
                    this.disabled = false;
                }
            }
        }, 4000),
        async getPatientByPhoneNumber(phoneNumber) {
            try {
                this.loadingInput = true;
                return await PatientService.getPatientByPhoneNumber(phoneNumber);
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingInput = false;
            }
        },
        disabledRaido(time) {
            const disabledMap = {};
            const currentDay = new Date();
            const appointmentDate = new Date(this.appointmentLocal.day);
            if (appointmentDate < currentDay || appointmentDate.getDay() === 0) {
                return true;
            }
            this.appointmentDatas.forEach(app => {
                if (app.confirm !== "cancel" && app.day === this.appointmentLocal.day && app.doctor === this.appointmentLocal.doctor) {
                    disabledMap[app.time] = true;
                }
            });
            return disabledMap[time] || false;
        },

        async retrieveAppointment() {
            try {
                this.appointmentDatas = await AppointmentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        getLastUpdated() {
            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            return `${hours}:${minutes}, ${day}/${month}/${year}`;
        },
        async retrieveRoom() {
            try {
                this.rooms = await RoomService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        getDoctorsByService(service) {
            const roomsWithService = this.rooms.filter(room => room.dichVu === service);
            this.doctorsByService = roomsWithService.map(room => room.bacSiChinh);
        },
        updateMaPhong() {
            const selectedDoctor = this.rooms.find(room => room.bacSiChinh === this.appointmentLocal.doctor);
            if (selectedDoctor) {
                this.appointmentLocal.room = selectedDoctor.maPhong;
            }
        },
        updateDoctors() {
            this.appointmentLocal.doctor = "";
            this.appointmentLocal.room = "";
            this.appointmentLocal.day = "";
            this.appointmentLocal.time = "";
            this.getDoctorsByService(this.appointmentLocal.service);
        },
        calculateAge(year) {
            const currentYear = new Date().getFullYear();
            return currentYear - year;
        },
        refreshCaptcha() {
            const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let captcha = '';
            for (let i = 0; i < 6; i++) {
                captcha += chars[Math.floor(Math.random() * chars.length)];
            }
            this.captchaCode = captcha;
            this.captchaImage = `https://via.placeholder.com/150x40?text=${captcha}`;
        },
        async submitAppointment() {
            if (this.captchaInput) {
                if (this.captchaInput.toLowerCase() === this.captchaCode.toLowerCase()) {
                    await this.createAppointment(this.appointmentLocal);
                    this.refreshCaptcha();
                    this.captchaInput = "";
                } else {
                    this.refreshCaptcha();
                    this.captchaInput = "";
                    toast.warn("Mã bảo vệ không đúng.");
                }
            } else {
                this.refreshCaptcha();
                toast.warn("Vui lòng nhập mã bảo vệ");
            }
        },
        async createAppointment(data) {
            Swal.fire({
                title: "Bạn chắn chắn muốn đặt lịch khám này?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (data.time != '') {
                            await AppointmentService.create(data);
                            Swal.fire({
                                icon: "success",
                                title: "Đặt lịch khám thành công. Chúng tôi sẽ gọi lại để xác nhận sau!",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.$router.push({ name: 'trangchu' });
                        } else {
                            toast.warn("Vui lòng chọn giờ cụ thể")
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },
    },
    async created() {
        this.loading = true;
        try {
            await this.retrieveAppointment();
            await this.retrieveRoom();
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        };

        // const urlParams = new URLSearchParams(window.location.search);
        // const doctor = urlParams.has('doctor') ? urlParams.get('doctor') : null;
        // console.log(doctor);

        this.refreshCaptcha();

        setInterval(() => {
            this.refreshCaptcha();
        }, 60000);
    }
}
</script>

<style scoped>
.form__search {
    padding: 16px 45px 30px;
    box-shadow: 0px 30px 40px #00405315;
    border-radius: 29px;
    background: #fff
}

.btn-submit {
    margin: 20px 0;
}

.main-content {
    padding: 20px 0 50px 0;
}

p {
    font-size: 15px;
    margin-bottom: 5px !important;
}

table {
    font-size: 15px;
}

h1 {
    font-family: ui-monospace;
}

h4 {
    padding: 10px 0;
}

a {
    text-decoration: none;
}

.guide img {
    height: auto;
    width: 100%;
}

@media screen and (max-width: 575px) {

    strong,
    p,
    table {
        font-size: x-small;
    }

    h4 {
        font-size: medium;
    }
}

/* ----------------- SKELETEN LOADING -------------------- */
.form-control-loading {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    height: 38px;
    background:
        linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: l1 1.5s infinite linear;
}

@keyframes l1 {
    0% {
        background-position: right
    }
}

/* ----------------- LOADING -------------------- */
.loader {
    margin: 30px 0;
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

/* ----------------------- BTN ----------------------------- */
.btn-search {
    outline: none;
    cursor: pointer;
    width: 150px;
    height: 50px;
    background-image: linear-gradient(to top, #D8D9DB 0%, #fff 80%, #FDFDFD 100%);
    border-radius: 30px;
    border: 1px solid #8F9092;
    transition: all 0.2s ease;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #606060;
    text-shadow: 0 1px #fff;
}

.btn-search:hover {
    box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
}

.btn-search:active {
    box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}

/* ------------------------ RADIO ------------------------  */
.radio-wrapper-16 *,
.radio-wrapper-16 *:after,
.radio-wrapper-16 *:before {
    box-sizing: border-box;
}

.radio-wrapper-16 .radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.radio-wrapper-16 .radio-input:checked+.radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
}

.radio-wrapper-16 .radio-input:checked+.radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
    color: #fff;
    content: "✓";
}

.radio-wrapper-16 .radio-input:checked+.radio-tile .radio-wrapper-16 .radio-input:checked+.radio-tile .radio-label {
    color: #2260ff;
}

.radio-wrapper-16 .radio-input:focus+.radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.radio-wrapper-16 .radio-input:focus+.radio-tile:before {
    transform: scale(1);
    opacity: 1;
}

.radio-wrapper-16 .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 4rem;
    min-height: 4rem;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
}

.radio-wrapper-16 .radio-tile:before {
    content: "";
    font-size: 12px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #b5bfd9;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
}

.radio-wrapper-16 .radio-tile:hover {
    border-color: #2260ff;
}

.radio-wrapper-16 .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
}

.radio-wrapper-16 .radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
}

.radio-wrapper-16 .radio-input:disabled+.radio-tile {
    cursor: not-allowed;
    background-color: #f0f0f0;
    border-color: #b5bfd9;
    color: #a0a0a0;
}

.radio-wrapper-16 .radio-input:disabled+.radio-tile .radio-label {
    color: #a0a0a0;
}

.radio-wrapper-16 .radio-input:disabled+.radio-tile:hover {
    border-color: #b5bfd9;
    background-color: #f0f0f0;
}

.radio-wrapper-16 .radio-input:disabled+.radio-tile:hover:before {
    opacity: 0;
}

@media screen and (max-width: 450px) {
    .radio-wrapper-16 .radio-tile {
        width: 3.2rem !important;
        min-height: 3.2rem !important;
    }
}
</style>