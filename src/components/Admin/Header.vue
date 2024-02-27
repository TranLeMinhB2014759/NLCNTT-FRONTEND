<template>
    <div class="headera">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light ">
            <!-- Container wrapper -->
            <div class="container-fluid">


                <!-- Collapsible wrapper -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Navbar brand -->
                    <a class="navbar-brand mt-2 mt-lg-0" href="#">
                        <img class="img-rounded" alt="Cinque Terre" src="@/assets/images/logo.png" border-radius="50%"
                            loading="lazy" />
                    </a>
                    <!-- Left links -->

                    <!-- Left links -->
                </div>
                <!-- Collapsible wrapper -->

                <!-- Right elements -->
                <div class="d-flex align-items-center">
                        <a class=" d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar"
                            role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                            <img src="@/assets/images/user.jpg" class="rounded-circle" height="55" width="60"
                                alt="Black and White Portrait of a Man" loading="lazy" />
                        </a>
                        
                        <div class="ad-name">ADMIN</div>
                </div>
                <!-- Right elements -->
            </div>
            <!-- Container wrapper -->
        </nav>
        <!-- Navbar -->
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.headera {
    background: linear-gradient(100deg, rgba(250, 250, 250, 1) 0%, rgb(250 250 250) 6%, rgba(53, 160, 255, 1) 46%, rgba(0, 212, 255, 1) 100%);
}

.img-rounded {
    width: 60px;
    height: 60px;

    border-radius: 50%;
}

.ad-name{
    color: white;
    margin-left: 10px;
    font-size: 15px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
}
</style>