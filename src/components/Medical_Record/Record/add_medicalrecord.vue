<template>
    <div v-if="patient">
        <add :patient="patient" @submit:medicalrecord="addMedicalrecord" />
    </div>
</template>

<script>
import add from "@/components/Medical_Record/Record/AddForm.vue";
import PatientService from "@/services/patient.service";
import MedicalrecordService from "@/services/medicalrecord.service";
import Swal from 'sweetalert2'

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
            Swal.fire({
                title: "Hồ sơ khi đã lập là không thể sửa. Bạn chắc chắn muốn lập hồ sơ này?",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await MedicalrecordService.create(data);
                        this.message = "Tạo hồ sơ thành công";
                        Swal.fire({
                            icon: "success",
                            title: this.message,
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'medicalrecord', params: { id: this.id } });
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        },
    },
    created() {
        this.getPatient(this.id);
    },
};
</script>
