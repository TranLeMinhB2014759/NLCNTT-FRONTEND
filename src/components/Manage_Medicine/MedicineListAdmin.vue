<script>
import MedicineService from "@/services/medicine.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  props: {
    medicines: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    medicine: { type: Object, required: true },
  },
  // data() {
  //   return {
  //     localMedicines: this.medicines.slice(),
  //   };
  // },
  emits: ["update:activeIndex", "delete:medicine"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteMedicine(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await MedicineService.delete(id);

        // Cập nhật danh sách nhân viên mà không làm mới trang
        // const deletedIndex = this.localMedicines.findIndex(medicine => medicine._id === id);
        // if (deletedIndex !== -1) {
        //   this.localMedicines.splice(deletedIndex, 1);
        // }
        this.$emit("delete:medicine", this.localMedicines);
        toast.success("Delete Succesfully!");
        // setTimeout(() => {
          location.reload();
        // }, 1500);
      }
    },
  }
};
</script>

<template>
  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(medicine, index) in medicines"
      :key="index" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      {{ medicine.tenThuoc }}
      <button type="button" class="ml-2 btn btn-danger" @click="deleteMedicine(medicine._id)">
        <i class="fa fa-trash"></i>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.list-group {
  max-height: 386px;
  overflow-y: scroll;
  border-style: groove;
}

::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>