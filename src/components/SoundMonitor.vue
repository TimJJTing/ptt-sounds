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
    <b-card :header="'Composing sound'+ctid+'...'"
            bg-variant="dark"
            text-variant="white"
            class="w-50 mt-2 mx-auto">
      <!-- subtitle -->
      <h3 id="detail">{{ctdetail}}</h3>
      <b-progress :value="pBarPercent" :max="pBarPercentMax" show-progress animated></b-progress><br>
      <b-row align-h="center">
        <b-col cols="2">
          <!--TODO: connect our api to cancle a task-->
          <a>Cancle</a>
        </b-col>
        <b-col cols="2">
          <router-link :to="{name: 'SoundList'}">
            <a>Return</a>
          </router-link>
        </b-col>
        <b-col cols="2">
          <router-link :to="{name: 'SoundDetail', params: { id: ctid }}">
            <a>Detail</a>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<!--JS-->
<script>
/* eslint-disable */
  // new Vue()
  export default{
    props: ['ctid'],
    name: 'SoundMonitorView',
    data() {
      return {
        ctstatus: '0',
        ctdetail: 'gethering info...',
        statusInterval: 1,
        pBarPercent: 0,
        pBarPercentMax: 100
      }
    },
    created() {
      // set interval to send request after this component is mounted 
      this.statusInterval = setInterval(this.getCurrentSoundStatus, 2000);
    },
    watch: {
      // watch current sound's status
      ctstatus: function(value) {
        // possible status 0, 10, 50, 100, ERROR
        if (Number.isInteger(Number.parseInt(value))){
          this.pBarPercent = Number.parseInt(value);
        }
        else if (value === 'ERROR') {
          this.pBarPercent = 0;
        }
      }
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

      getCurrentSoundStatus() {
        // *** Local Dev Mode ***
        this.api(process.env.ROOT_API+"/task_progress/"+this.ctid+"/")
        .then((response) => {
          //console.log(response);
          this.ctstatus = response.status;
          this.ctdetail = response.detail;
          if (this.ctstatus === '100' || this.ctstatus === 'ERROR') {
            clearInterval(this.statusInterval);
          }
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      // make sure all timers are cleared before leave
      clearInterval(this.statusInterval);
      // dismiss the route guard
      next();
    }
  }
</script>

<!--CSS-->
<style>
</style>
