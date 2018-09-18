/* ==========================================================================
   Main
   ========================================================================== */

var main = {

    init: function ()
    {
        /* Menu Toggle
           ========================================================================= */

        var menu_toggle = $('[data-action="menu-toggle"]');
        var nav_primary = $('[data-component="nav-primary"]');

        if (menu_toggle.length > 0)
        {
            menu_toggle.on('click', function()
            {
                nav_primary.toggleClass('visible');
                return false;
            });
        }

        /* Side Bar
           ========================================================================== */

        updateSideBarHeight();

        /* Carousel
           ========================================================================== */

        var component_carousel = $('[data-component="carousel"]');

        if (component_carousel.length > 0 && component_carousel.css('display') === 'block')
        {
            var carousel_loading = $('.carousel-loading', component_carousel); // Loading animation
            var carousel_image = $('.carousel-image', component_carousel); // Container with the background image
            var carousel_contents = $('.carousel-contents', component_carousel); // Container with the show information
            var carousel_thumbs = $('.list', component_carousel); // Carousel thumbnails

            /*
             * Loading of carousel images
             */

            // Get the path of the first image in the carousel (remove url('') from the background-image property)
            var carousel_image_src = carousel_image.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "");

            // Create an image object
            var carousel_image_inital = $('<img/>');

            // Show the loading animation
            carousel_loading.stop(true, true).fadeIn();

            // Wait for the image to fully load
            carousel_image_inital.bind('load', function()
            {
                carousel_image.css('background-image', 'url(' + carousel_image_src + ')'); // Update the carousel image
                carousel_loading.stop(true, true).fadeOut(); // Hide the loading animation
            }).attr('src', carousel_image_src); // Update the image source

            /*
             * Carousel thumbnail anchors
             */

            $('.list a', component_carousel).on('click', function()
            {
                var anchor = $(this);

                // Update active class on thumbnail
                $('.active', carousel_thumbs).removeClass('active');
                anchor.addClass('active');

                // Get the details of the selected show
                var data_show_image = anchor.data('show-image');
                var data_show_title = anchor.data('show-title');
                var data_show_channel = anchor.data('show-channel');
                var data_show_channel_image = anchor.data('show-channel-image');
                var data_show_description = anchor.data('show-info');

                // Contents of the carousel specific to the show
                var show_title = $('.show-title', carousel_contents);
                var show_logo = $('.show-logo', carousel_contents);
                var show_info = $('.show-info', carousel_contents);

                /*
                 * Update the carousel
                 */

                // Show loading animation
                carousel_loading.stop(true, true).fadeIn();

                // Preload the channel logo
                $('<img/>').attr('src', data_show_channel_image);

                // Create an image object
                var img_carousel = $('<img/>');

                // Wait for the image to fully load
                img_carousel.bind('load', function()
                {
                    // Hide loading animation
                    carousel_loading.stop(true, true).fadeOut();

                    // Fade out the current image
                    carousel_image.stop(true, true).fadeOut(150, function()
                    {
                        // Update the carousel image
                        carousel_image.css('background-image', 'url(' + data_show_image + ')');
                    }).stop(true, true).fadeIn(400); // Fade in current image

                    // Update the show details
                    show_title.html(data_show_title);
                    show_logo.attr('src', data_show_channel_image);
                    show_logo.attr('alt', data_show_channel);
                    show_info.html(data_show_description);
                }).attr('src', data_show_image); // Update the image source

                return false;
            })
        }

        /* Window Resize
           ========================================================================== */

        $(window).bind('orientationchange resize', function ()
        {

            /* Side Bar
               ========================================================================== */

            updateSideBarHeight();
        });

        /*
         * Dynamically increase the height of the side bar to match the main section
         */

        function updateSideBarHeight()
        {
            var aside = $('.aside'); // Side bar
            var aside_float = aside.css('float'); // Get the float property

            // Check if the side bar is floated
            if (aside.length > 0 && aside_float !== 'none')
            {
                var section = $('.section'); // Primary content section
                var section_height = section.outerHeight(); // Height of primary content section

                // Check if the main section is taller than the side bar
                if (section_height > aside.outerHeight())
                {
                    aside.css('height', section_height); // Update the height of the side bar
                }
            }
            else
            {
                aside.css('height', 'auto'); // Reset height of the side bar
            }
        }
    }
};