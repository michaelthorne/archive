/* ==========================================================================
   Main
   ========================================================================== */

var main = {

    init: function ()
    {
        /*
         * Components
         */

        components.accordion();
        components.carousel();
        components.modal();
        components.navigation();
        components.scrollable_table();
        components.slider();
        components.tabs();
        components.tooltips();

        /*
         * Forms
         */

        forms.placeholder();
    }
};

/* ==========================================================================
   Components
   ========================================================================== */

var components = {

    /* Accordion
       ========================================================================== */

    accordion: function ()
    {
        var component_accordion = $('[data-component="accordion"]');

        if (component_accordion.length > 0)
        {
            var icon_class_opened = 'fa-caret-down';
            var icon_class_closed = 'fa-caret-right';
            var accordion;
            var accordion_header;
            var accordion_header_anchor;
            var accordion_contents;
            var header;
            var contents;
            var accordion_current_header;
            var accordion_current_header_icon;
            var accordion_current_id;
            var accordion_current_contents;

            component_accordion.each(function ()
            {
                accordion = $(this);
                accordion_header = $('.accordion-item-header', accordion);
                accordion_header_anchor = $('a', accordion_header);
                accordion_contents = $('.accordion-item-contents', accordion);

                // Hide contents
                accordion_contents.each(function ()
                {
                    contents = $(this);

                    if (!contents.hasClass('is-visible')) // Displayed by default
                    {
                        contents.addClass('is-hidden');
                    }
                });

                // Update icons
                accordion_header.each(function ()
                {
                    header = $(this);

                    if (!header.hasClass('is-active')) // Displayed by default
                    {
                        $('i', header).removeClass(icon_class_opened);
                        $('i', header).addClass(icon_class_closed);
                    }
                });

                // Display contents
                accordion_header_anchor.on('click', function (e)
                {
                    e.preventDefault();

                    accordion_current_header = $(this).parent();
                    accordion_current_id = accordion_current_header.data('accordion-id'); // Get the ID of the current accordion

                    if (typeof accordion_current_id !== 'undefined' && accordion_current_id !== '')
                    {
                        accordion_current_contents = $('[data-accordion="' + accordion_current_id + '"]');

                        if (typeof accordion_current_contents !== 'undefined' && accordion_current_contents !== '')
                        {
                            accordion_current_header_icon = $('i', accordion_current_header);

                            // Update current header
                            accordion_current_header.toggleClass('is-active');

                            // Update current icon
                            if (accordion_current_header_icon.hasClass(icon_class_closed))
                            {
                                accordion_current_header_icon.removeClass(icon_class_closed);
                                accordion_current_header_icon.addClass(icon_class_opened);
                            }
                            else
                            {
                                accordion_current_header_icon.removeClass(icon_class_opened);
                                accordion_current_header_icon.addClass(icon_class_closed);
                            }

                            // Update current contents
                            accordion_current_contents.toggleClass('is-hidden');
                        }
                    }
                });
            });
        }
    },

    /* Carousel
       ========================================================================== */

    carousel: function ()
    {
        var component_carousel = $('[data-component="carousel"]');

        if (component_carousel.length > 0)
        {
            var carousel;
            var carousel_slideshow;
            var slideshow = false;

            // Iterate over all sliders
            component_carousel.each(function ()
            {
                carousel = $(this);
                carousel_slideshow = carousel.data('slideshow');

                // Check if slideshow is enabled for the carousel
                if (typeof carousel_slideshow !== 'undefined' && carousel_slideshow !== '')
                {
                    if (carousel_slideshow)
                    {
                        slideshow = true;
                    }
                }

                carousel.flexslider({
                    animation: 'slide',
                    animationLoop: false,
                    itemWidth: 300,
                    itemMargin: 0,
                    slideshow: slideshow
                });

                slideshow = false;
            });
        }
    },

    /* Modal
       ========================================================================== */

    modal: function ()
    {
        var component_modal = $('[data-component="modal"]');

        if (component_modal.length > 0)
        {
            var modal_options = {
                fadeDuration: 125,
                showClose: false,
                zIndex: 10
            };

            var component_modal_open = $('[data-modal-action="open"]');

            if (component_modal_open.length > 0)
            {
                // Loop over any elements with the "open" `data-modal-action`
                component_modal_open.each(function ()
                {
                    var element = $(this);

                    element.on('click', function (e)
                    {
                        e.preventDefault();

                        var modal_id = $(this).data('modal-id'); // Get the `modal-id` data attribute of the element

                        if (typeof modal_id !== 'undefined' && modal_id.length > 0)
                        {
                            var modal = $('#' + modal_id); // Find the modal container

                            if (modal.length > 0)
                            {
                                modal.modal(modal_options); // Open the modal with the specified options
                            }
                        }
                    });
                });
            }

            /*
             * Close
             */

            var component_modal_close = $('[data-modal-action="close"]');

            if (component_modal_close.length > 0)
            {
                // Loop over any elements with the "close" `data-modal-action`
                component_modal_close.each(function ()
                {
                    var element = $(this);

                    element.on('click', function (e)
                    {
                        e.preventDefault();

                        $.modal.close();
                    });
                });
            }
        }

        /* Viewport Resize/Orientation Change
           ========================================================================== */

        $(window).on('resize orientationchange', function ()
        {
            $.modal.close();
        });
    },

    /* Navigation
       ========================================================================== */

    navigation: function ()
    {

        /*
         * Drop–down
         */

        var component_nav_drop_down = $('[data-component="nav-drop-down"]');

        if (component_nav_drop_down.length > 0)
        {
            // Find all list items that are drop-downs
            var drop_downs = $('[data-drop-down="true"]', component_nav_drop_down);

            if (drop_downs.length > 0)
            {
                var drop_down_icon;
                var icon_up = 'fa-caret-up';
                var icon_down = 'fa-caret-down';

                // Loop over each drop-down
                drop_downs.each(function()
                {
                    var drop_down = $(this);
                    var drop_down_anchor = $('> a', drop_down); // Get the anchor within the list item
                    var drop_down_menu = $('.list-nav-drop-down', drop_down); // Get the drop-down menu

                    drop_down_anchor.on('click', function(e)
                    {
                        e.preventDefault();

                        drop_down_icon = $('i', $(this)); // Get the icon within the anchor

                        // Toggle the `is-active` class of the anchor
                        $(this).toggleClass('is-active');

                        // Toggle the icon class of the anchor
                        if (drop_down_icon.hasClass(icon_down))
                        {
                            drop_down_icon.removeClass(icon_down);
                            drop_down_icon.addClass(icon_up);
                        }
                        else
                        {
                            drop_down_icon.removeClass(icon_up);
                            drop_down_icon.addClass(icon_down);
                        }

                        // Toggle the `is-visible` class of the list
                        drop_down_menu.toggleClass('is-visible');
                    });
                });
            }
        }

        /*
         * Horizontal
         */

        var component_nav_horizontal = $('[data-component="nav-horizontal"]');

        if (component_nav_horizontal.length > 0)
        {
            // Loop over all horizontal navigation elements
            component_nav_horizontal.each(function ()
            {
                var nav_horizontal = $(this);
                var nav_toggle = $('[data-action="nav-toggle"]', nav_horizontal);
                var nav_list = $('> .list-nav', nav_horizontal);

                // Toggle the `is-visible` class of the list
                nav_list.removeClass('is-visible');

                if (nav_toggle.length > 0)
                {
                    nav_toggle.on('click', function (e)
                    {
                        e.preventDefault();

                        // Toggle the `is-active` class of navigation toggle
                        nav_toggle.toggleClass('is-active');

                        // Toggle the `is-visible` class of the list
                        nav_list.toggleClass('is-visible');
                    });
                }
            });
        }

        /*
         * Off-canvas
         */

        var component_nav_canvas = $('[data-component="nav-canvas"]');

        if (component_nav_canvas.length > 0)
        {
            var canvas = $('[data-canvas="true"]', component_nav_canvas);
            var canvas_toggle = $('[data-canvas-action="toggle"]', component_nav_canvas);

            canvas.addClass('is-visible');

            if (canvas_toggle.length > 0)
            {
                canvas_toggle.on('click', function (e)
                {
                    e.preventDefault();

                    // Toggle the `is-active` class of navigation toggle
                    canvas_toggle.toggleClass('is-active');

                    // Toggle the `is-visible` class of the canvas
                    canvas.toggleClass('is-visible');
                });
            }
        }
    },

    /* Scrollable Table
       ========================================================================== */

    scrollable_table: function ()
    {
        var component_scrollable_table = $('[data-component="scrollable-table"]');

        if (component_scrollable_table.length > 0)
        {
            /*
             * Run on window load instead of on DOM Ready in case images or other scripts affect element widths
             */

            $(window).on('load', function ()
            {
                // Check all scrollable elements
                component_scrollable_table.each(function ()
                {
                    var element = $(this);

                    if ($('table', element).outerWidth() > element.outerWidth())
                    {
                        element.addClass('has-scroll');
                    }

                    /*
                     * When the viewport size is changed, check again if the element needs to be scrollable
                     */

                    $(window).on('resize orientationchange', function ()
                    {
                        if ($('table', element).outerWidth() > element.outerWidth())
                        {
                            element.addClass('has-scroll');
                        }
                        else
                        {
                            element.removeClass('has-scroll');
                        }
                    });
                });
            });
        }
    },

    /* Slider
       ========================================================================== */

    slider: function()
    {
        var component_slider = $('[data-component="slider"]');

        if (component_slider.length > 0)
        {
            var slider;
            var slider_navigation;
            var slideshow;
            var control_nav = true;
            var autoplay = false;

            // Iterate over all sliders
            component_slider.each(function ()
            {
                slider = $(this);

                // Get the `slider-navigation` data attribute
                slider_navigation = slider.data('slider-navigation');

                // Check if thumbnail navigation is required
                if (typeof slider_navigation !== 'undefined' && slider_navigation === 'thumbnails')
                {
                    control_nav = 'thumbnails';
                }

                // Get the `slideshow` data attribute
                slideshow = slider.data('slideshow');

                // Check if slideshow is enabled
                if (typeof slideshow !== 'undefined' && slideshow === true)
                {
                    autoplay = true;
                }

                // Initialize the slider
                slider.flexslider({
                    animation: 'slide',
                    controlNav: control_nav,
                    slideshow: autoplay
                });

                // Reset variables after each iteration
                control_nav = true;
                slideshow = null;
                autoplay = false;
            });
        }
    },

    /* Tabs
       ========================================================================== */

    tabs: function ()
    {
        var component_tabs = $('[data-component="tabs"]');

        if (component_tabs.length > 0)
        {
            var tab;
            var tab_navigation;
            var tab_content;
            var anchor;
            var content;
            var tab_current_id;
            var tab_current;

            component_tabs.each(function ()
            {
                tab = $(this);
                tab_navigation = $('.tabs-navigation');
                tab_content = $('.tab-content', tab);

                // Hide contents
                tab_content.each(function ()
                {
                    content = $(this);

                    if (!content.hasClass('is-visible')) // Displayed by default
                    {
                        content.addClass('is-hidden');
                    }
                });

                $('a', tab_navigation).on('click', function (e)
                {
                    e.preventDefault();

                    anchor = $(this);

                    // Get the ID of the current tab
                    tab_current_id = anchor.data('tab-id');

                    // Remove `active` class from all other anchors
                    $('a.is-active', tab_navigation).removeClass('is-active');

                    // Update current anchor with `active` class
                    anchor.addClass('is-active');

                    // Display tab contents for current anchor
                    if (typeof tab_current_id !== 'undefined' || tab_current_id !== '')
                    {
                        // Get the current tab
                        tab_current = $('[data-tab="' + tab_current_id + '"]');

                        if (typeof tab_current !== 'undefined' || tab_current !== '')
                        {
                            tab_content.addClass('is-hidden'); // Hide all other tab contents
                            tab_current.removeClass('is-hidden'); // Display the current tab
                        }
                    }
                });
            });
        }
    },

    /* Tooltips
       ========================================================================== */

    tooltips: function ()
    {
        var component_tooltip = $('[data-component="tooltip"]');

        if (component_tooltip.length > 0)
        {
            component_tooltip.each(function ()
            {
                $(this).tooltip();
            });
        }
    }
};

/* ==========================================================================
   Forms
   ========================================================================== */

var forms = {

    /* Placeholder
       ========================================================================== */

    /*
     * Automatically checks if the browser natively supports the HTML5 placeholder attribute for input and textarea
     * elements. If this is the case, the plugin won’t do anything.
     */

    placeholder: function ()
    {
        $('input, textarea').placeholder();
    }
};