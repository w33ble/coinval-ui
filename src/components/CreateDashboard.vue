<template>
  <div class="content columns">
    <div class="column is-half is-offset-3">
      <h1 class="title">Create dashboard</h1>

      <section class="content">
        <form @submit="create">
          <div class="block">
            <b-field label="Dashboard Name" :type="errors.title ? 'is-danger' : 'is-primary'" :message="errors.title">
              <b-input placeholder="My Ducats" v-model="title"></b-input>
            </b-field>
          </div>
          <div class="block">
            <b-switch v-model="isPrivate">Private Dashboard</b-switch>
          </div>
          <div class="block">
            <b-field label="Enter PIN" v-if="isPrivate" :type="errors.pin ? 'is-danger' : ''" :message="errors.pin">
              <b-input minlength="4" maxlength="4" placeholder="PIN Number" v-model="pin"></b-input>
            </b-field>
          </div>
          <div class="block">
            <button class="button is-primary">Create</button>
          </div>
        </form>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: 'create-dashboard',
  data: () => ({
    title: '',
    isPrivate: false,
    pin: '',
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

      // TODO: create dashboard
      console.log(`Create: ${this.title}`);
      if (this.isPrivate) console.log(`With PIN: ${this.pin}`);
    },
  },
};
</script>
