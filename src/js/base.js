let remFlexible = () => {
    //计算dpr
    let dpr = Math.min(window.devicePixelRatio || 1, 3);

    // 把尺寸放大N倍（N是window.devicePixelRatio）
    let rem = window.screen.width * dpr / 10;

    //物理像素*设备像素比=真实像素
    document.querySelector('html').style.fontSize = rem + "px";

    // 把屏幕的倍率缩小到N分之一（N是window.devicePixelRatio）
    let scale = 1 / dpr;

    document.querySelector('meta[name="viewport"]').content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';
};

window.addEventListener('resize', remFlexible);
window.addEventListener('pageshow', remFlexible);
remFlexible();

/**
 * 苹果全局处理input、textarea
 */
let inputTouch = event => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        event.target.focus();
        setTimeout(() => window.scrollTo(0,window.scrollY + event.target.offsetHeight), 100);
    } else if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        document.activeElement.blur();
    }
    event.stopPropagation();
};

if (navigator.platform === 'iPhone' || navigator.platform === 'iPad' ){
    document.addEventListener('touchend', inputTouch, {passive: false});
}

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
    document.removeEventListener('touchend', inputTouch);
    document.removeEventListener('touchcancel', touchend);
    document.removeEventListener('gesturestart', gesturestart);
    touchstart = null;
    touchend = null;
    gesturestart = null;
};

