<template>
    <div class="card">
        <div class="card-body">
            <div class="banner text-center">TIẾP NHẬN BỆNH NHÂN</div>
            <div class="container d-flex justify-content-center p-5 m-5 mx-auto" v-if="loading">
                <div class="loader"></div>
            </div>
            <div class="container" v-else>
                <div class="row">
                    <div class="container col-12 col-sm-4">
                        <InputSearch v-model="searchText" />
                    </div>
                    <div class="container col-sm-8">
                        <div class="mt-3 mb-3">
                            <h3>Time</h3>
                        </div>
                        <div class="mt-3">
                            <input type="date" v-model="selectedDay">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-3 table-responsive">
                <table class="table table-bordered table-hover text-center" v-if="filteredAppointmentsCount > 0">
                    <thead class="table-success">
                        <tr>
                            <th>Mã số tiếp nhận</th>
                            <th>Tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Thời gian</th>
                            <th>Người xác nhận</th>
                            <th>Sửa đổi lần cuối</th>
                            <th>Hành động</th>
                            <th>Tiếp nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(appointment, index) in sortedAppointments" :key="index">
                            <td> {{ appointment.MSTN }} </td>
                            <td class="text-start"> {{ appointment.name }} </td>
                            <td> {{ appointment.phoneNumber }} </td>
                            <td> {{ formatTime(appointment.time, appointment.day) }} </td>
                            <td> {{ appointment.confirmer }} </td>
                            <td> {{ appointment.lastUpdated }} </td>
                            <td>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    :data-bs-target="'#ModalAppointment_' + index">
                                    Infomation
                                </button>

                                <!-- The Modal -->
                                <div class="modal fade modal-lg" :id="'ModalAppointment_' + index">
                                    <div class="modal-dialog">
                                        <div class="modal-content">

                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                                <h4 class="modal-title">Thông tin lịch hẹn</h4>
                                                <button type="button" class="btn-close"
                                                    data-bs-dismiss="modal"></button>
                                            </div>

                                            <!-- Modal body -->
                                            <div class="modal-body text-start">
                                                <h5>Thông tin bệnh nhân</h5>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Họ và tên:</label>
                                                            <input class="form-control" :value="appointment.name"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Số điện thoại:</label>
                                                            <input class="form-control" :value="appointment.phoneNumber"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Giới tính:</label>
                                                            <input class="form-control" :value="appointment.gender"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Năm sinh:</label>
                                                            <input class="form-control" :value="appointment.year"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mt-3">
                                                    <label>Địa chỉ:</label>
                                                    <input class="form-control" :value="appointment.address"
                                                        disabled />
                                                </div>
                                                <h5>Thông tin cuộc hẹn</h5>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Mã tiếp nhận:</label>
                                                            <input class="form-control" :value="appointment.MSTN"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Dịch vụ:</label>
                                                            <input class="form-control" :value="appointment.service"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Loại khám:</label>
                                                            <input class="form-control" :value="appointment.type"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Bác sĩ:</label>
                                                            <input class="form-control" :value="appointment.doctor"
                                                                disabled />
                                                        </div>
                                                    </div>

                                                    <div class="col-12 col-md-6">
                                                        <div class="mb-3 mt-3">
                                                            <label>Phòng:</label>
                                                            <input class="form-control" :value="appointment.room"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mb-3 mt-3">
                                                    <div class="row">
                                                        <div class="col-4">
                                                            <label for="time">Giờ khám:</label>
                                                            <input class="form-control" :value="appointment.time"
                                                                disabled />
                                                        </div>
                                                        <div class="col-8">
                                                            <label for="day">Ngày khám:</label>
                                                            <input class="form-control" :value="appointment.day"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary w-100"
                                                    data-bs-dismiss="modal">OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="goToPatient(appointment)">
                                    <i class="fa-solid fa-circle-right"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>Không tìm thấy cuộc hẹn nào.</p>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import AppointmentService from "@/services/appointment.service";
import PatientService from "@/services/patient.service";
import Swal from 'sweetalert2'
export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            loading: false,
            selectedDay: new Date().toISOString().substr(0, 10),
            searchText: "",
            appointments: [],
            listPhoneNumber: [],
        }
    },
    computed: {
        filteredAppointments() {
            const selectedDay = this.selectedDay;
            const searchTextLower = this.searchText.toLowerCase();
            return this.appointments.filter(appointment => {
                const appointmentDay = appointment.day.split("T")[0];
                return appointmentDay === selectedDay && (
                    !searchTextLower ||
                    appointment.MSTN.toLowerCase().includes(searchTextLower) ||
                    appointment.name.toLowerCase().includes(searchTextLower) ||
                    appointment.phoneNumber.toLowerCase().includes(searchTextLower) ||
                    appointment.doctor.toLowerCase().includes(searchTextLower)
                );
            });
        },
        filteredAppointmentsCount() {
            return this.filteredAppointments.length;
        },
        sortedAppointments() {
            return this.filteredAppointments.slice().sort((a, b) => {
                const [hoursA, minutesA] = a.time.split(':').map(Number);
                const [hoursB, minutesB] = b.time.split(':').map(Number);
                if (hoursA !== hoursB) {
                    return hoursA - hoursB;
                }
                return minutesA - minutesB;
            });
        },
    },
    methods: {
        async retrieveAppointment() {
            try {
                const appointmentData = await AppointmentService.getAll();
                const staffData = JSON.parse(window.localStorage.getItem('staff'));
                const role = staffData ? staffData.role : null;
                const doctorName = staffData ? staffData.name : null;

                this.appointments = appointmentData.filter(app => {
                    if (role === "admin") {
                        return app.confirm === "yes";
                    } else {
                        return app.doctor === doctorName && app.confirm === "yes";
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        goToPatient(appointment) {
            const patient = this.listPhoneNumber.filter(patient => patient.phoneNumber === appointment.phoneNumber)
            if (patient.length > 0) {
                Swal.fire({
                    title: "Bệnh nhân quay lại tái khám. Xem hồ sơ?",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'medicalrecord', params: { id: patient[0]._id } });
                    }
                })
            } else {
                Swal.fire({
                    title: "Đây là bệnh nhân mới. Đi đến tạo hồ sơ?",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'add-patient', query: { name: appointment.name, phoneNumber: appointment.phoneNumber, gender: appointment.gender, address: appointment.address } });
                    }
                })
            }
        },
        async getPatients() {
            try {
                this.listPhoneNumber = await PatientService.getListPhone();
            } catch {
                console.log(error);
            }
        },
        formatTime(inputTime, inputDay) {
            const [hour, minute] = inputTime.split(':');
            const [year, month, day] = inputDay.split('-');
            return `${hour}:${minute}, ${day}/${month}/${year}`;
        },
    },
    async created() {
        try {
            await this.retrieveAppointment();
            await this.getPatients();
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
@import "@/assets/css/interface2.css";

/* ----------------------------- DATE INPUT ----------------------------- */
input[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 16px;
    width: 200px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

input[type="date"]:focus {
    border-color: #007bff;
    outline: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    cursor: pointer;
}

input[type="date"]::-moz-calendar-picker-indicator {
    filter: invert(0.5);
    cursor: pointer;
}
</style>