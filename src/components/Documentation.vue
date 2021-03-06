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
              <b-nav-item :to="{name: 'Documentation'}">Documentation</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-col>
      </b-row>
    </b-navbar>
    <b-row class="justify-content-center mt-4 mx-2 mb-4">
      <b-col cols="12" sm="10" md="8">
        <h1 id="pttsounds">Sounds of PTT</h1>
        <p>Sounds of PTT is a web application that can turn an article on PTT into audible frequencies.</p>
        <h2 id="idea">Idea</h2>
        <p><a href="https://www.ptt.cc/bbs/index.html">PTT</a> is the most famous BBS in Taiwan, where one can find the public’s opinion for almost any given topic. With public’s opinion structuralized in a series of short comments and “push/boo” tags, one can read through the discussion thread to catch the public’s sentiment orientations of a topic.</p>
        <p>However, reading is not the only way we sense this world. Just like the <a href="https://www.nasa.gov/feature/goddard/2018/sounds-of-the-sun">inspiring project</a> by NASA, what if we could actually “hear” public's sentiment orientations? Does it feel different from reading? Can we compose meaningful sounds from public's opinions? Will a positive rated article sounds better than a negative rated article? If the author and commenters of an article start a band, how will their music sound like? This web application is designed to answer these questions.</p>

        <h2 id="howitworksingeneral">How It Works in General</h2>
        <p>A User first enters a ptt article URL in the [Frontend]. When the [Backend API] receives a valid PTT article URL, it dispatches a [Crawler], which crawls and re-structuralizes article contents for the [Sound Maker]. The [Sound Maker] then can process structuralized data with 3 steps, tokenization, quantization (based on word polarity), and finally sonification. After the procedure is done, a media file will be generated and therefore can be referenced via the [Frontend].</p>

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
          <li>[Frontend] Redesign component hierarchy</li>
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
          <li>[Frontend] An interface that controls ADSR via the ADSR API to change the timbre of sounds</li>
          <li>[Frontend] Timbre customization interfaces</li>
          <li>[Frontend] Real-time Audio-visual feature with p5.js or d3.js</li>
        </ul>

        <h2 id="credits">Credits</h2>
        <h3 id="insp-ackn">Inspiration and Acknowledgements</h3>
        <ul>
          <li><a href="https://www.nasa.gov/feature/goddard/2018/sounds-of-the-sun">Sounds of the Sun</a></li>
          <li><a href="https://www.mis.nsysu.edu.tw/~bkuo/">Prof. Feng-Yang Kuo</a></li>
          <li><a href="http://www.changyentzu.com/">Yen-tzu Chang</a></li>
        </ul>

        <h3 id="resources">Resources</h3>
        <ul>
          <li><a href="https://github.com/AllenDowney/ThinkDSP">Allen B. Downey</a>: The author of Think DSP, an awesome book for learning digital signal processing.</li>
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
  </div>
</template>
<script>
export default {
  name: 'DocumentationView'
}
</script>
<style>
</style>
