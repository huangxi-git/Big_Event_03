// 开发环境服务地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (params) {
    // 拼接对应环境服务地址
    params.url = baseURL + params.url;
})