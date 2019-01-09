<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="pttblue">
      <b-row no-gutters class="mx-2 w-100">
        <b-col order="1" cols="4" offset="2"
               md="4" order-md="0" offset-md="0"
               class="text-center text-md-start">
          <b-navbar-nav>
            <b-navbar-brand tag="h1" :to="{name: 'SoundList'}">Sounds of PTT</b-navbar-brand>
          </b-navbar-nav>
        </b-col>
        <b-col order="0" cols="2"
               order-md="1" md="4" offset-md="4">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav
                      id="nav_collapse"
                      class="justify-content-start justify-content-md-end">
            <b-navbar-nav>
              <b-nav-item :to="{name: 'Documentation'}">Documentation</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-col>
      </b-row>
    </b-navbar>
    <b-row class="justify-content-center mx-2 mt-2">
      <b-col cols="12" sm="10" md="8">
        <b-card v-if="soundInfo.id" :title="soundInfo.state=='finished' ? '['+soundInfo.genre+'] '+soundInfo.title : 'Composing...'"
                :sub-title="soundInfo.author"
                bg-variant="dark"
                text-variant="white">
            <p class="card-text">{{soundInfo.created_dt}}</p>
            <p class="card-text">{{soundInfo.state}}</p>
            <p><audio v-if="soundInfo.state=='finished'" :src="soundInfo.wave_file_url" controls="controls">
              Your browser does not support the html5 audio element.
            </audio></p>
            <a :href="soundInfo.crawl_url"
              class="card-link">Sheet</a>
            <router-link class="card-link" :to="{name: 'SoundList'}">
              <a>Return</a>
            </router-link>
        </b-card>
        <b-card v-else
                title=""
                bg-variant="dark"
                text-variant="white">
        </b-card>
      </b-col>
    </b-row>
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
    }
  }
</script>

<!--CSS-->
<style>
</style>
