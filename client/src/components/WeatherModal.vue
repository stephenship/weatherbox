<template>
  <modal :show.sync="show">
    <div class="container">
      <div class="alert alert-danger fade show" role="alert" v-if="error">
        {{error}}
      </div>
      <div class="card shadow-sm rounded mb-4">
        <div class="card-header text-right">
          <button type="button" class="btn btn-secondary fa fa-floppy-o px-1 py-1 mr-1" @click="addWeather"/>
          <button type="button" class="btn btn-secondary fa fa-times px-1 py-1" @click="$emit('close')"/>
        </div>
        <div class="card-body">
            <h1 class="display-4">
              <input type="number" step="0.1" placeholder="Temp (eg. 20)" style="width: 7em" v-model.number="entry.temperature"/>
            </h1>
          </div>
        <div class="card-footer">
          <h2 class="font-weight-normal">
            <input type="text" placeholder="City (eg. Banff)" v-model="entry.city"/>
          </h2>
          <p class="card-text font-weight-normal">
            <input type="time" placeholder="Time (eg. 19:15)" v-model="entry.time"/>
          </p>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from '../contrib/Modal';

export default {
  name: 'weather-modal',
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      description: 'Show'
    }
  },
  data() {
    return {
      entry: {
        city: '',
        time: '',
        temperature: ''
      },
      error: ''
    }
  },
  methods: {
    addWeather: function() {
      this.error = ''; // no errors

      let body = {
        city: this.entry.city,
        time: this.$moment('2020-01-01 ' + this.entry.time).format(),
        temperature: this.entry.temperature.toFixed(1)
      };

      this
      .$http
      .post('/api/weather', body)
      .then((response) => {
        if(response.data.status) {
          this.$emit('saved');
        }
        else {
          this.error = response.data.error;
        }
      })
      .catch(() => {
        this.error = 'Something terrible happened...';
      });
    },
  },
  
}
</script>
<style scoped>
</style>