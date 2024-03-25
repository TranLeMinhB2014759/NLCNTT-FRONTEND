<template>
  <div>
    <add @submit:doctor="createDoctor" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Manage_Doctor/AddForm.vue";
import DoctorService from "@/services/doctor.service";
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
    }
  },
  methods: {
    async createDoctor(data) {
      Swal.fire({
        title: "Bạn muốn thêm bác sĩ này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await DoctorService.create(data);
            Swal.fire({
              icon: "success",
              title: "Thêm tài bác sĩ thành công",
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-doctor' });
          } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400 && error.response.data.message === "Name already exists") {
              toast.error("Bác sĩ đã được tạo");
            } else {
              toast.error("Đã có lỗi xảy ra khi thêm");
            }
          }
        }
      });
    },
  },
};


</script>
