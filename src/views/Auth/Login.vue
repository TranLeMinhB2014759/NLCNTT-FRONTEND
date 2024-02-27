<template>
    <FormLogin @submit:login="loginStaff" />
</template>
  
<script>
import FormLogin from "@/components/AuthForm/LoginForm.vue";
import StaffService from "@/services/staff.service.js";

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
                // console.log("hello", response);
                localStorage.setItem('staff', JSON.stringify(response.staff));

                if (response && response.message === 'Đăng nhập thành công') {
                    // Check the staff's role
                    if (response.staff.role === 'admin') {
                        this.message = "Đăng nhập thành công vào trang admin";
                        this.$router.push({ name: 'welcome' }); // Assuming 'admin' is the name of your admin route.
                    } else {
                        this.message = "Đăng nhập thành công";
                        this.$router.push({ name: 'trangchu' }); // Assuming 'auth' is the name of your staff route.
                    }
                }
            } catch (error) {
                console.error("Login error:", error);
                this.message = "Đăng nhập thất bại, mật khẩu hoặc email chưa chính xác";
                alert(this.message);
            }
        },
    },
};
</script>

  