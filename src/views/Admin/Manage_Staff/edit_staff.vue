<template>
    <div>
        <edit :staff="staff" @submit:staff="editStaff" />
    </div>
</template>
  
<script>
import edit from "@/components/Manage_Staff/EditForm.vue";
import StaffService from "@/services/staff.service";

export default {
    components: {
        edit,
    },
    data() {
        return {
            staff: null,
            message: "",
        };
    },
    methods: {
        async getStaff() {
            const id = this.$route.params.id; // Lấy id từ route
            try {
                this.staff = await StaffService.get(id);
            } catch (error) {
                // Xử lý lỗi, ví dụ: chuyển hướng đến trang 404
                this.$router.push({ name: "notfound" });
            }
        },
        async editStaff(data) {
            const confirmed = window.confirm("Bạn có chắc cập nhật tài khoản này này?");
            if (confirmed) {
                try {
                    await StaffService.update(this.staff ? this.staff._id : null, data);
                    this.message = "Cập nhật sản phẩm thành công";
                    alert(this.message);
                    this.$router.push({ name: 'admin-staff' });
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.getStaff();
    },
};
</script>
