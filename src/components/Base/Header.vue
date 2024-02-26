<template>
    <div>
        <nav class="navbar navbar-expand-sm bg-banner">
            <div class="container-fluid">
                <a href="" class="navbar-brand">
                    <router-link :to="{ name: 'trangchu' }" class="nav-link">
                        <img src="@/assets/images/logo.png" alt="" class="logo-img mr-2">
                        <span class="logo-text">PHÒNG KHÁM DA LIỄU</span>
                    </router-link>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-row-reverse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-if="!isLoggedIn" @click="loginUser()">
                            <router-link :to="{ name: 'login' }" class="login">
                                Đăng Nhập
                            </router-link>

                        </li>
                        <li class="nav-item" v-if="!isLoggedIn" @click="signupUser()">
                            <router-link :to="{ name: 'signup' }" class="register">
                                Đăng Ký
                            </router-link>
                        </li>
                        <div class="dropdown" v-else>
                            <a class="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                <img src="@/assets/images/user.jpg" class="rounded-circle" height="55" width="60" alt="User"
                                    loading="lazy" />
                            </a>
                            <ul class="dropdown-menu">
                                <!-- <li>
                                    <a class="dropdown-item" @click="OpenModalRegister">Thay đổi thông tin</a>
                                </li> -->
                                <li>
                                    <a class="dropdown-item" @click="logout">Đăng xuất &nbsp<i
                                            class="fa fa-sign-out"></i></a>
                                </li>
                                <AModal :isShowModalRegister="isShowModalRegister"
                                    :closeModalRegister="closeModalRegister" />
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <div>
            <nav class="navbar navi">
                <div class="nav-item" style="margin: auto; margin-right: 16px; color: white;">
                    <router-link :to="{ name: 'trangchu' }" class="nav-link" style="color: #ffffff;">
                        <i class="fa-solid fa-house"></i>
                        Trang Chủ
                    </router-link>
                </div>
                <div class="nav-item" style="margin-right: 16px; color: white">
                    <router-link :to="{ name: 'products' }" class="nav-link" style="color: #ffffff;">
                        <i class="fa-solid fa-lemon"></i>
                        Sản phẩm
                    </router-link>
                </div>

                <div class="nav-item" style="margin-right: 16px; color: white; "  v-if="isLoggedIn">
                    <router-link :to="{ name: 'order' }" class="nav-link" style="color: #ffffff;">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Giỏ hàng
                    </router-link>
                </div>
                <div :class="'nav-item'" style="color: white;margin-right: auto;"></div>

            </nav>

        </div>
    </div>
</template>


<script>
export default {
    components: {
        Modal,

    },
    data() {
        return {
            isLoggedIn: false,
            AModalVisible: false
        };
    },

    mounted() {
        // Khai báo biến intervalId bằng let hoặc const
        let intervalId;

        // Gọi đoạn code mỗi 5 giây và lưu giá trị được trả về bởi setInterval
        intervalId = setInterval(() => {
            const userJs = window.localStorage.getItem('user');
            const user = JSON.parse(userJs);


            if (user) {
                // console.log('user', user);
                this.isLoggedIn = true;
            }
        }, 100); // Gọi mỗi 0,1 giây 

        // Để dừng việc gọi đoạn code sau một thời gian hoặc khi điều kiện nào đó được thỏa mãn, bạn có thể sử dụng clearInterval(intervalId)

        // Ví dụ: Dừng việc gọi đoạn code sau 300 giây
        setTimeout(() => {
            clearInterval(intervalId);
        }, 3000000);
    },

    methods: {
        logout() {
            const confirmed = window.confirm("Bạn có chắc muốn đăng xuất tài khoản?");
            if (confirmed) {
            window.localStorage.removeItem('user');
            this.isLoggedIn = false;


            this.$router.push({ name: "trangchu" });
            }
        },
        loginUser() {

            this.$router.push({ name: "login" });
        },
        signupUser() {

            this.$router.push({ name: "signup" });
        },
        openModal() {
            this.AModalVisible = false;
        },

    }
};
</script>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Admin/Modal.vue";


const isShowModalRegister = ref(false)

const OpenModalRegister = () => {
    isShowModalRegister.value = true;
};
const closeModalRegister = () => {
    isShowModalRegister.value = false;
};
</script>


<style scoped>
.bg-banner{
    background: linear-gradient(100deg, rgba(250,250,250,1) 0%, rgb(250 250 250) 25%, rgba(53,160,255,1) 46%, rgba(0,212,255,1) 100%);
}
.logo-img {
    width: 80px;
}

.logo-text {
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
    margin-left: 10px;
}

.navi {
    background-color: #2f5bfd;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 1px;
}
.nav-item {
    cursor: pointer;
    margin: 0 10px;
    position: relative;
}

.nav-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
}

.nav-item:hover::after {
    transform: scaleX(1);
}

.login {
    text-decoration: none;
    color: black;
}

.register {
    text-decoration: none;
    color: black;
}

/* .login:hover {
    text-decoration: none;
    color: rgb(4, 215, 0);

}

.register:hover {
    text-decoration: none;
    color: rgb(4, 215, 0);

} */

.dropdown-menu {
    margin-left: -100px;
}</style>