(function() {

  function loadDraglet($, loaded) { 
    insertDraglet($);
    setupEvents($);
  }

  function insertDraglet($) {
    $('body').append('<div id=\'dragletOverlay\'></div>');
    $('body').append('<div id=\'dragletContainer\'><h1>Drop image here</h1></div>');
  }

  function setupEvents($) {
    // Removal
    $('#dragletOverlay').click(removeDraglet);

    $(window).on('keyup', function(e) {
      if (e.keyCode == 27) { removeDraglet(); }
    });

    // Drag'n drop
    $('#dragletContainer').on({
      dragover: function(e) {
        e.preventDefault();
      },
      drop: function(e) {
        console.log(e);
        e.preventDefault();
        upload($, e.originalEvent.dataTransfer.files[0]);
      }
    });

    // Select all on focus
    $("#dragletContainer").on("click", "input", function() {
      this.select();
    });

    function removeDraglet() {
      $('#dragletOverlay,#dragletContainer').remove();
    }
  }

  function upload($, file) {
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    var data = new FormData();
    data.append('image', file);
    data.append('key', '6528448c258cff474ca9701c5bab6927');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://api.imgur.com/2/upload.json');
    xhr.onload = function() {
      showDragletUrl($, JSON.parse(xhr.responseText).upload.links.original);
    };

    xhr.send(data);
  }

  function showDragletUrl($, url) {
    $('#dragletContainer').html('<label for=\'dragletUrl\'>URL</label><input id=\'dragletUrl\' type=\'text\' value=\'' + url + '\' />');
    $('#dragletContainer').append('<label for=\'dragletMarkdown\'>Markdown</label><input id=\'dragletMarkdown\' type=\'text\' value=\'![my image](' + url + ')\' />');
  }

  // Load jquery 1.7.1 if it isn't already loaded
  function loadJQuery(window, document, req_version, callback, $, script, done, readystate) {
    if (!($ = window.jQuery) || req_version > $.fn.jquery || callback($)) {
      script  = document.createElement('script');
      script.type = 'text/javascript';
      script.src  = '//ajax.googleapis.com/ajax/libs/jquery/' + req_version + '/jquery.min.js';
      script.onload = script.onreadystatechange = function() {
        if(!done && (!(readystate = this.readyState) || readystate == 'loaded' || readystate == 'complete')) {
          $ = window.jQuery;
          callback($.noConflict(1), done = 1);
          $(script).remove();
        }
      };
      document.documentElement.childNodes[0].appendChild(script);
    }
  }
  
  loadJQuery(window, document, '1.7.1', loadDraglet);
})();

