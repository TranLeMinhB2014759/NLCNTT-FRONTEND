<template>
  <div class="d-load" v-if="loading">
    <div class="loader"></div>
  </div>
  <div v-else>
    <div v-if="medicine">
      <add @submit:medicine="createMedicine" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import add from "@/components/Manage_Medicine/AddForm.vue";
import MedicineService from "@/services/medicine.service";
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
      medicine: {},
      message: "",
      imgURLCloud: null,
      loading: false,
    };
  },
  methods: {
    async separateLinkIntoPublicID(URL) {
      const parts = URL.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      return publicId;
    },
    async createMedicine(data) {
      try {
        const result = await Swal.fire({
          title: "Bạn muốn thêm thuốc này?",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
        });
        if (result.isConfirmed) {
          if (!(data.imgURL instanceof File)) {
            toast.error("data.imgURL is not a File");
            return;
          }
          this.loading = true;
          const cloudResult = await CloudService.uploadImageMedicine(data.imgURL);
          this.imgURLCloud = await cloudResult.data.data.imgURL;
          if (this.imgURLCloud === null) {
            throw new Error("Did not receive image link");
          }
          const newData = { ...data, imgURL: this.imgURLCloud };
          await MedicineService.create(newData);
          this.message = "Thêm thuốc mới thành công";
          Swal.fire({
            icon: "success",
            title: this.message,
            showConfirmButton: true,
            timer: 2000
          });
          this.$router.push({ name: 'admin-medicine' });
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
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/formCRUD.css";
</style>