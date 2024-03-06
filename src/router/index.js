import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",

    component: () => import("@/layouts/Base.vue"),

    children: [
      {
        path: "",
        name: "trangchu",
        component: () => import("@/views/Homepage.vue"),
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
      },
      {
        path: "add-medicalrecord/:id",
        name: "add-medicalrecord",
        component: () => import("@/components/Medical_Record/Record/add_medicalrecord.vue"),
      },
    ],
  },

  // ----------------------------- PRINT PAGE -----------------------------
  {
    path: '/print/:idmedicalrecord',
    name: 'PrintPage',
    component: () => import("@/components/Print/PrintPrescriptionPage.vue"),
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
