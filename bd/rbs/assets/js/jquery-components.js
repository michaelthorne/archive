/* =============================================================================
   jQuery: all the components.
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

    /* Slider
       ========================================================================== */

    var component_slider = $('div.slider');

    if (component_slider.length > 0)
    {
        var slider_wrapper = component_slider.parent();
        var slider_ol = $('ol', component_slider);
        var slider_ol_items = slider_ol.children();
        var slider_ol_item_width = $('li:first', slider_ol).outerWidth(true);
        var slider_ol_width = slider_ol_items.length * slider_ol_item_width;
        var slider_prev = $('a.prev', slider_wrapper);
        var slider_next = $('a.next', slider_wrapper);

        slider_ol.css('width', slider_ol_width); // Update the width of the ordered list

        // Initialize plugin
        $('[data-component="slider"]').serialScroll({
            cycle : true,
            duration : 700,
            easing : 'easeOutExpo',
            force : true,
            interval : 10000,
            items : 'li',
            lock : false,
            next : slider_next,
            prev : slider_prev,
            stop : true,
            onBefore: function(e, elem, $pane, $items, pos)
            {
            },
            onAfter: function(elem)
            {
            }
        });

        slider_prev.on('click', function()
        {
            stopSlider();
        });

        slider_next.on('click', function()
        {
            stopSlider();
        });

        /**
         * Stop the slider from automatically scrolling
         */
        function stopSlider()
        {
            $('[data-component="slider"]').trigger('stop');
        }
    }

    /* PrettyPrint
       ========================================================================== */

    window.prettyPrint && prettyPrint();

}());