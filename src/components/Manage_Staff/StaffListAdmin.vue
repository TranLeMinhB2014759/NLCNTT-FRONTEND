<script>
import StaffService from "@/services/staff.service.js";

export default {
  props: {
    staffs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    staff: { type: Object, required: true },
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
        location.reload();
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