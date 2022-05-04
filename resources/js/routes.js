import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import AllCategories from "./components/Categories/AllCategories";
import AddCategorie from "./components/Categories/AddCategorie";
import EditCategorie from "./components/Categories/EditCategorie";
import AllSouscategories from "./components/Souscategories/AllSousCategories";
import AddSousCategorie from "./components/Souscategories/AddSousCategorie";
import EditSousCategorie from "./components/Souscategories/EditSousCategorie";
import AllArticles from "./components/Article/AllArticles";
import AddArticles from "./components/Article/AddArticles";
import EditArticle from "./components/Article/EditArticle";
import Register from "./components/Authentification/Register.vue";
import Login from "./components/Authentification/Login";
import Profile from "./components/Authentification/Profile";
import Logout from "./components/Authentification/Logout.vue";
import Carte from "./components/Article/Carte";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/carte",
        name: "carte",
        component: Carte,
    },
    { path: "/profile", name: "profile", component: Profile },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        name: "logout",
        path: "/logout",
        component: Logout,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/articles",
        name: "articles",
        component: AllArticles,
    },
    {
        path: "/addArticle",
        name: "addArticle",
        component: AddArticles,
    },
    {
        path: "/editArticle",
        name: "editArticle",
        component: EditArticle,
    },
    {
        path: "/addscategorie",
        name: "addsouscategorie",
        component: AddSousCategorie,
    },
    {
        path: "/editsouscategorie",
        name: "editsouscategorie",
        component: EditSousCategorie,
    },
    {
        path: "/scategories",
        name: "souscategorie",
        component: AllSouscategories,
    },
    {
        path: "/categories",
        name: "categories",
        component: AllCategories,
    },
    {
        path: "/addCategorie",
        name: "addCategorie",
        component: AddCategorie,
    },
    {
        path: "/editcategorie",
        name: "editcategorie",
        component: EditCategorie,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
