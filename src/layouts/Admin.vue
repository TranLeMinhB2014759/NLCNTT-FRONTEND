<script>
export default {
    data() {
        return {
            staff: {},
            isSidebarCollapsed: false,
            activeTab: 1,
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
                case 'admin-staff':
                case 'add-staff':
                case 'edit-staff':
                    this.activeTab = 2;
                    break;
                case 'admin-medicine':
                case 'add-medicine':
                case 'edit-medicine':
                    this.activeTab = 3;
                    break;
                case 'admin-disease':
                case 'add-disease':
                case 'edit-disease':
                    this.activeTab = 4;
                    break;
                case 'admin-room':
                case 'add-room':
                case 'edit-room':
                    this.activeTab = 5;
                    break;
                case 'admin-patient':
                case 'add-patient':
                case 'edit-patient':
                case 'medicalrecord':
                case 'add-medicalrecord':
                case 'edit-medicalrecord':
                    this.activeTab = 6;
                    break;
                case 'admin-bill':
                case 'add-bill':
                    this.activeTab = 7;
                    break;
                default:
                    this.activeTab = 1;
            }
        },
        logout() {
            const confirmed = window.confirm("Bạn có chắc muốn đăng xuất khỏi hệ thống?");
            if (confirmed) {
                window.localStorage.removeItem('staff');
                this.isLoggedIn = false;
                this.$router.push({ name: "login-admin" });
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
                    <span class="align-middle">BỆNH VIỆN DA LIỄU</span>
                </router-link>

                <ul class="sidebar-nav">
                    <li class="sidebar-header">
                        Quản lý
                    </li>

                    <li class="sidebar-item tab-1" :class="{ 'active': activeTab === 1 }" @click="setActiveTab(1)">
                        <router-link :to="{ name: 'welcome' }" class="sidebar-link">
                            <i class="align-middle"></i> <span class="align-middle">Dashboard</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item tab-2" :class="{ 'active': activeTab === 2 }" @click="setActiveTab(2)">
                        <router-link :to="{ name: 'admin-staff' }" class="sidebar-link">
                            <i class="fa-solid fa-hospital-user"></i> <span class="align-middle">Personnel Management</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item tab-3" :class="{ 'active': activeTab === 3 }" @click="setActiveTab(3)">
                        <router-link :to="{ name: 'admin-medicine' }" class="sidebar-link">
                            <i class="fa-solid fa-capsules fa-2xs"></i> <span class="align-middle">Medication
                                Management</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item tab-3" :class="{ 'active': activeTab === 4 }" @click="setActiveTab(4)">
                        <router-link :to="{ name: 'admin-disease' }" class="sidebar-link">
                            <i class="fa-solid fa-square-virus"></i> <span class="align-middle">Disease
                                Management</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item" :class="{ 'active': activeTab === 5 }" @click="setActiveTab(5)">
                        <router-link :to="{ name: 'admin-room' }" class="sidebar-link">
                            <i class="fa-solid fa-house"></i> <span class="align-middle">Room Management</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item" :class="{ 'active': activeTab === 6 }" @click="setActiveTab(6)">
                        <router-link :to="{ name: 'admin-patient' }" class="sidebar-link">
                            <i class="fa-solid fa-clipboard-user"></i> <span class="align-middle">Medical
                                Record</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item" :class="{ 'active': activeTab === 7 }" @click="setActiveTab(7)">
                        <router-link :to="{ name: 'admin-bill' }" class="sidebar-link">
                            <i class="fa-regular fa-money-bill-1"></i> <span class="align-middle">Bill
                                management</span>
                        </router-link>
                    </li>
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
                            <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                                <i class="align-middle" data-feather="settings"></i>
                            </a>

                            <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                                <img :src="staff.imgURL" class="avatar img-fluid rounded me-1" alt="Charles Hall" />
                                <span class="text-dark">{{ staff.name ? staff.name : 'Guest' }}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#"><i class="align-middle me-1"></i>
                                    Profile</a>
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
        </div>
    </div>
    <button onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa-solid fa-arrow-up fa-2xl"></i></button>
</template>

<style scoped>
@import "@/assets/css/dashboard.css";
</style>