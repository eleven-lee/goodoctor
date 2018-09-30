$(document).ready(function () {
    $(".tab-header1 li").on("click", function (e) {
        e.preventDefault();
        var i=$(this).index();
        $(".tab-header1 li").removeClass("active").eq(i).addClass("active"),
        $(".content .m-box").removeClass("active").eq(i).addClass("active")
    });
});
