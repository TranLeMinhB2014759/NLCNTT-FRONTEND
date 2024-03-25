<template>
    <div class="container">
        <div class="back d-flex align-items-center">
            <router-link :to="{ name: 'trangchu' }">
                <button class="button-back">
                    <div class="button-box">
                        <span class="button-elem">
                            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                        <span class="button-elem">
                            <svg viewBox="0 0 46 40">
                                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </button>
            </router-link>
            Trang chủ
        </div>
        <div class="row">
            <div class="col-6 text-center">
                <div>SỞ Y TẾ CẦN THƠ</div>
                <div><u><b>PHÒNG KHÁM DA LIỄU</b></u></div>
                <div>Số: xxxx/TB-BVDL</div>
            </div>
            <div class="col-6 text-center">
                <div><strong>CỘNG HÒA XẪ HỘI CHỦ NGHĨA VIỆT NAM</strong></div>
                <div><u><strong>Độc lập - Tự do - Hạnh phúc</strong></u></div>
                <div>Cần Thơ, ngày 20 tháng 3 năm 2024</div>
            </div>
        </div>
        <h4 class="text-center">THÔNG BÁO DANH MỤC GIÁ KHÁM BỆNH</h4>
        <div class="table-responsive">
            <table class="table table-hover table-bordered text-center">
                <thead>
                    <tr class="table-success">
                        <td>STT</td>
                        <td>Mã dịch vụ</td>
                        <td>Danh mục</td>
                        <td>Đơn giá</td>
                        <td>Trạng thái</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(service, index) in sortedServices" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ service.code }}</td>
                        <td>{{ service.tenDichVu }}</td>
                        <td>{{ formatToVND(service.Gia) }}</td>
                        <td v-if="service.status === 'on'">
                            <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đang hoạt động</h3>
                        </td>
                        <td v-else>
                            <h3 class="badge bg-warning"><i class="fa-solid fa-circle fa-2xs"></i> Ngừng cung cấp</h3>
                        </td>
                    </tr>
                </tbody> 
            </table>
        </div>
        <div class="row">
            <div class="col-6"></div>
            <div class="col-6 text-center">
                <strong>GIÁM ĐỐC</strong>
                <div class="signature">Giám đốc phòng khám</div>
            </div>
        </div>
    </div>
</template>
<script>
import ServiceService from "@/services/service.service.js";
export default {
    data() {
        return {
            services: [],
        }
    },
    computed: {
        sortedServices() {
            return this.services.slice().sort((a, b) => {
                return a.code.localeCompare(b.code);
            });
        }
    },
    methods: {
        formatToVND(number) {
            let formattedNumber = number.toLocaleString('vi-VN');
            formattedNumber += "₫";
            return formattedNumber;
        },
        async retrieveServices() {
            try {
                this.services = await ServiceService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.retrieveServices();
    }
}
</script>
<style scoped>
.container{
    margin-bottom: 50px;
}

h4 {
    padding: 20px 0;
}

.bg-success {
    color: white;
    background-color: rgb(65 255 167) !important;
}

.signature{
    margin-top: 50px;
}
</style>