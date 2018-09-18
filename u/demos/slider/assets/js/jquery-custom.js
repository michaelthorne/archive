/* =============================================================================
   jQuery: all the custom stuff!
   ========================================================================== */

(function()
{

    // Controls: Previous and Next
    var slide_prev = $('a.prev');
    var slide_next = $('a.next');

    $('.wrapper-slider').serialScroll({
        axis: 'x',
        constant: false,
        cycle: true,
        duration: 500,
        easing: 'easeOutExpo',
        force: false,
        interval: 2000,
        items: 'li',
        prev: '.prev',
        next: '.next',
        target: '.slider',
        onBefore: function(e, elem, $pane, $items, pos)
        {
            // Beginning of the slider
            if (pos == 0)
            {
                // Hide previous
                slide_prev.hide();

                // Show next
                slide_next.show();
            }

            // Started sliding
            if (pos > 0)
            {
                slide_prev.show(); // Show previous
            }

            // End of the slider
            if (pos + 1 == $items.length)
            {
                slide_next.hide(); // Hide next
            }
        },
        onAfter: function(elem)
        {
        }
    });
}());