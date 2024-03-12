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
  methods: {
    async getDisease() {
      const id = this.$route.params.id;
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
          await DiseaseService.update(this.disease ? this.disease._id : null, data);
          this.$router.push({ name: 'admin-disease' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
        this.getDisease();
    },
};
</script>
