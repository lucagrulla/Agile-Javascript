    loginPage = {

        setup : function() {
            $("#loginButton").click(loginPage.login)
        },

        login : function (e) {
            var username = $("#username").val();
            var password = $("#password").val();

            if (username && username !== "" && password && password !== "") {
                $.ajax({
                    url: "/login",
                    type:"POST",
                    data:{username:username, password:password},
                    success: loginPage.showLoginSuccessful,
                    error: loginPage.showLoginError
                });
            } else {
                loginPage.showInvalidCredentialsError();
            }
            e.preventDefault();
        },

        showLoginSuccessful : function() {
            $("#message").text("Welcome back!");
            $("#message").removeClass("Welcome back!");
            $("#message").fadeIn();
        },

        showInvalidCredentialsError : function() {
            $("#message").text("Please enter your login details");
            $("#message").addClass("error");
            $("#message").fadeIn();
        },

        showLoginError : function() {
            $("#message").text("We were unable to log you in with the details supplied");
            $("#message").addClass("error");
            $("#message").fadeIn();
        }
    };

    $(document).ready(function() {
        loginPage.setup();
    });