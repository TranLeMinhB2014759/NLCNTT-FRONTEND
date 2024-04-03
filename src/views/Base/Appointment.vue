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
                                        <Field name="name" type="text" class="form-control" v-model="appointmentLocal.name" required placeholder="Trần Văn A" />
                                        <ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="phoneNumber">Số điện thoại: <span class="text-danger">(Yêu cầu)</span></label>
                                        <Field name="phoneNumber" type="text" class="form-control" v-model="appointmentLocal.phoneNumber" required
                                            placeholder="0123456789 (10 chữ số)" />
                                        <ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>
                            <h5>Thông tin cuộc hẹn</h5>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="service">Chọn dịch vụ: <span class="text-danger">(Yêu cầu)</span></label>
                                        <Field as="select" name="service" class="form-control" v-model="appointmentLocal.service" required @change="updateDoctors">
                                            <option v-for="service in filteredServices" :key="service" :value="service"> {{ service }} </option>
                                        </Field>
                                        <ErrorMessage name="service" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="type">Chọn loại khám: <span class="text-danger">(Yêu cầu)</span></label>
                                        <Field as="select" name="type" class="form-control"
                                            v-model="appointmentLocal.type" required>
                                            <option value="Khám bệnh">Khám bệnh - 50.000₫</option>
                                            <option value="Khám đặc biệt">Khám đặc biệt - 100.000₫</option>
                                        </Field>
                                        <ErrorMessage name="type" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="doctor">Chọn bác sĩ: <span class="text-danger">(Yêu cầu)</span></label>
                                        <Field as="select" name="doctor" class="form-control"
                                            v-model="appointmentLocal.doctor" required @change="updateMaPhong">
                                            <option v-for="doctor in doctorsByService" :key="doctor" :value="doctor"> {{ doctor }} </option>
                                        </Field>
                                        <ErrorMessage name="doctor" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="mb-3 mt-3">
                                        <label for="room">Phòng:</label>
                                        <Field name="room" class="form-control" v-model="appointmentLocal.room" required placeholder="Hãy chọn bác sĩ" disabled />
                                        <Field name="room" v-model="appointmentLocal.room" required hidden />
                                        <ErrorMessage name="room" class="error-feedback" style="color: rgb(238, 15, 15);" />
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3 mt-3">
                                <label for="day">Chọn ngày: <span class="text-danger">(Yêu cầu)</span></label>
                                <Field name="day" type="date" class="form-control" v-model="appointmentLocal.day" required placeholder="Hãy chọn bác sĩ" />
                                <ErrorMessage name="day" class="error-feedback" style="color: rgb(238, 15, 15);" />
                            </div>

                            <div class="mt-3 mt-3">
                                <div class="row">
                                    <div class="col-12 col-md-5">
                                        <input type="text" class="form-control" v-model.trim="captchaInput" placeholder="Nhập mã bảo vệ" name="captcha">
                                    </div>
                                    <div class="col-12 col-md-3">
                                        <div class="d-flex">
                                            <img :src="captchaImage" alt="Captcha">
                                            <button type="button" class="btn btn-light" @click="refreshCaptcha"><i class="fa-solid fa-rotate"></i></button>
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
import AppointmentService from "@/services/appointment.service";
import RoomService from "@/services/room.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
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
        });
        return {
            captchaInput: '',
            captchaCode: '',
            captchaImage: '',
            rooms: [],
            doctorsByService: [],
            appointmentLocal: {
                name: "",
                phoneNumber: "",
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
                        await AppointmentService.create(data);
                        Swal.fire({
                            icon: "success",
                            title: "Đặt lịch khám thành công. Chúng tôi sẽ gọi lại để xác nhận sau!",
                            showConfirmButton: true,
                            timer: 2000
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },
    },
    created() {
        this.retrieveRoom();
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

.prescription {
    margin: 20px 0;
    padding: 50px 100px;
    border: 1px solid;
    border-radius: 8px;
    min-height: 100vh;
}

.prescription-empty {
    margin: 20px 0;
    padding: 50px 80px;
    border: 1px solid;
    border-radius: 8px;
}

.soldout {
    max-width: 100px;
    max-height: 100px;
}

@media screen and (max-width: 575px) {
    .prescription {
        margin: 20px 0;
        padding: 50px 60px;
        border: 1px solid;
        border-radius: 8px;
        min-height: 100vh;
    }

    strong,
    p,
    table {
        font-size: x-small;
    }

    h4 {
        font-size: medium;
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
</style>