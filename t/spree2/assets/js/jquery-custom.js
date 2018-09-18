/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{

    /**
     * Find the value of the specified parameter in the current URL
     *
     * @param name
     * @return {*}
     */
    $j.urlParam = function(name)
    {
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);

        if (results != null)
        {
            return results[1]
        }

        return 0;
    };

    /* Front-end Website URL
       ========================================================================== */

    var websiteURL = '';
    var assetsFolder = 'assets/';

    // The front-end website URL may be dynamically set outside of this script file
    if (typeof frontEndWebsiteURL !== 'undefined' && frontEndWebsiteURL != null && frontEndWebsiteURL != '')
    {
        // Append a trailing slash to the URL if not present
        websiteURL = frontEndWebsiteURL + (frontEndWebsiteURL.substr(-1) == '/' ? '' : '/');

        // Remove the assets folder from the path if a URL is present
        assetsFolder = '';
    }

    /* Primary Navigation Drop-down
       ========================================================================== */

    var li_dropdown = $j('ul.drop-down > li');

    // Mouseover
    li_dropdown.on('mouseover touchend', function()
    {
        $j('> a', this).addClass('active');
        $j('ul', this).css('visibility', 'visible');
    });

    // Mouseout
    li_dropdown.on('mouseout touchend', function()
    {
        var anchor = $j('> a', this);

        // Only remove active class from hover links, not the current page
        if (!anchor.data('current'))
        {
            anchor.removeClass('active');
        }
        $j('ul', this).css('visibility', 'hidden');
    });

    /* Language Selector */

    var li_language_dropdown = $j('ul.languages > li');

    $j('a', li_language_dropdown).on('click', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        // Get the selected language
        var anchor_language = $j(this);
        var selected_language_code = anchor_language.attr('data-language-code');

        // Load the confirmation modal
        confirmLanguageChange(selected_language_code);
    });

    // Confirm selected language from within modal
    var anchor_confirm_language = $j('a[data-action="language-confirm"]');

    anchor_confirm_language.on('click', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        // Redirect to the URL of the confirmation anchor
        document.location.href = anchor_confirm_language.attr('href');

        // Close modal window
        $j.modal.close();
    });

    /* Filter: Product Categories
       ========================================================================== */

    var ul_product_categories = $j('ul.product-categories');

    if (ul_product_categories.length > 0)
    {

        // On click of the parent category anchors
        $j('> li > a', ul_product_categories).on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Sub-category
            var ul_current = $j(this).next();

            // Toggle the display of the sub-category
            ul_current.stop(true, true).slideToggle(
                {
                    duration: '400',
                    easing: 'easeOutExpo'
                });

            // Hide all other sub-categories
            $j('ul', ul_product_categories).not(ul_current).stop(true, true).slideUp(
                {
                    duration: '400',
                    easing: 'easeOutExpo'
                });
        });
    }

    /* Add to Favourites
       ========================================================================== */

    // Path to heart icons
    var icon_heart = websiteURL + assetsFolder + 'images/icons/icon-heart.png';
    var icon_heart_full = websiteURL + assetsFolder + 'images/icons/icon-heart-full.png';
    var icon_heart_large = websiteURL + assetsFolder + 'images/icons/icon-heart-large.png';
    var icon_heart_large_full = websiteURL + assetsFolder + 'images/icons/icon-heart-large-full.png';

    // Favourites counter in utils bar
    var favourites_counter = $j('a[data-util="favourites"] > span');

    // Favourite product element
    var anchor_favourite = $j('a[data-action="favourite"]');

    // Favourite size
    var favourite_size = 'normal';

    if (anchor_favourite.hasClass('favourite-large')) // Large favourite on product detail
    {
        favourite_size = 'large';
    }

    // Mouseover
    anchor_favourite.on('mouseover touchend', function()
    {
        $j('img', this).attr('src', favourite_size == 'large' ? icon_heart_large_full : icon_heart_full);
    });

    // Mouseout
    anchor_favourite.on('mouseout touchend', function()
    {
        var anchor = $j(this);

        // Only reset the icon back to default if it is not a favourite
        if (anchor.data('data-favourite') != 'true')
        {
            $j('img', this).attr('src', favourite_size == 'large' ? icon_heart_large : icon_heart);
        }
    });

    // Click
    anchor_favourite.on('click touchstart', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        $j('img', this).attr('src', favourite_size == 'large' ? icon_heart_large_full : icon_heart_full);

        // Check if the item is already a favourite
        var is_favourite = $j(this).data('data-favourite') == 'true' ? 1 : 0;

        if (is_favourite)
        {
            // Switch icon back to default
            $j('img', this).attr('src', favourite_size == 'large' ? icon_heart_large : icon_heart);

            // Remove data-attribute
            $j(this).data('data-favourite', 'false');

            // Remove from favourites
            callback_removeFromFavourites();
        }
        else
        {
            // Switch icon to favourite selected
            $j('img', this).attr('src', favourite_size == 'large' ? icon_heart_large_full : icon_heart_full);

            // Add data-attribute
            $j(this).data('data-favourite', 'true');

            // Transfer effect of heart up top towards favourites in utils bar
            $j(this).stop(true, true).effect(
                'transfer',
                {
                    className: favourite_size == 'large' ? 'ui-effects-transfer-favourite-large' : 'ui-effects-transfer-favourite',
                    easing: 'easeInQuad',
                    to: favourites_counter
                }, 750, callback_addToFavourites
            );
        }
    });

    /*
     * Callback: Add to Favourites
     *
     * Increase the counter of the number of favourites
     */
    function callback_addToFavourites()
    {
        // Get the current number of favourites
        var number_of_favourites = parseInt(favourites_counter.html());

        // Increase the number of favourites by 1
        favourites_counter.html(number_of_favourites + 1);

        // Update the text inside the span of the favourites anchor
        if (favourite_size == 'large')
        {
            $j('span', anchor_favourite).text(anchor_favourite.attr('data-favourite-remove-text'));
        }
    }

    /*
     * Callback: Remove from Favourites
     *
     * Decrease the counter of the number of favourites
     */
    function callback_removeFromFavourites()
    {
        // Get the current number of favourites
        var number_of_favourites = parseInt(favourites_counter.html());

        // Decrease the number of favourites by 1
        favourites_counter.html(number_of_favourites - 1);

        // Update the text inside the span of the favourites anchor
        if (favourite_size == 'large')
        {
            $j('span', anchor_favourite).text(anchor_favourite.attr('data-favourite-add-text'));
        }
    }

    /* Add to Cart
       ========================================================================== */

    // Cart counter in utils bar
    var cart_counter = $j('a[data-util="cart"] > span');

    // Add to cart element
    var anchor_cart = $j('a[data-action="cart"]');

    // Cart size
    var cart_size = 'normal';

    if (anchor_cart.hasClass('button-large')) // Large add to cart button
    {
        cart_size = 'large';
    }

    if (anchor_cart.length > 0)
    {

        anchor_cart.on('click touchstart', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Check if the item is already added to the cart
            var is_cart = $j(this).data('data-cart') == 'true' ? 1 : 0;

            if (is_cart)
            {
                // Remove data-attribute
                $j(this).data('data-cart', 'false');

                // Remove from cart
                callback_removeFromCart();
            }
            else
            {
                // Add data-attribute
                $j(this).data('data-cart', 'true');

                // Transfer effect of button up top towards cart in utils bar
                $j(this).stop(true, true).effect(
                    'transfer',
                    {
                        className: cart_size == 'large' ? 'ui-effects-transfer-cart-large' : 'ui-effects-transfer-cart',
                        easing: 'easeInQuad',
                        to: cart_counter
                    }, 750, callback_addToCart()
                );
            }
        });
    }

    /*
     * Callback: Add to Cart
     *
     * Increase the counter of the number of products in the cart
     */
    function callback_addToCart()
    {
        // Get the current number of products in the cart
        var number_of_products = parseInt(cart_counter.html());

        // Increase the number of products by 1
        cart_counter.html(number_of_products + 1);

        // Update the HTML text of the anchor
        $j(anchor_cart).text(anchor_cart.attr('data-cart-remove-text'));
    }

    /*
     * Callback: Remove from Cart
     *
     * Decrease the counter of the number of products in the cart
     */
    function callback_removeFromCart()
    {
        // Get the current number of products in the cart
        var number_of_products = parseInt(cart_counter.html());

        // Decrease the number of products by 1
        cart_counter.html(number_of_products - 1);

        // Update the HTML text of the anchor
        $j(anchor_cart).text(anchor_cart.attr('data-cart-add-text'));
    }

    /* Shop: Favourites & Cart anchors
       ========================================================================== */

    // Make the shop favourites and cart icons clickable
    $j('ul.shop span').on('click', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        // Get the previous element of the span being clicked on
        var prev_el = $j(this).prev();

        // Ensure that the anchor is there
        if (prev_el.is('a'))
        {
            // Get the href of the anchor
            var href = prev_el.attr('href');

            if (href.length > 0)
            {
                document.location.href = href;
            }
        }
    });

    /* Back to Top
       ========================================================================== */

    // Hide the anchor by default
    $j('a[data-action="back-to-top"]').hide();

    // Scroll event handler
    $j(window).scroll(function()
    {
        // Get distanced scrolled from top of document
        var pixels_scrolled_top = $j(window).scrollTop();

        // Distance to scroll before showing the anchor
        var pixels_scrolled = 100;

        // Show back to top
        if (pixels_scrolled_top > pixels_scrolled)
        {
            $j('a[data-action="back-to-top"]').fadeIn('slow');
        }
        else
        {
            $j('a[data-action="back-to-top"]').fadeOut('slow');
        }
    });

    // Scroll to top on click of anchor
    $j('a[data-action="back-to-top"]').on('click', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        // Scroll to the top of the document
        $j('html, body').animate({
            easing: 'easeOutExpo',
            scrollTop: 0
        }, 500);
    });

    /* iosSlider
       ========================================================================== */

    /*
     * iosSlider – Touch Enabled jQuery Horizontal Slider Plugin
     *
     * http://iosscripts.com/iosslider/
     * https://github.com/iosscripts/iosSlider
     */

    // Promotions slider
    var slider_promotions = $j('.promotions .slider');

    if (slider_promotions.length > 0)
    {

        // Controls: Previous and Next
        var selector_prev = $j('.prev', slider_promotions);
        var selector_next = $j('.next', slider_promotions);

        // Instantiate iosSlider
        slider_promotions.iosSlider({
            autoSlide: true,
            autoSlideTimer: 5000,
            autoSlideTransTimer: 500,
            desktopClickDrag: false,
            infiniteSlider: true,
            keyboardControls: true,
            navNextSelector: selector_next,
            navPrevSelector: selector_prev,
            navSlideSelector: $j('.pagination ul li', slider_promotions),
            onSlideChange: callback_slideChange,
            snapToChildren: true
        });

        // Previous selector is hidden on load
        selector_prev.hide();
    }

    function callback_slideChange(args)
    {
        $j('.pagination ul li a').removeClass('selected');
        $j('.pagination ul li:eq(' + (args.currentSlideNumber - 1) + ') a').addClass('selected');

        // Get the current slide number
        var current_slide_number = args.currentSlideNumber;

        // Selector: Previous
        if (current_slide_number > 1)
        {
            selector_prev.fadeIn('slow'); // Show the selector if not viewing the first slide
        }
        else
        {
            selector_prev.fadeOut('fast'); // Hide the selector on the first slide
        }

        // Selector: Next
        if (current_slide_number == $j('.pagination ul li').length)
        {
            selector_next.fadeOut('fast'); // Hide the selector if viewing the last slide
        }
        else
        {
            selector_next.fadeIn('slow'); // Show the selector if not viewing the last slide
        }

        /*
         * WAI-ARIA
         * http://www.w3.org/TR/wai-aria/roles#slider
         */

        // Slider: Value Now
        slider_promotions.attr('aria-valuenow', current_slide_number);

        // Slider: Value Text
        slider_promotions.attr('aria-valuetext', $j('li:eq(' + (current_slide_number - 1) + ') img', slider_promotions).attr('alt'));
    }

    /* MediaElement
       ========================================================================== */

    /*
     * http://mediaelementjs.com/
     *
     * HTML5 <video> and <audio> made easy. One file. Any browser. Same UI.
     */

    $j('#video-player-demo').mediaelementplayer(
        {
            flashName: '../swf/flashmediaelement.swf'
        }
    );

    /* Media Gallery
       ========================================================================== */

    var gallery = $j('div.gallery');

    if (gallery.length > 0)
    {
        // Containers
        var media = $j('div.media');
        var loading = $j('div.loading', media);
        var video = $j('video', media);
        var photo = $j('div.photo', media);
        var thumbnail_first = $j('li:first-child a', gallery);

        if (thumbnail_first.attr('data-media-type') == 'video') // Video: first gallery thumbnail
        {

            if (video.length > 0)
            {
                // Instatiate a MediaElementPlayer
                var video_player = new MediaElementPlayer(video,
                    {
                        features: [],
                        flashName: '../swf/flashmediaelement.swf',
                        success: function(player)
                        {
                            // Event Listener: video playback ended
                            player.addEventListener('ended', function()
                            {
                                // Hide the video player
                                $j('.mejs-container').stop(true, true).fadeOut();

                                // Remove an image if there is already one
                                $j('img', photo).remove();

                                // Update media type to photo
                                media.attr('data-media-type', 'photo');

                                // Display the poster image in place of the video
                                createImage(video.attr('poster'));
                            }, false);
                        }
                    }
                );
            }
        }
        else if (thumbnail_first.attr('data-media-type') == 'photo') // Photo: first gallery thumbnail
        {
            photo.show();
        }

        // Gallery thumbnail click
        $j('li > a', gallery).on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            var current_anchor = $j(this);

            thumbnailGallery(current_anchor);
        });

        // Gallery play click
        $j('div.play-video', gallery).on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            var current_anchor = $j(this).parent().find('> a');
            thumbnailGallery(current_anchor);
        });

        /*
         * Update the media gallery accordingly
         */
        function thumbnailGallery(current_anchor)
        {

            // Current media item: type and URL
            var current_media_type = current_anchor.attr('data-media-type');
            var current_photo_url = current_anchor.attr('data-photo-url');

            // Previous media item: Video or Photo
            var previous_media_type = media.attr('data-media-type');
            var mejs_container = $j('.mejs-container', media);

            // Show the loading animation
            loading.show();

            // Update data-attributes of current media item
            media.attr('data-media-type', current_media_type);

            // Toggle active class on thumbnail
            $j('li.active', gallery).removeClass('active');
            current_anchor.parent().addClass('active');

            // Update display according to what was clicked on
            if (previous_media_type == 'photo')
            {
                photo.stop(true, true).fadeOut('normal', function()
                {
                    // Load the media item
                    loadMediaItem();
                });
            }
            else if (previous_media_type == 'video')
            {
                mejs_container.stop(true, true).fadeOut('normal', function()
                {
                    // Pause the video
                    video_player.pause();

                    // Load the media item
                    loadMediaItem();
                });
            }

            /*
             * Load media in to the gallery
             */
            function loadMediaItem()
            {

                if (current_media_type == 'photo') // Photo
                {
                    createImage(current_photo_url);
                }
                else if (current_media_type == 'video') // Video
                {
                    // Update data-attributes of current media item
                    media.attr('data-media-type', current_media_type);

                    // Hide the loading animation
                    loading.hide();

                    // Display the video player
                    mejs_container.stop(true, true).fadeIn();

                    // Play the video
                    video_player.play();
                }
            }
        }

        /*
         * Create an <img> object
         */
        function createImage(source)
        {
            // Remove previous photo from DOM
            $j('div.photo img', media).remove();

            // Create new image object and append to photo container
            var image = $j('<img />');
            image.attr('src', source);
            image.appendTo(photo);

            // Display the image once loaded
            image.load(function()
            {
                // Show current image and hide loading animation
                photo.stop(true, true).fadeIn();
                loading.hide();
            });
        }
    }

    /* Carousel
       ========================================================================== */

    /*
     * serialScroll - This plugin allows you to easily animate any series of elements, by sequentially scrolling them.
     *
     * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
     */

    var component_carousel = $j('[data-component="carousel"]');

    if (component_carousel.length > 0)
    {

        // Loop over all carousel components
        component_carousel.each(function()
        {

            // Controls: Previous and Next
            var carousel_prev = $j('a.scroll-prev', $j(this));
            var carousel_next = $j('a.scroll-next', $j(this));

            // Previous selector is hidden on load
            carousel_prev.hide();

            // Get minimum number of carousel items required
            var component_carousel_min_items = $j(this).attr('data-component-min-items');

            // Default if no data-attribute is set
            if (component_carousel_min_items == null || component_carousel_min_items == '')
            {
                component_carousel_min_items = 1;
            }

            // Get the number of items in the carousel
            var component_carousel_items = $j('ul', $j(this)).children().length;

            // Instantiate serialScroll if there are more than the minimum number of items
            if (component_carousel_items > component_carousel_min_items)
            {
                $j(this).find('div:first-of-type').serialScroll({
                    cycle: false,
                    easing: 'easeOutExpo',
                    duration: 400,
                    items: 'li',
                    lock: true,
                    offset: 0,
                    next: carousel_next,
                    prev: carousel_prev,
                    stop: true,
                    onBefore: function(e, elem, $pane, $items, pos)
                    {
                        // Beginning of the scroller
                        if (pos == 0)
                        {
                            // Hide previous
                            carousel_prev.hide();

                            // Show next
                            carousel_next.show();
                        }

                        // Started sliding
                        if (pos > 0)
                        {
                            carousel_prev.show(); // Show previous
                        }

                        // End of the scroller
                        if (pos == $items.length - component_carousel_min_items)
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
            else
            {
                // Hide next as there aren't enough items for a slider
                carousel_next.hide();
            }
        });
    }

    /* Modal Window
       ========================================================================== */

    var options_modal =
    {
        opacity: 0.9,
        overlay: '#fff',
        showClose: false,
        zIndex: 1000
    };

    /*
     * Magazine Language Change
     */
    function confirmLanguageChange(selected_language_code)
    {
        // Modal
        var language_confirmation = $j('#language-confirmation');

        if (language_confirmation.length > 0)
        {

            // Launch modal window
            language_confirmation.modal(options_modal);

            // Add data-attribute to language confirmation button
            anchor_confirm_language.attr('data-language-code', selected_language_code);

            // Close modal window
            closeModal(language_confirmation);
        }
    }

    /*
     * Product Size Guide
     */
    var anchor_size_guide = $j('a[data-action="size-guide"]');

    if (anchor_size_guide.length > 0)
    {
        // Modal
        var size_guide = $j('#size-guide');

        if (size_guide.length > 0)
        {

            // Click of size guide icon
            anchor_size_guide.on('click', function(e)
            {
                e.preventDefault(); // Prevent # in address bar

                // Launch modal window
                size_guide.modal(options_modal);
            });

            // Close modal window
            closeModal(size_guide);
        }
    }

    /*
     * Request Restock Modal
     */

    var anchor_request_restock = $j('a[data-action="restock-request"]');

    if (anchor_request_restock.length > 0)
    {
        // Modal
        var request_restock = $j('#request-restock');

        if (request_restock.length > 0)
        {

            // Loop over all request restock anchors
            anchor_request_restock.each(function()
            {

                // Click of the request restock anchor
                $j(this).on('click', function(e)
                {
                    e.preventDefault(); // Prevent # in address bar

                    // Request Product ID
                    var request_product_id = $j(this).attr('data-restock-product-id');

                    // Populate the hidden field with the product ID
                    $j('#restock-product-id', request_restock).val(request_product_id);

                    // Launch modal window
                    request_restock.modal(options_modal);
                });

                // Close modal window
                closeModal(request_restock);
            });
        }
    }

    /*
     * Newsletter Sign Up Modal
     */

    var anchor_newsletter_sign_up = $j('a[data-action="newsletter-sign-up"]');

    if (anchor_newsletter_sign_up.length > 0)
    {
        // Modal
        var newsletter_sign_up = $j('#newsletter-sign-up');

        if (newsletter_sign_up.length > 0)
        {

            // Click of the newsletter sign up button
            anchor_newsletter_sign_up.on('click', function(e)
            {
                e.preventDefault(); // Prevent # in address bar

                // Launch modal window
                newsletter_sign_up.modal(options_modal);
            });

            // Close modal window
            closeModal(newsletter_sign_up);
        }
    }

    /*
     * Voucher Code
     */
    var anchor_voucher_code = $j('a[data-action="voucher-code"]');

    if (anchor_voucher_code.length > 0)
    {
        // Modal
        var voucher_code = $j('#voucher-code');

        if (voucher_code.length > 0)
        {

            // Click of voucher code 'What is this?' anchor
            anchor_voucher_code.on('click', function(e)
            {
                e.preventDefault(); // Prevent # in address bar

                // Launch modal window
                voucher_code.modal(options_modal);
            });

            // Close modal window
            closeModal(voucher_code);
        }
    }

    /*
     * Address Suggestions
     */

    var address_suggestions = $j('#address-suggestions'); // Modal
    var form_checkout = '';

    // Loop over each address suggestion input
    $j('[data-suggest-address="true"]').each(function()
    {

        if (address_suggestions.length > 0)
        {
            // Get the threshold from the data-attribute
            var threshold = $j(this).attr('data-suggest-address-threshold');

            // Add listener for key up event
            $j(this).keyup(function()
            {
                form_checkout = $j(this).closest('form');

                // Number of characters entered meets threshold
                if ($j(this).val().length >= threshold)
                {
                    // Launch modal window
                    suggestAddresses();
                }
            });
        }
    });

    /*
     * Handle the address suggest form submit
     */
    $j('#form-address-suggestions').submit(function(e)
    {
        e.preventDefault(); // Prevent the form from submitting

        // Get the selected address from the list of suggestions
        var selected_address = $j('input[name="address-suggestion"]:radio:checked', $j(this));

        // Address form input
        var input_suburb = $j('[data-address-field="suburb"]', form_checkout);
        var input_city = $j('[data-address-field="city"]', form_checkout);
        var input_postal_code = $j('[data-address-field="postal-code"]', form_checkout);
        var input_country = $j('[data-address-field="country"]', form_checkout);

        // Get the detailed parts of the suggested address
        var selected_address_postal_code = selected_address.attr('data-address-postal-code');
        var selected_address_suburb = selected_address.attr('data-address-suburb');
        var selected_address_city = selected_address.attr('data-address-city');
        var selected_address_country = selected_address.attr('data-address-country');

        // Update the form inputs
        input_suburb.val(selected_address_suburb);
        input_city.val(selected_address_city);
        input_postal_code.val(selected_address_postal_code);

        // Update the form select
        $j('option[value="' + selected_address_country + '"]', input_country).prop('selected', 'selected');

        // Close modal window
        $j.modal.close();
    });

    /*
     * Display a list of suggested addresses
     */
    function suggestAddresses()
    {
        // Launch modal window
        address_suggestions.modal(options_modal);

        // Close modal window
        closeModal(address_suggestions);
    }

    /*
     * Close modal window
     */
    function closeModal(parent_container)
    {
        if (parent_container.length > 0)
        {
            // Click of close icon
            $j('a[data-action="modal-close"]', parent_container).on('click', function(e)
            {
                e.preventDefault(); // Prevent # in address bar

                // Close modal window
                $j.modal.close();
            });
        }
    }

    /*
     * New Billing Address
     */

    var new_billing_address_checkbox = $j('[data-action="new-billing-address"]'); // Checkbox
    var new_billing_address = $j('#billing-address'); // Container

    if (new_billing_address_checkbox.length > 0)
    {

        // Find the next element after the parent of the checkbox. Expecting: input[type="submit"]
        var next_element = new_billing_address_checkbox.parent().next();

        // On click of the checkbox, display the new billing address form
        new_billing_address_checkbox.on('click', function()
        {
            if (new_billing_address.length > 0)
            {
                new_billing_address.stop(true, true).toggle(); // Toggle container

                // Ensure that the submit button is where we expect it to be
                if (next_element.attr('type') == 'submit')
                {
                    next_element.toggle();
                }

                // Scroll down to the new address form
                $j('html, body').animate({
                    easing: 'easeOutExpo',
                    scrollTop: new_billing_address.position().top
                }, 500);
            }
        });
    }

    /*
     * Product Size Toggle
     */
    var ul_product_size = $j('ul[data-toggle="product-size"]');

    if (ul_product_size.length > 0)
    {

        // Apply active class to sizes that aren't sold out
        $j('a[data-sold-out!="true"]', ul_product_size).on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Remove active class from all other anchors, except for the current one
            $j('a.active', ul_product_size).not(this).removeClass('active');

            // Add active class to current anchor
            $j(this).toggleClass('active');
        });
    }

    /*
     * Validation: Numeric characters only [0-9]
     */
    $j('[data-validate-numeric="true"]').keyup(function()
    {
        // Replace any non-numeric characters
        if (this.value != this.value.replace(/[^0-9\.]/g, ''))
        {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        }
    });

    /* Forms: disable submit button on form submission
       ========================================================================== */

    var form_disable_submit = $j('[data-submit="disable"]');

    if (form_disable_submit.length > 0)
    {
        form_disable_submit.each(function()
        {
            // Loop over all forms
            $j(this).submit(function()
            {
                // Submit button
                var submit_button = $j('input[type="submit"]', $j(this));
                var submit_button_text = form_disable_submit.attr('data-submit-text');

                // Disable the button
                submit_button.attr('disabled', 'disabled');

                // Update the value
                if (submit_button_text.length > 0)
                {
                    submit_button.val(submit_button_text);
                }
            });
        });
    }

    /* Tabs
       ========================================================================== */

    var tabs = $j('[data-component="tabs"]');

    if (tabs.length > 0)
    {

        var options_tabs;
        var selected_tab;
        var selected_tab_hash;

        // Loop over all tabs components
        tabs.each(function()
        {
            options_tabs = null;
            selected_tab = $j('[data-selected-tab="true"]', $j(this));
            selected_tab_hash = window.location.hash;

            if (selected_tab.length > 0) // Active tab is specified via data-selected-tab="true" attribute
            {
                options_tabs = {
                    active: selected_tab.index()
                };
            }
            else if (selected_tab_hash != '') // Active tab is specified via # anchor in the URL
            {
                options_tabs = {
                    active: $j('a[href="' + selected_tab_hash + '"]', $j(this)).parent().index()
                };
            }

            // Instantiate jQuery UI tabs for each component
            $j(this).tabs(options_tabs);
        });
    }

    /* Endorsements
       ========================================================================== */

    // Product detail magazine endorsements
    var endorsements_anchor = $j('div.endorsements a');

    if (endorsements_anchor.length > 0)
    {

        // Hover of logo
        endorsements_anchor.hover(function()
        {
            var magazine = $j(this).attr('data-magazine'); // Get the name of the magazine

            if (magazine != null)
            {
                // Remove active endorsement and magazine classes
                $j('div.tabs-inner > div.active').hide().removeClass('active');
                $j('div.endorsements a.active').removeClass('active');

                // Display current endorsement
                $j('div.tabs-inner div.endorsement[data-magazine="' + magazine + '"]').stop(true, true).show().addClass('active');
                $j(this).addClass('active');

                // Active tab
                var tab_active = $j('div.highlight');

                tab_active.css('top', $j(this).position().top - 18);
                tab_active.css('left', $j(this).position().left + 133);
                tab_active.show();
            }
        });

        // Click of logo
        endorsements_anchor.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar
        });
    }

    /* Autocomplete
       ========================================================================== */

    /*
     * This is just a sample of search results data and can be removed once integrated with framework
     */
    var autocomplete_search_results = [
        {
            "id" : "1",
            "label" : "Activewear"
        },
        {
            "id" : "2",
            "label" : "Bags"
        },
        {
            "id" : "3",
            "label" : "Belts"
        },
        {
            "id" : "4",
            "label" : "Bottoms"
        },
        {
            "id" : "5",
            "label" : "Bridal"
        },
        {
            "id" : "6",
            "label" : "Dresses"
        },
        {
            "id" : "7",
            "label" : "Hats"
        },
        {
            "id" : "8",
            "label" : "Jackets & Knitwear"
        },
        {
            "id" : "9",
            "label" : "Jeans"
        },
        {
            "id" : "10",
            "label" : "Jewellery"
        },
        {
            "id" : "11",
            "label" : "Maternity"
        },
        {
            "id" : "12",
            "label" : "Scarves"
        },
        {
            "id" : "13",
            "label" : "Sleepwear"
        },
        {
            "id" : "14",
            "label" : "Sunglasses"
        },
        {
            "id" : "15",
            "label" : "Swimwear"
        },
        {
            "id" : "16",
            "label" : "Tops"
        },
        {
            "id" : "17",
            "label" : "Wallets & Purses"
        },
        {
            "id" : "18",
            "label" : "Watches"
        }
    ];

    // Instantiate jQuery UI autocomplete
    $j('[data-action="autocomplete"]').autocomplete(
        {
            minLength: 1,
            source: autocomplete_search_results
            // source: 'assets/json/autocomplete-search-results.json'
        }
    );

    /**
     * Modify jQuery UI autocomplete results to add <strong> around the term being searched for
     *
     * @param ul
     * @param item
     * @return {*}
     * @private
     */
    $j.ui.autocomplete.prototype._renderItem = function(ul, item)
    {
        var re = new RegExp('^' + this.term, 'i');
        var t = item.label.replace(re, '<strong>' + '$&' + '</strong>');
        return $j('<li></li>')
            .data('item.autocomplete', item)
            .append('<a>' + t + '</a>')
            .appendTo(ul);
    };

    /* serialScroll
       ========================================================================== */

    /*
     * serialScroll - This plugin allows you to easily animate any series of elements, by sequentially scrolling them.
     *
     * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
     */

    var scroller = $j('[data-component="scroller"]');

    if (scroller.length > 0)
    {

        // Controls: Previous and Next
        var scroll_prev = $j('a.scroll-prev', scroller);
        var scroll_next = $j('a.scroll-next', scroller);

        // Instantiate serialScroll
        scroller.serialScroll({
            axis: 'x',
            constant: false,
            cycle: false,
            duration: 500,
            easing: 'easeOutExpo',
            items: 'div.slide',
            prev: scroll_prev,
            next: scroll_next,
            target: 'div.scroller',
            onBefore: function(e, elem, $pane, $items, pos)
            {
                // Beginning of the scroller
                if (pos == 0)
                {
                    // Hide previous
                    scroll_prev.hide();

                    // Show next
                    scroll_next.show();
                }

                // Started sliding
                if (pos > 0)
                {
                    scroll_prev.show(); // Show previous
                }

                // End of the scroller
                if (pos + 1 == $items.length)
                {
                    scroll_next.hide(); // Hide next
                }
                else
                {
                    scroll_next.show(); // Show next
                }
            },
            onAfter: function(elem)
            {
            }
        });

        // Previous selector is hidden on first slide
        scroll_prev.hide();
    }

    /* Table: Order History
       ========================================================================== */

    var order_history_table = $j('table.order-history');

    if (order_history_table.length > 0)
    {
        // Hide all rows containing the order history
        $j('tr.order', order_history_table).stop(true, true).hide();

        var order_history_view_anchor = $j('[data-action="view-order"]');

        if (order_history_view_anchor.length > 0)
        {
            // View order anchor
            order_history_view_anchor.on('click', function(e)
            {
                e.preventDefault(); // Prevent # in address bar

                // Hide all highlight containers
                $j('td div.highlight').hide();

                // Get the order ID from the data-attribute
                var order_id = $j(this).attr('data-order-id');

                // Get the order row based on the order ID
                var order_row = $j('tr[data-order-id="' + order_id + '"]');

                if (order_row.is(':visible'))
                {
                    // Hide the highlight container for the row that just closed
                    order_history_view_anchor.next('.highlight').stop(true, true).hide();
                }
                else
                {
                    // Show the highlight container for the current row
                    $j(this).next('.highlight').stop(true, true).show();
                }

                // Toggle the display of the order row
                order_row.stop(true, true).toggle();

                // Hide all other order rows
                $j('tr.order', order_history_table).not(order_row).stop(true, true).hide();
            });
        }
    }

    /* Form input character counter
       ========================================================================== */

    // Add the counter to each element with the data-attribute
    $j('[data-component="counter"]').each(function()
    {
        // Create a variable with a unique name for each counter
        var name = '-' + $j(this).children('input').attr('id');

        // Add a span after the input
        $j(this).append('<span id="counter' + name + '" class="counter"></span>');

        $j(this).keyup(function()
        {
            // Maximum length specified via maxlength attribute
            var maximum_length = $j(this).children('input').attr('maxlength');

            if (maximum_length != null)
            {
                // Calculate remaining length
                var remaining = maximum_length - $j(this).children('input').val().length;

                if (remaining < 0)
                {
                    remaining = 0;
                }

                // Update the counter
                $j('[id="counter' + name + '"]').text(remaining);
            }
        }).keyup();
    });

    /*
     * CVV help icon
     */
    var anchor_cvv_anchor = $j('[data-action="cvv-icon"]');

    if (anchor_cvv_anchor.length > 0)
    {

        // Icon container
        var cvv_icon = $j('div.cvv-icon');

        anchor_cvv_anchor.on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            // Hide the anchor
            anchor_cvv_anchor.hide();

            // Show the icon
            cvv_icon.fadeIn('slow');
        });
    }

    /*
     * Credit card icon highlight
     */
    var credit_card_input = $j('[data-action="highlight-credit-card-icon"]');

    if (credit_card_input.length > 0)
    {

        credit_card_input.keyup(function()
        {
            highlightCreditCardSystem($j(this));
        });

        /**
         * Highlight the credit card system icon based on the number entered
         * @param input
         * @return {*}
         */
        function highlightCreditCardSystem(input)
        {
            var credit_card_input_value = input.val();

            // Icon paths
            var visa_path = websiteURL + assetsFolder + 'images/logos/logo-visa.png';
            var visa_active_path = websiteURL + assetsFolder + 'images/logos/logo-visa-active.png';
            var mastercard_path = websiteURL + assetsFolder + 'images/logos/logo-mastercard.png';
            var mastercard_active_path = websiteURL + assetsFolder + 'images/logos/logo-mastercard-active.png';

            if (credit_card_input_value.length > 0)
            {

                // First character of credit card number
                var credit_card_starts_with = credit_card_input_value.charAt(0);

                // Icon objects
                var visa_icon = $j('[data-credit-card-system="visa"]');
                var mastercard_icon = $j('[data-credit-card-system="mastercard"]');

                if (credit_card_starts_with == '4') // Visa
                {
                    visa_icon.attr('src', visa_active_path);
                    mastercard_icon.attr('src', mastercard_path);
                }
                else if (credit_card_starts_with == '5') // MasterCard
                {
                    mastercard_icon.attr('src', mastercard_active_path);
                    visa_icon.attr('src', visa_path);
                }
                else
                {
                    visa_icon.attr('src', visa_path);
                    mastercard_icon.attr('src', mastercard_path);
                }
            }
        }
    }

    /* Lookbook
       ========================================================================== */

    /*
     * iosSlider – Touch Enabled jQuery Horizontal Slider Plugin
     *
     * http://iosscripts.com/iosslider/
     * https://github.com/iosscripts/iosSlider
     */

    var lookbook = $j('div.lookbook');

    if (lookbook.length > 0)
    {

        // Get the sequence of the slide to start at
        var start_at_slide = $j.urlParam('s') > 0 ? $j.urlParam('s') : '1';

        // Instantiate iosSlider
        lookbook.iosSlider({
            desktopClickDrag: false,
            infiniteSlider: true,
            keyboardControls: true,
            navNextSelector: $j('.next', lookbook),
            navPrevSelector: $j('.prev', lookbook),
            snapToChildren: true,
            startAtSlide: start_at_slide
        });

        var debug_lookbook;
        var lookbook_popups;
        var lookbook_json_url = websiteURL + assetsFolder + 'json/lookbook.json';

        // JSON data for the Lookbook has been set via an external variable in the HTML
        if (typeof lookbookJSON !== 'undefined' && lookbookJSON.length > 0)
        {
            debug_lookbook = lookbookJSON[0].debug; // Check if debug is enabled
            lookbook_popups = lookbookJSON[1]; // Photos data
        }
        else // Load the JSON data for the Lookbook via AJAX
        {
            $j.ajax({
                async: false,
                url: lookbook_json_url,
                success: function(data)
                {
                    debug_lookbook = data[0].debug; // Check if debug is enabled
                    lookbook_popups = data[1]; // Photos data
                }
            });
        }

        var lookbook_ol = $j('ol', lookbook);

        lookbook_ol.children().each(function()
        {
            var lookbook_li = $j(this);
            var sequence = lookbook_li.index() + 1; // Get sequence, increment by 1 instead of starting at 0
            var photo_index = 'photo-' + sequence; // Create string to reference JSON object name
            var photo = lookbook_popups[photo_index]; // Get the object at the specified index e.g. lookbook_popups['photo-1']

            if (photo) // Check that an object exists at the index
            {
                var popups = photo.popups; // Get the popups for the photo
                var popup_id;
                var popup_top;
                var popup_left;
                var popup_thumbnail_src;
                var popup_title;
                var popup_description;
                var popup_price;
                var popup_anchor_text;
                var popup_anchor_href;
                var popup_anchor_target;
                var popup_indicator_x;
                var popup_indicator_y;
                var hotspot_top;
                var hotspot_left;

                // Loop over all popups for the photo
                for (var i = 0; i < popups.length; i++)
                {
                    popup_id = popups[i].id;
                    popup_top = popups[i].popup_top;
                    popup_left = popups[i].popup_left;
                    popup_thumbnail_src = popups[i].thumbnail_src;
                    popup_title = popups[i].title;
                    popup_description = popups[i].description;
                    popup_price = popups[i].price;
                    popup_anchor_text = popups[i].anchor_text;
                    popup_anchor_href = popups[i].anchor_href;
                    popup_anchor_target = popups[i].anchor_target;
                    popup_indicator_x = popups[i].indicator_x;
                    popup_indicator_y = popups[i].indicator_y;
                    hotspot_top = popups[i].hotspot_top;
                    hotspot_left = popups[i].hotspot_left;

                    // Create the popup container
                    var popup_HTML = '' +
                        '<div id="popup-' + popup_id + '" style="' + 'top:' + popup_top + 'px;left:' + popup_left + 'px;" ' + 'class="popup" data-component="popup">' +
                            '<img src="' + popup_thumbnail_src + '" />' +
                            '<ol>' +
                                '<li class="title">' + popup_title + '</li>' +
                                '<li class="description">' + popup_description + '</li>' +
                                '<li class="price">' + popup_price + '</li>' +
                            '</ol>' +
                            '<a href="' + popup_anchor_href + '" target="' + popup_anchor_target + '" role="button">' + popup_anchor_text + '</a>' +
                            '<div class="indicator ' + popup_indicator_x + ' ' + popup_indicator_y + '"></div>' +
                                (debug_lookbook ? '<div class="debug">' +
                                    '<strong>Popup (Top):</strong> ' + popup_top + '<br/>' +
                                    '<strong>Popup (Left):</strong> ' + popup_left +
                            '</div>' : '') +
                        '</div>';

                    // Create the hotspot anchor
                    var hotspot_HTML = '<a href="' + popup_anchor_href + '" target="' + popup_anchor_target + '" style="' + 'top:' + hotspot_top + 'px;left:' + hotspot_left + 'px;" ' + 'class="hotspot' + (debug_lookbook ? ' debug' : '') + '" data-popup-id="' + popup_id + '" data-action="popup" role="button">' +
                        (debug_lookbook ? '<div class="debug">' +
                            '<strong>Hotspot (Top):</strong> ' + hotspot_top + '<br/>' +
                            '<strong>Hotspot (Left):</strong> ' + hotspot_left +
                            '</div>' : '') +
                        '</a>';

                    // Append the popup to the list item
                    lookbook_li.append(popup_HTML);

                    // Append the hotspot to the list item
                    lookbook_li.append(hotspot_HTML);
                }
            }
        });

        // Loop over all hotspot anchors
        $j('[data-action="popup"]').each(function()
        {
            var anchor = $j(this);
            var id = anchor.attr('data-popup-id');
            var popup = $j('#popup-' + id);

            // Show the popup on mouse enter
            anchor.mouseenter(function()
            {
                $j('[data-component="popup"]').not(popup).hide();
                popup.stop(true, true).fadeIn();
            });

            // Hide the popup on mouse leave
            popup.mouseleave(function()
            {
                popup.delay(1500).hide(0);
            });
        });

        // Display the slider once all content has loaded
        $j(window).load(function()
        {
            lookbook_ol.fadeIn();
            $j('a.controls', lookbook).fadeIn();
            $j('a.info', lookbook).fadeIn();
        });

        // Open information text container
        $j('a[data-action="open-info"]').on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            $j('div[data-component="lookbook-info"]').fadeIn();
        });

        // Close information text container
        $j('a[data-action="close-info"]').on('click', function(e)
        {
            e.preventDefault(); // Prevent # in address bar

            $j('div[data-component="lookbook-info"]').hide();
        });
    }

    /* Lookboard: Products and Stories
       ========================================================================= */

    /*
     * Product viewing component within dialog
     */

    var component_lookboard_product = $j('[data-component="lookboard-product"]');

    if (component_lookboard_product.length > 0)
    {
        var product = $j('div.product', component_lookboard_product);
        var product_photo = $j('div.product > img', component_lookboard_product);
        var product_title = $j('span.product-title', component_lookboard_product);
        var product_designer = $j('span.product-designer', component_lookboard_product);
        var product_price = $j('span.product-price', component_lookboard_product);
        var product_anchor = $j('[data-anchor="lookboard-product"]', component_lookboard_product);
        var thumbnail_anchors = $j('div.thumbnails a', component_lookboard_product);
        var thumbnail_anchor_selected = $j('div.thumbnails a.selected', component_lookboard_product);

        // Loop over all product thumbnail anchors
        thumbnail_anchors.each(function()
        {
            var anchor = $j(this);

            anchor.on('click', function()
            {
                product.addClass('loading'); // Add loading class to container
                product_photo.hide(); // Hide the product photo

                // Remove previously selected anchor
                thumbnail_anchor_selected = $j('div.thumbnails a.selected', component_lookboard_product);
                thumbnail_anchor_selected.removeClass('selected');

                // Add selected class to anchor
                anchor.addClass('selected');

                // Get values from data attributes
                var product_data_photo_large = anchor.data('large');
                var product_data_title = anchor.data('title');
                var product_data_designer = anchor.data('designer');
                var product_data_price = anchor.data('price');
                var product_data_url = anchor.data('url');

                var img = $j('<img/>');

                img.bind('load', function()
                {
                    // Update the product photo
                    product_photo.attr('src', product_data_photo_large);
                    product.removeClass('loading');
                    product_photo.stop(true, true).fadeIn();

                    // Update the product details
                    product_title.html(product_data_title);
                    product_designer.html(product_data_designer);
                    product_price.html(product_data_price);
                    if (typeof product_data_url === 'undefined' || product_data_url === '')
                    {
                        product_anchor.stop(true, true).fadeOut();
                    }
                    else
                    {
                        product_anchor.stop(true, true).fadeIn();
                        product_anchor.attr('href', product_data_url);
                    }
                }).attr('src', product_data_photo_large);

                return false;
            });
        });
    }

    /*
     * Product Dialog
     */

    var lookboard_dialog_product = $j('[data-dialog="lookboard-product"]');

    // Options
    var lookboard_dialog_options_product = {
        autoOpen: false,
        dialogClass: 'lookboard-dialog lookboard-dialog-product',
        modal: true,
        height: 601,
        position: {
            my: 'center',
            at: 'center'
        },
        resizable: false,
        show: 500,
        width: 762
    };

    // Create an instance of Product dialog
    var lookboard_dialog_product_ui = lookboard_dialog_product.dialog(lookboard_dialog_options_product);

    /*
     * Story Dialog
     */

    var lookboard_dialog_story = $j('[data-dialog="lookboard-story"]');

    // Options
    var lookboard_dialog_options_story =
    {
        autoOpen: false,
        dialogClass: 'lookboard-dialog lookboard-dialog-story',
        modal: true,
        height: 'auto',
        position: {
            my: 'center',
            at: 'center'
        },
        resizable: false,
        show: 500,
        width: 570
    };

    // Create an instance of the Story dialog
    var lookboard_dialog_story_ui = lookboard_dialog_story.dialog(lookboard_dialog_options_story);

    /*
     * Lookboard: Open the dialog
     */

    $j('body').on('click', 'a[data-action="lookboard-dialog-open"]', function(e)
    {
        e.preventDefault(); // Prevent # in address bar

        var lookboard_id = $j(this).data('lookboard-id'); // Get the ID of the item in the lookboard

        if (typeof lookboard_id !== 'undefined') // Check that it exists
        {
            var lookboard_json_url = websiteURL + assetsFolder + 'json/lookboard.json';
            var lookboard_type_product = 'product';
            var lookboard_type_story = 'story';

            // Load the JSON data for the Lookbook via AJAX
            $j.ajax({
                async: false,
                url: lookboard_json_url,
                success: function(data)
                {
                    var lookboard_data = data['lookboard-' + lookboard_id];

                    if (typeof lookboard_data !== 'undefined')
                    {
                        var lookboard_item_type = lookboard_data.type;
                        var lookboard_products = lookboard_data.products;
                        var lookboard_story = lookboard_data.story;

                        /*
                         * Product
                         */

                        if (lookboard_item_type === lookboard_type_product)
                        {
                            var lookboard_dialog_product_contents = $j('.lookboard-dialog-contents', lookboard_dialog_product);

                            // Launch the dialog
                            lookboard_dialog_product_ui.dialog('open');

                            // Custom overlay classes
                            $j('.ui-widget-overlay').addClass('lookboard-overlay lookboard-overlay-product');

                            // Hide the contents of the product dialog
                            lookboard_dialog_product.addClass('loading');
                            lookboard_dialog_product_contents.stop(true, true).fadeOut();

                            // Check if the story dialog is open
                            if (lookboard_dialog_story_ui.dialog('isOpen'))
                            {
                                lookboard_dialog_story_ui.dialog('close'); // Close the story dialog

                                // Add data attribute to product dialog
                                lookboard_dialog_product_ui.data('dialog-reopen-story', 'true');
                            }

                            // Get the first product which is displayed in full
                            var lookboard_product_selected = lookboard_data.products[0];

                            // Get specific product data
                            var lookboard_product_selected_title = lookboard_product_selected.title;
                            var lookboard_product_selected_designer = lookboard_product_selected.designer;
                            var lookboard_product_selected_price = lookboard_product_selected.price;
                            var lookboard_product_selected_url = lookboard_product_selected.url;
                            var lookboard_product_selected_photo_large = lookboard_product_selected.photo.large;

                            // Get elements to update
                            var lookboard_product_image = $j('.product > img', lookboard_dialog_product);
                            var lookboard_product_title = $j('[data-value="product-title"]', lookboard_dialog_product);
                            var lookboard_product_designer = $j('[data-value="product-designer"]', lookboard_dialog_product);
                            var lookboard_product_price = $j('[data-value="product-price"]', lookboard_dialog_product);
                            var lookboard_product_anchor = $j('[data-anchor="lookboard-product"]', lookboard_dialog_product);
                            var lookboard_product_1 = $j('[data-product-id="1"]', lookboard_dialog_product);

                            // Remove the selected class from any other products
                            $j('.selected', lookboard_dialog_product).removeClass('selected');

                            // Default the selected class to the first product
                            lookboard_product_1.addClass('selected');

                            // Clear all existing images
                            $j('img', '[data-product-id]').each(function()
                            {
                                $j(this).attr('src', websiteURL + assetsFolder + 'images/general/lookboard-placeholder.png');
                            });

                            // Clear all existing statuses
                            $j('div.status', lookboard_dialog_product).each(function()
                            {
                                $j(this).remove();
                            });

                            var img_1 = $j('<img/>');

                            // Load the first product image
                            img_1.bind('load', function()
                            {
                                // Update the selected product
                                lookboard_product_image.attr('src', lookboard_product_selected_photo_large);
                                lookboard_product_image.attr('alt', lookboard_product_selected_title);
                                lookboard_dialog_product.removeClass('loading');
                                lookboard_product_title.html(lookboard_product_selected_title);
                                lookboard_product_designer.html(lookboard_product_selected_designer);
                                lookboard_product_price.html(lookboard_product_selected_price);

                                // Hide the 'Buy' button if no product URL is present
                                if (lookboard_product_selected_url === '')
                                {
                                    lookboard_product_anchor.hide();
                                }
                                else
                                {
                                    lookboard_product_anchor.attr('href', lookboard_product_selected_url);
                                }

                                var product_index = 1; // Start at 1 instead of 0
                                var product_status;

                                // Loop over all the products associated to the story
                                for (var a = 0; a < lookboard_products.length; a++)
                                {
                                    // Update image source
                                    $j('img', '[data-product-id="' + product_index + '"]').attr('src', lookboard_products[a].photo.medium);

                                    // Update anchor properties
                                    $j('[data-product-id="' + product_index + '"]').data('large', lookboard_products[a].photo.large);
                                    $j('[data-product-id="' + product_index + '"]').data('medium', lookboard_products[a].photo.medium);
                                    $j('[data-product-id="' + product_index + '"]').data('title', lookboard_products[a].title);
                                    $j('[data-product-id="' + product_index + '"]').data('designer', lookboard_products[a].designer);
                                    $j('[data-product-id="' + product_index + '"]').data('price', lookboard_products[a].price);
                                    $j('[data-product-id="' + product_index + '"]').data('url', lookboard_products[a].url);

                                    // Get the product status
                                    product_status = lookboard_products[a].status;
                                    if (typeof product_status !== 'undefined' && product_status !== '')
                                    {
                                        // Add the status element to the anchor
                                        $j('[data-product-id="' + product_index + '"]').append(
                                            '<div class="status ' + product_status.cssClass + '">' + product_status.text + '</div>'
                                        );
                                    }

                                    product_index++;
                                }

                                // Display the contents of the product dialog
                                lookboard_dialog_product_contents.stop(true, true).fadeIn();
                            }).attr('src', lookboard_product_selected_photo_large);
                        }

                        /*
                         * Story
                         */

                        if (lookboard_item_type === lookboard_type_story)
                        {
                            var lookboard_dialog_story_contents = $j('.lookboard-dialog-contents', lookboard_dialog_story);

                            // Launch the dialog
                            lookboard_dialog_story_ui.dialog('open');

                            // Custom overlay classes
                            $j('.ui-widget-overlay').addClass('lookboard-overlay lookboard-overlay-story');

                            // Hide the contents of the story dialog
                            lookboard_dialog_story.addClass('loading');
                            lookboard_dialog_story_contents.stop(true, true).fadeOut();

                            // Get specific story data
                            var lookboard_story_title = lookboard_story.title;
                            var lookboard_story_image = lookboard_story.image;
                            var lookboard_story_text = lookboard_story.text;

                            // Get elements to update
                            var lookboard_header_img = $j('.header > img', lookboard_dialog_story);
                            var lookboard_text = $j('.text', lookboard_dialog_story);
                            var lookboard_story_list = $j('.list-grid', lookboard_dialog_story);

                            var img_2 = $j('<img/>');

                            // Load the header image
                            img_2.bind('load', function()
                            {
                                // Update the story
                                lookboard_header_img.attr('src', lookboard_story_image);
                                lookboard_header_img.attr('alt', lookboard_story_title);
                                lookboard_text.html(lookboard_story_text);
                                lookboard_dialog_story.removeClass('loading');

                                // Display the contents of the story dialog
                                lookboard_dialog_story_contents.stop(true, true).fadeIn();
                            }).attr('src', lookboard_story_image);

                            var lookboard_story_list_items = [];
                            var lookboard_story_product_title;
                            var lookboard_story_product_photo_medium;

                            // Loop over all the products associated to the story
                            for (var b = 0; b < lookboard_products.length; b++)
                            {
                                // Create a list of items to display
                                lookboard_id = lookboard_products[b].lookboard; // ID of the lookboard associated to the product
                                lookboard_story_product_title = lookboard_products[b].title;
                                lookboard_story_product_photo_medium = lookboard_products[b].photo.medium;
                                lookboard_story_list_items.push(
                                    '<li>' +
                                        '<a href="#" data-lookboard-id="' + lookboard_id + '" data-action="lookboard-dialog-open" data-dialog-type="product">' +
                                            '<img src="' + lookboard_story_product_photo_medium + '" width="204" height="282" alt="' + lookboard_story_product_title + '" />' +
                                        '</a>' +
                                    '</li>'
                                );
                            }

                            // Append the list of products to the container
                            lookboard_story_list.empty().append(lookboard_story_list_items);
                            $j('li:nth-child(2n+2)', lookboard_story_list).css('margin-right', 0);
                        }
                    }
                }
            });
        }

        return false;
    });

    /*
     * Lookboard: Close the dialog
     */

    $j('body').on('click', 'a[data-action="lookboard-dialog-close"]', function()
    {
        var lookboard_dialog_type = $j(this).data('dialog-type'); // Get the dialog type

        if (lookboard_dialog_type === 'product') // Product
        {
            // Close the dialog
            lookboard_dialog_product_ui.dialog('close');

            reopenStoryDialog(lookboard_dialog_product_ui.data('dialog-reopen-story'));
        }
        else if (lookboard_dialog_type === 'story') // Story
        {
            // Close the dialog
            lookboard_dialog_story_ui.dialog('close');
        }

        return false;
    });

    // Event listener: close dialog
    lookboard_dialog_product_ui.on('dialogclose', function ()
    {
        reopenStoryDialog(lookboard_dialog_product_ui.data('dialog-reopen-story'));
    });

    /**
     * Check if the story dialog must be reopened
     * @param reopen_story_dialog
     */

    function reopenStoryDialog(reopen_story_dialog)
    {
        if (reopen_story_dialog === 'true')
        {
            // Launch the dialog
            lookboard_dialog_story_ui.dialog('open');

            // Custom overlay classes
            $j('.ui-widget-overlay').addClass('lookboard-overlay lookboard-overlay-story');

            // Remove the data attribute from the product dialog
            lookboard_dialog_product_ui.removeAttr('data-dialog-reopen-story');
        }
    }

    /* Preload images
       ========================================================================== */

    // Images that require preloading
    var images = [
        websiteURL + assetsFolder + 'images/icons/icon-heart-full.png',
        websiteURL + assetsFolder + 'images/icons/icon-heart-large-full.png',
        websiteURL + assetsFolder + 'images/icons/icon-loading.gif',
        websiteURL + assetsFolder + 'images/icons/icon-lookbook-loading.gif',
        websiteURL + assetsFolder + 'images/logos/logo-mastercard-active.png',
        websiteURL + assetsFolder + 'images/logos/logo-visa-active.png'
    ];

    /*
     * Preload images
     *
     * @param arrayOfImages
     */
    function preloadImages(arrayOfImages)
    {
        $j(arrayOfImages).each(function()
        {
            $j('<img/>')[0].src = this;
        });
    }

    // Preload the images
    preloadImages(images);

}());

/* Externally callable functions
   ========================================================================== */

// Default modal window options
var options_modal =
{
    opacity : 0.9,
    overlay : '#fff',
    showClose : false,
    zIndex : 1000
};

/**
 * Opens a modal window
 *
 * @param el_id
 * @param duration
 */
function openModalWindow(el_id, duration)
{
    var modal = $j('#' + el_id);

    if ($j(modal).length > 0)
    {
        modal.modal(options_modal);
    }

    setTimeout(function()
    {
        closeModalWindow();
    }, duration);
}

/**
 * Closes a modal window
 */
function closeModalWindow()
{
    $j.modal.close();
}

/**
 * Fade in an element
 * @param el_id
 */
function fadeInEl(el_id)
{
    var element = $j('#' + el_id);

    if (element.length > 0)
    {
        element.fadeIn('slow', function()
        {
            element.removeClass('hidden');
        });
    }
}