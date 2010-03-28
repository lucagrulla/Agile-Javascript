    function LoginPageLogic(view, authenticationService) {
        return createApi();

        function createApi() {
            return {
                init : init
            }
        }

        function init() {
            view.addLoginHandler(validateCredentials)
        }
    
        function validateCredentials(e) {
            var username = view.getUsername();
            var password = view.getPassword();

            var credentialValid = (username && username !== "") && (password && password !== "");

            if (credentialValid) {
                authenticationService.login(username, password, view.showLoginSuccessful, view.showLoginError);
            }else {
                view.showInvalidCredentialsError();
            }

            e.preventDefault();
        }
    }


    $(document).ready(function() {
        var authenticationService = new AuthenticationService("http://localhost/authentication");

        var loginPageView = new LoginPageView();
        var loginPageLogic = new LoginPageLogic(loginPageView, authenticationService);

        loginPageLogic.init();
    });