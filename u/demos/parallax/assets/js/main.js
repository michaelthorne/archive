(function()
{

    var header_offset = $('.header').height();
    var navigation = $('.navigation');

    /*
     * Scroll page down to the relevant section based on the href of the anchor
     */

    $('a', navigation).on('click', function(e)
    {
        e.preventDefault();

        var href = $(this).attr('href');
        var section = $(href);
        var scroll = section.position().top - header_offset;
        var margin_top_offset = 0;
        var margin_top_section = section.attr('data-section-margin-top');

        // Check if there is a margin present on the current section
        if (margin_top_section != null)
        {
            margin_top_offset = margin_top_section;
        }

        // Scroll the document down to the specified offset
        $('html, body').animate({
            easing: 'easeOutExpo',
            scrollTop : parseInt(scroll) + parseInt(header_offset) - parseInt(margin_top_offset)
        }, 500, function()
        {
            window.location.hash = href;
        });
    });

    // Build an array with the top offset of each section
    var sections_margin_top = 0;
    var sections = [];

    $('.section').each(function(i)
    {
        var section_offset_top = $(this).offset().top; // Position from top of document
        var section_margin_top = $(this).attr('data-section-margin-top'); // Additional margin for parallax effects

        if (section_margin_top != null)
        {
            sections_margin_top += section_margin_top;
        }
        sections[i] = section_offset_top - sections_margin_top;
    });

    // Listen for window scroll event
    $(window).scroll(function()
    {
        window_scroll_top = $(window).scrollTop();

        updateNavigation(window_scroll_top);
        updateScrollCount(window_scroll_top);
    });

    /**
     * Update the navigation links to indicate the current section in view
     *
     * @param scrolled
     */
    function updateNavigation(scrolled)
    {
        for (var i = 0; i < sections.length; i++)
        {
            if (sections[i] <= scrolled + header_offset)
            {
                $('a.active', navigation).removeClass('active');
                $('li:eq(' + i + ') a', navigation).addClass('active');
            }
        }
    }

    /**
     * Update the display with the number of pixels scrolled
     *
     * @param scrolled
     */
    function updateScrollCount(scrolled)
    {
        var scroll_count_component = $('[data-component="scroll-count"]');
        var scroll_count_span = $('span', scroll_count_component);

        if (scroll_count_component.length > 0)
        {
            scroll_count_span.html(scrolled);
        }
    }

}(jQuery));