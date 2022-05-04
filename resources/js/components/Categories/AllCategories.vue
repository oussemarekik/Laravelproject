<template>
    <div>
        <h2 class="text-center">Liste des catégories</h2>
        <table class="table" id="example">
            <thead>
                <tr>
                    <th>Nom Catégorie</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in Categories" :key="cat.id">
                    <td>{{ cat.nomcategorie }}</td>

                    <td>
                        <img
                            :src="'storage/'+cat.imagecategorie"
                            :alt="cat.imagecategorie"
                            width="70"
                        />
                    </td>
                    <td>
                        <button
                            @click.prevent="deleteCategorie(cat.id)"
                            class="btn btn-danger"
                        >
                            Delete
                        </button>
                        <button
                            @click="editCategorie(cat.id)"
                            class="btn btn-success"
                        >
                            edit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
export default {
    data() {
        return {
            Categories: [],
        };
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        editCategorie(id) {
            this.$router.push({ name: "editcategorie", params: { id } });
        },
        deleteCategorie(id) {
            this.axios
                .delete(`http://localhost:8000/api/categories/${id}`)
                .then((res) => {
                    console.log(res);
                    this.getCategories();
                })
                .catch((errore) => {
                    console.log(errore);
                });
        },
        getCategories() {
            this.axios
                .get("http://localhost:8000/api/categories/")
                .then((res) => {
                    this.Categories = res.data;
                    $(function () {
                        $("#example").DataTable();
                    });
                });
        },
    },
};
</script>
