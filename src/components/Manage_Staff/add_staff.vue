<template>
    <div>
        <add @submit:staff="createStaff" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Staff/AddForm.vue";
import StaffService from "@/services/staff.service";

export default {
    components: {
        add,
    },
    props: {
        staff: { type: Object, require: true },
    },
    data() {
        return {

            message: "",
        };
    },
    methods: {
    
    async createStaff(data) {
      // Hiển thị cửa sổ xác nhận
      const confirmed = window.confirm("Bạn có thêm tài khoản mới?");

      if (confirmed) {
        try {
          await StaffService.create(data);
          this.message = "Thêm tài khoản mới thành công";
          this.$router.push({ name: 'admin-staff' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};


</script>

