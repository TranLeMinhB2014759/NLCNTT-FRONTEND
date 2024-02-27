<template>
  <div>
    <FormRegister @submit:staff="createStaff" />
  </div>
</template>
  
<script>
import FormRegister from "@/components/AuthForm/SignUpForm.vue";
import StaffService from "@/services/staff.service.js";

export default {
  components: {
    FormRegister,
  },

  // props: {
  //   staff: { type: Object, required: true },

  // },

  data() {
    return {
      message: "",
    };

  },
  methods: {
    async createStaff(data) {
      // Hiển thị cửa sổ xác nhận
      const confirmed = window.confirm("Bạn có muốn tạo tài khoản  mới?");
      if (confirmed) {
        try {
          await StaffService.create(data);
          this.message = "Thêm tài khoản mới thành công";
          alert(this.message);
          this.$router.push({ name: 'login' });

        } catch (error) {
          console.log(error);
        }
      }
    },

  },
};
</script>