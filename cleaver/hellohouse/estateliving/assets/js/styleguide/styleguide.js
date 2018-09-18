/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/XtN0RS by Jason Garber
 * ======================================================================== */

STYLEGUIDE = {

    common: {

        init: function ()
        {
            /* ==========================================================================
               Code
               ========================================================================== */

            var $code_component = $('.js-sg-code');

            if ($code_component.length > 0)
            {
                $code_component.each(function ()
                {
                    var $code_example = $(this);
                    var $pre = $('pre', $code_example);
                    var $code = $('code', $code_example);
                    var $code_toggle = $('.js-sg-toggle', $code_example);

                    $code.text($code.html()); // Convert HTML to character entities

                    $code_toggle.on('click', function ()
                    {
                        $(this).toggleClass('is-active');

                        /*
                         * Toggle the label of the button
                         */

                        var icon_code = '<span class="sg-icon sg-icon--left fa fa-code" aria-hidden="true"></span>';

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

                    /*
                     * Ensure the correct class names are displayed in the example code
                     */

                    $code.html($code.html().replace(/%2D/g, '-')); // `%2D` is the HTML character entity for a dash
                });
            }

            /* ==========================================================================
               Jump to Section
               ========================================================================== */

            var $jump_action = $('.js-sg-jump');

            $jump_action.on('change', function ()
            {
                var section = $(this).find('option:selected')[0].value;

                if (section != '')
                {
                    location.hash = '#' + section;
                }
            });

            /* ==========================================================================
               Toggle Navigation
               ========================================================================== */

            var $toggle_nav = $('.js-sg-toggle-nav');

            $toggle_nav.on('click', function ()
            {
                $('.sg-nav--primary').toggleClass('is-open');
                $toggle_nav.toggleClass('is-active');
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
