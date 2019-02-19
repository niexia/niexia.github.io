var CACHE = {};
var PostList = Vue.extend({
  template: '#postList',
  data: function() {
    return {
      posts: [],
      prePage: 0,
      nextPage: 0,
      isHome: true,
      label: ''
    };
  },
  mounted() {
    this.handleGetPostList();
  },
  methods: {
    handleGetPostList: function() {
      document.getElementById('content').style.opacity = 0.6;
      var  params = this.$route.params,
        page = params.page || 1,
        label = '',
        isHome = true;
      if (params.name) {
        label = params.name;
        isHome = false;
      }
      var cache = CACHE[label + 'Page' + page];
      if (cache) {
        this.posts = cache.posts;
        this.prePage = cache.prePage;
        this.nextPage = cache.nextPage;
        this.isHome = cache.isHome;
        this.label = cache.label;
        document.getElementById('content').style.opacity = 1;
        return;
      }
      this.$http({
        url:
          'https://api.github.com/repos/' +
          config['user'] +
          '/' +
          config['repo'] +
          '/issues',
        data: {
          creator: config['user'],
          page: page,
          labels: label
        },
        method: 'GET'
      }).then(
        function(response) {
          console.log(response);
          var data = response.data,
            link = '',
            // link = response.headers('Link'),
            prePage = false,
            nextPage = false;
          if (link && link.indexOf('rel="prev"') > 0) {
            prePage = parseInt(page) - 1;
          }
          if (link && link.indexOf('rel="next"') > 0) {
            nextPage = parseInt(page) + 1;
          }
          this.posts = data;
          this.prePage = prePage;
          this.nextPage = nextPage;
          this.isHome = isHome;
          this.label = label;
          title = config['blogname'];
          if (page != 1) {
            title = 'Page ' + page + config['sep'] + title;
          }
          if (label) {
            title = label + config['sep'] + title;
          }
          document.title = title;
          document.getElementById('content').style.opacity = 1;
          document.getElementById('loading').style.display = 'none';
          CACHE[label + 'Page' + page] = {
            posts: data,
            prePage: prePage,
            nextPage: nextPage,
            isHome: isHome,
            label: label
          };
          for (var i in data) {
            if (!CACHE.hasOwnProperty('Post' + data[i].number)) {
              CACHE['Post' + data[i].number] = {
                post: data[i]
              };
            }
          }
        },
      );
    }
  }
});

var PostDetail = Vue.extend({
  template: '#postDetail',
  data: function() {
    return {
      post: []
    };
  },
  mounted() {
    this.handleGetPostListDetail();
  },
  methods: {
    handleGetPostListDetail: function () {
      var id = this.$route.params['id'],
        cache = CACHE['Post' + id];
      if (cache) {
        var data = cache.post;
        data.body = marked(data.body);
        this.$data.post = data;
        document.getElementById('content').style.opacity = 1;
        return;
      }
      var _self = this;
      this.$http({
        url:
          'https://api.github.com/repos/' +
          config['user'] +
          '/' +
          config['repo'] +
          '/issues/' +
          id,
        method: 'GET'
      }).then(
        function(response) {
          var data = response.data;
          data.body = marked(data.body);
          this.post = data;
          document.title = data.title + config['sep'] + config['blogname'];
          document.getElementById('content').style.opacity = 1;
          document.getElementById('loading').style.display = 'none';
        },
      );
    }
  }
});

// 定义路由
var routes = [
  {
    path: '/',
    name: 'PostsList',
    component: PostList
  }, {
    path: '/page/:page',
    name: 'PagePosts',
    component: PostList
  }, {
    path: '/page/:name',
    name: 'LabelPost',
    component: PostList
  }, {
    path: '/label/:name/page/:page',
    name: 'PageLabelPost',
    component: PostList
  }, {
    path: '/page/:id',
    name: 'PostDetail',
    component: PostDetail
  }, {
    path: '*',
    name: 'default',
    component: PostList
  }
];
var router = new VueRouter({routes});
new Vue({
  router
}).$mount('#app')

