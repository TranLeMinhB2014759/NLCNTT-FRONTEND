<template>
  <div>
      <edit :patient="patient" @submit:patient="editPatient" />
  </div>
</template>

<script>
import edit from "@/components/Medical_Record/Record/AddForm.vue";
import PatientService from "@/services/patient.service";
import MedicalrecordService from "@/services/medicalrecord.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
      edit,
  },

  props: {
      medicalrecord: { type: Object, require: true },
  },

  data() {
      return {
          patient: null,
          message: "",
      };
  },
  
  methods: {
      async getPatient() {
          const id = this.$route.params.id;
          try {
              this.patient = await PatientService.get(id);
          } catch (error) {
              this.$router.push({ name: "notfound" });
          }
      },
      async editPatient(data) {
          const confirmed = window.confirm("Bạn có chắc muốn lập toa thuốc này không này?");
          if (confirmed) {
              try {
                  await MedicalrecordService.create(data);
                  this.message = "Thêm toa thuốc thành công";
                  toast.success(this.message);
              } catch (error) {
                  console.error(error);
              }
          }
      },
  },
  created() {
      this.getPatient();
  },
};
</script>
