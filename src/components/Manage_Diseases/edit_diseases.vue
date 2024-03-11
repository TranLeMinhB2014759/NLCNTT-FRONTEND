<template>
  <div>
    <edit :diseases="diseases" @submit:diseases="editDiseases" />
  </div>
</template>

<script>
import edit from "@/components/Manage_Diseases/EditForm.vue";
import DiseasesService from "@/services/diseases.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    edit,
  },
  
  data() {
    return {
      diseases: null,
      message: "",
    };
  },
  methods: {
    async getDiseases() {
      const id = this.$route.params.id;
      try {
        this.diseases = await DiseasesService.get(id);
      } catch (error) {
        this.$router.push({ name: "notfound" });
      }
    },

    async editDiseases(data) {
      const confirmed = window.confirm("Bạn chắc chắn về các thông tin đã điền vào?");
      if (confirmed) {
        try {
          await DiseasesService.update(this.diseases ? this.diseases._id : null, data);
          this.$router.push({ name: 'admin-diseases' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
        this.getDiseases();
    },
};
</script>
