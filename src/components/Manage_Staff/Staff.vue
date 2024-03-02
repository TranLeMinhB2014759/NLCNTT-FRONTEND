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
      return this.staffs.map((staff) => {
        const { name, password, address, phoneNumber, email, role, imgURL } = staff;
        return [name, password, address, phoneNumber, email, role, imgURL].join("");
      });
    },
    filteredStaffs() {
      if (!this.searchText) return this.staffs;
      return this.staffs.filter((_staff, index) =>
        this.staffStrings[index].includes(this.searchText)
      );
    },
    activeStaff() {
      if (this.activeIndex < 0) return null;
      return this.filteredStaffs[this.activeIndex];
    },
    filteredStaffsCount() {
      return this.filteredStaffs.length;
    },
  },
  methods: {
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
  },
  created() {
    // Automatically call refreshList() when the component is created
    this.refreshList();
  },
};
</script>

<template>
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
      <div class="col-sm-8"></div>
    </div>
    <div class="row">
      <div class="mt-3 col-12 col-sm-4 products">
        <StaffListAdmin v-if="filteredStaffsCount > 0" :staffs="filteredStaffs" v-model:activeIndex="activeIndex" />
        <p v-else>Không tìm thấy tài khoản phù hợp.</p>
      </div>
      <div class="mt-3 col-12 col-sm-8">
        <div v-if="activeStaff">
          <h4>
            Thông tin tài khoản
            <StaffCardAdmin :staff="activeStaff" />
            <router-link :to="{
              name: 'edit-staff',
              params: { id: activeStaff._id },
            }">
              <button class="Btn">Edit
                <svg class="svg" viewBox="0 0 512 512">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                  </path>
                </svg>
              </button>

            </router-link>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
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

/* -------------------------- Button ---------------------  */
a {
  text-decoration: none;
}
.Btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 40px;
  border: none;
  padding: 0px 20px;
  background-color: rgb(168, 38, 255);
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 5px 5px 0px rgb(140, 32, 212);
  transition-duration: .3s;
}

.svg {
  width: 13px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  fill: white;
  transition-duration: .3s;
}

.Btn:hover {
  color: transparent;
}

.Btn:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: .3s;
}

.Btn:active {
  transform: translate(3px, 3px);
  transition-duration: .3s;
  box-shadow: 2px 2px 0px rgb(140, 32, 212);
}</style>