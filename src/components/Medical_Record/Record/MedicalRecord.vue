<template>
    <div class="back">
        <router-link :to="{ name: 'admin-patient' }">
            <button class="button-back">
                <div class="button-box">
                    <span class="button-elem">
                        <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                            </path>
                        </svg>
                    </span>
                    <span class="button-elem">
                        <svg viewBox="0 0 46 40">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 
                            3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                            </path>
                        </svg>
                    </span>
                </div>
            </button>
        </router-link>
    </div>
    <h1 class="h3 mb-3"><strong>Thông tin bệnh nhân</strong></h1>
    <div class="card">
        <div class="card-body">
            <div>
                <div v-if="patient">
                    <h2>{{ patient.name }}</h2>
                    <div class="row">
                        <div class="col-6 col-md-2"><strong>Tuổi:</strong> {{ calculateAge(patient.year) }} ({{
            patient.year }})</div>
                        <div class="col-6 col-md-2"><strong>Giới tính:</strong> {{ patient.gender }}</div>
                        <div class="col-12 col-md-3"><strong>Số điện thoại:</strong> {{ patient.phoneNumber }}</div>
                        <div class="col-12 col-md-5"><strong>Địa chỉ:</strong> {{ patient.address }}</div>
                    </div>
                </div>

                <div v-else>
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>

    <h1 class="h3 mt-3"><strong>Hồ Sơ Bệnh Án</strong></h1>
    <div class="card">
        <div class="card-body">
            
        </div>
    </div>
</template>

<script>
import PatientService from "@/services/patient.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            patient: null,
            message: "",
        };
    },

    computed: {
        patientAges() {
            return this.patients.map((patient) => this.calculateAge(patient.year));
        },
    },

    methods: {
        async getPatient() {
            const id = this.$route.params.id;
            try {
                this.patient = await PatientService.get(id);
            } catch (error) {
                this.message = "Không thể tải thông tin bệnh nhân. Vui lòng thử lại.";
                this.$router.push({ name: "notfound" });
            }
        },
        calculateAge(yearOfBirth) {
            const currentYear = new Date().getFullYear();
            return currentYear - yearOfBirth;
        },
    },

    created() {
        this.getPatient();
    },
};
</script>

<style scoped>
.back {
    display: inline-block;
}

/* ----------------------- BUTTON BACK --------------------------- */
.button-back {
    display: block;
    position: relative;
    width: 56px;
    height: 56px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
}

.button-back:before,
.button-back:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
}

.button-back:before {
    border: 4px solid gray;
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-back:after {
    border: 4px solid #96daf0;
    transform: scale(1.3);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
}

.button-back:hover:before,
.button-back:focus:before {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button-back:hover:after,
.button-back:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box {
    display: flex;
    position: absolute;
    top: 5px;
    left: 0;
}

.button-elem {
    display: block;
    width: 20px;
    height: 20px;
    margin: 17px 18px 0 18px;
    transform: rotate(180deg);
    fill: gray;
}

.button-back:hover .button-box,
.button-back:focus .button-box {
    transition: 0.4s;
    transform: translateX(-56px);
}
</style>