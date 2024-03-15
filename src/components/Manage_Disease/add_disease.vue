<template>
    <div>
        <add @submit:disease="createDisease" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Disease/AddForm.vue";
import DiseaseService from "@/services/disease.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        add,
    },
    data() {
      return {
        disease: {},
        message: "",
      }
    },
    methods: {
    async createDisease(data) {
      const confirmed = window.confirm("Bạn chắc chắn về các thông tin đã điền vào?");
      if (confirmed) {
        try {
          await DiseaseService.create(data);
          this.$router.push({ name: 'admin-disease' });
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 400 && error.response.data.message === "Code already exists") {
            toast.error("Mã bệnh đã tồn tại");
          } else {
            toast.error("Đã có lỗi xảy ra khi thêm");
          }
        }
      }
    },
  },
};


</script>

