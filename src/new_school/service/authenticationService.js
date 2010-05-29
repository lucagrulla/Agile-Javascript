function AuthenticationService(serviceUrl) {
    this.login = function(username, password, successCallback, errorCallback) {
        browser.HTTP.post(serviceUrl, {username:username, password:password},
                          successCallback, errorCallback);   
    };
}