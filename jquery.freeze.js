/*
 * jquery.freeze.js - 0.1.0
 * (c) 2013 Byron Ruth & The Children's Hospital of Philadelphia
 * jquery.freeze.js may be freely distributed under the BSD license
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(exports.jQuery);
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function($) {
    $.freeze = function(options) {
        options = options || {};

        var el, page = [], clone;

        // start with doctype
        page.push('<!doctype html>');

        // build the html tag since this cannot be captured as a child
        // node
        page.push('<html');

        $.each($('html')[0].attributes, function() {
            page.push(' ' + this.name + '="' + this.value + '"');
        });

        page.push('>');

        // ensure all user-entered values are set as hard attributes
        $(':text').each(function() {
            el = $(this);
            el.attr('value', el.val());
        });

        $('textarea').each(function() {
            el = $(this);
            el.prop('innerText', el.val());
        });

        $('select').each(function() {
            $('option', this).each(function() {
                el = $(this);
                if (el.attr('selected')) {
                    this.setAttribute('selected', '');
                } else {
                    el.removeAttr('selected');
                }
            });
        });

        $(':checkbox, :radio').each(function() {
            el = $(this);
            if (el.attr('checked')) {
                this.setAttribute('checked', '');
            } else {
                el.removeAttr('checked');
            }
        });

        // clone the DOM tree
        clone = $('html').clone();

        // set the type of scripts to something not understandable
        // to prevent execution
        clone.find('script').attr('type', 'text/void-javascript');

        // remove additional elements, if specified
        if (options.exclude) {
            clone.find(options.exclude).remove();
        }

        // make all clickable elements not do anything
        clone.find('a,button,input[type=button],input[type=submit]').attr({
            'onClick': 'return false'
        });

        return page.join('') + clone.html() + '</html>';
    };
}));
