$(function () {
    $("#email").focus(function () {
        $(this).removeClass("redBorder");
    });
    $("#password").focus(function () {
        $(this).removeClass("redBorder");
    });
    $('.signUpBtn').click(function () {
        var email = $("#email").val();
        var password = $("#password").val(),
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
        var $this = $(this), btnText = $(this).text();
        if(DisableClick($this)) return;
        LoginLa(email, pass_word_hash, function (response) {
            layer.msg("Login success");
            ActiveClick($this, btnText);
            window.location.href = "account.html"
        }, function (response) {
            layer.msg("Registration failed");
            ActiveClick($this, btnText);
        });
    })
});