<template>
    <div class="card">
        <div class="card-body">
            <div class="banner text-center">QUẢN LÝ HÓA ĐƠN</div>
            <div class="container">
                <button class="btn btn-sm text-success" @click="goToAddBill()">
                    <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
                </button>
                <div class="row">
                    <div class="container col-12 col-sm-4">
                        <InputSearch v-model="searchText" />
                    </div>
                    <div class="col-sm-8"></div>
                </div>
                <div class="container mt-3 table-responsive">
                    <table class="table table-bordered table-hover text-center" v-if="filteredBillsCount > 0"
                        :bills="filteredBills">
                        <thead class="table-success">
                            <tr>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Ngày lập</th>
                                <th>Người lập</th>
                                <th>Chi tiết</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(bill, index) in filteredBills.slice().reverse()" :key="index"
                            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                                <td>{{ bill.name }}</td>
                                <td>{{ bill.phoneNumber }}</td>
                                <td>{{ bill.ngayLap }}</td>
                                <td>{{ bill.nguoiLap }}</td>
                                <td>
                                    <button type="button" class="ml-2 btn btn-info" data-bs-toggle="modal" :data-bs-target="'#modalBill_' + index">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <div class="modal fade" :id="'modalBill_' + index">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title">Chi tiết</h4>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                </div>

                                                <div class="modal-body">
                                                    <h5 class="modal-title" style="padding-bottom: 10px;">BẢNG KÊ KHAI CHI PHÍ KHÁM BỆNH</h5>
                                                    <div class="d-flex justify-content-start">
                                                        <div class="text-start">
                                                            <p><strong>I. Phần hành chính:</strong></p>
                                                            <p>Họ tên:</p>
                                                            <p>Số điện thoại:&nbsp</p>
                                                            <p>Đơn thuốc:</p>
                                                            <p><strong>II. Phần chi phí khám chữa bệnh:</strong></p>
                                                        </div>
                                                        <div class="text-start">
                                                            <p>&nbsp;</p>
                                                            <p><strong>{{ bill.name }}</strong></p>
                                                            <p>{{ bill.phoneNumber}}</p>
                                                            <p>{{ bill.MSDT }}</p>
                                                        </div>
                                                    </div>
                                                    <table class="table table-bordered">
                                                        <thead class="table-success">
                                                            <tr>
                                                                <th>STT</th>
                                                                <th>Tên thuốc</th>
                                                                <th>ĐVT</th>
                                                                <th>SL</th>
                                                                <th>Đơn giá <i class="donvi">(đồng)</i></th>
                                                                <th>Thành tiền <i class="donvi">(đồng)</i></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(bill, idx) in bill.prescription" :key="idx">
                                                                <td>{{ idx + 1 }}</td>
                                                                <td class="text-start">{{ bill.tenThuoc }}</td>
                                                                <td>{{ bill.Donvi }} </td>
                                                                <td>{{ bill.SoLuongBan }}</td>
                                                                <td>{{ formatToVND(bill.Gia) }}</td>
                                                                <td>{{ formatToVND(bill.SoLuongBan * bill.Gia) }}</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="5"><strong>Tổng cộng</strong></td>
                                                                <td><strong>{{ formatToVND(bill.total_bill) }}</strong></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                    <div class="d-flex">
                                                        <div class="text-start justify-content-start">
                                                            <p>Hãy kiểm tra lại hóa đơn trước khi rời quầy!</p>
                                                        </div>
                                                        <div class="justify-content-end">
                                                            <div class="justify-content-end">
                                                                <p>Cần Thơ, {{ bill.ngayLap }}</p>
                                                                <p>Người Lập</p>
                                                                <strong>{{ bill.nguoiLap }}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                    <router-link
                                                        :to="{ name: 'PrintBill', params: { idbill: bill._id } }"
                                                        target="_blank">
                                                        <button type="button" class="btn btn-primary"
                                                            data-bs-dismiss="modal">Preview</button>
                                                    </router-link>
                                                    <button type="button" class="btn btn-danger"
                                                        data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <!-- <td v-if="getCurrentStaff() === bill.nguoiLap">
                                    <button type="button" class="ml-2 btn btn-danger" @click="deleteBill(bill._id)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                                <td v-else>
                                    <button type="button" class="ml-2 btn btn-danger" disabled>
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td> -->

                                <td v-if="bill.MSDT === 'Bán lẻ'">
                                    <span v-if="getCurrentStaff() === bill.nguoiLap">
                                        <button type="button" class="ml-2 btn btn-danger" @click="deleteBill(bill._id)">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </span>
                                    <span v-else>
                                        <button type="button" class="ml-2 btn btn-danger" disabled>
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </span>
                                </td>
                                <td v-else>
                                    <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đã bán</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>Không tìm thấy hóa phù hợp.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BillService from "@/services/bill.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            bills: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    computed: {
        billStrings() {
            return this.bills.map((bill) => {
                const { name, phoneNumber, ngayLap, MSDT } = bill;
                return [name, phoneNumber, ngayLap, MSDT ].join("");
            });
        },
        filteredBills() {
            if (!this.searchText) return this.bills;
            return this.bills.filter((_bill, index) =>
                this.billStrings[index].includes(this.searchText)
            );
        },
        filteredBillsCount() {
            return this.filteredBills.length;
        },
        billAges() {
            return this.bills.map((bill) => this.calculateAge(bill.year));
        },
    },
    methods: {
        formatToVND(number) {
            let formattedNumber = number.toLocaleString('vi-VN');
            return formattedNumber;
        },
        getCurrentStaff() {
            const staffData = JSON.parse(window.localStorage.getItem('staff'));
            this.staff = staffData || {};
            return `${this.staff.name}`;
        },

        async retrieveBills() {
            try {
                this.bills = await BillService.getAll();
            } catch (error) {
                console.error(error);
            }
        },
        refreshList() {
            this.retrieveBills();
            this.activeIndex = -1;
        },
        goToAddBill() {
            this.$router.push({ name: 'add-bill' });
        },
        updateActiveIndex(index) {
            this.activeIndex = index;
        },
        async deleteBill(id) {
            const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
            if (confirmed) {
                await BillService.delete(id);
                this.refreshList();
                toast.success("Delete Succesfully!");
            }
        },
    },
    created() {
        this.refreshList();
    },
};
</script>

<style>
.badge {
    --bs-badge-color: black !important;
}

.banner {
    background-color: antiquewhite;
    padding: 10px;
    margin-bottom: 15px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    font-weight: 600;
}

i.donvi {
    font-size: small;
}

.bg-success{
    color: white;
    background-color: rgb(65 255 167) !important;
}
</style>