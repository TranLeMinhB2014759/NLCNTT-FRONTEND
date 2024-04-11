<template>
    <div class="card">
        <div class="card-body">
            <div class="banner text-center">QUẢN LÝ ĐẶT LỊCH KHÁM ONLINE</div>
            <div class="container d-flex justify-content-center p-5 m-5 mx-auto" v-if="loadingAppointments">
                <div class="loader"></div> 
            </div>
            <div class="container" v-else>
                <div class="row">
                    <div class="container col-12 col-sm-4">
                        <InputSearch v-model="searchText" />
                    </div>
                    <div class="col-sm-8 d-flex align-items-end">
                        <div class="radio-inputs">
                            <label class="radio">
                                <input type="radio" v-model="selectedOption" value="all">
                                <span class="name">Tất cả</span>
                            </label>
                            <label class="radio">
                                <input type="radio" v-model="selectedOption" value="wait">
                                <span class="name">Chờ xác nhận</span><span class="indicator" v-if="countUnconfirmed() > 0">{{ countUnconfirmed() }}</span>
                            </label>
                            <label class="radio">
                                <input type="radio" v-model="selectedOption" value="confirmed">
                                <span class="name">Đã xác nhận</span>
                            </label>
                            <label class="radio">
                                <input type="radio" v-model="selectedOption" value="cancelled">
                                <span class="name">Đã hủy</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="container mt-3 table-responsive">
                    <table class="table table-bordered table-hover text-center" v-if="filteredAppointmentsCount > 0">
                        <thead class="table-success">
                            <tr>
                                <!-- <th>STT</th> -->
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Thời gian</th>
                                <th>Người thực hiện</th>
                                <th>Sửa đổi lần cuối</th>
                                <th colspan="2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(appointment, index) in paginatedAppointments" :key="index">
                                <!-- <td> {{ index + 1 }} </td> -->
                                <td class="text-start"> {{ appointment.name }} </td>
                                <td> {{ appointment.phoneNumber }} </td>
                                <td> {{ formatTime(appointment.time, appointment.day) }} </td>
                                <td>
                                    <span v-if="appointment.confirmer === ''" class="text-danger">
                                        Chưa xác nhận
                                    </span>
                                    <span v-else> {{ appointment.confirmer }} </span>
                                </td>
                                <td>
                                    {{ appointment.lastUpdated }}
                                </td>
                                <td v-if="appointment.confirm === 'no'">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                        :data-bs-target="'#ModalAppointment_' + index" @click="openModal(appointment)">
                                        Confirm
                                    </button>

                                    <!-- The Modal -->
                                    <div class="modal fade" :id="'ModalAppointment_' + index">
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
                                                    <Form :validation-schema="appointmentFormSchema">
                                                        <h5>Thông tin bệnh nhân</h5>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="name">Họ và tên: <span
                                                                            class="text-danger">(Yêu cầu)</span></label>
                                                                    <Field name="name" type="text" class="form-control"
                                                                        v-model="appointmentLocal.name" required
                                                                        placeholder="Trần Văn A" />
                                                                    <ErrorMessage name="name" class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="phoneNumber">Số điện thoại: <span
                                                                            class="text-danger">(Yêu cầu)</span></label>
                                                                    <Field name="phoneNumber" type="text"
                                                                        class="form-control"
                                                                        v-model="appointmentLocal.phoneNumber" required
                                                                        placeholder="0123456789 (10 chữ số)" />
                                                                    <ErrorMessage name="phoneNumber"
                                                                        class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h5>Thông tin cuộc hẹn</h5>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="service">Chọn dịch vụ: <span
                                                                            class="text-danger">(Yêu cầu)</span></label>
                                                                    <Field as="select" name="service"
                                                                        class="form-control"
                                                                        v-model="appointmentLocal.service" required
                                                                        @change="updateDoctors">
                                                                        <option v-for="service in filteredServices"
                                                                            :key="service" :value="service"> {{ service
                                                                            }} </option>
                                                                    </Field>
                                                                    <ErrorMessage name="service" class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="type">Chọn loại khám: <span
                                                                            class="text-danger">(Yêu cầu)</span></label>
                                                                    <Field as="select" name="type" class="form-control"
                                                                        v-model="appointmentLocal.type" required>
                                                                        <option value="Khám bệnh">Khám bệnh - 50.000₫
                                                                        </option>
                                                                        <option value="Khám đặc biệt">Khám đặc biệt -
                                                                            100.000₫</option>
                                                                    </Field>
                                                                    <ErrorMessage name="type" class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="doctor">Chọn bác sĩ: <span
                                                                            class="text-danger">(Yêu cầu)</span></label>
                                                                    <Field as="select" name="doctor"
                                                                        class="form-control"
                                                                        v-model="appointmentLocal.doctor" required
                                                                        @change="updateMaPhong">
                                                                        <option v-for="doctor in doctorsByService"
                                                                            :key="doctor" :value="doctor"> {{ doctor }}
                                                                        </option>
                                                                    </Field>
                                                                    <ErrorMessage name="doctor" class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>

                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label for="room">Phòng:</label>
                                                                    <input class="form-control"
                                                                        :value="appointmentLocal.room"
                                                                        placeholder="Hãy chọn bác sĩ" disabled />
                                                                    <Field name="room" v-model="appointmentLocal.room"
                                                                        required hidden />
                                                                    <ErrorMessage name="room" class="error-feedback"
                                                                        style="color: rgb(238, 15, 15);" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="mb-3 mt-3">
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <label for="time">Giờ khám:</label>
                                                                    <input class="form-control"
                                                                        :value="appointmentLocal.time" disabled />
                                                                </div>
                                                                <div class="col-8">
                                                                    <label for="day">Ngày khám:</label>
                                                                    <input type="date" class="form-control"
                                                                        :value="appointmentLocal.day" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>

                                                <!-- Modal footer -->
                                                <div class="modal-footer">
                                                    <button v-if="appointment.confirm === 'no'" class="btn btn-primary"
                                                        type="button" data-bs-dismiss="modal"
                                                        @click="handleConfirm(appointment._id)">
                                                        Confirm
                                                    </button>
                                                    <button type="button" class="btn btn-danger"
                                                        data-bs-dismiss="modal">Close</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td v-if="appointment.confirm === 'no'">
                                    <button v-if="appointment.confirm === 'no'" class="btn btn-danger" type="button"
                                        @click="handleCancel(appointment._id)">
                                        Cancel
                                    </button>
                                </td>
                                <td v-else-if="appointment.confirm === 'yes'" colspan="2">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                        :data-bs-target="'#ModalAppointment_' + index" @click="openModal(appointment)">
                                        Infomation
                                    </button>

                                    <!-- The Modal -->
                                    <div class="modal fade" :id="'ModalAppointment_' + index">
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
                                                    <Form :validation-schema="appointmentFormSchema">
                                                        <h5>Thông tin bệnh nhân</h5>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Họ và tên:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.name" disabled />
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Số điện thoại:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.phoneNumber"
                                                                        disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h5>Thông tin cuộc hẹn</h5>
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Mã tiếp nhận:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.MSTN" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Dịch vụ:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.service" disabled />
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Loại khám:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.type" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Bác sĩ:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.doctor" disabled />
                                                                </div>
                                                            </div>

                                                            <div class="col-12 col-md-6">
                                                                <div class="mb-3 mt-3">
                                                                    <label>Phòng:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.room" disabled />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="mb-3 mt-3">
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <label for="time">Giờ khám:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.time" disabled />
                                                                </div>
                                                                <div class="col-8">
                                                                    <label for="day">Ngày khám:</label>
                                                                    <input class="form-control"
                                                                        v-model="appointmentLocal.day" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>

                                                <!-- Modal footer -->
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary"
                                                        data-bs-dismiss="modal">OK</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td v-else colspan="2">
                                    <span class="text-danger">
                                        Đã hủy
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>Không tìm thấy cuộc hẹn nào.</p>
                </div>
                <ul class="pagination d-flex justify-content-center" v-if="filteredAppointmentsCount > 0">
                    <li class="page-item"><a class="page-link" @click="firstPage"
                            :class="{ 'disabled': currentPage === 1 }" href="#"><<</a>
                    </li>
                    <li class="page-item"><a class="page-link" @click="prevPage"
                            :class="{ 'disabled': currentPage === 1 }" href="#"><</a>
                    </li>
                    <li class="page-item" v-for="page in paginatedPages" :key="page">
                        <a class="page-link" @click="changePage(page)" :class="{ 'active': page === currentPage }"
                            href="#">{{ page }}</a>
                    </li>
                    <li class="page-item"><a class="page-link" @click="nextPage"
                            :class="{ 'disabled': currentPage === totalPages }" href="#">></a></li>
                    <li class="page-item"><a class="page-link" @click="lastPage"
                            :class="{ 'disabled': currentPage === totalPages }">>></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import InputSearch from "@/components/InputSearch.vue";
import * as yup from "yup";
import AppointmentService from "@/services/appointment.service";
import RoomService from "@/services/room.service";
import Swal from 'sweetalert2'
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        InputSearch,
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
        });
        return {
            loadingAppointments: false,
            selectedOption: 'all',
            searchText: "",
            currentPage: 1,
            appointmentsPerPage: 10,
            appointments: [],
            doctorsByService: [],
            rooms: [],
            appointmentLocal: {
                MSTN: "",
                name: "",
                phoneNumber: "",
                service: "",
                type: "",
                doctor: "",
                room: "",
                day: "",
                time: "",
                confirmer: "",
                confirm: "",
                lastUpdated: "",
            },
            appointmentFormSchema,

        };
    },
    watch: {
        searchText(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.changePage(1);
            }
        },
        selectedOption(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.changePage(1);
            }
        }
    },
    computed: {
        appointmentStrings() {
            const appointmentData = this.filterAppointmentsByOption(this.selectedOption);
            return appointmentData.map((appointment) => {
                const { MSTN, name, phoneNumber, doctor } = appointment;
                return [MSTN, name, phoneNumber, doctor].join("");
            });
        },
        filteredAppointments() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!searchTextLower) return this.filterAppointmentsByOption(this.selectedOption);
            return this.filterAppointmentsByOption(this.selectedOption).filter((_appointment, index) =>
                this.appointmentStrings[index].toLowerCase().includes(searchTextLower)
            );
        },
        filteredAppointmentsCount() {
            return this.filteredAppointments.length;
        },
        // ------------------------- Pagination -------------------------
        totalPages() {
            return Math.ceil(this.filteredAppointments.length / this.appointmentsPerPage);
        },
        paginatedAppointments() {
            const startIndex = (this.currentPage - 1) * this.appointmentsPerPage;
            const endIndex = startIndex + this.appointmentsPerPage;
            const reversedAppointments = this.filteredAppointments.slice().reverse();
            return reversedAppointments.slice(startIndex, endIndex);
        },
        paginatedPages() {
            const visiblePages = 5;
            let startPage = this.currentPage - Math.floor(visiblePages / 2);
            startPage = Math.max(startPage, 1);
            let endPage = startPage + visiblePages - 1;
            endPage = Math.min(endPage, this.totalPages);
            startPage = Math.max(endPage - visiblePages + 1, 1);
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        },
        filteredServices() {
            if (this.rooms.length > 0) {
                const dataRoom = this.rooms.filter(item => item.dichVu != '' && item.doctor != '');
                const uniqueServices = new Set(dataRoom.map(item => item.dichVu));
                this.getDoctorsByService(this.appointmentLocal.service);
                return [...uniqueServices];
            }
            return [];
        },
    },
    methods: {
        countUnconfirmed(){
            const unConfirmed = this.appointments.filter(appointment => appointment.confirm === 'no');
            return unConfirmed.length;
        },
        filterAppointmentsByOption(option) {
            switch (option) {
                case 'all':
                    return this.appointments;
                case 'wait':
                    return this.appointments.filter(appointment => appointment.confirm === 'no');
                case 'confirmed':
                    return this.appointments.filter(appointment => appointment.confirm === 'yes');
                case 'cancelled':
                    return this.appointments.filter(appointment => appointment.confirm === 'cancel');
                default:
                    return this.appointments;
            }
        },
        // ------------------------- Pagination -------------------------
        changePage(page) {
            this.currentPage = page;
        },
        firstPage() {
            this.currentPage = 1;
        },
        lastPage() {
            this.currentPage = this.totalPages;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        // ------------------------- FORMAT -------------------------
        formatMSTN() {
            const [year, month, day] = this.appointmentLocal.day.split('-');

            const appointmentsThatday = this.appointments.filter(appointment => {
                const [appointmentYear, appointmentMonth, appointmentDay] = appointment.day.split('-');
                return appointmentYear === year && appointmentMonth === month && appointmentDay === day && appointment.confirm === "yes";
            });

            const MSTNCount = String(appointmentsThatday.length + 1).padStart(4, '0');

            const MSTN = `${day}${month}${year}.${MSTNCount}`;
            return MSTN;
        },
        formatTime(inputTime, inputDay) {
            const [hour, minute] = inputTime.split(':');
            const [year, month, day] = inputDay.split('-');
            return `${hour}:${minute}, ${day}/${month}/${year}`;
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

        openModal(appointment) {
            this.appointmentLocal = { ...appointment };
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
            this.getDoctorsByService(this.appointmentLocal.service);
        },

        async retrieveAppointment() {
            try {
                this.appointments = await AppointmentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async handleConfirm(appointmentId) {
            try {
                Swal.fire({
                    title: "Bạn chắn chắn đã gọi xác nhận?",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const staffJs = window.localStorage.getItem("staff");
                            const staff = JSON.parse(staffJs);
                            this.appointmentLocal.MSTN = this.formatMSTN();
                            this.appointmentLocal.confirmer = staff.name;
                            this.appointmentLocal.confirm = "yes";
                            this.appointmentLocal.lastUpdated = this.getLastUpdated();
                            await AppointmentService.update(appointmentId, this.appointmentLocal);
                            Swal.fire({
                                icon: "success",
                                title: "Xác nhận thành công!",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.retrieveAppointment();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        async handleCancel(appointmentId) {
            try {
                Swal.fire({
                    title: "Bạn chắn chắn đã gọi xác nhận?",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const staffJs = window.localStorage.getItem("staff");
                            const staff = JSON.parse(staffJs);
                            const confirmer = staff.name;
                            await AppointmentService.cancel(appointmentId, confirmer);
                            Swal.fire({
                                icon: "success",
                                title: "Hủy thành công!",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.retrieveAppointment();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        this.loadingAppointments = true;
        try {
            await this.retrieveAppointment();
            await this.retrieveRoom();
        } catch (error) {
            console.log(error);
        } finally {
            this.loadingAppointments = false;
        }
    }
}
</script>

<style scoped>
@import "@/assets/css/interface2.css";
.radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #EEE;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 300px;
    font-size: 14px;
}

.radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
}

.radio-inputs .radio input {
    display: none;
}

.radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.name {
    background-color: #fff;
    font-weight: 600;
}

.indicator{
    background: #3b7ddd;
    border-radius: 50%;
    box-shadow: 0 .1rem .2rem rgba(0, 0, 0, .05);
    color: #fff;
    display: block;
    font-size: .675rem;
    height: 20px;
    padding: 1px;
    position: absolute;
    text-align: center;
    top: -10%;
    right: 48%;
    transition: top .1s ease-out;
    width: 25px
}
</style>