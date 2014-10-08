srcset.js
=========

JavaScript Widget to implement srcset attribute of &lt;img&gt; element.

srcset allows you to specify a list of alternative sources for an img element. This allows the browser to match an image to the screen properties, producing a responsive image.

You can download the latest version [here](https://github.com/manngo/srcset/releases/latest) …

Usage
-----

###HTML

In your HTML img element, add a src attribute as follows:

```html
	<img src="images/oh1x408.jpg"
		srcset="images/oh1x192.jpg, images/oh1x408.jpg 420w,
		images/oh2x192.jpg 2x,
		images/oh2x408.jpg 2x 420w">
```

The `srcset` attribute contains a list of images, and possibly a width (w) or a resolution (x) requirement. For example, the last image in the above list will only be used if the window has at least 420px and is at least double resolution.

Note that the official specification is unclear on this. It implies that only one of width or resolution may be used, but most samples and turorials around the place allow for both. This needs checking.

In principal, supporting browsers should ignore the original src attribute, which is repeated in the srcset attribute.

###JavaScript

For your JavaScript add something like the following:

```html
    <script type="text/javascript" src="srcset.js"></script>
	<script type="text/javascript">
		if(window.addEventListener) window.addEventListener('load',init',false);
		else window.attachEvent('onload',init');	//	Legacy browsers; srcset won’t work anyway

		function init() {
			doSrcset();
			//	etc
		}
```

That should do the job.

Sample
------

Click [Here](https://manngo.github.io/srcset.js/sample/srcset.html) for a sample.

Change the screen width and see the different images replace the curren ones. If you use Firefox’s responsive design tool, it’s just a matter of dragging the edge of the container.

Browser Support
---------------

Eventually this widget won’t be necessary. Currently it tests whether srcset support is natively implemented and exits if so.

In the meantime it supports all browsers which support the JavaScript matchMedia() method. This means all modern browsers, as well as IE10+.

For the most part, the browsers which most need responsive images, that is, the ones on mobile devices, are supported. However, for the rare device which hase IE8 or IE9, it doesn’t work.

###Current Support

A number of newer versions of browsers are beginning to implement ```srcset```, but only for screen resolution. This has proven to be a problem, since this can actually stop this code from working.

However, the code does work, by disabling the in-built ```srcset```. This is clearly a hack.

Possible Enhancements
---------------------

Support for IE8 & IE9.

Disclaimer
----------

Usual stuff:

* This product does what it does and doesn’t do what it doesn‘t do.
* It probably won’t break anything, but if it does, it’s all lies I tell you, it wasn’t me, it was someone who looks like me, I’ve never heard of the place, I don’t know what you’re talking about, and, if you’re talking about Room 403, I’ve never heard if it.
