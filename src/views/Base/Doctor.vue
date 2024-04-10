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

        <h1 class="text-center">ĐỘI NGŨ CHUYÊN GIA TẠI DERMATOLOGY CLINIC</h1>
        <div class="row">
            <div class="container col-12 col-sm-4 form__search">
                <div class="form__top">
                    <InputSearch v-model="searchText" />
                </div>
            </div>
            <div class="col-sm-8"></div>
        </div>
        <div class="row" v-if="filteredDoctorsCount > 0">
            <div class="list-doctor col-12 col-md-6 col-lg-3 text-center" v-for="(doctor, index) in filteredDoctors" :key="index">
                <div class="doctors__item">
                    <img class="doctors__item--img" :src="doctor.imgURL" alt="Doctor Image" loading="lazy">
                    <div class="doctors__item--content d-flex flex-column justify-content-between">
                        <div class="doctors__wrap">
                            <h4 class="doctors__item--name"> {{ doctor.hocVi }}. {{ doctor.name }}</h4>
                            <span class="doctors__item--position">Phụ trách {{ doctor.chuyenMon }}</span>
                            <span class="doctors__item--position">Thâm niên {{ doctor.thamNien }}</span>
                            <div class="doctors__item--desc">
                                <span class="text-start">Bác sĩ {{ doctor.name }} có {{ doctor.thamNien }} kinh nghiệm
                                    trong lĩnh vực
                                    {{ doctor.chuyenMon }} tại Phòng khám Dermatology Clinic. Với kiến thức và kinh
                                    nghiệm,
                                    bác sĩ Định đóng góp đáng kể vào việc phát triển và quản lý tại Phòng khám
                                    Dermatology Clinic Cần Thơ.
                                    <!-- <a class="hotnews__item--decs" href="#" tabindex="0">...</a> -->
                                </span>
                            </div>
                        </div>
                        <router-link :to="{ name: 'dat-lich-kham-benh' }" class="doctors__item--more" tabindex="0">
                            <span>Đặt lịch khám</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <p v-else>Không tìm thấy bác sĩ phù hợp.</p>
        <div class="d-flex justify-content-center">
            <div class="main__action" v-if="hasMoreDoctors && !searchText">
                <button class="main__scroll" @click="loadMores">
                    <div class="main__scroll-box">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
                                fill="rgba(28,28,30,1)">
                            </path>
                        </svg>
                    </div>
                    <span class="main__scroll-text">Load More</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import DoctorService from "@/services/doctor.service.js";
import InputSearch from "@/components/InputSearch.vue";

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            doctors: [],
            searchText: "",
            loadedCount: 4,
        };
    },
    computed: {
        doctorStrings() {
            return this.doctors.map((doctor) => {
                const { name, phoneNumber } = doctor;
                return [name, phoneNumber].join("");
            });
        },
        filteredDoctors() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!searchTextLower) {
                return this.doctors.slice(0, this.loadedCount);
            } else {
                return this.doctors
                    .filter((_doctor, index) =>
                        this.doctorStrings[index].toLowerCase().includes(searchTextLower)
                    )
            }
        },
        hasMoreDoctors() {
            return this.filteredDoctors.length < this.doctors.length;
        },
        filteredDoctorsCount() {
            return this.filteredDoctors.length;
        },
    },
    methods: {
        async retrieveDoctors() {
            try {
                this.doctors = await DoctorService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        loadMores() {
            this.loadedCount += 4;
        },
    },
    async created() {
        await this.retrieveDoctors();
    },
};
</script>

<style scoped>
.container {
    margin-bottom: 50px;
}

.list-doctor {
    margin-bottom: 50px;
}

h1 {
    font-family: ui-monospace;
    padding: 20px 0;
}

a {
    text-decoration: none;
}

/* ------------------------------ LOAD MORE ------------------------------ */
.main__action {
    width: 80px;
    height: 70px;
}

.main__scroll {
    background-color: rgba(255, 255, 255, 0);
    border: none;
}

.main__scroll-text {
    font-size: small;
    color: rgba(28, 28, 30, 1);
}

.main__action .main__scroll-box {
    animation: scroll-down 2.5s infinite;
}

@keyframes scroll-down {

    0%,
    100% {
        transform: translateY(0rem);
        opacity: 1;
    }

    65% {
        transform: translateY(1rem);
        opacity: 0;
    }

    70% {
        transform: translateY(-1rem);
        opacity: 0;
    }
}

/* ----------------------- Doctor Card ----------------------- */
.form__search {
    padding: 16px 45px 30px;
    box-shadow: 0px 30px 40px #00405315;
    border-radius: 29px;
    background: #fff
}

.doctors__item {
    position: relative;
    overflow: hidden
}

.doctors__item .img-logo {
    width: 50px;
    margin: auto
}

.doctors__item--img {
    width: 100%;
    height: 100%;
    height: 350px;
    object-fit: cover
}

.doctors__item .doctors__item--content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 10px 20px;
    background-color: #009babbf;
    transform: translateY(80%);
    transition: all .3s linear
}

.doctors__item.active .doctors__item--content {
    background-color: #009bab
}

.doctors__item:hover .doctors__item--content,
.doctors__item.active .doctors__item--content {
    padding: 25px 20px;
    transform: translateY(0%);
    transition: all .3s linear
}

.doctors__item--name {
    color: #fff;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 0
}

.doctors__item--position {
    font-size: 13px;
    min-height: 32px;
    display: block;
    line-height: 16px;
    font-weight: 300;
    color: #fff;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical
}

.doctors__item--desc {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px
}

.doctors__item--desc span {
    font-size: 13px;
    line-height: 16px;
    color: #fff;
    font-weight: 300;
    display: block;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    line-clamp: 7;
    -webkit-box-orient: vertical
}

.doctors__item--more {
    width: fit-content;
    border: 0;
    border-radius: 17px;
    background-color: #fff;
    padding: 0 30px 3px;
    transition: all .3s linear
}

.doctors__item--more:hover {
    transform: scale(1.06);
    transition: all .3s linear
}

.doctors__item--more span {
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: var(--third-color)
}
</style>