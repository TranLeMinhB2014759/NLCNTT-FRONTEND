<script>
import AppHeader from "@/components/Base/Header.vue";
import AppFooter from "@/components/Base/Footer.vue";


export default {

    components: {
        AppHeader,

        AppFooter,
    },
};
</script>

<template>
    <div class="app">
        <AppHeader />
        <router-view />
        <button onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa-solid fa-arrow-up fa-2xl"></i></button>
        <AppFooter />
    </div>
</template>