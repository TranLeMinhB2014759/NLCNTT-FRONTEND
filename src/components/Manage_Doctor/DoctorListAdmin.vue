<script>
import DoctorService from "@/services/doctor.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
  props: {
    doctors: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    refreshList: Function,
  },
  emits: ["update:activeIndex", "delete:doctor"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteDoctor(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa bác sĩ này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await DoctorService.delete(id);
            this.$emit("delete:doctor", this.localDoctors);
            this.refreshList();
            toast.success("Delete Succesfully!");
          } catch (error) {
            console.log(error)
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
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(doctor, index) in doctors"
      :key="index" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      {{ doctor.name }}
      <button type="button" class="ml-2 btn btn-danger" @click="deleteDoctor(doctor._id)">
        <i class="fa fa-trash"></i>
      </button>
    </li>
  </ul>
</template>