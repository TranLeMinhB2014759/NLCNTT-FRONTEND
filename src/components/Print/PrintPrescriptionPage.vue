<template>
    <div  v-if="medicalrecord" class="container">
        <div class="row">
            <div class="d-flex col-8">
                <div class="text-start">
                    <img src="@/assets/images/logo.png" class="rounded" width="100" height="100" alt="Logo">
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div class="text-start">
                    <strong>PHÒNG KHÁM DA LIỄU</strong>
                    <p>Thới Bình 1, Thuận An, Thốt Nốt, Cần Thơ.</p>
                    <p>SĐT: 0939 111 333</p>
                </div>
            </div>
            <div class="col-4">
                <div class="text-end">
                    <strong>MSBN</strong>
                    <p>{{ medicalrecord.MSBN }}</p>
                </div>
                <div class="text-end">
                    <strong>MSHS</strong>
                    <p>{{ medicalrecord.MSHS }}</p>
                </div>
            </div>
        </div>
        <h4 class="text-center">ĐƠN THUỐC</h4>
        <div class="row">
            <div class="col-3">
                <p>Họ tên:</p>
            </div>
            <div class="col-9">
                <p><strong>{{ medicalrecord.name }}</strong></p>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <p>Năm sinh:</p>
            </div>
            <div class="col-4">
                <p>{{ calculateAge(medicalrecord.year) }} Tuổi ({{ medicalrecord.year }})</p>
            </div>
            <div class="col-3 text-end">
                <p>Giới tính:</p>
            </div>
            <div class="col-2">
                <p>{{ medicalrecord.gender }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <p>Địa chỉ:</p>
            </div>
            <div class="col-5">
                <p>{{ medicalrecord.address }}</p>
            </div>
            <div class="col-2 text-end">
                <p>SĐT:</p>
            </div>
            <div class="col-2">
                <p>{{ maskedPhoneNumber }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <p>Triệu chứng:</p>
            </div>
            <div class="col-9">{{ medicalrecord.symptom }}</div>
        </div>

        <div class="row">
            <div class="col-3">
                <p>Chẩn đoán:</p>
            </div>
            <div class="col-9">
                <span v-for="(record, index) in medicalrecord.diagnosis" :key="index">
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
            <tbody v-for="(record, index) in medicalrecord.prescription" :key="index">
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
                <img v-if="medicalrecord.status === 'sold'" class="soldout" :src="'/src/assets/images/soldout.jpg'" alt="SoldOut">
            </div>
            <div class="text-center">
                <p>Cần Thơ, {{ medicalrecord.ngayKham }}</p>
                <p>Bác sĩ điều trị</p>
                <strong>{{ medicalrecord.bacsi }}</strong>
            </div>
        </div>
        <div class="footer d-flex justify-content-center">
            <button class="print-btn" @click="printDocument">
                <span class="printer-wrapper">
                    <span class="printer-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 92 75">
                            <path stroke-width="5" stroke="black"
                                d="M12 37.5H80C85.2467 37.5 89.5 41.7533 89.5 47V69C89.5 70.933 87.933 72.5 86 72.5H6C4.067 72.5 2.5 70.933 2.5 69V47C2.5 41.7533 6.75329 37.5 12 37.5Z">
                            </path>
                            <mask fill="white" id="path-2-inside-1_30_7">
                                <path d="M12 12C12 5.37258 17.3726 0 24 0H57C70.2548 0 81 10.7452 81 24V29H12V12Z">
                                </path>
                            </mask>
                            <path mask="url(#path-2-inside-1_30_7)" fill="black"
                                d="M7 12C7 2.61116 14.6112 -5 24 -5H57C73.0163 -5 86 7.98374 86 24H76C76 13.5066 67.4934 5 57 5H24C20.134 5 17 8.13401 17 12H7ZM81 29H12H81ZM7 29V12C7 2.61116 14.6112 -5 24 -5V5C20.134 5 17 8.13401 17 12V29H7ZM57 -5C73.0163 -5 86 7.98374 86 24V29H76V24C76 13.5066 67.4934 5 57 5V-5Z">
                            </path>
                            <circle fill="black" r="3" cy="49" cx="78"></circle>
                        </svg>
                    </span>

                    <span class="printer-page-wrapper">
                        <span class="printer-page"></span>
                    </span>
                </span>
                Print
            </button>
        </div>
    </div>
    <div class="d-flex justify-content-center" v-else>
        <span class="loader"></span>
    </div>
</template>

<script>
import medicalrecordService from "@/services/medicalrecord.service";

export default {
    props: {
        idmedicalrecord: { type: String, required: true }
    },
    data() {
        return {
            medicalrecord: null,
            printing: false,
        };
    },
    created() {
        this.fetchmedicalrecord();
    },

    methods: {
        async fetchmedicalrecord() {
            try {
                this.medicalrecord = await medicalrecordService.get(this.idmedicalrecord);
            } catch (error) {
                console.error("Error fetching medical record:", error);
            }
        },
        printDocument() {
            this.printing = true;
            window.print();
            this.printing = false;
        },
        calculateAge(year) {
            const currentYear = new Date().getFullYear();
            return currentYear - year;
        },
    },
    computed: {
        maskedPhoneNumber() {
            if (!this.medicalrecord || !this.medicalrecord.phoneNumber) return '';
            const phoneNumber = this.medicalrecord.phoneNumber.toString();
            const visibleDigits = phoneNumber.substring(0, 2) + '******' + phoneNumber.substring(phoneNumber.length - 3);
            return visibleDigits;
        }
    }
};
</script>

<style scoped>
@media print {
    .footer {
        visibility: hidden;
    }
}

h4 {
    padding: 10px 0;
}

p {
    font-size: 15px;
    margin-bottom: 5px !important;
}

table {
    font-size: 15px;
}

.soldout{
    max-width: 100px;
    max-height: 100px;
}

/* ---------------- BTN PRINT -------------------- */
.print-btn {
    width: 100px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 10px;
    gap: 10px;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
    font-weight: 500;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.065);
    transition: all 0.3s;
}

.printer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 100%;
}

.printer-container {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.printer-container svg {
    width: 100%;
    height: auto;
    transform: translateY(4px);
}

.printer-page-wrapper {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.printer-page {
    width: 70%;
    height: 10px;
    border: 1px solid black;
    background-color: white;
    transform: translateY(0px);
    transition: all 0.3s;
    transform-origin: top;
}

.print-btn:hover .printer-page {
    height: 16px;
    background-color: rgb(239, 239, 239);
}

.print-btn:hover {
    background-color: rgb(239, 239, 239);
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