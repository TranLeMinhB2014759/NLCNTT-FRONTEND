<template>
    <div class="card">
        <div class="card-body">
            <div class="radio-inputs">
                <label class="radio">
                    <input type="radio" v-model="selectedOption" value="Ngay" @change="getStatistics">
                    <span class="name">Theo ngày</span>
                </label>
                <label class="radio">
                    <input type="radio" v-model="selectedOption" value="Thang" @change="getStatistics">
                    <span class="name">Theo tháng</span>
                </label>
                <label class="radio">
                    <input type="radio" v-model="selectedOption" value="Nam" @change="getStatistics">
                    <span class="name">Theo năm</span>
                </label>
            </div>
            <canvas id="total_bill" style="width:100%; margin-bottom: 100px"></canvas>
            <div v-if="Object.keys(statistics).length === 0">
                Không có dữ liệu thống kê.
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
            selectedOption: 'Thang',
            statistics: {},
        };
    },
    async mounted() {
        await this.getStatistics();
    },
    methods: {
        async getStatistics() {
            try {
                const dataBills = await BillService.getAll();
                const bills = dataBills.map(bill => ({
                    ngayLap: bill.ngayLap,
                    total_bill: bill.total_bill
                }));
                this.statistics = this.calculateTotalBills(bills);
                this.renderChart();
            } catch (error) {
                console.error(error);
            }
        },
        calculateTotalBills(bills) {
            const totals = {};

            const currentDate = new Date();
            const currentDayOfWeek = currentDate.getDay();
            const currentYear = currentDate.getFullYear();
            const diff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
            const startDate = new Date(currentDate.setDate(currentDate.getDate() + diff));

            if (this.selectedOption === 'Ngay') {
                for (let i = 0; i < 7; i++) {
                    const dateKey = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
                    totals[dateKey] = 0;
                    startDate.setDate(startDate.getDate() + 1);
                }
                bills.forEach(bill => {
                    let dateParts = bill.ngayLap.split(', ');
                    let dayMonthYear = dateParts[1].split('/');
                    let day = parseInt(dayMonthYear[0], 10);
                    let month = parseInt(dayMonthYear[1], 10);
                    let year = parseInt(dayMonthYear[2], 10);
                    let key = `${day}/${month}/${year}`;
                    if (key in totals) {
                        totals[key] += bill.total_bill;
                    }
                });
            }

            if (this.selectedOption === 'Thang') {
                for (let month = 1; month <= 12; month++) {
                    let key = `${month}/${currentYear}`;
                    totals[key] = 0;
                    bills.forEach(bill => {
                        let dateParts = bill.ngayLap.split(', ');
                        let dayMonthYear = dateParts[1].split('/');
                        let monthInBill = parseInt(dayMonthYear[1], 10);
                        let yearInBill = parseInt(dayMonthYear[2], 10);
                        if (month === monthInBill && yearInBill === currentYear) {
                            totals[key] += bill.total_bill;
                        }
                    });
                }
            }

            if (this.selectedOption === 'Nam') {
                bills.forEach(bill => {
                    let dateParts = bill.ngayLap.split(', ');
                    let yearInBill = parseInt(dateParts[1].split('/')[2], 10);
                    if (!totals[yearInBill]) {
                        totals[yearInBill] = 0;
                    }
                    totals[yearInBill] += bill.total_bill;
                });
            }

            return totals;
        },
        renderChart() {
            if (this.barChart) {
                this.barChart.destroy();
            }

            const xBar = Object.keys(this.statistics);
            const yBar = Object.values(this.statistics);
            this.barChart = new Chart("total_bill", {
                type: "bar",
                data: {
                    labels: xBar,
                    datasets: [{
                        // label: "Theo năm",
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
    },
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