<script>
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";

export default {
  name: "Panel",
  inject: ["$services"],
  data: () => ({
    t: {},
   currentExercise: undefined
  }),
  methods: {
    onClickPlay: function (  ) {
      this.$services.workoutService.onClickPlay()  
    },
    onClickDone: function (  ) {

      this.$services.workoutService.incBlockCursor(
        {
          blockId: this.$route.query.block
        }
      )  

     this.$router.push('/')
    },
  },

  created() {

    this.t = this.$services.localeService.D();
    const exerciseId = parseInt(this.$route.query.id, 10);
    const exec = this.$services.workoutService.setExercise(exerciseId)
    
    if(exec ){
      this.currentExercise = exec
    }
  },
  computed: {
       stepButtonText: function(){
      const step = this.$services.workoutService.step;

      if( step === 1 ){ // pause mode
        return 'START'
      }
      if( step === 2 ){ // running mode
        return 'PAUSE'
      }
     
    },
  },
  components: {
    ButtonAccentBig,
  },
};
</script>

<style  lang="scss">
@import "../styles/media";

h1{
  margin-bottom:30px;
}

.time{
  font-size:54px;
  border: 1px dotted black;
  text-align: center;
  padding:10px;
}

.control-play{
  width:200px;
  background-color: rgb(250, 164, 6);
  text-align: center;
  height:40px;
  line-height: 40px;
  border-radius: 10px;
  margin: 40px 0;
  cursor:pointer;
}

.control-done{
  width:200px;
  background-color: rgb(71, 201, 121);
  text-align: center;
  height:40px;
  line-height: 40px;
  border-radius: 10px;
  margin: 40px 0;
    cursor:pointer;
}

.control-back{
  width:200px;
  background-color: rgb(160, 160, 160);
  text-align: center;
  height:40px;
  line-height: 40px;
  border-radius: 10px;
    cursor:pointer;
}

</style>

<template>
  <div class="wrapper">

    <div v-if="this.currentExercise">

      <h1>{{this.currentExercise.name}}</h1>

      <div v-if="this.currentExercise.repeat">
        <h3>{{`${this.currentExercise.repeat} x ${this.currentExercise.sets} `}}</h3>
      </div>

      <div v-else>
        <div class="time">
          {{ `${$services.workoutService.timeRemain} sec` }}         
        </div>
        <div class="control-play" @click="this.onClickPlay">{{this.stepButtonText}}</div>
      </div>

      <div class="control-done" @click="this.onClickDone">Done</div>

      <div class="control-back">
        <router-link 
        class=""  
        alt="Go to menu"
        :to="'/'"
        >
        Back
        </router-link>
      </div>
    </div>
  </div>
</template>