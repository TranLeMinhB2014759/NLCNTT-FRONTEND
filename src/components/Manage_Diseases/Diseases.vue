<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ CÁC LOẠI BỆNH VỀ DA</div>
      <div class="container">
        <button class="btn btn-sm text-success" @click="goToAddDiseases()">
          <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="container mt-3 table-responsive">
          <table class="table table-bordered table-hover text-center" v-if="filteredDiseasesCount > 0"
            :diseases="filteredDiseases">
            <thead>
              <tr>
                <th>Mã bệnh theo ICD 10</th>
                <th>Danh mục bệnh theo các chuyên khoa</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody v-for="(diseases, index) in filteredDiseases" :key="index"
              :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
              <tr>
                <td>{{ diseases.code }}</td>
                <td>{{ diseases.tenBenh }}</td>
                <td>
                  <router-link :to="{ name: 'edit-diseases', params: { id: diseases._id } }">
                    <button type="button" class="ml-2 btn btn-primary">
                      <i class="fa fa-edit"></i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-danger" @click="deleteDiseases(diseases._id)">
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
import DiseasesService from "@/services/diseases.service.js";
import InputSearch from "@/components/InputSearch.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      diseases: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    diseasesStrings() {
      return this.diseases.map((diseases) => {
        const { code, tenBenh } = diseases;
        return [code, tenBenh].join("");
      });
    },
    filteredDiseases() {
      if (!this.searchText) return this.diseases;
      return this.diseases.filter((_diseases, index) =>
        this.diseasesStrings[index].includes(this.searchText)
      );
    },
    filteredDiseasesCount() {
      return this.filteredDiseases.length;
    },
  },
  methods: {
    async retrieveDiseases() {
      try {
        this.diseases = await DiseasesService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    refreshList() {
      this.retrieveDiseases();
      this.activeIndex = -1;
    },
    goToAddDiseases() {
      this.$router.push({ name: 'add-diseases' });
    },
    updateActiveIndex(index) {
      this.activeIndex = index;
    },
    async deleteDiseases(id) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
      if (confirmed) {
        await DiseasesService.delete(id);
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