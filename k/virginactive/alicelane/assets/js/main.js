/* =============================================================================
 Main: Website/application specific jQuery code.
 ========================================================================== */

(function()
{
    var window_width = $(window).width(); // Get the width of the viewport
    var screen_width_wide = 1180; // Minimum width for wide screen

    /*
     * Pulsing Effect
     */

    var pulse_animation_component = $('[data-animate="pulse"]');

    var interval_pulse = setInterval(function()
    {
        pulse_animation_component.fadeToggle();
    }, 1000);

    /*
     * Initialize the skrollr plug-in
     */

    if (window_width >= screen_width_wide)
    {
        skrollr.init();
    }
    else
    {
        // Stop pulse
        clearInterval(interval_pulse);
    }

    /*
     * Custom scrolling functionality
     */

    var scroller_component = $('[data-component="scroller"]');
    var back_to_top = $('[data-action="back-to-top"]');

    if (scroller_component.length > 0)
    {
        /*
         * Section specific data for the website
         */

        var sections_data = {

            // Landing
            'landing' : {

                'id' : 'landing',
                'label' : 'Landing',
                'title' : 'Virgin Active Alice Lane',
                'sequence' : 0,
                'primary' : true
            },

            // About
            'welcome-to-alice-lane' : {

                'id' : 'welcome-to-alice-lane',
                'label' : 'About',
                'title' : 'Welcome To Alice Lane',
                'sequence' : 1,
                'primary' : true
            },

            'our-classic-collection' : {

                'id' : 'our-classic-collection',
                'label' : 'About',
                'title' : 'Our Classic Collection',
                'sequence' : 2,
                'primary' : false
            },

            'location-is-everything' : {

                'id' : 'location-is-everything',
                'label' : 'About',
                'title' : 'Location Is Everything',
                'sequence' : 3,
                'primary' : false
            },

            // Training
            'rooftop-training' : {

                'id' : 'rooftop-training',
                'label' : 'Training',
                'title' : 'Rooftop Training',
                'sequence' : 4,
                'primary' : true
            },

            'training-experience' : {

                'id' : 'training-experience',
                'label' : 'Training',
                'title' : 'Training Experience',
                'sequence' : 5,
                'primary' : false
            },

            'group-exercise' : {

                'id' : 'group-exercise',
                'label' : 'Training',
                'title' : 'Group Exercise',
                'sequence' : 6,
                'primary' : false
            },

            'my-ride' : {

                'id' : 'my-ride',
                'label' : 'Training',
                'title' : 'My Ride',
                'sequence' : 7,
                'primary' : false
            },

            'anti-gravity-yoga' : {

                'id' : 'anti-gravity-yoga',
                'label' : 'Training',
                'title' : 'Anti-gravity Yoga',
                'sequence' : 8,
                'primary' : false
            },

            // Equipment
            'the-wattbike' : {

                'id' : 'the-wattbike',
                'label' : 'Equipment',
                'title' : 'The Wattbike',
                'sequence' : 9,
                'primary' : true
            },

            'technogym' : {

                'id' : 'technogym',
                'label' : 'Equipment',
                'title' : 'Technogym',
                'sequence' : 10,
                'primary' : false
            },

            'queenax-units' : {

                'id' : 'queenax-units',
                'label' : 'Equipment',
                'title' : 'Queenax Units',
                'sequence' : 10,
                'primary' : false
            },

            // Facilities
            'health-suite' : {

                'id' : 'health-suite',
                'label' : 'Facilities',
                'title' : 'Health Suite',
                'sequence' : 12,
                'primary' : true
            },

            'boardroom' : {

                'id' : 'boardroom',
                'label' : 'Facilities',
                'title' : 'Boardroom',
                'sequence' : 13,
                'primary' : false
            },

            'poolside-lounge' : {

                'id' : 'poolside-lounge',
                'label' : 'Facilities',
                'title' : 'Poolside Lounge',
                'sequence' : 14,
                'primary' : false
            },

            'changerooms' : {

                'id' : 'changerooms',
                'label' : 'Facilities',
                'title' : 'Changerooms',
                'sequence' : 15,
                'primary' : false
            },

            // Luxury
            'fine-dining' : {

                'id' : 'fine-dining',
                'label' : 'Luxury',
                'title' : 'Fine Dining',
                'sequence' : 16,
                'primary' : true
            },

            'shoeshine-bar' : {

                'id' : 'shoeshine-bar',
                'label' : 'Luxury',
                'title' : 'Shoeshine Bar',
                'sequence' : 17,
                'primary' : false
            },

            'the-nook' : {

                'id' : 'the-nook',
                'label' : 'Luxury',
                'title' : 'The Nook',
                'sequence' : 18,
                'primary' : false
            },

            'aqua-lounge' : {

                'id' : 'aqua-lounge',
                'label' : 'Luxury',
                'title' : 'Aqua Lounge',
                'sequence' : 19,
                'primary' : false
            },

            // Contact
            'contact' : {

                'id' : 'contact',
                'label' : 'Contact',
                'title' : 'Contact',
                'sequence' : 21,
                'primary' : true
            },

            // Join
            'join-alice-lane' : {

                'id' : 'join-alice-lane',
                'label' : 'Join',
                'title' : 'Join',
                'sequence' : 22,
                'primary' : true
            }
        };

        var sections_navigation_data = {

            'about' : {
                'navigation' : [
                    {
                        'id' : 'welcome-to-alice-lane',
                        'label' : 'Welcome To Alice Lane',
                        'cssClass' : 'red'
                    },
                    {
                        'id' : 'our-classic-collection',
                        'label' : 'Our Classic Collection',
                        'cssClass' : 'torch-red'
                    },
                    {
                        'id' : 'location-is-everything',
                        'label' : 'Location Is Everything',
                        'cssClass' : 'red'
                    }
                ]
            },
            'training' : {
                'navigation' : [
                    {
                        'id' : 'rooftop-training',
                        'label' : 'Rooftop Training',
                        'cssClass' : 'gorse'
                    },
                    {
                        'id' : 'training-experience',
                        'label' : 'Training Experience',
                        'cssClass' : 'red'
                    },
                    {
                        'id' : 'group-exercise',
                        'label' : 'Group Exercise',
                        'cssClass' : 'red'
                    },
                    {
                        'id' : 'my-ride',
                        'label' : 'My Ride',
                        'cssClass' : 'celery'
                    },
                    {
                        'id' : 'anti-gravity-yoga',
                        'label' : 'Anti-gravity Yoga',
                        'cssClass' : 'mulberry'
                    }
                ]
            },
            'equipment' : {
                'navigation' : [
                    {
                        'id' : 'the-wattbike',
                        'label' : 'The Wattbike',
                        'cssClass' : 'chinook'
                    },
                    {
                        'id' : 'technogym',
                        'label' : 'Technogym',
                        'cssClass' : 'bombay'
                    },
                    {
                        'id' : 'queenax-units',
                        'label' : 'Queenax Units',
                        'cssClass' : 'grey'
                    }
                ]
            },
            'facilities' : {
                'navigation' : [
                    {
                        'id' : 'health-suite',
                        'label' : 'Health Suite',
                        'cssClass' : 'onahau'
                    },
                    {
                        'id' : 'boardroom',
                        'label' : 'Boardroom',
                        'cssClass' : 'pigment-green'
                    },
                    {
                        'id' : 'poolside-lounge',
                        'label' : 'Poolside Lounge',
                        'cssClass' : 'summer-sky'
                    },
                    {
                        'id' : 'changerooms',
                        'label' : 'Changerooms',
                        'cssClass' : 'brown'
                    }
                ]
            },
            'luxury' : {
                'navigation' : [
                    {
                        'id' : 'fine-dining',
                        'label' : 'Fine Dining',
                        'cssClass' : 'grey'
                    },
                    {
                        'id' : 'shoeshine-bar',
                        'label' : 'Shoeshine Bar',
                        'cssClass' : 'chardonnay'
                    },
                    {
                        'id' : 'the-nook',
                        'label' : 'The Nook',
                        'cssClass' : 'grey'
                    },
                    {
                        'id' : 'aqua-lounge',
                        'label' : 'Aqua Lounge',
                        'cssClass' : 'cornflower-blue'
                    }
                ]
            }
        };

        var sections = [];

        /*
         * Create array with data from all '.section' elements
         */

        $('.section').each(function(i)
        {
            sections[i] = {
                'id' : $(this).attr('id'),
                'offset' : $(this).position().top
            }
        });

        var page_title = 'Virgin Active Alice Lane';
        var page_height = $(window).height();

        var navigation_primary = $('nav.primary');
        var navigation_drop_down = $('[data-component="drop-down"]');
        var navigation_section = $('[data-component="section-navigation"]');

        var section_current = sections_data['landing'];
        var section_current_id = section_current.id;
        var section_current_navigation_data;
        var section_current_navigation_li;
        var section_current_navigation_a;

        var scroll_top = 0;
        var button_join = $('[data-button="join"]');

        /*
         * Browser window has been scrolled
         */

        $(window).scroll(function()
        {
            if (window_width > screen_width_wide)
            {

                scroll_top = $(window).scrollTop(); // Get the distance scrolled from the top of the page

                // Find the ID of the current section based on how far the page has been scrolled
                for (var a = 0; a < sections.length; a++)
                {
                    if (sections[a].offset <= scroll_top + (page_height / 2))
                    {
                        section_current_id = sections[a].id;
                    }
                }

                // Top of the page
                if (scroll_top == 0)
                {
                    // Hide the primary navigation
                    navigation_primary.slideUp();

                    // Hide the drop-down navigation
                    if (navigation_drop_down.is(':visible'))
                    {
                        navigation_drop_down.slideUp(function()
                        {
                            // Update the drop-down navigation arrow class
                            if (drop_down_anchor_icon.hasClass('nav-arrow-up'))
                            {
                                drop_down_anchor_icon.removeClass('nav-arrow-up');
                                drop_down_anchor_icon.addClass('nav-arrow-down');
                            }
                        });
                    }

                    // Update the page title
                    document.title = page_title;
                }

                // Sections have changed
                if (section_current_id != section_current.id)
                {
                    // Update the current section from our data object
                    section_current = sections_data[section_current_id];

                    // Show the primary navigation
                    if (!navigation_primary.is(':visible'))
                    {
                        navigation_primary.slideDown();
                    }

                    // Update the page title
                    document.title = section_current.title + ' - ' + page_title;

                    // Update the drop-down anchor
                    if (section_current.primary && section_current.sequence >= 1)
                    {
                        updateDropDownAnchor(section_current);
                    }

                    // Render the section navigation
                    renderSectionNavigation(section_current.label.toLowerCase());
                }

                // Section: Second or further
                if (section_current.sequence >= 2)
                {
                    // Show back to top
                    if (!back_to_top.is(':visible'))
                    {
                        back_to_top.fadeIn();
                    }
                }
                else
                {
                    // Hide back to top
                    if (back_to_top.is(':visible'))
                    {
                        back_to_top.fadeOut();
                    }
                }

                // Section: Join Alice Lane
                if (section_current.id == 'join-alice-lane')
                {
                    // Hide join button
                    if (button_join.is(':visible'))
                    {
                        button_join.fadeOut();
                    }
                }
                else
                {
                    // Show join
                    if (!button_join.is(':visible'))
                    {
                        button_join.fadeIn();
                    }
                }
            }
        });

        /*
         * Browser window has been resized
         */

        $(window).resize(function()
        {
            scroll_top = $(window).scrollTop(); // Get the distance scrolled from the top of the page
            window_width = $(window).width(); // Get the updated width of the viewport
            sections = []; // Clear the sections array

            /*
             * Create array with data from all '.section' elements
             */

            $('.section').each(function(i)
            {
                sections[i] = {
                    'id' : $(this).attr('id'),
                    'offset' : $(this).position().top
                }
            });

            if (window_width > screen_width_wide)
            {
                // Initialize the skrollr plug-in
                skrollr.init();
            }
            else
            {
                // Hide the primary navigation
                navigation_primary.slideUp();

                // Stop pulse
                clearInterval(interval_pulse);
            }
        });

        /*
         * Drop-down navigation
         */

        var drop_down_anchor = $('[data-action="drop-down"]');
        var drop_down_anchor_icon = $('i', drop_down_anchor);

        if (drop_down_anchor.length > 0 && navigation_drop_down.length > 0)
        {
            drop_down_anchor.on('click', function(e)
            {
                e.preventDefault();

                // Update the drop-down navigation arrow class
                if (drop_down_anchor_icon.hasClass('nav-arrow-down'))
                {
                    drop_down_anchor_icon.removeClass('nav-arrow-down');
                    drop_down_anchor_icon.addClass('nav-arrow-up');
                }
                else
                {
                    drop_down_anchor_icon.removeClass('nav-arrow-up');
                    drop_down_anchor_icon.addClass('nav-arrow-down');
                }

                // Toggle the drop-down navigation
                navigation_drop_down.stop(true, true).slideToggle();
            });
        }

        /*
         * Section navigation
         */

        var navigation_anchor = $('[data-action="navigate"]');
        var navigation_anchor_href;

        if (navigation_anchor.length)
        {
            navigation_anchor.on('click', function(e)
            {
                e.preventDefault();

                navigateToSection($(this));
            });
        }

        if (navigation_section.length > 0)
        {
            navigation_section.on('click', 'a', function(e)
            {
                e.preventDefault();

                navigateToSection($(this));
            });
        }
    }

    /*
     * Back to Top
     */

    if (back_to_top.length > 0)
    {
        back_to_top.on('click', function(e)
        {
            e.preventDefault();

            $('html, body').stop(true, true).animate(
                {
                    scrollTop : 0
                }, $(this).attr('data-scroll') == 'false' ? 0 : 1000);
        })
    }

    /*
     * Cycle through classes
     */

    var cycle_component = $('[data-component="cycle"]');

    if (cycle_component.length > 0)
    {
        var cycle_classes = cycle_component.attr('data-cycle-classes').split(",");
        var sequence = 0;

        setInterval(function()
        {
            if (sequence == cycle_classes.length)
            {
                sequence = 0;
            }

            // Toggle classes
            cycle_component.removeClass(cycle_classes[sequence]);
            cycle_component.addClass(cycle_classes[sequence == cycle_classes.length - 1 ? 0 : sequence + 1]);

            sequence++;
        }, 2500);
    }

    /*
     * Close a panel
     */

    var close_anchor = $('[data-action="close"]');

    if (close_anchor.length > 0)
    {
        close_anchor.each(function()
        {
            close_anchor.on('click', function(e)
            {
                e.preventDefault();

                $(this).parent().fadeOut();
            })
        })
    }

    /*
     * Accordion
     */

    var accordion_component = $('[data-component="accordion"]');
    var accordion_primary_active = $('#accordion-primary-active');
    var accordion_secondary_active = $('#accordion-secondary-active');
    var accordion_secondary_li = $('.accordion-secondary');

    if (accordion_component.length > 0)
    {
        accordion_component.each(function()
        {
            var accordion = $(this);

            // Toggle the drop-down accordion
            $('> a i', $(this)).on('click', function(e)
            {
                e.preventDefault();

                var is_primary_accordion = $(this).parent().parent().hasClass('accordion-primary');

                if (is_primary_accordion)
                {
                    if ($('.accordion-secondary > ul').is(':visible'))
                    {
                        $('.accordion-secondary > ul').slideUp();
                        $('i', accordion_secondary_active).removeClass('nav-arrow-up');
                        $('i', accordion_secondary_active).addClass('nav-arrow-down');
                    }

                    // Update the primary accordion navigation arrow class
                    if ($('i', accordion_primary_active).hasClass('nav-arrow-down'))
                    {
                        $('i', accordion_primary_active).removeClass('nav-arrow-down');
                        $('i', accordion_primary_active).addClass('nav-arrow-up');
                    }
                    else if ($('i', accordion_primary_active).hasClass('nav-arrow-up'))
                    {
                        $('i', accordion_primary_active).removeClass('nav-arrow-up');
                        $('i', accordion_primary_active).addClass('nav-arrow-down');
                    }
                }

                // Update the secondary accordion navigation arrow class
                if ($('i', accordion_secondary_active).hasClass('nav-arrow-down'))
                {
                    $('i', accordion_secondary_active).removeClass('nav-arrow-down');
                    $('i', accordion_secondary_active).addClass('nav-arrow-up');
                }
                else if ($('i', accordion_secondary_active).hasClass('nav-arrow-up'))
                {
                    $('i', accordion_secondary_active).removeClass('nav-arrow-up');
                    $('i', accordion_secondary_active).addClass('nav-arrow-down');
                }

                $('ul.accordion', accordion).slideToggle();
            });

            $('> a', $(this)).on('click', function(e)
            {
                e.preventDefault();

                var is_primary_accordion = $(this).parent().hasClass('accordion-primary');

                if (!is_primary_accordion)
                {
                    // Scroll to the requested section
                    $('html, body').stop(true, true).animate(
                        {
                            scrollTop : $($(this).attr('href')).position().top - accordion_offset
                        }, 500);
                }
            });
        });
    }

    var accordion_ul = $('li ul.accordion');
    var accordion_ul_secondary = $('.accordion-secondary ul.accordion');
    var accordion_offset = $('ul.accordion').height() - 1;

    if (accordion_ul.length > 0)
    {
        accordion_ul.each(function()
        {
            var ul = $(this);
            var is_primary_ul = ul.parent().hasClass('accordion-primary');

            $(ul).on('click', 'a', function(e)
            {
                e.preventDefault();

                var section_accordion = $(this).attr('data-section-id');

                if (is_primary_ul)
                {
                    var section_accordion_data = sections_navigation_data[section_accordion];

                    // Update the primary accordion active anchor
                    $('span', accordion_primary_active).html($(this).attr('data-section-title'));
                    accordion_primary_active.attr('href', '#' + $(this).attr('data-section-id'));

                    // Clear the section navigation
                    accordion_ul_secondary.html('');

                    if (section_accordion_data !== undefined)
                    {
                        var accordion_current_navigation_li;
                        var accordion_current_navigation_a;

                        if (!accordion_secondary_li.is(':visible'))
                        {
                            accordion_secondary_li.slideDown();
                        }

                        for (var b = 0; b < section_accordion_data.navigation.length; b++)
                        {
                            // Create new list item
                            accordion_current_navigation_li = $('<li>');

                            // Create new anchor
                            accordion_current_navigation_a = $('<a>', {
                                html : section_accordion_data.navigation[b].label,
                                href : '#' + section_accordion_data.navigation[b].id
                            });

                            accordion_current_navigation_a.attr('data-section-id', section_accordion_data.navigation[b].id);
                            accordion_current_navigation_a.attr('data-section-title', section_accordion_data.navigation[b].label);
                            accordion_current_navigation_a.attr('data-section-class', section_accordion_data.navigation[b].cssClass);
                            accordion_current_navigation_a.appendTo(accordion_current_navigation_li);
                            accordion_current_navigation_li.appendTo(accordion_ul_secondary);
                        }

                        // Update the secondary accordion active anchor
                        $('span', accordion_secondary_active).html(section_accordion_data.navigation[0].label);
                        accordion_secondary_active.attr('href', '#' + section_accordion_data.navigation[0].id);
                        accordion_secondary_active.attr('class', '');
                        accordion_secondary_active.addClass($(this).attr('data-section-class'));
                    }
                    else
                    {
                        accordion_secondary_li.slideUp();
                        accordion_offset = accordion_offset - 50;
                    }

                    // Update the secondary accordion navigation arrow class
                    if ($('i', accordion_primary_active).hasClass('nav-arrow-down'))
                    {
                        $('i', accordion_primary_active).removeClass('nav-arrow-down');
                        $('i', accordion_primary_active).addClass('nav-arrow-up');
                    }
                    else if ($('i', accordion_primary_active).hasClass('nav-arrow-up'))
                    {
                        $('i', accordion_primary_active).removeClass('nav-arrow-up');
                        $('i', accordion_primary_active).addClass('nav-arrow-down');
                    }
                }
                else
                {
                    // Update the secondary accordion active anchor
                    $('span', accordion_secondary_active).html($(this).attr('data-section-title'));
                    accordion_secondary_active.attr('href', '#' + $(this).attr('data-section-id'));
                    accordion_secondary_active.attr('class', '');
                    accordion_secondary_active.addClass($(this).attr('data-section-class'));
                }

                // Scroll to the requested section
                $('html, body').stop(true, true).animate(
                    {
                        scrollTop : $($(this).attr('href')).position().top - accordion_offset
                    }, 750);

                ul.slideUp();

                // Update the secondary accordion navigation arrow class
                if ($('i', accordion_secondary_active).hasClass('nav-arrow-down'))
                {
                    $('i', accordion_secondary_active).removeClass('nav-arrow-down');
                    $('i', accordion_secondary_active).addClass('nav-arrow-up');
                }
                else if ($('i', accordion_secondary_active).hasClass('nav-arrow-up'))
                {
                    $('i', accordion_secondary_active).removeClass('nav-arrow-up');
                    $('i', accordion_secondary_active).addClass('nav-arrow-down');
                }
            })
        });
    }

    /*
     * Slider
     */

    var flexslider_component = $('[data-component="flexslider"]');

    if (flexslider_component.length > 0)
    {
        flexslider_component.flexslider(
            {
                animation : 'slide',
                animationLoop: true,
                animationSpeed : 500,
                controlNav : false,
                slideshow : true,
                slideshowSpeed : 3000
            });
    }

    /*
     * Validation
     */

    var join_alice_lane_form = $('#form-join');

    if (join_alice_lane_form.length > 0)
    {
        join_alice_lane_form.validate(
            {
                rules : {
                    "name" : {
                        maxlength : 20,
                        required : true
                    },
                    "surname" : {
                        maxlength : 20,
                        required : true
                    },
                    "email-address" : {
                        maxlength : 100,
                        required : true,
                        email : true
                    },
                    "contact-number" : {
                        maxlength : 20,
                        required : true
                    }
                },
                messages : {
                    "name" : 'Please enter your name',
                    "surname" : 'Please enter your surname',
                    "email-address" : 'Please enter a valid email address',
                    "contact-number" : 'Please enter your contact number'
                },
                errorPlacement : function(error, element)
                {
                    // Prevent a label element with the error message being created
                }
            });
    }

    /*
     * Map
     */

    var map_component = $('[data-component="map"]');

    if (map_component.length > 0)
    {
        // Get map attributes
        var latitude = parseFloat(map_component.attr('data-map-latitude'));
        var longitude = parseFloat(map_component.attr('data-map-longitude'));
        var title = map_component.attr('data-map-title');
        var zoom = parseInt(map_component.attr('data-map-zoom'));

        // Load the map
        loadMap(latitude, longitude, title, zoom);
    }

    /**
     * Load a Google Map with a marker
     *
     * @param latitude
     * @param longitude
     * @param title
     * @param zoom
     */
    function loadMap(latitude, longitude, title, zoom)
    {
        var latlng = new google.maps.LatLng(latitude, longitude);

        var options_map = {
            center : latlng,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            scrollwheel : false,
            zoom : zoom
        };

        var map = new google.maps.Map(map_component[0], options_map);

        // Offset center to the right
        if (window_width >= screen_width_wide)
        {
            map.panBy(-300, 0);
        }

        var marker = new google.maps.Marker({
            map : map,
            position : latlng,
            title : title
        });
    }

    /**
     * Render the navigation links for the specified section
     *
     * @param section_label
     */
    function renderSectionNavigation(section_label)
    {
        // Get the current section navigation data
        section_current_navigation_data = sections_navigation_data[section_label];

        // Clear the section navigation
        navigation_section.html('');

        if (section_current_navigation_data !== undefined)
        {
            for (var b = 0; b < section_current_navigation_data.navigation.length; b++)
            {
                // Create new list item
                section_current_navigation_li = $('<li>');

                // Create new anchor
                section_current_navigation_a = $('<a>', {
                    html : section_current_navigation_data.navigation[b].label,
                    href : '#' + section_current_navigation_data.navigation[b].id
                });

                section_current_navigation_a.attr('data-action', 'navigate');
                section_current_navigation_a.attr('data-active-class', section_current_navigation_data.navigation[b].cssClass);
                section_current_navigation_a.appendTo(section_current_navigation_li);
                section_current_navigation_li.appendTo(navigation_section);
            }
        }

        // Update the active class of the section navigation
        $('a', navigation_section).attr('class', '');
        var navigation_section_anchor_active = $('a[href="#' + section_current.id + '"]', navigation_section);
        navigation_section_anchor_active.addClass(navigation_section_anchor_active.attr('data-active-class'));
    }

    /**
     * Update the primary drop-down anchor
     *
     * @param section
     */
    function updateDropDownAnchor(section)
    {
        // Label
        $('span.label', drop_down_anchor).html(section.label);

        // Href
        drop_down_anchor.attr('href', '#' + section.id);
    }

    /**
     * Navigate the page to the specified section via the anchor clicked
     *
     * @param anchor
     */
    function navigateToSection(anchor)
    {
        // Get the href
        navigation_anchor_href = anchor.attr('href').replace('#', '');

        // Get the section data for the specified index [href]
        var section_data = sections_data[navigation_anchor_href];

        // Check that it is valid
        if (section_data != undefined)
        {
            // Find the DOM element
            var section = $('#' + section_data.id);

            // Check that it exists
            if (section.length > 0)
            {
                // Remove height of primary navigation from distance to scroll
                var offset = navigation_primary.height();

                if (section_data.sequence == 22) // Join Alice Lane
                {
                    offset = 0; // Ignore height of primary navigation
                }

                // Scroll to the requested section
                $('html, body').stop(true, true).animate(
                    {
                        scrollTop : section.position().top - offset
                    }, anchor.attr('data-scroll') == 'false' ? 0 : 500);

                // Hide the drop-down navigation
                if (navigation_drop_down.is(':visible'))
                {
                    navigation_drop_down.slideUp();

                    // Update the drop-down navigation arrow class
                    if (drop_down_anchor_icon.hasClass('nav-arrow-up'))
                    {
                        drop_down_anchor_icon.removeClass('nav-arrow-up');
                        drop_down_anchor_icon.addClass('nav-arrow-down');
                    }
                }
            }
        }
    }

}(jQuery));