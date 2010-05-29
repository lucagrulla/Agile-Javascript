browser = {};

browser.DOM = {
    getValue : function(elementId) {
       return $(elementId).val();
    },

    setValue : function(elementId, value) {
        $(elementId).val(value);
    },

    setText : function(elementId, text) {
        $(elementId).text(text);
    },

    addClickHandler : function(selector, clickHandler)  {
       $(selector).click(function(e) {clickHandler(e)});
    },

    addClass : function(selector, styleClass) {
        $(selector).addClass(styleClass);
    },

    removeClass : function(selector, styleClass) {
        $(selector).removeClass(styleClass);
    },

    fadeIn : function(selector) {
        $(selector).fadeIn();
    }
};


browser.Display = {
    showMessage : function(selector, message) {
        browser.DOM.setText(selector, message);
        browser.DOM.removeClass(selector, "error");
        browser.DOM.fadeIn(selector);
    },

    showError : function(selector, error) {
        browser.DOM.setText(selector, error);
        browser.DOM.addClass(selector, "error");
        browser.DOM.fadeIn(selector);
    }
};

browser.HTTP = {
    post : function(url, myData, successCallback, errorCallback) {
       /*
        $.ajax({
            url: url,
            type:"POST",
            data:myData,
            success: successCallback,
            error: errorCallback

        }); */
        successCallback();
    }
};
