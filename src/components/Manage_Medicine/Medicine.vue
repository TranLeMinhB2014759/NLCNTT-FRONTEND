<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ THUỐC</div>
      <div class="container">
        <button class="btn btn-sm" @click="goToAddMedicine()">
          <router-link :to="{ name: 'add-medicine' }" class="text-success">
            <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
          </router-link>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="row">
          <div class="mt-3 col-12 col-sm-4 products">
            <MedicineListAdmin v-if="filteredMedicinesCount > 0" :medicines="filteredMedicines"
              v-model:activeIndex="activeIndex" :refreshList="refreshList"/>
            <p v-else>Không tìm thấy loại thuốc phù hợp.</p>
          </div>
          <div class="mt-3 col-12 col-sm-8">
            <div v-if="activeMedicine">
              <h4>
                Thông tin thuốc
                <MedicineCardAdmin :medicine="activeMedicine" />
                <button class="Btn" @click="goToEditMedicine(activeMedicine._id)">
                  Edit
                  <svg class="svg" viewBox="0 0 512 512">
                    <path
                      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                    </path>
                  </svg>
                </button>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MedicineListAdmin from "@/components/Manage_Medicine/MedicineListAdmin.vue";
import MedicineCardAdmin from "@/components/Manage_Medicine/MedicineCardAdmin.vue";
import InputSearch from "@/components/InputSearch.vue";
import MedicineService from "@/services/medicine.service.js";
export default {
  components: {
    InputSearch,
    MedicineListAdmin,
    MedicineCardAdmin,
  },
  data() {
    return {
      medicines: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    medicineStrings() {
      return this.medicines.map((medicine) => {
        const { tenThuoc, Gia, nhaCungCap, status } = medicine;
        return [ tenThuoc, Gia, nhaCungCap, status ].join("");
      });
    },
    filteredMedicines() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.medicines;
      return this.medicines.filter((_medicine, index) =>
        this.medicineStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    activeMedicine() {
      if (this.activeIndex < 0) return null;
      return this.filteredMedicines[this.activeIndex];
    },
    filteredMedicinesCount() {
      return this.filteredMedicines.length;
    },
  },
  methods: {
    async retrieveMedicines() {
      try {
        this.medicines = await MedicineService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveMedicines();
      this.activeIndex = -1;
    },
    goToAddMedicine() {
      this.$router.push({ name: 'add-medicine' });
    },
    goToEditMedicine(id) {
      this.$router.push({ name: 'edit-medicine', params: { id } });
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style>
@import "@/assets/css/interface1.css";
</style>