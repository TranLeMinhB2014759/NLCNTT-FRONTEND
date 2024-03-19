<script>
export default {
    props: {
        medicine: { type: Object, required: true },
    },
    methods: {
        formatToVND(number) {
            let formattedNumber = number.toLocaleString('vi-VN');
            formattedNumber += '₫';
            return formattedNumber;
        },
        isExpiringSoon(expiryDate) {
            const sixty = new Date();
            sixty.setDate(sixty.getDate() + 60);
            const expiry = new Date(expiryDate);
            const today = new Date();

            const differenceInTime = expiry.getTime() - today.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

            if (expiry <= sixty) {
                return differenceInDays <= 0 ? 0 : differenceInDays;
            } else {
                return -1;
            }
        }
    }
};
</script>

<template>
    <div class="row" style="padding: 10px;">
        <div class="p-1 col-12 col-3 col-md-3 img-card">
            <img :src="medicine.imgURL" alt="">
        </div>
        <div class="col-12 col-md-9">
            <div class="p-1">
                <strong>Tên thuốc: </strong>
                {{ medicine.tenThuoc }}
            </div>
            <div class="p-1">
                <strong>Giá:</strong>
                {{ formatToVND(medicine.Gia) }} / {{ medicine.Donvi }}
            </div>
            <div class="p-1">
                <strong>Số lượng:</strong>
                {{ medicine.SoLuong }}
            </div>
            <div class="p-1">
                <strong>Hạn sử dụng:</strong>
                {{ medicine.HSD }}
                <span v-if="isExpiringSoon(medicine.HSD) > 0">
                    (Còn {{ isExpiringSoon(medicine.HSD) }} ngày)
                </span>
                <span v-else-if="isExpiringSoon(medicine.HSD) === 0">
                    (Đã hết hạn)
                </span>
            </div>
            <div class="p-1">
                <strong>Mô tả:</strong>
                <div class="card">
                    <div class="card-header text-center">
                        <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
                            <strong>Xem chi tiết <i class="fa-solid fa-caret-down"></i></strong>
                        </a>
                        <div id="collapseOne" class="collapse">
                            <div class="card-body">
                                <p class="text-start">
                                    {{ medicine.MoTa }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="p-1">
                <strong>Ghi chú:</strong>
                <div class="card">
                    <div class="card-header text-center">
                        <a class="btn" data-bs-toggle="collapse" href="#collapseSecond">
                            <strong>Xem chi tiết <i class="fa-solid fa-caret-down"></i></strong>
                        </a>
                        <div id="collapseSecond" class="collapse">
                            <div class="card-body">
                                <p class="text-start">
                                    {{ medicine.GhiChu }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-1">
                <strong>Nhà cung cấp:</strong>
                {{ medicine.nhaCungCap }}
            </div>
            <div v-if="medicine.status === 'on'" class="p-1">
                <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đang hoạt động</h3>
            </div>
            <div v-else class="p-1">
                <h3 class="badge bg-warning"><i class="fa-solid fa-circle fa-2xs"></i> Ngừng hoạt động</h3>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-success{
    background-color: rgb(65 255 167) !important;
}
.row{
    font-size: 20px;
}
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