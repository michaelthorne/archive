/*
 * HTML5 Placeholder Input Fields Fixed with jQuery
 *
 * Blog: http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
 * Github: https://gist.github.com/379601
 */

$j('[placeholder]').focus(function()
{
    var input = $j(this);
    if (input.val() == input.attr('placeholder'))
    {
        input.val('');
        input.removeClass('placeholder');
    }
}).blur(function()
{
    var input = $j(this);
    if (input.val() == '' || input.val() == input.attr('placeholder'))
    {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
    }
}).blur().parents('form').submit(function()
{
    $j(this).find('[placeholder]').each(function()
    {
        var input = $j(this);
        if (input.val() == input.attr('placeholder'))
        {
            input.val('');
        }
    })
});