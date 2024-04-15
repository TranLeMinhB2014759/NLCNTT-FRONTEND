<template>
    <h1 class="h3 mb-3"><strong>Phân Tích</strong> Tổng Quan </h1>
    <div class="w-100">
        <div class="row">
            <div class="col-12 col-lg-6 col-xl-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Hóa đơn</h5>
                                </div>
                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-truck align-middle">
                                            <rect x="1" y="3" width="15" height="13"></rect>
                                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 class="mt-1 mb-3">{{ formatToThounsand(dataBills.length) }}</h1>
                        </div>
                        <div class="mb-0 text-center">
                            <router-link :to="{ name: 'admin-bill' }" target="_blank" class="btn btn-light">
                                <span class="text-center">Xem danh sách chi tiết <i
                                        class="fa-solid fa-circle-chevron-right"></i></span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Bệnh nhân</h5>
                                </div>
                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-users align-middle">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 class="mt-1 mb-3">{{ formatToThounsand(dataPatients.length) }}</h1>
                        </div>
                        <div class="mb-0 text-center">
                            <router-link :to="{ name: 'admin-patient' }" target='_blank' class="btn btn-light">
                                <span class="text-center">Xem danh sách chi tiết <i
                                        class="fa-solid fa-circle-chevron-right"></i></span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Thuốc</h5>
                                </div>
                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75"
                                            viewBox="0 0 576 512">
                                            <path fill="#0091ff"
                                                d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48V256H64V144zM0 144V368c0 61.9 50.1 112 
                                                112 112s112-50.1 112-112V189.6c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3 
                                                156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3 50.8-47.3 
                                                83V144c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3 11.9-71c21.2-15.1 50.5-10.3 
                                                66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4 1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 class="mt-1 mb-3">{{ formatToThounsand(dataMedicines.length) }}</h1>
                        </div>
                        <div class="mb-0 text-center">
                            <button class="btn btn-light" @click="goToMedicineList">
                                <span class="text-center">Xem biểu đồ tồn kho <i
                                        class="fa-solid fa-circle-chevron-right"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-body">
                            <div class="row">
                                <div class="col mt-0">
                                    <h5 class="card-title">Doanh thu</h5>
                                </div>
                                <div class="col-auto">
                                    <div class="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-dollar-sign align-middle">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 class="mt-1 mb-3">{{ calculateTotal() }}₫</h1>
                        </div>
                        <div class="mb-0 text-center">
                            <button class="btn btn-light" @click="goToTotalBillChart">
                                <span class="text-center">Xem biểu đồ doanh thu <i
                                        class="fa-solid fa-circle-chevron-right"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="radio-inputs">
                        <label class="radio">
                            <input type="radio" v-model="selectedOption" value="Ngay" @change="updateData">
                            <span class="name">Theo ngày</span>
                        </label>
                        <label class="radio">
                            <input type="radio" v-model="selectedOption" value="Thang" @change="updateData">
                            <span class="name">Theo tháng</span>
                        </label>
                        <label class="radio">
                            <input type="radio" v-model="selectedOption" value="Nam" @change="updateData">
                            <span class="name">Theo năm</span>
                        </label>
                    </div>
                    <canvas ref="totalBillCanvas" id="total_bill" style="width:100%; margin-bottom: 100px"></canvas>
                    <div v-if="statistics.length === 0">
                        Không có dữ liệu thống kê.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <select v-model="selectedDate" @change="updateSelectAndrenderPieChart">
                        <option v-for="date in statistics.total_each_part.map(data => data.date)" :value="date">{{ date
                            }}</option>
                    </select>
                    <canvas id="total_each_part" style="width:100%; margin-bottom: 100px"></canvas>
                    <div class="text-center"
                        v-if="statistics.total_each_part.length > 0 && statistics.total_each_part.some(data => data.date === selectedDate && data.total_service === 0 && data.total_prescription === 0)">
                        Không có doanh thu
                    </div>
                    <div v-else-if="statistics.total_each_part.length === 0">
                        Không có dữ liệu thống kê.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <canvas id="inventory" style="width:100%; margin-bottom: 100px"></canvas>
                    <div v-if="dataMedicines.length === 0">
                        Không có dữ liệu thống kê.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5><strong>Danh sách thuốc sắp hết hạn</strong></h5>
                    <div v-if="this.dataMedicines.filter(medicine => isExpiringSoon(medicine.HSD) > 0).length > 0"
                        class="list-expiring">
                        <div class="p-1"
                            v-for="(medicine, index) in this.dataMedicines.filter(medicine => isExpiringSoon(medicine.HSD) >= 0)"
                            :key="index">
                            <strong>{{ medicine.tenThuoc }}:</strong> {{ medicine.SoLuong }} {{ medicine.Donvi }}
                            <span v-if="isExpiringSoon(medicine.HSD) > 0">
                                (Còn {{ isExpiringSoon(medicine.HSD) }} ngày)
                            </span>
                            <span v-else-if="isExpiringSoon(medicine.HSD) === 0">
                                (Đã hết hạn)
                            </span>
                        </div>
                    </div>
                    <div v-else>
                        Tất cả thuốc đều còn hạn sử dụng
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BillService from "@/services/bill.service";
import PatientService from "@/services/patient.service";
import MedicalrecordService from "@/services/medicalrecord.service";
import MedicineService from "@/services/medicine.service";
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            selectedOption: 'Ngay',
            selectedDate: '',
            dataBills: [],
            dataPatients: [],
            dataRecords: [],
            dataMedicines: [],
            statistics: {
                totals: [],
                total_each_part: []
            },
        };
    },

    async mounted() {
        await this.getBills();
        await this.updateData();
        this.updateSelectAndrenderPieChart();
        await this.getMedicines();
        this.renderInventoryChart();
    },

    methods: {
        goToMedicineList() {
            window.scrollTo({
                top: window.scrollY + 10000,
                behavior: 'smooth',
            });
        },

        goToTotalBillChart() {
            const canvasElement = this.$refs.totalBillCanvas;

            if (canvasElement) {
                const canvasPosition = canvasElement.getBoundingClientRect().top;

                window.scrollTo({
                    top: window.scrollY + canvasPosition - 80,
                    behavior: 'smooth',
                });
            }
        },

        formatToThounsand(number) {
            let formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return formattedNumber;
        },

        calculateTotal() {
            let total = 0;
            this.dataBills.forEach(bill => {
                total += bill.total_bill;
            });
            return this.formatToThounsand(total);
        },

        async getBills() {
            try {
                this.dataBills = await BillService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async getPatients() {
            try {
                this.dataPatients = await PatientService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async getRecords() {
            try {
                this.dataRecords = await MedicalrecordService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async getMedicines() {
            try {
                this.dataMedicines = await MedicineService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async updateData() {
            const bills = this.dataBills.map(bill => ({
                ngayLap: bill.ngayLap,
                total_service: bill.total_service,
                total_prescription: bill.total_prescription,
                total_bill: bill.total_bill
            }));
            this.statistics = this.calculateTotalBills(bills);
            this.renderTotalBillChart();
            if (this.statistics.total_each_part.length > 0) {
                this.selectedDate = this.statistics.total_each_part[0].date;
            }
            this.updateSelectAndrenderPieChart();
            // console.log(this.calculateTotalBills(bills))
        },

        calculateTotalBills(bills) {
            const totals = [];
            const total_each_part = [];

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            if (this.selectedOption === 'Ngay') {
                const startDate = new Date(currentDate);
                startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)); // Lùi lại để có 7 ngày gần đây
                for (let i = 0; i < 7; i++) {
                    const dateKey = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
                    totals.push({ date: dateKey, total: 0 });
                    total_each_part.push({ date: dateKey, total_service: 0, total_prescription: 0 });
                    startDate.setDate(startDate.getDate() + 1);
                }

                bills.forEach(bill => {
                    const dateParts = bill.ngayLap.split(', ');
                    const [day, month, year] = dateParts[1].split('/').map(part => parseInt(part, 10));
                    const key = `${day}/${month}/${year}`;
                    const index = totals.findIndex(item => item.date === key);
                    const index_each_part = total_each_part.findIndex(item => item.date === key);
                    if (index !== -1) {
                        totals[index].total += bill.total_bill;
                    }
                    if (index_each_part !== -1) {
                        total_each_part[index_each_part].total_service += bill.total_service;
                        total_each_part[index_each_part].total_prescription += bill.total_prescription;
                    }
                });
            }

            if (this.selectedOption === 'Thang') {
                for (let month = 1; month <= 12; month++) {
                    const key = `${month}/${currentYear}`;
                    totals.push({ date: key, total: 0 });
                    total_each_part.push({ date: key, total_service: 0, total_prescription: 0 });

                    bills.forEach(bill => {
                        const [day, monthInBill, yearInBill] = bill.ngayLap.split(', ')[1].split('/').map(part => parseInt(part, 10));
                        if (month === monthInBill && yearInBill === currentYear) {
                            const index = totals.findIndex(item => item.date === key);
                            const index_each_part = total_each_part.findIndex(item => item.date === key);
                            if (index !== -1) {
                                totals[index].total += bill.total_bill;
                            }
                            if (index_each_part !== -1) {
                                total_each_part[index_each_part].total_service += bill.total_service;
                                total_each_part[index_each_part].total_prescription += bill.total_prescription;
                            }
                        }
                    });
                }
            }

            if (this.selectedOption === 'Nam') {
                bills.forEach(bill => {
                    const yearInBill = parseInt(bill.ngayLap.split(', ')[1].split('/')[2], 10);
                    const index = totals.findIndex(item => item.date === yearInBill.toString());
                    const index_each_part = total_each_part.findIndex(item => item.date === yearInBill.toString());
                    if (index !== -1 && index_each_part !== -1) {
                        totals[index].total += bill.total_bill;
                        total_each_part[index_each_part].total_service += bill.total_service;
                        total_each_part[index_each_part].total_prescription += bill.total_prescription;
                    } else {
                        totals.push({ date: yearInBill.toString(), total: bill.total_bill });
                        total_each_part.push({ date: yearInBill.toString(), total_service: bill.total_service, total_prescription: bill.total_prescription });
                    }
                });
            }

            return { totals, total_each_part };
        },

        renderTotalBillChart() {
            if (this.totalBillChart) {
                this.totalBillChart.destroy();
            }

            const xBar = [];
            const yBar = [];
            this.statistics.totals.forEach(item => {
                xBar.push(item.date);
                yBar.push(item.total);
            });

            this.totalBillChart = new Chart("total_bill", {
                type: "bar",
                data: {
                    labels: xBar,
                    datasets: [{
                        data: yBar,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1,
                    }]
                },
                options: {
                    animation: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        },
                        title: {
                            display: true,
                            text: "THỐNG KÊ TỔNG DOANH THU"
                        }
                    }
                },
            });
        },

        updateSelectAndrenderPieChart() {
            // Kiểm tra nếu statistics.total_each_part tồn tại và có ít nhất một phần tử
            if (this.statistics.total_each_part && this.statistics.total_each_part.length > 0) {
                // Nếu không có ngày được chọn, chọn ngày đầu tiên làm mặc định
                let dateToUpdate = this.selectedDate || this.statistics.total_each_part[0].date;
                const selectedData = this.statistics.total_each_part.find(data => data.date === dateToUpdate);
                if (selectedData) {
                    if (this.pieChart) {
                        this.pieChart.destroy();
                    }
                    this.pieChart = new Chart("total_each_part", {
                        type: "pie",
                        data: {
                            labels: ['Dịch vụ', 'Bán thuốc'],
                            datasets: [{
                                data: [selectedData.total_service, selectedData.total_prescription],
                                backgroundColor: [
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgb(255, 159, 64)',
                                    'rgb(75, 192, 192)',
                                ],
                                borderWidth: 1,
                                hoverOffset: 4,
                            }]
                        },
                        options: {
                            animation: true,
                            plugins: {
                                legend: {
                                    display: true
                                },
                                tooltip: {
                                    enabled: true
                                },
                                title: {
                                    display: true,
                                    text: `THỐNG KÊ DỊCH VỤ VÀ BÁN THUỐC TRONG ${dateToUpdate}`
                                }
                            }
                        },
                    });
                }
            }
        },

        renderInventoryChart() {
            if (this.inventoryChart) {
                this.inventoryChart.destroy();
            }

            const xBar = this.dataMedicines.map(medicine => medicine.tenThuoc);
            const yBar = this.dataMedicines.map(medicine => medicine.SoLuong);

            this.inventoryChart = new Chart("inventory", {
                type: "bar",
                data: {
                    labels: xBar,
                    datasets: [{
                        data: yBar,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1,
                    }]
                },
                options: {
                    animation: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        },
                        title: {
                            display: true,
                            text: "THỐNG KÊ THUỐC TỒN KHO"
                        }
                    }
                },
            });
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
    },
    async created() {
        await this.getBills();
        await this.getPatients();
        await this.getRecords();
        await this.getMedicines();
    }
};
</script>

<style scoped>
.card {
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, .05);
    margin-bottom: 24px;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    color: var(--bs-heading-color);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: .5rem;
    margin-top: 0;
}

h1 {
    font-size: 1.75rem;
}

.stat {
    align-items: center;
    background: #d3e2f7;
    border-radius: 50%;
    display: flex;
    height: 40px;
    justify-content: center;
    width: 40px;
}

.text-primary {
    --bs-text-opacity: 1;
    color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}

.list-expiring {
    max-height: 400px;
    overflow-y: scroll;
    border-style: groove;
}

::-webkit-scrollbar {
    width: 15px;
    height: 15px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px gray;
}

::-webkit-scrollbar-thumb {
    background: rgb(192, 191, 191);
}

::-webkit-scrollbar-thumb:hover {
    background: gray;
}

.radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #EEE;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 300px;
    font-size: 14px;
}

.radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
}

.radio-inputs .radio input {
    display: none;
}

.radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.name {
    background-color: #fff;
    font-weight: 600;
}
</style>