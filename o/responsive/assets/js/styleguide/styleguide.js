/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/XtN0RS by Jason Garber
 * ======================================================================== */

STYLEGUIDE = {

    common: {

        init: function ()
        {
            /* ==========================================================================
               Back to Top
               ========================================================================== */

            var $back_to_top = $('[data-sg-action="back-to-top"]');

            $back_to_top.on('click', function ()
            {
                scrollToTop();
            });

            function scrollToTop()
            {
                $('html, body').animate({
                    easing: 'easeOutExpo',
                    scrollTop: 0
                }, 250);
            }

            /* ==========================================================================
               Code
               ========================================================================== */

            var $code_component = $('[data-sg-component="code"]');

            if ($code_component.length > 0)
            {
                $code_component.each(function ()
                {
                    var $code_example = $(this);
                    var $pre = $('.sg-pre', $code_example);
                    var $code = $('[data-sg-markup="true"]', $code_example);
                    var $code_toggle = $('[data-sg-toggle="code"]', $code_example);

                    $code.text($code.html()); // Convert HTML to character entities

                    $code_toggle.on('click', function ()
                    {
                        $(this).toggleClass('is-active');

                        /*
                         * Toggle the label of the button
                         */

                        var icon_code = '<span class="icon icon--left fa fa-code" aria-hidden="true"></span>';

                        if ($(this).hasClass('is-active'))
                        {
                            $(this).html(icon_code + 'Hide Code');
                        }
                        else
                        {
                            $(this).html(icon_code + 'View Code');
                        }

                        $pre.toggleClass('is-visible'); // Toggle the display of the code
                    });
                })
            }

            /* ==========================================================================
               Last Modified
               ========================================================================== */

            var $last_modified = $('[data-sg-last-modified="true"]');

            if ($last_modified.length > 0)
            {
                // Get the last modified date of the document
                var last_modified_date = new Date(document.lastModified);
                var months = [ "January","February", "March",
                               "April", "May", "June", "July",
                               "August", "September", "October",
                               "November", "December" ];
                var last_modified_day = last_modified_date.getDate();
                var last_modified_month = last_modified_date.getMonth();
                var last_modified_year = last_modified_date.getFullYear();

                // Display the last modified date
                $last_modified.html(months[last_modified_month] + ' ' + last_modified_day + ', ' + last_modified_year);
            }

            /* ==========================================================================
               Scroll
               ========================================================================== */

            var scrolled = 0;
            var scrolled_last = 0;
            var header_height = $('.sg-header--primary').height();

            $(window).on('scroll', function ()
            {
                scrolled = $(window).scrollTop();

                if (scrolled > header_height)
                {
                    if (!$aside.hasClass('is-fixed'))
                    {
                        $aside.addClass('is-fixed');
                    }

                    $back_to_top.fadeIn();
                }
                else
                {
                    if ($aside.hasClass('is-fixed'))
                    {
                        $aside.removeClass('is-fixed');
                    }

                    $back_to_top.fadeOut();
                }

                scrolled_last = scrolled;
            });

            /* ==========================================================================
               Sticky
               ========================================================================== */

            var $aside = $('[data-sg-action="sticky"]');

            $('li a', $aside).on('click', function (e)
            {
                e.preventDefault();

                $('a.is-active').removeClass('is-active');
                $(this).addClass('is-active');

                var href = $(this).attr('href');
                var hash = href.indexOf('#');
                var id = href.substr(hash, href.length);
                var page = href.substr(0, hash);
                var element = $(id);

                $('html, body').animate({
                    easing: 'easeOutExpo',
                    scrollTop: element.offset().top
                }, 250);

                if (history.pushState)
                {
                    history.pushState(null, null, page + id);
                }
            });

            /* ==========================================================================
               Toggle Navigation
               ========================================================================== */

            var $toggle_nav = $('[data-sg-toggle="nav"]');

            $toggle_nav.on('click', function ()
            {
                $('.sg-nav--primary').toggleClass('is-open');
                $toggle_nav.toggleClass('is-active');
            });

            /* ==========================================================================
               Toggle Style Guide View
               ========================================================================== */

            var $toggle_styleguide = $('[data-sg-toggle="styleguide"]');

            $toggle_styleguide.each(function ()
            {
                $(this).on('click', function ()
                {
                    $('body').toggleClass('is-patchwork');
                    scrollToTop();
                });
            });
        }
    }
};

STYLEGUIDE_UTIL = {

    exec: function (controller, action)
    {
        var ns = STYLEGUIDE;
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

        STYLEGUIDE_UTIL.exec('common');
        STYLEGUIDE_UTIL.exec(controller);
        STYLEGUIDE_UTIL.exec(controller, action);
    }
};
