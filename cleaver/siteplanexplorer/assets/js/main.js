/* =============================================================================
   Main: General jQuery functionality used throughout the website.
   ========================================================================== */

(function()
{
    /*
     * Variables
     */

    var win = $(window);
    var header = $('header.main');
    var header_height = header.outerHeight();
    var aside = $('aside.main');
    var section = $('section.main');
    var container_search = $('[data-container="search"]');
    var container_search_height = container_search.outerHeight();
    var container_search_advanced = $('[data-container="search-advanced"]');
    var button_search_advanced = $('[data-toggle-slide-container="advanced-search"]');
    var canvas = $('.canvas');
    var win_height = win.height();
    var win_width = win.width();
    var aside_height = aside.height();
    var section_height = section.height();
    var section_width = section.width();

    /*
     * Breakpoints
     */

    var breakpoint_largest = 1200;

    /* Back to Top
       ========================================================================== */

    var back_to_top_anchor = $('a[data-action="back-to-top"]');

    if (back_to_top_anchor.length > 0)
    {
        back_to_top_anchor.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Scroll to the top of the document
            $('html, body').animate({
                easing: 'easeOutExpo',
                scrollTop: 0
            }, 500);
        });
    }

    /* Gallery
       ========================================================================== */

    var component_gallery = $('[data-component="gallery"]');

    if (component_gallery.length > 0)
    {
        // Default size
        var colorbox_height = 450;
        var colorbox_width = 700;

        // Default position
        var colorbox_top = false;
        var colorbox_left = false;

        /*
         * Calculate ColorBox position
         */

        var remaining_section_width = section_width - colorbox_width;
        if (remaining_section_width > 0)
        {
            colorbox_left = remaining_section_width / 2; // Find distance required in pixels for horizontal center positioning
        }

        var remaining_section_height = (section_height + header_height) - colorbox_height;
        if (remaining_section_height > 0)
        {
            colorbox_top = remaining_section_height / 2; // Find distance required in pixels for vertical center positioning
        }

        // Items used to generate ColorBox
        var photos = $('.gallery', component_gallery);

        // Custom ColorBox options
        var options_colorbox = {
            close : '<i class="icon-remove"></i>',
            current : '',
            fadeOut : 100,
            left : colorbox_left,
            next : '<i class="icon-chevron-right"></i>',
            opacity : 0.5,
            previous : '<i class="icon-chevron-left"></i>',
            rel : 'lightbox',
            reposition : false,
            title : function()
            {
                var data_lightbox_title = $(this).attr('data-photo-title');

                if (typeof data_lightbox_title !== 'undefined')
                {
                    return data_lightbox_title;
                }
            },
            top : colorbox_top
        };

        /*
         * Initialize ColorBox
         */

        photos.colorbox(options_colorbox);
    }

    /* Google Map
       ========================================================================== */

    var map_canvas = $('#map-canvas');

    if (map_canvas.length > 0)
    {
        /*
         * Initialize map
         */

        function init_map()
        {
            // Custom map options
            var options_map = {
                center : new google.maps.LatLng(-33.924716, 18.424072),
                zoom : 15,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                mapTypeControl : true,
                mapTypeControlOptions : {
                    position : google.maps.ControlPosition.TOP_LEFT,
                    style : google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                panControl : false,
                streetViewControl: false,
                zoomControl : true,
                zoomControlOptions : {
                    position : google.maps.ControlPosition.LEFT_TOP
                }
            };

            // Remove loading classes
            map_canvas.removeClass('loading loading-bars');

            // Create new map instance
            var map = new google.maps.Map(map_canvas[0], options_map);
        }

        /*
         * Load the map and specified options
         */

        google.maps.event.addDomListener(window, 'load', init_map);
    }

    /* HTML5 Placeholder
       ========================================================================== */

    $('input, textarea').placeholder();


    /* Toggle: Button (Single)
       ========================================================================== */

    var toggle_button = $('[data-action="toggle-button"]');

    if (toggle_button.length > 0)
    {
        // Iterate over all toggle buttons
        toggle_button.each(function()
        {
            var button = $(this);

            button.on('click', function(e)
            {
                button.toggleClass('selected');

                e.preventDefault(); // Prevent # in address bar
            });
        });
    }

    /* Toggle: Button (Group)
       ========================================================================== */

    var toggle_button_group = $('[data-action="toggle-button-group"]');

    if (toggle_button_group.length > 0)
    {
        // Iterate over all toggle button groups
        toggle_button_group.each(function()
        {
            var group = $(this);
            var buttons = $('.button', group);

            buttons.each(function()
            {
                var button = $(this);

                button.on('click', function(e)
                {
                    $('.selected', group).removeClass('selected');
                    button.addClass('selected');

                    e.preventDefault(); // Prevent # in address bar
                });
            });
        });
    }

    /* Toggle: Button (Checkbox)
       ========================================================================== */

    var toggle_button_checkbox = $('[data-action="toggle-button-checkbox"]');

    if (toggle_button_checkbox.length > 0)
    {
        // Iterate over all toggle checkbox button elements
        toggle_button_checkbox.each(function()
        {
            var container = $(this);
            var anchors = $('a', container);

            anchors.each(function()
            {
                var anchor = $(this);
                var anchor_icon = $('i', anchor);
                var icon_class_checked = 'icon-check';
                var icon_class_unchecked = 'icon-check-empty';

                anchor.on('click', function(e)
                {
                    $(this).toggleClass('selected');

                    /*
                     * Update icon checkbox class
                     */

                    if (anchor_icon.hasClass(icon_class_unchecked))
                    {
                        anchor_icon.addClass(icon_class_checked);
                        anchor_icon.removeClass(icon_class_unchecked);
                    }
                    else
                    {
                        anchor_icon.addClass(icon_class_unchecked);
                        anchor_icon.removeClass(icon_class_checked);
                    }

                    e.preventDefault(); // Prevent # in address bar
                });
            });
        });
    }

    /* Toggle: Button (Radio)
       ========================================================================== */

    var toggle_button_radio = $('[data-action="toggle-button-radio"]');

    if (toggle_button_radio.length > 0)
    {
        // Iterate over all toggle radio button elements
        toggle_button_radio.each(function()
        {
            var container = $(this);
            var is_drop_down = container.attr('data-drop-down'); // Radio button toggle within drop-down
            var anchors = $('a', container);

            anchors.each(function()
            {
                var anchor = $(this);

                anchor.on('click', function(e)
                {
                    $('.selected', toggle_button_radio).removeClass('selected');
                    anchor.addClass('selected');

                    // Hide the parent container drop-down
                    if (is_drop_down)
                    {
                        container.hide();

                        // Find the drop-down anchor
                        var anchor_drop_down = container.prev();
                        anchor_drop_down.removeClass('selected');
                    }

                    e.preventDefault(); // Prevent # in address bar
                });
            });
        });
    }

    /* Toggle: Pills
       ========================================================================== */

    var toggle_pill_group = $('[data-action="toggle-pill-group"]');

    if (toggle_pill_group.length > 0)
    {
        // Iterate over all toggle pill groups
        toggle_pill_group.each(function()
        {
            var group = $(this);
            var pills = $('.pill', group);

            pills.each(function()
            {
                var pill = $(this);

                pill.on('click', function(e)
                {
                    pill.toggleClass('selected');
                    $('.selected', group).not(pill).removeClass('selected');

                    e.preventDefault(); // Prevent # in address bar
                });
            });
        });
    }

    /* Toggle: Section (Canvas)
       ========================================================================== */

    var component_toggle_section = $('[data-component="toggle-section"]');

    if (component_toggle_section.length > 0)
    {
        component_toggle_section.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Section to toggle display of
            var toggle_section = $('[data-section-toggle="true"]');

            if (toggle_section.length > 0)
            {
                // On small screens the advanced search panel may be visible
                if (container_search_advanced.css('display', 'block'))
                {
                    container_search_advanced.hide(); // Hide the advanced search panel
                    button_search_advanced.removeClass('selected'); // Update the state of the advanced search button
                }

                // Toggle the visible class on the section
                toggle_section.toggleClass('visible');
            }
        })
    }

    /* Element Resizing
       ========================================================================== */

    // Resize elements on window load
    resizeElements(aside_height, section_width, win_height);

    /*
     * Resize elements to ensure that their widths and heights are correct.
     */

    function resizeElements(aside_height, section_width, win_height)
    {
        // <section> is permanently visible (i.e. larger screen display)
        if (section.css('position') == 'relative')
        {
            aside.css('height', win_height - header_height); // Force the height of the <aside> to the $(window) height, excluding the header.
        }
        else // <aside> is visible by itself (i.e. smaller screen display)
        {
            aside.css('height', 'auto'); // Reset height
        }

        // <aside> is taller than $(window)
        if (aside_height > win_height)
        {
            section.css('height', aside_height);
        }
        else
        {
            section.css('height', win_height - header_height); // Force the height of the <section> to the $(window) height, excluding the header.
        }

        // Ensure that the search panel is only as wide as the <section> element.
        container_search.css('width', section_width);

        if (win_width >= breakpoint_largest)
        {
            container_search.show(); // Show the search panel now that the width is correct
        }
        else
        {
            container_search.hide();
        }

        // Ensure that the advanced search panel is only as wide as the <section> element.
        container_search_advanced.css('width', section_width);

        /*
         * Canvas
         */

        // Check if the search container is visible
        if (container_search.css('display') == 'none')
        {
            container_search_height = 0;
        }
        else
        {
            container_search.outerHeight();
        }

        // Resize the height of the canvas, subtracting the header height and search container height (if visible)
        canvas.height(win_height - header_height - container_search_height);
    }

    /* Browser Window Resize
       ========================================================================== */

    $(window).resize(function()
    {
        /*
         * Update variables
         */

        aside_height = aside.height();
        section_width = section.width();
        win_height = win.height();
        win_width = win.width();

        /* Element Resizing
           ========================================================================== */

        // Resize elements on window resize
        resizeElements(aside_height, section_width, win_height);
    });

}(jQuery));