/* =============================================================================
   jQuery: all the components!
   ========================================================================== */

(function()
{

    /* Drop-down
       ========================================================================== */

    var component_drop_down = $('[data-component="drop-down"]');

    if (component_drop_down.length > 0)
    {

        // Mouse Over
        $('ol li', component_drop_down).on('mouseover', function()
        {
            $(this).addClass('hover'); // Add hover class

            // Slide Down
            $('ol:first', $(this)).show(0);
        });

        // Mouse Out
        $('ol li', component_drop_down).on('mouseout', function()
        {
            $(this).removeClass('hover'); // Remove hover class

            // Slide Up
            $('ol:first', $(this)).hide(0);
        });
    }

    /* Accordion
       ========================================================================== */

    var component_accordion = $('[data-component="accordion"]');

    if (component_accordion.length > 0)
    {
        $('dd', component_accordion).hide(); // Hide all definition descriptions

        // Click of accordion
        $('dt > a', component_accordion).on('click', function(e)
        {
            e.preventDefault();

            var current_dt = $(this).parent();
            var current_dd = current_dt.next();

            // Toggle the description
            current_dd.stop(true, true).slideToggle(
                {
                    duration: '400',
                    easing: 'easeOutExpo'
                });

            current_dt.toggleClass('current'); // Toggle the current class

            // Find all other definition descriptions
            $('dd', component_accordion).not(current_dd).each(function()
            {
                // Hide the description
                $(this).stop(true, true).slideUp(
                {
                    duration: '400',
                    easing: 'easeOutExpo'
                });
            });

            // Find all other definition terms
            $('dt', component_accordion).not(current_dt).each(function()
            {
                $(this).removeClass('current'); // Remove current class
            });
        })
    }

    /* Carousel
       ========================================================================== */

    var component_carousel = $('div.carousel');

    if (component_carousel.length > 0)
    {
        var small_screen = true;
        var carousel_wrapper = component_carousel.parent();
        var carousel_width = component_carousel.outerWidth(true);
        var carousel_ol = $('ol', component_carousel);
        var carousel_ol_items = carousel_ol.children();
        var carousel_ol_item_width = $('li:first', carousel_ol).outerWidth(true);
        var carousel_ol_width = carousel_ol_items.length * carousel_ol_item_width;
        var carousel_prev = $('a.prev', carousel_wrapper);
        var carousel_next = $('a.next', carousel_wrapper);

        carousel_prev.hide(); // Hide the previous control on load

        // Wider screen
        if (carousel_ol.css('overflow') == 'hidden')
        {
            small_screen = false;
            carousel_ol.css('width', carousel_ol_width); // Update ordered list width
        }

        var carousel_scrolled = carousel_width;
        var previous_pos = 0;

        // Listen for window resize
        $(window).resize(function()
        {
            component_carousel.trigger('goto', [ 0 ]); // Restart the carousel

            carousel_width = component_carousel.outerWidth(true); // Update carousel width variable

            carousel_scrolled = carousel_width; // Reset the distance the carousel scrolled

            // Update ordered list width
            if (carousel_ol.css('overflow') == 'visible') // Small screen
            {
                small_screen = false;
                carousel_ol.css('width', 'auto');

                // Hide controls
                carousel_prev.hide();
                carousel_next.hide();
            }
            else // Wider screen
            {
                small_screen = true;
                carousel_ol.css('width', carousel_ol_width);
            }
        });

        // Small screen
        if (small_screen)
        {
            // Hide controls
            carousel_prev.hide();
            carousel_next.hide();
        }

        // Initialize plugin
        $('[data-component="carousel"]').serialScroll({
            cycle : false,
            duration : 400,
            easing : 'easeOutExpo',
            force : true,
            items : 'li',
            lock : false,
            next : $('a.next', carousel_wrapper),
            prev : $('a.prev', carousel_wrapper),
            stop : true,
            onBefore: function(e, elem, $pane, $items, pos)
            {
                // Calculate how far the carousel has scrolled
                if (pos > previous_pos)
                {
                    carousel_scrolled += carousel_ol_item_width; // Forwards
                }
                else
                {
                    carousel_scrolled -= carousel_ol_item_width; // Backwards
                }

                previous_pos = pos; // Update previous position

                // Beginning of the carousel
                if (pos == 0)
                {
                    carousel_prev.hide(); // Hide previous
                    carousel_scrolled = carousel_width; // Reset the distance the carousel scrolled
                }

                // Started sliding
                if (pos > 0)
                {
                    carousel_prev.show(); // Show previous
                }

                // End of the carousel
                if (carousel_scrolled >= carousel_ol_width)
                {
                    carousel_next.hide(); // Hide next
                }
                else
                {
                    carousel_next.show(); // Show next
                }
            },
            onAfter: function(elem)
            {
            }
        });
    }

    /* Slider
       ========================================================================== */

    var component_slider = $('div.slider');

    if (component_slider.length > 0)
    {
        small_screen = true;
        var slider_wrapper = component_slider.parent();
        var slider_width = component_slider.outerWidth(true);
        var slider_ol = $('ol', component_slider);
        var slider_ol_items = $('ol').children();
        var slider_ol_item_width = $('li:first', slider_ol).outerWidth(true);
        var slider_ol_width = slider_ol_items.length * slider_ol_item_width;
        var slider_prev = $('a.prev', slider_wrapper);
        var slider_next = $('a.next', slider_wrapper);
        
        slider_prev.hide(); // Hide the previous control on load
        
        // Wider screen
        if (slider_ol.css('overflow') == 'hidden')
        {
            small_screen = false;

            slider_ol.css('width', slider_ol_width); // Update the width of the ordered list

            // Update the width of the ordered list items
            $('li', slider_ol).each(function()
            {
                $(this).css('width', slider_width);
            });
        }

        var slider_scrolled = slider_width;

        // Listen for window resize
        $(window).resize(function()
        {
            component_slider.trigger('goto', [ 0 ]); // Restart the slider

            slider_width = component_slider.outerWidth(true); // Update slider width variable

            slider_scrolled = slider_width; // Reset the distance the slider scrolled

            // Update ordered list width
            if (slider_ol.css('overflow') == 'visible') // Small screen
            {
                small_screen = false;

                slider_ol.css('width', 'auto'); // Update the width of the ordered list

                // Hide controls
                slider_prev.hide();
                slider_next.hide();
            }
            else // Wider screen
            {
                small_screen = true;

                slider_ol.css('width', slider_ol_width); // Update the width of the ordered list

                // Update the width of the ordered list items
                $('li', slider_ol).each(function()
                {
                    $(this).css('width', slider_width);
                });
            }
        });

        // Small screen
        if (small_screen)
        {
            // Hide controls
            slider_prev.hide();
            slider_next.hide();
        }

        // Initialize plugin
        $('[data-component="slider"]').serialScroll({
            cycle : false,
            duration : 400,
            easing : 'easeOutExpo',
            force : true,
            items : 'li',
            lock : false,
            next : slider_next,
            prev : slider_prev,
            stop : true,
            onBefore: function(e, elem, $pane, $items, pos)
            {
                // Beginning of the slider
                if (pos == 0)
                {
                    slider_prev.hide(); // Hide previous
                    slider_next.show(); // Show next
                }

                // Started sliding
                if (pos > 0)
                {
                    slider_prev.show(); // Show previous
                }

                // End of the slider
                if (pos + 1 == $items.length)
                {
                    slider_next.hide(); // Hide next
                }
                else
                {
                    slider_next.show(); // Show next
                }
            },
            onAfter: function(elem)
            {
            }
        });
    }

    /* Modal
       ========================================================================== */

    var component_modal_anchor = $('[data-component="modal"]');

    if (component_modal_anchor.length > 0)
    {

        var component_modal_id = component_modal_anchor.attr('data-modal-id'); // Get the id of the modal window

        if (component_modal_id != null || component_modal_id != '')
        {
            var component_modal = $('#' + component_modal_id); // Get the modal container

            if (component_modal.length > 0)
            {
                // Open the modal window
                component_modal_anchor.click(function(e)
                {
                    e.preventDefault();

                    // Initalize plugin
                    component_modal.modal({
                        opacity : 0.7,
                        showClose : false,
                        zIndex : 1000
                    });
                });

                // Close the modal window
                $('[data-modal-action="close"]', component_modal).click(function(e)
                {
                    e.preventDefault();

                    $.modal.close(); // Close
                });
            }
        }
    }

    /* Tabs
       ========================================================================== */

    var component_tabs = $('[data-component="tabs"]');

    if (component_tabs.length > 0)
    {

        // Click of tabs
        $('a', component_tabs).click(function(e)
        {
            e.preventDefault();

            $(this).tab('show');
        })
    }

    /* PrettyPrint
       ========================================================================== */

    window.prettyPrint && prettyPrint();

}());