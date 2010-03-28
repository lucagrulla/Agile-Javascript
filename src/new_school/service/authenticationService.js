function AuthenticationService(serviceUrl) {
    return createApi();

    function createApi() {
        return {
            login:login
        }
    }

    function login(username, password, successCallback, errorCallback) {
        browser.HTTP.post(serviceUrl, {username:username, password:password},
                          successCallback, errorCallback);   
    }
}