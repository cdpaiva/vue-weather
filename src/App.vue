<template>
  <div id="app">
    <main>
      <div class="container">
        <h2 class="title has-text-centered m-5">Weather App</h2>

        <input
          type="text"
          class="input is-info"
          placeholder="Search by city"
          v-model="query"
          @keyup.enter="fetchWeather"
        />

        <div class="block has-text-centered m-3">
          <button @click="fetchWeather" class="button is-info">Search</button>
        </div>

        <div class="section has-text-centered">
          <h3 class="is-size-3">Choose the unit:</h3>
          <input type="radio" name="celsius" value="metric" v-model="unit" />
          <label for="celsius" class="m-3">Celsius</label>
          <input
            type="radio"
            name="farenheit"
            value="imperial"
            v-model="unit"
          />
          <label for="farenheit" class="m-3">Farenheit</label>
          <input type="radio" name="kelvin" value="" v-model="unit" />
          <label for="kelvin" class="m-3">Kelvin</label>
        </div>

        <searchFailed
          v-if="cityNotFound || displayErrorMessage"
          :displayErrorMessage="displayErrorMessage"
        >
        </searchFailed>

        <weather-display
          v-if="weather.cod == '200'"
          :city="cityName"
          :weatherType="weather.weather[0].main"
          :temperature="weather.main.temp"
          :unit="unit"
          :icon="weather.weather[0].icon"
        >
        </weather-display>
      </div>
    </main>
  </div>
</template>

<script>
import weatherService from "./weatherService";
import weatherDisplay from "./components/weatherDisplay.vue";
import searchFailed from "./components/searchFailed.vue";

export default {
  name: "App",
  components: {
    weatherDisplay,
    searchFailed,
  },
  data() {
    return {
      query: "",
      weather: {},
      unit: "metric",
      cityNotFound: false,
      displayErrorMessage: false,
    };
  },
  methods: {
    async fetchWeather() {
      this.cityNotFound = false;
      this.displayErrorMessage = false;
      this.weather = {};

      await weatherService
        .get(this.query, this.unit)
        .then((res) => {
          this.weather = res.data;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.cityNotFound = true;
            return;
          }
          this.displayErrorMessage = true;
        });
    },
  },
  computed: {
    cityName() {
      return `${this.weather.name}, ${this.weather.sys.country}`;
    },
  },
  watch: {
    // re-fetch whenever unit changes
    unit: "fetchWeather",
  },
};
</script>
