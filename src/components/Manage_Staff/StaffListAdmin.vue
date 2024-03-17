<script>
import StaffService from "@/services/staff.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  props: {
    staffs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  // data() {
  //   return {
  //     localStaffs: this.staffs.slice(),
  //   };
  // },
  emits: ["update:activeIndex", "delete:staff"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteStaff(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await StaffService.delete(id);

        // Cập nhật danh sách nhân viên mà không làm mới trang
        // const deletedIndex = this.localStaffs.findIndex(staff => staff._id === id);
        // if (deletedIndex !== -1) {
        //   this.localStaffs.splice(deletedIndex, 1);
        // }
        this.$emit("delete:staff", this.localStaffs);
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
    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(staff, index) in staffs"
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