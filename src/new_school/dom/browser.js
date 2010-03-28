        browser = {};

        browser.DOM = {
        getValue : function(elementId) {
           return $(elementId).val();
        },

        setValue : function(elementId, value) {
            $(elementId).val(value);
        },

        addClickHandler : function(selector, clickHandler)  {
           $(selector).click(function(e) {clickHandler(e)});
        },

        addClass : function(selector, styleClass) {
            $(selector).addClass(styleClass);
        },

         fadeIn : function(selector) {
            $(selector).fadeIn();
        }
        };


        browser.Display = {
        showError : function(selector, error) {
            browser.DOM.setText(selector, error);
            browser.DOM.addClass(selector, "error");
            browser.DOM.fadeIn(selector);
        }

        };

        browser.HTTP = {
        post : function(url, myData, successCallback, errorCallback) {
            $.ajax({
                url: url,
                type:"POST",
                data:myData,
                success: successCallback,
                error: errorCallback

            });
        }
        };
