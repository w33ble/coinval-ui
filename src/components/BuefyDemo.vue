<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Buefy Customization Basic Setup</h1>

      <div class="block">
        <b-checkbox>Basic</b-checkbox>
        <b-checkbox v-model="checkbox">{{ checkbox }}</b-checkbox>
        <b-checkbox disabled>Disabled</b-checkbox>
        <b-checkbox disabled checked>Disabled Checked</b-checkbox>
      </div>

      <div class="block">
        <b-switch type="is-secondary">Default</b-switch>
        <b-switch type="is-secondary" v-model="isSwitched">{{ isSwitched }}</b-switch>
        <b-switch type="is-secondary" disabled>Disabled</b-switch>
        <b-switch type="is-secondary" disabled checked>Disabled Checked</b-switch>
      </div>

      <b-field label="Name">
        <b-input placeholder="John Silver"></b-input>
      </b-field>

      <b-field label="Email"
          type="is-danger"
          message="This email is invalid">
          <b-input type="email"
              value="john@"
              maxlength="30">
          </b-input>
      </b-field>

      <b-field label="Username"
          type="is-success"
          message="This username is available">
          <b-input value="johnsilver" maxlength="30"></b-input>
      </b-field>

      <div class="block">
          <b-icon icon="heartbeat" type="is-primary"></b-icon>
          <b-icon icon="heartbeat" type="is-secondary" invert></b-icon>
          <b-icon icon="user" type="is-info"></b-icon>
          <b-icon icon="user" type="is-warning"></b-icon>
          <b-icon icon="user" type="is-danger"></b-icon>
          <b-icon icon="user" type="is-success"></b-icon>
      </div>

      <div class="block">
        <b-icon icon="users" type="is-white"></b-icon>
        <b-icon icon="users" type="is-black"></b-icon>
        <b-icon icon="users" type="is-light"></b-icon>
        <b-icon icon="users" type="is-dark"></b-icon>
      </div>

      <b-message title="Info with icon" type="is-info" has-icon>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
      </b-message>

      <b-message title="Danger with icon" type="is-danger" has-icon>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
      </b-message>

      <b-message title="Primary Message" type="is-primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
      </b-message>

      <b-message title="Secondary Message" type="is-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
      </b-message>

      <b-field>
        <b-select placeholder="select filter" expanded>
          <option value="open_issues">Open Issues and Pull Requests</option>
          <option value="your_issues">Your Issues</option>
          <option value="pull_requests">Your Pull Requests</option>
          <option value="everything">Everything</option>
        </b-select>

        <b-input icon="search" type="search" placeholder="Search..."></b-input>
      </b-field>

      <b-field>
        <b-input placeholder="Loading..." disabled loading></b-input>
      </b-field>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'BuefyDemo',
    data: () => ({
      checkbox: true,
      isSwitched: true,
    }),
  };
</script>

<style scoped>
  section {
    padding-bottom: 200px;
  }
</style>
