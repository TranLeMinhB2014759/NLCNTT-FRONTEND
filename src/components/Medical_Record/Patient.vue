<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ BỆNH NHÂN</div>
      <div class="container d-flex justify-content-center p-5 m-5 mx-auto" v-if="loadingPatients">
                <div class="loader"></div> 
            </div>
      <div class="container" v-else>
        <button class="btn btn-sm text-success" @click="goToAddPatient()">
          <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="container mt-3 table-responsive">
          <table class="table table-bordered table-hover text-center" v-if="filteredPatientsCount > 0">
            <thead class="table-success">
              <tr>
                <th>MSBN</th>
                <th>Họ và tên</th>
                <th>Năm sinh</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Hồ sơ</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(patient, index) in paginatedPatients" :key="index">
                <td>{{ patient.MSBN }}</td>
                <td class="text-start">{{ patient.name }}</td>
                <td>{{ patient.year }} ( {{ calculateAge(patient.year) }} tuổi )</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.phoneNumber }}</td>
                <td class="text-start">{{ patient.address }}</td>
                <td>
                  <router-link :to="{ name: 'medicalrecord', params: { id: patient._id } }">
                    <button type="button" class="ml-2 btn btn-info">
                      <i class="fa-solid fa-book-medical"></i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ name: 'edit-patient', params: { id: patient._id } }">
                    <button type="button" class="ml-2 btn btn-primary">
                      <i class="fa fa-edit"></i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-danger" @click="deletePatient(patient._id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Không tìm thấy bệnh nhân phù hợp.</p>
        </div>
        <!-- Pagination -->
        <ul class="pagination d-flex justify-content-center" v-if="filteredPatientsCount > 0">
          <li class="page-item"><a class="page-link" @click="firstPage" :class="{ 'disabled': currentPage === 1 }"><<</a></li>
          <li class="page-item"><a class="page-link" @click="prevPage" :class="{ 'disabled': currentPage === 1 }"><</a></li>
          <li class="page-item" v-for="page in paginatedPages" :key="page">
            <a class="page-link" @click="changePage(page)" :class="{ 'active': page === currentPage }">{{ page }}</a>
          </li>
          <li class="page-item"><a class="page-link" @click="nextPage" :class="{ 'disabled': currentPage === totalPages }">></a></li>
          <li class="page-item"><a class="page-link" @click="lastPage" :class="{ 'disabled': currentPage === totalPages }">>></a></li>
        </ul>
        <!-- End Pagination -->
      </div>
    </div>
  </div>
</template>

<script>
import PatientService from "@/services/patient.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      loadingPatients: false,
      patients: [],
      searchText: "",
      currentPage: 1,
      patientsPerPage: 10,
    };
  },
  watch: {
    searchText(newValue, oldValue) {
          if (newValue !== oldValue) {
              this.changePage(1);
          }
      }
  },
  computed: {
    patientStrings() {
      return this.patients.map((patient) => {
        const { MSBN, name, phoneNumber } = patient;
        return [MSBN, name, phoneNumber].join("");
      });
    },
    filteredPatients() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.patients;
      return this.patients.filter((_patient, index) =>
        this.patientStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    filteredPatientsCount() {
      return this.filteredPatients.length;
    },
    // ------------------------- Pagination -------------------------
    paginatedPatients() {
      const startIndex = (this.currentPage - 1) * this.patientsPerPage;
      const endIndex = startIndex + this.patientsPerPage;
      return this.filteredPatients.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredPatients.length / this.patientsPerPage);
    },
    paginatedPages() {
      const visiblePages = 5;
      let startPage = this.currentPage - Math.floor(visiblePages / 2);
      startPage = Math.max(startPage, 1);
      let endPage = startPage + visiblePages - 1;
      endPage = Math.min(endPage, this.totalPages);
      startPage = Math.max(endPage - visiblePages + 1, 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    patientAges() {
      return this.patients.map((patient) => this.calculateAge(patient.year));
    },
  },
  methods: {
    async retrievePatients() {
      try {
        this.patients = await PatientService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    calculateAge(yearOfBirth) {
      const currentYear = new Date().getFullYear();
      return currentYear - yearOfBirth;
    },
    async refreshList() {
      await this.retrievePatients();
    },
    goToAddPatient() {
      this.$router.push({ name: 'add-patient' });
    },
    async deletePatient(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa bệnh nhân này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await PatientService.delete(id);
            this.refreshList();
            toast.success("Xóa thành công!");
          } catch (error) {
            toast.error("Đã có lỗi xảy ra khi xóa");
          }
        }
      });
    },
    // ------------------------- Pagination -------------------------
    changePage(page) {
      this.currentPage = page;
    },
    firstPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.totalPages;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  async created() {
    this.loadingPatients = true;
    try {
      await this.refreshList();
    } catch (error) {
        console.log(error);
    } finally {
        this.loadingPatients = false;
    }
  },
};
</script>

<style>
@import "@/assets/css/interface2.css";
</style>