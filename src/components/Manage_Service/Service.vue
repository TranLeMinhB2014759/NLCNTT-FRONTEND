<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ DỊCH VỤ</div>
      <div class="container">
        <button class="btn btn-sm text-success" @click="goToAddService()">
          <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="container mt-3 table-responsive">
          <table class="table table-bordered table-hover text-center" v-if="filteredServiceCount > 0"
            :service="filteredService">
            <thead class="table-success">
              <tr>
                <th>Mã dịch vụ</th>
                <th>Tên dịch vụ</th>
                <th>Giá tiền</th>
                <th>Trạng thái</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(service, index) in sortedServices" :key="index" :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)">
                <td>{{ service.code }}</td>
                <td class="text-start">{{ service.tenDichVu }}</td>
                <td>{{ formatToVND(service.Gia) }}</td>
                <td v-if="service.status === 'on'">
                  <h3 class="badge bg-success"><i class="fa-solid fa-circle fa-2xs"></i> Đang hoạt động</h3>
                </td>
                <td v-else>
                  <h3 class="badge bg-warning"><i class="fa-solid fa-circle fa-2xs"></i> Ngừng cung cấp</h3>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-primary" @click="goToEditService(service._id)">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-danger" @click="deleteService(service._id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Không tìm thấy dịch vụ.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceService from "@/services/service.service.js";
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
      service: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    serviceStrings() {
      return this.service.map((service) => {
        const { code, tenDichVu, status } = service;
        return [code, tenDichVu, status].join("");
      });
    },
    filteredService() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.service;
      return this.service.filter((_service, index) =>
        this.serviceStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    filteredServiceCount() {
      return this.filteredService.length;
    },
    sortedServices() {
      return this.filteredService.slice().sort((a, b) => {
        return a.code.localeCompare(b.code);
      });
    }
  },
  methods: {
    async retrieveService() {
      try {
        this.service = await ServiceService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    formatToVND(number) {
      let formattedNumber = number.toLocaleString('vi-VN');
      formattedNumber += "₫";
      return formattedNumber;
    },
    refreshList() {
      this.retrieveService();
      this.activeIndex = -1;
    },
    goToAddService() {
      this.$router.push({ name: 'add-service' });
    },
    goToEditService(id) {
      this.$router.push({ name: 'edit-service', params: { id } });
    },
    updateActiveIndex(index) {
      this.activeIndex = index;
    },
    async deleteService(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa dịch vụ này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await ServiceService.delete(id);
            this.refreshList();
            toast.success("Delete Succesfully!");
          } catch (error) {
            toast.error("Đã có lỗi xảy ra khi xóa");
          }
        }
      });
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style>
a {
  text-decoration: none;
}

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

.bg-success {
  color: white;
  background-color: rgb(65 255 167) !important;
}

.swal2-confirm-red {
  background-color: red !important;
}
</style>