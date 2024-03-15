<template>
    <div>
        <add :patient="patient" @submit:medicalrecord="addMedicalrecord" />
    </div>
</template>

<script>
import add from "@/components/Medical_Record/Record/AddForm.vue";
import PatientService from "@/services/patient.service";
import MedicalrecordService from "@/services/medicalrecord.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        add,
    },

    props: {
        id: { type: String, required: true },
        medicalrecord: { type: Object, require: true },
    },

    data() {
        return {
            patient: null,
            message: "",
        };
    },

    methods: {
        async getPatient(id) {
            try {
                this.patient = await PatientService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async addMedicalrecord(data) {
            const confirmed = window.confirm("Đơn thuốc khi đã lập là không thể sửa. Bạn có chắc chắn muốn lập đơn thuốc này?");
            if (confirmed) {
                try {
                    await MedicalrecordService.create(data);
                    this.$router.push({ name: 'medicalrecord', params: { id: this.id }});
            } catch (error) {
                console.error(error);
            }
        }
    },
},
created() {
    this.getPatient(this.id);
},
};
</script>
