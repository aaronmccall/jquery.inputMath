(function($){
    $.fn.inputMath = function(options){
//        debug(this);
        var defaults = {
            warnClass: 'warning'
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
        
        this.blur(function(e){
            var _val = this.value;
            if (_val.charAt(0) === '=') {
                _regex = /([\+\-\*\/])/g;
                _op = _val.match(_regex);
                if (_op) {
                    _clean = _val.replace(/[\=]/, '');
                    _operands = _clean.split(_op[0]);
                    if (_operands.length > 2 || _op.length > 1) {
                        $(this).keypress(function(){
                            $(this).next('span.' + opts.warnClass).remove();
                        }).after('<span class="' + opts.warnClass + ' big"/>')
                          .next('span.' + opts.warnClass)
                          .html('&#' + parseInt('26A0',16) + ';');
                        return false;
                    } 
                    if (isFloat(_clean)) {
                        _expression = [parseFloat(_operands[0]), _op[0], parseFloat(_operands[1])].join(' ');
                    } else {
                        _expression = [parseInt(_operands[0]), _op[0], parseInt(_operands[1])].join(' ');
                    }
                    _result = eval(_expression);
                    if (!isNaN(_result)) {
                        this.value =  _result;
                    }
                    
                }
            }    
            if (opts.after) opts.after();
        });
        
        return this;
    };
})(jQuery);
