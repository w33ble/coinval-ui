<template>
  <section class="section">
    <div class="content columns">
      <div class="column is-half is-offset-3">
        <h1 class="title">Create dashboard</h1>

        <section class="content">
          <form @submit="create">
            <div class="block">
              <b-field
                label="Dashboard Name"
                :type="errors.title ? 'is-danger' : 'is-primary'"
                :message="errors.title"
              >
                <b-input placeholder="My Ducats" v-model="title"></b-input>
              </b-field>
            </div>
            <div class="block" v-if="allowPrivate">
              <b-switch v-model="isPrivate">Private Dashboard</b-switch>
            </div>
            <div class="block" v-if="allowPrivate">
              <b-field
                label="Enter PIN"
                v-if="isPrivate" :type="errors.pin ? 'is-danger' : ''"
                :message="errors.pin"
              >
                <b-input minlength="4" maxlength="4" placeholder="PIN Number" v-model="pin"></b-input>
              </b-field>
            </div>
            <div class="block">
              <button class="button is-primary" :class="{ 'is-loading': loading }">Create</button>
            </div>
          </form>
        </section>

      </div>
    </div>
  </section>
</template>

<script>
  import { ref } from '../lib/firebase';
  import guid from '../lib/guid';

  export default {
    name: 'CreateDashboard',
    data: () => ({
      title: '',
      isPrivate: false,
      allowPrivate: false,
      pin: '',
      loading: false,
      errors: {
        title: null,
        pin: null,
      },
    }),
    methods: {
      create() {
        this.errors.title = null;
        this.errors.pin = null;

        if (this.title.length === 0) this.errors.title = 'You must provide a name for the dashboard';
        if (this.isPrivate && this.pin.length !== 4) this.errors.pin = 'You must provide a 4 digit PIN';
        if (this.errors.title || this.errors.pin) return;

        this.loading = true;

        function createNewDashboard() {
          const id = guid();
          const dbRef = ref(`/dashboards/${id}`);

          return dbRef.once('value').then((snap) => {
            if (!snap.val() || snap.val().coins.length === 0) return [id, dbRef];
            return createNewDashboard();
          });
        }

        createNewDashboard()
        .then(([id, dbRef]) => {
          dbRef.set({
            title: this.title,
            isPrivate: false,
            timestamp: (new Date()).getTime(),
          })
          .then(() => {
            this.$router.push({
              name: 'view',
              params: { id },
            });
          });
        });
      },
    },
  };
</script>
