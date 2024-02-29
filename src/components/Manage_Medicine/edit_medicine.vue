<template>
    <div>
        <edit :medicine="medicine" @submit:medicine="editMedicine" />
    </div>
</template>
  
<script>
import edit from "@/components/Manage_Medicine/EditForm.vue";
import MedicineService from "@/services/medicine.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
    methods: {
        async getMedicine() {
            const id = this.$route.params.id; // Lấy id từ route
            try {
                this.medicine = await MedicineService.get(id);
            } catch (error) {
                // Xử lý lỗi, ví dụ: chuyển hướng đến trang 404
                this.$router.push({ name: "notfound" });
            }
        },
        async editMedicine(data) {
            const confirmed = window.confirm("Bạn có chắc cập nhật thuốc này này?");
            if (confirmed) {
                try {
                    await MedicineService.update(this.medicine ? this.medicine._id : null, data);
                    this.message = "Cập nhật thuốc thành công";
                    // alert(this.message);
                    toast.success(this.message);
                    // this.$router.push({ name: 'admin-medicine' });
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.getMedicine();
    },
};
</script>
