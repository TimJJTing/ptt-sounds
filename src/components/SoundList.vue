<!-- Html -->
<template>
  <div class="w-100">
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
              <b-nav-item v-b-toggle="'collapseInput'">New</b-nav-item>
              <b-nav-item :to="{name: 'Documentation'}">Documentation</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-col>
      </b-row>
    </b-navbar>
    <b-collapse id="collapseInput">
      <b-card bg-variant="dark"
              text-variant="white"
              header="Create A New Sound"
              class="text-center mt-2">
        <b-input-group prepend="URL">
          <b-form-input id="inputLive"
                        v-model.trim="crawlUrl"
                        type="text"
                        :state="isValidPttUrl"
                        aria-describedby="inputLiveFeedback"
                        placeholder="https://www.ptt.cc/bbs/{board}/{article_id}.html">
          </b-form-input>
          <b-input-group-append>
          <b-button @click="newSound"
                    :disabled="!isValidPttUrl"
                    variant="primary">
            Make
          </b-button>
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
    <b-row id="sound-table"
           align-h="center"
           align-v="start"
           no-gutters
           class="h-100 mt-2">
      <b-col cols="12">
        <b-table :items="sounds"
                 :fields="sound_fields"
                 :current-page="currentTablePage"
                 :per-page="perTablePage"
                 responsive="sm"
                 striped hover dark>
          <template slot="id" slot-scope="row">
            <!-- If sound if still processing, route to SoundMonitor-->
            <router-link :to=" row.item.state=='finished' ? {name: 'SoundDetail', params: { id: row.value }} : {name: 'SoundMonitor', params: { ctid: row.value }}">
              <a>{{row.value}}</a>
            </router-link>
          </template>
          <template slot="title" slot-scope="row">
            <!-- If sound if still processing, route to SoundMonitor-->
            <router-link :to=" row.item.state=='finished' ? {name: 'SoundDetail', params: { id: row.item.id }} : {name: 'SoundMonitor', params: { ctid: row.item.id }}">
              <a>{{row.item.state=='finished' ? row.value : "--Composing--"}}</a>
            </router-link>
          </template>
        </b-table>
        <b-pagination size="md"
                      align="center"
                      :total-rows="sounds.length"
                      v-model="currentTablePage"
                      :per-page="perTablePage">
        </b-pagination>
      </b-col>
    </b-row>
    <!-- </div> -->
  </div>
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
        sound_fields: [ 
          {key: 'id', sortable: true},
          {key: 'title', sortable: false}
        ],
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
