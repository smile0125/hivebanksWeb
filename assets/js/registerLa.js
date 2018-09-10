$(function () {
    $("#email").focus(function () {
        $(this).removeClass("redBorder");
    });
    $("#password").focus(function () {
        $(this).removeClass("redBorder");
    });
    $("#name").focus(function () {
        $(this).removeClass("redBorder");
    });
    $('.signUpBtn').click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#name").val(),
        pass_word_hash = hex_sha1(password);
        if (email.length <= 0) {
            layer.msg("Mailbox cannot be empty.");
            $("#email").addClass("redBorder");
            return;
        }
        if (!(IsEmail(email))) {
            layer.msg("Email format error");
            $("#email").addClass("redBorder");
            return;
        }
        if(password.length <= 0){
            layer.msg("Password cannot be empty.");
            $("#password").addClass("redBorder");
            return;
        }
        if (name.length <= 0) {
            layer.msg("Name cannot be empty.");
            $("#name").addClass("redBorder");
            return;
        }
        var $this = $(this), btnText = $(this).text();
        if(DisableClick($this)) return;
        RegisterLa(email, pass_word_hash, name, function (response) {
            layer.msg("Registration success");
            console.log(response);
            ActiveClick($this, btnText);
        }, function (response) {
            layer.msg(response.errmsg);
            ActiveClick($this, btnText);
        });
    })
});