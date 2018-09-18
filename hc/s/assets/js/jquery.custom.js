/* --- NAVIGATION: drop-down ------------ */

var destinationsMenuItem = $("#primary-navigation ul li a[name=destinations]");
destinationsMenuItem.hover(function()
{
    destinationsMenuItem.addClass("selected");
    $("#secondary-navigation").stop(true, true).slideDown('slow');
});

// hide secondary navigation on any item that isn't the destinations item
$("#primary-navigation ul li a[name!=destinations]").hover(function()
{
    $("#secondary-navigation").slideUp('slow');
    destinationsMenuItem.removeClass("selected");
});

$("#secondary-navigation").hover(function()
{
    // do nothing
},
function() // hide secondary navigation on mouse out
{
    $("#secondary-navigation").slideUp('slow');
    destinationsMenuItem.removeClass("selected");
});

/* opacity fade for secondary navigation */
$('#secondary-navigation img').hover(function()
{
    $(this).stop().animate({"opacity": "1"}, "normal");
},
function()
{
    $(this).stop().animate({"opacity": "0.5"}, "normal");
});

/* --- FOOTER: social media icons ------------ */

$('#footer ul li img').css("opacity", "0.5");

$('#footer ul li img').hover(function()
{
    $(this).stop().animate({"opacity": "1"}, "normal");
},
function()
{
    $(this).stop().animate({"opacity": "0.5"}, "normal");
});

/* --- ACCORDION: tips ------------ */

$('#cv-builder span a, #destination-map span a').click(function()
{
    var itemHeader = $(this).parent().parent(); // get the header of the item being toggled
    var currentImage = $(this).find("img"); // get the maximize image of the link that was clicked
    var currentImageSrc = currentImage.attr("src"); // get the current source of the image: minimized or maximized

    if (currentImageSrc == "assets/images/minimize.png")
    {
        currentImage.attr("src", "assets/images/maximize.png");
    }
    else
    {
        currentImage.attr("src", "assets/images/minimize.png");
    }
    var currentContents = $(itemHeader).next(":first"); // get next contents
    if ($.browser.msie && $.browser.version == "6.0")
    {
        currentContents.stop().toggle(); // changed to just .toggle() for IE6
    }
    else
    {
        currentContents.stop().slideToggle("slow");
    }
    itemHeader.stop().toggleClass("border");
    $('#cv-builder .box-contents, #destination-map .box-contents').not(currentContents).hide(); // close all others
    $('#cv-builder .box-header span a img, #destination-map .box-header span a img').not(currentImage).attr("src", "assets/images/maximize.png"); // reset all toggles
    return false; // get rid of the # in the address bar
});

/* --- QUIZ: choices ------------ */

$('#choices ul li a').click(function(event)
{
    event.preventDefault();
    $(this).parent().parent().children().each(function()
    {
        $(this).find("a").removeClass("selected");
        $(this).find("input[type=checkbox]").attr("checked", false);
    });
    var checkbox = $(this).next(); // get the hidden checkbox for the choice
    checkbox.attr("checked", true);
    $(this).addClass("selected");
});

/* --- SCROLLER: tips ------------ */

var scroller = $('#scroller');
if (scroller.length != 0) // check that it is present
{
    scroller.serialScroll({
        target:'#scroller-tips',
        items:'li', // Selector to the items ( relative to the matched elements, '#sections' in this case )
        prev:'img#previous',// Selector to the 'prev' button (absolute!, meaning it's relative to the document)
        next:'img#next',// Selector to the 'next' button (absolute too)
        axis:'x',// The default is 'y' scroll on both ways
        navigation:'#scrolling-navigation li a',
        duration:500,// Length of the animation (if you scroll 2 axes and use queue, then each axis take half this time)
        force:true, // Force a scroll to the element specified by 'start' (some browsers don't reset on refreshes)

        //queue:false,// We scroll on both axes, scroll both at the same time.
        //event:'click',// On which event to react (click is the default, you probably won't need to specify it)
        //stop:false,// Each click will stop any previous animations of the target. (false by default)
        //lock:true, // Ignore events if already animating (true by default)
        //start: 0, // On which element (index) to begin ( 0 is the default, redundant in this case )
        cycle:false,// Cycle endlessly ( constant velocity, true is the default )
        //step:1, // How many items to scroll each time ( 1 is the default, no need to specify )
        //jump:false, // If true, items become clickable (or w/e 'event' is, and when activated, the pane scrolls to them)
        //lazy:false,// (default) if true, the plugin looks for the items on each event(allows AJAX or JS content, or reordering)
        //interval:1000, // It's the number of milliseconds to automatically go to the next
        constant:false, // constant speed

        onBefore:function( e, elem, $pane, $items, pos ){
            /**
             * 'this' is the triggered element
             * e is the event object
             * elem is the element we'll be scrolling to
             * $pane is the element being scrolled
             * $items is the items collection at this moment
             * pos is the position of elem in the collection
             * if it returns false, the event will be ignored
             */
             //those arguments with a $ are jqueryfied, elem isn't.
            e.preventDefault();
            if( this.blur )
                this.blur();
        },
        onAfter:function( elem ){
            //'this' is the element being scrolled ($pane) not jqueryfied
        }
    });

    $('#scrolling-navigation li:not(:first-child,:last-child) img').hover(function()
    {
        $(this).attr("src", "assets/images/dot-over.png");
    },
    function()
    {
        $(this).attr("src", "assets/images/dot.png");
    });
}

/* --- SLIDER: landing ------------ */

/* reset the scroller */
$("#slider").scrollTo(0);
$.scrollTo(0);

$('#slider-navigation a').click(function(event)
{
    event.preventDefault();
    var slider = $("#slider");
    var linkId = $(this).attr("id");
    if (linkId == "navigation-destination-1")
    {
        slider.scrollTo( 410, { duration: "slow" } );
    }
    else if (linkId == "navigation-destination-2")
    {
        slider.scrollTo( 1100, { duration: "slow" } );
    }
    else if (linkId == "navigation-destination-3")
    {
        slider.scrollTo( 1640, { duration: "slow" } );
    }
    else if (linkId == "navigation-destination-4")
    {
        slider.scrollTo( 2240, { duration: "slow" } );
    }
    else if (linkId == "navigation-destination-5")
    {
        slider.scrollTo( 2800, { duration: "slow" } );
    }
    else if (linkId == "navigation-destination-6")
    {
        slider.scrollTo( 3700, { duration: "slow" } );
    }
    return false;
});

$('#slider span a').click(function(event)
{
    event.preventDefault();
    $("#slider").scrollTo( 410, { duration: "slow" } );
    return false;
});

/* navigation */
$('#slider-navigation img').click(function()
{
    var listItem = $(this).parent().parent(); // get the parent li of the image
    listItem.parent().children().each(function()
    {
        if ($(this).hasClass("selected")) // reset the currently selected item
        {
            // set back to the original image
            var image = $(this).find("img");
            image.attr("src", "assets/images/slider-dot.png");
            image.attr("width", "11");
            image.attr("height", "11");
            // adjust the padding and width accordingly
            $(this).css("width", "91px");
            $(this).css("padding-top", "13px");
            $(this).css("padding-left", "13px");
            if ($(this).is(':last-child'))
            {
                $(this).css("width", "58px");
            }
            else if ($(this).is(':first-child'))
            {
                $(this).css("padding-left", "56px");
            }
        }
        $(this).removeClass("selected");
    });
    listItem.addClass("selected");
    
    // swap the image
    $(this).attr("src", "assets/images/slider-hover.png");
    $(this).attr("width", "37");
    $(this).attr("height", "37");
    listItem.css("width", "104px");
    listItem.css("padding-top", "0");
    listItem.css("padding-left", "0");
    // adjust the padding and width accordingly
    if ($(this).parent().parent().is(':last-child'))
    {
        listItem.css("width", "45px");
    }
    else if (listItem.is(':first-child'))
    {
        listItem.css("padding-left", "43px");
    }
});

$('#slider-navigation img').hover(function()
{
    var listItem = $(this).parent().parent(); // get the parent li of the image
    if (!listItem.hasClass("selected"))
    {
        // swap the image
        $(this).css("opacity", 0);
        $(this).stop().animate({opacity: 1}, "normal");
        $(this).attr("src", "assets/images/slider-hover.png");
        $(this).attr("width", "37");
        $(this).attr("height", "37");
        listItem.css("width", "104px");
        listItem.css("padding-top", "0");
        listItem.css("padding-left", "0");
        // adjust the padding and width accordingly
        if ($(this).parent().parent().is(':last-child'))
        {
            listItem.css("width", "45px");
        }
        else if (listItem.is(':first-child'))
        {
            listItem.css("padding-left", "43px");
        }
    }
},
function()
{
    var listItem = $(this).parent().parent(); // get the parent li of the image
    if (!listItem.hasClass("selected"))
    {
        // swap the image
        $(this).attr("src", "assets/images/slider-dot.png");
        $(this).attr("width", "11");
        $(this).attr("height", "11");
        // adjust the padding and width accordingly
        listItem.css("width", "91px");
        listItem.css("padding-top", "13px");
        listItem.css("padding-left", "13px");
        if (listItem.is(':last-child'))
        {
            listItem.css("width", "58px");
        }
        else if (listItem.is(':first-child'))
        {
            listItem.css("padding-left", "56px");
        }
    }
});

/* --- MODAL ------------ */

$('#modal-window').jqm({ajax: 'modal-content.html', trigger: 'a.modal-window', toTop: true});
$('.#modal-close').click(function()
{
   $('#modal-window').jqmHide();
});

/* --- BOX-INNER ------------ */

/*$('div.box-inner').hover(function()
{
    $(this).css("background", "#fdfdfd");
},
function()
{
    $(this).css("background", "inherit");
});*/

// CSS IE - :first-child, :last-child doesn't seem to work even with IE9.js
$('.box-footer ul li:first-child img, .box-footer ul li:last-child img').css("padding-top", "0");

// Styling applied with jQuery
$('#destination-map div.box-header:last').addClass("no-border");
$('#cv-builder div.box-contents:last div.inner-container').addClass("no-padding");
$('#login-register div#content .box-inner').first().addClass("first");
$('label:first-child').css("padding-top", "15px");
$('#cv-builder label:first-child').css("padding-top", "0px");
$('#cv-builder fieldset label:first-child').css("margin-top", "15px");
$('#cv-builder fieldset label:first-child').css("padding-top", "15px");