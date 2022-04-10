<template>
    <div class="box has-text-centered">
        <h2 v-if="displayErrorMessage">
            Sorry, an error occurred. Please try again later.
        </h2>
        <h2 v-else>
            Sorry, city not found
        </h2>
    </div>
</template>

<script>
export default {
    name: "searchFailed",
    props: {
        displayErrorMessage: Boolean
    }
}
</script>