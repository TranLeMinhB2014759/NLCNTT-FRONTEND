<script>
import StaffService from "@/services/staff.service.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'
import CloudService from "@/services/cloudinary.service";

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
    separateLinkIntoPublicID(URL) {
      const parts = URL.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      return publicId;
    },
    async deleteStaff(id, imgURL) {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa tài khoản này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      });

      if (result.isConfirmed) {
        try {
          const publicID = this.separateLinkIntoPublicID(imgURL);
          await CloudService.delete(publicID);
          await StaffService.delete(id);
          this.$emit("delete:staff", this.localStaffs);
          this.refreshList();
          toast.success("Xóa thành công!");
        } catch (error) {
          console.log(error);
          toast.error("Đã có lỗi xảy ra khi xóa");
        }
      }
    },
  }
};
</script>

<template>
  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(staff, index) in staffs"
      :key="index" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      {{ staff.name }}
      <button type="button" class="ml-2 btn btn-danger" @click="deleteStaff(staff._id, staff.imgURL)">
        <i class="fa fa-trash"></i>
      </button>
    </li>
  </ul>
</template>