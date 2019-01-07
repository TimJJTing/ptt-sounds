<!-- Html -->
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
          <b-nav-item v-b-toggle="'collapseInput'" right>New</b-nav-item>
          <b-nav-item :to="{name: 'Documentation'}" right>Documentation</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--collapsiable input part-->
    <b-collapse id="collapseInput">
      <b-card bg-variant="dark"
              text-variant="white"
              header="Create A New Sound"
              class="text-center mt-2">
        <b-input-group prepend="Article URL">
          <b-form-input id="inputLive"
                        v-model.trim="crawlUrl"
                        type="text"
                        :state="isValidPttUrl"
                        aria-describedby="inputLiveFeedback"
                        placeholder="https://www.ptt.cc/bbs/{board}/{article_id}.html">
          </b-form-input>
          <b-input-group-append>
          <b-button @click="newSound" :disabled="!isValidPttUrl" variant="primary">Make</b-button>
          </b-input-group-append>
          <b-form-invalid-feedback id="inputLiveFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            Not a valid PTT Url.
          </b-form-invalid-feedback>
          <!--TODO: advanced settings for tuning sounds (timbre, adsr env...)-->
        </b-input-group>
      </b-card>
    </b-collapse>
    <!--Table for presenting made sounds-->
    <b-row id="sound-table" align-h="center" align-v="start" class="h-100 mt-2">
      <b-col cols="12">
        <!--TODO: sort and pagination-->
        <b-table :items="sounds"
                  :fields="sound_fields"
                  :current-page="currentTablePage"
                  :per-page="perTablePage"
                  striped hover dark>
          <template slot="id" slot-scope="data">
            <router-link :to="{name: 'SoundDetail', params: { id: data.value }}">
              <a>{{data.value}}</a>
            </router-link>
          </template>
        </b-table>
        <b-pagination
          size="md"
          align="center"
          :total-rows="sounds.length"
          v-model="currentTablePage"
          :per-page="perTablePage">
        </b-pagination>
      </b-col>
    </b-row>
    <!-- </div> -->
  </b-container>
</template>
<!--JS-->
<script>
/* eslint-disable */
  // new Vue()
  export default{
    name: 'SoundListView',
    data() {
      return {
        startDisabled: true,
        crawlUrl: '',
        errMsg: '',
        sounds: [],
        sound_fields: [ 'id', 'genre', 'title', 'author', 'created_dt', 'state'],
        currentTablePage: 1,
        perTablePage: 8
      }
    },
    created() {
      // reload sound list after this component is mounted 
      this.reloadSoundList();
    },
    computed: {
      // validate if the url is a valid ptt url
      isValidPttUrl() {
        const re = /^https:\/\/www\.ptt\.cc\/bbs\/[0-9A-Za-z_\-]{1,12}\/M\.\d{10}\.A\.[A-Z0-9]{3}\.html$/;
        return re.test(this.crawlUrl);
      },
    },
    methods: {
      api(endpoint, method, data) {
        // use specified method, otherwise use GET
        // if data is not undefined(GET), put json stringified data in the body
        var config = {};

        if (!method) {
          config = {
            method: 'GET',
            body: null,
            headers: {
              'content-type': 'application/json'
            }
          }
        }
        else if (method == 'POST') {
          config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        }
        else {
          console.log('API does not allow this request method.');
        }

        return fetch(endpoint, config) // use fetch API to get data
          .then((response) => response.json())
          .catch((error) => console.log(error));
      },

      reloadSoundList() {
        this.getSounds();
      },

      getSounds() {
        // *** Local Dev Mode ***
        this.api(process.env.ROOT_API+"/tasks/").then((sounds) => {
          this.sounds = sounds;
        });
      },

      newSound() {
        // call api *** Local Dev Mode ***
        this.api(process.env.ROOT_API+"/schedule_task/", "POST", {
          crawl_url: this.crawlUrl,
        }).then((response) => {
          // redirect to SoundMonitor with param <ctid> if response has id
          if (response.id) {
            this.$router.push({ name: 'SoundMonitor', params: { ctid: response.id }});
          }
          // scheduling error, alert error message.
          else {
            alert(response.detail);
          }
        });
      }
    }
  }
</script>

<!--CSS-->
<style>
</style>
