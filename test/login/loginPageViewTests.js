TestCase("LoginPageViewTests", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_get_functions_use_correct_keys : function() {
        var browserDomMock = mockControl.createStrictMock(browser.DOM);

        browserDomMock.expects().getValue("#username").toReturn("bob");
        browserDomMock.expects().getValue("#password").toReturn("password");

        var loginPageView = new LoginPageView();

        assertEquals("bob", loginPageView.getUsername());
        assertEquals("password", loginPageView.getPassword());
    },

    test_show_invalid_credentials_error_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Display);
        browserDisplayMock.expects().showError("#message", "Please enter your login details");

        var loginPageView = new LoginPageView();
        loginPageView.showInvalidCredentialsError();
    },

    test_show_login_error_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Display);
        browserDisplayMock.expects().showError("#message", "We were unable to log you in with the details supplied");

        var loginPageView = new LoginPageView();
        loginPageView.showLoginError();
    },

    test_show_login_successful_displays_message_correctly : function() {
        var browserDisplayMock = mockControl.createStrictMock(browser.Display);

        browserDisplayMock.expects().showMessage("#message", "Welcome back!");

        var loginPageView = new LoginPageView();
        loginPageView.showLoginSuccessful();
    },

    test_add_login_handler_registers_callback_for_event : function() {
        var callback = function() { alert("Hello")};

        var browserDomMock = mockControl.createStrictMock(browser.DOM);

        browserDomMock.expects().addClickHandler("#loginButton", callback);

        var loginPageView = new LoginPageView();
        loginPageView.addLoginHandler(callback);
    }
});