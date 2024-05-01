import { createRouter, createWebHistory } from "vue-router";

const authMiddleware = (to, from, next) => {
  const staffJs = window.localStorage.getItem('staff');
  const staff = JSON.parse(staffJs);

  if (staff) {
    if (to.meta.roles && !to.meta.roles.includes(staff.role)) {
      next({ name: "forbidden" });
    } else {
      next();
    }
  } else {
    next({ name: "login-admin" });
  }
};

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
        path: "tra-cuu-don-thuoc",
        name: "tra-cuu-don-thuoc",
        component: () => import("@/views/Base/Prescription.vue"),
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
        path: "dat-lich-kham-benh",
        name: "dat-lich-kham-benh",
        component: () => import("@/views/Base/Appointment.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
      },

      {
        path: "/san-pham",
        name: "san-pham",
        component: () => import("@/views/Base/Products.vue"),
      },
      {
        path: "/chi-tiet-san-pham/:tenThuoc",
        name: "chi-tiet-san-pham",
        component: () => import("@/views/Base/Product.vue"),
        props: true,
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

      if (staff) {
        next({ name: "welcome" });
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
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "add-staff",
        name: "add-staff",
        component: () => import("@/components/Manage_Staff/add_staff.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "edit-staff/:id",
        name: "edit-staff",
        component: () => import("@/components/Manage_Staff/edit_staff.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      // ----------------------------- Doctor -----------------------------
      {
        path: "doctor",
        name: "admin-doctor",
        component: () => import("@/components/Manage_Doctor/Doctor.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "add-doctor",
        name: "add-doctor",
        component: () => import("@/components/Manage_Doctor/add_doctor.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "edit-doctor/:id",
        name: "edit-doctor",
        component: () => import("@/components/Manage_Doctor/edit_doctor.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      // ----------------------------- Medicine -----------------------------
      {
        path: "medicine",
        name: "admin-medicine",
        component: () => import("@/components/Manage_Medicine/Medicine.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier']
        },
      },
      {
        path: "add-medicine",
        name: "add-medicine",
        component: () => import("@/components/Manage_Medicine/add_medicine.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier']
        },
      },
      {
        path: "edit-medicine/:id",
        name: "edit-medicine",
        component: () => import("@/components/Manage_Medicine/edit_medicine.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier']
        },
      },
      // ----------------------------- Disease -----------------------------
      {
        path: "disease",
        name: "admin-disease",
        component: () => import("@/components/Manage_Disease/Disease.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "add-disease",
        name: "add-disease",
        component: () => import("@/components/Manage_Disease/add_disease.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "edit-disease/:id",
        name: "edit-disease",
        component: () => import("@/components/Manage_Disease/edit_disease.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      // ----------------------------- Service -----------------------------
      {
        path: "service",
        name: "admin-service",
        component: () => import("@/components/Manage_Service/Service.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "add-service",
        name: "add-service",
        component: () => import("@/components/Manage_Service/add_service.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "edit-service/:id",
        name: "edit-service",
        component: () => import("@/components/Manage_Service/edit_service.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      // ----------------------------- Room -----------------------------
      {
        path: "room",
        name: "admin-room",
        component: () => import("@/components/Room/Room.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "add-room",
        name: "add-room",
        component: () => import("@/components/Room/add_room.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: "edit-room/:id",
        name: "edit-room",
        component: () => import("@/components/Room/edit_room.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin']
        },
      },
      // ----------------------------- Appointment -----------------------------
      {
        path: "appointment",
        name: "admin-appointment",
        component: () => import("@/components/Manage_Appointment/Appointment.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'receptionist']
        },
      },
      // ----------------------------- Receiving Patients -----------------------------
      {
        path: "receiving",
        name: "admin-receiving",
        component: () => import("@/components/Receiving_Patients/Receiving_Patients.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      // ----------------------------- Medical Record -----------------------------
      {
        path: "patient",
        name: "admin-patient",
        component: () => import("@/components/Medical_Record/Patient.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      {
        path: "add-patient",
        name: "add-patient",
        component: () => import("@/components/Medical_Record/add_patient.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      {
        path: "edit-patient/:id",
        name: "edit-patient",
        component: () => import("@/components/Medical_Record/edit_patient.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      {
        path: "medicalrecord/:id",
        name: "medicalrecord",
        component: () => import("@/components/Medical_Record/Record/MedicalRecord.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      {
        path: "add-medicalrecord/:id",
        name: "add-medicalrecord",
        component: () => import("@/components/Medical_Record/Record/add_medicalrecord.vue"),
        props: true,
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'doctor']
        },
      },
      // ----------------------------- Bill -----------------------------
      {
        path: "bill",
        name: "admin-bill",
        component: () => import("@/components/Manage_Bill/Bill.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier']
        },
      },
      {
        path: "add-bill",
        name: "add-bill",
        component: () => import("@/components/Manage_Bill/add_bill.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier']
        },
      },
      // ----------------------------- Statistic -----------------------------
      {
        path: "statistic",
        name: "admin-statistic",
        component: () => import("@/components/Statistics/Statistic.vue"),
        beforeEnter: authMiddleware,
        meta: {
          roles: ['admin', 'cashier', 'receptionist']
        },
      },
    ],
  },

  // ----------------------------- PRINT PAGE -----------------------------
  {
    path: '/printprescription/:idmedicalrecord',
    name: 'PrintPrescription',
    component: () => import("@/components/Print/PrintPrescriptionPage.vue"),
    props: true,
    beforeEnter: authMiddleware,
  },
  {
    path: '/printbill/:idbill',
    name: 'PrintBill',
    component: () => import("@/components/Print/PrintBillPage.vue"),
    props: true,
    beforeEnter: authMiddleware,
  },

  // ----------------------------- NOT FOUND -----------------------------
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/Middleware_Router/NotFound.vue"),
  },
  // ----------------------------- FORBIDDEN -----------------------------
  {
    path: "/:pathMatch(.*)*",
    name: "forbidden",
    component: () => import("@/views/Middleware_Router/403.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
