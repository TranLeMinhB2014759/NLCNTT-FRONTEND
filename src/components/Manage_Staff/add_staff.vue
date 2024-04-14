<template>
  <div class="d-load" v-if="loading">
    <div class="loader"></div>
  </div>
  <div v-else>
    <div v-if="staff">
      <add @submit:staff="createStaff" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import add from "@/components/Manage_Staff/AddForm.vue";
import StaffService from "@/services/staff.service";
import CloudService from "@/services/cloudinary.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      staff: {},
      message: "",
      imgURLCloud: null,
      loading: false,
    }
  },
  methods: {
    async separateLinkIntoPublicID(URL) {
      const parts = URL.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      return publicId;
    },
    async createStaff(data) {
      try {
        const result = await Swal.fire({
          title: "Bạn muốn thêm tài khoản này?",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
        });
        if (result.isConfirmed) {
          if (!(data.imgURL instanceof File)) {
            toast.error("data.imgURL is not a File");
            return;
          }
          this.loading = true;
          const cloudResult = await CloudService.uploadImageStaff(data.imgURL);
          this.imgURLCloud = await cloudResult.data.data.imgURL;
          if (this.imgURLCloud === null) {
            throw new Error("Did not receive image link");
          }
          const newData = { ...data, imgURL: this.imgURLCloud };
          await StaffService.create(newData);
          Swal.fire({
            icon: "success",
            title: "Thêm tài khoản mới thành công",
            showConfirmButton: true,
            timer: 2000
          });
          this.$router.push({ name: 'admin-staff' });
        }
      } catch (error) {
        const publicID = await this.separateLinkIntoPublicID(this.imgURLCloud)
        await CloudService.delete(publicID);
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.message === "No file uploaded") {
        toast.error("Không tìm thấy file tải lên");
      }
      else if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {

        toast.error("Email đã tồn tại");
      } else {
        toast.error("Đã có lỗi xảy ra khi thêm tài khoản");
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formCRUD.css";
</style>