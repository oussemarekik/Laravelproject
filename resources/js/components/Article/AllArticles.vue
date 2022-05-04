<template>
<router-link :to="{name: 'carte'}" style="color: #e1f52f;text-decoration:none"> <img alt="" width="50" src="https://lausannefoxes.ch/wp-content/uploads/2021/06/shopping-cart-icon-400x400.png">
{{CartLength}}  </router-link>
    <div>
    <h2 class="text-center">Liste des Articles </h2>
    <table class="table" id="example">
    <thead>
    <tr>
    <th>Référence</th> 
    <th>Désignation</th> 
    <th>Marque</th> 
    <th>Prix Achat</th>
    <th>Prix Vente</th> 
    <th>Quantité</th> 
    <th>Catégorie</th> 
    <th>Sous Catégorie</th>
    <th>Image</th> 
    <th>Images</th> 
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="p in Articles" :key="p.id">
    <td>{{p.reference}}</td> 
    <td>{{p.designation}}</td> 
    <td>{{p.marque}}</td> 
    <td>{{p.prixAchat}}</td>
    <td>{{p.prixVente}}</td>
    <td>{{p.qtestock}}</td>
    <td>{{p.categories.nomcategorie}}</td>
    <td>{{p.scategories.nomscategorie}}</td>
    <td><img :src="'storage/images/'+p.imageartpetitf" :alt=p.imageartpetitf width="100"></td>
    <td><div v-for="pg in JSON.parse(p.imageartgrandf)" :key="pg"><img :src="'storage/images/'+pg" :alt=pg width="70"></div></td>

    <td>
        <router-link :to="{name: 'editArticle', params: { id: p.id }}" class="btn btn-success">Modifier</router-link>

    <button @click.prevent="deleteArticle(p.id)" class="btn btn-danger">Supprimer</button>
    <button class="btn btn-warning" @click="addToCart(p.id)" v-if="p.qtestock>1">Add to Cart</button></td>
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
    Articles: [], 
    CartLength:0,
    source:{}

    } 
    }, 
    mounted() { 
    this.getArticles();
    if (localStorage.getItem("cart")) {
        console.log(localStorage.getItem("cart"));
     this.CartLength=JSON.parse(localStorage.getItem("cart")).length; 
    }
    }, 
    methods: { 
                     addToCart(itemId) {
                    const item = this.Articles.find(({ id }) => id === itemId);
                    if (!localStorage.getItem("cart")) {
                        localStorage.setItem("cart", JSON.stringify([]));
                    }
                    const cartItems = JSON.parse(localStorage.getItem("cart"));
                    let index=this.checkProduct(itemId)
                    if(index == -1) {
                        this.source = { quantite : 1 }
                        /*
                        La méthode Object.assign() est utilisée afin de copier les valeurs de toutes les propriétés directes (non héritées)
                        d'un objet qui sont énumérables sur un autre objet cible. Cette méthode renvoie l'objet cible.
                        */
                        const returnedTarget = Object.assign(item, this.source);
                        cartItems.push(returnedTarget);
                    }
                    else 
                    {
                        const itemC = cartItems.find(({ id }) => id === itemId);
                        this.source = { quantite : eval(itemC.quantite+1) };
                        const returnedTarget = Object.assign(itemC, this.source);
                        cartItems.splice(index,1,returnedTarget)
                    }  
                    
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    this.CartLength=JSON.parse(localStorage.getItem("cart")).length; 
                  },
             checkProduct(itemId){
                 const index = JSON.parse(localStorage.getItem("cart")).map((e)=> {return e.id }).indexOf(itemId);
                 return index;
             } ,    

    deleteArticle(id) { 
    if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) { 
    this.axios 
    .delete(`http://localhost:8000/api/articles/${id}`) 
    .then(res => { 
    console.log(res) 
    this.getArticles(); 
    }) 
    .catch(error => { 
    console.log(error) 
    }); 
    } 
    }, 
    getArticles(){ 
    this.axios 
    .get('http://localhost:8000/api/articles/') 
    .then(response => { 
    this.Articles = response.data; 
    $(function() {$('#example').DataTable();}); 
    }); 
    } 
    } 
} 
</script>
