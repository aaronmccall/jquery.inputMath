/*!
 * Copyright 2010 Aaron McCall. MIT License (see http://www.opensource.org/licenses/mit-license.php)
 * Allows performing simple arithmetic operations (including nested sub-operations) in input fields by prefixing them with
 * the '=' sign. For example, =2+2, =10*(2-5), etc. Default behavior is to evaluate upon blur event.
 */
(function($){
    $.fn.inputMath = function(event_name){
        this.bind(event_name||'blur', function(e){
            var _val = this.value;
            if (_val.charAt(0) === '=') {
                //The regex strips out all characters that are not a digit, a period, a parens or an arithmetic operator
                _result = eval(_val.replace(/([^\d\.\(\)\+\-\*\/])/g, ''));
                if (!isNaN(_result)) this.value = _result;
            }    
        });
        return this;
    };
})(jQuery);
