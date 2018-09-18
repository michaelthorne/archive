/* =============================================================================
 jQuery: all the custom stuff!
 ========================================================================== */

(function()
{

    var primary_nav_li = $('nav.primary > ul > li');

    // Configuration for hoverIntent
    var hoverIntentConfig = {
         over: showDropDownMenu,
         timeout: 500,
         out: hideDropDownMenu
    };

    // Initialize hoverIntent
    primary_nav_li.hoverIntent(hoverIntentConfig);

    /**
     * Show drop-down menu
     */
    function showDropDownMenu()
    {
        $(this).addClass('hover');
        $('ul:first', this).css('visibility', 'visible');
    }

    /**
     * Hide drop-down menu
     */
    function hideDropDownMenu()
    {
        $(this).removeClass('hover');
        $('ul:first', this).css('visibility', 'hidden');
    }

    /**
     * Show drop-down menu on focus
     */
    $('a', primary_nav_li).focus(function()
    {
        $(this).parent().addClass('hover');
        $('ul:first', $(this).parent()).css('visibility', 'visible');
    });
}());