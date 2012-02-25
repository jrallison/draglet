(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||f.fn.jquery||h(f)){c=a.createElement('script');c.type='text/javascript';c.src='http://ajax.googleapis.com/ajax/libs/jquery/'+g+'/jquery.min.js';c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=='loaded'||d=='complete')){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,'1.7.1',function($,L){


  var styles='#dragletOverlay { position: fixed; z-index: 9999; top: 0; right: 0; bottom: 0; left: 0; background-color: black; opacity: .6; } #dragletContainer { font-family: Helvetica, arial, sans-serif; position: fixed; z-index: 100000002; top: 50%; left: 50%; margin: -150px 0 0 -300px; padding: 20px; width: 560px; height: 260px; background-color: #222; border-radius: 3px; opacity: 1; } #dragletContainer h1 { margin: 0 !important; padding: 0 !important; color: #333 !important; font-size: 40px !important; line-height: 260px !important; font-family: HelveticaNeue, \'Helvetica Neue\', Helvetica, Arial, sans-serif !important; text-transform: uppercase !important; text-align: center !important;';

  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'data:text/css,' + escape(styles);

  $('body').append(stylesheet);
  $('body').append('<div id=\'dragletOverlay\'></div>');
  $('body').append('<div id=\'dragletContainer\'><h1>Drop image here</h1></div>');

  $('#dragletOverlay').click(function() {
    $('#dragletOverlay,#dragletContainer').remove();
  });

  $(window).on('keyup', function(e) {
    if (e.keyCode == 27) { $('#dragletOverlay,#dragletContainer').remove(); }
  });

  /* Drag'n drop stuff */
  $('#dragletContainer').on({
    dragover: function(e) {
      e.preventDefault();
    },
    drop: function(e) {
      e.preventDefault();
      upload(e.originalEvent.dataTransfer.files[0]);
    }
  });

  function upload(file) {
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    /* It is! */
    // TODO SHOW LOADING

    var data = new FormData();
    data.append('image', file);
    data.append('key', '6528448c258cff474ca9701c5bab6927');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://api.imgur.com/2/upload.json');
    xhr.onload = function() {
      var url = JSON.parse(xhr.responseText).upload.links.original; 
      $('#dragletContainer').html('<input type=\'text\' value=\'' + url + '\' />');
      $('#dragletContainer').append('<input type=\'text\' value=\'![my image](' + url + ')\' />');
    };

    xhr.send(data);
  }
});
