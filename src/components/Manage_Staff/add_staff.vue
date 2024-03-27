<template>
  <div>
    <add @submit:staff="createStaff" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Staff/AddForm.vue";
import StaffService from "@/services/staff.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      staff: {},
      message: "",
    }
  },
  methods: {
    async createStaff(data) {
      Swal.fire({
        title: "Bạn muốn thêm tài khoản này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await StaffService.create(data);
            Swal.fire({
              icon: "success",
              title: "Thêm tài khoản mới thành công",
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-staff' });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
    },
    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {
        toast.error("Email đã tồn tại");
      } else {
        toast.error("Đã có lỗi xảy ra khi thêm tài khoản");
      }
    },
  },
};
</script>
