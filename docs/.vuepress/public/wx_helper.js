ENABLE_LOG = false;
ENABLE_FOR_AUDIT = false;

function post_to_wx() {
    var obj = {
        'msgType': "heartbeat",
        'shareTitle': document.title,
        'shareURL': document.URL,
        'scrollTop': document.documentElement.scrollTop,
        'time': (new Date()).valueOf()
    };
    wx.miniProgram.postMessage({
        data: obj
    });
    wx.miniProgram.getEnv(function (res) {
        window.is_miniprogram = res.miniprogram;
    });
}
setInterval(post_to_wx, 1000);

function handleOutURL(url, whitelist_flag, file_flag, file_ext) {
    if (ENABLE_LOG) {
        console.log("劫持链接 " + url);
    }
    if (!ENABLE_FOR_AUDIT) {
        wx.miniProgram.navigateTo({
            url: '/pages/index/redirect?outURL=' + encodeURIComponent(url) +
                '&inwhitelist=' + whitelist_flag +
                '&handleFile=' + file_flag +
                '&ext=' + file_ext,
        });
    }
}

function override_onclick(event) {
    /// 优化小程序内的文件或者外链显示
    if (window.is_miniprogram) {
        let url = event.currentTarget.getAttribute('href');

        let url_obj = new URL(url);
        let whitelist = new Set();
        whitelist.add("hkust-gz.edu.cn");
        whitelist.add("hkust-gz.online");
        whitelist.add("myportal.hkust-gz.edu.cn");
        whitelist.add("");

        let supportFiles = new Set();
        supportFiles.add("doc");
        supportFiles.add("docx");
        supportFiles.add("xls");
        supportFiles.add("xlsx");
        supportFiles.add("ppt");
        supportFiles.add("pptx");
        supportFiles.add("pdf");
        let the_hostname = url_obj.hostname;
        let path_ext = url_obj.pathname.split('.').pop().toLowerCase();
        let whitelist_flag = whitelist.has(the_hostname);
        let file_flag = supportFiles.has(path_ext);
        if (whitelist_flag && !file_flag) {
            // 当 url 在白名单里面，且不为可微信显示的文件。
            if (ENABLE_LOG) {
                console.log("放行白名单页面 " + url);
            }
            window.location.href = url;
            return;
        }

        event.preventDefault();
        if (ENABLE_LOG) {
            console.log("小程序环境，拦截外部链接或者可显示文件。");
        }
        handleOutURL(url, whitelist_flag, file_flag, path_ext);
    }
}

function reset_all_anchor() {
    var anchors = document.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.hasAttribute("data-fancybox")) {
            if (ENABLE_LOG) {
                console.log("skip fancybox a tag: ", anchor.getAttribute('href'));
            }
        } else {
            anchor.onclick = function (event) {
                override_onclick(event);
            }
        }
    }
}
setInterval(reset_all_anchor, 1000);

// 港科广手册不接入 Google AdSense，也不需要哀悼黑白遮罩。
