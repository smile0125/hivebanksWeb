// 设置cookies函数
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    // 有效期7天
    time += 3600 * 1000 * 24 * 7;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}

// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

// 删除cookie函数
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 取得URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    if (r != null) return unescape(r[2]);
    return null;
    // console.log(r);
}

// Email格式检查
function IsEmail(s) {
    var patrn = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    return patrn.test(s);
}

// 调用API共通函数
function CallApi(api_url, post_data, suc_func, error_func) {

    var api_site = 'http://ow.fnying.com/website/';

    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };

    //console.log('Call API:' + api_url);
    //console.log(JSON.stringify(post_data));

    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            //console.log(JSON.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}
// 调用API imgCode共通函数
function CallCodeApi(api_url, post_data, suc_func, error_func) {

    var api_site = 'http://ow.fnying.com/inc/';

    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };

    //console.log('Call API:' + api_url);
    //console.log(JSON.stringify(post_data));

    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            //console.log(JSON.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

// 获取用户UUID
function GetUUID(post_data, suc_func, error_func) {
    var api_url = 'get_uuid.php';
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取阶段内容
function GetStageContent(suc_func, error_func) {
    var api_url = 'development.php',
        post_data = {};
    CallApi(api_url, post_data, suc_func, error_func);
}
//get code
function GetImgCode(suc_func, error_func) {
    var api_url = "code.php",
        post_data = {};
        CallCodeApi(api_url, post_data, suc_func, error_func);
}

//login la
function LoginLa(email, pass_word_hash, suc_func, error_func) {
    var api_url = "",
        post_data = {
            "email": email,
            "pass_word_hash": pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//register la
function RegisterLa(email, pass_word_hash, name, suc_func, error_func) {
    var api_url = "reg_email.php",
        post_data = {
            "email": email,
            "pass_word_hash": pass_word_hash,
            "real_name": name
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//contact us
function ContactUs(first_name, last_name, email, content, suc_func, error_func) {
    var api_url = 'contact_us.php';
    var post_data = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "content": content
    };
    CallApi(api_url, post_data, suc_func, error_func);
}

/**
 * 禁用按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 * @return {boolean}
 */
function DisableClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return true;
    }
    var status = Number($this.attr('data-clickStatus') || 1);
    if (status == 0) {
        return true;
    }

    btnText = btnText ? btnText : "Loading";
    $this.attr('data-clickStatus', 0);
    $this.html(btnText);
    return false;
}

/**
 * 激活按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 */
function ActiveClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return;
    }
    btnText = btnText ? btnText : "确认";
    $this.attr('data-clickStatus', 1);
    $this.html(btnText);
}
