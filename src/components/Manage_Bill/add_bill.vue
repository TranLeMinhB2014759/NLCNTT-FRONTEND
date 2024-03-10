<template>
    <div>
        <add @submit:bill="createBill" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import add from "@/components/Manage_Bill/AddForm.vue";
import BillService from "@/services/bill.service";

export default {
    components: {
        add,
    },
    props: {
        bill: { type: Object, require: true },
    },
    data() {
        return {

            message: "",
        };
    },
    methods: {
    
    async createBill(data) {
      const confirmed = window.confirm("Hóa đơn khi đã lập là không thể sửa. Bạn có chắc chắn muốn lập hóa đơn này?");

      if (confirmed) {
        try {
          await BillService.create(data);
          this.message = "Thêm thuốc mới thành công";
          this.$router.push({ name: 'admin-bill' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};


</script>

