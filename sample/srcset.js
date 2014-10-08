/*	srcset
	================================================

	JavaScript Widget to implement srcset attribute of <img> element.

	Usage:

	JavaScript
	==========

		<script type="text/javascript" src="scripts/srcset.js"></script>
		<script type="text/javascript">
			if(window.addEventListener) window.addEventListener('load',init',false);
			else window.attachEvent('onload',init');	//	Legacy browsers; srcset won’t work anyway

			function init() {
				doSrcset();
				//	etc
			}
	`

			window.onload=init;

			function init() {
				doSrcset();
			}

		</script>

	Sample HTML
	===========

		<img src="images/oh1x408.jpg" srcset="images/oh1x192.jpg, images/oh1x408.jpg 420w, images/oh2x192.jpg 2x, images/oh2x408.jpg 2x 420w">

	================================================ */

	'use strict';
	function doSrcset() {
		//	Check whether necessary or possible
//			if('srcset' in new Image()) return;
			if(!window.matchMedia) return;

		//	Setup; get image elements, if any
			var i,j,k,m,images=[], img, srcset, src, details;
			var elements=document.getElementsByTagName('img');
			if(!elements.length) return;
		//	Convert srcset attributes
			for(var i=0;i<elements.length;i++) {
				var img=elements[i];
				var mq;

				if(srcset=img.getAttribute('srcset')) {
					srcset=srcset.split(/\s*,\s*/);
					for(var j=0;j<srcset.length;j++) {
						details=srcset[j].split(/\s+/);
						src	={src:'',w:0,x:'', mq:''};
						for(k=0;k<details.length;k++) {
							if(m=details[k].match(/^(\d+)w$/)) src['w']=parseInt(m[1]);
							else if(m=details[k].match(/^(\d+)x$/)) src['x']=m[1];
							else src['src']=details[k];

							if(src['w']) {
								if(src['x']) {
									mq='(min-width: %spx) and (-webkit-min-device-pixel-ratio: %s),(min-width: %spx) and (min-resolution: %sdppx)';
									src['mq']=mq.sprintf(src['w'],src['x'],src['w'],src['x']);
								}
								else src['mq']='(min-width: '+src['w']+'px)';
							}
							else if(src['x']) {
									mq='(-webkit-min-device-pixel-ratio: %s),(min-resolution: %sdppx)';
									src['mq']=mq.sprintf(src['x'],src['x']);
							}

//							if(src['w']) src['mq']='(min-width: '+src['w']+'px)';
						}
						srcset[j]=src;
					}
					srcset=srcset.sort(function(a,b) { return a.w-b.w; });
					images.push({img: img, srcset: srcset});
					img.removeAttribute('srcset');
				}
			}

		//	Attach to window.resize
			var mq=window.matchMedia;
			if(mq) {
				window.addEventListener('resize', replaceImages, false);
				replaceImages();
			}
	   //	Replace Images
			function replaceImages() {
				var i,j,m=-1;
				for(i=0;i<images.length;i++) {
					for(j=0;j<images[i].srcset.length;j++) if(mq(images[i].srcset[j].mq).matches) m=j;
					if(m>-1) images[i].img.src=images[i].srcset[m].src;
				}
			}
		}

	String.prototype.sprintf=function() {
		var string=this;
		for(var i=0;i<arguments.length;i++) string=string.replace(/%s/,arguments[i]);
		return string;
	};

		function say(message) {
			var div=document.createElement('div');
			//	div.style.cssText='';
			div.setAttribute('id','message');

			div.style.cssText='width: 300px; height: 200px;\
				overflow: auto; position: fixed;\
				right: 20px; top: 20px; white-space: pre-wrap;\
				border: thin solid #666;\
				box-shadow: 4px 4px 4px #666;\
				padding: 1em; font-family: monospace;\
				background-color: white; opacity: .6;';

			document.body.appendChild(div);
			say=function(message) {
				div.textContent+=message+'\n';
			};
			say(message);
		}
