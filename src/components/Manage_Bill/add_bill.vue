<template>
  <div>
    <add @submit:bill="createBill" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Bill/AddForm.vue";
import MedicalrecordService from "@/services/medicalrecord.service.js";
import BillService from "@/services/bill.service";
import Swal from 'sweetalert2'

export default {
  components: {
    add,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async createBill(data) {
      Swal.fire({
        title: "Bạn muốn lập bảng kê khai này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if(data.MSDT != "Bán lẻ") {
              const updatedStatus = 'sold';
              await MedicalrecordService.update(data._id, { status: updatedStatus });
            }
            await BillService.create(data);
            this.message = "Lập bảng kê khai thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-bill' });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
};


</script>
