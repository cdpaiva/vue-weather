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

        <div class="box has-text-centered" v-if="weather.cod=='404'">
          <h2>Sorry, city not found</h2>
        </div>
        <div class="box has-text-centered" v-if="weather.cod=='200'">
          <div class="is-primary">
            <img v-bind:src="getIcon()" alt="Weather Icon" />
            <div class="is-size-3">{{ cityName }}</div>
            <div>
              {{ dateBuilder() }}
            </div>
          </div>
          <div>
            <div class="is-size-2">{{ temperatureWithUnit() }}</div>
            <div>{{ weather.weather[0].main }}</div>
          </div>
        </div>
        
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      apiKey: "6591c384ed91f3bdafb834bc7542e47a",
      urlBase: "http://api.openweathermap.org/data/2.5/",
      urlIcon: "http://openweathermap.org/img/wn/",
      query: "",
      weather: {},
      unit: "metric",
    };
  },
  methods: {
    async fetchWeather() {
      const url = `${this.urlBase}weather?q=${this.query}&units=${this.unit}&appid=${this.apiKey}`;
      this.weather = await (await fetch(url)).json();
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
    temperatureWithUnit() {
      const mapToUnits = {
        metric: "°C",
        imperial: "°F",
        "": "K",
      };
      return `${this.weather.main.temp.toFixed(1)} ${mapToUnits[this.unit]}`;
    },
    getIcon() {
      const mapToIcon = {
        "01d": "sun--v1.png",
        "02d": "partly-cloudy-day--v1.png",
        "03d": "partly-cloudy-day--v1.png",
        "04d": "partly-cloudy-day--v1.png",
        "09d": "rain.png",
        "10d": "rain.png",
        "11d": "storm--v1.png",
        "13d": "snow.png",
        "50d": "windy-weather.png",
        "01n": "full-moon.png",
        "02n": "partly-cloudy-night.png",
        "03n": "partly-cloudy-night.png",
        "04n": "partly-cloudy-night.png",
        "09n": "rain.png",
        "10n": "rain.png",
        "11n": "storm--v1.png",
        "13n": "snow.png",
        "50n": "windy-weather.png",
      };
      console.log(mapToIcon[this.weather.weather[0].icon]);
      return require(`./assets/${mapToIcon[this.weather.weather[0].icon]}`);
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

<style></style>
