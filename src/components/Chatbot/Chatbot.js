import React, { Component } from 'react'

export class Chatbot extends Component {
    componentDidMount() {
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"2b12cc78284a819499e9114596265b30f","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    }
    render() {
        return (
            <div></div>
        )
    }
}
