<template>
    <div>
        <add @submit:staff="createStaff" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Staff/AddForm.vue";
import StaffService from "@/services/staff.service";
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
      const confirmed = window.confirm("Bạn có thêm tài khoản mới?");

      if (confirmed) {
        try {
          await StaffService.create(data);
          toast.success("Thêm tài khoản mới thành công")
          this.$router.push({ name: 'admin-staff' });
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {
            toast.error("Email đã tồn tại");
          } else {
            toast.error("Đã có lỗi xảy ra khi thêm tài khoản");
          }
        }
      }
    },
  },
};


</script>

