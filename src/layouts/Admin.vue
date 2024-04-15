<script>
import form_change from "@/components/Change_Password/Form.vue";
import StaffService from "@/services/staff.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'
export default {
    components: {
        form_change,
    },
    data() {
        return {
            staff: {},
            isSidebarCollapsed: false,
            activeTab: 1,
            message: "",
        };
    },
    methods: {
        setActiveTab(tabNumber) {
            this.activeTab = tabNumber;
        },
        collapseSidebar() {
            this.isSidebarCollapsed = true;
        },
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        updateActiveTab() {
            const currentRouteName = this.$route.name;

            switch (currentRouteName) {
                case 'welcome':
                    this.activeTab = 1;
                    break;
                case 'admin-disease':
                case 'add-disease':
                case 'edit-disease':
                    this.activeTab = 2;
                    break;
                case 'admin-service':
                case 'add-service':
                case 'edit-service':
                    this.activeTab = 3;
                    break;
                case 'admin-room':
                case 'add-room':
                case 'edit-room':
                    this.activeTab = 4;
                    break;
                case 'admin-doctor':
                case 'add-doctor':
                case 'edit-doctor':
                    this.activeTab = 5;
                    break;
                case 'admin-staff':
                case 'add-staff':
                case 'edit-staff':
                    this.activeTab = 6;
                    break;
                case 'admin-medicine':
                case 'add-medicine':
                case 'edit-medicine':
                    this.activeTab = 7;
                    break;
                case 'admin-appointment':
                    this.activeTab = 8;
                    break;
                case 'admin-patient':
                case 'add-patient':
                case 'edit-patient':
                case 'medicalrecord':
                case 'add-medicalrecord':
                case 'edit-medicalrecord':
                    this.activeTab = 9;
                    break;
                case 'admin-bill':
                case 'add-bill':
                    this.activeTab = 10;
                    break;
                case 'admin-statistic':
                    this.activeTab = 11;
                    break
                default:
                    this.activeTab = 1;
            }
        },
        logout() {
            Swal.fire({
                title: "Bạn chắc chắn muốn đăng xuất khỏi hệ thống?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    window.localStorage.removeItem('staff');
                    this.isLoggedIn = false;
                    Swal.fire({
                        icon: "success",
                        title: "Đăng xuất thành công",
                        showConfirmButton: false,
                        timer: 1800
                    });
                    this.$router.push({ name: "login-admin" });
                }
            });
        },
        async changePassword(data) {
            Swal.fire({
                title: "Bạn chắc chắn muốn đổi mật khẩu?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await StaffService.changePassword(data);
                        this.message = "Đổi mật khẩu thành công";
                        Swal.fire({
                            icon: "success",
                            title: this.message,
                            showConfirmButton: true,
                            timer: 2000
                        });
                    } catch (error) {
                        this.handleError(error);
                    }
                }
            });
        },
        handleError(error) {
            console.log(error);
            if (error.response && error.response.status === 401 && error.response.data.message === "Mật khẩu không trùng khớp") {
                toast.error("Mật khẩu hiện tại không đúng");
            } else {
                toast.error("Đã có lỗi xảy ra khi thêm");
            }
        },
    },
    created() {
        const staffData = JSON.parse(window.localStorage.getItem('staff'));
        this.staff = staffData || {};
        this.updateActiveTab();
    }

};
</script>

<template>
    <div class="wrapper-dashboard">
        <nav id="sidebar" :class="{ 'collapsed': isSidebarCollapsed }" class="sidebar js-sidebar">
            <div class="sidebar-content js-simplebar">
                <router-link :to="{ name: 'welcome' }" class="sidebar-brand">
                    <span class="align-middle">PHÒNG KHÁM DA LIỄU</span>
                </router-link>

                <ul class="sidebar-nav">
                    <li class="sidebar-item" :class="{ 'active': activeTab === 1 }" @click="setActiveTab(1)">
                        <router-link :to="{ name: 'welcome' }" class="sidebar-link">
                            <i class="align-middle"></i> <span class="align-middle">Dashboard</span>
                        </router-link>
                    </li>
                    <span v-if="this.staff.role === 'admin'">
                        <li class="sidebar-header">
                            Cơ sở dữ liệu
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 2 }" @click="setActiveTab(2)">
                            <router-link :to="{ name: 'admin-disease' }" class="sidebar-link">
                                <i class="fa-solid fa-square-virus"></i> <span class="align-middle">Disease
                                    Management</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 3 }" @click="setActiveTab(3)">
                            <router-link :to="{ name: 'admin-service' }" class="sidebar-link">
                                <i class="fa-solid fa-stethoscope"></i> <span class="align-middle">Service
                                    Management</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 4 }" @click="setActiveTab(4)">
                            <router-link :to="{ name: 'admin-room' }" class="sidebar-link">
                                <i class="fa-solid fa-house"></i> <span class="align-middle">Room Management</span>
                            </router-link>
                        </li>
                    </span>
                    <span v-if="this.staff.role === 'admin' || this.staff.role === 'cashier'">
                        <li class="sidebar-header">
                            Quản lý
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 5 }" @click="setActiveTab(5)"
                            v-if="this.staff.role === 'admin'">
                            <router-link :to="{ name: 'admin-doctor' }" class="sidebar-link">
                                <i class="fa-solid fa-user-doctor"></i> <span class="align-middle">Doctor
                                    Management</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 6 }" @click="setActiveTab(6)"
                            v-if="this.staff.role === 'admin'">
                            <router-link :to="{ name: 'admin-staff' }" class="sidebar-link">
                                <i class="fa-solid fa-hospital-user"></i> <span class="align-middle">Personnel
                                    Management</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 7 }" @click="setActiveTab(7)"
                            v-if="this.staff.role === 'admin' || this.staff.role === 'cashier'">
                            <router-link :to="{ name: 'admin-medicine' }" class="sidebar-link">
                                <i class="fa-solid fa-capsules fa-2xs"></i> <span class="align-middle">Medication
                                    Management</span>
                            </router-link>
                        </li>
                    </span>
                    <span>
                        <li class="sidebar-header">
                            Hoạt động
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 8 }" @click="setActiveTab(8)"
                            v-if="this.staff.role === 'admin' || this.staff.role === 'receptionist'">
                            <router-link :to="{ name: 'admin-appointment' }" class="sidebar-link">
                                <i class="fa-regular fa-calendar-days"></i> <span
                                    class="align-middle">Appointment</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 9 }" @click="setActiveTab(9)"
                            v-if="this.staff.role === 'admin' || this.staff.role === 'doctor'">
                            <router-link :to="{ name: 'admin-patient' }" class="sidebar-link">
                                <i class="fa-solid fa-clipboard-user"></i> <span class="align-middle">Medical
                                    Record</span>
                            </router-link>
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 10 }" @click="setActiveTab(10)"
                            v-if="this.staff.role === 'admin' || this.staff.role === 'cashier' || this.staff.role === 'doctor'">
                            <router-link :to="{ name: 'admin-bill' }" class="sidebar-link">
                                <i class="fa-regular fa-money-bill-1"></i> <span class="align-middle">Bill
                                    management</span>
                            </router-link>
                        </li>
                    </span>
                    <span
                        v-if="this.staff.role === 'admin' || this.staff.role === 'cashier' || this.staff.role === 'receptionist'">
                        <li class="sidebar-header">
                            Thống kê
                        </li>
                        <li class="sidebar-item" :class="{ 'active': activeTab === 11 }" @click="setActiveTab(11)">
                            <router-link :to="{ name: 'admin-statistic' }" class="sidebar-link">
                                <i class="fa-solid fa-chart-column"></i> <span class="align-middle">Statistic</span>
                            </router-link>
                        </li>
                    </span>
                </ul>
            </div>
        </nav>

        <div class="main">
            <nav class="navbar navbar-expand navbar-light navbar-bg">
                <a class="sidebar-toggle js-sidebar-toggle" @click="toggleSidebar">
                    <i class="hamburger align-self-center"></i>
                </a>

                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav navbar-align">
                        <li class="nav-item dropdown">
                            <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#"
                                data-bs-toggle="dropdown">
                                <i class="align-middle" data-feather="settings"></i>
                            </a>

                            <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#"
                                data-bs-toggle="dropdown">
                                <img :src="staff.imgURL" class="avatar img-fluid rounded me-1" alt="Charles Hall" />
                                <span class="text-dark">{{ staff.name ? staff.name : 'Guest' }}</span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                    data-bs-target="#ModalChangePassword"><i class="align-middle me-1"></i>
                                    Change Password</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" @click="logout">Log out &nbsp;<i
                                        class="fa-solid fa-arrow-right-from-bracket"></i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="content">
                <div class="container-fluid p-0">
                    <router-view></router-view>
                </div>
            </main>
            <div class="modal fade" id="ModalChangePassword">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">Change Password</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <form_change @submit:staff="changePassword" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa-solid fa-arrow-up fa-2xl"></i></button>
</template>

<style scoped>
@import "@/assets/css/dashboard.css";
</style>