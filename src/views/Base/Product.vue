<template>
  <div class="container" v-if="product && product.length > 0">
    <div class="back d-flex align-items-center">
      <router-link :to="{ name: 'san-pham' }">
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
      <div>Sản phẩm / <strong>{{ product[0].tenThuoc }}</strong></div>
    </div>
    <h3 class="title-comm"><span class="title-holder">Thông tin sản phẩm</span></h3>
    <div class="row">
      <div class="col-12 col-md-6 products-img">
        <img :src="product[0].imgURL" alt="Hình ảnh sản phẩm">
      </div>
      <div class="col-12 col-md-6">
        <div class="product-details">
          <div class="product-header">
            <h1 style="color: #0077B6">{{ product[0].tenThuoc }}</h1>
            <div class="product-rating">
              <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
          </div>
          <div class="product-price">
            <strong v-if="product[0].status === 'off'" class="status-off">SẢN PHẨM NGỪNG KINH DOANH</strong>
            <div v-else>
              <span class="price">{{ formatToVND(product[0].Gia) }} / {{ product[0].Donvi }}</span>
              <p class="attention"><i class="fa-solid fa-circle-exclamation"></i> Sản phẩm chỉ bạn tại quầy thuốc của phòng khám</p>
            </div>
          </div>

          <div class="product-info">
            <p><b>Hạn Sử Dụng: </b>12 tháng</p>
            <p><b>Mô tả sản phẩm: </b> {{ product[0].MoTa }}</p>
            <p><b>Ghi chú: </b> {{ product[0].GhiChu }}</p>
            <p><b>Nhà cung cấp: </b> {{ product[0].nhaCungCap }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Không tìm thấy sản phẩm</div>
</template>

<script>
import ProductService from "@/services/medicine.service";

export default {
  data() {
    return {
      product: null,
    };
  },
  props: {
    tenThuoc: { type: String, required: true },
  },
  methods: {
    formatToVND(number) {
      let formattedNumber = number.toLocaleString('vi-VN');
      formattedNumber += "₫";
      return formattedNumber;
    },
    async retrieveProduct() {
      try {
        this.product = await ProductService.findByTenThuoc(this.tenThuoc);
        if (this.product.length === 0) {
          this.$router.push({ name: 'notfound' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    await this.retrieveProduct();
  },
}
</script>

<style scoped>
@import "@/assets/css/product.css";

.container {
  margin-bottom: 50px;
}
</style>
