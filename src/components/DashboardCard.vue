<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ holding.title }} ({{ cointype }})
      </p>
      <div class="card-header-icon">
        <b-dropdown @change="emitAction" is-bottom-left>
          <button class="button" slot="trigger">
            <b-icon icon="angle-down"></b-icon>
          </button>
          <b-dropdown-option value="edit">Edit</b-dropdown-option>
          <b-dropdown-option value="delete">Delete</b-dropdown-option>
        </b-dropdown>
      </div>
    </header>
    <div class="card-content">
      <div class="tile is-ancestor">
        <div class="tile is-7 co">
          <div class="content">
            <div class="title is-4">
              ${{ holding.value }}
            </div>
            <div>
              {{ holding.count }} Coins
            </div>
          </div>
        </div>
        <div class="tile is-vertical">
          <div class="tile">
            <div class="content">
              Gain/Loss
            </div>
          </div>
          <div class="tile">
            <div class="content">
              Purchase Price
            </div>
          </div>
          <div class="tile">
            <div class="content">
              Purchase Date
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-card',
    props: {
      holding: Object,
    },
    methods: {
      emitAction(action) {
        this.$emit(action, this.holding);
      },
    },
    computed: {
      cointype() {
        return this.holding.cointype.toUpperCase();
      },
    },
  };
</script>
