<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <span class="nav-item">
          <p class="title">
            <router-link :to="{ name: 'index' }">Coinval</router-link>
          </p>
        </span>
      </div>
      <div class="nav-right">
        <router-link
          active-class="is-active"
          class="nav-item is-tab"
          :to="{ name: 'load' }"
        >
          View
        </router-link>
        <router-link
          active-class="is-active"
          class="nav-item is-tab"
          :to="{ name: 'create' }"
        >
          Create
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'TopNavigation',
  };
</script>
