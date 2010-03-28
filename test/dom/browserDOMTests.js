TestCase("BrowserDOMTests", {
    testSetValueSetsTheValueCorrectly : function() {
        $("body").append("<input id='testId' type='text'/>");

        browser.DOM.setValue("#testId", "Hello");

        assertEquals($("#testId").val(), "Hello");
    },

    testGetValueGetsTheValueCorrectly : function() {
        $("body").append("<input id='testId' type='text'/>");
        $("#testId").val("Hello Again");

        assertEquals(browser.DOM.getValue("#testId"), "Hello Again");
    },

    testSetTextSetsTheTextCorrectly : function() {
        $("body").append("<div id='testId'/>");

        browser.DOM.setText("#testId", "Hello Text");

        assertEquals($("#testId").text(), "Hello Text");
    },

    testAddClickHandlerAddsEventHandlerCorrectly : function() {
        $("body").append("<input id='testId' type='button'/>");

        var eventHandlerCalled = false;

        browser.DOM.addClickHandler("#testId", function() {
            eventHandlerCalled = true;
        });

        $("#testId").click();
    },

    testAddClassAddsTheClassCorrectly : function() {
        $("body").append("<div id='testId'/>");

        browser.DOM.addClass("#testId", "error");

        assertTrue($("#testId").hasClass("error"));
    },

    testRemoveClassRemovesTheClassCorrectly : function() {
        $("body").append("<div id='testId' class='error'/>");

        browser.DOM.removeClass("#testId", "error");

        assertFalse($("#testId").hasClass("error"));
    }
});