<template>
  <div class="container">
    <div class="alert alert-danger fade show" role="alert" v-if="error">
        {{error}}
      </div>
    <div class="card shadow-sm rounded mb-4">
      <div class="card-header text-right">
        <button type="button" class="btn btn-secondary fa fa-pencil px-1 py-1 mr-1" @click="modify=true" v-show="!modify"/>
        <button type="button" class="btn btn-secondary fa fa-floppy-o px-1 py-1 mr-1" @click="modifyWeather" v-show="modify"/>
        <button type="button" class="btn btn-secondary fa fa-trash px-1 py-1" @click="deleteWeather"/>
      </div>
      <div class="card-body">
        <h1 class="display-4" v-show="!modify">
          {{temperature ? temperature : '00'}}&#176;C
        </h1>
        <h1 class="display-4" v-show="modify">
          <input type="number" step="0.1" placeholder="Temp (eg. 20)" style="width: 3.2em" v-model.number="temperature"/>
        </h1>
      </div>
      <div class="card-footer">
        <h2 class="font-weight-normal">
          {{city}}
        </h2>
        <p class="card-text font-weight-normal" v-show="!modify">
          {{time ? time : '00:00'}}
        </p>
        <p class="card-text font-weight-normal" v-show="modify">
          <input type="time" placeholder="Time (eg. 19:15)" v-model="time"/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "weather-card",
  data() {
    return {
      error: '',
      modify: false,
    }
  },
  props: {
    city: {
      type: String,
      description: "City"
    },
    time: {
      type: [Date, String],
      description: "Time"
    },
    temperature: {
      type: Number,
      description: "Celcius"
    },
  },
  methods: {
    modifyWeather: function() {
      this.error = '';

      let body = {
        city: this.city,
        time: this.$moment('2020-01-01 ' + this.time).format(),
        temperature: this.temperature.toFixed(1)
      };

      this
      .$http
      .post('/api/weather', body)
      .then((response) => {
          // change the weather
        if(response.data.status) {
          this.modify = false;
          this.$emit('saved');
        } else {
          this.error = response.data.error;
        }
      })
      .catch((err) => {
        this.error = err;
      });
    },
    deleteWeather: function() {
      this.error = '';

      this
      .$http
      .delete('/api/weather/' + this.city)
      .then((response) => {
          // wipe city weather
        if (response.data.status) {
          this.$emit("saved");
        } else {
          this.error = response.data.error;
        }
      })
      .catch((err) => {
        this.error = err;
      });
    }
  },
};
</script>
<style scoped>
</style> 