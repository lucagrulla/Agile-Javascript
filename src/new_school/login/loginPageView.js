function LoginPageView() {
    this.getUsername = function() {
        return $("#username").val();
    };

    this.getPassword = function() {
        return $("#password").val();
    };

    this.addLoginHandler= function(callback) {
        $("#loginButton").click(function(e) {callback(e)});
    };

    this.showLoginSuccessful = function() {
        browser.Animations.showMessage("#message", "Welcome back!");
    };

    this.showInvalidCredentialsError = function() {
        browser.Animations.showError("#message", "Please enter your login details");
    };

    this.showLoginError = function() {
        browser.Animations.showError("#message", "We were unable to log you in with the details supplied");
    };
}