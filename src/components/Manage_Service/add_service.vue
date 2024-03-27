<template>
  <div>
    <add @submit:service="createService" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Service/AddForm.vue";
import ServiceService from "@/services/service.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      service: {},
      message: "",
    }
  },
  methods: {
    async createService(data) {
      Swal.fire({
        title: "Bạn chắc chắn về các thông tin đã điền vào?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await ServiceService.create(data);
            this.message = "Thêm dịch vụ mới thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-service' });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
    },
    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Code already exists") {
        toast.error("Mã dịch vụ đã tồn tại");
      } else {
        toast.error("Đã có lỗi xảy ra khi thêm");
      }
    },
  },
};
</script>
