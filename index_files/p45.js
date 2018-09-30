window.onload = function(){
    var canvas = document.getElementById('canvas'),  //获取canvas元素
        context = canvas.getContext('2d'),  //获取画图环境，指明为2d
        centerX = canvas.width/2,   //Canvas中心点x轴坐标
        centerY = canvas.height/2,  //Canvas中心点y轴坐标
        rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
        speed = 0.1; //加载的快慢就靠它了 
        
    //绘制5像素宽的运动外圈
    function blueCircle(n){
        context.save();
        context.strokeStyle = "#48ccc5"; //设置描边样式
        context.lineWidth = 10; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, 50 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }
    //绘制白色外圈
    function whiteCircle(){
        context.save();
        context.beginPath();
        context.lineWidth = 10; //设置线宽
        context.strokeStyle = "#e8e8e8";
        context.arc(centerX, centerY, 50 , 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }  
    //百分比文字绘制
    function text(n){
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.strokeStyle = "#48ccc5"; //设置描边样式
        context.font = "30px Arial"; //设置字体大小和字体
        //绘制字体，并且指定位置
        context.strokeText((n/10).toFixed(1), centerX-20, centerY+10);
        context.stroke(); //执行绘制
        context.restore();
    } 
    //动画循环
    (function drawFrame(){
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);
        whiteCircle();
        text(speed);
        blueCircle(speed);
        speed += 0.1;
        if(speed > 100) speed = 0;
    }());
}
// tab标签页切换
$(document).ready(function () {
    $(".tab-header li").on("click", function (e) {
        e.preventDefault();
        var i=$(this).index();
        $(".tab-header li").removeClass("active").eq(i).addClass("active"),
        $(".content .m-box").removeClass("active").eq(i).addClass("active")
    });
});
