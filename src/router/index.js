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
      {
        path: "/product/:id",
        name: "product",
        component: () => import("@/views/Product.vue"),
        props: true,
      },

      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/Login.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/Auth/SignUp.vue"),
      },
      {
        path: "/cart",
        name: "cart", //name: "cart/:id",
        component: () => import("@/views/Cart.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/layouts/Admin.vue"),
    children: [
      {
        path: "",
        name: "welcome",
        component: () => import("@/views/Admin/Welcome.vue"),
      },
      {
        path: "staff",
        name: "admin-staff",
        component: () => import("@/views/Admin/Manage_Staff/Staff.vue"),
      },
      {
        path: "add-staff",
        name: "add-staff",
        component: () => import("@/views/Admin/Manage_Staff/add_staff.vue"),
      },
      {
        path: "edit-staff/:id",
        name: "edit-staff",
        component: () => import("@/views/Admin/Manage_Staff/edit_staff.vue"),
        props: true, 
      },
      {
        path: "product",
        name: "admin-product",
        component: () => import("@/views/Admin/Manage_Products/Product.vue"),
      },
      {
        path: "add-product",
        name: "add-product",
        component: () => import("@/views/Admin/Manage_Products/add_product.vue"),
      },
      {
        path: "edit-product/:id",
        name: "edit-product",
        component: () => import("@/views/Admin/Manage_Products/edit_product.vue"),
        props: true, 
      },
      {
        path: "order",
        name: "admin-order",
        component: () => import("@/views/Admin/Manage_Orders/Orders.vue"),
      },
    ],
  },
 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
