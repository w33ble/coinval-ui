<template>
  <div class="modal" :class="{'is-active': open}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <form @submit="doSave">
        <header class="modal-card-head">
          <p class="modal-card-title is-4">{{title}} - Add Coin Holding</p>
        </header>

        <section class="modal-card-body">
          <b-field label="Holding Name">
            <p class="control">
              <input class="input" type="text" v-model="holdingTitle" autofocus>
            </p>
          </b-field>

          <b-field label="Coin Type">
            <b-select placeholder="Select a coin typer" v-model="cointype">
              <option value="btc">Bitcoin - BTC</option>
              <option value="ltc">Litecoin - LTC</option>
              <option value="eth">Ethereum - ETH</option>
              <option value="xmr">Monero - XMR</option>
              <option value="dash">Dash - DASH</option>
              <option value="xrp">Ripple - XRP</option>
            </b-select>
          </b-field>

          <b-field label="Amount">
            <b-input v-model="count" type="number" step=".00000001"></b-input>
          </b-field>

          <b-field label="Purchase Price">
            <b-input v-model="purchasePrice" type="number" step=".01"></b-input>
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" type="submit" :class="{'is-loading': loading}">Save changes</button>
          <a class="button" @click.prevent="doCancel">Cancel</a>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
  import { ref } from '../lib/firebase';

  export default {
    name: 'HoldingModal',
    firebase() {
      return {
        holdings: ref(`holdings/${this.$route.params.id}`),
      };
    },
    data: () => ({
      holdingTitle: '',
      cointype: '',
      count: 0,
      purchasePrice: 0,
      loading: false,
    }),
    props: {
      open: Boolean,
      holding: Object,
      mode: String,
      title: {
        type: String,
        required: true,
      },
    },
    computed: {
      formObject() {
        return {
          title: this.holdingTitle,
          cointype: this.cointype,
          count: this.count,
          purchasePrice: this.purchasePrice,
        };
      },
    },
    watch: {
      holding(val) {
        if (val) {
          this.holdingTitle = val.title;
          this.cointype = val.cointype;
          this.count = val.count;
          this.purchasePrice = val.purchasePrice;
        } else {
          this.resetForm();
        }
      },
    },
    methods: {
      doSave() {
        if (this.holding) return this.doUpdate();

        this.loading = true;
        const newKey = this.$firebaseRefs.holdings.push().key;

        return this.$firebaseRefs.holdings.child(newKey).set(this.formObject)
        .then(() => {
          this.loading = false;
          this.$emit('save');
          this.resetForm();
        });
      },
      doUpdate() {
        this.loading = true;

        return this.$firebaseRefs.holdings.child(this.holding['.key']).set({
          ...this.formObject,
          value: this.holding.value,
        })
        .then(() => {
          this.loading = false;
          this.$emit('save');
          this.resetForm();
        });
      },
      doCancel() {
        this.$emit('close');
      },
      resetForm() {
        this.holdingTitle = '';
        this.cointype = '';
        this.count = 0;
        this.purchasePrice = 0;
        this.loading = false;
      },
    },
  };
</script>
