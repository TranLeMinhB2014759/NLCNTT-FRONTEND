<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ NHÂN VIÊN</div>
      <div class="container">
        <button class="btn btn-sm" @click="goToAddStaff()">
          <router-link :to="{ name: 'add-staff' }" class="text-success">
            <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
          </router-link>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8 d-flex align-items-end">
            <div class="mt-3">
              <div class="radio-inputs">
                <label class="radio">
                  <input type="radio" v-model="selectedOption" value="all">
                  <span class="name">Tất cả</span>
                </label>
                <label class="radio">
                  <input type="radio" v-model="selectedOption" value="admin">
                  <span class="name">Admin</span>
                </label>
                <label class="radio">
                  <input type="radio" v-model="selectedOption" value="doctor">
                  <span class="name">Doctor</span>
                </label>
                <label class="radio">
                  <input type="radio" v-model="selectedOption" value="cashier">
                  <span class="name">Cashier</span>
                </label>
                <label class="radio">
                  <input type="radio" v-model="selectedOption" value="receptionist">
                  <span class="name">Receptionist</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mt-3 col-12 col-sm-4 products">
            <StaffListAdmin v-if="filteredStaffsCount > 0" :staffs="sortedStaffs" v-model:activeIndex="activeIndex"
              :refreshList="refreshList" />
            <p v-else>Không tìm thấy tài khoản phù hợp.</p>
          </div>
          <div class="mt-3 col-12 col-sm-8">
            <div v-if="activeStaff">
              <h4>
                Thông tin tài khoản
                <StaffCardAdmin :staff="activeStaff" />
                <button class="Btn" @click="goToEditStaff(activeStaff._id)">Edit
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
import StaffListAdmin from "@/components/Manage_Staff/StaffListAdmin.vue";
import StaffCardAdmin from "@/components/Manage_Staff/StaffCardAdmin.vue";
import InputSearch from "@/components/InputSearch.vue";
import StaffService from "@/services/staff.service.js";
export default {
  components: {
    InputSearch,
    StaffListAdmin,
    StaffCardAdmin,
  },
  data() {
    return {
      selectedOption: "all",
      staffs: [],
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
    staffStrings() {
      return this.filterStaffsByOption(this.selectedOption).map((staff) => {
        const { name, password, address, phoneNumber, email, role } = staff;
        return [name, password, address, phoneNumber, email, role].join("");
      });
    },
    filteredStaffs() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.filterStaffsByOption(this.selectedOption);
      return this.filterStaffsByOption(this.selectedOption).filter((_staff, index) =>
        this.staffStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    sortedStaffs() {
      return this.filteredStaffs.slice().sort((a, b) => {
        return a.role.localeCompare(b.role);
      });
    },
    activeStaff() {
      if (this.activeIndex < 0) return null;
      return this.sortedStaffs[this.activeIndex];
    },
    filteredStaffsCount() {
      return this.sortedStaffs.length;
    },
  },
  methods: {
    filterStaffsByOption(option) {
      switch (option) {
        case 'all':
          return this.staffs;
        case 'admin':
          return this.staffs.filter(staff => staff.role === 'admin');
        case 'doctor':
          return this.staffs.filter(staff => staff.role === 'doctor');
        case 'cashier':
          return this.staffs.filter(staff => staff.role === 'cashier');
        case 'receptionist':
          return this.staffs.filter(staff => staff.role === 'receptionist');
        default:
          return this.staffs;
      }
    },
    async retrieveStaffs() {
      try {
        this.staffs = await StaffService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveStaffs();
      this.activeIndex = -1;
    },
    goToAddStaff() {
      this.$router.push({ name: 'add-staff' });
    },
    goToEditStaff(id) {
      this.$router.push({ name: 'edit-staff', params: { id } });
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style>
@import "@/assets/css/interface1.css";

.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #EEE;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 350px;
  font-size: 14px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: .5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.name {
  background-color: #fff;
  font-weight: 600;
}

.indicator {
  background: #3b7ddd;
  border-radius: 50%;
  box-shadow: 0 .1rem .2rem rgba(0, 0, 0, .05);
  color: #fff;
  display: block;
  font-size: .675rem;
  height: 20px;
  padding: 1px;
  position: absolute;
  text-align: center;
  top: -10%;
  right: 48%;
  transition: top .1s ease-out;
  width: 25px
}
</style>