/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/XtN0RS by Jason Garber
 * ======================================================================== */

SITENAME = {

    common: {

        init: function ()
        {
            /*
             * Check to see if the current browser supports DOM level 2 events e.g. `addEventListener`.
             * Internet Explorer 8 and below does not.
             * Based on: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
             */

            var isModernBrowser = ('addEventListener' in window) ? true : false;

            /*
             * Breakpoints / Screen Dimensions
             */

            var breakpoint_med = 1024; // `@bp-medium`
            var screen_height = document.body.clientHeight;
            var screen_width = document.body.clientWidth;

            /* ==========================================================================
               Accordion
               ========================================================================== */

            var $accordion_component = $('[data-component="accordion"]');

            if ($accordion_component.length > 0)
            {
                $accordion_component.each(function ()
                {
                    var $accordion = $(this);
                    var $accordion_link = $('.accordion-item__link', $accordion);

                    if (screen_width > breakpoint_med)
                    {
                        /*
                         * Only expand the first accordion item on wide(r) screens
                         */

                        $accordion_link.closest('.accordion-item').first().addClass('is-selected');
                    }

                    $accordion_link.on('click', function (e)
                    {
                        e.preventDefault();

                        var $link = $(this);
                        var $item = $link.parents('.accordion-item');
                        var $icon = $('.icon', $link);
                        var icon_up = $link.data('icon-up');
                        var icon_down = $link.data('icon-down');

                        /*
                         * Update the selected accordion item
                         */

                        if ($item.hasClass('is-selected'))
                        {
                            $item.removeClass('is-selected');
                            $item.attr('aria-hidden', 'true').attr('aria-selected', 'false');
                            $icon.removeClass(icon_up).addClass(icon_down);
                        }
                        else
                        {
                            $item.addClass('is-selected');
                            $item.attr('aria-hidden', 'false').attr('aria-selected', 'true');
                            $icon.removeClass(icon_down).addClass(icon_up);
                        }

                        /*
                         * Reset the display of all other accordion items
                         */

                        $('.accordion-item__link .icon', $accordion).not($icon).removeClass(icon_up).addClass(icon_down);
                        $('.accordion-item', $accordion).not($item).removeClass('is-selected').attr('aria-hidden', 'true').attr('aria-selected', 'false');

                        /*
                         * Scroll the accordion into focus
                         */

                        $('html, body').animate({
                            easing: 'easeOutExpo',
                            scrollTop: screen_width < breakpoint_med ? $accordion.offset().top - 80 : $accordion.offset().top
                        }, 250);
                    });
                });
            }

            /* ==========================================================================
               Autocomplete
               ========================================================================== */

            var $autocomplete_component = $('[data-component="autocomplete"]');

            if ($autocomplete_component.length > 0)
            {
                /**
                 * Initialize the Autocomplete component
                 */

                if (typeof autocomplete_data !== 'undefined' && autocomplete_data !== '')
                {
                    $autocomplete_component.autocomplete({
                        minLength: 1,
                        source: autocomplete_data
                    });
                }

                /**
                 * Update the Autocomplete results by highlighting the term being searched for
                 *
                 * @param ul
                 * @param item
                 * @returns {*|jQuery}
                 * @private
                 */

                $.ui.autocomplete.prototype._renderItem = function (ul, item)
                {
                    var newText = String(item.value).replace(new RegExp(this.term, "gi"), "<b>$&</b>");

                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append(newText)
                        .appendTo(ul);
                };
            }

            /* ==========================================================================
               Alert
               ========================================================================== */

            var $alert_component = $('[data-component="alert"]');

            if ($alert_component.length > 0)
            {
                $alert_component.each(function ()
                {
                    var $alert = $(this);

                    var $dismiss_alert = $('[data-action="dismiss"]', $alert);

                    $dismiss_alert.on('click', function (e)
                    {
                        e.preventDefault();

                        $alert.fadeOut();
                    });
                });
            }

            /* ==========================================================================
               Back to Top
               ========================================================================== */

            var $back_to_top = $('[data-action="back-to-top"]');

            if ($back_to_top.length > 0)
            {
                $back_to_top.on('click', function (e)
                {
                    e.preventDefault();

                    $('html, body').animate({
                        easing: 'easeOutExpo',
                        scrollTop: 0
                    }, 250);
                });
            }

            /* ==========================================================================
               Clickable List Items
               ========================================================================== */

            var $clickable_items_component = $('[data-component="clickable-items"]');

            if ($clickable_items_component.length > 0)
            {
                var $list_items = $('> ol > li', $clickable_items_component);

                $list_items.each(function ()
                {
                    var $list_item = $(this);

                    $list_item.on('click', function ()
                    {
                        var $anchor = $('a:first', $list_item);

                        if ($anchor.length > 0)
                        {
                            var anchor_href = $anchor.attr('href');

                            if (anchor_href !== '')
                            {
                                window.location = anchor_href;
                            }
                        }
                    });
                });
            }

            /* ==========================================================================
               Navigation
               ========================================================================== */

            /*
             * Drop-down
             */

            var $nav_component = $('[data-component="nav"]');

            if ($nav_component.length > 0)
            {
                var $nav_drop_down = $('[data-drop-down="true"]', $nav_component);

                $('> a', $nav_drop_down).on('click', function (e)
                {
                    e.preventDefault();

                    $(this).parent('li').toggleClass('is-active');
                });
            }

            /*
             * Off-canvas
             */

            var $nav_toggle = $('[data-action="nav-toggle"]');

            if ($nav_toggle.length > 0)
            {
                var $nav_toggle_icon = $('.icon', $nav_toggle);
                var $nav_vertical_component = $('[data-component="nav-vertical"]');
                var $html = $('html');

                var icon_open = 'fa-bars';
                var icon_close = 'fa-times';

                $nav_toggle.on('click', function ()
                {
                    if ($html.hasClass('nav-is-visible'))
                    {
                        $html.addClass('nav-is-hidden');
                        $html.removeClass('nav-is-visible');
                        $nav_toggle_icon.removeClass(icon_close);
                        $nav_toggle_icon.addClass(icon_open);
                    }
                    else
                    {
                        $html.addClass('nav-is-visible');
                        $html.removeClass('nav-is-hidden');
                        $nav_toggle_icon.removeClass(icon_open);
                        $nav_toggle_icon.addClass(icon_close);
                    }
                });

                /*
                 * Close the navigation on click outside of the navigation
                 */

                $('body').on('click', function (e)
                {
                    if (e.target !== $nav_vertical_component[0] && !$nav_toggle[0].contains(e.target))
                    {
                        $html.addClass('nav-is-hidden');
                        $html.removeClass('nav-is-visible');
                        $nav_toggle_icon.removeClass(icon_close);
                        $nav_toggle_icon.addClass(icon_open);
                    }
                });
            }

            /* ==========================================================================
               Placeholder
               ========================================================================== */

            $('input, textarea').placeholder();

            /* ==========================================================================
               Scroll Top
               ========================================================================== */

            var $scroll_top = $('[data-scroll-top="true"]');

            if ($scroll_top.length > 0)
            {
                var element_id = $scroll_top.attr('id');
                var $element = $('#' + element_id);

                if (element_id.length > 0 && $element.length > 0)
                {
                    $('html, body').animate({
                        easing: 'easeOutExpo',
                        scrollTop: screen_width < breakpoint_med ? $element.offset().top - 80 : $element.offset().top
                    }, 500);
                }
            }

            /* ==========================================================================
               Sticky Sidebar
               ========================================================================== */

            var $sticky_sidebar = $('[data-sticky-sidebar="true"]');

            if ($sticky_sidebar.length > 0)
            {
                stickySidebar();
            }

            /**
             * Fix position the sidebar based if the screen width and content dimensions permit
             */

            function stickySidebar()
            {
                var scrolled = 0;
                var sticky_scroll_handler;

                var $section = $('.l-section');
                var section_height = $section.height();

                var sidebar_height = $sticky_sidebar.height();
                var sidebar_offset_top = $sticky_sidebar.offset().top;

                screen_height = document.body.clientHeight;
                screen_width = document.body.clientWidth;

                if (screen_width >= breakpoint_med) // Medium screens and greater only
                {
                    sticky_scroll_handler = $(window).scroll(function ()
                    {
                        scrolled = $(window).scrollTop(); // Update the distance scrolled variable

                        /*
                         * Ensure that section contents are taller than the sidebar
                         */

                        if ((section_height - sidebar_offset_top) > sidebar_height && screen_height > sidebar_height)
                        {
                            /*
                             * Toggle the `.is-sticky` class on the sidebar
                             */

                            if (scrolled >= sidebar_offset_top)
                            {
                                if (!$sticky_sidebar.hasClass('is-sticky'))
                                {
                                    $sticky_sidebar.addClass('is-sticky');
                                }
                            }
                            else
                            {
                                if ($sticky_sidebar.hasClass('is-sticky'))
                                {
                                    $sticky_sidebar.removeClass('is-sticky');
                                }
                            }
                        }
                        else
                        {
                            if ($sticky_sidebar.hasClass('is-sticky'))
                            {
                                $sticky_sidebar.removeClass('is-sticky');
                            }
                        }
                    });
                }
                else
                {
                    /*
                     * Remove the scroll handler
                     */

                    $(window).unbind('scroll', sticky_scroll_handler);
                }
            }

            /* ==========================================================================
               Tabs
               ========================================================================== */

            var $tabs_component = $('[data-component="tabs"]');

            if ($tabs_component.length > 0)
            {
                $tabs_component.each(function ()
                {
                    var $tabs = $(this);
                    var $tablist = $('.tab-list', $tabs);
                    var $tablist_link = $('a', $tablist);

                    $tablist_link.on('click', function (e)
                    {
                        e.preventDefault();

                        var $link = $(this);
                        var $tab = $link.parent();
                        var tab_panel_id = $tab.attr('aria-controls');
                        var $tab_panel = $('#' + tab_panel_id);

                        /*
                         * Reset the display of all other tabs
                         */

                        $('.tab-list li', $tabs).not($tab).removeClass('is-selected').attr('aria-selected', 'false');
                        $('.tab-panel', $tabs).not($tab_panel).removeClass('is-active').attr('aria-hidden', 'true');

                        /*
                         * Display the selected tab
                         */

                        if (!$tab.hasClass('is-selected'))
                        {
                            $tab.attr('aria-selected', 'true');
                            $tab.addClass('is-selected');
                            $tab_panel.addClass('is-active');
                            $tab_panel.attr('aria-hidden', 'false');
                        }
                    });
                });
            }

            /* ==========================================================================
               Toggle Password
               ========================================================================== */

            var $toggle_password = $('[data-component="toggle-password"]');

            if ($toggle_password.length > 0 && isModernBrowser)
            {
                $toggle_password.each(function ()
                {
                    var $form = $(this);
                    var $input = $('input[type="password"]', $form);
                    var $toggle = $('[data-toggle="password"]', $form);

                    $toggle.removeClass('visuallyhidden'); // Enable the toggle button

                    /*
                     * Switch the input type
                     */

                    $toggle.on('click', function (e)
                    {
                        e.preventDefault();

                        if ($input.attr('type') == 'password')
                        {
                            $toggle.html('Hide');
                            $input.attr('type', 'text');
                        }
                        else
                        {
                            $toggle.html('Show');
                            $input.attr('type', 'password');
                        }

                        $input.focus(); // Keep keyboard active on touchscreen devices
                    });

                    /*
                     * Reset the input type
                     */

                    $form.on('submit', function ()
                    {
                        $input.attr('type', 'password');
                    });
                });
            }

            /* ==========================================================================
               Toggle Visibility
               ========================================================================== */

            var $toggle_visibility = $('[data-action="toggle-visibility"]');

            if ($toggle_visibility.length > 0)
            {
                $toggle_visibility.each(function ()
                {
                    var $toggle_action = $(this);

                    $toggle_action.on('click', function (e)
                    {
                        if ($toggle_action.attr('href') == '#')
                        {
                            e.preventDefault();
                        }

                        var parent_id = $toggle_action.data('parent-id'); // The container to be hidden
                        var toggle_id = $toggle_action.data('toggle-id'); // The container to be displayed

                        var $parent = $('#' + parent_id);
                        var $toggle = $('#' + toggle_id);

                        if (parent_id === toggle_id) // Toggle the visibility of a single container
                        {
                            if ($toggle.length > 0)
                            {
                                $toggle.toggleClass('hidden');
                            }
                        }
                        else // Toggle the visibility between two containers
                        {
                            if ($parent.length > 0)
                            {
                                $parent.addClass('hidden');
                            }

                            if ($toggle.length > 0)
                            {
                                $toggle.removeClass('hidden');
                            }
                        }

                        updateRequiredAttributes($toggle); // Set the required attributes within visible container
                        removeRequiredAttributes(); // Remove the required attributes within hidden container
                    });
                });

                removeRequiredAttributes();
            }

            /**
             *  Remove the `required` attribute of the element if it is within a hidden container
             */

            function removeRequiredAttributes()
            {
                var $hidden_containers = $('.hidden');

                $hidden_containers.each(function ()
                {
                    $('[required="required"]', $(this)).removeAttr('required');
                });
            }

            /**
             * Set the `required` attribute of the element
             * @param container
             */

            function updateRequiredAttributes(container)
            {
                var $required = $('[data-required="true"]', container);

                $required.each(function ()
                {
                    $(this).attr('required', 'required');
                });
            }

            /* ==========================================================================
               Window Resize
               ========================================================================== */

            $(window).on('resize', function ()
            {
                if ($sticky_sidebar.length > 0)
                {
                    stickySidebar();
                }
            });
        }
    }
};

UTIL = {

    exec: function (controller, action)
    {
        var ns = SITENAME;
        action = ( action === undefined ) ? 'init' : action;

        if (controller !== '' && ns[controller] && typeof ns[controller][action] == 'function')
        {
            ns[controller][action]();
        }
    },

    init: function ()
    {
        var body = document.body;
        var controller = body.getAttribute('data-controller');
        var action = body.getAttribute('data-action');

        UTIL.exec('common');
        UTIL.exec(controller);
        UTIL.exec(controller, action);
    }
};
