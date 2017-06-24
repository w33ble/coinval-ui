<template>
  <div class="columns">
    <div class="column is-8-widescreen is-offset-2-widescreen">
      <div class="columns is-multiline">
        <div class="column is-half" v-for="holding in holdings">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Coinbase BTC
              </p>
              <div class="card-header-icon">
                <b-dropdown @change="action" is-bottom-left>
                  <button class="button" slot="trigger">
                    <b-icon icon="angle-down"></b-icon>
                  </button>
                  <b-dropdown-option :value="holding + '|edit'">Edit</b-dropdown-option>
                  <b-dropdown-option :value="holding + '|delete'">Delete</b-dropdown-option>
                </b-dropdown>
              </div>
            </header>
            <div class="card-content">
              <div class="tile is-ancestor">
                <div class="tile is-7 co">
                  <div class="content">
                    <div class="title is-4">
                      $190,203.39
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data: () => ({
      holdings: [1, 2, 3, 4, 5],
    }),
    methods: {
      action(value) {
        const [index, action] = value.split('|');
        console.log('action', index, action);
      },
    },
  };
</script>
