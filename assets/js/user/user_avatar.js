$(function () {

    let layer = layui.layer;
    let form = layui.form;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);


    // 点击上传按钮
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });


    // 修改裁剪的图片
    // 用户选择图片就会触发 change 事件
    $('#file').on('change', function (e) {
        // 拿到用户选择的图片文件
        let file = e.target.files[0];
        // 非空校验
        if (file == undefined) {
            return layer.msg('请选择图片');
        }
        // 将图片转为路径
        let newImgURL = URL.createObjectURL(file);
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });


    // 上传头像
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100,
            })
            .toDataURL('image/png')

        // 发送请求
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('更换成功！');
                // 重新渲染页面
                window.parent.getUserInfo();
            },
        });
    })



});