$('#slider-wrapper').serialScroll({
    axis: 'x',
    constant: false,
    cycle: false,
    duration: 500,
	force: true,
    interval: 2000,
    items: 'li',
    prev: '#previous',
    next: '#next',
    target: '#slider',
    onBefore: function(e, elem, $pane, $items, pos)
    {
    },
    onAfter: function(elem)
    {
    }
});