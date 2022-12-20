
<script>

  export default {
    inject: ['$services'],
    name: 'ButtonAccentBig',
    props: {
      labelKey: { type: String, default: ''},
      label: { type: String, default: ''},
      ctaCallback: { type: Function },
    },
      data: ()=>( {
  }),
   created(){
    this.t = this.$services.localeService.D()
  },
  }
</script>

<style lang="scss">

  .ButtonAccentBig{
    width:100%;
    height:30px;
    max-width:120px;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 14px;
    background-color:var(--button-color-rgb);
    color: var(--button-text-color-rgb);
    font-family: var(--font-copy);
    font-size: 12px;
    
    @media (min-width: 780px) {
      height:30px;
      font-size: 12px;
    }
  }


</style>

<template>
  <button :class="$options.name" alt="main call action"  @click="ctaCallback()">
   
    <template v-if="label">
      {{label}}
    </template>
    <template v-else>
      {{t[labelKey]}}
    </template>

  </button>
</template>