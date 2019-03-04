export function inch2cm(inch) {
    //1厘米(cm)=0.3937008英寸(in)
    return inch / 0.3937008
}

export function cm2px(cm) {
    if (cm) {
        return 900 * cm / 180
    } else {
        return 0
    }
}

export function getAfterPostfix(str) {
    var a = str;
    if (a) {
        var index = a.indexOf('.');
        var b = a.slice(index, a.length);
        return b
    }
}


export function getNameWithoutPostfix(str) {
    var a = str;
    if (a) {
        var index = a.indexOf('.');
        var b = a.slice(0, index);
        return b
    }
}