var config = {
  blogname: 'YangJin Blog', // 博客名称
  sep: ' | ', // document.title 的分割
  user: 'niexias', // GitHub账号
  repo: 'niexias.github.io', // GitHub res名称
  per_page: 15 // 每页多少篇博客
};

Date.prototype.Format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}

var PostList = Vue.extend({
  template: '#postList',
  data: function() {
    return {
      posts: [],
      prePage: 0,
      nextPage: 0,
      notLabel: true,
      label: '',
      loading: false
    };
  },
  watch: {
    '$route': function(to, from) {
      this.handleGetPostList();
    }
  },
  mounted: function() {
    this.$root.headerVisible = true;
    this.handleGetPostList();
  },
  methods: {
    handleGetPostList: function() {
      var params = this.$route.params;
      var page = params.page || 1;
      var notLabel = true;
      var label = '';
      this.loading = true;
      if (params.name) {
        label = params.name;
        notLabel = false;
      }
      this.$http.get('https://api.github.com/repos/' + config['user'] + '/' + config['repo'] + '/issues',
        {
          params: {
            creator: config['user'],
            page: page,
            per_page: config['per_page'],
            labels: label,
          }
        }).then(function(response) {
        var data = response.data;
        var prePage = false;
        var nextPage = false;
        var link = (response.headers.map['link'] || [])[0];
        if (link && link.indexOf('rel="prev"') > 0) prePage = parseInt(page) - 1;
        if (link && link.indexOf('rel="next"') > 0) nextPage = parseInt(page) + 1;
        this.posts = data;
        this.prePage = prePage;
        this.nextPage = nextPage;
        this.notLabel = notLabel;
        this.label = label;
        this.loading = false;
        var title = config['blogname'];
        if (page != 1) title = 'Page ' + page + config['sep'] + title;
        if (label) title = label + config['sep'] + title;
        document.title = title;
      }).catch(function(error) {
        throw error;
      })
    }
  }
});

var PostDetail = Vue.extend({
  template: '#postDetail',
  data: function() {
    return {
      post: [],
      loading: false,
    };
  },
  mounted: function () {
    this.$root.headerVisible = false;
    this.handleGetPostListDetail();
  },
  methods: {
    handleGetPostListDetail: function () {
      var id = this.$route.params['id'];
      this.loading = true;
      this.$http.get('https://api.github.com/repos/' + config['user'] + '/' + config['repo'] + '/issues/' + id).then(function(response) {
        var data = response.data;
        data.body = marked(data.body);
        this.post = data;
        this.loading = false;
        document.title = data.title + config['sep'] + config['blogname'];
      }).catch(function (error) {
        throw error;
      })
    },
    handleReturn: function () {
      if (window.history.length > 0) {
        window.history.back();
      } else {
        window.location.hash = '#/'
      }
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
  router: router,
  data: {
    config: config,
    headerVisible: true
  }
}).$mount('#app')

