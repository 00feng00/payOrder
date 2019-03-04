import template from 'lodash.template'
import './style.less'

let LOAD = null

function createDom(opt) {
    var dom = document.getElementById('load')
    if (!dom) {
        dom = document.createElement("div")
        dom.setAttribute("id", "load")
        dom.innerHTML = ` <div class="loadcontent"><img src="${opt.logo}" width="${opt.width}" height="${opt.height}"/><span>${opt.text}</span> </div>`
        document.documentElement.appendChild(dom)
    }
    setTimeout(() => {
        LOAD.close()
    }, opt.time * 1000)
    return dom

}

function createMark() {
    var dom = document.getElementById('mark')
    if (!dom) {
        dom = document.createElement("div")
        dom.setAttribute("id", "mark")
        dom.style.width = document.documentElement.offsetWidth
        dom.style.height = document.body.scrollHeight
        document.documentElement.appendChild(dom)
    }
    return dom

}

function Load(opt = {mark: true}) {
    var isMark = opt.mark
    var logo_src = opt.logo || "/static/loading.gif"
    var markDom = null
    this.root = createDom({
        logo: logo_src,
        width: opt.width || 50,
        height: opt.height || 50,
        text: opt.text || "",
        time: opt.time || 10
    })
    if (isMark) {
        this.markDom = createMark()
    }
}

Load.prototype.close = () => {
    var markdom = document.getElementById('mark')
    var rootdom = document.getElementById('load')
    if (markdom) {
        markdom.remove()
    }
    if (rootdom) {
        rootdom.remove()
    }
}

export default () => {
    LOAD = new Load()
    return LOAD
}