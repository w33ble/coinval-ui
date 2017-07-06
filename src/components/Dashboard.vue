<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8-widescreen is-offset-2-widescreen">
        <div class="columns is-multiline" v-if="!loading">
          <div class="column is-half" v-for="holding in holdings">
            <dashboard-card :holding="holding" @edit="doEdit" @delete="doDelete"></dashboard-card>
          </div>

        </div>

        <div v-if="loading">
          Loading...
        </div>

        <div v-if="!loading && (!holdings || holdings.length < 1)">
          No holdings to show. You should add some!
        </div>
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
              this.$snackbar.open({
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
        holdings: {
          source: ref(`holdings/${dashboardId}`),
        },
      };
    },
    data: () => ({
      loading: true,
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
