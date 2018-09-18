(function()
{
    var page = $('html, body');
    var page_offset = $('nav.top').height(); // Height of the fixed primary navigation
    var body = $('body');
    var scene_navigation = $('.scene-navigation');

    // Array containing all the scenes data
    var scenes = [];

    $('.scene').each(function(i)
    {
        var scene = $(this);

        scenes[i] = {
            'id' : scene.attr('id'),
            'label' : scene.attr('data-scene-label'),
            'href' : '#' + scene.attr('id'),
            'offset' : scene.offset().top,
            'sequence' : i
        };
    });

    // Array containing all scenes navigation data
    var scenes_navigation = {
        'scene-1' : {
            'parent' : 'scene-1',
            'navigation' : [
                {
                    'id' : 'scene-1-1',
                    'label' : 'Scene 1.1'
                },
                {
                    'id' : 'scene-1-2',
                    'label' : 'Scene 1.2'
                },
                {
                    'id' : 'scene-1-3',
                    'label' : 'Scene 1.3'
                },
                {
                    'id' : 'scene-1-4',
                    'label' : 'Scene 1.4'
                }
            ]
        },
        'scene-2' : {
            'parent' : 'scene-2',
            'navigation' : [
                {
                    'id' : 'scene-2-1',
                    'label' : 'Scene 2.1'
                },
                {
                    'id' : 'scene-2-2',
                    'label' : 'Scene 2.2'
                }
            ]
        },
        'scene-3' : {
            'parent' : 'scene-3',
            'navigation' : [
                {
                    'id' : 'scene-3-1',
                    'label' : 'Scene 3.1'
                }
            ]
        },
        'scene-4' : {
            'parent' : 'scene-4',
            'navigation' : [
                {
                    'id' : 'scene-4-1',
                    'label' : 'Scene 4.1'
                },
                {
                    'id' : 'scene-4-2',
                    'label' : 'Scene 4.2'
                },
                {
                    'id' : 'scene-4-3',
                    'label' : 'Scene 4.3'
                },
                {
                    'id' : 'scene-4-4',
                    'label' : 'Scene 4.4'
                },
                {
                    'id' : 'scene-4-5',
                    'label' : 'Scene 4.5'
                }
            ]
        },
        'scene-5' : {
            'parent' : 'scene-5',
            'navigation' : [
                {
                    'id' : 'scene-5-1',
                    'label' : 'Scene 5.1'
                },
                {
                    'id' : 'scene-5-2',
                    'label' : 'Scene 5.2'
                },
                {
                    'id' : 'scene-5-3',
                    'label' : 'Scene 5.3'
                },
                {
                    'id' : 'scene-5-4',
                    'label' : 'Scene 5.4'
                },
                {
                    'id' : 'scene-5-5',
                    'label' : 'Scene 5.5'
                }
            ]
        }
    };

    /*
     * Ensure that we start with a hash
     */

    (function(hash)
    {
        if (!hash)
        {
            // Get the first scene
            var scene = scenes[0].href;

            updateElementAttr(body, 'data-current-scene', scene.replace('#', ''));
            updateElementAttr(body, 'data-parent-scene', scene.replace('#', ''));
            updateWindowLocation(scene);
        }
    }(location.hash.slice(1)));

    /*
     * Pulsing animation effect
     */

    var pulse = $('[data-action="pulse"]');

    if (pulse.length > 0)
    {
        setInterval(function()
        {
            pulse.toggle()
        }, 500);
    }

    /*
     * Primary drop-down navigation
     */

    var navigation_primary = $('ol.primary-navigation');
    var drop_down = $('[data-action="drop-down"]');

    if (drop_down.length > 0)
    {
        drop_down.on('click', (function(e)
        {
            e.preventDefault();

            navigation_primary.stop(true, true).slideToggle(
                {
                    duration : 400,
                    easing : 'easeOutExpo'
                });
        }));
    }

    /*
     * Navigate the page to the relevant section based on the href of the anchor
     */

    var navigate_link = $('a[data-action="navigate"]');

    if (navigate_link.length > 0)
    {
        navigate_link.on('click', (function()
        {
            navigateToSection($(this), scrollAnimation($(this)));
        }));
    }

    /*
     * Navigate the page to the relevant section based on the href of the anchor
     */

    var navigate_ol = $('ol[data-action="navigate"]');

    if (navigate_ol.length > 0)
    {
        $(navigate_ol).on('click', 'a', (function()
        {
            navigateToSection($(this), scrollAnimation($(this)));
        }));
    }

    /*
     * Listen for window scroll event
     */

    var active_anchor = $('#active');

    $(window).scroll(function()
    {
        var scroll_top = $(window).scrollTop();
        var current_scene_data = getCurrentScene(scroll_top);
        var current_scene = $('#' + current_scene_data.id);

        if (scroll_top == 0) // Top of the page
        {
            // Update the URL to the has of the first scene
            updateWindowLocation(scenes[0].href);

            // Clear active anchor href
            active_anchor.attr('href', '');
        }
        else if (!isElementAnimating(page)) // Page is not currently animating
        {
            // Scenes have changed and the scene is not the first one
            if (current_scene_data.sequence > 0 && current_scene_data.href != active_anchor.attr('href'))
            {
                updateActiveAnchor(current_scene_data.label, current_scene_data.href);
                updateWindowLocation(scenes[current_scene_data.sequence].href);
            }

            // Check if the scenes have changed
            if (body.attr('data-current-scene') != current_scene_data.href.replace('#', ''))
            {
                body.attr('data-current-scene', current_scene_data.href.replace('#', ''));
                body = $('body'); // Update the body reference

                // Remove the current class from all scene navigation anchors
                $('a', scene_navigation).removeClass('current');

                if (current_scene.attr('data-scene-primary'))
                {
                    updateElementAttr(body, 'data-parent-scene', current_scene_data.href.replace('#', ''));
                }
                else
                {
                    // Add the current class to the current scene navigation anchor
                    $('a[href="#' + body.attr('data-current-scene') + '"]', scene_navigation).addClass('current');
                }
            }
        }

        updateScrollCount(scroll_top);
    });

    /**
     * Update the attribute of an element
     *
     * @param element
     * @param attribute
     * @param value
     */
    function updateElementAttr(element, attribute, value)
    {
        element.attr(attribute, value);
    }

    /**
     * Update the window's location
     *
     * @param href
     */
    function updateWindowLocation(href)
    {
        if (history.pushState)
        {
            history.pushState(null, null, href);
        }
        else
        {
            location.hash = href;
        }
    }

    /**
     * Check whether or not to scroll an animation
     *
     * @param href
     * @returns {*}
     *
     */
    function scrollAnimation(href)
    {
        var data_scroll = href.attr('data-scroll');
        return data_scroll === undefined || !data_scroll;
    }

    /**
     * Check if an element is currently being animated
     *
     * @param el
     * @returns {*}
     */
    function isElementAnimating(el)
    {
        return el.is(':animated');
    }

    /**
     * Find the current scene
     *
     * @param scroll_top
     * @returns {*}
     */
    function getCurrentScene(scroll_top)
    {
        var current_scene;

        for (var i = 0; i < scenes.length; i++)
        {
            if (scenes[i].offset <= scroll_top + parseInt(page_offset))
            {
                current_scene = scenes[i];
            }
        }
        return current_scene;
    }

    /**
     * Update the display label and href of the active anchor
     *
     * @param label
     * @param href
     */
    function updateActiveAnchor(label, href)
    {
        // Get the navigation data for the scene
        var scene_navigation_data = scenes_navigation[href.replace('#', '')];

        if (scene_navigation_data !== undefined)
        {
            // Update the active anchor
            active_anchor.html(label);
            active_anchor.attr('href', href);

            // Clear the HTML of the scene navigation
            scene_navigation.html('');
            scene_navigation.hide();

            // Render the scene navigation
            for (var i = 0; i < scene_navigation_data.navigation.length; i++)
            {
                scene_navigation.append('<li><a href="#' + scene_navigation_data.navigation[i].id + '">' + scene_navigation_data.navigation[i].label + '</a></li>');
            }

            // Display the scene navigation
            scene_navigation.show();
        }
    }

    /**
     * Update the navigation to indicate the currently active anchor
     *
     * @param anchor
     * @param scroll
     */
    function navigateToSection(anchor, scroll)
    {
        var duration = scroll ? '250' : 0;
        var active_anchor_label = anchor.attr('data-anchor-label');
        var active_anchor_href = anchor.attr('href');
        var active_section = $(active_anchor_href);

        if (active_section.length > 0)
        {
            page.animate({
                easing : 'easeOutExpo',
                scrollTop : active_section.position().top
            }, duration);
        }

        updateActiveAnchor(active_anchor_label, active_anchor_href);
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