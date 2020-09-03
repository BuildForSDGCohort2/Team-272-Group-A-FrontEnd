<template>
    <md-card>
      <md-card-media-cover md-text-scrim>
        <md-card-media>
          <img src="../assets/digipatientt.jpg" alt="Skyscraper">
        </md-card-media>
        <md-card-area>
          <md-card-header>
            <span class="md-title">DigiPatient</span>
            <span class="md-subhead">Modern Solution for your Medical records </span>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" to="/register">Get Started</md-button>
            <!-- <md-button>Action</md-button> -->
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
</template>

<script>
export default {
  name: 'welcome',
};
</script>

<style lang="scss" scoped>
.md-card {
    object-fit: cover;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
