<template>
  <section class="section">
    <div class="content columns">
      <div class="column is-half is-offset-3">
        <p>To load your coin dashboard, enter your Dashboard ID below.</p>

        <p>If you would like to create a new dashboard, click Create at the top.</p>

        <form @submit.prevent="loadDashboard">
          <b-field
            :type="error ? 'is-danger' : ''"
            :message="error"
          >
            <b-input
              placeholder="Dashboard ID"
              v-model="dashboardId"
              maxlength="12"
            />
          </b-field>

          <b-field>
            <button class="button is-primary">Load Dashboard</button>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'IndexPrompt',
    data: () => ({
      dashboardId: '',
      error: null,
    }),
    methods: {
      loadDashboard() {
        if (!this.dashboardId) this.error = 'Invalid dashboard ID';
        else {
          // TODO: load the dashboard
          this.$router.push({
            name: 'view',
            params: { id: this.dashboardId },
          });
          this.dashboardId = '';
          this.error = null;
        }
      },
    },
  };
</script>
