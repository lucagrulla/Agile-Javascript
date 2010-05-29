function LoginPageView() {
    this.getUsername = function() {
        return browser.DOM.getValue("#username");
    };

    this.getPassword = function() {
        return browser.DOM.getValue("#password");
    };

    this.addLoginHandler= function(callback) {
        browser.DOM.addClickHandler("#loginButton", callback);    
    };

    this.showLoginSuccessful = function() {
        browser.Display.showMessage("#message", "Welcome back!");
    };

    this.showInvalidCredentialsError = function() {
        browser.Display.showError("#message", "Please enter your login details");
    };

    this.showLoginError = function() {
        browser.Display.showError("#message", "We were unable to log you in with the details supplied");
    };
}