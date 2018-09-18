/* ==========================================================================
   Style Guide
   ========================================================================== */

var style_guide = {

    init: function ()
    {

        /* Google Code Prettify
           ========================================================================== */

        var component_pretty_print = $('[data-component="prettyprint"]');

        if (component_pretty_print.length > 0)
        {
            window.prettyPrint && prettyPrint();
        }

        /* Navigation
           ========================================================================== */

        /*
         * Drop-down
         */

        var sg_nav_toggle = $('[data-action="sg-nav-toggle"]');
        var sg_nav_container = $('[data-container="sg-nav"]');

        if (sg_nav_toggle.length > 0)
        {
            sg_nav_toggle.on('click', function (e)
            {
                e.preventDefault();

                // Toggle active class of navigation toggle
                sg_nav_toggle.toggleClass('is-active');

                // Toggle visible class of navigation container
                sg_nav_container.toggleClass('is-visible');
            });
        }

        /*
         * Anchors
         */

        if (sg_nav_container.length > 0)
        {
            $('a', sg_nav_container).on('click', function ()
            {
                // Toggle active class of navigation toggle
                sg_nav_toggle.toggleClass('is-active');

                // Toggle visible class of navigation container
                sg_nav_container.toggleClass('is-visible');

                var anchor_href = $(this).attr('href'); // Get the href

                if (anchor_href.length > 0)
                {
                    var section = $(anchor_href); // Attempt to find an existing section

                    if (section.length > 0)
                    {
                        scrollTop(section.offset().top); // Scroll to section within the page
                    }
                }
            });
        }

        /* Back to Top
           ========================================================================== */

        var sg_back_to_top_anchor = $('[data-action="sg-back-to-top"]');

        if (sg_back_to_top_anchor.length > 0)
        {
            var scrolled;

            sg_back_to_top_anchor.on('click', function (e)
            {
                e.preventDefault();

                scrolled = $(window).scrollTop();

                if (scrolled > 0) // Check that some scrolling has taken place
                {
                    scrollTop(0);
                }
            });
        }

        /**
         * Scroll the page to the specified number of pixels from the top
         *
         * @param distance
         */

        function scrollTop (distance)
        {
            $('html, body').animate({
                easing: 'easeOutExpo',
                scrollTop: distance
            }, 250);
        }

        /* Hidden
           ========================================================================== */

        /*
         * Any HTML elements that have the class of `js-hidden` won’t be displayed once the document has loaded.
         * This technique of progressive enhancement allows accessibility of content to devices which may have
         * JavaScript disabled.
         */

        var hidden_elements = $('.js-hidden');

        hidden_elements.each(function()
        {
            $(this).hide();
        });

        /* Last Modified
           ========================================================================== */

        var last_modified_component = $('[data-component="last-modified"]');

        if (last_modified_component.length > 0)
        {
            var last_modified = new Date(document.lastModified); // Get the last modified date of the document

            var months = [ "January","February", "March", "April", "May", "June", "July", "August", "September",
                "October", "November", "December" ];
            var last_modified_day = last_modified.getDate();
            var last_modified_month = last_modified.getMonth();
            var last_modified_year = last_modified.getFullYear();

            // Update the HTML contents
            last_modified_component.html(months[last_modified_month] + ' ' + last_modified_day + ', ' + last_modified_year);

            // Update the `datetime` attribute
            last_modified_component.attr('datetime', last_modified_year + '-' + last_modified_month + '-' + last_modified_day);
        }

        /* Source Code
           ========================================================================== */

        var sg_source_code_toggle = $('[data-action="sg-toggle-source-code"]');

        if (sg_source_code_toggle.length > 0)
        {
            var sg_container_source_code;

            sg_source_code_toggle.each(function ()
            {
                var anchor = $(this);

                anchor.on('click', function (e)
                {
                    e.preventDefault();

                    // Source code container
                    sg_container_source_code = anchor.next('[data-container="sg-source-code"]');

                    // Toggle visible class
                    sg_container_source_code.toggleClass('is-visible');
                });
            });
        }
    }
};