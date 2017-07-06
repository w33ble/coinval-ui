<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8-widescreen is-offset-2-widescreen">

        <div class="columns is-multiline">
          <div class="column is-half" v-for="holding in holdings">
            <dashboard-card
              :key="holding.id"
              :holding="holding"
              @edit="doEdit"
              @delete="doDelete"
            ></dashboard-card>
          </div>
        </div>

        <div v-if="!error && !loading && !holdings.length">
          No holdings found
        </div>

        <div v-if="loading">
          Loading...
        </div>

        <div v-if="error">
          Failed: {{ error }}
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import DashboardCard from './DashboardCard.vue';

  export default {
    name: 'dashboard',
    components: {
      DashboardCard,
    },
    data: () => ({
      // holdings: [],
      loading: false,
      timer: false,
      error: false,
    }),
    computed: {
      // holdings() {
      //   return this.$store.state.holdings;
      // },
      ...mapState(['holdings']),
    },
    created() {
      this.fetch().then(() => {
        this.timer = setInterval(() => this.fetch(), 15000);
      });
    },
    destroyed() {
      if (this.timer) clearInterval(this.timer);
    },
    methods: {
      ...mapActions(['updateHoldings']),
      fetch() {
        this.loading = true;
        this.error = false;

        return this.updateHoldings()
        .then(() => {
          this.loading = false;
        })
        // return getHoldings().then((holdings) => {
        //   this.loading = false;
        //   this.holdings = holdings;
        // })
        .catch((err) => {
          this.loading = false;
          this.error = err.message;
        });
      },
      doEdit(holding) {
        this.$snackbar.open(`Edit ${holding.id}`);
      },
      doDelete(holding) {
        this.$snackbar.open(`Delete ${holding.id}`);
      },
    },
  };
</script>
