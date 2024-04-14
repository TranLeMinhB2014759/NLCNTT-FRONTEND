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
            <tbody>
              <tr v-for="(disease, index) in sortedDiseases" :key="index">
                <td>{{ disease.code }}</td>
                <td class="text-start">{{ disease.tenBenh }}</td>
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
        <a href="https://baohiemxahoidientu.vn/bhxh/cap-nhat-danh-muc-benh-dai-ngay-moi-nhat-theo-quy-dinh-cua-bo-y-te.html"
          target="_blank">[ Cập
          nhật ] Danh mục bệnh dài ngày mới nhất theo quy định của Bộ Y Tế</a>
      </p>
      <p class="text-center">
        Ban hành kèm theo <a href="https://baohiemxahoidientu.vn/van-ban/chi-tiet/thong-tu-46-2016-tt-byt"
          target="_blank">Thông tư
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
import Swal from 'sweetalert2'

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      disease: [],
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
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.disease;
      return this.disease.filter((_disease, index) =>
        this.diseaseStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    filteredDiseaseCount() {
      return this.filteredDisease.length;
    },
    sortedDiseases() {
      return this.filteredDisease.slice().sort((a, b) => {
        return a.code.localeCompare(b.code);
      });
    }
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
    },
    goToAddDisease() {
      this.$router.push({ name: 'add-disease' });
    },
    async deleteDisease(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa loại bệnh này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await DiseaseService.delete(id);
            this.refreshList();
            toast.success("Xóa thành công!");
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
@import "@/assets/css/interface2.css";
</style>