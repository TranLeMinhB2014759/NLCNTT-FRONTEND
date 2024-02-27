<script>
export default {
    props: {
        staff: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row" style="padding: 10px;">
        <div class="p-1 col-3 img-card">
           <img :src="staff.imgURL" alt=""> 
        </div>
        <div class="col-9">
            <div class="p-1">
            <strong>Tên:</strong>
            {{ staff.name }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ staff.email }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ staff.phoneNumber }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ staff.address }}
        </div>
        <div class="p-1">
            <strong>Mật khẩu:</strong>
            {{ staff.password }}
        </div>
        <div class="p-1">
            <strong>Vai trò:</strong>
            {{ staff.role }}
        </div>
        </div>
    </div>
</template>
<style scoped>
.img-card{
    display: flex;
    justify-content: center;
}
.img-card>img{
    max-width: 150px;
    max-height: 150px;
    min-width: 10px;
    min-height: 10px;
}
</style>