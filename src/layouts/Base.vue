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
        <AppFooter />
    </div>
</template>