<template>
  <div v-if="service">
    <edit :service="service" @submit:service="editService" />
  </div>
</template>

<script>
import edit from "@/components/Manage_Service/EditForm.vue";
import ServiceService from "@/services/service.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    edit,
  },

  data() {
    return {
      service: null,
      message: "",
    };
  },
  props: {
    id: { type: String, required: true },
  },

  methods: {
    async getService(id) {
      try {
        this.service = await ServiceService.get(id);
      } catch (error) {
        this.$router.push({ name: "notfound" });
      }
    },

    async editService(data) {
      Swal.fire({
        title: "Bạn chắc chắn về các thông tin đã điền vào?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const newData = {};
            if (data.code === this.service.code) {
              newData.tenDichVu = data.tenDichVu;
              newData.Gia = data.Gia;
              newData.status = data.status;
            } else {
              newData.code = data.code;
              newData.tenDichVu = data.tenDichVu;
              newData.Gia = data.Gia;
              newData.status = data.status;
            }
            await ServiceService.update(this.service ? this.service._id : null, newData);
            Swal.fire({
              icon: "success",
              title: "Cập nhật thành công",
              showConfirmButton: true,
              timer: 1500
            });
            this.$router.push({ name: 'admin-service' });
          }
          catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400 && error.response.data.message === "Code already exists") {
              toast.error("Mã dịch vụ đã tồn tại");
            } else {
              toast.error("Đã có lỗi xảy ra khi thêm");
            }
          }
        } else if (result.isDenied) {
          Swal.fire({
            icon: "info",
            title: "Những thay đổi không được lưu",
            showConfirmButton: true,
            timer: 1500
          });
          this.$router.push({ name: 'admin-service' });
        }
      });
    },

  },
  created() {
    this.getService(this.id);
  },
};
</script>
