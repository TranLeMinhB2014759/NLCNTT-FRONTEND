<template>
    <div class="d-load" v-if="loading">
        <div class="loader"></div>
    </div>
    <div v-else>
        <div v-if="medicine">
            <edit :medicine="medicine" @submit:medicine="editMedicine" />
        </div>
    </div>
</template>

<script>
import edit from "@/components/Manage_Medicine/EditForm.vue";
import MedicineService from "@/services/medicine.service";
import CloudService from "@/services/cloudinary.service";
import Swal from 'sweetalert2'

export default {
    components: {
        edit,
    },

    data() {
        return {
            loading: false,
            medicine: null,
            imgURLCloud: null,
            message: "",
        };
    },

    props: {
        id: { type: String, required: true },
    },

    methods: {
        async getMedicine(id) {
            try {
                this.medicine = await MedicineService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async separateLinkIntoPublicID(URL) {
            const parts = URL.split("/");
            const publicId = parts[parts.length - 1].split(".")[0];
            return publicId;
        },
        async editMedicine(data) {
            await Swal.fire({
                title: "Bạn chắc chắn về các thông số cập nhật?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        this.loading = true;
                        if (data.imgURL instanceof File) {
                            const cloudResult = await CloudService.uploadImageMedicine(data.imgURL);
                            this.imgURLCloud = await cloudResult.data.data.imgURL;
                            if (this.imgURLCloud === null) {
                                throw new Error("Did not receive image link");
                            }
                            data.imgURL = this.imgURLCloud;
                            await MedicineService.update(this.medicine ? this.medicine._id : null, data);
                            const publicID = await this.separateLinkIntoPublicID(this.medicine.imgURL)
                            await CloudService.delete(publicID);
                            this.$router.push({ name: 'admin-medicine' });
                            Swal.fire({
                                icon: "success",
                                title: "Cập nhật thành công",
                                showConfirmButton: true,
                                timer: 1500
                            });
                        } else {
                            await MedicineService.update(this.medicine ? this.medicine._id : null, data);
                            this.$router.push({ name: 'admin-medicine' });
                            Swal.fire({
                                icon: "success",
                                title: "Cập nhật thành công",
                                showConfirmButton: true,
                                timer: 1500
                            });
                        }
                    } catch (error) {
                        if (data.imgURL instanceof File) {
                            const publicID = await this.separateLinkIntoPublicID(this.imgURLCloud)
                            await CloudService.delete(publicID);
                        }
                        console.error(error);
                    } finally {
                        this.loading = false;
                    }
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        title: "Những thay đổi không được lưu",
                        showConfirmButton: true,
                        timer: 1500
                    });
                    this.$router.push({ name: 'admin-medicine' })
                }
            });
        },
    },
    created() {
        this.getMedicine(this.id);
    },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>