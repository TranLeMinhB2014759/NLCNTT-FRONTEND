<script>
export default {
    props: {
        medicine: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row" style="padding: 10px;">
        <div class="p-1 col-3 img-card">
            <img :src="medicine.imgURL" alt="">
        </div>
        <div class="col-9">
            <div class="p-1">
                <strong>Tên thuốc: </strong>
                {{ medicine.tenThuoc }}
            </div>
            <div class="p-1">
                <strong>Giá:</strong>
                {{ medicine.Gia }}
            </div>
            <div class="p-1">
                <strong>Mô tả:</strong>
                {{ medicine.MoTa }}
            </div>
            <div class="p-1">
                <strong>Số lượng:</strong>
                {{ medicine.SoLuong }}
            </div>
            <div class="p-1">
                <strong>Ghi chú:</strong>
                {{ medicine.GhiChu }}
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