<!-- TODO: put this component inside the article component -->
<!-- Html -->
<template>
  <div>
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
    <b-card :title="'['+soundInfo.genre+'] '+soundInfo.title"
            :sub-title="soundInfo.author"
            bg-variant="dark"
            text-variant="white"
            class="w-50 mx-auto mt-2">
        <p class="card-text">{{soundInfo.created_dt}}</p>
        <p class="card-text">{{soundInfo.state}}</p>
        <p><audio :src="soundInfo.wave_file_url" controls="controls">
          Your browser does not support the html5 audio element.
        </audio></p>
        <a :href="soundInfo.crawl_url"
           class="card-link">Sheet</a>
        <router-link class="card-link" :to="{name: 'SoundList'}">
          <a>Return</a>
        </router-link>
    </b-card>
    <!-- TODO: Result Analysis-->
  </div>
</template>

<!--JS-->
<script>
/* eslint-disable */
  // new Vue()
  export default{
    props: ['id'],
    name: 'SoundDetailView',
    data() {
      return {
        soundInfo: {}
      }
    },
    created() {
      this.getSoundInfo();
    },
    methods: {
      api(endpoint, method, data) {
        // use specified method, otherwise use GET
        // if data is not undefined(GET), put json stringified data in the body
        var config = {
          method: method || 'GET',
          body: data !== undefined ? JSON.stringify(data) : null,
          headers: {
            'content-type': 'application/json'
          }
        }

        return fetch(endpoint, config) // use fetch API to get data
          .then((response) => response.json())
          .catch((error) => console.log(error));
      },

      getSoundInfo() {
        // *** Local Dev Mode ***
        this.api(process.env.ROOT_API+"/tasks/"+this.id+"/").then((soundInfo) => {
          this.soundInfo = soundInfo;
        });
      },
      playSound (sound) {
        if(sound) {
          var audio = new Audio(sound);
          audio.play();
        }
    }
    }
  }
</script>

<!--CSS-->
<style>
</style>
