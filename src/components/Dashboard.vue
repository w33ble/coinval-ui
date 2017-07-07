<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8-widescreen is-offset-2-widescreen">
        <div style="margin-bottom: 10px; text-align: right;">
          <!-- action buttons at the top -->
          <button class="button" @click="fetchPrices">
            <b-icon icon="refresh" :class="{'fa-spin': refreshingPrice}"></b-icon>
            <span>Refresh</span>
          </button>

          <button class="button" @click="doAdd">
            <b-icon icon="plus"></b-icon>
            <span>Add</span>
          </button>
        </div>

        <!-- all the holdings as cards -->
        <div class="columns is-multiline" v-if="!loading">
          <div class="column is-half" v-for="holding in holdings">
            <dashboard-card :holding="holding" @edit="doEdit" @delete="doDelete"></dashboard-card>
          </div>

        </div>

        <!-- loading message -->
        <div v-if="loading">
          Loading...
        </div>

        <!-- no holdings message -->
        <div v-if="!loading && (!holdings || holdings.length < 1)">
          No holdings to show. You should add some!
        </div>

        <!-- late updated at message -->
        <div v-if="lastUpdated">Last update: {{ lastUpdated }}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import { ref } from '../lib/firebase';
  import DashboardCard from './DashboardCard.vue';

  export default {
    name: 'dashboard',
    components: { DashboardCard },
    firebase() {
      const dashboardId = this.$route.params.id;

      return {
        dashboard: {
          source: ref(`dashboards/${dashboardId}`),
          readyCallback: (dashboard) => {
            if (!dashboard.val()) {
              this.$toast.open({
                message: 'Invalid dashboard',
                type: 'is-danger',
                position: 'is-top',
              });

              this.$router.push({ name: 'create' });
            } else {
              this.loading = false;
            }
          },
        },
        holdings: ref(`holdings/${dashboardId}`),
      };
    },
    data: () => ({
      loading: true,
      refreshingPrice: false,
      lastUpdated: null,
    }),
    methods: {
      fetchPrices() {
        const unique = (value, index, self) => self.indexOf(value) === index;
        const types = this.holdings.map(h => h.cointype).filter(unique);

        this.refreshingPrice = true;
        setTimeout(() => {
          this.lastUpdated = (new Date()).toString();
          this.refreshingPrice = false;
          this.$toast.open(`Refresh prices: ${types.join(', ')}`);
        }, 300);
      },
      doAdd() {
        this.$toast.open('Create holding');
      },
      doEdit(holding) {
        this.$toast.open(`Edit ${holding.id}`);
      },
      doDelete(holding) {
        this.$toast.open(`Delete ${holding.id}`);
      },
    },
  };
</script>
