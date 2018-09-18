/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{

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


    /* Print
       ========================================================================== */

    var print = $('a[data-action="print"]');

    if (print.length > 0)
    {
        print.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            window.print(); // Print the document
        });
    }

    /* Sections
       ========================================================================== */

    /*
     * Disclaimer: this is not pretty, but it solves a design requirement. It is
     * needed due to CSS not being able to stretch the height of an inner container
     * to that of it's parent.
     */

    var section = $('section[role="main"]');

    if (section.length > 0)
    {
        var aside = $('aside');
        var aside_height = aside.height();
        var section_height = section.height();

        if (section_height <= aside_height)
        {
            // Update <section role="main"> to match the height of <aside>
            section.css('height', aside_height + 23); // 37px (padding) - 14px (footer background height)
        }
    }

    /* Gallery
       =========================================================================== */

    var gallery_component = $('[data-component="gallery"]');

    if (gallery_component.length > 0)
    {
        $('.photo').colorbox(
            {
                current : 'Image {current} of {total}',
                opacity : 0.8,
                rel : 'photo'
            });
    }

}());