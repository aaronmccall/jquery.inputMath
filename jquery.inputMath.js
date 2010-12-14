(function($){
    $.fn.inputMath = function(options){
//        debug(this);
        var defaults = {
            warnClass: 'warning',
            event: 'blur'
        };
        
        var opts = $.extend(defaults, options);
        
        function debug($obj){
            if (window.console && window.console.log) {
                if (typeof $obj == 'object') {
                    window.console.log('element object: %o', $obj);
                } else {
                    window.console.log('element data: %s', $obj);
                }
            }
                
        };
        
        function isFloat(_str) {
            return (_str.indexOf('.') !== -1) ? true : false;
        }
        
        this.bind(opts.event, function(e){
            var _val = this.value;
            if (_val.charAt(0) === '=') {
                _regex = /([^\.\(\)\+\-\*\/])/g;
                _clean = _val.replace(_regex, '');
                debug(_clean)
                _result = eval(_expression);
                debug(_result)
                if (!isNaN(_result)) {
                    this.value =  _result;
                }
                    
            }    
            if (opts.after) opts.after(this);
        });
        
        return this;
    };
})(jQuery);
