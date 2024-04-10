<script>
import MedicineService from "@/services/medicine.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
  props: {
    medicines: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    refreshList: Function,
  },
  emits: ["update:activeIndex", "delete:medicine"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    isExpiringSoon(expiryDate) {
      const thirty = new Date();
      thirty.setDate(thirty.getDate() + 30);
      const sixty = new Date();
      sixty.setDate(sixty.getDate() + 60);
      const expiry = new Date(expiryDate);
      if (expiry > thirty && expiry <= sixty) {
        return 60;
      } else if (expiry <= thirty) {
        return 30;
      } return 0;
    },
    async deleteMedicine(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa thuốc này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await MedicineService.delete(id);
            this.$emit("delete:medicine", this.localMedicines);
            this.refreshList();
            toast.success("Delete Succesfully!");
          } catch (error) {
            toast.error("Đã có lỗi xảy ra khi xóa");
          }
        }
      });
    },
  }
};
</script>

<template>
  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(medicine, index) in medicines"
      :key="index" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      <span v-if="isExpiringSoon(medicine.HSD) === 60">
        <i class="fas fa-exclamation-circle text-warning" title="Quá hạn trong vòng 60 ngày"></i>
        {{ medicine.tenThuoc }}
      </span>
      <span v-else-if="isExpiringSoon(medicine.HSD) === 30">
        <i class="fas fa-exclamation-circle text-danger" title="Quá hạn trong vòng 30 ngày"></i>
        {{ medicine.tenThuoc }}
      </span>
      <span v-else>
        {{ medicine.tenThuoc }}
      </span>
      <button type="button" class="ml-2 btn btn-danger" @click="deleteMedicine(medicine._id)">
        <i class="fa fa-trash"></i>
      </button>
    </li>
  </ul>
</template>