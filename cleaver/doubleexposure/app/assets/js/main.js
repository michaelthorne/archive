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
        components.button_loading();
        components.carousel();
        components.masonry();
        components.modal();
        components.navigation();
        components.pin();
        components.scrollable_table();
        components.scroll_to();
        components.slider();
        components.split_button();
        components.tabs();
        components.toggle_container();
        components.toggle_input();
        components.toggle_sidebar();
        components.tooltips();

        /*
         * Forms
         */

        forms.placeholder();

        /*
         * Functions
         */

        (function ($)
        {
            /**
             * Utilities for working with buttons
             *
             * @param action
             *
             * Example usage: $(selector).btn(action);
             */
            $.fn.btn = function (action)
            {
                var button = this;
                var button_reset_text = button.data('reset-text');

                if (action === 'reset')
                {
                    button.html(button_reset_text);
                    button.removeClass('is-loading');
                }

                if (action === 'close')
                {
                    button.next($('.split-button-actions').addClass('is-hidden'));
                }
            };

        }(jQuery));
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
                        $('.icon', header).removeClass(icon_class_opened);
                        $('.icon', header).addClass(icon_class_closed);
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
                            accordion_current_header_icon = $('.icon', accordion_current_header);

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

    /* Button Loading
       ========================================================================== */

    button_loading: function ()
    {
        var button_loading = $('[data-loading-text]');

        if (button_loading.length > 0)
        {
            button_loading.each(function ()
            {
                var button = $(this);

                button.on('click', function ()
                {
                    var loading_text = button.data('loading-text');

                    button.addClass('is-loading');
                    button.val(loading_text);
                    button.html(loading_text);
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

    /* Masonry
       ========================================================================== */

    masonry: function ()
    {
        var masonry_container = $('.sg-masonry');

        if (masonry_container.length > 0)
        {
            $(document).ready(function ()
            {
                masonry_container.masonry(
                {
                    itemSelector: '.sg-masonry__item'
                });
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
            component_modal.each(function ()
            {
                var trigger = $(this);

                trigger.on('click', function (e)
                {
                    e.preventDefault();

                    var modal_id = $(this).data('modal-id');

                    if (typeof modal_id !== 'undefined')
                    {
                        var modal = $('#' + modal_id);

                        if (modal.length > 0)
                        {
                            modal.modal('show');
                        }
                    }
                });
            });
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

                        drop_down_icon = $('.icon', $(this)); // Get the icon within the anchor

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

                        // Hide all other drop-down containers
                        $('.list-nav-drop-down').not(drop_down_menu).removeClass('is-visible');

                        // Reset all other drop-down anchors
                        $('[data-drop-down="true"] > a').not(drop_down_anchor).removeClass('is-active');

                        // Reset all other drop-down icons
                        $('[data-drop-down="true"] > a > .icon').not(drop_down_icon).removeClass(icon_up).addClass(icon_down);
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

    /* Pin
       ========================================================================== */

    pin: function ()
    {
        var action_pin = $('[data-action="pin"]');

        if (action_pin.length > 0)
        {
            var trigger = $('[data-scroll-trigger="true"]');
            var trigger_offset = trigger.offset().top;
            var scrolled = 0;
            var main = $('.main');
            var main_contents = $('.main-contents');
            var panel = $('.panel');
            var toolbar = $('.toolbar');
            var min_width = 1100;

            $(window).on('scroll', function ()
            {
                scrolled = $(window).scrollTop();

                if ($(window).width() >= min_width) // Only applicable to wider screens
                {
                    if (scrolled >= trigger_offset) // See if we've scrolled down enough
                    {
                        if (!main.hasClass('is-pinned') && main_contents.height() >= panel.height())
                        {
                            main.addClass('is-pinned'); // Pin it
                            panel.css('height', $(window).height()); // Force a height to ensure scrolling
                            toolbar.css('width', main_contents.width()); // Force a width due to 100% in CSS
                        }
                    }
                    else
                    {
                        if (main.hasClass('is-pinned'))
                        {
                            // Reset everything
                            main.removeClass('is-pinned');
                            panel.css('height', '100%');
                            toolbar.css('width', 'auto');
                        }
                    }
                }
            });

            $(window).on('resize', function ()
            {
                if (main.hasClass('is-pinned'))
                {
                    panel.css('height', $(window).height()); // Force a height to ensure scrolling
                    toolbar.css('width', main_contents.outerWidth(false)); // Force a width due to 100% in CSS
                }
            });
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

    /* Scroll To
       ========================================================================== */

    scroll_to: function()
    {
        var scroll_to = $('[data-scroll-to="true"]');

        if (scroll_to.length > 0)
        {
            var html = $('html');

            html.animate({
                scrollTop: scroll_to.position().top
            }, 500);
        }
    },

    /* Split Button
       ========================================================================== */

    split_button: function()
    {
        var component_split_button = $('[data-component="split-button"]');

        if (component_split_button.length > 0)
        {
            component_split_button.each(function ()
            {
                var split_button = $(this);
                var button_icon = $('.btn-icon', split_button);
                var button_actions = $('.split-button-actions', split_button);

                // Hide all button actions
                button_actions.addClass('is-hidden');

                button_icon.on('click', function (e)
                {
                    e.preventDefault();

                    // Toggle the `.is-active` class of the icon button
                    $(this).toggleClass('is-active');

                    // Toggle the `.is-hidden` class of the button actions
                    button_icon.nextAll('.split-button-actions').first().toggleClass('is-hidden');
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
            component_tabs.each(function ()
            {
                var tab = $(this);
                var tab_navigation = $('.tabs-navigation');
                var tab_content = $('.tab-content', tab);

                // Hide contents
                tab_content.each(function ()
                {
                    var content = $(this);

                    if (!content.hasClass('is-visible')) // Displayed by default
                    {
                        content.addClass('is-hidden');
                    }
                });

                $('a', tab_navigation).on('click', function (e)
                {
                    e.preventDefault();

                    var anchor = $(this);

                    // Get the ID of the current tab
                    var tab_current_id = anchor.data('tab-id');

                    // Remove `active` class from all other anchors
                    $('a.is-active', tab_navigation).removeClass('is-active');

                    // Update current anchor with `active` class
                    anchor.addClass('is-active');

                    // Display tab contents for current anchor
                    if (typeof tab_current_id !== 'undefined' || tab_current_id !== '')
                    {
                        // Get the current tab
                        var tab_current = $('[data-tab="' + tab_current_id + '"]');

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

    /* Toggle
       ========================================================================== */

    toggle_container: function ()
    {
        var action_toggle_container = $('[data-action="toggle-container"]');

        if (action_toggle_container.length > 0)
        {
            action_toggle_container.each(function ()
            {
                var toggle = $(this);
                var toggle_id = toggle.data('toggle-id');

                $('[data-component="toggle-container"]').addClass('is-hidden'); // Hide all containers

                toggle.on('click', function (e)
                {
                    e.preventDefault();

                    // Find the component to toggle
                    var toggle_container_component = $('[data-component-id="' + toggle_id + '"]');

                    if (typeof toggle_container_component !== undefined || toggle_container_component !== '')
                    {
                        toggle_container_component.toggleClass('is-hidden');
                        components.scroll_to();
                    }
                });
            });
        }
    },

    /* Toggle Input
       ========================================================================== */

    toggle_input: function ()
    {
        var action_toggle_container = $('[data-action="toggle-input"]');

        if (action_toggle_container.length > 0)
        {
            action_toggle_container.each(function ()
            {
                var toggle = $(this);

                $('[data-component="toggle-input"]').addClass('is-hidden'); // Hide all containers

                toggle.on('change', function (e)
                {
                    e.preventDefault();

                    var toggle_id = $(this).find(':selected').data('toggle-input-id');

                    // Hide all other components
                    $('[data-component="toggle-input"]').each(function ()
                    {
                        var component = $(this);
                        var component_toggle_input_id = component.data('component-toggle-input-id');

                        if (component_toggle_input_id !== toggle_id)
                        {
                            component.addClass('is-hidden');
                        }
                    });

                    // Find the component to toggle
                    var toggle_container_component = $('[data-component-toggle-input-id="' + toggle_id + '"]');

                    if (typeof toggle_container_component !== undefined || toggle_container_component !== '')
                    {
                        toggle_container_component.toggleClass('is-hidden');
                    }
                });
            });
        }
    },

    /* Toggle Sidebar
       ========================================================================== */

    toggle_sidebar: function ()
    {
        var action_toggle_sidebar = $('[data-action="toggle-sidebar"]');

        if (action_toggle_sidebar.length > 0)
        {
            // Icons
            var icon_narrow = 'fa-long-arrow-right';
            var icon_wide = 'fa-long-arrow-left';

            // Containers
            var toggle_icon = $('.icon', action_toggle_sidebar);
            var sidebar = $('.sidebar');
            var sidebar_list_nav = $('.list-nav', sidebar);
            var main_admin = $('.main-admin');

            if (sidebar.length > 0 && main_admin.length > 0)
            {
                action_toggle_sidebar.on('click', function (e)
                {
                    e.preventDefault();

                    // Call the action to set the session state
                    $.get($(this).attr('href'));

                    // Toggle the display classes
                    sidebar.toggleClass('is-narrow');
                    sidebar_list_nav.toggleClass('is-narrow');
                    main_admin.toggleClass('is-wide');

                    // Update icon class
                    if (toggle_icon.hasClass(icon_wide))
                    {
                        toggle_icon.removeClass(icon_wide);
                        toggle_icon.addClass(icon_narrow);
                    }
                    else
                    {
                        toggle_icon.removeClass(icon_narrow);
                        toggle_icon.addClass(icon_wide);
                    }
                });
            }
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
