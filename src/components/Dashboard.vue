<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8-widescreen is-offset-2-widescreen">
        <div class="columns is-multiline">

          <div class="column is-half" v-for="holding in holdings">
            <dashboard-card :holding="holding" @edit="doEdit" @delete="doDelete"></dashboard-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DashboardCard from './DashboardCard.vue';

  export default {
    name: 'dashboard',
    components: { DashboardCard },
    data: () => ({
      holdings: [{
        id: 1,
        name: 'Coinbase Wallet',
        cointype: 'eth',
        count: 1.2475,
        value: 313.34,
      }, {
        id: 2,
        name: 'Coinbase',
        cointype: 'ltc',
        count: 0.3188,
        value: 11.97,
      }, {
        id: 3,
        name: 'Exodus',
        cointype: 'btc',
        count: 0.013764,
        value: 33.57,
      }],
    }),
    methods: {
      doEdit(holding) {
        this.$snackbar.open(`Edit ${holding.id}`);
      },
      doDelete(holding) {
        this.$snackbar.open(`Delete ${holding.id}`);
      },
    },
  };
</script>
