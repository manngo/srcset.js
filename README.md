srcset
======

JavaScript Widget to implement srcset attribute of &lt;img&gt; element.

srcset allows you to specify a list of alternative sources for an img element. This allows the browser to match an image to the screen properties, producing a responsive image.

Currently, this is limited to screen width. The next version will include screen resolution, once I work out the most practical way to do this cross-browser.

Usage
-----

In your HTML img element, add a src attribute as follows:

	<img src="kangaroo.jpg" srcset="kangaroo.jpg, wombat.jpg 400w, emu.jpg 800w">

In principal, supporting browsers should ignore the original src attribute, which is repeated in the srcset attribute. The additional images are followed by their minimum screen width requirment.

For your JavaScript add something like the following:

    <script type="text/javascript" src="srcset.js"></script>
	<script type="text/javascript">
		if(window.addEventListener) window.addEventListener('load',init',false);
		else window.attachEvent('onload',init');	//	Legacy browsers; srcset won’t work anyway

		function init() {
			doSrcset();
			//	etc
		}

That should do the job.

Sample
------

[Sample](sample/srcset.html)

Browser Support
---------------

Eventually this widget won’t be necessary. Currently it tests whether srcset support is natively implemented and exits if so.

In the meantime it supports all browsers which support the JavaScript matchMedia() method. This means all modern browsers, as well as IE10+.

For the most part, the browsers which most need responsive images, that is, the ones on mobile devices, are supported. However, for the rare device which hase IE8 or IE9, it doesn’t work.

Possible Enhancements
---------------------

1	Support for screen resolutions.

2	Support for IE8 & IE9.

Disclaimer
----------

This product doeswhat it does and doesn’t do what it doesn‘t do.
