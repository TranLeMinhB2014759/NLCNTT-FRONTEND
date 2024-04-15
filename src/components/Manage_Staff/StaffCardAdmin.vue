<script>
export default {
    props: {
        staff: { type: Object, required: true },
    },
    data() {
        return {
            passwordVisible: false,
        };
    },
    computed: {
        currentPasswordEyeIcon() {
            return this.passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        }
    }
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
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <strong>Mật khẩu:</strong>
                    </div>

                    <div class="col-10 col-lg-6">
                        <span v-if="passwordVisible">{{ staff.password }}</span>
                        <span v-else>*****</span>
                    </div>
                    <div class="col-2">
                        <button type="button" class="input-group-text" @click="togglePasswordVisibility">
                            <i :class="currentPasswordEyeIcon"></i>
                        </button>

                    </div>
                </div>
            </div>
            <div class="p-1">
                <strong>Vai trò:</strong>
                {{ staff.role }}
            </div>
        </div>
    </div>
</template>