<script>
import StaffService from "@/services/staff.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
  props: {
    staffs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    refreshList: Function,
  },
  emits: ["update:activeIndex", "delete:staff"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteStaff(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa tài khoản này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await StaffService.delete(id);
            this.$emit("delete:staff", this.localStaffs);
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
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(staff, index) in staffs"
      :key="index" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      {{ staff.name }}
      <button type="button" class="ml-2 btn btn-danger" @click="deleteStaff(staff._id)">
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
  box-shadow: inset 0 0 5px gray;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: rgb(192, 191, 191);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>