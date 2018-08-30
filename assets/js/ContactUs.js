$(function(){
    //获取uuid
    var uuid = GetCookie('UUID');
    if (!uuid) {
        uuid = new Date().getTime();
        // 取得UUID
        GetUUID('', function (response) {
            if (response.errcode == '0') {
                uuid = response.uuid;
                SetCookie('UUID', uuid);
            }
        }, function (response) {});
    }

    //contact us
    $(".form>.button").click(function(){
        var firstname=$("input[name='firstname']").val();
        var lastname=$("input[name='lastname']").val();
        var user_name=lastname+firstname;
        var user_email=$("input[name='email']").val();
        var user_suggestion=$("textarea[name='message']").val();

        if(firstname.length<=0){layer.msg("First name cannot be empty.")}
        if(lastname.length<=0){layer.msg("Last name cannot be empty.")}
        if(user_email.length<=0){layer.msg("Mailbox cannot be empty.")}
        if(!(IsEmail(user_email))){layer.msg("Email format error")}
        if(user_suggestion.length<=0){layer.msg("Message cannot be empty.")}

        var $this = $(this);
        if (DisableClick($this)) return;
        ContactUs(uuid,user_name, user_email, user_suggestion, function (response) {
            ActiveClick($this, 'Submit');
            if (response.errcode == '0') {
                $("input[name='firstname']").val("");
                $("input[name='lastname']").val("");
                $("input[name='email']").val("");
                $("textarea[name='message']").val("");
            }
            layer.msg(response.errmsg);
        }, function (response) {
            ActiveClick($this, 'Submit');
            layer.msg(response.errmsg);
        });
    })
});