/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{

    /* Spam protection: Contact email address
       ========================================================================== */

    var mailto_anchor = $('[data-action="email"]');

    if (mailto_anchor.length > 0)
    {
        mailto_anchor.on('click', function(e)
        {
            e.preventDefault();
            document.location.href = 'mailto:contact@userx.co.za';
        })
    }

    /* Back to Top
       ========================================================================== */

    var back_to_top = $('a[data-action="back-to-top"]');

    if (back_to_top.length > 0)
    {
        back_to_top.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Scroll to the top of the document
            $('html, body').animate({
                easing: 'easeOutExpo',
                scrollTop: 0
            }, 400);
        });
    }

    /* Drop-down Navigation
       ========================================================================== */

    var drop_down = $('a[data-component="drop-down"]');

    if (drop_down.length > 0)
    {
        drop_down.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            var nav_primary = $('nav.primary');
            nav_primary.stop(true, true).slideToggle(
                {
                    duration: '400',
                    easing: 'easeOutExpo'
                });
        });
    }

}());