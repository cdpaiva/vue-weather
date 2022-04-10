<template>
  <input
    type="text"
    class="input is-info"
    placeholder="Search by city"
    v-model="query"
    @keyup.enter="$emit('fetchWeather', query, unit)"
  />

  <div class="block has-text-centered m-2">
    <button
      @click="$emit('fetchWeather', query, unit)"
      class="button is-info"
      :disabled="!hasKey"
    >
      Search
    </button>
  </div>

  <div class="section has-text-centered">
    <h3 class="is-size-3">Choose the unit:</h3>
    <input type="radio" name="celsius" value="metric" v-model="unit" />
    <label for="celsius" class="m-3">Celsius</label>
    <input type="radio" name="farenheit" value="imperial" v-model="unit" />
    <label for="farenheit" class="m-3">Farenheit</label>
    <input type="radio" name="kelvin" value="" v-model="unit" />
    <label for="kelvin" class="m-3">Kelvin</label>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    hasKey: Boolean,
  },
  emits: ["fetchWeather"],
  data() {
    return {
      query: "",
      unit: "metric",
    }
  },
  watch: {
    // re-fetches whenever unit changes
    unit(){
      this.$emit("fetchWeather", this.query, this.unit)
    }
  },
}
</script>