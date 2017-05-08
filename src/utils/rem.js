(function (doc, win) {
    let docEl = doc.documentElement
    let evType = 'resize'
    let evHandle = function () {
        docEl.style.fontSize = 20 * doc.body.clientWidth / 320 + 'px'
    }
    win.addEventListener(evType, evHandle, false)
    evHandle()
})(document, window)
