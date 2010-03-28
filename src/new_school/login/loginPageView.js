    function LoginPageView() {
        return createApi();

        function createApi() {
            return {
                getUsername : getUsername,
                getPassword : getPassword,
                addLoginHandler : addLoginHandler,
                showInvalidCredentialsError : showInvalidCredentialsError,
                showLoginSuccessful : showLoginSuccessful,
                showLoginError : showLoginError
            }
        }

        function getUsername() {
            return browser.DOM.getValue("#username");
        }

        function getPassword() {
            return browser.DOM.getValue("#password");
        }
    
        function addLoginHandler(callback) {
            browser.DOM.addClickHandler("#loginButton", callback);
        }

        function showLoginSuccessful() {
            browser.Display.showMessage("#message", "Welcome back!");
        }

        function showInvalidCredentialsError() {
            browser.Display.showError("#message", "Please enter your login details");
        }

        function showLoginError() {
            browser.Display.showError("#message", "We were unable to log you in with the details supplied");
        }
    }