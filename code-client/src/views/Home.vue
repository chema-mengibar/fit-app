<script>
export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: {},
   
  }),
  methods: {},
  created() {
    const _ = this;
    _.t = this.$services.localeService.D();
  },
  mounted() {
    document.body.style.overflow = "auto";
  },
  components: {},
};
</script>

<style  lang="scss">
@import "../styles/media";

.block-items{
  margin-top: 20px;
}

.block-item{
  margin-bottom:40px;
}

.block-item-name{
  margin-bottom: 20px;
}

.exercises{

}

.exercise-item{
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}


.exercise-status{
  width: 20px;
}

.exercise-id{
  width: 30px;
}

.exercise-name{
  flex:1;
}

.exercise-cta{
  width: 50px;
}

.salutation{
  margin-bottom: 10px;
}



</style>

<template>
  <div class="wrapper">
   
   <div class="salutation">
     <h1>Hi You!</h1>
   </div>

   <div class="block-items">

    <div class="block-item"
      v-bind:key="blocks.id"
      v-for="blocks in $services.workoutService.getBlocks()"
    >
      <div class="block-item-name"><h2>{{blocks.name}}</h2></div>
      <div class="exercises">

        <div class="exercise-item" 
            v-bind:key="execs.id"
            v-for="execs in $services.workoutService.getBlockExercises(blocks.id)">
          <div class="exercise-status"> o </div> 
          <div class="exercise-id">({{execs.id}}) </div> 
          <div class="exercise-name"> {{execs.name}} </div>
          <router-link
            
             alt="Go to menu"
            :to="{ name: 'Panel', query: { id: execs.id } }"
            class="exercise-cta"> Go >
          </router-link>
        </div>

      </div>
    </div>
    </div>

   

  </div>
</template>