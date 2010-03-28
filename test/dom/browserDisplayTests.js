TestCase("BrowserDisplayTests", {
    testShowMessageDisplaysMessageCorrectly : function() {
        jack(function() {
            jack.expect("browser.DOM.setText").withArguments("#message", "message");
            jack.expect("browser.DOM.removeClass").withArguments("#message", "error");
            jack.expect("browser.Display.fadeIn").withArguments("#message");

            browser.Display.showMessage("#message", "message");
        });
    },

    testShowErrorDisplaysErrorCorrectly : function() {
        jack(function() {
            jack.expect("browser.DOM.setText").withArguments("#error", "error");
            jack.expect("browser.DOM.addClass").withArguments("#error", "error");
            jack.expect("browser.Display.fadeIn").withArguments("#error");

            browser.Display.showError("#error", "error");
        });
    }
});