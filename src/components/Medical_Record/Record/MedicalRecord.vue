<template>
    <div class="back">
        <router-link :to="{ name: 'admin-patient' }">
            <button class="button-back">
                <div class="button-box">
                    <span class="button-elem">
                        <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                            </path>
                        </svg>
                    </span>
                    <span class="button-elem">
                        <svg viewBox="0 0 46 40">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                            </path>
                        </svg>
                    </span>
                </div>
            </button>
        </router-link>
    </div>
    <h1 class="h3 mb-3"><strong>Thông tin bệnh nhân</strong></h1>
    <div class="card">
        <div class="card-body">
            <div>
                <div v-if="patient">
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <h2>{{ patient.name }}</h2>
                        </div>
                        <div class="col-12 col-md-5"><strong>MSBN:</strong> {{ patient.MSBN }}</div>
                    </div>

                    <div class="row">
                        <div class="col-6 col-md-2"><strong>Tuổi:</strong> {{ calculateAge(patient.year) }} ({{
            patient.year }})</div>
                        <div class="col-6 col-md-2"><strong>Giới tính:</strong> {{ patient.gender }}</div>
                        <div class="col-12 col-md-3"><strong>Số điện thoại:</strong> {{ patient.phoneNumber }}</div>
                        <div class="col-12 col-md-5"><strong>Địa chỉ:</strong> {{ patient.address }}</div>
                    </div>
                </div>

                <div v-else>
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>

    <h1 class="h3 mt-5"><strong>Hồ Sơ Bệnh Án</strong></h1>
    <div class="card">
        <div class="card-body">
            <button title="Add" class="cssbuttons-io-button" @click="goToAddRecord(patient._id)">
                <svg height="25" width="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
                <span>Add</span>
            </button>
            <div class="row">
                <div class="container col-12 col-sm-4">
                    <InputSearch v-model="searchText" />
                </div>
                <div class="col-sm-8">

                </div>
            </div>
            <div class="container mt-3 table-responsive">
                <table class="table table-bordered table-hover table-responsive text-center"
                    v-if="filteredMedicalrecordsCount > 0" :medicalrecords="filteredMedicalrecords">
                    <thead class="table-success">
                        <tr>
                            <th>Mã hồ sơ</th>
                            <th>Bác sĩ điều trị</th>
                            <th>Ngày khám</th>
                            <th>Triệu chứng</th>
                            <th>Chẩn đoán</th>
                            <th>Dịch vụ</th>
                            <th>Toa thuốc</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(medicalrecord, index) in filteredMedicalrecords.slice().reverse()" :key="index">
                            <td>
                                {{ medicalrecord.MSHS }}
                                <button type="button" class="btn btn-sm btn-secondary"
                                    @click="copy(medicalrecord.MSHS)">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </td>
                            <td>BS. {{ medicalrecord.bacsi }}</td>
                            <td>{{ medicalrecord.ngayKham }}</td>
                            <td>{{ medicalrecord.symptom }}</td>
                            <td>
                                <span v-for="(medicalrecord, index) in medicalrecord.diagnosis" :key="index">
                                    ({{ medicalrecord.code }}) {{ medicalrecord.tenBenh }}<br>
                                </span>
                            </td>
                            <td>
                                <button type="button" class="ml-2 btn btn-info" data-bs-toggle="modal"
                                    :data-bs-target="'#modalService_' + index">
                                    <i class="fa-regular fa-clipboard fa-lg"></i>
                                </button>
                                <div class="modal fade" :id="'modalService_' + index">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Chi tiết</h4>
                                                <button type="button" class="btn-close"
                                                    data-bs-dismiss="modal"></button>
                                            </div>

                                            <div class="modal-body">
                                                <h4 class="modal-title" style="padding-bottom: 10px;">DỊCH VỤ ĐÃ SỬ DỤNG</h4>
                                                <table class="table table-bordered">
                                                    <thead class="table-success">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã dịch vụ</th>
                                                            <th>Dịch vụ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(medicalrecord, idx) in medicalrecord.service" :key="idx">
                                                            <td rowspan="2">{{ idx + 1 }}</td>
                                                            <td>{{ medicalrecord.code }}</td>
                                                            <td>{{ medicalrecord.tenDichVu }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button type="button" class="ml-2 btn btn-info" data-bs-toggle="modal"
                                    :data-bs-target="'#modalPrescription_' + index">
                                    <i class="fa-solid fa-file-medical fa-lg"></i>
                                </button>
                                <div class="modal fade" :id="'modalPrescription_' + index">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Chi tiết</h4>
                                                <button type="button" class="btn-close"
                                                    data-bs-dismiss="modal"></button>
                                            </div>

                                            <div class="modal-body">
                                                <h4 class="modal-title" style="padding-bottom: 10px;">ĐƠN THUỐC</h4>
                                                <div class="d-flex">
                                                    <div class="text-start">
                                                        <p>Họ tên:</p>
                                                        <p>Năm sinh:</p>
                                                        <p>Địa chỉ:</p>
                                                        <p>Triệu chứng:&nbsp</p>
                                                        <p>Chẩn đoán:</p>
                                                    </div>
                                                    <div class="text-start">
                                                        <p><strong>{{ medicalrecord.name }}</strong></p>
                                                        <p>{{ calculateAge(medicalrecord.year) }} Tuổi ({{ medicalrecord.year }})</p>
                                                        <p>{{ medicalrecord.address }}</p>
                                                        <p>{{ medicalrecord.symptom }}</p>
                                                        <p>
                                                            <span
                                                                v-for="(medicalrecord, idx) in medicalrecord.diagnosis"
                                                                :key="idx">
                                                                ({{ medicalrecord.code }}) {{ medicalrecord.tenBenh
                                                                }}<br>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <table class="table table-bordered">
                                                    <thead class="table-success">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Tên thuốc</th>
                                                            <th>ĐVT</th>
                                                            <th>SL</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-for="(medicalrecord, idx) in medicalrecord.prescription"
                                                        :key="idx">
                                                        <tr>
                                                            <td rowspan="2">{{ idx + 1 }}</td>
                                                            <td class="text-start">{{ medicalrecord.tenThuoc }}</td>
                                                            <td>{{ medicalrecord.Donvi }} </td>
                                                            <td>{{ medicalrecord.SoLuongBan }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="4" class="text-start">
                                                                {{ medicalrecord.HDSD }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="d-flex">
                                                    <div class="text-start justify-content-start">
                                                        <p>Tái khám nhớ mang theo đơn thuốc này!</p>
                                                        <img v-if="medicalrecord.status === 'sold'" class="soldout"
                                                            :src="'/src/assets/images/soldout.jpg'" alt="SoldOut">
                                                    </div>
                                                    <div class="justify-content-end">
                                                        <p>Cần Thơ, {{ medicalrecord.ngayKham }}</p>
                                                        <p>Bác sĩ điều trị</p>
                                                        <strong>BS. {{ medicalrecord.bacsi }}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="modal-footer">
                                                <router-link
                                                    :to="{ name: 'PrintPrescription', params: { idmedicalrecord: medicalrecord._id } }"
                                                    target="_blank">
                                                    <button type="button" class="btn btn-primary"
                                                        data-bs-dismiss="modal">Preview</button>
                                                </router-link>
                                                <button type="button" class="btn btn-danger"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>                 
                            <td v-if="medicalrecord.status === 'unsold'">
                                <span v-if="getCurrentDoctor() === medicalrecord.bacsi">
                                    <button type="button" class="ml-2 btn btn-danger"
                                        @click="deleteMedicalrecord(medicalrecord._id)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </span>
                                <span v-else>
                                    <button type="button" class="ml-2 btn btn-danger" disabled>
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </span>
                            </td>
                            <td v-else class="justify-content-center">
                                <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đã thanh toán
                                </h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>Không tìm thấy hồ sơ phù hợp.</p>
            </div>
        </div>
    </div>
</template>

<script>
import PatientService from "@/services/patient.service";
import MedicalrecordService from "@/services/medicalrecord.service";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
    components: {
        InputSearch,
    },
    props: {
        id: String
    },

    data() {
        return {
            patient: [],
            medicalrecords: [],
            message: "",
            searchText: "",
        };
    },

    computed: {
        medicalrecordStrings() {
            return this.medicalrecords.map((medicalrecord) => {
                const { bacsi, symptom, diagnosis, ngayKham } = medicalrecord;
                return [bacsi, symptom, diagnosis, ngayKham].join("");
            });
        },
        filteredMedicalrecords() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!searchTextLower) return this.medicalrecords;
            return this.medicalrecords.filter((_medicalrecord, index) =>
                this.medicalrecordStrings[index].toLowerCase().includes(searchTextLower)
            );
        },
        filteredMedicalrecordsCount() {
            return this.filteredMedicalrecords.length;
        },
        patientAges() {
            return this.patients.map((patient) => this.calculateAge(patient.year));
        },
    },

    methods: {
        getCurrentDoctor() {
            const staffData = JSON.parse(window.localStorage.getItem('staff'));
            this.staff = staffData || {};
            return `${this.staff.name}`;
        },

        async getPatient() {
            const id = this.$route.params.id;
            try {
                this.patient = await PatientService.get(id);
            } catch (error) {
                this.message = "Không thể tải thông tin bệnh nhân. Vui lòng thử lại.";
                this.$router.push({ name: "notfound" });
            }
        },

        calculateAge(yearOfBirth) {
            const currentYear = new Date().getFullYear();
            return currentYear - yearOfBirth;
        },

        async retrieveMedicalrecords() {
            try {
                const phoneNumber = this.patient.phoneNumber;
                this.medicalrecords = await MedicalrecordService.getRecord(phoneNumber);
            } catch (error) {
                // if (error.response && error.response.status === 404 && error.response.data.message === "No medical records found for the provided phone number") {
                //     toast.info("Chưa có hồ sơ nào");
                // } else {
                //     toast.error("Đã xảy ra lỗi trong quá trình truy vấn");
                // }
                toast.error("Đã xảy ra lỗi trong quá trình truy vấn");
            }
        },

        refreshList() {
            this.retrieveMedicalrecords();;
        },

        async deleteMedicalrecord(id) {
            Swal.fire({
                title: "Bạn chắc chắn muốn xóa hồ sơ này không?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                customClass: {
                    confirmButton: "swal2-confirm-red"
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await MedicalrecordService.delete(id);
                        this.medicalrecords = [];
                        this.refreshList();
                        toast.success("Xóa thành công!");
                    } catch (error) {
                        toast.error("Đã có lỗi xảy ra khi xóa");
                    }
                }
            });
        },
        goToAddRecord(patientId) {
            this.$router.push({ name: 'add-medicalrecord', params: { id: patientId } });
        },

        async copy(MSHS) {
            try {
                await navigator.clipboard.writeText(MSHS);
                toast.success('Sao chép thành công');
            } catch (error) {
                toast.error('Sao chép thất bại');
                console.error(error);
            }
        },
    },

    async created() {
        await this.getPatient();
        this.refreshList();
    },
};
</script>

<style>
.bg-success {
    background-color: rgb(65 255 167) !important;
}

.back {
    display: inline-block;
}

a {
    text-decoration: none;
    color: black;
}

.soldout {
    max-width: 100px;
    max-height: 100px;
}

.swal2-confirm-red {
    background-color: red !important;
}

/* ----------------------- BUTTON BACK --------------------------- */
.button-back {
    display: block;
    position: relative;
    width: 56px;
    height: 56px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
}

.button-back:before,
.button-back:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
}

.button-back:before {
    border: 4px solid gray;
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-back:after {
    border: 4px solid #96daf0;
    transform: scale(1.3);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
}

.button-back:hover:before,
.button-back:focus:before {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button-back:hover:after,
.button-back:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box {
    display: flex;
    position: absolute;
    top: 5px;
    left: 0;
}

.button-elem {
    display: block;
    width: 20px;
    height: 20px;
    margin: 17px 18px 0 18px;
    transform: rotate(180deg);
    fill: gray;
}

.button-back:hover .button-box,
.button-back:focus .button-box {
    transition: 0.4s;
    transform: translateX(-56px);
}

/* ------------------------ BUTTON ADD ------------------------------ */
.cssbuttons-io-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .2em;
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    padding: .5em 1.5em;
    color: white;
    background: linear-gradient(0deg, rgb(0, 150, 60), rgb(100, 250, 150));
    border: none;
    outline: none;
    border-bottom: 3px solid rgb(0, 130, 40);
    box-shadow: 0 .5em .5em -.4em rgb(0, 0, 0, .5);
    letter-spacing: 0.08em;
    border-radius: 20em;
    cursor: pointer;
    transition: .5s;
}

.cssbuttons-io-button:hover {
    filter: brightness(1.2);
    color: rgb(0, 0, 0, .5);
}

.cssbuttons-io-button:active {
    transition: 0s;
    transform: rotate(-10deg);
}
</style>