<template>
  <div class="container">
    <b-row class="vh-100" align-v="center">
      <b-col xxs="12" md="10" class="mx-auto my-auto">
        <b-card class="auth-card" no-body>
          <div class="form-side">
            <h6 class="mb-4">Ooops... looks like an error occurred!</h6>
            <p class="mb-0 text-muted text-small mb-0">Error Code</p>
            <p class="display-1 font-weight-bold mb-5">404</p>
            <b-button type="submit" variant="primary" size="lg" class="btn-shadow" @click="goBack">GO BACK HOME</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
  mounted: function () {

  },
  beforeDestroy() {

  },
};
</script>
