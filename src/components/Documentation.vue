<template>
  <b-container fluid>
    <!--Nav group-->
    <b-navbar toggleable="md" type="dark" variant="pttblue">
      <b-navbar-nav class="mx-auto">
        <b-navbar-brand tag="h1" class="mb-0 mx-auto" :to="{name: 'SoundList'}">Sounds of PTT</b-navbar-brand>
      </b-navbar-nav>
      <!--collapsiable nav part-->
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name: 'Documentation'}" right>Documentation</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script>
export default {
  name: 'DocumentationView'
}
</script>
