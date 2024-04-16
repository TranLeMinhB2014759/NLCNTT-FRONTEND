<template>
    <nav class="navbar navbar-expand-sm bg-banner">
        <div class="row container-fluid">
            <div class="col-12 col-lg-3 navbar-brand">
                <router-link :to="{ name: 'trangchu' }" class="nav-link">
                    <img src="@/assets/images/logo.png" alt="" class="logo-img mr-2">
                    <span class="logo-text">PHÒNG KHÁM DA LIỄU</span>
                </router-link>
            </div>
            <div class="col-12 col-lg-6 slogan">
                <div class="stage">
                    <div class="wrapper">
                        <div class="slash"></div>
                        <div class="sides">
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                        </div>
                        <div class="text">
                            <div class="text--backing">Tận&nbsp;tâm&nbsp;-&nbsp;Uy&nbsp;tín&nbsp;-&nbsp;Chất&nbsp;lượng
                            </div>
                            <div class="text--left">
                                <div class="inner">Tận&nbsp;tâm&nbsp;-&nbsp;Uy&nbsp;tín&nbsp;-&nbsp;Chất&nbsp;lượng
                                </div>
                            </div>
                            <div class="text--right">
                                <div class="inner">Tận&nbsp;tâm&nbsp;-&nbsp;Uy&nbsp;tín&nbsp;-&nbsp;Chất&nbsp;lượng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="hotline">HOTLINE: (+84) 939111333</div>
            </div>
        </div>
    </nav>

    <nav class="navbar navbar-expand-sm nav">
        <div class="container">
            <ul class="nav">
                <li class="nav-item" :class="{ 'active': isCurrentPage('trangchu') }">
                    <router-link :to="{ name: 'trangchu' }" class="nav-link" style="color: #ffffff;">
                        Trang Chủ
                    </router-link>
                </li>
                <li class="nav-item" :class="{ 'active': isCurrentPage('san-pham') }">
                    <router-link :to="{ name: 'san-pham' }" class="nav-link" style="color: #ffffff;">
                        Thông tin sản phẩm
                    </router-link>
                </li>
                <li class="nav-item" :class="{ 'active': isCurrentPage('bao-gia-dich-vu') }">
                    <router-link :to="{ name: 'bao-gia-dich-vu' }" class="nav-link" style="color: #ffffff;">
                        Báo giá dịch vụ
                    </router-link>
                </li>
                <li class="nav-item" :class="{ 'active': isCurrentPage('doi-ngu-bac-si') }">
                    <router-link :to="{ name: 'doi-ngu-bac-si' }" class="nav-link" style="color: #ffffff;">
                        Đội ngũ bác sĩ
                    </router-link>
                </li>
            </ul>
            <ul class="nav">
                <li class="nav-item" :class="{ 'active': isCurrentPage('tra-cuu-don-thuoc') }">
                    <router-link :to="{ name: 'tra-cuu-don-thuoc' }" class="nav-link" style="color: #ffffff;">
                        Tra cứu đơn thuốc
                    </router-link>
                </li>
                <li class="nav-item":class="{ 'active': isCurrentPage('dat-lich-kham-benh') }">
                    <router-link :to="{ name: 'dat-lich-kham-benh' }" class="nav-link" style="color: #ffffff;">
                        Đặt lịch khám bệnh
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    methods: {
        isCurrentPage(pageName) {
            return this.$route.name === pageName;
        }
    }
}
</script>