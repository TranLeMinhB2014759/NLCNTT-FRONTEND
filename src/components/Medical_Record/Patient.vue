<template>
  <div class="banner text-center">QUẢN LÝ BỆNH NHÂN</div>
  <div class="container">
    <button class="btn btn-sm" @click="goToAddPatient()">
      <router-link :to="{ name: 'add-patient' }" class="text-success">
        <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
      </router-link>
    </button>
    <div class="row">
      <div class="container col-12 col-sm-4">
        <InputSearch v-model="searchText" />
      </div>
      <div class="col-sm-8"></div>
    </div>
    <div class="container mt-3">
      <table class="table table-bordered table-hover text-center" v-if="filteredPatientsCount > 0"
        :patients="filteredPatients">
        <thead>
          <tr class="">
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
        <tbody v-for="(patient, index) in filteredPatients" :key="index" :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index)">
          <tr>
            <td>{{ patient.name }}</td>
            <td>{{ patient.year }} ( {{ calculateAge(patient.year) }} tuổi )</td>
            <td>{{ patient.gender }}</td>
            <td>{{ patient.phoneNumber }}</td>
            <td>{{ patient.address }}</td>
            <td>
              <button type="button" class="ml-2 btn btn-info">
                <i class="fa-solid fa-eye"></i>
              </button>
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
      <p v-else>Không tìm thấy tài bệnh nhân phù hợp.</p>
    </div>
  </div>
</template>

<script>
import PatientService from "@/services/patient.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      patients: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    patientStrings() {
      return this.patients.map((patient) => {
        const { name, phoneNumber, password, address } = patient;
        return [name, phoneNumber, password, address].join("");
      });
    },
    filteredPatients() {
      if (!this.searchText) return this.patients;
      return this.patients.filter((_patient, index) =>
        this.patientStrings[index].includes(this.searchText)
      );
    },
    filteredPatientsCount() {
      return this.filteredPatients.length;
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
    refreshList() {
      this.retrievePatients();
      this.activeIndex = -1;
    },
    goToAddPatient() {
      this.$router.push({ name: 'add-patient' });
    },
    updateActiveIndex(index) {
      this.activeIndex = index;
    },
    async deletePatient(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await PatientService.delete(id);
        this.refreshList();
        toast.success("Delete Succesfully!");
      }
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style>
.badge {
  --bs-badge-color: black !important;
}

.banner {
  background-color: antiquewhite;
  padding: 10px;
  margin-bottom: 15px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: 600;
}
</style>
