<template>
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
                    <canvas id="total_bill" style="width:100%; margin-bottom: 100px"></canvas>
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
                    <div class="text-center" v-if="statistics.total_each_part.length > 0 && statistics.total_each_part.some(data => data.date === selectedDate && data.total_service === 0 && data.total_prescription === 0)">
                        Không có doanh thu
                    </div>
                    <div v-else-if="statistics.total_each_part.length === 0">
                        Không có dữ liệu thống kê.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BillService from "@/services/bill.service";
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            selectedOption: 'Ngay',
            selectedDate: '',
            dataBills: [],
            statistics: {
                totals: [],
                total_each_part: []
            },
        };
    },

    async mounted() {
        await this.getStatistics();
        await this.updateData();
        this.updateSelectAndrenderPieChart();
    },

    methods: {
        async getStatistics() {
            try {
                this.dataBills = await BillService.getAll();
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
            this.renderBarChart();
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

        renderBarChart() {
            if (this.barChart) {
                this.barChart.destroy();
            }

            const xBar = [];
            const yBar = [];
            this.statistics.totals.forEach(item => {
                xBar.push(item.date);
                yBar.push(item.total);
            });

            this.barChart = new Chart("total_bill", {
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
    },
    async created() {
        await this.getStatistics();
    }
};
</script>

<style scoped>
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