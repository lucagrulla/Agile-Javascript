TestCase("AuthenticationServiceTests", {
    testAuthenticationServiceDelegatesToTheBrowserToPerformAuthentication : function() {
        var successCallback = function() { return true; };
        var errorCallback = function() { return false; };

        jack.expect("browser.HTTP.post").whereArgument(0).is("http://localhost/login")
                .whereArgument(1).is({username: "username", password: "password"})
                .whereArgument(2).is(successCallback)
                .whereArgument(3).is(errorCallback);

        var authenticationService = new AuthenticationService(browser);
        authenticationService.login("username", "password", successCallback, errorCallback);
    }
});