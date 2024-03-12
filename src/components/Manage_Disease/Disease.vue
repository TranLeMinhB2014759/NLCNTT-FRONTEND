<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ CÁC LOẠI BỆNH VỀ DA</div>
      <div class="container">
        <button class="btn btn-sm text-success" @click="goToAddDisease()">
          <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="container mt-3 table-responsive">
          <table class="table table-bordered table-hover text-center" v-if="filteredDiseaseCount > 0"
            :disease="filteredDisease">
            <thead class="table-success">
              <tr>
                <th>Mã bệnh theo ICD 10</th>
                <th>Danh mục bệnh theo các chuyên khoa</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody v-for="(disease, index) in filteredDisease" :key="index"
              :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
              <tr>
                <td>{{ disease.code }}</td>
                <td>{{ disease.tenBenh }}</td>
                <td>
                  <router-link :to="{ name: 'edit-disease', params: { id: disease._id } }">
                    <button type="button" class="ml-2 btn btn-primary">
                      <i class="fa fa-edit"></i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-danger" @click="deleteDisease(disease._id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Không tìm thấy bệnh phù hợp.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-body">
      <p class="text-center">
        <a
          href="https://baohiemxahoidientu.vn/bhxh/cap-nhat-danh-muc-benh-dai-ngay-moi-nhat-theo-quy-dinh-cua-bo-y-te.html" target="_blank">[ Cập
          nhật ] Danh mục bệnh dài ngày mới nhất theo quy định của Bộ Y Tế</a>
      </p>
      <p class="text-center">
        Ban hành kèm theo <a href="https://baohiemxahoidientu.vn/van-ban/chi-tiet/thong-tu-46-2016-tt-byt" target="_blank">Thông tư
          số 46/2016/TT-BYT</a> ngày 30 tháng 12 năm 2016 của Bộ trưởng Bộ Y tế
      </p>

    </div>
  </div>
</template>

<script>
import DiseaseService from "@/services/disease.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      disease: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    diseaseStrings() {
      return this.disease.map((disease) => {
        const { code, tenBenh } = disease;
        return [code, tenBenh].join("");
      });
    },
    filteredDisease() {
      if (!this.searchText) return this.disease;
      return this.disease.filter((_disease, index) =>
        this.diseaseStrings[index].includes(this.searchText)
      );
    },
    filteredDiseaseCount() {
      return this.filteredDisease.length;
    },
  },
  methods: {
    async retrieveDisease() {
      try {
        this.disease = await DiseaseService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    refreshList() {
      this.retrieveDisease();
      this.activeIndex = -1;
    },
    goToAddDisease() {
      this.$router.push({ name: 'add-disease' });
    },
    updateActiveIndex(index) {
      this.activeIndex = index;
    },
    async deleteDisease(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await DiseaseService.delete(id);
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
</style>