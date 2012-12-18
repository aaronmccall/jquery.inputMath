/*!
 * Copyright 2010 Aaron McCall. MIT License (see http://www.opensource.org/licenses/mit-license.php)
 * Allows performing simple arithmetic operations (including nested sub-operations) in input fields by prefixing them with
 * the '=' sign. For example, =2+2, =10*(2-5), etc. Default behavior is to evaluate upon blur event.
 */
(function($){
    var ops = {
            add: function (ig, add1, add2) {
                console.log(arguments);
                return (1*add1) + (1*add2);
            },
            divide: function (ig, dividend, divisor) {
                return (1*dividend) / (1*divisor);
            },
            multiply: function (ig, mult1, mult2) {
                return (1*mult1) * (1*mult2);
            },
            subtract: function (ig, min, sub) {
                return (1*min) - (1*sub);
            }
        },
        op_map = {
            "+": ops.add,
            "-": ops.subtract,
            "*": ops.multiply,
            "/": ops.divide
        },
        order_of_ops = ["multiply", "divide", "add", "subtract"],
        patterns = {
            add: /(-?[\d\.]+)\+(-?[\d\.]+)/,
            divide: /(-?[\d\.]+)\/(-?[\d\.]+)/,
            multiply: /(-?[\d\.]+)\*(-?[\d\.]+)/,
            subtract: /(-?[\d\.]+)\-(-?[\d\.]+)/
        },
        group_pattern = /(\([^\(\)]+\))/,
        op_pattern = /\(?(-?[\d\.]+)([\+\*\/\-])(-?[\d\.]+)\)?/,
        group_iter = 0,
        parser = function (operations) {
            var clean = operations.replace(/([^\d\.\(\)\+\-\*\/])/g, ''),
                result = clean;
            while (result.match(group_pattern) && group_iter < 100) {
                result = result.replace(group_pattern, replacer);
                group_iter += 1;
            }

            $.each(order_of_ops, function (i, operation) {
                var pattern = patterns[operation],
                    op = ops[operation];
                while (result.match(pattern)) {
                    result = result.replace(pattern, op);
                }
            });
            return result;
        },
        replacer = function (ig, op) {
            var postop = op.replace(op_pattern, resolver);
            return postop;
        },
        resolver = function (ig, one, op, two) {
            return op_map[op](ig, one, two);
        };

    $.fn.inputMath = function(event_name, selector){
        this.on(event_name||'blur', selector, function(e){
            var _val = this.value;
            if (_val.charAt(0) === '=') {
                _val = parser(_val);
                //The regex strips out all characters that are not a digit, a period, a parens or an arithmetic operator
                if (!isNaN(_val)) this.value = _val;
            }
        });
        return this;
    };
})(jQuery);
