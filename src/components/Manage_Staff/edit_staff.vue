<template>
    <div class="d-load" v-if="loading">
        <div class="loader"></div>
    </div>
    <div v-else>
        <div v-if="staff">
            <edit :staff="staff" @submit:staff="editStaff" />
        </div>
    </div>
</template>

<script>
import edit from "@/components/Manage_Staff/EditForm.vue";
import StaffService from "@/services/staff.service";
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
            staff: null,
            imgURLCloud: null,
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
        async separateLinkIntoPublicID(URL) {
            const parts = URL.split("/");
            const publicId = parts[parts.length - 1].split(".")[0];
            return publicId;
        },
        async editStaff(data) {
            const result = await Swal.fire({
                title: "Bạn muốn cập nhật tài khoản này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        this.loading = true;
                        if (data.imgURL instanceof File) {
                            const cloudResult = await CloudService.uploadImageStaff(data.imgURL);
                            this.imgURLCloud = await cloudResult.data.data.imgURL;
                            if (this.imgURLCloud === null) {
                                throw new Error("Did not receive image link");
                            }
                            const newData = {};
                            if (data.email === this.staff.email) {
                                newData.name = data.name;
                                newData.phoneNumber = data.phoneNumber;
                                newData.address = data.address;
                                newData.password = data.password;
                                newData.role = data.role;
                                newData.imgURL = this.imgURLCloud;
                            } else {
                                newData.name = data.name;
                                newData.email = data.email;
                                newData.phoneNumber = data.phoneNumber;
                                newData.address = data.address;
                                newData.password = data.password;
                                newData.role = data.role;
                                newData.imgURL = this.imgURLCloud;
                            }
                            await StaffService.update(this.staff ? this.staff._id : null, newData);
                            const publicID = await this.separateLinkIntoPublicID(this.staff.imgURL);
                            await CloudService.delete(publicID);
                            Swal.fire({
                                icon: "success",
                                title: "Cập nhật thành công",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.$router.push({ name: 'admin-staff' });
                        } else {
                            const newData = {};
                            if (data.email === this.staff.email) {
                                newData.name = data.name;
                                newData.phoneNumber = data.phoneNumber;
                                newData.address = data.address;
                                newData.password = data.password;
                                newData.role = data.role;
                            } else {
                                newData.name = data.name;
                                newData.email = data.email;
                                newData.phoneNumber = data.phoneNumber;
                                newData.address = data.address;
                                newData.password = data.password;
                                newData.role = data.role;
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
                    }
                    catch (error) {
                        const publicID = await this.separateLinkIntoPublicID(this.imgURLCloud)
                        await CloudService.delete(publicID);
                        this.handleError(error);
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
                    this.$router.push({ name: 'admin-staff' });
                }
            });
        },
        handleError(error) {
            console.log(error);
            console.error(error);
            if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {
                toast.error("Email đã tồn tại");
            } else {
                toast.error("Đã có lỗi xảy ra");
            }
        },
    },
    created() {
        this.getStaff(this.id);
        this.message = "";
    },
};
</script>
<style scoped>
/* ---------------------------- LOADER ---------------------------- */
.d-load {
    min-width: 100%;
    height: 100px;
}

.loader {
    margin: 180px auto 0px;
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid #514b82;
    animation:
        l20-1 0.8s infinite linear alternate,
        l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
    0% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)
    }

    12.5% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    62.5% {
        clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%)
    }
}

@keyframes l20-2 {
    0% {
        transform: scaleY(1) rotate(0deg)
    }

    49.99% {
        transform: scaleY(1) rotate(135deg)
    }

    50% {
        transform: scaleY(-1) rotate(0deg)
    }

    100% {
        transform: scaleY(-1) rotate(-135deg)
    }
}
</style>