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
                        <img class="img-rounded" alt="Cinque Terre" src="@/assets/img/logo.png" border-radius="50%"
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
                            <img src="@/assets/img/user.jpg" class="rounded-circle" height="55" width="60"
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
    background-color: rgb(12, 113, 61);
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