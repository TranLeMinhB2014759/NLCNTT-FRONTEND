<template>
    <div>
        <add @submit:patient="createPatient" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Medical_Record/AddForm.vue";
import PatientService from "@/services/patient.service";
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
      const confirmed = window.confirm("Bạn có thêm bệnh nhân mới này?");
      if (confirmed) {
        try {
          await PatientService.create(data);
          toast.success("Thêm bệnh nhân mới thành công")
          this.$router.push({ name: 'admin-patient' });
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 400 && error.response.data.message === "phoneNumber already exists") {
            toast.error("Số điện thoại đã tồn tại");
          } else {
            toast.error("Đã có lỗi xảy ra thêm bệnh nhân");
          }
        }
      }
    },
  },
};


</script>

