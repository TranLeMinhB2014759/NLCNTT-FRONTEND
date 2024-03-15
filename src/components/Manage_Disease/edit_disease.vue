<template>
  <div>
    <edit :disease="disease" @submit:disease="editDisease" />
  </div>
</template>

<script>
import edit from "@/components/Manage_Disease/EditForm.vue";
import DiseaseService from "@/services/disease.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    edit,
  },

  data() {
    return {
      disease: null,
      message: "",
    };
  },
  props: {
    id: { type: String, required: true },
  },

  methods: {
    async getDisease(id) {
      try {
        this.disease = await DiseaseService.get(id);
      } catch (error) {
        this.$router.push({ name: "notfound" });
      }
    },

    async editDisease(data) {
      const confirmed = window.confirm("Bạn chắc chắn về các thông tin đã điền vào?");
      if (confirmed) {
        try {
          const newData = {};
          if (data.code === this.disease.code) {
            newData.tenBenh = data.tenBenh;
          } else {
              newData.code = data.code;
              newData.tenBenh = data.tenBenh;
          }
          await DiseaseService.update(this.disease ? this.disease._id : null, newData);
          this.$router.push({ name: 'admin-disease' });
          }
        catch (error) {
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
  created() {
    this.getDisease(this.id);
  },
};
</script>
