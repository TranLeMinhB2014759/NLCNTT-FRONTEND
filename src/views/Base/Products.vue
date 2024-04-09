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
    <h1 class="text-center">CÁC SẢN PHẨM CỦA DERMATOLOGY CLINIC</h1>
    <div class="row">
      <div class="container col-12 col-sm-4 form__search">
        <div class="form__top">
          <InputSearch v-model="searchText" />
        </div>
      </div>
      <div class="col-sm-8"></div>
    </div>
    <div class="row">
      <div class="mt-3 col-12 products">
        <div class="tc">
          <div class="container">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(product, index) in filteredProducts" :key="index"
                :class="{ active: index === activeIndex }">
                <router-link :to="{ name: 'chi-tiet-san-pham', params: { tenThuoc: product.tenThuoc  } }"
                  class="nav-link text-dark">
                  <div class="container-sp"><img :src="product.imgURL" alt="Hình ảnh" class="imgsp" /></div>
                  <div class="ten text-center">
                    <p>{{ product.tenThuoc }}</p>
                    <div class="ngoi-sao">
                      <i class="fa-solid fa-star text-warning"></i>
                      <i class="fa-solid fa-star text-warning"></i>
                      <i class="fa-solid fa-star text-warning"></i>
                      <i class="fa-solid fa-star text-warning"></i>
                      <i class="fa-solid fa-star text-warning"></i>
                    </div>
                    <p><b>{{ formatToVND(product.Gia) }} / {{ product.Donvi }}</b></p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <p v-if="filteredProductsCount === 0">Không có sản phẩm phù hợp.</p>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductService from "@/services/medicine.service";

export default {
  emits: ["update:activeIndex"],
  components: {
    InputSearch,
  },
  data() {
    return {
      products: [],
      searchText: "",
      activeIndex: -1,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    productStrings() {
      return this.products.map((product) => {
        const { tenThuoc, Gia, nhaCungCap, status } = product;
        return [tenThuoc, Gia, nhaCungCap, status].join("");
      });
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
  },
  methods: {
    formatToVND(number) {
      let formattedNumber = number.toLocaleString('vi-VN');
      formattedNumber += "₫";
      return formattedNumber;
    },
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped>
@import "@/assets/css/product.css";
@import "@/assets/css/homepage.css";
</style>
