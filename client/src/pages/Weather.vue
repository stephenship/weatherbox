<template>
  <div class="container">
    <div class="sticky-top mb-3 ml-3">
      <div class="alert alert-danger fade show" role="alert" v-if="error">
        {{error}}
      </div>
      <div class="text-left">
        <button type="button" class="btn btn-lg btn-outline-secondary px-1 py-0" @click="showModal = true">
          <i class="fa fa-plus-square fa-3x"></i>
        </button>
        <div class="d-inline ml-3" v-if="weatherData === undefined || weatherData.length == 0">
          <strong>
            Click to begin...
          </strong>
        </div>
      </div>
      <!--<div class="col-9 col-sm-11 col-md-11 col-lg-11 col-xl-11" >
        
      </div>-->
    </div>
    <div class="row justify-content-start">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="weather in weatherData" :key="weather.city">
          <WeatherCard :city="weather.city" :time="weather.time" :temperature="weather.temperature" @saved="getWeatherData"/>
      </div>
    </div>
    <WeatherModal :show="showModal" @close="showModal = false" @saved="getWeatherData"/>
  </div>
</template>
<script>
import WeatherCard from '../components/WeatherCard';
import WeatherModal from '../components/WeatherModal';

export default {
  name: 'weather',
  components: {
    WeatherCard,
    WeatherModal,
  },
  data() {
    return {
      weatherData: [],
      showModal: false,
      error: ''
    }
  },
  methods: {
    getWeatherData: function() {
      this.error = '';
      this.showModal = false;
      this
      .$http
      .get('/api/weather')
      .then((response) => {
          // weather data returned from system
          this.weatherData = response.data.result;
      })
      .catch((err) => {
          this.error = err;
      });
    },
  },
  mounted() {
    this.getWeatherData();
  }
};
</script>
<style>
</style>
