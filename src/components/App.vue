<template>
  <div id="app">
    <top-navigation />
    <router-view></router-view>
  </div>
</template>

<script>
  import TopNavigation from './TopNavigation.vue';

  export default {
    name: 'app',
    components: {
      TopNavigation,
    },
    data: () => ({
      checkbox: true,
      isSwitched: true,
    }),
  };
</script>

<!-- Global CSS -->
<style lang="sass">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // custom colors
  $primary: #D31996;
  $primary-invert: findColorInvert($primary);
  $secondary: #0CC19A;
  $secondary-invert: findColorInvert($secondary);
  $info: #144580;
  $black: #383434;
  $light: #F0F0F0;
  $link: $primary;
  $link-visited: $secondary;

  // custom sizing
  $tablet: 768px;
  // Responsiveness
  // 1152, 1344, and 1536 have been chosen because they are divisible by both 12 and 16
  $tablet: 768px !default
  // 1152px container + 40px
  $desktop: 1192px !default
  // 1152px container + 40
  $widescreen: 1384px !default
  // 1536px container + 40
  $fullhd: 1576px !default

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (white: ($white, $black), black: ($black, $white), light: ($light, $light-invert), dark: ($dark, $dark-invert), primary: ($primary, $primary-invert), secondary: ($secondary, $secondary-invert), info: ($info, $info-invert), success: ($success, $success-invert), warning: ($warning, $warning-invert), danger: ($danger, $danger-invert));

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  // Import font-awesome
  @import '~font-awesome/css/font-awesome.css';
</style>

<style>
  /* system fonts, medium/wordpress stack - https://css-tricks.com/snippets/css/system-font-stack */
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>
