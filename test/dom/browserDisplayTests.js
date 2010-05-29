TestCase("BrowserDisplayTests", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_show_message_displays_message_correctly : function() {
        var browserDomMock = mockControl.createStrictMock(browser.DOM);

        browserDomMock.expects().setText("#message", "message");
        browserDomMock.expects().removeClass("#message", "error");
        browserDomMock.expects().fadeIn("#message");

        browser.Display.showMessage("#message", "message");
    },

    test_show_error_displays_error_correctly : function() {
        var browserDomMock = mockControl.createStrictMock(browser.DOM);
        browserDomMock.expects().setText("#error", "error");
        browserDomMock.expects().addClass("#error", "error");
        browserDomMock.expects().fadeIn("#error");

        browser.Display.showError("#error", "error");
    }
});