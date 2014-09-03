/*	srcset
	================================================ */
    'use strict';
    function doSrcset() {
        //	Check whether necessary or possible
            if('srcset' in new Image()) return;
            if(!window.matchMedia) return;

        //	Setup; get image elements, if any
            var i,j,k,m,images=[], img, srcset, src, details;
            var elements=document.getElementsByTagName('img');
            if(!elements.length) return;

        //	Convert srcset attributes
            for(var i=0;i<elements.length;i++) {
                var img=elements[i];
                if(srcset=img.getAttribute('srcset')) {
                    srcset=srcset.split(/\s*,\s*/);
                    for(var j=0;j<srcset.length;j++) {
                        details=srcset[j].split(/\s+/);
                        src	={src:'',w:0,x:'', mq:''};
                        for(k=0;k<details.length;k++) {
                            if(m=details[k].match(/^(\d+)w$/)) src['w']=parseInt(m[1]);
                            else if(m=details[k].match(/^(\d+)x$/)) src['x']=m[1];
                            else src['src']=details[k];
                            if(src['w']) src['mq']='(min-width: '+src['w']+'px)';
                        }
                        srcset[j]=src;
                    }
                    srcset=srcset.sort(function(a,b) { return a.w-b.w; });
                    images.push({img: img, srcset: srcset});
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
                var i,j;
                for(i=0;i<images.length;i++) {
                    var srcset=images[i].srcset;
                    for(j=0; j<srcset.length; j++) {
                        if(mq(srcset[j].mq).matches) images[i].img.src=srcset[j].src;
                    }
                }
            }
        }
