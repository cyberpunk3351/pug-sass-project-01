$(document).ready (function () {
    NProgress.start ();
    NProgress.set (0.2);
    setTimeout(function () {
        NProgress.done ();
    }, 2000);
});