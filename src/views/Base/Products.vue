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

    <div class="row" v-if="filteredProductsCount > 0">
      <div class="mt-3 col-12 col-sm-6 col-md-4 col-lg-3" v-for="(product, index) in filteredProducts" :key="index">
        <div class="container-product">
          <router-link :to="{ name: 'chi-tiet-san-pham', params: { tenThuoc: product.tenThuoc } }" class="text-dark">
            <div class="img-product d-flex justify-content-center">
              <img :src="product.imgURL" alt="Hình ảnh" />
            </div>
            <div class="detail-product">
              <div class="name-product">
                <p>{{ product.tenThuoc }}</p>
              </div>
              <div class="start">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
              </div>
              <div class="buy">
                <p class="address-buy">Chỉ bạn tại phòng khám</p>
                <p class="price-product"><b>{{ formatToVND(product.Gia) }} / {{ product.Donvi }}</b></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <p v-else>Không có sản phẩm phù hợp.</p>

    <div class="d-flex justify-content-center">
      <div class="main__action" v-if="hasMoreProducts && !searchText">
        <button class="main__scroll" @click="loadMores">
          <div class="main__scroll-box">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
                fill="rgba(28,28,30,1)">
              </path>
            </svg>
          </div>
          <span class="main__scroll-text">Load More</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductService from "@/services/medicine.service";

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      products: [],
      searchText: "",
      loadedCount: 4,
    };
  },
  computed: {
    productStrings() {
      return this.products.map((product) => {
        const { tenThuoc, nhaCungCap, status } = product;
        return [tenThuoc, nhaCungCap, status].join("");
      });
    },
    filteredProducts() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) {
        return this.products.slice(0, this.loadedCount);
      } else {
        return this.products
          .filter((_product, index) =>
            this.productStrings[index].toLowerCase().includes(searchTextLower)
          )
      }
    },
    hasMoreProducts() {
      return this.filteredProducts.length < this.products.length;
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    loadMores() {
      this.loadedCount += 4;
    },
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
.container {
    margin-bottom: 50px;
}


/* ------------------------------ LOAD MORE ------------------------------ */
.main__action {
  width: 80px;
  height: 70px;
}

.main__scroll {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}

.main__scroll-text {
  font-size: small;
  color: rgba(28, 28, 30, 1);
}

.main__action .main__scroll-box {
  animation: scroll-down 2.5s infinite;
}

@keyframes scroll-down {

  0%,
  100% {
    transform: translateY(0rem);
    opacity: 1;
  }

  65% {
    transform: translateY(1rem);
    opacity: 0;
  }

  70% {
    transform: translateY(-1rem);
    opacity: 0;
  }
}
</style>
