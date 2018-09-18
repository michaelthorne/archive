/* --- LAZYLOAD ------------ */

$("#slider img").lazyload({
    placeholder : "assets/images/lazyload.gif",
    container: $("#slider")
});

/* --- PRELOAD ------------ */

(function($)
{
    var cache = [];
    // Arguments are image paths relative to the current page.
    $.preLoadImages = function()
    {
        var args_len = arguments.length;
        for (var i = args_len; i--;)
        {
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }
})(jQuery);

jQuery.preLoadImages("assets/images/slider-hover.png", "assets/images/navigation/secondary-navigation-background.jpg", "assets/images/dot-over.png");