# jquery.freeze

jQuery extension for freezing the state of the DOM and serializing as a string. The original use of this was to capture the state of the screen for auditing purposes.

## Install

**Bower**

```bash
bower install jquery-freeze
```

**NPM**

```bash
npm install jquery-freeze
```

**Raw**

```bash
curl https://raw.github.com/cbmi/jquery.freeze/master/jquery.freeze.js
```

## Include

As a script:

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.freeze.js"></script>
```

Or as a AMD module:

```javascript
require(['jquery.freeze'], function($) {
    // ...
});
```

## Use

```javascript
// Bind to button or listen for a event, freeze the dom and send
// a POST to log the document. The server-side could write the data
// to an HTML file for later viewing.
$('#freezer').click(function(event) {
    event.preventDefault();
    $.post('/screenlog/', $.param({document: $.freeze()}));
});
```
