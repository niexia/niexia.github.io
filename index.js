var config = {
  /** 博客名称 */
  blogname: 'YangJin Blog',
  /** document.title 的分割 */
  sep: ' - ',
  /** GitHub账号 */
  user: 'niexia', 
  /** GitHub res 名称 */
  repo: 'niexia.github.io',
  /** 每页多少篇博客 */
  per_page: 15,
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
  name: 'post',
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
        this.loading = false;
        alert(error.body.message);
      })
    }
  }
});

var PostDetail = Vue.extend({
  name: 'post-detail',
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
      this.$http.get('https://api.github.com/repos/' + config['user'] + '/' + config['repo'] + '/issues/' + id)
      .then(function(response) {
        var data = response.data;
        data.body = marked(data.body);
        this.post = data;
        this.loading = false;
        document.title = data.title + config['sep'] + config['blogname'];
      }).catch(function (error) {
        this.loading = false;
        alert(error.body.message)
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

var Project = Vue.extend({
  name: 'project',
  template: '#project',
  data: function () {
    return {
      projects: [],
      loading: false,
    };
  },
  mounted: function () {
    this.getProjectList();
  },
  methods: {
    getProjectList: function() {
      /**
       * GitHub Api 没有提供相关的 restful api 直接去获取 pinned 的项目
       * 这个接口通过直接获取用户的首页信息，通过 dom 去查找对应的 pinned 进行返回
       * https: //stackoverflow.com/questions/43352056/how-do-i-make-an-api-call-to-github-for-a-users-pinned-repositories
       */
      this.loading = true;
      this.$http.get('https://gh-pinned-repos-5l2i19um3.vercel.app/', {
        params: {
          username: config.user
        }
      }).then(function (response) {
        this.projects = response.body;
        this.loading = false;
        document.title = 'project' + config['sep'] + config['blogname'];
      }).catch(function (error) {
        this.loading = false;
        alert('Failed to get project list')
      })
    }
  },
})

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
    path: '/project',
    name: 'project',
    component: Project
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

