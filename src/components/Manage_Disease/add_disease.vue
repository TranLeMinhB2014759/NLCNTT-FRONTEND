<template>
  <div>
    <add @submit:disease="createDisease" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Disease/AddForm.vue";
import DiseaseService from "@/services/disease.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      disease: {},
      message: "",
    }
  },
  methods: {
    async createDisease(data) {
      Swal.fire({
        title: "Bạn chắc chắn về các thông tin đã điền vào?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await DiseaseService.create(data);
            this.message = "Thêm bệnh mới thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-disease' });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
    },
    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Code already exists") {
        toast.error("Mã bệnh đã tồn tại");
      } else {
        toast.error("Đã có lỗi xảy ra");
      }
    },
  },
};
</script>