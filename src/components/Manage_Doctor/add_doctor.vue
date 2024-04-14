<template>
  <div class="d-load" v-if="loading">
    <div class="loader"></div>
  </div>
  <div v-else>
    <div v-if="doctor">
      <add @submit:doctor="createDoctor" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import add from "@/components/Manage_Doctor/AddForm.vue";
import DoctorService from "@/services/doctor.service";
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
      doctor: {},
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
    async createDoctor(data) {
      try {
        const result = await Swal.fire({
          title: "Bạn muốn thêm bác sĩ này?",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
        });
        if (result.isConfirmed) {
          if (!(data.imgURL instanceof File)) {
            toast.error("data.imgURL is not a File");
            return;
          }
          this.loading = true;
          const cloudResult = await CloudService.uploadImageDoctor(data.imgURL);
          this.imgURLCloud = await cloudResult.data.data.imgURL;
          if (this.imgURLCloud === null) {
            throw new Error("Did not receive image link");
          }
          const newData = { ...data, imgURL: this.imgURLCloud };
          await DoctorService.create(newData);
          this.message = "Thêm bác sĩ mới thành công";
          Swal.fire({
            icon: "success",
            title: this.message,
            showConfirmButton: true,
            timer: 2000
          });
          this.$router.push({ name: 'admin-doctor' });
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
      // if (error.response && error.response.status === 400 && error.response.data.message === "Name already exists") {
      //   toast.error("Bác sĩ đã được tạo");
      // } else {
      //   toast.error("Đã có lỗi xảy ra khi thêm");
      // }
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/formCRUD.css";
</style>
