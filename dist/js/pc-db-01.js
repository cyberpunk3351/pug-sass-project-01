function doMagic(path, tableid) {
    $.getJSON(path, function (data) {
        $(data).each(function(index, item) {
        $(tableid).append(
            '<tr><td class="col1">'+ item.title01 +'</td><td class="col2">' + item.shopcode + '</td><td> <a href="' + item.link + '">' + item.title + '</a></td><td class="col3">' + item.cost + '</td></tr>'
            );
        });
    });
    }

doMagic('/js/db04.json', '.table')

doMagic('/js/db04.json', '#table2')