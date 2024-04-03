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
            <div class="col-12 col-lg-4 guide">
                <h3 class="text-center">Hướng dẫn tìm mã đơn thuốc</h3>
                <img src="/src/assets/images/huong-dan-lay-ma-ho-so.png" alt="Hướng dẫn lấy mã hồ sơ">
            </div>
            <div class="col-12 col-lg-8">
                <h1 class="text-center">Tra cứu đơn thuốc</h1>
                <div class="form__search">
                    <div class="form__top">
                        <form @submit.prevent="onSubmit">
                            <div class="mt-3">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim="MSHSInput"
                                            @input="formatNumber" placeholder="Nhập vào mã số đơn thuốc" name="MSHS">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim="phoneNumberInput"
                                            placeholder="Nhập vào số điện thoại" name="phoneNumber">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="row">
                                    <div class="col-5">
                                        <input type="text" class="form-control" v-model.trim="captchaInput"
                                            placeholder="Nhập mã bảo vệ" name="captcha">
                                    </div>
                                    <div class="col-3">
                                        <div class="d-flex">
                                            <img :src="captchaImage" alt="Captcha">
                                            <button type="button" class="btn btn-light" @click="refreshCaptcha"><i
                                                    class="fa-solid fa-rotate"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-submit d-flex justify-content-center">
                                    <button type="submit" class="btn-search"><i
                                            class="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="d-flex justify-content-center" v-if="isLoading">
                    <span class="loader"></span>
                </div>
                <div class="prescription" v-else-if="medicalrecord.length > 0">
                    <div class="row">
                        <div class="col-8">
                            <div class="text-start">
                                <strong>PHÒNG KHÁM DA LIỄU</strong>
                                <p>Thới Bình 1, Thuận An, Thốt Nốt, Cần Thơ.</p>
                                <p>SĐT: 0939 111 333</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-end">
                                <strong>MSBN</strong>
                                <p>{{ medicalrecord[0].MSBN }}</p>
                            </div>
                            <div class="text-end">
                                <strong>MSHS</strong>
                                <p>{{ medicalrecord[0].MSHS }}</p>
                            </div>
                        </div>
                    </div>
                    <h4 class="text-center">ĐƠN THUỐC</h4>
                    <div class="row">
                        <div class="col-3">
                            <p>Họ tên:</p>
                        </div>
                        <div class="col-9">
                            <p><strong>{{ medicalrecord[0].name }}</strong></p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Năm sinh:</p>
                        </div>
                        <div class="col-4">
                            <p>{{ calculateAge(medicalrecord[0].year) }} Tuổi ({{ medicalrecord[0].year }})</p>
                        </div>
                        <div class="col-3 text-end">
                            <p>Giới tính:</p>
                        </div>
                        <div class="col-2">
                            <p>{{ medicalrecord[0].gender }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Địa chỉ:</p>
                        </div>
                        <div class="col-5">
                            <p>{{ medicalrecord[0].address }}</p>
                        </div>
                        <div class="col-2 text-end">
                            <p>SĐT:</p>
                        </div>
                        <div class="col-2">
                            <p>{{ medicalrecord[0].phoneNumber }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Triệu chứng:</p>
                        </div>
                        <p class="col-9">{{ medicalrecord[0].symptom }}</p>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Chẩn đoán:</p>
                        </div>
                        <p class="col-9">
                            <span v-for="(record, index) in medicalrecord[0].diagnosis" :key="index">
                                ({{ record.code }}) {{ record.tenBenh }}.
                            </span>
                        </p>
                    </div>

                    <p>Thuốc điều trị:</p>
                    <table class="table table-bordered table-sm text-center">
                        <thead class="table-success">
                            <tr>
                                <th>STT</th>
                                <th>Tên thuốc</th>
                                <th>ĐVT</th>
                                <th>SL</th>
                            </tr>
                        </thead>
                        <tbody v-for="(record, index) in medicalrecord[0].prescription" :key="index">
                            <tr>
                                <td>{{ index + 1 }}</td>
                                <td class="text-start">{{ record.tenThuoc }}</td>
                                <td>{{ record.Donvi }}</td>
                                <td>{{ record.SoLuongBan }}</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-start">
                                    {{ record.HDSD }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around">
                        <div class="text-center">
                            <p>Tái khám nhớ mang theo đơn thuốc này!</p>
                            <img v-if="medicalrecord[0].status === 'sold'" class="soldout"
                                :src="'/src/assets/images/soldout.jpg'" alt="SoldOut">
                        </div>
                        <div class="text-center">
                            <p>Cần Thơ, {{ medicalrecord[0].ngayKham }}</p>
                            <p>Bác sĩ điều trị</p>
                            <strong>BS. {{ medicalrecord[0].bacsi }}</strong>
                        </div>
                    </div>
                </div>
                <div class="text-center prescription-empty" v-else>
                    <p>Không tìm thấy đơn thuốc.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MedicalrecordService from "@/services/medicalrecord.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            medicalrecord: [],
            MSHSInput: '',
            phoneNumberInput: '',
            isLoading: false,
            captchaInput: '',
            captchaCode: '',
            captchaImage: ''
        }
    },
    methods: {
        formatNumber() {
            // Nếu vị trí đầu là khác 0 thì bỏ qua
            if (this.MSHSInput.length === 5 && this.MSHSInput[0] === '0') {
                //Nếu vị trí thứ 5 nhập vào không phải là dấu "." thì thêm dấu chấm vào vị trí thứ 5
                if (!this.MSHSInput.includes('.') && this.MSHSInput[4] !== '.') {
                    this.MSHSInput = this.MSHSInput.slice(0, 4) + '.' + this.MSHSInput.slice(4);
                }
            }
        },

        async retrieveRecordByMSHS() {
            try {
                this.isLoading = true;
                const data = await MedicalrecordService.getRecordByMSHS(this.MSHSInput);
                if (data.length <= 0) {
                    this.medicalrecord = [];
                    toast.warn("Không tìm thấy mã đơn thuốc. Lưu ý: bao gồm cả dấu chấm");
                } else if (data.length > 0 && data[0].phoneNumber != this.phoneNumberInput) {
                    this.medicalrecord = [];
                    toast.warn("Số điện thoại không khớp");
                } else {
                    this.medicalrecord = data;
                    toast.success("Đã tìm thấy đơn thuốc");
                    window.scrollTo({
                        top: window.scrollY + 550,
                        behavior: 'smooth',
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Đã có lỗi xảy ra");
            } finally {
                this.isLoading = false;
            }
        },
        onSubmit() {
            if (this.MSHSInput && this.phoneNumberInput && this.captchaInput) {
                if (this.captchaInput.toLowerCase() === this.captchaCode.toLowerCase()) {
                    this.retrieveRecordByMSHS();
                    this.refreshCaptcha();
                    this.captchaInput = "";
                } else {
                    this.refreshCaptcha();
                    this.captchaInput = "";
                        this.appointmentLocal = "";
                    toast.warn("Mã bảo vệ không đúng.");
                }
            } else {
                this.refreshCaptcha();
                toast.warn("Vui lòng nhập đầy đủ thông tin");
            }
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
    },
    created() {
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
    margin-top: 30px;
    font-family: ui-monospace;
}

h4 {
    padding: 10px 0;
}

a {
    text-decoration: none;
}

.guide img {
    border: 1px solid;
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