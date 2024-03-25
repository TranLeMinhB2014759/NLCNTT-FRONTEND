<template>
    <div v-if="doctor">
        <edit :doctor="doctor" @submit:doctor="editDoctor" />
    </div>
</template>

<script>
import edit from "@/components/Manage_Doctor/EditForm.vue";
import DoctorService from "@/services/doctor.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
    },

    data() {
        return {
            doctor: null,
            message: "",
        };
    },
    props: {
        id: { type: String, required: true },
    },
    methods: {
        async getDoctor(id) {
            try {
                this.doctor = await DoctorService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async editDoctor(data) {
            Swal.fire({
                title: "Bạn muốn cập nhật tài khoản này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await DoctorService.update(this.doctor ? this.doctor._id : null, data);
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'admin-doctor' });
                    }
                    catch (error) {
                        console.error(error);
                        toast.error("Đã có lỗi xảy ra khi thêm");
                    }
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        title: "Những thay đổi không được lưu",
                        showConfirmButton: true,
                        timer: 2000
                    });
                    this.$router.push({ name: 'admin-doctor' });
                }
            });
        },
    },
    created() {
        this.getDoctor(this.id);
        this.message = "";
    },
};
</script>
