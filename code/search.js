//search bar handler
$(function()
{
    var searchField = $('#query');
    var icon = $('#search-btn');

    $('#search-form').submit(function(e)
    {
        e.preventDefault();
    });
})

function search()
{
    //clear results
    $('#results').html('');
    $('#buttons').html('');

    //get form input
    var str = '+computer+science';
    q = $('#query').val()+str;

    //run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyAJHuTWgtwzE6gGMpjYk9APltQB4Js-iXw',
            maxResults: 2
            
        },
        function(data)
        {
            $.each(data.items, function(i,item)
            {
                //get output
                var output = getOutput(item);

                //display results
               $('#results').append(output);
            });

          

        }
    );
}


//build output
function getOutput(item)
{
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //build output string
    var output = '<li>' +
    '<div class="list-left">' +
    '<img src="'+thumb+'">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed">'+title+'</a></h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span> </small>' +
    //'<p>'+description+'</p>'+
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';

    return output;
}

