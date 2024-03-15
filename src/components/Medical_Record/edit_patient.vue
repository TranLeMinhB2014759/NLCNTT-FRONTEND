<template>
    <div>
        <edit :patient="patient" @submit:patient="editPatient" />
    </div>
</template>
  
<script>
import edit from "@/components/Medical_Record/EditForm.vue";
import PatientService from "@/services/patient.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
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
        async editPatient(data) {
            const confirmed = window.confirm("Bạn có chắc cập nhật tài khoản này?");
            if (confirmed) {
                const newData = {};
                try {
                    if (data.phoneNumber === this.patient.phoneNumber) {
                        newData.MSBN = data.MSBN;
                        newData.name = data.name;
                        newData.year = data.year;
                        newData.gender = data.gender;
                        newData.address = data.address;
                    } else {
                        newData.MSBN = data.MSBN;
                        newData.name = data.name;
                        newData.year = data.year;
                        newData.gender = data.gender;
                        newData.phoneNumber = data.phoneNumber;
                        newData.address = data.address;
                    }
                    await PatientService.update(this.patient ? this.patient._id : null, newData);
                    this.message = "Cập nhật thông tin thành công";
                    toast.success(this.message);
                } catch (error) {
                    console.error(error);
                    if (error.response && error.response.status === 400 && error.response.data.message === "phoneNumber already exists") {
                        toast.error("Số điện thoại đã tồn tại");
                    } else {
                        toast.error("Đã có lỗi xảy ra khi thêm");
                    }
                }
            }
        },
    },
    created() {
        this.getPatient(this.id);
    },
};
</script>
