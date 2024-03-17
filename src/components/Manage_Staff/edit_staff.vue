<template>
    <div v-if="staff">
        <edit :staff="staff" @submit:staff="editStaff" />
    </div>
</template>

<script>
import edit from "@/components/Manage_Staff/EditForm.vue";
import StaffService from "@/services/staff.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
    },

    data() {
        return {
            staff: null,
            message: "",
        };
    },
    props: {
        id: { type: String, required: true },
    },
    methods: {
        async getStaff(id) {
            try {
                this.staff = await StaffService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async editStaff(data) {
            Swal.fire({
                title: "Bạn muốn cập nhật tài khoản này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const newData = {};
                        if (data.email === this.staff.email) {
                            newData.name = data.name;
                            newData.phoneNumber = data.phoneNumber;
                            newData.address = data.address;
                            newData.password = data.password;
                            newData.role = data.role;
                            newData.imgURL = data.imgURL;
                        } else {
                            newData.name = data.name;
                            newData.email = data.email;
                            newData.phoneNumber = data.phoneNumber;
                            newData.address = data.address;
                            newData.password = data.password;
                            newData.role = data.role;
                            newData.imgURL = data.imgURL;
                        }
                        await StaffService.update(this.staff ? this.staff._id : null, newData);
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'admin-staff' });
                    }
                    catch (error) {
                        console.error(error);
                        if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {
                            toast.error("Email đã tồn tại");
                        } else {
                            toast.error("Đã có lỗi xảy ra khi thêm");
                        }
                    }
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        title: "Những thay đổi không được lưu",
                        showConfirmButton: true,
                        timer: 2000
                    });
                    this.$router.push({ name: 'admin-staff' });
                }
            });
        },
    },
    created() {
        this.getStaff(this.id);
        this.message = "";
    },
};
</script>
