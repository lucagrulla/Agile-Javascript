TestCase("AuthenticationServiceTests", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_authentication_service_delegates_to_the_browser_to_perform_authentication : function() {
        var successCallback = function() { return true; };
        var errorCallback = function() { return false; };

        var browserHttpMock = mockControl.createStrictMock(browser.HTTP);

        browserHttpMock.expects().post("http://localhost/login", Arg.sameAs({username: "username", password: "password"}),
                                       successCallback, errorCallback);

        var authenticationService = new AuthenticationService("http://localhost/login");
        authenticationService.login("username", "password", successCallback, errorCallback);
    }
});