<template>

    <div class="columns mt-6">
       
<div class="column is-6 is-offset-3 listazone">
  

     <h2 class="has-text-left is-size-6 dejanos-tu mb-3" >Escribe tu comentario</h2>
         


  <form class="" v-on:submit.prevent="agregar">

  <div class="media-content inputzone">
<div class="field is-grouped">
  <p class="control is-expanded">
        <input type="text" autocomplete="off" class="input mb-1" id="nombre" maxlength="15" required v-model="input.nombre" placeholder="Nombre Completo">
  </p>
 
     <div class="control">
   
    
      <b-rate custom-text="Rating" @change="success" :max=5 class="mt-1" v-model=input.rate></b-rate>
     
    
        </div>
        
 
</div>
  
    <div class="field">
      <p class="control">
        <textarea class="textarea" id="comentario" rows="2" placeholder="Escribe tu Comentario" v-model="input.comentario"></textarea>
      </p>
    </div>
  </div>



<button class="button envia-tu mb-6" type="onsubmit">Publicar Comentario</button>

  </form>

 <transition-group name="list" tag="p" >
  <article class="media place list-item" v-for="(item, index) in review" v-bind:key="index" v-show="item.name">
   <figure class="media-left">
      <p class="image is-32x32">
     <img src="../assets/usuario.svg" alt="">
     </p>
   </figure>
    



   <div class="media-content">
    <div class="content">
      
        <strong class="title is-6">{{item.name}}</strong> 
        <span class="ratingm" v-if="item.ratings == 5"  >Excelente &#9733; &#9733; &#9733; &#9733; &#9733;</span>
        <span class="ratingm" v-if="item.ratings == 4"  >Muy Bueno &#9733; &#9733; &#9733; &#9733;</span>
        <span class="ratingm" v-if="item.ratings == 3"  >Bueno &#9733; &#9733; &#9733;</span>
        <span class="ratingm" v-if="item.ratings == 2"  >Debe Mejorar &#9733; &#9733;</span>
        <span class="ratingm" v-if="item.ratings == 1"  >Pesimo &#9733;</span>
        <br><p class="is-size-7">Hace: {{moment(item.date).fromNow()}}</p> 
        <p class="italict"> {{item.comments}}</p>

       <a @click="addlikes(index)"><img src="../assets/corazon.svg" width="15px" alt=""></a> <span class="is-size-6" v-show="item.likes > 0">{{item.likes}} |</span> · 
      <a @click="addreply(index)">{{$t("message.responder")}}</a> 
    
     
    <transition-group name="list" tag="p">
     <article class="media reply list-item" v-for="(items, index) in item.reply" v-bind:key="index" >
       <figure class="media-left">
      <p class="image is-16x16">
     <img src="../assets/usuario.svg" alt="">
     </p>
   </figure>
        
        <div class="media-content">
          <strong>@Anonymus</strong>
         <p class="is-size-7"> {{moment(items.date2).fromNow()}}</p>
        <p class="italict">{{items.repc}}</p>  
        </div>
        
     </article></transition-group>



<transition name="fade">
     <article class="media " v-show="item.replyt == true ">
          <div class="media-content">
    <div class="field">
      <p class="control">
        <textarea class="textarea" rows="1" v-model="comentinput"></textarea>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-link is-outlined is-small" @click="addreplycomment(index)">Publicar respuesta</button>
      </p>
    </div>
  </div>
  
        </article></transition>

    </div>
    </div>
   
  </article></transition-group>
  


  </div>
</div>
</template>





<script>
let moment = require('moment')

import Vue from 'vue'
import { Table, Input } from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Table)
Vue.use(Input)


export default {
  name: 'Lista',
  data(){
      return{
        moment: moment,
        max:5,
         input:[{nombre: '', comentario:'', rate:0 }],
         review:[{name: '', ratings:0, comments: '',date:'', likes: 0, replyt:false, 
         reply:[{repc: '', date2: ''}]}],
         comentinput:''
      }
  },
  methods:{
    success() {
                this.$buefy.toast.open({
                    message: 'Gracias por tu reseña',
                    type: 'is-success'
                })
    },
    agregar(){
      var n = this.input.nombre
      var c = this.input.comentario
      var r = this.input.rate
      var day = moment();
     
     if (n && c && r){
       this.review.push({
        name : n,
        comments: c,
        ratings: r,
        date:  day,
        likes: 0,
        replyt: false,
        reply: [{repc: '', date2: ''}]
       
      })
      this.input.nombre = ''
      this.input.comentario = ''
      this.input.rating = ''
     } else{
       alert('Por favor rellene todos los campos')
     } 
},
      borrador(index) {
      var indice = this.review.index //esto me falta el borrar
      if (indice != -1)  this.libro.splice(indice, 1);
    },


    addlikes(index){
      this.review[index].likes ++  
    },
    addreply(index){
      if(this.review[index].replyt == false){
      this.review[index].replyt = true
      }else{this.review[index].replyt = false}
    },
    addreplycomment(index){   // meter un push dentro de otro objeto como seleccionar
     var day = moment();
     var rep = this.comentinput
     if (rep){
     this.review[index].reply.push({repc: rep, date2: day})
     } else{
      alert('El comentario no puede estar vacio')
     }
     this.comentinput = ''
   
    }
  }
  
  
}
</script>


<style scoped>
:root{
--colorgris:rgb(77,77,77)
}
*{font-family: 'Roboto', sans-serif;}
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300&display=swap');

.inputzone{
background-color: rgb(240, 240, 240);
padding: 30px;
border-radius: 10px;
}
.ratingm{
  margin-left: 170px;
}
.input{
  display: flex;
  max-width: 300px;
}
.field.is-grouped{
  float: left;
}


input::placeholder, textarea::placeholder{
  color:var(--colorgris);
  font-size: 0.9rem;
}

textarea::placeholder{
  font-style: italic;
}
.envia-tu, .envia-tu:hover, .envia-tu:active, .envia-tu:focus {
  display:block;
  margin-top: -15px;
  margin-bottom: 5px;
  margin-left: 31px;
  background-color: rgb(77, 77, 77);
  color: white;
}

.dejanos-tu{
  margin-left: 31px;
}
.place{
  text-align: left;
  padding-bottom: 0.5em;

}
.column{
  font-size: 0.8rem;
}
.media + .media{
  margin-top: 0;
  margin-bottom: 0;
  color:var(--colorgris);
  border-top: 1.5px solid rgba(77, 77, 77,0.5);
}
article.media.reply.list-item {
border-top: white;
}

.italict{
font-style: italic;
}

.reply:first-of-type{
  display:none;
}

/* .Animacion postcoment */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to  {
  opacity: 0
}
/* Animacion de las listas */
.list-item {
  margin-bottom: 1px;
}
.list-enter-active, .list-leave-active {
  transition: all 1.5s;
}
.list-enter, .list-leave-to  {
  opacity: 0;
  transform: translatex(300px);
}
</style>
  