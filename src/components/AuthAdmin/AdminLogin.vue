<template>
    <FormLogin @submit:login="loginStaff" />
</template>
  
<script>
import FormLogin from "@/components/AuthAdmin/LoginForm.vue";
import StaffService from "@/services/staff.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        FormLogin,
    },

    data() {
        return {
            message: "",
        };
    },
    methods: {
        async loginStaff(data) {
            try {
                const response = await StaffService.login(data);
                localStorage.setItem('staff', JSON.stringify(response.staff));

                if (response && response.message === 'Đăng nhập thành công') {
                    // Check the staff's role
                    if (response.staff.role === 'admin') {
                        this.message = "Đăng nhập thành công vào trang admin";
                        toast.success(this.message);
                        this.$router.push({ name: 'welcome' });
                    } else {
                        this.message = "Đăng nhập thành công";
                        toast.success(this.message);
                        this.$router.push({ name: 'welcome' });
                    }
                }
            } catch (error) {
                this.message = "Đăng nhập thất bại, email hoặc mật khẩu chưa chính xác";
                toast.error(this.message);
            }
        },
    },
};
</script>

  