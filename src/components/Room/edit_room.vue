<template>
    <div v-if="room">
        <edit :room="room" @submit:room="editRoom" />
    </div>
</template>

<script>
import edit from "@/components/Room/EditForm.vue";
import RoomService from "@/services/room.service";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        edit,
    },

    data() {
        return {
            room: null,
            message: "",
        };
    },
    props: {
        id: { type: String, required: true },
    },
    methods: {
        async getRoom(id) {
            try {
                this.room = await RoomService.get(id);
            } catch (error) {
                this.$router.push({ name: "notfound" });
            }
        },
        async editRoom(data) {
            Swal.fire({
                title: "Bạn muốn cập nhật thông tin phòng này?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const newData = {};
                        if (data.maPhong === this.room.maPhong) {
                            newData.bacSiChinh = data.bacSiChinh;
                            // newData.bacSiPhu = data.bacSiPhu;
                            newData.dichVu = data.dichVu;
                        } else {
                            newData.floor = data.floor;
                            newData.stt = data.stt;
                            newData.maPhong = data.maPhong;
                            newData.bacSiChinh = data.bacSiChinh;
                            // newData.bacSiPhu = data.bacSiPhu;
                            newData.dichVu = data.dichVu;
                        }
                        await RoomService.update(this.room ? this.room._id : null, newData);
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.$router.push({ name: 'admin-room' });
                    }
                    catch (error) {
                        console.error(error);
                        if (error.response && error.response.status === 400 && error.response.data.message === "Ma Phong already exists") {
                            toast.error("Mã phòng đã được tạo");
                        } else {
                            toast.error("Đã có lỗi xảy ra khi thêm");
                        }
                    }
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        title: "Những thay đổi không được lưu",
                        showConfirmButton: true,
                        timer: 2000
                    });
                    this.$router.push({ name: 'admin-room' });
                }
            });
        },
    },
    created() {
        this.getRoom(this.id);
        this.message = "";
    },
};
</script>
