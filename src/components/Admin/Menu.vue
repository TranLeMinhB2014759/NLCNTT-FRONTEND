<template>
    <div class="menu">
        <table class="table align-middle  table-secondary">
            <thead class="bg-light">
                <tr>
                    <th style="text-align:  center;">
                        <i class="fa-regular fa-hospital"></i>&nbsp
                        DERMATOLOGY CLINIC
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">
                        <i class="fa-solid fa-users-line"></i>&nbsp
                        <router-link :to="{ name: 'admin-staff' }" style="text-decoration: none; class " class="textp">
                            Quản lí nhân viên

                        </router-link>
                    </td>
                </tr>
                <tr>
                    <td class="text-center">
                        <i class="fa-solid fa-capsules"></i>&nbsp
                        <router-link :to="{ name: 'admin-medicine' }" style="text-decoration: none; class " class="textp">
                            Quản lí thuốc
                        </router-link>
                    </td>
                </tr>
                <tr>
                    <td class="text-center">
                        <i class="fa-solid fa-cash-register"></i>&nbsp
                        <!-- <router-link :to="{ name: 'admin-order' }" style="text-decoration: none; class " class="textp">
                            Thống kê đơn hàng
                        </router-link> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="button">
            <button class="cssbuttons-io-button" @click="logout">
                Đăng xuất
                <div class="icon">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            fill="currentColor"></path>
                    </svg>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            const confirmed = window.confirm("Bạn có chắc muốn đăng xuất khỏi hệ thống?");
            if (confirmed) {
                window.localStorage.removeItem('staff');
                this.isLoggedIn = false;
                this.$router.push({ name: "login-admin" });
            }
        },
    }

}
</script>

<style scoped>
.menu {
    height: 100%;
    background-color: #f2f2f2;
}

.table tbody tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.table>:not(caption)>*>* {
    padding: 0.75rem 0.5rem !important;
}

.table thead tr th {
    color: rgb(12, 113, 61);
}

.table tbody tr td {
    padding-left: 40px;
    font-weight: 700;
}

.table tbody tr td .textp {
    color: #000;
}

.table tbody tr td .textp:hover {
    color: rgb(12, 113, 61);
}

.table tbody tr:hover td {
    color: rgb(12, 113, 61);
}

.table tbody tr:hover:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: rgb(12, 113, 61);
    /* Change to the desired line color */
}

/* -------------------- BTN LOGOUT --------------------------- */
@media only screen and (min-width: 1000px) {
    .button {
        position: relative;
        top: 55%;
    }
}

.button {
    display: flex;
    justify-content: center;
}

.cssbuttons-io-button {
    background: #a370f0;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
    cursor: pointer;
}

.cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    right: 0.3em;
    transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
}

.cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
    transform: scale(0.95);
}
</style>