<template>
    <div>
        <edit :medicine="medicine" @submit:medicine="editMedicine" />
    </div>
</template>

<script>
import edit from "@/components/Manage_Medicine/EditForm.vue";
import MedicineService from "@/services/medicine.service";
import Swal from 'sweetalert2'

export default {
    components: {
        edit,
    },

    data() {
        return {
            medicine: null,
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
        async editMedicine(data) {
            Swal.fire({
                title: "Bạn chắc chắn về các thông số cập nhật?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await MedicineService.update(this.medicine ? this.medicine._id : null, data);
                        this.$router.push({ name: 'admin-medicine' });
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    } catch (error) {
                        console.error(error);
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
