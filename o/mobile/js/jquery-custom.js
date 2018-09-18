$(document).on("pageinit", "#home", function()
{
    /*
     * Autocomplete
     */

    $("#autocomplete").on("listviewbeforefilter", function(e, data)
    {
        var $ul = $(this),
            $input = $(data.input),
            value = $input.val(),
            html = "";

        $ul.html("");

        if (value && value.length > 2)
        {
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
            $ul.listview("refresh");
            $.ajax({
                url : "http://gd.geobytes.com/AutoCompleteCity",
                dataType : "jsonp",
                crossDomain : true,
                data : {
                    q : $input.val()
                }
            })
            .then(function(response)
            {
                $.each(response, function(i, val)
                {
                    html += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child ui-btn-hover-c ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#home" class="ui-link-inherit">' + val + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

    /*
     * Search Type
     */

    var button_search_type = $('[data-action="update-search-type"]');

    if (button_search_type.length > 0)
    {
        // Element displaying the selected search type to the user i.e. <b id="search-type">
        var display_search_type = $('#search-type');

        // Loop over all radio buttons
        button_search_type.each(function()
        {
            var button = $(this);

            // Listen for click events
            button.on('click', function()
            {
                // Get the value from the data attribute of the radio button
                var search_type = $(this).attr('data-search-type');

                if (typeof search_type !== 'undefined')
                {
                    // Update the HTML of the element to the selected search type
                    display_search_type.html(search_type);
                }
            });
        });
    }
});