$(function () {
    //阶段内容
    var tr = "", p = '', http = '', endDateStr = '';
    GetStageContent(function (response) {
        if(response.errcode == '0'){
            var data = response.rows;
            $.each(data, function (i, val) {
                if(data[i].content.substring(0, 4) == 'http'){
                    http = data[i].content;
                    p = "<p>" +
                        "<a class='demoLink' href="+ http +" target='_blank'>"+ http +"</a>" +
                        "</p>"
                }else if(!isNaN(data[i].content.substring(0, 4))){
                    p = "<p>" +
                        "<span>Countdown:</span>" +
                        "<span class='days'></span>Days"+
                        "<span class='hours'></span>Hours"+
                        "<span class='minutes'></span>Minutes"+
                        "<span class='seconds'></span>S"+
                        "</p>";
                    endDateStr = data[i].content;
                    setInterval(function () {
                        TimeDown(endDateStr);
                    }, 1000);
                }else {
                    p = "<p>"+ data[i].content +"</p>"
                }
                tr+="<tr>" +
                    "<td><p>"+ data[i].stage +"</p></td>" +
                    "<td>" +
                    "<p class='heading'>"+ data[i].title +"</p>" +
                    p +
                    "</td>" +
                    "</tr>";
            });
            $("#stage").html(tr);
            layer.msg(response.errmsg);
        }
    }, function (response) {
        layer.msg(response.errmsg)
    });

    //倒计时
    function TimeDown(endDateStr) {
        //结束时间
        var endDate = new Date(endDateStr);
        //当前时间
        var nowDate = new Date();
        //相差的总秒数
        var totalSeconds = parseInt((endDate - nowDate) / 1000);
        //天数
        var days = Math.floor(totalSeconds / (60 * 60 * 24));
        //取模（余数）
        var modulo = totalSeconds % (60 * 60 * 24);
        //小时数
        var hours = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        //分钟
        var minutes = Math.floor(modulo / 60);
        modulo = modulo % (60);
        //秒
        var seconds = modulo % 60;
        $(".days").text(days);
        $(".hours").text(hours);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    }
});