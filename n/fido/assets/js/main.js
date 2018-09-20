/* ==========================================================================
 * Custom JavaScript
 * ========================================================================== */

var init = {};

(function () {

    'use strict';

    /*
     * Check to see if the current browser supports DOM level 2 events e.g. `addEventListener`.
     * Internet Explorer 8 and below does not.
     * Based on: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
     */

    var isModernBrowser = ('addEventListener' in window);
    var $body = $('body');

    /* ==========================================================================
     * Alert
     * ========================================================================== */

    var $alert_component = $('.js-alert');

    if ($alert_component.length > 0) {
        $alert_component.each(function () {
            var $alert = $(this);
            var $dismiss_alert = $('.js-dismiss', $alert);

            $dismiss_alert.on('click', function (e) {
                e.preventDefault();

                $alert.fadeOut();
            });
        });
    }

    /* ==========================================================================
     * Bar
     * ========================================================================== */

    var $bar_component = $('.js-bar');

    if ($bar_component.length > 0) {

        /**
         * Progress bar animation
         * @param percent
         */

        $.fn.progress = function (percent) {
            this.animate({
                width: percent + '%'
            }, 2000);

            return this;
        };

        /*
         * Setup the progress bars
         */

        $bar_component.each(function () {
            var $bar = $(this);
            var bar_percent = $bar.data('bar-percent');

            $bar.css('width', '0%'); // Reset the width of the bar

            /*
             * Animate the width of the bar
             */

            $bar.progress(bar_percent);
        });
    }

    /* ==========================================================================
     * Carousel
     * ========================================================================== */

    init.carousel = function ($selector) {
        var $carousel_component = $selector.find('.js-carousel');

        if ($carousel_component.length > 0) {
            $carousel_component.each(function () {
                var $carousel = $(this);
                var dots = $carousel.data('dots');
                var draggable = $carousel.data('draggable');
                var infinite = $carousel.data('infinite');

                $carousel.slick({
                    dots: typeof dots !== 'undefined' ? dots : false,
                    draggable: typeof draggable !== 'undefined' ? draggable : true,
                    infinite: typeof infinite !== 'undefined' ? infinite : true
                });
            });
        }
    };

    init.carousel($body);

    /* ==========================================================================
     * Circle Chart
     * ========================================================================== */

    init.circleChart = function ($selector) {
        var $circle_chart = $selector.find('.js-circle-chart');

        if ($circle_chart.length > 0) {
            $circle_chart.each(function () {
                var $chart = $(this);

                /*
                 * Colors
                 */

                var foreground_color;
                var color_negative = '#f92b60';
                var color_neutral = '#4275f4';
                var color_positive = '#30eac0';

                /*
                 * Set the foreground color based on the chart class
                 */

                var classes = $chart.attr('class');

                if (classes.indexOf('negative') >= 0) {
                    foreground_color = color_negative;
                }
                else if (classes.indexOf('positive') >= 0) {
                    foreground_color = color_positive;
                }
                else {
                    foreground_color = color_neutral;
                }

                /*
                 * Create a circle chart
                 */

                $chart.circliful({
                    bgcolor: '#fff',
                    border: 'outline',
                    dimension: 160,
                    fgcolor: foreground_color,
                    fontsize: 48,
                    linecap: 'round',
                    width: 8
                });
            });
        }
    };

    init.circleChart($body);

    /* ==========================================================================
     * Collapse
     * ========================================================================== */

    init.collapse = function ($selector) {
        var $collapse_component = $selector.find('.js-collapse');

        if ($collapse_component.length > 0) {
            $collapse_component.each(function () {
                var $collapse = $(this);
                var collapse_text_default = $collapse.text();
                var collapse_id = $collapse.data('collapse-id');
                var collapse_text = $collapse.data('collapse-text');
                var collapse_toggle = $collapse.data('collapse-toggle');

                $collapse.on('click', function (e) {
                    e.preventDefault();

                    if (typeof collapse_id !== 'undefined') {
                        var $el = $('#' + collapse_id);

                        if ($el.length > 0) {
                            $el.toggleClass('is-open');

                            /*
                             * Toggle the active class of the button
                             */

                            if (typeof collapse_toggle !== 'undefined') {
                                if (collapse_toggle) {
                                    $collapse.toggleClass('is-active');
                                }
                            }

                            /*
                             * Toggle the display text of the button
                             */

                            if (typeof collapse_text !== 'undefined') {
                                var collapse_text_current = $collapse.text();

                                if (collapse_text_current !== collapse_text_default) {
                                    $collapse.text(collapse_text_default);
                                }
                                else {
                                    $collapse.text(collapse_text);
                                }
                            }
                        }
                    }
                });
            });
        }
    };

    init.collapse($body);

    /* ==========================================================================
     * Credit Score
     * ========================================================================== */

    var $credit_score = $('.js-credit-score');

    if ($credit_score.length > 0) {
        $credit_score.each(function () {
            var $score = $(this);
            var score = $score.data('credit-score');

            if (typeof score !== 'undefined') {
                var $marker = $('.js-credit-score-marker', $score);

                if ($marker.length > 0) {

                    /*
                     * Calculate the percentage as a value out of a minimum of 300 and a maximum of 750
                     */

                    var percent = (score - 300) / 450 * 100;

                    /*
                     * Update the left position of the marker (including a 1em offset)
                     */

                    $(document).ready(function () {
                        $marker.css('left', 'calc(' + percent + '% - 1em)');
                    });
                }
            }
        });
    }

    /* ==========================================================================
     * Date of Birth
     * ========================================================================== */

    var $dob_component = $('.js-dob');

    if ($dob_component.length > 0) {
        var dob_id = $dob_component.data('dob-id');
        var dob_separator = $dob_component.data('dob-separator');
        var $dob_item = $('[data-dob-item="true"]', $dob_component);
        var number_id = $dob_component.data('number-id');

        if (typeof number_id !== 'undefined') {
            var $number_input = $('#' + number_id);
            var $dob_input = $('#' + dob_id);

            if ($dob_input.length > 0 && $number_input.length > 0) {

                /*
                 * On focus out of the number input field
                 */

                $number_input.on('focusout', function () {
                    var number = $number_input.val();

                    if ($dob_item.is(':checked') && number.length === 13) {
                        var dob = number.substr(0, 6);
                        var dob_century;
                        var dob_year = dob.substr(0, 2); // yy
                        var dob_month = dob.substr(2, 2); // mm
                        var dob_day = dob.substr(4, 2); // dd

                        /*
                         * Default value for separator is `/`
                         */

                        if (typeof dob_separator === 'undefined') {
                            dob_separator = '/';
                        }

                        /*
                         * Guess the century!
                         */

                        if (dob_year <= '16') {
                            dob_century = '20'; // Assume year before 16 is 20xx
                        }
                        else {
                            dob_century = '19'; // Otherwise the year is 19xx
                        }

                        /*
                         * Set the value of the date of birth input e.g. dd/mm/yyyy
                         */

                        if ($dob_item.is(':checked')) {
                            $dob_input.val(dob_day + dob_separator + dob_month + dob_separator + dob_century + dob_year);
                        }
                    }
                });
            }
        }
    }

    /* ==========================================================================
     * Dismiss
     * ========================================================================== */

    var $dismiss_component = $('.js-dismiss');

    if ($dismiss_component.length > 0) {
        $dismiss_component.each(function () {
            var $dismiss = $(this);

            $dismiss.on('click', function (e) {
                e.preventDefault();
                $(this).parent().remove();
            });
        });
    }

    /* ==========================================================================
     * Headroom
     * ========================================================================== */

    var $headroom = $('.js-headroom');

    if ($headroom.length > 0) {
        $headroom.headroom({
            classes: {
                pinned: 'is-pinned',
                unpinned: 'is-unpinned',
                top: 'is-top'
            }
        });
    }

    /* ==========================================================================
     * Label Highlight
     * ========================================================================== */

    var $label_highlight = $('.js-label-highlight');

    if ($label_highlight.length > 0) {
        $label_highlight.each(function () {
            var $container = $(this);
            var $input = $('input', $(this));
            var highlight_class = $(this).data('highlight-class');

            $input.on('click', function () {
                var $label = $(this).parent();

                /*
                 * Toggle the class
                 */

                if ($(this).is(':checked')) {
                    $label.addClass(highlight_class);
                }

                $('label', $container).not($label).removeClass(highlight_class);
            });
        });
    }

    /* ==========================================================================
     * Modal
     * ========================================================================== */

    var $modals_component = $('.js-modal');

    if ($modals_component.length > 0) {
        $modals_component.each(function () {
            var $modal_component = $(this);

            $modal_component.on('click', function (e) {
                e.preventDefault();

                var modal_id = $(this).data('modal-id');

                if (typeof modal_id !== 'undefined') {
                    var $modal = $('#' + modal_id);

                    if ($modal.length > 0) {
                        $modal.modal('show');
                    }
                }
            });
        });
    }

    /* ==========================================================================
     * Navigation Dropdown
     * ========================================================================== */

    var $nav_dropdown = $('.js-nav-dropdown');

    if ($nav_dropdown.length > 0) {
        $('a', $nav_dropdown).each(function () {
            var $anchor = $(this);
            var $anchor_icon = $('.icon', $anchor);
            var $menu = $anchor.next('.list--menu');
            var icon_up = $nav_dropdown.data('icon-up');
            var icon_down = $nav_dropdown.data('icon-down');

            $anchor.on('click', function (e) {

                /*
                 * Toggle the dropdown menu
                 */

                if ($(this).next().hasClass('list--menu')) {
                    e.preventDefault(); // Prevent click on dropdown anchor

                    $menu.toggleClass('is-open');

                    if ($menu.hasClass('is-open')) {
                        $menu.attr('aria-hidden', 'false');
                        $anchor_icon.removeClass(icon_down).addClass(icon_up);
                    }
                    else {
                        $menu.attr('aria-hidden', 'true');
                        $anchor_icon.removeClass(icon_up).addClass(icon_down);
                    }
                }

                /*
                 * Close all other open menus
                 */

                var $menu_other = $('.list--menu', $nav_dropdown).not($menu);
                $menu_other.removeClass('is-open').attr('aria-hidden', 'true');

                /*
                 * Reset icon of all other menu anchors
                 */

                var $anchor_other_icon = $('.icon', $menu_other.prev());
                $anchor_other_icon.removeClass(icon_up).addClass(icon_down);
            });
        });
    }

    /* ==========================================================================
     * Navigation Toggle
     * ========================================================================== */

    var $nav_toggle = $('.js-nav-toggle');

    if ($nav_toggle.length > 0) {

        $nav_toggle.on('click', function (e) {
            e.preventDefault();

            var $nav = $('.js-nav');

            if ($nav.length > 0) {
                $nav.toggleClass('is-open');
                $nav_toggle.toggleClass('is-active');
            }
        });
    }

    /* ==========================================================================
     * Numeric Validation
     * ========================================================================== */

    var $numeric_validation = $('.js-numeric-validation');

    if ($numeric_validation.length > 0) {
        $numeric_validation.each(function () {

            /**
             * Handle `keydown` of `<input />`
             */

            $(this).keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    // Allow: Ctrl+C
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    // Allow: Ctrl+X
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right, down, up
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // Let it happen, don't do anything
                    return;
                }

                // Ensure that it is a number and stop the `keypress`
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        });
    }

    /* ==========================================================================
     * Placeholder
     * ========================================================================== */

    $('input, textarea').placeholder();

    /* ==========================================================================
     * Toggle Dropdown Buttons
     * ========================================================================== */

    var $toggle_dropdown_buttons = $('.js-toggle-dropdown-btn');

    if ($toggle_dropdown_buttons.length > 0) {
        $toggle_dropdown_buttons.each(function () {
            var $button = $('.btn', $(this));

            $button.on('click', function () {

                /*
                 * Open the current dropdown
                 */

                $(this).toggleClass('is-active');

                var dropdown_id = $(this).data('dropdown-id');
                var $dropdown = $('#' + dropdown_id);

                if ($dropdown.length > 0) {
                    $dropdown.toggleClass('is-open');

                    /*
                     * Toggle ARIA attributes
                     */

                    if ($dropdown.hasClass('is-open')) {
                        $dropdown.attr('aria-hidden', 'false');
                    }
                    else {
                        $dropdown.attr('aria-hidden', 'true');
                    }

                    /*
                     * Close all other dropdowns
                     */

                    var $dropdowns = $('.dropdown', $toggle_dropdown_buttons);

                    $dropdowns.not($dropdown).each(function () {
                        $(this).removeClass('is-open');
                        $(this).attr('aria-hidden', 'true');
                    });
                }
            });
        });
    }

    /* ==========================================================================
     * Toggle Password
     * ========================================================================== */

    var $toggle_password = $('.js-toggle-password');

    if ($toggle_password.length > 0 && isModernBrowser) {
        $toggle_password.each(function () {
            var $form = $(this);
            var $input = $('input[type="password"]', $form);
            var $toggle = $('.js-toggle', $form);

            $toggle.removeClass('u-hidden'); // Show the toggle button

            /*
             * Switch the input type
             */

            $toggle.on('click', function (e) {
                e.preventDefault();

                if ($input.attr('type') === 'password') {
                    $toggle.html('Hide');
                    $input.attr('type', 'text');
                }
                else {
                    $toggle.html('Show');
                    $input.attr('type', 'password');
                }

                $input.focus(); // Keep keyboard active on touchscreen devices
            });

            /*
             * Reset the input type
             */

            $form.on('submit', function () {
                $input.attr('type', 'password');
            });
        });
    }

    /* ==========================================================================
     * Toolbar
     * ========================================================================== */

    var $toolbar = $('.js-toolbar');

    if ($toolbar.length > 0) {
        var $items = $('.toolbar__item', $toolbar);
        var $links = $('.toolbar__link', $toolbar);
        var $menus = $('.toolbar-menu', $toolbar);

        $items.each(function () {
            var $link = $('.toolbar__link', $(this));
            var $menu = $('.toolbar-menu', $(this));

            $link.on('click', function (e) {
                e.preventDefault();

                /*
                 * Toggle link state
                 */

                $(this).toggleClass('is-active');
                $links.not($(this)).removeClass('is-active');

                /*
                 * Toggle menu display
                 */

                $menu.toggleClass('is-open');
                $menus.not($menu).removeClass('is-open');
            });
        });

        /*
         * Close toolbar menu on click outside of icon
         */

        $('html').on('click', function (e) {
            var $target = $(e.target);

            if (!$target.hasClass('toolbar__icon') && !$target.hasClass('toolbar__count')) {
                $links.removeClass('is-active');
                $menus.removeClass('is-open');
            }
        });
    }

    /* ==========================================================================
     * Tooltips
     * ========================================================================== */

    init.tooltips = function ($selector) {
        var $tooltips = $selector.find('.js-tooltip');

        if ($tooltips.length > 0) {
            $tooltips.each(function () {
                var $tooltip = $(this);
                $tooltip.tooltip({
                    html: true,
                    trigger: 'manual'
                });

                /*
                 * Manually hide and show tooltips, but keep open until mouse leave.
                 * This is required so that HTML, e.g. anchors within the tooltip can
                 * be clicked on, without the tooltip closing.
                 */

                $tooltip.on('mouseenter', function () {
                    var _this = this;
                    $(this).tooltip('show');
                    $(this).siblings('.tooltip').on('mouseleave', function () {
                        $(_this).tooltip('hide');
                    });
                });

                $tooltip.on('mouseleave', function () {
                    var _this = this;
                    setTimeout(function () {
                        if (!$('.tooltip:hover').length) {
                            $(_this).tooltip('hide');
                        }
                    }, 100);
                });
            });
        }
    };

    init.tooltips($body);
})();
