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
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'trangchu' }" class="nav-link" style="color: #ffffff;">
                        Trang Chủ
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'products' }" class="nav-link" style="color: #ffffff;">
                        Thông tin sản phẩm
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>