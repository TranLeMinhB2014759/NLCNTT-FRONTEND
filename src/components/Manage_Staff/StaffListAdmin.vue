<script>
import StaffService from "@/services/staff.service.js";

export default {
  props: {
    staffs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    staff: { type: Object, required: true },
  },
  emits: ["update:activeIndex", "delete:staff"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteStaff(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await StaffService.delete(id);
        this.$emit("delete:staff");
        location.reload;
      }
    },
  }
};
</script>

<template>
  <ul class="list-group">
        <li 
            class="list-group-item d-flex justify-content-between align-items-start"
            v-for="(staff, index) in staffs"
            :key="index"
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
        {{  staff.name }}
          <button type="button" class="ml-2 btn btn-danger" @click="deleteStaff(staff._id)" >
            <i class="fa fa-trash"></i>
          </button> 
        </li>
    </ul>
</template>
<style scoped>
@import "@/assets/css/homepage.css";
</style>