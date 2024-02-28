<template>
    <div>
        <add @submit:medicine="createMedicine" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Medicine/AddForm.vue";
import MedicineService from "@/services/medicine.service";

export default {
    components: {
        add,
    },
    props: {
        medicine: { type: Object, require: true },
    },
    data() {
        return {

            message: "",
        };
    },
    methods: {
    
    async createMedicine(data) {
      // Hiển thị cửa sổ xác nhận
      const confirmed = window.confirm("Bạn có thêm thuốc này?");

      if (confirmed) {
        try {
          await MedicineService.create(data);
          this.message = "Thêm thuốc mới thành công";
          this.$router.push({ name: 'admin-medicine' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};


</script>

