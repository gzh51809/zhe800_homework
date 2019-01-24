let remFlexible = () => {
    // 把尺寸放大N倍（N是window.devicePixelRatio）
    let windowWidth = window.screen.width * window.devicePixelRatio / 10;

    //物理像素*设备像素比=真实像素
    document.querySelector('html').style.fontSize = windowWidth + "px";

    // 把屏幕的倍率缩小到N分之一（N是window.devicePixelRatio）
    let scale = 1 / window.devicePixelRatio;

    document.querySelector('meta[name="viewport"]').content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';
};

window.addEventListener('resize', remFlexible);
window.addEventListener('pageshow', remFlexible);
remFlexible();

/**
 * 苹果上阻止用户缩放界面
 */
let touchstart = event => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
};

let lastTouchEnd = 0;
let touchend = event => {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 1000 && event.cancelable) {
        event.preventDefault();
    }
    lastTouchEnd = now;
};

let gesturestart = event => event.preventDefault();

document.addEventListener('touchstart', touchstart);
document.addEventListener('touchend', touchend, false);
document.addEventListener('touchcancel', touchend, false);
document.addEventListener('gesturestart', gesturestart);

window.onunload = () => {
    window.removeEventListener('resize', remFlexible);
    window.removeEventListener('pageshow', remFlexible);
    remFlexible = null;

    document.removeEventListener('touchstart', touchstart);
    document.removeEventListener('touchend', touchend);
    document.removeEventListener('touchcancel', touchend);
    document.removeEventListener('gesturestart', gesturestart);
    touchstart = null;
    touchend = null;
    gesturestart = null;
};

