import LocaleService from './locale-service';
import ConfigService from './config-service';
import WorkoutService from './workout-service';

const localeService = new LocaleService();
const configService = new ConfigService(localeService);
const workoutService = new WorkoutService();

export default {
    configService,
    localeService,
    workoutService,
};


/*
import { reactive } from 'vue'

export default class ConfigService {

  constructor() {
    this._config = reactive({locale:'de'})
  }

  get config() {
    return this._config
  }

  set config( val ) {
    console.log('[SERV CONFIG] setConfig')
    this._config.locale = val;
  }

  setLocaleConfig(){
    this._config.locale = 'jp';
  }

}
*/

/*
app.provide('$services', serviceContainer )
*/

/*
<script>
export default {
  inject: ['$services'],
  data: ()=>( {
    ....
</script>

<template>
    <h2>{{this.$services.configService.config.locale}}</h2>

*/