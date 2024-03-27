<template>
  <div>
    <add @submit:room="createRoom" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import add from "@/components/Room/AddForm.vue";
import RoomService from "@/services/room.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    add,
  },
  data() {
    return {
      room: {},
      message: "",
    }
  },
  methods: {
    async createRoom(data) {
      Swal.fire({
        title: "Bạn muốn tạo phòng <strong>" + data.maPhong + "</strong> đúng không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await RoomService.create(data);
            this.message = "Thêm phòng mới thành công";
            Swal.fire({
              icon: "success",
              title: this.message,
              showConfirmButton: true,
              timer: 2000
            });
            this.$router.push({ name: 'admin-room' });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
    },
    handleError(error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Ma phong already exists") {
        toast.error("Mã phòng đã được tạo");
      } else {
        toast.error("Đã có lỗi xảy ra khi thêm");
      }
    },
  },
};
</script>