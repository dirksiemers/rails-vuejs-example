import Vue from 'vue/dist/vue.esm'
import _ from 'underscore'
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';

document.addEventListener('DOMContentLoaded', () => {
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
