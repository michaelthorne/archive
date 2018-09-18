$('#slider-wrapper').serialScroll({
    axis: 'x',
    constant: false,
    cycle: false,
    duration: 500,
	force: true,
    items: 'li',
    navigation: '#navigation li a',
    target: '#slider',
    onBefore: function(e, elem, $pane, $items, pos)
    {
        $('#navigation li a.current').removeClass(); // remove class from previous item
        pos = pos + 1; // increment the current position
        $('#navigation li a[data-sequence=' + pos + ']').addClass('current'); // add class to current item
    },
    onAfter: function(elem)
    {
    }
});