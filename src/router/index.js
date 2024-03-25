import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",

    component: () => import("@/layouts/Base.vue"),

    children: [
      {
        path: "",
        name: "trangchu",
        component: () => import("@/views/Base/Homepage.vue"),
      },
      {
        path: "bao-gia-dich-vu",
        name: "bao-gia-dich-vu",
        component: () => import("@/views/Base/Service.vue"),
      },
      {
        path: "doi-ngu-bac-si",
        name: "doi-ngu-bac-si",
        component: () => import("@/views/Base/Doctor.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
      },

      {
        path: "/products",
        name: "products",
        component: () => import("@/views/Products.vue"),
      },
    ],
  },


  // ---------------------- ADMIN ------------------------------
  {
    path: "/loginAdmin",
    name: "login-admin",
    component: () => import("@/components/AuthAdmin/AdminLogin.vue"),
    beforeEnter(to, from, next) {

      const staffJs = window.localStorage.getItem('staff');
      const staff = JSON.parse(staffJs);

      if (staff && staff.role === "admin") {
        next({ name: "welcome" });
      }
      if (staff && staff.role === "doctor") {
        next({ name: "doctor" });
      }
      if (staff && staff.role === "cashier") {
        next({ name: "cashier" });
      }
      if (staff && staff.role === "receptionist") {
        next({ name: "receptionist" });
      }
      else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/layouts/Admin.vue"),
    beforeEnter: (to, from, next) => {
      const staffJs = window.localStorage.getItem('staff');
      const staff = JSON.parse(staffJs);

      if (!staff) {
        next({ name: "login-admin" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        name: "welcome",
        component: () => import("@/views/Admin/Welcome.vue"),
      },
      // ----------------------------- Staff -----------------------------
      {
        path: "staff",
        name: "admin-staff",
        component: () => import("@/components/Manage_Staff/Staff.vue"),
      },
      {
        path: "add-staff",
        name: "add-staff",
        component: () => import("@/components/Manage_Staff/add_staff.vue"),
      },
      {
        path: "edit-staff/:id",
        name: "edit-staff",
        component: () => import("@/components/Manage_Staff/edit_staff.vue"),
        props: true,
      },
      // ----------------------------- Doctor -----------------------------
      {
        path: "doctor",
        name: "admin-doctor",
        component: () => import("@/components/Manage_Doctor/Doctor.vue"),
      },
      {
        path: "add-doctor",
        name: "add-doctor",
        component: () => import("@/components/Manage_Doctor/add_doctor.vue"),
      },
      {
        path: "edit-doctor/:id",
        name: "edit-doctor",
        component: () => import("@/components/Manage_Doctor/edit_doctor.vue"),
        props: true,
      },
      // ----------------------------- Medicine -----------------------------
      {
        path: "medicine",
        name: "admin-medicine",
        component: () => import("@/components/Manage_Medicine/Medicine.vue"),
      },
      {
        path: "add-medicine",
        name: "add-medicine",
        component: () => import("@/components/Manage_Medicine/add_medicine.vue"),
      },
      {
        path: "edit-medicine/:id",
        name: "edit-medicine",
        component: () => import("@/components/Manage_Medicine/edit_medicine.vue"),
        props: true,
      },
      // ----------------------------- Disease -----------------------------
      {
        path: "disease",
        name: "admin-disease",
        component: () => import("@/components/Manage_Disease/Disease.vue"),
      },
      {
        path: "add-disease",
        name: "add-disease",
        component: () => import("@/components/Manage_Disease/add_disease.vue"),
      },
      {
        path: "edit-disease/:id",
        name: "edit-disease",
        component: () => import("@/components/Manage_Disease/edit_disease.vue"),
        props: true,
      },
      // ----------------------------- Service -----------------------------
      {
        path: "service",
        name: "admin-service",
        component: () => import("@/components/Manage_Service/Service.vue"),
      },
      {
        path: "add-service",
        name: "add-service",
        component: () => import("@/components/Manage_Service/add_service.vue"),
      },
      {
        path: "edit-service/:id",
        name: "edit-service",
        component: () => import("@/components/Manage_Service/edit_service.vue"),
        props: true,
      },
      // ----------------------------- Room -----------------------------
      {
        path: "room",
        name: "admin-room",
        component: () => import("@/components/Room/Room.vue"),
      },
      {
        path: "add-room",
        name: "add-room",
        component: () => import("@/components/Room/add_room.vue"),
      },
      {
        path: "edit-room/:id",
        name: "edit-room",
        component: () => import("@/components/Room/edit_room.vue"),
        props: true,
      },
      // ----------------------------- Medical Record -----------------------------
      {
        path: "patient",
        name: "admin-patient",
        component: () => import("@/components/Medical_Record/Patient.vue"),
      },
      {
        path: "add-patient",
        name: "add-patient",
        component: () => import("@/components/Medical_Record/add_patient.vue"),
      },
      {
        path: "edit-patient/:id",
        name: "edit-patient",
        component: () => import("@/components/Medical_Record/edit_patient.vue"),
        props: true,
      },
      {
        path: "medicalrecord/:id",
        name: "medicalrecord",
        component: () => import("@/components/Medical_Record/Record/MedicalRecord.vue"),
        props: true,
      },
      {
        path: "add-medicalrecord/:id",
        name: "add-medicalrecord",
        component: () => import("@/components/Medical_Record/Record/add_medicalrecord.vue"),
        props: true,
      },
      // ----------------------------- Bill -----------------------------
      {
        path: "bill",
        name: "admin-bill",
        component: () => import("@/components/Manage_Bill/Bill.vue"),
      },
      {
        path: "add-bill",
        name: "add-bill",
        component: () => import("@/components/Manage_Bill/add_bill.vue"),
      },
    ],
  },

  // ----------------------------- PRINT PAGE -----------------------------
  {
    path: '/printprescription/:idmedicalrecord',
    name: 'PrintPrescription',
    component: () => import("@/components/Print/PrintPrescriptionPage.vue"),
    props: true,
  },
  {
    path: '/printbill/:idbill',
    name: 'PrintBill',
    component: () => import("@/components/Print/PrintBillPage.vue"),
    props: true,
  },

  // ----------------------------- NOT FOUND -----------------------------
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
