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
            <div class="col-12 col-md-3 guide">
                <img src="/src/assets/images/huong-dan-lay-ma-ho-so.png" alt="Hướng dẫn lấy mã hồ sơ">
            </div>
            <div class="col-12 col-md-9">
                <h1 class="text-center">Tra cứu đơn thuốc</h1>
                <div class="form__search">
                    <div class="form__top">
                        <form @submit.prevent="onSubmit">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" v-model.trim="MSHSInput"
                                        placeholder="Nhập vào mã số hồ sơ" name="MSHS">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" v-model.trim="phoneNumberInput"
                                        placeholder="Nhập vào số điện thoại" name="phoneNumber">
                                </div>
                            </div>
                            <div class="btn-submit text-center">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="d-flex justify-content-center" v-if="isLoading">
                    <span class="loader"></span>
                </div>
                <div class="prescription" v-else-if="medicalrecord.length > 0">
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
                        <div class="col-9">{{ medicalrecord[0].symptom }}</div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Chẩn đoán:</p>
                        </div>
                        <div class="col-9">
                            <span v-for="(record, index) in medicalrecord[0].diagnosis" :key="index">
                                ({{ record.code }}) {{ record.tenBenh }}.
                            </span>
                        </div>
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
        }
    },
    methods: {
        async retrieveRecordByMSHS() {
            try {
                this.isLoading = true;
                const data = await MedicalrecordService.getRecordByMSHS(this.MSHSInput);
                if (data.length <= 0) {
                    this.medicalrecord = [];
                    toast.warn("Không tìm thấy mã đơn thuốc");
                } else if (data.length > 0 && data[0].phoneNumber != this.phoneNumberInput) {
                    this.medicalrecord = [];
                    toast.warn("Số điện thoại không khớp");
                } else {
                    this.medicalrecord = data;
                    toast.success("Đã tìm thấy đơn thuốc");
                }
            } catch (error) {
                console.log(error);
                toast.error("Đã có lỗi xảy ra");
            } finally {
                this.isLoading = false;
            }
        },
        onSubmit() {
            if (this.MSHSInput && this.phoneNumberInput) {
                this.retrieveRecordByMSHS();
            } else {
                toast.warn("Vui lòng nhập số điện thoại và mã số hồ sơ.");
            }
        },
        calculateAge(year) {
            const currentYear = new Date().getFullYear();
            return currentYear - year;
        },
    },
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

h1 {
    font-family: ui-monospace;
}

a {
    text-decoration: none;
}

.guide {
    border-right: 1px solid;
}

.guide img {
    border: 1px solid;
    height: auto;
    width: 100%;
}

.prescription {
    margin: 20px 0;
    padding: 50px 80px;
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