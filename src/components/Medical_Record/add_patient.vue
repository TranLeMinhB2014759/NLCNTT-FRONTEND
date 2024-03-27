<template>
  <div>
    <add @submit:patient="createPatient" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Medical_Record/AddForm.vue";
import PatientService from "@/services/patient.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      patient: {},
      message: "",
    }
  },
  methods: {
    async createPatient(data) {
      Swal.fire({
        title: "Bạn muốn thêm bệnh nhân mới này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await PatientService.create(data);
            Swal.fire({
              icon: "success",
              title: "Thêm bệnh nhân mới thành công",
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-patient' });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
    },
    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.message === "phoneNumber already exists") {
        toast.error("Số điện thoại đã tồn tại");
      } else {
        toast.error("Đã có lỗi xảy ra thêm bệnh nhân");
      }
    },
  },
};
</script>