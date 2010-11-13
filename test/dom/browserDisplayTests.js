TestCase("BrowserDisplayTests", {
    setUp : function() {
        mockControl = new MockControl();
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_show_error_displays_error_correctly: function() {

        /*:DOC += <div id="message" class="message"></div> */

        browser.Animations.showError("#message", "error message");

        assertEquals($("#message").text(), "error message");
        assertTrue($("#message").hasClass("error"));
    }
});