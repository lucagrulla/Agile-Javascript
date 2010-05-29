TestCase("BrowserDOMTests", {
    test_set_value_sets_the_value_correctly : function() {
        $("body").append("<input id='testId' type='text'/>");

        browser.DOM.setValue("#testId", "Hello");

        assertEquals($("#testId").val(), "Hello");
    },

    test_get_value_gets_the_value_correctly : function() {
        $("body").append("<input id='testId' type='text'/>");
        $("#testId").val("Hello Again");

        assertEquals(browser.DOM.getValue("#testId"), "Hello Again");
    },

    test_set_text_sets_the_text_correctly : function() {
        $("body").append("<div id='testId'/>");

        browser.DOM.setText("#testId", "Hello Text");

        assertEquals($("#testId").text(), "Hello Text");
    },

    test_add_click_handler_adds_event_handler_correctly : function() {
        $("body").append("<input id='testId' type='button'/>");

        var eventHandlerCalled = false;

        browser.DOM.addClickHandler("#testId", function() {
            eventHandlerCalled = true;
        });

        $("#testId").click();
    },

    test_add_class_adds_the_class_correctly : function() {
        $("body").append("<div id='testId'/>");

        browser.DOM.addClass("#testId", "error");

        assertTrue($("#testId").hasClass("error"));
    },

    test_remove_class_removes_the_class_correctly : function() {
        $("body").append("<div id='testId' class='error'/>");

        browser.DOM.removeClass("#testId", "error");

        assertFalse($("#testId").hasClass("error"));
    }
});