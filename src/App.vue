<template>
  <div id="app">
    <main>
      <div class="container is-fluid">
        <PromptForAPIKey v-if="!hasKey" />

        <h2 class="title has-text-centered m-3">Weather App</h2>

        <Search @fetch-weather="fetchWeather" :hasKey="hasKey" />

        <SearchFailed
          v-if="cityNotFound || displayErrorMessage"
          :displayErrorMessage="displayErrorMessage"
        />

        <Weather-display
          v-if="weather.cod == '200'"
          :city="cityName"
          :weatherType="weather.weather[0].main"
          :temperature="weather.main.temp"
          :unit="unit"
          :icon="weather.weather[0].icon"
        />
      </div>
    </main>
  </div>
</template>

<script>
import weatherService from "./weatherService";
import WeatherDisplay from "./components/WeatherDisplay.vue";
import SearchFailed from "./components/SearchFailed.vue";
import PromptForAPIKey from "./components/PromptForAPIKey.vue";
import Search from "./components/Search.vue";

export default {
  name: "App",
  components: {
    WeatherDisplay,
    SearchFailed,
    PromptForAPIKey,
    Search,
  },
  data() {
    return {
      weather: {},
      unit: "metric",
      cityNotFound: false,
      displayErrorMessage: false,
      hasKey: false,
    }
  },
  methods: {
    checkAPIKey() {
      this.hasKey = process.env.VUE_APP_API_KEY != undefined
    },
    async fetchWeather(query, unit) {
      if (!query) {
        return
      }

      this.unit = unit
      this.cityNotFound = false
      this.displayErrorMessage = false
      this.weather = {}

      await weatherService
        .get(query, unit)
        .then((res) => {
          this.weather = res.data
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.cityNotFound = true
            return
          }
          this.displayErrorMessage = true
        })
    },
  },
  computed: {
    cityName() {
      return `${this.weather.name}, ${this.weather.sys.country}`
    },
  },
  mounted() {
    this.checkAPIKey()
  },
}
</script>
