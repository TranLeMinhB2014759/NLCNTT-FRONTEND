<template>
    <div class="card">
        <div class="card-body">
            <div class="banner text-center">QUẢN LÝ HÓA ĐƠN</div>
            <div class="container d-flex justify-content-center p-5 m-5 mx-auto" v-if="loadingBills">
                <div class="loader"></div> 
            </div>
            <div class="container" v-else>
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
                    <table class="table table-bordered table-hover text-center" v-if="filteredBillsCount > 0">
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
                            <tr v-for="(bill, index) in paginatedBills" :key="index">
                                <td>{{ bill.name }}</td>
                                <td>{{ bill.phoneNumber }}</td>
                                <td>{{ bill.ngayLap }}</td>
                                <td>{{ bill.nguoiLap }}</td>
                                <td>
                                    <button type="button" class="ml-2 btn btn-info" data-bs-toggle="modal"
                                        :data-bs-target="'#modalBill_' + index">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <div class="modal fade" :id="'modalBill_' + index">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title">Chi tiết</h4>
                                                    <button type="button" class="btn-close"
                                                        data-bs-dismiss="modal"></button>
                                                </div>

                                                <div class="modal-body">
                                                    <h5 class="modal-title" style="padding-bottom: 10px;">BẢNG KÊ KHAI
                                                        CHI PHÍ</h5>
                                                    <div class="d-flex justify-content-start">
                                                        <div class="text-start">
                                                            <p><strong>I. Phần hành chính:</strong></p>
                                                            <p>Họ tên:</p>
                                                            <p>Số điện thoại:&nbsp</p>
                                                            <p>Mã hồ sơ:</p>
                                                            <p><strong>II. Phần chi phí khám chữa bệnh:</strong></p>
                                                        </div>
                                                        <div class="text-start">
                                                            <p>&nbsp;</p>
                                                            <p><strong>{{ bill.name }}</strong></p>
                                                            <p>{{ bill.phoneNumber }}</p>
                                                            <p>{{ bill.MSHS }}</p>
                                                        </div>
                                                    </div>
                                                    <table class="table table-bordered">
                                                        <thead class="table-success">
                                                            <tr>
                                                                <th>Nội dung</th>
                                                                <th>ĐVT</th>
                                                                <th>SL</th>
                                                                <th>Đơn giá <i class="donvi">(đồng)</i></th>
                                                                <th>Thành tiền <i class="donvi">(đồng)</i></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="text-start" v-if="bill.service.length > 0">
                                                            <tr>
                                                                <td colspan="6">
                                                                    <strong>Dịch vụ</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody v-if="bill.service.length > 0">
                                                            <tr v-for="(bill, idx) in bill.service" :key="idx">
                                                                <td class="text-start"> {{ idx + 1 }}. {{ bill.tenDichVu
                                                                    }}</td>
                                                                <td>Lần</td>
                                                                <td>{{ bill.SoLan }}</td>
                                                                <td>{{ formatToVND(bill.Gia) }}</td>
                                                                <td>{{ formatToVND(bill.SoLan * bill.Gia) }}</td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="text-start" v-if="bill.prescription.length > 0">
                                                            <tr>
                                                                <td colspan="6">
                                                                    <strong>Thuốc</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody v-if="bill.prescription.length > 0">
                                                            <tr v-for="(bill, idx) in bill.prescription" :key="idx">
                                                                <td class="text-start"> {{ idx + 1 }}. {{ bill.tenThuoc
                                                                    }}</td>
                                                                <td>{{ bill.Donvi }} </td>
                                                                <td>{{ bill.SoLuongBan }}</td>
                                                                <td>{{ formatToVND(bill.Gia) }}</td>
                                                                <td>{{ formatToVND(bill.SoLuongBan * bill.Gia) }}</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="4"><strong>Tổng cộng</strong></td>
                                                                <td><strong>{{ formatToVND(bill.total_bill) }}</strong>
                                                                </td>
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

                                <td v-if="bill.MSHS === 'Bán lẻ'">
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
                                    <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đã thanh toán
                                    </h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>Không tìm thấy hóa đơn phù hợp.</p>
                </div>
                <!-- Pagination -->
                <ul class="pagination d-flex justify-content-center" v-if="filteredBillsCount > 0">
                    <li class="page-item"><a class="page-link" @click="firstPage"
                            :class="{ 'disabled': currentPage === 1 }"><<</a>
                    </li>
                    <li class="page-item"><a class="page-link" @click="prevPage"
                            :class="{ 'disabled': currentPage === 1 }"><</a>
                    </li>
                    <li class="page-item" v-for="page in paginatedPages" :key="page">
                        <a class="page-link" @click="changePage(page)" :class="{ 'active': page === currentPage }">{{
                            page }}</a>
                    </li>
                    <li class="page-item"><a class="page-link" @click="nextPage"
                            :class="{ 'disabled': currentPage === totalPages }">></a></li>
                    <li class="page-item"><a class="page-link" @click="lastPage"
                            :class="{ 'disabled': currentPage === totalPages }">>></a></li>
                </ul>
                <!-- End Pagination -->
            </div>
        </div>
    </div>
</template>

<script>
import BillService from "@/services/bill.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            loadingBills: false,
            bills: [],
            searchText: "",
            currentPage: 1,
            billsPerPage: 10,
        };
    },
    watch: {
        searchText(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.changePage(1);
            }
        }
    },
    computed: {
        billStrings() {
            return this.bills.map((bill) => {
                const { name, phoneNumber, ngayLap, nguoiLap, MSHS } = bill;
                return [name, phoneNumber, ngayLap, nguoiLap, MSHS].join("");
            });
        },
        filteredBills() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!searchTextLower) return this.bills;
            return this.bills.filter((_bill, index) =>
                this.billStrings[index].toLowerCase().includes(searchTextLower)
            );
        },
        filteredBillsCount() {
            return this.filteredBills.length;
        },
        paginatedBills() {
            const startIndex = (this.currentPage - 1) * this.billsPerPage;
            const endIndex = startIndex + this.billsPerPage;
            const reversedBills = this.filteredBills.slice().reverse();
            return reversedBills.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredBills.length / this.billsPerPage);
        },
        paginatedPages() {
            const visiblePages = 5;
            let startPage = this.currentPage - Math.floor(visiblePages / 2);
            startPage = Math.max(startPage, 1);
            let endPage = startPage + visiblePages - 1;
            endPage = Math.min(endPage, this.totalPages);
            startPage = Math.max(endPage - visiblePages + 1, 1);
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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
        async refreshList() {
            await this.retrieveBills();
        },
        goToAddBill() {
            this.$router.push({ name: 'add-bill' });
        },
        async deleteBill(id) {
            Swal.fire({
                title: "Bạn chắc chắn muốn xóa hóa đơn này không?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                customClass: {
                    confirmButton: "swal2-confirm-red"
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await BillService.delete(id);
                        this.refreshList();
                        toast.success("Delete Succesfully!");
                    } catch (error) {
                        toast.error("Đã có lỗi xảy ra khi xóa");
                    }
                }
            });
        },
        // ------------------------- Pagination -------------------------
        changePage(page) {
            this.currentPage = page;
        },
        firstPage() {
            this.currentPage = 1;
        },
        lastPage() {
            this.currentPage = this.totalPages;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
    async created() {
        this.loadingBills = true;
        try {
            await this.refreshList();
        } catch (error) {
            console.log(error);
        } finally {
            this.loadingBills = false;
        }
    }
};
</script>

<style>
@import "@/assets/css/interface2.css";
i.donvi {
    font-size: small;
}
</style>