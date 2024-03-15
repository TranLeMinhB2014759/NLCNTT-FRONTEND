<template>
  <div>
    <add @submit:medicine="createMedicine" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Medicine/AddForm.vue";
import MedicineService from "@/services/medicine.service";
import Swal from 'sweetalert2'

export default {
  components: {
    add,
  },
  data() {
    return {
      medicine: {},
      message: "",
    };
  },
  methods: {
    async createMedicine(data) {
      Swal.fire({
        title: "Bạn muốn thêm thuốc này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await MedicineService.create(data);
            this.message = "Thêm thuốc mới thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-medicine' });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
};
</script>
