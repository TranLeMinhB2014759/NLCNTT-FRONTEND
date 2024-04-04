<template>
    <div class="card">
        <div class="card-body">
            <div class="banner text-center">QUẢN LÝ ĐẶT LỊCH KHÁM ONLINE</div>
            <div class="container">
                <div class="container mt-3 table-responsive">
                    <table class="table table-bordered table-hover text-center" v-if="appointments.length > 0">
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
                            <tr v-for="(appointment, index) in appointments.slice().reverse()" :key="index">
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
                                                                    <input class="form-control" :value="appointmentLocal.time" disabled />
                                                                </div>
                                                                <div class="col-8">
                                                                    <label for="day">Ngày khám:</label>
                                                                    <input type="date" class="form-control" :value="appointmentLocal.day" disabled />
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
                                    <span class="text-success">
                                        Đã xác nhận
                                    </span>
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
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import AppointmentService from "@/services/appointment.service";
import RoomService from "@/services/room.service";
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
        });
        return {
            appointments: [],
            doctorsByService: [],
            rooms: [],
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
                confirm: "",
                lastUpdated: "",
            },
            appointmentFormSchema,

        };
    },
    computed: {
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
        formatTime(inputTime, inputDay){
            const [hour, minute] = inputTime.split(':');
            const [year, month, day] = inputDay.split('-');
            return `${hour}:${minute}, ${day}/${month}/${year}`;
        },
        openModal(appointment) {
            this.appointmentLocal = { ...appointment };
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
        this.retrieveAppointment();
        this.retrieveRoom();
    }
}
</script>

<style scoped>
.badge {
    --bs-badge-color: black !important;
}

.banner {
    background-color: antiquewhite;
    padding: 10px;
    margin-bottom: 15px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    font-weight: 600;
}

i.donvi {
    font-size: small;
}

.bg-success {
    color: white;
    background-color: rgb(65 255 167) !important;
}

.swal2-confirm-red {
    background-color: red !important;
}
</style>