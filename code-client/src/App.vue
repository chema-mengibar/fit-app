<script>
export default {
  inject: ['$services'],
  data: ()=>( {
      t: {},
  }),
  created(){
    this.t = this.$services.localeService.D();
  },
  computed() {

  },
  components: {

  },
}

</script>

<style lang="scss">
 
@import "./App.scss";

</style>

<template>

    <router-view />

</template>