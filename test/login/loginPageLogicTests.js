TestCase("LoginPageLogicSmokeTest", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_adds_login_button_event_handler : function() {
        var loginPageViewMock = mockControl.createStrictMock(LoginPageView);
        loginPageViewMock.expects().addLoginHandler(Arg.isA(Function));

        var loginPageLogic = new LoginPageLogic(loginPageViewMock);
        loginPageLogic.init();
    },

    test_shows_login_error_if_username_not_entered : function() {
        var loginHandlerCallback;

        var loginPageViewMock = mockControl.createStrictMock(LoginPageView);

        loginPageViewMock.expects().addLoginHandler(Arg.isA(Function)).toExecute(function(callback) { loginHandlerCallback = callback});
        loginPageViewMock.expects().getUsername().toReturn("");
        loginPageViewMock.expects().getPassword().toReturn("password");
        loginPageViewMock.expects().showInvalidCredentialsError();

        var loginPageLogic = new LoginPageLogic(loginPageViewMock, null);
        loginPageLogic.init();

        loginHandlerCallback({ preventDefault : function() {}});
    },

    test_shows_login_error_if_password_not_entered : function() {
        var loginHandlerCallback;

        var loginPageViewMock = mockControl.createStrictMock(LoginPageView);

        loginPageViewMock.expects().addLoginHandler(Arg.isA(Function)).toExecute(function(callback) { loginHandlerCallback = callback});
        loginPageViewMock.expects().getUsername().toReturn("username");
        loginPageViewMock.expects().getPassword().toReturn("");
        loginPageViewMock.expects().showInvalidCredentialsError();

        var loginPageLogic = new LoginPageLogic(loginPageViewMock, null);
        loginPageLogic.init();

        loginHandlerCallback({ preventDefault : function() {}});
    },

    test_calls_the_authentication_service_to_perform_the_login_with_correct_callbacks : function() {
        var loginHandlerCallback;

        var loginPageViewMock = mockControl.createDynamicMock(LoginPageView);
        var authenticationServiceMock = mockControl.createStrictMock(AuthenticationService);

        loginPageViewMock.tells().addLoginHandler(Arg.isA(Function)).toExecute(function(callback) { loginHandlerCallback = callback});
        loginPageViewMock.tells().getUsername().toReturn("username");
        loginPageViewMock.tells().getPassword().toReturn("password");

        authenticationServiceMock.expects().login("username", "password",
                                                 loginPageViewMock.showLoginSuccessful,
                                                 loginPageViewMock.showLoginError);

        var loginPageLogic = new LoginPageLogic(loginPageViewMock, authenticationServiceMock);
        loginPageLogic.init();

        loginHandlerCallback({ preventDefault : function() {}});
    },

    test_prevents_the_event_from_bubbling_when_logging_in : function() {
        var loginHandlerCallback;

        var eventMock = mockControl.createStrictMock(Event);
        var loginPageViewMock = mockControl.createDynamicMock(LoginPageView);
        var authenticationServiceMock = mockControl.createDynamicMock(AuthenticationService);

        loginPageViewMock.expects().addLoginHandler(Arg.isA(Function)).toExecute(function(callback) { loginHandlerCallback = callback});
        loginPageViewMock.expects().getUsername().toReturn("username");
        loginPageViewMock.expects().getPassword().toReturn("password");

        eventMock.expects().preventDefault();

        var loginPageLogic = new LoginPageLogic(loginPageViewMock, authenticationServiceMock);
        loginPageLogic.init();

        loginHandlerCallback(eventMock);
    }
});