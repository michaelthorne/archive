/* ==========================================================================
 * Custom JavaScript
 * ========================================================================== */

(function () {

    'use strict';

    /* ==========================================================================
     * Masonry
     * ========================================================================== */

    var $masonry = $('[data-masonry="true"]');

    if ($masonry.length > 0) {
        $masonry.imagesLoaded(function () {
            $masonry.masonry(
                {
                    itemSelector: '.photo'
                });
        });
    }

    /* ==========================================================================
     * Navigation
     * ========================================================================== */

    var $nav = $('[data-component="nav"]');

    if ($nav.length > 0) {
        var $nav_toggle = $('[data-toggle="nav"]');

        $nav_toggle.on('click', function (e) {
            e.preventDefault();

            $nav.toggleClass('is-open');
        });
    }

    /* ==========================================================================
     * Toolbar
     * ========================================================================== */

    var $tb = $('[data-toolbar="true"]');

    if ($tb.length > 0) {
        var $photo_actions = $('.photo__actions');

        $tb.each(function () {
            var $toolbar = $(this);
            var $toolbar_anchor = $('.action__link', $toolbar);
            var $toolbar_action;
            var $toolbar_photo_actions = $toolbar_anchor.parent().parent();

            $toolbar_anchor.on('click', function (e) {
                e.preventDefault();

                $toolbar_action = $toolbar_anchor.next();

                if ($toolbar_action.hasClass('is-hidden')) {
                    $toolbar_action.removeClass('is-hidden');
                    $toolbar_anchor.addClass('is-active');
                }
                else {
                    $toolbar_action.addClass('is-hidden');
                    $toolbar_anchor.removeClass('is-active');
                }

                $photo_actions.removeClass('is-visible'); // Hide all other photo actions containers
                $toolbar_photo_actions.addClass('is-visible'); // Display the current toolbar photo actions container

                var reset = true;
                var $toolbars = $('.action-toolbar');

                $toolbars.each(function () {
                    if (!$(this).hasClass('is-hidden')) {
                        reset = false;
                    }
                });

                // Hide all other toolbars
                $toolbars.not($toolbar_action).addClass('is-hidden');

                if (reset) {
                    $photo_actions.removeClass('is-visible');
                }
            });
        });
    }

    /* ==========================================================================
     * Toggle
     * ========================================================================== */

    var $toggles = $('.js-toggle');

    if ($toggles.length > 0) {

        $toggles.each(function () {
            var $toggle = $(this);
            var toggle_id = $toggle.data('toggle-id');
            var $toggle_el = $('#' + toggle_id);

            if ($toggle_el.length > 0) {

                $toggle.on('click', function (e) {
                    e.preventDefault();

                    if ($toggle_el.hasClass('is-active')) {
                        $toggle_el.removeClass('is-active');
                    }
                    else {
                        $toggle_el.addClass('is-active');
                    }
                });
            }
        })
    }
})();
