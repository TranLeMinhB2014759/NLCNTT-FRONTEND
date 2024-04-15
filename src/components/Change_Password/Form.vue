<template>
    <div class="card">
        <div class="card-body">
            <div class="container">
                <Form @submit="submitStaff" :validation-schema="staffFormSchema">

                    <div class="mb-3">
                        <label for="current_password">Mật khẩu hiện tại:</label>
                        <div class="input-group">
                            <Field name="current_password" :type="currentPasswordFieldType" class="form-control"
                                v-model="staffLocal.current_password" required
                                placeholder="Nhập vào mật khẩu hiện tại" />
                            <button type="button" class="input-group-text" @click="toggleCurrentPasswordVisibility">
                                <i :class="currentPasswordEyeIcon"></i>
                            </button>
                        </div>
                        <ErrorMessage name="current_password" class="error-feedback" style="color: rgb(238, 15, 15);" />
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="new_password">Mật khẩu mới:</label>
                        <div class="input-group">
                            <Field name="new_password" :type="newPasswordFieldType" class="form-control"
                                v-model="staffLocal.new_password" required placeholder="Nhập vào mật khẩu mới" />
                            <button type="button" class="input-group-text" @click="toggleNewPasswordVisibility">
                                <i :class="newPasswordEyeIcon"></i>
                            </button>
                        </div>
                        <ErrorMessage name="new_password" class="error-feedback" style="color: rgb(238, 15, 15);" />
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="confirm_password">Xác nhận mật khẩu mới:</label>
                        <div class="input-group">
                            <Field name="confirm_password" :type="confirmPasswordFieldType" class="form-control"
                                v-model="staffLocal.confirm_password" required
                                placeholder="Xác nhận lại mật khẩu mới" />
                            <button type="button" class="input-group-text" @click="toggleConfirmPasswordVisibility">
                                <i :class="confirmPasswordEyeIcon"></i>
                            </button>
                        </div>
                        <ErrorMessage name="confirm_password" class="error-feedback" style="color: rgb(238, 15, 15);" />
                    </div>

                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary button-submit w-100">
                            Change Password
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:staff"],
    data() {
        const staffFormSchema = yup.object().shape({
            current_password: yup
                .string()
                .required("Mật khẩu hiện tại không được để trống.")
                .min(5, "Mật khẩu phải ít nhất 5 ký tự."),
            new_password: yup
                .string()
                .required("Hãy nhập vào mật khẩu mới")
                .notOneOf([yup.ref('current_password')], 'Mật khẩu mới không được trùng với mật khẩu hiện tại')
                .oneOf([yup.ref('new_password')], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu mới')
                .min(5, "Mật khẩu phải ít nhất 5 ký tự."),
            confirm_password: yup
                .string()
                .required("Xác nhận mật khẩu mới")
                .oneOf([yup.ref('new_password')], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu mới')
                .min(5, "Mật khẩu phải ít nhất 5 ký tự."),
        });

        return {
            staffLocal: {
                email: this.getEmail(),
                current_password: "",
                new_password: "",
                confirm_password: ""
            },
            staffFormSchema,
            currentPasswordFieldType: "password",
            newPasswordFieldType: "password",
            confirmPasswordFieldType: "password",
            currentPasswordEyeIcon: "fa fa-eye",
            newPasswordEyeIcon: "fa fa-eye",
            confirmPasswordEyeIcon: "fa fa-eye",
        };
    },

    methods: {
        toggleCurrentPasswordVisibility() {
            this.currentPasswordFieldType = this.currentPasswordFieldType === "password" ? "text" : "password";
            this.currentPasswordEyeIcon = this.currentPasswordEyeIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
        },
        toggleNewPasswordVisibility() {
            this.newPasswordFieldType = this.newPasswordFieldType === "password" ? "text" : "password";
            this.newPasswordEyeIcon = this.newPasswordEyeIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
        },
        toggleConfirmPasswordVisibility() {
            this.confirmPasswordFieldType = this.confirmPasswordFieldType === "password" ? "text" : "password";
            this.confirmPasswordEyeIcon = this.confirmPasswordEyeIcon === "fa fa-eye" ? "fa-solid fa-eye-slash" : "fa fa-eye";
        },
        getEmail() {
            const staffJs = window.localStorage.getItem('staff');
            const staff = JSON.parse(staffJs);
            const email = staff.email;
            return email
        },
        submitStaff() {
            this.$emit("submit:staff", this.staffLocal);
        },
    },
};
</script>