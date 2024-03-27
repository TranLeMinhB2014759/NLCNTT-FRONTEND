<template>
  <div>
    <add @submit:bill="createBill" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Bill/AddForm.vue";
import MedicineService from "@/services/medicine.service.js";
import MedicalrecordService from "@/services/medicalrecord.service.js";
import BillService from "@/services/bill.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async createBill(data) {
      Swal.fire({
        title: "Bạn muốn lập bảng kê khai này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const status = await this.checkSaleStatusOfPrescription(data);
            if (!status) return;

            const sufficient = await this.checkMedicineAvailability(data);
            if (!sufficient) return;

            await this.updateMedicineQuantities(data);
            await this.updateMedicalRecordStatus(data);
            await this.createBillRecord(data);

            this.message = "Lập bảng kê khai thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-bill' });
          } catch (error) {
            console.error("Error creating bill:", error);
          }
        }
      });
    },
    async checkSaleStatusOfPrescription(data) {
      if (data.MSHS !== "Bán lẻ") {
        const record = await MedicalrecordService.getRecordByMSHS(data.MSHS);
        if (record && record[0].status === "sold") {
          toast.info("Đơn thuốc đã được bán");
          return false;
        }
        return true;
      }
      return true;
    },

    async checkMedicineAvailability(data) {
      for (const medicine of data.prescription) {
        const medicineData = await MedicineService.get(medicine._id);
        const remainingQuantity = medicineData.SoLuong - medicine.SoLuongBan;
        if (remainingQuantity < 0) {
          toast.error("Số thuốc còn lại không đủ");
          return false;
        }
      }
      return true;
    },
    async updateMedicineQuantities(data) {
      for (const medicine of data.prescription) {
        const medicineData = await MedicineService.get(medicine._id);
        const remainingQuantity = medicineData.SoLuong - medicine.SoLuongBan;
        await MedicineService.update(medicine._id, { SoLuong: remainingQuantity });
      }
    },
    async updateMedicalRecordStatus(data) {
      if (data.MSHS !== "Bán lẻ") {
        await MedicalrecordService.update(data._id, { status: 'sold' });
      }
    },
    async createBillRecord(data) {
      await BillService.create(data);
    },
  },
};
</script>
