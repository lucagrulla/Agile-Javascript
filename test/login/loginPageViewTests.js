TestCase("LoginPageViewTests", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_show_invalid_credentials_error_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Animations);
        browserDisplayMock.expects().showError("#message", "Please enter your login details");

        var loginPageView = new LoginPageView();
        loginPageView.showInvalidCredentialsError();
    },

    test_show_login_error_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Animations);
        browserDisplayMock.expects().showError("#message", "We were unable to log you in with the details supplied");

        var loginPageView = new LoginPageView();
        loginPageView.showLoginError();
    },

    test_show_login_successful_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Animations);

        browserDisplayMock.expects().showMessage("#message", "Welcome back!");

        var loginPageView = new LoginPageView();
        loginPageView.showLoginSuccessful();
    }
});