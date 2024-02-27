<style>
@import "@/assets/css/formLogin.css";
</style>
<template>
	<div class="limiter">
		<div class="container-login">
			<div class="wrap-login slide">
				<div class="login-pic" data-tilt>
					<img src="@/assets/images/img-login.jpg" alt="IMG">
				</div>

				<Form action="#" id="signupForm" method="POST" class="login-form validate-form" style="margin-top: -37px;" @submit="submitUser" :validation-schema="userFormSchema">
					<strong class="login-form-title">
						Member Sign Up
					</strong>
					<div class="wrap-input">
						<Field type="text" class="input" name="name" placeholder="Enter your name" v-model="userLocal.name" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa-sharp fa-solid fa-user-secret" aria-hidden="true"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="name" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>
					

					<div class="wrap-input">
						<Field type="email" class="input" name="email" placeholder="Enter your email" v-model="userLocal.email" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa-solid fa-envelope"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="email" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>

					<div class="wrap-input">
						<Field type="phoneNumber" class="input" name="phoneNumber" placeholder="Enter your phone number" v-model="userLocal.phoneNumber" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa-solid fa-phone"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="phoneNumber" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>

					<div class="wrap-input">
						<Field type="address" class="input" name="address" placeholder="Enter your address" v-model="userLocal.address" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa-solid fa-location-dot"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="address" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>

					<div class="wrap-input">
						<Field :type="showPassword ? 'text' : 'password'" class="input" name="password" placeholder="Enter your password" v-model="userLocal.password" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="password" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>
					
					<div class="wrap-input">
						<Field :type="showPassword ? 'text' : 'password'" class="input" name="respassword" placeholder="Enter the password" v-model="userLocal.respassword" />
						<span class="focus-input"></span>
						<span class="symbol-input">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<div class="error-message">
						<ErrorMessage name="respassword" class="error-feedback" style="color: rgb(238, 15, 15);" />
					</div>

					<div class="container-login-form-btn">
						<button class="login-form-btn" type="submit">
							Sign Up
						</button>
					</div>
					<div class="text-center login-signup">
						<a class="txt" href="/login">
							Login
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
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
        Field,
        Form,
        ErrorMessage,
    },


    emits: ["submit:user"],


    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
			address: yup
                .string()
                .required("Địa chỉ không được để trống."),

			phoneNumber: yup
                .string()
                .required("Số điện thoại không được để trống."),

            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(5, "Mật khẩu phải ít nhất 5 ký tự.")
                .max(10, "Mật khẩu có nhiều nhất 10 ký tự."),

            respassword: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(5, "Mật khẩu phải ít nhất 5 ký tự.")
                .max(10, "Mật khẩu có nhiều nhất 10 ký tự.")
                .test("password-match", "Mật khẩu không khớp.", function (value) {
                    return value === this.parent.password;
                }),

        });
        return {
            userLocal: {
                name: "",
                email: "",
				address: "",
				phoneNumber: "",
                password: "",
                respassword: "",
				imgURL: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
                // Initialize as a boolean value
            },
            userFormSchema,
            showPassword: false,
        };

    },
    methods: {
        submitUser() {


            this.$emit("submit:user", this.userLocal);
        }

    },

};



</script>