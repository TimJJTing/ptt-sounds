<template>
  <b-container fluid id="doc-container">
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
    <b-row class="justify-content-md-center mt-4">
      <b-col cols="8">
        <h1 id="pttsounds">PTT sounds</h1>
        <p>PTT sounds is a web application that can turn an article on PTT into audible frequencies.</p>
        <h2 id="idea">Idea</h2>
        <p>PTT is the most famous BBS in Taiwan, where one can find the public’s opinion for almost any given topic. With public’s opinion structuralized in a series of short comments and “push/boo” tags, one can read through the discussion thread to catch the public’s sentiment orientations of a topic.</p>
        <p>However, reading is not the only way we feel this world. What if we can actually “hear” public’s sentiment orientations? Does it feel different from reading? Can we compose meaningful sounds from public opinion? Will a positive rated article sounds better than a negative rated article?  If the author and commenters of an article start a band, how will their music sound like? This web application is designed to answer these questions.</p>

        <h2 id="howitworksingeneral">How It Works in General</h2>
        <p>A User first enters a ptt article URL in the [Frontend]. When the [Backend API] receives a valid PTT article URL, it dispatches a [Crawler], which crawls and re-structuralized article contents for the [Sound Maker]. The [Sound Maker] then can process structuralized data with 3 steps, tokenization, quantization (based on word polarity), and finally sonification. After the procedure is done, a media file will be generated and therefore can be referenced via the [Frontend].</p>

        <h2 id="technologyused">Technology Used</h2>
        <h3 id="frontend">Frontend</h3>

        <ul>
        <li>Vue.js</li>
        <li>Vue router</li>
        <li>Bootstrap</li>
        </ul>

        <h3 id="backend">Backend</h3>
        <h4 id="hostingenvironment">Hosting/Environment</h4>

        <ul>
        <li>Google Cloud Compute Engine</li>
        <li>Docker-Compose</li>
        </ul>

        <h4 id="webserver">Web Server</h4>

        <ul>
        <li>Nginx</li>
        </ul>

        <h4 id="api">API</h4>

        <ul>
        <li>Django</li>
        <li>Django rest framework</li>
        <li>Celery</li>
        </ul>

        <h4 id="crawler">Crawler</h4>

        <ul>
        <li>Scrapy/Scrapinghub</li>
        </ul>

        <h4 id="soundmaker">Sound Maker</h4>
        <h5 id="tokenization">Tokenization</h5>

        <ul>
        <li>pandas</li>
        <li>jseg/jieba</li>
        </ul>

        <h5 id="quantization">Quantization</h5>

        <ul>
        <li>numpy</li>
        <li>ANTUSD</li>
        </ul>

        <h5 id="sonification">Sonification</h5>

        <ul>
        <li>thinkdsp (with some customized code)</li>
        </ul>

        <h4 id="database">Database</h4>

        <ul>
        <li>Postgresql</li>
        </ul>

        <h4 id="messagingcachebackend">Messaging/Cache Backend</h4>

        <ul>
        <li>Redis</li>
        </ul>

        <h2 id="todos">TODOs</h2>
        <h3 id="highpriority">High Priority</h3>

        <ul>
        <li>[General] Finish the documentation</li>
        <li>[General] Push backend codes to GitHub</li>
        <li>[Backend-API] Reduce restart loading time</li>
        <li>[Backend-API] Deal with warning messages</li>
        </ul>

        <h3 id="mediumpriority">Medium Priority</h3>

        <ul>
        <li>[Backend-DB] Migrate from container to Cloud SQL instance</li>
        <li>[Backend-API] Serve backend static and media files with Cloud Storage buckets</li>
        </ul>

        <h3 id="lowpriority">Low Priority</h3>

        <ul>
        <li>[Backend-Hosting] Migrate from Nginx to Google's load balancer service</li>
        </ul>

        <h3 id="mightbeagoodideatodo">Might Be A Good Idea To Do</h3>

        <ul>
        <li>[Frontend] A interface that controls ADSR via the ADSR API to change the timbre of sounds</li>
        <li>[Frontend] Timbre customization interfaces</li>
        <li>[Frontend] Real-time Audio-visual feature with p5.js or d3.js</li>
        </ul>

        <h2 id="credits">Credits</h2>
        <h3 id="resources">Resources</h3>

        <ul>
        <li><a href="https://github.com/AllenDowney/ThinkDSP">Allen B. Downey</a>: Author of Think DSP, an awesome book for learning digital signal processing.</li>
        <li><a href="http://academiasinicanlplab.github.io/">NLPSA</a>: Where I acquire ANTUSD for this project.</li>
        <li><a href="https://github.com/amigcamel/Jseg">Jseg</a>: A better choice for tokenization in this project.</li>
        </ul>

        <h3 id="references">References</h3>

        <ul>
        <li><a href="https://medium.com/@matthew.rosendin/dockerizing-a-full-stack-application-89a7d69e11e9">Dockerizing a Full-stack Application</a></li>
        <li><a href="http://seanlook.com/2015/05/17/nginx-location-rewrite/">nginx配置location总结及rewrite规则写法</a></li>
        <li><a href="http://synthesizeracademy.com/voltage-controlled-oscillator-vco/">Voltage-Controlled Oscillator (VCO)</a></li>
        <li><a href="https://boostlog.io/@nixus89896/setup-caching-in-django-with-redis-5abb7d060814730093a2eebe">Setup caching in Django With Redis</a></li>
        <li><a href="http://blog.acipo.com/wave-generation-in-python/">Wave Generation in Python</a></li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'DocumentationView'
}
</script>
<style>
#doc-container {
  background-color: black;
}
</style>
