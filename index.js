function createNewWindow(title, desc, url, curr)
{
    var wrapper = '<a href="' + url + '" target="_blank" class="wrapper" id="wrapper' + curr + '"></a>';
    var newWindow = '<div class="containers" id="element' + curr + '"></div>';
    var titleEl = '<div class="title">' + title + "</div>";
    var descEl = '<div class="desc">' + desc + "</div>";
    var urlEl = '<div class="url">' + url + "</div>";
  
    $(".container").append(wrapper);
    $("#wrapper" + curr).append(newWindow);
    
    $("#element" + curr).append(titleEl);
    $("#element" + curr).append(descEl);
    $("#element" + curr).append(urlEl);
}

function errorNoReuslts(keyword)
{
    $("#results").empty();
    var message = '<p id="error">ERROR: No results found about ' +
                   keyword + ".</p>";
    $(message).appendTo(".container");
}

function retrieve(keyword)
{
    var limit = 10;
    var JSONSite = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&redirects=resolve&search=" + keyword;

    $.getJSON(JSONSite, function (data)
    {
        for (var i = 0; i < limit; i++)
        {
            if (data[1][0] != undefined)
                createNewWindow(data[1][i], data[2][i], data[3][i], i + 1);
            else if (i != 0)
            {
                $("#results").text("Here are the top " + (i + 1) + 'articles for the keyword "' + keyword + '":');
              
                break;
            }
          
            else
            {
                errorNoReuslts(data[0]);
                break;
            }
        }
    });
}

$(document).ready(function ()
{
    $("#menu, #container, #results").hide();

    $("#go").click(function ()
    {
        var searchTerm = $(".search-box").val();
      
        $("#intro, #main").hide();
        $("#menu, #container, #results").show();
        $("#results").text('Here are the top 10 articles for the keyword "' + searchTerm + '":');
        $(".container").empty();
      
        retrieve(searchTerm);
    });
  
    $("#back").click(function ()
    {
        $("#menu, #container, #results").hide();
        $("#intro, #main").show();
        $(".container").empty();
    });
  
    $("#go-upper").click(function ()
    {
        var searchTerm = $("#search-box-upper").val();
      
        $("#intro, #main").hide();
        $("#menu, #container, #results").show();
        $("#results").text('Here are the top 10 articles for the keyword "' + searchTerm + '":');
        $(".container").empty();
      
        retrieve(searchTerm);
    });
});
