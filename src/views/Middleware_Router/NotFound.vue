<template>
    <div class="container-fluid text-center">
        <section class="page_404">
            <div class="container">

                <div class="four_zero_four_bg">
                    <h1 class="text-center ">404 Not Found</h1>
                </div>
                <div class="contant_box_404">
                    <h3 class="h2">
                        Look like you're lost
                    </h3>
                    <p>Oops! It seems that this page dose not exist</p>
                    <router-link :to="{ name: 'trangchu' }" class="link_404">
                        Trở về Trang Chủ
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
}

.four_zero_four_bg {
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
}

.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    text-decoration: none;
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    margin-top: -50px;
}
</style>