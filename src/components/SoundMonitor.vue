<!-- Html -->
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
        <b-card :header="'Composing sound '+ctid+' ...'"
                bg-variant="dark"
                text-variant="white">
          <!-- subtitle -->
          <h3 id="detail">{{ctdetail}}</h3>
          <b-progress :value="pBarPercent" :max="pBarPercentMax" show-progress animated></b-progress><br>
          <b-row align-h="center">
            <b-col cols="4" class="mx-auto text-center">
              <router-link :to="{name: 'SoundList'}">
                <a>Return</a>
              </router-link>
            </b-col>
            <b-col cols="4" class="mx-auto text-center">
              <router-link :to="{name: 'SoundDetail', params: { id: ctid }}">
                <a>Detail</a>
              </router-link>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
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
