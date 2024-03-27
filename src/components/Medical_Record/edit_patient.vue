<template>
    <div v-if="patient">
        <edit :patient="patient" @submit:patient="editPatient" />
    </div>
</template>

<script>
import edit from "@/components/Medical_Record/EditForm.vue";
import PatientService from "@/services/patient.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
    },

    props: {
        id: { type: String, required: true },
        medicalrecord: { type: Object, require: true },
    },

    data() {
        return {
            patient: null,
            message: "",
        };
    },

    methods: {
        async getPatient(id) {
            try {
                this.patient = await PatientService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async editPatient(data) {
            Swal.fire({
                title: "Bạn muốn cập nhật bệnh nhân này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const newData = {};
                    try {
                        if (data.phoneNumber === this.patient.phoneNumber) {
                            newData.MSBN = data.MSBN;
                            newData.name = data.name;
                            newData.year = data.year;
                            newData.gender = data.gender;
                            newData.address = data.address;
                        } else {
                            newData.MSBN = data.MSBN;
                            newData.name = data.name;
                            newData.year = data.year;
                            newData.gender = data.gender;
                            newData.phoneNumber = data.phoneNumber;
                            newData.address = data.address;
                        }
                        await PatientService.update(this.patient ? this.patient._id : null, newData);
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'admin-patient' });
                    } catch (error) {
                        this.handleError(error);
                    }
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        title: "Những thay đổi không được lưu",
                        showConfirmButton: true,
                        timer: 2000
                    });
                    this.$router.push({ name: 'admin-patient' });
                }
            });
        },
        handleError(error) {
            console.log(error);
            if (error.response && error.response.status === 400 && error.response.data.message === "phoneNumber already exists") {
                toast.error("Số điện thoại đã tồn tại");
            } else {
                toast.error("Đã có lỗi xảy ra thêm bệnh nhân");
            }
        },
    },
    created() {
        this.getPatient(this.id);
    },
};
</script>
