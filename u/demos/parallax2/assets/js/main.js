(function()
{
    var document_title_default = 'Alice Lane';

    var navigation = $('.top');
    var navigation_anchor = $('[data-action="navigate"]');

    var page = $('html, body');
    var page_height = $(window).height();

    var scroll_counter_component = $('[data-component="scroll-counter"]');
    var scroll_top = 0;
    var scroll_duration = 750;

    var drop_down_anchor = $('[data-action="drop-down"]');
    var drop_down_component = $('[data-component="drop-down"]');

    var sections = [];
    var section_navigation_component = $('[data-component="section-navigation"]');

    var anchor_icon = $('i', drop_down_anchor);
    var anchor_icon_class = anchor_icon.attr('class');
    var anchor_icon_class_up = 'icon-angle-up';
    var anchor_icon_class_down = 'icon-angle-down';

    var navigation_id_join = 'join-alice-lane';

    // Find all section content elements
    $('.section').each(function(i)
    {
        sections[i] = {
            'id' : $(this).attr('id'),
            'label' : $(this).attr('data-section-label'),
            'title' : $(this).attr('data-section-title'),
            'offset' : $(this).position().top,
            'sequence' : i,
            'primary' : $(this).attr('data-section-primary') == 'true' ? 1 : 0
        }
    });

    // Section navigation data
    var section_navigation = {

        // About
        'welcome-to-alice-lane' : {
            'navigation' : [
                {
                    'id' : 'welcome-to-alice-lane',
                    'label' : 'Welcome To Alice Lane'
                },
                {
                    'id' : 'from-the-man-himself',
                    'label' : 'From The Man Himself'
                },
                {
                    'id' : 'location-is-everything',
                    'label' : 'Location Is Everything'
                },
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Training
        'rooftop-training' : {
            'navigation' : [
                {
                    'id' : 'rooftop-training',
                    'label' : 'Rooftop Training'
                },
                {
                    'id' : 'training-experience',
                    'label' : 'Training Experience'
                },
                {
                    'id' : 'group-exercise',
                    'label' : 'Group Exercise'
                },
                {
                    'id' : 'my-ride',
                    'label' : 'My Ride'
                },
                {
                    'id' : 'anti-gravity-yoga',
                    'label' : 'Anti Gravity Yoga'
                },
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Equipment
        'the-wattbike' : {
            'navigation' : [
                {
                    'id' : 'the-wattbike',
                    'label' : 'The Wattbike'
                },
                {
                    'id' : 'technogym',
                    'label' : 'Technogym'
                },
                {
                    'id' : 'queenmax-units',
                    'label' : 'Queenmax Units'
                },
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Facilities
        'health-suite' : {
            'navigation' : [
                {
                    'id' : 'health-suite',
                    'label' : 'Health Suite'
                },
                {
                    'id' : 'boardroom',
                    'label' : 'Boardroom'
                },
                {
                    'id' : 'poolside-lounge',
                    'label' : 'Poolside Lounge'
                },
                {
                    'id' : 'changerooms',
                    'label' : 'Changerooms'
                },
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Luxury
        'fine-dining' : {
            'navigation' : [
                {
                    'id' : 'fine-dining',
                    'label' : 'Fine Dining'
                },
                {
                    'id' : 'shoeshine-bar',
                    'label' : 'Shoeshine Bar'
                },
                {
                    'id' : 'the-nook',
                    'label' : 'The Nook'
                },
                {
                    'id' : 'aqua-lounge',
                    'label' : 'Aqua Lounge'
                },
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Contact
        'contact' : {
            'navigation' : [
                {
                    'id' : 'join-alice-lane',
                    'label' : 'Join Alice Lane'
                }
            ]
        },

        // Join
        'join-alice-lane' : {
            'navigation' : []
        }
    };

    var section_current = sections[0];
    var section_next;
    var is_section_primary = false;
    var section_navigation_data;

    // Check if there's a hash in the address
    if (window.location.hash)
    {
        var hash = window.location.hash;
        var section = $(hash);
        var section_label = getSectionLabel(section);
        var section_title = getSectionTitle(section);

        scrollToSection(section, 1); // Scroll directly to the section without animating
        updatePageTitle(section_title);

        if (isSectionPrimary(section))
        {
            updateActiveAnchor(section_label, section.attr('id'));
        }
        else
        {
            renderSectionNavigation(getParentSection(hash.replace('#', '')));
        }

        navigation.not(':animated').slideDown(200);
    }

    /**
     * Get the parent section (i.e. primary) of the current section
     * @param section
     * @returns {*}
     */
    function getParentSection(section)
    {
        var navigation_data;
        var navigation_section;
        var navigation_section_primary;

        // Find the primary section for the current section
        for (var index in section_navigation)
        {
            navigation_data = section_navigation[index];
            for (var i = 0; i < navigation_data.navigation.length; i++)
            {
                if (section == navigation_data.navigation[i].id)
                {
                    navigation_section_primary = index;
                    navigation_section = navigation_data.navigation[i].id;
                    break;
                }
            }
        }
        return navigation_section_primary;
    }

    // Listen for scrolling of document
    $(window).scroll(function()
    {
        scroll_top = $(window).scrollTop();

        // Update the next section based on how far we've scrolled
        section_next = getCurrentSection(scroll_top);

        // Hide the navigation at the top of the page
        if (scroll_top == 0)
        {
            navigation.not(':animated').slideUp(200);
        }

        // Show the navigation
        if (section_next.sequence >= 1 && navigation.css('display') != 'block')
        {
            navigation.not(':animated').slideDown(200);
        }

        if (section_current.id != section_next.id)
        {
            section_current = section_next;

            if (!isElementAnimating(page))
            {
                if (section_next.sequence == 0)
                {
                    updateWindowLocation('');
                    updatePageTitle('');
                }
                else
                {
                    updateWindowLocation(section_next.id);
                    updatePageTitle(section_next.title);

                    // Remove the current class from all scene navigation anchors
                    $('a', section_navigation_component).removeClass('current');

                    if (section_current.primary)
                    {
                        updateActiveAnchor(section_next.label, section_next.id);
                        renderSectionNavigation(section_next.id);
                    }
                    else
                    {
                        $('a[href="#' + section_next.id + '"]', section_navigation_component).addClass('current');
                    }
                }
            }
        }

        updateScrollCounter(scroll_top);
    });

    $(window).resize(function(e)
    {
        page_height = $(window).height();
    });

    /*
     * Drop-down navigation component
     */

    if (drop_down_anchor.length > 0 && drop_down_component.length > 0)
    {
        drop_down_anchor.on('click', function(e)
        {
            e.preventDefault();
            toggleDropDownNavigation();
        });
    }

    /*
     * Navigation anchors: drop-down
     */

    if (navigation_anchor.length > 0)
    {
        navigation_anchor.on('click', function()
        {
            updateNavigation($(this));
        });
    }

    /*
     * Navigation: sections
     */

    if (section_navigation_component.length > 0)
    {
        section_navigation_component.on('click', 'a', function()
        {
            updateNavigation($(this));
        });
    }

    /**
     * Update the navigation
     *
     * - Scroll to the relevant section
     * - Update the page title
     *
     * - Primary section:
     * -- Update active anchor
     * -- Render section navigation
     *
     * - Secondary section:
     * -- Add current class to section navigation
     *
     * @param anchor
     */
    function updateNavigation(anchor)
    {
        var scroll = true;
        if (anchor.attr('data-scroll') == 'false') // Check whether or not to scroll the animation
        {
            scroll = false;
        }

        var section = $(anchor.attr('href'));
        var section_id = section.attr('id');
        var section_label = getSectionLabel(section);
        var section_title = getSectionTitle(section);

        scrollToSection(section, scroll ? scroll_duration : 0);
        updatePageTitle(section_title);

        if (isSectionPrimary(section))
        {
            updateActiveAnchor(section_label, section_id);
            renderSectionNavigation(section_id);
        }
        else
        {
            $('a', section_navigation_component).removeClass('current');
            anchor.addClass('current');
        }

        hideDropDownNavigation();
    }

    /**
     * Hide the drop down navigation
     */
    function hideDropDownNavigation()
    {
        drop_down_component.stop(true, true).slideUp(200);

        anchor_icon = $('i', drop_down_anchor);
        anchor_icon.removeClass(anchor_icon_class_up);
        anchor_icon.addClass(anchor_icon_class_down);
    }

    /**
     * Render the navigation for a specific section
     *
     * @param section_id
     */
    function renderSectionNavigation(section_id)
    {
        section_navigation_component.html('');
        section_navigation_component.hide();
        section_navigation_data = section_navigation[section_id];
        var addCurrentClass = false;
        var section_navigation_id;
        var section_navigation_data_attr = '';

        for (var i = 0; i < section_navigation_data.navigation.length; i++)
        {
            section_navigation_id = section_navigation_data.navigation[i].id; // Get the ID of the current section

            if (i == 0 && section_navigation_data.navigation.length > 1)
            {
                addCurrentClass = true; // Only add current class to the first item if there is more than 1 item
            }

            if (section_navigation_id == navigation_id_join) // Unique case for Join Alice Lane
            {
                section_navigation_data_attr = 'data-scroll="false"';
            }

            // Append the menu items to the section navigation
            section_navigation_component.append('<li><a href="#' + section_navigation_id + '" data-action="navigate"' + (section_navigation_data_attr != '' ? section_navigation_data_attr : '') + (addCurrentClass ? ' class="current"' : '') + '>' + section_navigation_data.navigation[i].label + '</a></li>');

            if (addCurrentClass)
            {
                addCurrentClass = false; // Reset current class variable
            }

            if (section_navigation_data_attr != '')
            {
                section_navigation_data_attr = ''; // Reset the section navigation data attribute
            }
        }

        section_navigation_component.show();
    }

    /**
     * Get the label of the section. This is the collective group name of the section.
     *
     * @param section
     * @returns {*}
     */
    function getSectionLabel(section)
    {
        return section.attr('data-section-label');
    }

    /**
     * Get the title of the section. This is unique per section.
     *
     * @param section
     * @returns {*}
     */
    function getSectionTitle(section)
    {
        return section.attr('data-section-title');
    }

    /**
     * Check whether a section is primary
     *
     * @param section
     * @returns {number}
     */
    function isSectionPrimary(section)
    {
        return section.attr('data-section-primary') == 'true' ? 1 : 0;
    }

    /**
     * Update the page title
     * @param section
     */
    function updatePageTitle(section)
    {
        document.title = section != '' ? document_title_default + ' – ' + section : document_title_default;
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
     * Find the current section
     *
     * @param scroll_top
     * @returns {*}
     */
    function getCurrentSection(scroll_top)
    {
        var current_section = sections[0];

        for (var i = 0; i < sections.length; i++)
        {
            if (sections[i].offset <= scroll_top + (page_height / 2))
            {
                current_section = sections[i];
            }
        }
        return current_section;
    }

    /**
     * Scroll the page down based on the top offset of the element
     *
     * @param section
     * @param duration
     */
    function scrollToSection(section, duration)
    {
        page.stop(true, true).animate({
            easing : 'easeOutExpo',
            scrollTop : section.position().top
        }, duration);
    }

    /**
     * Toggle the display of the drop-down navigation menu
     */
    function toggleDropDownNavigation()
    {
        // Toggle the display of the drop-down menu
        drop_down_component.stop(true, true).slideToggle(200);

        anchor_icon = $('i', drop_down_anchor);
        anchor_icon_class = anchor_icon.attr('class');

        // Switch the class of the drop-down anchor icon
        if (anchor_icon_class == anchor_icon_class_down)
        {
            anchor_icon.removeClass(anchor_icon_class_down);
            anchor_icon.addClass(anchor_icon_class_up);
        }
        else
        {
            anchor_icon.removeClass(anchor_icon_class_up);
            anchor_icon.addClass(anchor_icon_class_down);
        }
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
            history.pushState(null, null, href != '' ? '#' + href : null);
        }
        else
        {
            location.hash = href != '' ? '#' + href : '';
        }
    }

    /**
     * Update the primary drop-down anchor
     *
     * @param label
     * @param href
     */
    function updateActiveAnchor(label, href)
    {
        $('span', drop_down_anchor).html(label);
        drop_down_anchor.attr('href', href);
    }

    /**
     * Update the scroll counter display with the number of pixels scrolled
     *
     * @param scrolled
     */
    function updateScrollCounter(scrolled)
    {
        if (scroll_counter_component.length > 0)
        {
            $('span', scroll_counter_component).html(scrolled);
        }
    }

}(jQuery));