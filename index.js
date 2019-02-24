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
  mounted: function() {
    this.handleGetPostList();
  },
  methods: {
    handleGetPostList: function() {
      var params = this.$route.params;
      var page = params.page || 1;
      var isHome = true;
      var label = '';
      var cache = CACHE[label + '-' + page];
      if (params.name) {
        label = params.name;
        isHome = false;
      }
      if (cache) {
        this.posts = cache.posts;
        this.prePage = cache.prePage;
        this.nextPage = cache.nextPage;
        this.isHome = cache.isHome;
        this.label = cache.label;
        return;
      }
      this.$http.get('https://api.github.com/repos/' + config['user'] + '/' + config['repo'] + '/issues',
        {
          params: {
            creator: config['user'],
            page: page,
            labels: label
          }
        }).then(function(response) {
        console.log(response);
        var data = response.data;
        var prePage = false;
        var nextPage = false;
        var link = response.headers['Link'];
        if (link && link.indexOf('rel="prev"') > 0) prePage = parseInt(page) - 1;
        if (link && link.indexOf('rel="next"') > 0) nextPage = parseInt(page) + 1;
        this.posts = data;
        console.log(data);
        this.prePage = prePage;
        this.nextPage = nextPage;
        this.isHome = isHome;
        this.label = label;
        var title = config['blogname'];
        if (page != 1) title = 'Page ' + page + config['sep'] + title;
        if (label) title = label + config['sep'] + title;
        document.title = title;
        CACHE[label + '-' + page] = {
          posts: data,
          prePage: prePage,
          nextPage: nextPage,
          isHome: isHome,
          label: label
        };
        data.forEach(function(post) {
          if (!CACHE['post' + post.id]) {
            CACHE['post'+ post.id] = {
              post: post
            }
          }
        })
      }).catch(function(error) {
        throw error;
      })
    },
    formatDate: function(date, format) {
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
      };
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return format;
    },
  }
});

var PostDetail = Vue.extend({
  template: '#postDetail',
  data: function() {
    return {
      post: []
    };
  },
  mounted: function () {
    this.handleGetPostListDetail();
  },
  methods: {
    handleGetPostListDetail: function () {
      var id = this.$route.params['id'];
      var cache = CACHE['post' + id];
      if (cache) {
        var data = cache.post;
        data.body = marked(data.body);
        this.$data.post = data;
        return;
      }
      this.$http.get('https://api.github.com/repos/' + config['user'] + '/' + config['repo'] + '/issues/' + id
        ).then(function(response) {
        var data = response.data;
        data.body = marked(data.body);
        this.post = data;
        document.title = data.title + config['sep'] + config['blogname'];
      }).catch(function (error) {
        throw error;
      })
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
    name: 'pagePost',
    component: PostList
  }, {
    path: '/page/label/:name',
    name: 'labelPost',
    component: PostList
  }, {
    path: '/label/:name/page/:page',
    name: 'labelPagePost',
    component: PostList
  }, {
    path: '/page/detail/:id',
    name: 'postDetail',
    component: PostDetail
  }, {
    path: '*',
    name: 'default',
    component: PostList
  }
];
var router = new VueRouter({
  routes: routes
});
new Vue({
  router: router
}).$mount('#app')

