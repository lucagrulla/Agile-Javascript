TestCase("LoginPageLogicSmokeTest", {
    testAddsLoginButtonEventHandler : function() {
        jack(function() {
            var loginPageViewMock = jack.create("loginPageView", ["addLoginHandler"]);

            jack.expect("loginPageView.addLoginHandler").whereArgument(0).isType(typeof Function);

            var loginPageLogic = new LoginPageLogic(loginPageViewMock);
            loginPageLogic.init();

        });
    },

    testShowsLoginErrorIfUsernameNotEntered : function() {
        jack(function() {
            var loginHandlerCallback;

            var event = jack.create("e", ["preventDefault"]);
            var loginPageViewMock = jack.create("loginPageView", ["addLoginHandler", "getUsername", "getPassword",
                                                                  "showInvalidCredentialsError"]);

            jack.expect("loginPageView.addLoginHandler").mock(function(callback) { loginHandlerCallback = callback});
            jack.expect("loginPageView.getUsername").returnValue("");
            jack.expect("loginPageView.getPassword").returnValue("password");
            jack.expect("loginPageView.showInvalidCredentialsError");

            var loginPageLogic = new LoginPageLogic(loginPageViewMock);
            loginPageLogic.init();

            loginHandlerCallback(event);

        });
    },

    testShowsLoginErrorIfPasswordNotEntered : function() {
        jack(function() {
            var loginHandlerCallback;

            var event = jack.create("e", ["preventDefault"]);
            var loginPageViewMock = jack.create("loginPageView", ["addLoginHandler", "getUsername", "getPassword",
                                                                  "showInvalidCredentialsError"]);

            jack.expect("loginPageView.addLoginHandler").mock(function(callback) { loginHandlerCallback = callback});
            jack.expect("loginPageView.getUsername").returnValue("username");
            jack.expect("loginPageView.getPassword").returnValue("");
            jack.expect("loginPageView.showInvalidCredentialsError");

            var loginPageLogic = new LoginPageLogic(loginPageViewMock);
            loginPageLogic.init();

            loginHandlerCallback(event);
        });
    },

    testCallsTheAuthenticationServiceToPerformTheLoginWithCorrectCallbacks : function() {
        jack(function() {
            var loginHandlerCallback;

            var event = jack.create("e", ["preventDefault"]);
            var loginPageViewMock = jack.create("loginPageView", ["addLoginHandler", "getUsername", "getPassword",
                                                                  "showLoginSuccessful","showLoginError"]);
            var authenticationServiceMock = jack.create("authenticationService", ["login"]);

            jack.expect("loginPageView.addLoginHandler").mock(function(callback) { loginHandlerCallback = callback});
            jack.expect("loginPageView.getUsername").returnValue("username");
            jack.expect("loginPageView.getPassword").returnValue("password");

            jack.expect("authenticationService.login").withArguments("username", "password",
                                                                     loginPageViewMock.showLoginSuccessful,
                                                                     loginPageViewMock.showLoginError);

            var loginPageLogic = new LoginPageLogic(loginPageViewMock, authenticationServiceMock);
            loginPageLogic.init();

            loginHandlerCallback(event);
        });
    },

    testPreventsTheEventFromBubblingWhenLoggingIn : function() {
        var loginHandlerCallback;

        var event = jack.create("e", ["preventDefault"]);
        var loginPageViewMock = jack.create("loginPageView", ["addLoginHandler", "getUsername", "getPassword",
                                                              "showLoginSuccessful","showLoginError"]);
        var authenticationServiceMock = jack.create("authenticationService", ["login"]);

        jack.expect("loginPageView.addLoginHandler").mock(function(callback) { loginHandlerCallback = callback});
        jack.expect("loginPageView.getUsername").returnValue("username");
        jack.expect("loginPageView.getPassword").returnValue("password");
        jack.expect("e.preventDefault");
        
        var loginPageLogic = new LoginPageLogic(loginPageViewMock, authenticationServiceMock);
        loginPageLogic.init();

        loginHandlerCallback(event);
    }
});