<template>
  <div class="box has-text-centered">
    <div class="is-primary">
      <img v-bind:src="getIcon()" alt="Weather Icon" />
      <div class="is-size-3">{{ city }}</div>
      <div>
        {{ dateBuilder() }}
      </div>
    </div>
    <div>
      <div class="is-size-2">{{ temperatureWithUnit() }}</div>
      <div>{{ weatherType }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weatherDisplay",
  props: {
    city: String,
    weatherType: String,
    temperature: Number,
    unit: String,
    icon: String,
  },
  methods: {
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
      return require(`../assets/${mapToIcon[this.icon]}`);
    },
    temperatureWithUnit() {
      const mapToUnits = {
        metric: "°C",
        imperial: "°F",
        "": "K",
      };
      return `${this.temperature.toFixed(1)} ${mapToUnits[this.unit]}`;
    },
  },
};
</script>