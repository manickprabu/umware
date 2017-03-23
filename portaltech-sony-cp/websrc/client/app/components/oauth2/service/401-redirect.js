angular.module('oauth2').service('oauth2401Redirect', function ($location) {
    var url;
    var back;
    this.go = function runGo() {
        if (url) {
            back = $location.path();
            $location.path(url);
        }
    };
    this.url = function (value) {
        if (value) {
            url = value;
        }
        return url;
    };
    this.back = function () {
        if (back) {
            $location.path(back);
        }
        return back;
    };
});
