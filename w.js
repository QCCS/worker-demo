/**
 * Created by zhouli on 18/10/25
 */
function createXmlHttp() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("浏览器太老，不能使用ajax");
            }
        }
    }
    return xmlHttp;
}

function ajax(isAsync) {
    var v = "v";
    // 1. 创建XMLHttpRequest对象
    var xmlHttp = createXmlHttp();
    // 2. 调用open方法获取跟服务器的连接
    /*
        method: 请求方式  get post
        url：请求路径
        async：表示同步请求还是异步请求  true:异步
        */
    xmlHttp.open("GET", "https://www.baidu.com/", isAsync);

    //需要写在 send 前面，不然发送同步请求有问题
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //此时说明响应完毕  我们可以通过xml.responseText 来获取服务器的响应内容(文本内容)
            v = xmlHttp.responseText;
        }
    };
    xmlHttp.send(null);
    return v
}

this.postMessage('子线程，下面立即加载');
//同步加载
var re = ajax(false);
this.postMessage("加载完毕，注意接收");
this.postMessage(re);

this.addEventListener('message', function (e) {
    console.log("父级线程消息：" + e.data)
}, false);



