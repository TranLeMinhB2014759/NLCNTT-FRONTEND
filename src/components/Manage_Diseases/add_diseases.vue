<template>
    <div>
        <add @submit:diseases="createDiseases" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Diseases/AddForm.vue";
import DiseasesService from "@/services/diseases.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        add,
    },
    props: {
        diseases: { type: Object, require: true },
    },
    methods: {
    
    async createDiseases(data) {
      const confirmed = window.confirm("Bạn chắc chắn về các thông tin đã điền vào?");

      if (confirmed) {
        try {
          await DiseasesService.create(data);
          toast.success("Thêm thành công")
          this.$router.push({ name: 'admin-diseases' });
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

