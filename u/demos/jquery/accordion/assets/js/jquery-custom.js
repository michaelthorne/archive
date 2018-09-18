/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{

  $('.header a').click(function(event)
  {
      event.preventDefault();

      var image_path_open = 'assets/images/open.png';
      var image_path_close = 'assets/images/close.png';

      var current_anchor = $(this); // get current anchor
      var current_header = current_anchor.parent(); // get current header
      var current_contents = current_header.next(); // get next contents

      // slide toggle contents
      current_contents.stop(true,true).slideToggle({
          duration: 500,
          easing: 'easeOutQuad'
      });

      var current_image = $('img', current_anchor); // get current image
      var current_image_src = current_image.attr('src');

      if (current_image_src == image_path_close)
      {
          current_image.attr('src', image_path_open);
      }
      else
      {
          current_image.attr('src', image_path_close);
      }

      // close the open contents
      $('.contents').not(current_contents).stop(true,true).slideUp();
      $('.header img').not(current_image).attr('src', image_path_open);
  })
}());