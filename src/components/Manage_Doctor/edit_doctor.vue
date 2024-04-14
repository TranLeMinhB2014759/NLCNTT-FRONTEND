<template>
    <div class="d-load" v-if="loading">
        <div class="loader"></div>
    </div>
    <div v-else>
        <div v-if="doctor">
            <edit :doctor="doctor" @submit:doctor="editDoctor" />
        </div>
    </div>
</template>

<script>
import edit from "@/components/Manage_Doctor/EditForm.vue";
import DoctorService from "@/services/doctor.service";
import CloudService from "@/services/cloudinary.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
    },

    data() {
        return {
            loading: false,
            doctor: null,
            imgURLCloud: null,
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
        async separateLinkIntoPublicID(URL) {
            const parts = URL.split("/");
            const publicId = parts[parts.length - 1].split(".")[0];
            return publicId;
        },
        async editDoctor(data) {
            await Swal.fire({
                title: "Bạn muốn cập nhật bác sĩ này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        this.loading = true;
                        if (data.imgURL instanceof File) {
                            const cloudResult = await CloudService.uploadImageDoctor(data.imgURL);
                            this.imgURLCloud = await cloudResult.data.data.imgURL;
                            if (this.imgURLCloud === null) {
                                throw new Error("Did not receive image link");
                            }
                            data.imgURL = this.imgURLCloud;
                            await DoctorService.update(this.doctor ? this.doctor._id : null, data);
                            const publicID = await this.separateLinkIntoPublicID(this.doctor.imgURL)
                            await CloudService.delete(publicID);
                            Swal.fire({
                                icon: "success",
                                title: "Cập nhật thành công",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.$router.push({ name: 'admin-doctor' });
                        }
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
                        if (data.imgURL instanceof File) {
                            const publicID = await this.separateLinkIntoPublicID(this.imgURLCloud)
                            await CloudService.delete(publicID);
                        }
                        console.error(error);
                        toast.error("Đã có lỗi xảy ra");
                    } finally {
                        this.loading = false;
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

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>