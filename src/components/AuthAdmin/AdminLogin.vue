<template>
    <FormLogin @submit:login="loginStaff" />
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import FormLogin from "@/components/AuthAdmin/LoginForm.vue";
import StaffService from "@/services/staff.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'
import * as yup from "yup";

export default {
    components: {
        FormLogin,
        Field,
        Form,
        ErrorMessage,
    },
    emits: ["submit:login"],
    data() {
        const loginFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Hãy nhập vào email.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),

            password: yup
                .string()
                .required("Hãy nhập vào mật khẩu.")
                .min(5, "Mật khẩu phải ít nhất 5 ký tự.")
        });

        return {
            message: "",
            loginLocal: {
                email: "",
                password: "",
            },
            loginFormSchema,
            passwordType: "password",
            passwordIcon: "fa fa-eye"
        };

    },

    methods: {
        async loginStaff(data) {
            try {
                const response = await StaffService.login(data);
                var staffDataToSave = {
                    name: response.staff.name,
                    role: response.staff.role,
                    email: response.staff.email,
                    imgURL: response.staff.imgURL,
                    _id: response.staff._id
                };
                localStorage.setItem('staff', JSON.stringify(staffDataToSave));
                if (response && response.message === 'Đăng nhập thành công') {
                    if (response.staff.role === 'admin') {
                        this.message = "Welcome Back, " + response.staff.name;
                        Swal.fire({
                            icon: "success",
                            title: this.message,
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'welcome' });
                    } else {
                        this.message = "Welcome Back, " + response.staff.name;
                        Swal.fire({
                            icon: "success",
                            title: this.message,
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'welcome' });
                    }
                }
            } catch (error) {
                this.message = "Đăng nhập thất bại, email hoặc mật khẩu chưa chính xác";
                toast.error(this.message);
            }
        },
        togglePasswordVisibility() {
            this.passwordType = this.passwordType === "password" ? "text" : "password";
            this.passwordIcon = this.passwordIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
        },
        submitLogin() {
            this.$emit("submit:login", this.loginLocal);
        },
    },

};
</script>