<template>
 <div>
 
 <h2 class="text-center">Liste des sous catégories</h2>
 
 <table class="table" id="example">
 <thead>
 <tr>
 <th>Nom Sous catégorie</th> 
 <th>Image</th> 
 <th>Catégorie</th> 
 <th>Actions Delete</th>
  <th>Actions Modifier</th>

 </tr>
 </thead>
 <tbody>
 <tr v-for="scat in Scategories" :key="scat.id">
 <td>{{scat.nomscategorie}}</td> 
 <td><img :src="'../storage/images/'+scat.imagescat" 
:alt=scat.nomscategorie width="100"></td>
 <td>{{scat.categories.nomcategorie}}</td> 
 <td>
                    <button
                            @click="editSousCategorie(scat.id)"
                            class="btn btn-success"
                        >
                            edit
                        </button>
                        </td>
                        <td>
 <button @click.prevent="deleteScategorie(scat.id)" class="btn btn-danger">Supprimer</button>

 </td>

 </tr>
 </tbody>
 </table>
 </div>
</template>
 
<script>
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'jquery/dist/jquery.min.js'; 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
 export default { 
 data() { 
 return { 
 Scategories: [], 
 Categ:[] 
 
 } 
 }, 
 mounted() { 
 this.getScategories(); 
 
 }, 
 methods: { 
      editSousCategorie(id) {
          console.log(id);
            this.$router.push( {name:"editsouscategorie",params:{id}});
        },
 deleteScategorie(id) { 
 if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) { 
 this.axios 
 .delete(`http://localhost:8000/api/scategories/${id}`) 
 .then(res => { 
 console.log(res) 
 this.getScategories(); 
 }) 
 .catch(error => { 
 console.log(error) 
 }); 
 } 
 }, 
 getScategories(){ 
 this.axios 
 .get('http://localhost:8000/api/scategories') 
 .then(res => { 
 this.Scategories= res.data; 
 console.log(this.Scategories) 
 $(function() {$('#example').DataTable();}); 
 }); 
 
 } 
 } 
 } 
</script>