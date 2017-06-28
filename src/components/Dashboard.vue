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

        <div v-if="!loading && !holdings.length">
          No holdings found
        </div>

        <div v-if="loading">
          Loading...
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import { getHoldings } from '../lib/holdings';
  import DashboardCard from './DashboardCard.vue';

  export default {
    name: 'dashboard',
    components: { DashboardCard },
    data: () => ({
      holdings: [],
      loading: true,
      timer: false,
    }),
    created() {
      this.fetch().then(() => {
        this.timer = setInterval(() => this.fetch(), 5000);
      });
    },
    destroyed() {
      if (this.timer) clearInterval(this.timer);
    },
    methods: {
      fetch() {
        this.loading = true;

        return getHoldings().then((holdings) => {
          this.loading = false;
          this.holdings = holdings;
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
