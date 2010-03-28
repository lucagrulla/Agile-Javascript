TestCase("LoginPageViewTests", {
    testGetFunctionsUseCorrectKeys : function() {
        jack(function() {
            jack.expect("browser.DOM.getValue").withArguments("#username").returnValue("bob");
            jack.expect("browser.DOM.getValue").withArguments("#password").returnValue("password");

            var loginPageView = new LoginPageView();

            assertEquals("bob", loginPageView.getUsername());
            assertEquals("password", loginPageView.getPassword());
        });
    },

    testShowInvalidCredentialsErrorDisplaysMessageCorrectly : function() {
        jack(function() {
            jack.expect("browser.Display.showError").withArguments("#message", "Please enter your login details");

            var loginPageView = new LoginPageView();
            loginPageView.showInvalidCredentialsError();
        });
    },

    testShowLoginErrorDisplaysMessageCorrectly : function() {
        jack(function() {
            jack.expect("browser.Display.showError").withArguments("#message", "We were unable to log you in with the details supplied");

            var loginPageView = new LoginPageView();
            loginPageView.showLoginError();
        });
    },

    testShowLoginSuccessfulDisplaysMessageCorrectly : function() {
        jack(function() {
            jack.expect("browser.DOM.showMessage").withArguments("#message", "Welcome back!");

            var loginPageView = new LoginPageView();
            loginPageView.showLoginSuccessful();
        });
    },

    testAddLoginHandlerRegistersCallbackForEvent : function() {
        jack(function() {
            var callback = function() { alert("Hello")};

            jack.expect("browser.DOM.addClickHandler").withArguments("#loginButton", callback);

            var loginPageView = new LoginPageView();
            loginPageView.addLoginHandler(callback);
        });

    }
});