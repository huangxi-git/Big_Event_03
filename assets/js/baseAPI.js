// 开发环境服务地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (params) {
    // 拼接对应环境服务地址
    params.url = baseURL + params.url;

    // 身份验证
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            // 拿取本地存储的 token ，登录成功本地就有token，没有登录就没有
            Authorization: localStorage.getItem('token') || '',
        };
    };


    // 拦截所有响应，判断身份验证信息
    params.complete = function (res) {
        let obj = res.responseJSON;
        // console.log(obj);
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
        };
    };


});