/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %>
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'
import App from './app.vue'
import _ from 'underscore'
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('hello'))

  const renderer = new Renderer();
  renderer.code = (code, language) => {
    // Check whether the given language is valid for highlight.js.
    const validLang = !!(language && highlightjs.getLanguage(language));
    // Highlight only if the language is valid.
    const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
    // Render the highlighted code with `hljs` class.
    return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
  };
  marked.setOptions({ renderer });

  const app = new Vue({
    el: '#editor',
    data: {
      input: '# Hello World\n\n```ruby\nclass HelloWorld\n  def initialize(name)\n    @name = name.capitalize\n  end\n  def sayHi\n    puts "Hello #{@name}!"\n  end\nend\n\nhello = HelloWorld.new("World")\nhello.sayHi\n```'
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  })

  console.log(app)
})
