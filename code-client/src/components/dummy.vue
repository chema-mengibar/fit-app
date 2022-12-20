<script>
import IconBase from './icons/icon-base.vue'

export default {
  inject: ['$services'],
  name: 'Dummy',
  props: {
    puzzleData: { type: String, default: null},
  },
  data: ()=>( {
    t: {}
  }),
  created(){
    this.t = this.$services.localeService.D()
  },
  methods: {
    dummy: function(){
      const _ = this ;
    },
    
  },
  components: {
    IconBase,
  },
}
</script>

<style lang="scss">

@import '../styles/media';

.dummy{
  @include desktop {
    //
  }
}


</style>

<template>
<div class="dummy" :data-cy="$options.name"></div>
  
</template>