<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Digi-Patient</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home" href='#'></md-tab>
            <md-tab id="tab-services" md-label="Services" href="#"></md-tab>
            <md-tab id="tab-pricing" md-label="Pricing" href="#"></md-tab>
            <md-tab id="tab-about-us" md-label="About Us" href="#"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><md-button to="/login">Login</md-button></span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text"><md-button to="/register">Sign Up</md-button></span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <Register/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
import Register from '@/components/Register.vue';

export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false,
  }),
  components: {
    Register,
  },
  computed: {
    pageUrl() {
      return window.location.href;
    },
  },
};
</script>
