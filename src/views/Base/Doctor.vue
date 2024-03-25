<template>
    <div class="container">
        <div class="back d-flex align-items-center">
            <router-link :to="{ name: 'trangchu' }">
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
            Trang chủ
        </div>

        <h4 class="text-center">ĐỘI NGŨ CHUYÊN GIA TẠI DERMATOLOGY CLINIC</h4>
        <div class="row">
            <div class="container col-12 col-sm-4">
                <InputSearch v-model="searchText" />
            </div>
            <div class="col-sm-8"></div>
        </div>
        <div class="row" v-if="filteredDoctorsCount > 0" :doctors="filteredDoctors">
            <div class="col-12 col-md-6 col-lg-3 text-center" v-for="(doctor, index) in sortedDoctors" :key="index" @click="updateActiveIndex(index)">
                <img class="imgURL" :src="doctor.imgURL" alt="">
                <div>{{ doctor.name }}</div>
            </div>
        </div>
        <p v-else>Không tìm thấy bác sĩ phù hợp.</p>
    </div>
</template>
<script>
import StaffService from "@/services/staff.service.js";
import InputSearch from "@/components/InputSearch.vue";
export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            doctors: [],
            searchText: "",
        }
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        doctorStrings() {
            return this.doctors.map((doctor) => {
                const { name, phoneNumber } = doctor;
                return [ name, phoneNumber ].join("");
            });
        },
        filteredDoctors() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!searchTextLower) return this.doctors;
            return this.doctors.filter((_doctor, index) =>
                this.doctorStrings[index].toLowerCase().includes(searchTextLower)
            );
        },
        sortedDoctors() {
            return this.filteredDoctors.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        filteredDoctorsCount() {
            return this.sortedDoctors.length;
        },
    },
    methods: {
        async retrieveDoctors() {
            try {
                const staff = await StaffService.getAll();
                this.doctors = staff.filter(item => item.role === "doctor");
            } catch (error) {
                console.log(error);
            }
        },
        updateActiveIndex(index) {
            this.activeIndex = index;
        },
    },
    async created() {
        await this.retrieveDoctors();
    }
}
</script>
<style scoped>
.container {
    margin-bottom: 50px;
}

h4 {
    padding: 20px 0;
}

.imgURL {
    border-radius: 50%;
    width: 200px;
    height: 200px;
}
</style>