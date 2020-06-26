<template>
  <div id="app">
    
    <section class="hero is-info is-light">
  <div class="hero-body">
    <div class="container">
      <h1 class="title has-text-black	">
        {{$t("titulo")}}
      </h1>
      <h2 class="subtitle">
        {{$t("subtitulo")}}
      </h2>
    </div>
  </div>

  <div class="hero-foot">
    <nav class="tabs">
      <div class="container">
        <ul>
          <li><a @click="setLocale('es')">Español</a></li>
          <li><a @click="setLocale('en')">English</a></li>
          <li><a @click="setLocale('it')">Italiano</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>
<br> 

    <lista></lista>
  </div>
</template>

<script>
import Lista from './components/Lista.vue';


export default {
  name: 'App',
  components: {
    Lista
  },
  methods:{
    setLocale(locale){
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    }
  },
   created(){
 const locale = localStorage .getItem("locale")
 if(locale){
   this.$i18n.locale = locale;
 }
}
}
   
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.subtitle{
  margin-bottom:-10px;
}
.hero{
  opacity: 0.7;
  background-position: left;
  background-repeat:no-repeat;
   background-image: url(assets/croods.png);
   background-position-x: right;
   background-clip: content-box;
   background-size: contain;
  
}

</style>
