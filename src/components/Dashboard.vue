<template>
  <section class="section">
    <HoldingModal
      v-if="!loading"
      :open="addModalOpen"
      :holding="modalHolding"
      :title="$firebaseValue(dashboard, 'title')"
      @save="() => { addModalOpen = false; fetchPrices(); }"
      @close="() => { addModalOpen = false; }"
    />

    <div class="columns">
      <div class="column is-8-widescreen is-offset-2-widescreen">

        <!-- action buttons at the top -->
        <div style="margin-bottom: 10px; text-align: right;">
          <button class="button" @click="fetchPrices">
            <b-icon icon="refresh" :class="{'fa-spin': refreshingPrice}"></b-icon>
            <span>Refresh</span>
          </button>

          <button class="button" @click="doOpenAdd">
            <b-icon icon="plus"></b-icon>
            <span>Add</span>
          </button>
        </div>

        <!--  Dashboard title -->
        <h1 class="title is-4 dashboard-title" v-if="!loading" @click="doEditTitle">
          {{ $firebaseValue(dashboard, 'title') }}
          <i class="fa fa-pencil edit" />
        </h1>

        <!-- all the holdings as cards -->
        <div class="columns is-multiline" v-if="!loading">
          <div class="column is-half" v-for="holding in holdings">
            <DashboardCard :holding="holding" @edit="doOpenEdit" @delete="doDelete"></DashboardCard>
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
  import coinPrices from '../lib/coin_prices';
  import DashboardCard from './DashboardCard.vue';
  import HoldingModal from './HoldingModal.vue';

  export default {
    name: 'Dashboard',
    components: {
      DashboardCard,
      HoldingModal,
    },
    mounted() {
      const interval = 35000; // 35 seconds
      this.fetchPrices();
      this.timer = setInterval(this.fetchPrices, interval);
    },
    destroyed() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    },
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
      timer: null,
      loading: true,
      refreshingPrice: false,
      lastUpdated: null,
      addModalOpen: false,
      modalHolding: null,
    }),
    methods: {
      fetchPrices() {
        this.refreshingPrice = true;

        return coinPrices()
        .then((prices) => {
          this.refreshingPrice = false;
          this.lastUpdated = (new Date(prices['_updated'])).toString(); // eslint-disable-line dot-notation

          const updates = this.holdings.reduce((acc, holding) => {
            const path = `${holding['.key']}/value`;
            const coinValue = Math.round(prices[holding.cointype] * holding.count * 100) / 100;

            return Object.assign(acc, {
              [path]: coinValue,
            });
          }, {});

          return this.$firebaseRefs.holdings.update(updates);
        })
        .catch((err) => {
          this.refreshingPrice = false;
          console.error(err); // eslint-disable-line no-console
        });
      },
      doOpenAdd() {
        this.modalHolding = null;
        this.addModalOpen = true;
      },
      doOpenEdit(holding) {
        this.modalHolding = holding;
        this.addModalOpen = true;
      },
      doDelete(holding) {
        this.$dialog.confirm({
          message: 'Are you sure you want to delete this holding?',
          onConfirm: () => this.$firebaseRefs.holdings.child(holding['.key']).remove(),
        });
      },
      doEditTitle() {
        this.$dialog.prompt({
          title: 'Rename Holding Dashboard',
          message: 'Enter a new dashboard name',
          inputMaxlength: 127,
          confirmText: 'Rename',
          onConfirm: val => this.$firebaseRefs.dashboard.child('title').set(val),
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .dashboard-title {
    display: inline-block;
    cursor: pointer;

    .edit {
      display: none;
    }
  }

  .dashboard-title:hover .edit {
    display: inline-block;
  }
</style>
