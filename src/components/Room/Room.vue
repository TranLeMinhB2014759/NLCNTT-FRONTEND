<template>
  <div class="card">
    <div class="card-body">
      <div class="banner text-center">QUẢN LÝ PHÒNG KHÁM</div>
      <div class="container">
        <button class="btn btn-sm text-success" @click="goToAddRoom()">
          <i class="fas fa-plus fa-2x" aria-hidden="true"></i>
        </button>
        <div class="row">
          <div class="container col-12 col-sm-4">
            <InputSearch v-model="searchText" />
          </div>
          <div class="col-sm-8"></div>
        </div>
        <div class="container mt-3 table-responsive">
          <table class="table table-bordered table-hover text-center" v-if="filteredRoomCount > 0" :room="filteredRoom">
            <thead class="table-success">
              <tr>
                <th>Tầng</th>
                <th>Mã phòng</th>
                <th>Bác sĩ chính</th>
                <th>Dịch vụ</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(room, index) in sortedRooms" :key="index" @click="updateActiveIndex(index)">
                <td>{{ room.floor }}</td>
                <td>{{ room.maPhong }}</td>

                <td v-if="room.bacSiChinh === ''">Phòng trống</td>
                <td v-else>{{ room.bacSiChinh }}</td>

                <td v-if="room.dichVu === ''">Phòng trống</td>
                <td v-else>{{ room.dichVu }}</td>
                <td>
                  <button type="button" class="ml-2 btn btn-primary" @click="goToEditRoom(room._id)">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button type="button" class="ml-2 btn btn-danger" @click="deleteRoom(room._id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Không tìm thông tin phù hợp.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomService from "@/services/room.service.js";
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
      room: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    roomStrings() {
      return this.room.map((room) => {
        const { maPhong, bacSiChinh, dichVu } = room;
        return [maPhong, bacSiChinh, dichVu].join("");
      });
    },
    filteredRoom() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!searchTextLower) return this.room;
      return this.room.filter((_room, index) =>
        this.roomStrings[index].toLowerCase().includes(searchTextLower)
      );
    },
    filteredRoomCount() {
      return this.filteredRoom.length;
    },
    sortedRooms() {
      return this.filteredRoom.slice().sort((a, b) => {
        return a.maPhong.localeCompare(b.maPhong);
      });
    }
  },
  methods: {
    async retrieveRoom() {
      try {
        this.room = await RoomService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    refreshList() {
      this.retrieveRoom();
      this.activeIndex = -1;
    },
    goToAddRoom() {
      this.$router.push({ name: 'add-room' });
    },
    goToEditRoom(id) {
      this.$router.push({ name: 'edit-room', params: { id } });
    },
    updateActiveIndex(index) {
      this.activeIndex = index;
    },
    async deleteRoom(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa phòng này không?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        customClass: {
          confirmButton: "swal2-confirm-red"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await RoomService.delete(id);
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

.swal2-confirm-red {
  background-color: red !important;
}
</style>