/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{
    // Default: mobile first layout
    var small_screen = true;

    /* Amici: Recent sign-ups pop-up
       ========================================================================== */

    var amici = $('div.amici');

    if (amici.length > 0)
    {
        // Photos container of existing sign-ups
        var photos = $('div.photos', amici);

        // Hover over the container
        amici.hover(function()
        {
            // Fade in/out the photos container
            photos.stop(true, true).fadeToggle(
                {
                    duration : 500,
                    easing : 'easeOutExpo'
                }
            );
        });
    }

    /* Form: Input character length counter
       ========================================================================== */

    var component_character_counter = $('[data-component="character-counter"]');

    if (component_character_counter.length > 0)
    {
        // Create a variable with a unique name for each counter
        var name = '-' + component_character_counter.attr('name');

        // Add a container after the input
        component_character_counter.after('<div id="counter' + name + '" class="character-counter"></div>');

        component_character_counter.keyup(function()
        {
            // Maximum length specified via maxlength attribute
            var maximum_length = component_character_counter.attr('maxlength');

            var counter = $('#counter' + name);

            if (maximum_length != null)
            {
                // Calculate remaining length
                var remaining = maximum_length - component_character_counter.val().length;

                // Character counter warning
                var character_counter_warning = component_character_counter.attr('data-character-count-warning');

                if (remaining < 0)
                {
                    remaining = 0;
                }

                // Add class to indicate threshold is near
                if (character_counter_warning != null && remaining <= character_counter_warning)
                {
                    counter.addClass('warning');
                }
                else
                {
                    counter.removeClass('warning');
                }

                // Update the counter
                counter.text(remaining + ' character' + (remaining != 1 ? 's' : '') + ' remaining');
            }
        });
    }

    /* Search
       ========================================================================== */

    var search_anchor = $('[data-action="search"]');

    if (search_anchor.length > 0)
    {
        search_anchor.click(function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            search_anchor.parent().toggleClass('current');

            // Get the element after the search anchor
            var next_element = search_anchor.next();

            if (next_element.is('form')) // Ensure that it is a form
            {
                next_element.stop(true, true).toggle('fast');
            }
        });
    }

    /* Peroni: Tab animation
       ========================================================================== */

    var peroni_tab = $('div.tab');

    if (peroni_tab.length > 0)
    {
        var start = peroni_tab.attr('data-right-position-start');
        var end = peroni_tab.attr('data-right-position-end');

        // Hover over the tab
        peroni_tab.hover(function()
        {
            peroni_tab.stop(true, true).animate(
                {
                    right : start + 'px'
                },
                {
                    duration : 500,
                    easing : 'easeOutExpo'
                }
            );
        },
        function()
        {
            peroni_tab.stop(true, true).animate(
                {
                    right : end + 'px'
                },
                {
                    duration : 100,
                    easing : 'linear'
                }
            );
        });
    }

    /* Carousel
       ========================================================================== */

    var carousel = $('div.carousel');

    if (carousel.length > 0)
    {
        var carousel_ul = $('ul', carousel);
        var carousel_ul_children = carousel_ul.children();
        var carousel_prev = $('[data-action="carousel-prev"]');
        var carousel_next = $('[data-action="carousel-next"]');

        // Wider screen
        if (carousel.css('overflow') == 'hidden')
        {
            small_screen = false;
        }

        // No items to scroll
        if (carousel_ul_children.length > 1)
        {
            // Window width
            var window_width = $(window).width();

            // Listen for browser resize
            $(window).resize(function()
            {
                // Window width
                window_width = $(this).width();
            });
        }

        // Scroll to previous item based on container resizing due to media queries
        $(window).resize(function()
        {
            $(carousel).trigger('goto', [ 0 ]); // Restart the carousel

            // Update ordered list width
            if (carousel.css('overflow') == 'visible') // Small screen
            {
                // Hide controls
                carousel_prev.hide();
                carousel_next.hide();
            }
            else // Wider screen
            {
                small_screen = false;
            }
        });

        // Small screen
        if (small_screen)
        {
            // Hide controls
            carousel_prev.hide();
            carousel_next.hide();
        }

        // Initialize the serialScroll instance
        carousel.serialScroll({
            cycle : false,
            duration : 500,
            easing : 'easeOutExpo',
            items : 'li',
            offset : -31,
            next : carousel_next,
            prev : carousel_prev,
            stop : true,
            onBefore : function(e, elem, $pane, $items, pos)
            {
                // Beginning of the slider
                if (pos == 0)
                {
                    carousel_prev.hide(); // Hide previous
                    carousel_next.show(); // Show next
                    console.log('xxx');
                }

                // Started sliding
                if (pos > 0)
                {
                    carousel_prev.show(); // Show previous
                }

                // Offsets for carousel
                var pos_offset = 1;
                var items_offset = 0;

                // This prevents scrolling 'past' the end of the slider when on fullscreen.
                // When viewing the non-mobile > 480 < 1160, the slider needs to scroll to
                // the end due to the smaller viewport available in the layout.
                if (!small_screen)
                {
                    pos_offset = 0;
                    items_offset = 2;
                }

                // End of the slider
                if (pos + pos_offset == $items.length - items_offset)
                {
                    carousel_next.hide(); // Hide next
                }
                else
                {
                    carousel_next.show(); // Show next
                }
            },
            onAfter : function(elem)
            {
            }
        });
    }

    /* Slider
       ========================================================================== */

    var slider = $('div.slider');

    if (slider.length > 0)
    {
        var slider_wrapper = slider.parent();

        // Controls: Previous and Next
        var slide_prev = $('a.prev', slider_wrapper);
        var slide_next = $('a.next', slider_wrapper);

        // Wider screen
        if (slider.css('overflow') == 'hidden')
        {
            small_screen = false;
        }

        // Scroll to previous item based on container resizing due to media queries
        $(window).resize(function()
        {
            slider.trigger('goto', [ 0 ]); // Restart the slider

            // Update ordered list width
            if (slider.css('overflow') == 'visible') // Small screen
            {
                // Hide controls
                slide_prev.hide();
                slide_next.hide();
            }
            else // Wider screen
            {
                small_screen = false;
            }
        });

        // Small screen
        if (small_screen)
        {
            // Hide controls
            slide_prev.hide();
            slide_next.hide();
        }

        slider_wrapper.serialScroll({
            axis: 'x',
            cycle: false,
            duration: 500,
            easing: 'easeOutExpo',
            items: 'li',
            prev: '.prev',
            next: '.next',
            target: slider,
            onBefore: function(e, elem, $pane, $items, pos)
            {
                // Beginning of the slider
                if (pos == 0)
                {
                    slide_prev.hide(); // Hide previous
                    slide_next.show(); // Show next
                }

                // Started sliding
                if (pos > 0)
                {
                    slide_prev.show(); // Show previous
                }

                // End of the slider
                if (pos + 1 == $items.length)
                {
                    slide_next.hide(); // Hide next
                }
                else
                {
                    slide_next.show(); // Show next
                }
            },
            onAfter: function(elem)
            {
            }
        });
    }
}());