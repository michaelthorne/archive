/* =============================================================================
   Components: Custom jQuery components used throughout the website.
   ========================================================================== */

(function()
{

    /* Autocomplete
       ========================================================================== */

    var component_autocomplete = $('[data-component="autocomplete"]');

    if (component_autocomplete.length > 0)
    {
        component_autocomplete.typeahead({
            name: 'accounts',
            local: ['Austria', 'Bermuda', 'Brazil', 'Samoa', 'Saudi Arabia', 'South Africa', 'Spain', 'Switzerland']
        });
    }

    /* Back to Top
       ========================================================================== */

    var back_to_top = $('[data-action="back-to-top"]');

    if (back_to_top.length > 0)
    {
        back_to_top.on('click', function(e)
        {
            // Scroll to the top of the document
            $('html, body').animate({
                easing: 'easeOutExpo',
                scrollTop: 0
            }, 500);

            e.preventDefault(); // Prevent # in address bar
        });
    }

    /* Drop-down
       ========================================================================== */

    var toggle_drop_down = $('[data-toggle="drop-down"]');

    if (toggle_drop_down.length > 0)
    {
        var drop_downs = $('ol.drop-down');

        toggle_drop_down.each(function()
        {
            var toggle = $(this);

            toggle.on('click', function()
            {
                // Find the associated drop-down menu
                var drop_down = toggle.next('ol.drop-down');

                // Hide all other drop-downs
                drop_downs.not(drop_down).hide();

                // Toggle the drop-down menu visibility
                drop_down.stop(true, true).fadeToggle('fast');

                // Toggle the drop-down menu class
                drop_down.toggleClass('is-visible');

                // Remove selected class from all other toggles
                toggle_drop_down.not(toggle).removeClass('selected');

                // Toggle the selected class
                toggle.toggleClass('selected');

                return false;
            });
        });
    }

    /* List Navigator
       ========================================================================== */

    var component_list_navigator = $('[data-component="list-navigator"]');

    if (component_list_navigator.length > 0)
    {
        var list_navigator_a = $('a[data-action="list-navigator"]', component_list_navigator);

        // Get initial height of component
        var list_navigator_height_default = component_list_navigator.height() + 2;

        list_navigator_a.on('click', function(e)
        {
            // List data ID
            var list_navigator_data_id = $(this).attr('data-list-navigator-id');

            // List data parent ID
            var list_navigator_data_parent_id = $(this).attr('data-list-navigator-parent-id');

            // List data back link
            var list_navigator_back = $(this).attr('data-list-navigator-back');

            navigateToListDataItem(list_navigator_data_id, list_navigator_data_parent_id, list_navigator_back);

            e.preventDefault(); // Prevent # in address bar
        });
    }

    var list_navigator_breadcrumbs = $('[data-action="list-navigator-breadcrumbs"]');

    if (list_navigator_breadcrumbs.length > 0)
    {
        var list_navigator_anchors = $('a', list_navigator_breadcrumbs);

        list_navigator_anchors.each(function()
        {
            var anchor = $(this);

            anchor.on('click', function(e)
            {
                // List data ID
                var list_navigator_data_id = $(this).attr('data-list-navigator-id');

                // List data parent ID
                var list_navigator_data_parent_id = $(this).attr('data-list-navigator-parent-id');

                navigateToListDataItem(list_navigator_data_id, list_navigator_data_parent_id, true);

                e.preventDefault(); // Prevent # in address bar
            });
        })
    }

    /**
     * Navigate to the specified item within the list navigator
     *
     * @param list_navigator_data_id
     * @param list_navigator_data_parent_id
     * @param list_navigator_back
     */

    function navigateToListDataItem(list_navigator_data_id, list_navigator_data_parent_id, list_navigator_back)
    {
        // Prefix of list data container ID
        var prefix_id = 'data-item-';

        var list_data_item;
        var list_data_item_parent;
        var list_navigator_height;

        // Default behavior to navigate into additional lists of data
        if (typeof list_navigator_data_id !== 'undefined')
        {
            list_data_item = $('#' + prefix_id + list_navigator_data_id); // Nested list data contents
            list_navigator_height = list_data_item.height();
        }

        // Navigate to previous list of data
        if (typeof list_navigator_back !== 'undefined' && list_navigator_back)
        {
            // Navigate to the previous list
            if (list_navigator_data_parent_id != '0')
            {
                list_data_item_parent = $('#' + prefix_id + list_navigator_data_parent_id); // Parent list data contents item
                list_navigator_height = list_data_item_parent.height();
            }
            else // Navigate back to the beginning
            {
                list_navigator_height = list_navigator_height_default;
            }
        }

        if (typeof list_data_item !== 'undefined')
        {
            // Toggle the class to display the container
            list_data_item.toggleClass('visible');
        }

        // Update the height of container
        component_list_navigator.css('height', list_navigator_height);
    }

    /* Modal
       ========================================================================== */

    var component_modal_anchor = $('[data-component="modal"]');

    if (component_modal_anchor.length > 0)
    {
        var component_modal_id = component_modal_anchor.attr('data-modal-id'); // Get the id of the modal window

        if (typeof component_modal_id !== 'undefined')
        {
            var component_modal = $('#' + component_modal_id); // Get the modal container

            if (component_modal.length > 0)
            {
                // Open the modal window
                component_modal_anchor.click(function(e)
                {
                    // Initalize plugin
                    component_modal.modal({
                        opacity : 0.5,
                        showClose : false,
                        zIndex : 1000
                    });

                    e.preventDefault(); // Prevent # in address bar
                });

                // Close the modal window
                $('[data-action="close-modal"]', component_modal).click(function(e)
                {
                    $.modal.close();

                    e.preventDefault(); // Prevent # in address bar
                });
            }
        }
    }

    /* PrettyPrint
       ========================================================================== */

    window.prettyPrint && prettyPrint();

    /* Select
       ========================================================================== */

    var component_select = $('[data-component="select"]');

    if (component_select.length > 0)
    {
        component_select.selectBoxIt();
    }

    /* Slider
       ========================================================================== */

    var component_slider = $('[data-component="slider"]');

    if (component_slider.length > 0)
    {
        component_slider.flexslider({
            animation : 'slide',
            animationSpeed: 500
        });

        component_slider.removeClass('loading loading-bars');
    }

    /* Slide Toggle
       ========================================================================== */

    var component_slide = $('[data-component="toggle-slide"]');

    if (component_slide.length > 0)
    {
        component_slide.each(function()
        {
            var component = $(this);
            var toggle = $('[data-toggle="slide"]', component); // Anchor or Button to trigger slide
            var toggle_container_id = toggle.attr('data-toggle-slide-container');
            var toggle_container = $('[data-toggle-slide-container-id="' + toggle_container_id + '"]'); // Container to toggle display

            toggle.on('click', function(e)
            {
                // Toggle the container visibility
                toggle_container.stop(true, true).slideToggle('fast');

                // Toggle the container class
                toggle_container.toggleClass('is-visible');

                // Toggle the selected class
                toggle.toggleClass('selected');

                e.preventDefault(); // Prevent # in address bar
            });
        });
    }

    /*
     * Close Panel
     */

    var close_panel = $('[data-action="close-panel"]');

    if (close_panel.length > 0)
    {
        close_panel.each(function()
        {
            var el_close_panel = $(this); // Anchor or button that was triggered

            el_close_panel.on('click', function(e)
            {
                var panel = el_close_panel.closest('.slide-down-wrapper'); // Panel which contains the close trigger

                if (panel.length > 0)
                {
                    // Close the panel
                    panel.stop(true, true).slideUp('fast');
                    panel.removeClass('is-visible');

                    // Remove the selected class from the panel toggle button
                    var toggle_slide_container_id = panel.attr('data-toggle-slide-container-id');
                    var toggle = $('[data-toggle-slide-container="' + toggle_slide_container_id + '"]');
                    toggle.removeClass('selected');
                }

                e.preventDefault(); // Prevent # in address bar
            });
        });
    }

    /*
     * Scroll Horizontal
     */

    var scroll_horizontal = $('[data-action="scroll-horizontal"]');

    if (scroll_horizontal.length > 0)
    {
        scroll_horizontal[0].addEventListener('mousewheel', function(e)
        {
            this.scrollLeft -= (e.wheelDelta);

            e.preventDefault(); // Prevent # in address bar
        }, false);
    }

    /* Tabs
       ========================================================================== */

    var component_tabs = $('[data-component="tabs"]');

    if (component_tabs.length > 0)
    {
        // Click of tabs
        $('a', component_tabs).click(function(e)
        {
            $(this).tab('show');

            e.preventDefault(); // Prevent # in address bar
        });
    }

    /* Utils
       ========================================================================== */

    /*
     * Tidy-up on click of body
     */

    $('body').on('click', function()
    {
        /*
         * Hide all Drop-downs
         */

        var toggle_drop_down = $('[data-toggle="drop-down"]');

        if (toggle_drop_down.length > 0)
        {
            var drop_downs = $('ol.drop-down');

            toggle_drop_down.each(function()
            {
                var toggle = $(this);

                // Find the associated drop-down menu
                var drop_down = toggle.next('ol.drop-down');

                // Hide all drop-downs
                drop_downs.hide();

                // Remove the drop-down menu class
                drop_down.removeClass('is-visible');

                // Remove the selected class
                toggle.removeClass('selected');
            });
        }
    });

    /* Zoom
       ========================================================================== */

    var component_zoom = $('[data-component="zoom"]');

    if (component_zoom.length > 0)
    {
        var zoom_button_plus = $('a.zoom-plus', component_zoom);
        var zoom_button_minus = $('a.zoom-minus', component_zoom);
        var zoom_track = $('ol.zoom-track', component_zoom);
        var zoom_min = component_zoom.attr('data-zoom-min');
        var zoom_max = component_zoom.attr('data-zoom-max');
        var zoom_track_anchor = $('a', zoom_track);
        var zoom_track_points = $('li', zoom_track);

        // Specific zoom level
        zoom_track_anchor.on('click', function()
        {
            zoom_track_points.removeClass('selected');
            $(this).parent().addClass('selected');

            return false;
        });

        // Zoom in: decrease
        zoom_button_plus.on('click', function()
        {
            var zoom_current = $('li.selected', zoom_track).index(); // Zero-based index

            if (zoom_current > zoom_min) // Check that the item is not at the end of the track
            {
                zoom_track_points.removeClass('selected');
                // Add the selected class to the next item
                $('li:eq(' + zoom_current + ')', zoom_track).prev().addClass('selected');
            }

            return false;
        });

        // Zoom out: decrease
        zoom_button_minus.on('click', function()
        {
            var zoom_current = $('li.selected', zoom_track).index(); // Zero-based index

            if (zoom_current < zoom_max) // Check that the item is not at the end of the track
            {
                zoom_track_points.removeClass('selected');
                // Add the selected class to the next item
                $('li:eq(' + zoom_current + ')', zoom_track).next().addClass('selected');
            }

            return false;
        });
    }

}(jQuery));