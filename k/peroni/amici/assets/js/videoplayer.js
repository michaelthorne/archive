/* =============================================================================
   YouTube Video Player
   ========================================================================== */

/**
 * The API will call this function when the player is fully loaded and the API is ready to receive calls.
 * @param el
 */
function onYouTubePlayerReady(el)
{
    vhs.player = document.getElementById(el);
    vhs.loadVideo();
}

/* Events
   ========================================================================== */

var events = {

    state : 'closed',
    hide : function()
    {
        this.content.removeClass('hidden').hide();
    },
    bind : function()
    {
        this.toggleButton.click(function()
        {
            if (events.state === 'closed')
            {
                events.content.slideDown(200, function()
                {
                    events.state = 'open';
                    events.toggleButton.find('span').html('Hide Info');
                    events.toggleButton.find('div').toggleClass('img-arrowDown img-arrowUp');
                });
            } else
            {
                events.content.slideUp(200, function()
                {
                    events.state = 'closed';
                    events.toggleButton.find('span').html('Show Info');
                    events.toggleButton.find('div').toggleClass('img-arrowDown img-arrowUp');
                });
            }
        });
    },
    init : function()
    {
        // cached dom objects
        this.toggleButton = $('#showEventContent');
        this.content = $('#eventContent');
        if (this.toggleButton.length === 1)
        {
            events.bind();
            events.hide();
        }
    }
};

/* Video
   ========================================================================== */

var vhs = {

    // Bind events to video controls
    bind : function()
    {
        $('div.wrapper-video').click(vhs.removeContainer);

        // Play
        $('[data-action="video-play"]').click(function(e)
        {
            e.preventDefault();
            vhs.loadSWF();
        });

        // Pause
        $('[data-action="video-pause"]').click(function(e)
        {
            e.preventDefault();
            vhs.pause();
        });

        // Mute
        $('[data-action="video-mute"]').click(function(e)
        {
            e.preventDefault();
            vhs.mute();
        });

        // Close
        $('[data-action="video-close"]').click(function(e)
        {
            e.preventDefault();
            vhs.removeContainer();
        });

        $('.video-controls').click(function()
        {
            return false;
        });
    },
    // Controls
    pause : function(e)
    {
        if (vhs.player)
        {
            var el = $('[data-action="video-pause"]');

            if (vhs.player.getPlayerState() === 2)
            {
                vhs.player.playVideo();
                el.toggleClass('pressed');
            } else
            {
                vhs.player.pauseVideo();
                el.toggleClass('pressed');
            }
        }
        return false;
    },
    mute : function()
    {
        if (vhs.player)
        {
            var el = $('[data-action="video-mute"]');

            if (vhs.player.isMuted())
            {
                vhs.player.unMute();
                el.toggleClass('pressed');
            } else
            {
                vhs.player.mute();
                el.toggleClass('pressed');
            }
        }
        return false;
    },
    formatSeconds : function(val)
    {
        var time = new Number(val),
            seconds = time.toPrecision(3),
            minutes = parseInt(seconds / 60),
            rem = seconds - (minutes * 60),
            now = '';
        if (rem < 10)
        {
            now = minutes + ':0' + parseInt(rem);
        } else
        {
            now = minutes + ':' + parseInt(rem);
        }
        return now;
    },
    updateTime : function()
    {
        if (vhs.player)
        {
            var time = vhs.formatSeconds(vhs.player.getCurrentTime()),
                duration = vhs.formatSeconds(vhs.player.getDuration()),
                comp = time + ' / ' + duration;
            vhs.timeEl.html(comp);
        }
    },
    loadSWF : function()
    {
        // get inner video container for dimensions
        var wrapper_video_inner = $('div.wrapper-video-inner');
        // show video container
        $('div.wrapper-video').removeClass('hidden');
        // load swf
        var params = { allowScriptAccess : "always" },
            el = "video",
            atts = { id : el },
            url = "http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=" + el,
            width = wrapper_video_inner.css('width'),
            height = wrapper_video_inner.css('height'),
            videoID = vhs.videoID;
        swfobject.embedSWF(url, el, width, height, "8", null, null, params, atts);
    },
    loadVideo : function()
    {
        // load & play video
        vhs.player.loadVideoById(vhs.videoID, 0, 'large');
        // hide nav
        $('.primary-nav').fadeOut();
        // show controls
        $('.video-controls').hide().removeClass('hidden').slideDown();
        // start timer
        vhs.timer = setInterval(vhs.updateTime, 1000);
    },
    removeContainer : function()
    {
        // reset the html, removing flash object etc
        var container = $('div.wrapper-video'),
            controls = container.find('.video-controls');
        container.addClass('hidden').find('object').remove();
        container.find('.wrapper-video-inner').prepend('<div id="video"></div>');

        // Remove the timer
        if (vhs.timer)
        {
            clearInterval(vhs.timer);
            vhs.timer = null;
        }

        // Hide the controls
        controls.addClass('hidden');
        controls.find('.pressed').removeClass('pressed');

        // Show the nav
        $('.primary-nav').fadeIn();
    },
    init : function()
    {
        var el = $('div[data-video-id]');
        if (el.length > 0)
        {
            this.videoID = el.attr('data-video-id');
            this.timeEl = $('div.timer').find('span');
            this.bind();
        }
    }
};

/**
 * Initialize the events and video functions
 */
function init()
{
    events.init();
    vhs.init();
}

init();