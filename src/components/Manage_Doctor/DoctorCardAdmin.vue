<script>
export default {
    props: {
        doctor: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row" style="padding: 10px;">
        <div class="p-1 col-3 img-card">
            <img :src="doctor.imgURL" alt="">
        </div>
        <div class="col-9">
            <div class="p-1">
                <strong>Tên:</strong>
                {{ doctor.name }}
            </div>
            <div class="p-1">
                <strong>Học vị:</strong>
                {{ doctor.hocVi }}
            </div>
            <div class="p-1">
                <strong>Thâm niên:</strong>
                {{ doctor.thamNien }}
            </div>
            <div class="p-1">
                <strong>Chuyên môn:</strong>
                {{ doctor.chuyenMon }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.img-card {
    display: flex;
    justify-content: center;
}

.img-card>img {
    max-width: 150px;
    max-height: 150px;
    min-width: 10px;
    min-height: 10px;
}
</style>