$(function(){
    // //获取uuid
    // var uuid = GetCookie('UUID');
    // if (!uuid) {
    //     uuid = new Date().getTime();
    //     // 取得UUID
    //     GetUUID('', function (response) {
    //         if (response.errcode == '0') {
    //             uuid = response.uuid;
    //             SetCookie('UUID', uuid);
    //         }
    //     }, function (response) {});
    // }

    //contact us
    $(".form>.button").click(function(){
        var first_name=$("input[name='firstname']").val();
        var last_name=$("input[name='lastname']").val();
        // var user_name=last_name+first_name;
        var email=$("input[name='email']").val();
        var content=$("textarea[name='message']").val();

        if(first_name.length<=0){layer.msg("First name cannot be empty.")}
        if(last_name.length<=0){layer.msg("Last name cannot be empty.")}
        if(email.length<=0){layer.msg("Mailbox cannot be empty.")}
        if(!(IsEmail(email))){layer.msg("Email format error")}
        if(content.length<=0){layer.msg("Message cannot be empty.")}

        var $this = $(this), btnText = $(this).text();
        if (DisableClick($this)) return;
        ContactUs(first_name, last_name, email, content, function (response) {
            ActiveClick($this, btnText);
            if (response.errcode == '0') {
                $("input[name='firstname']").val("");
                $("input[name='lastname']").val("");
                $("input[name='email']").val("");
                $("textarea[name='message']").val("");
            }
            layer.msg(response.errmsg);
        }, function (response) {
            ActiveClick($this, btnText);
            layer.msg(response.errmsg);
        });
    })
});