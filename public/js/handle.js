/**
 * initialize socket module
 */
var socket = io("http://localhost:3000");
// var socket = io("https://anonymous-animal-trungquandev.herokuapp.com");

/**
 * Listen to an event from server when an animal online
 */
socket.on('animal-online', (data) => {
    var animal = '<a id="online-' + data.animalId + '" class="list-group-item" style="color: white; background-color: ' + data.animalColor + ';">' + data.animalName + ' ẩn danh.</a>';
    $('#alimals-online').prepend(animal);
});

/**
 * Listen to an event from SERVER when an animal offline
 */
socket.on('animal-offline', (animalId) => {
    $('#online-' + animalId).remove();
});

/**
 * Listen to an event from SERVER when an animal clicks the input box
 */
socket.on('server-send-check', (data) => {
    $('#' + data.inputId).css('border-color', data.animalColor);
    var tooltip = '<span class="tooltiptext" style="color: white; background-color: ' + data.animalColor + ';">' + data.animalName + ' ẩn danh</span>';
    $('#td-' + data.inputId).append(tooltip);
});

/**
 * Listen to an event from SERVER when an animal leaves the input box
 */
socket.on('server-send-uncheck', (inputId) => {
    $('#' + inputId).css('border-color', '');
    $('#td-' + inputId + '>span').remove();
});

$(document).ready(() => {
    /**
     * Add a table has 6 cols and 6 rows
     */
    for (var i = 0; i < 6; i++) {
        var data = "<tr>";
            for(var j = 0; j < 6; j++) {
                data += "<td class='td-animal' id='td-" + i + j + "'><input type='text' class='animal' id='" + i + j + "' placeholder='check me'></td>";
            }
        data += "</tr>";
        $('#animals-table>tbody').append(data);
    }

    /**
     * Initialize a variable inputCheckedId
     */
    var inputCheckedId;

    /**
     * Send Event when an animal clicks the input box
     */
    $('.animal').bind('click', function () {
        socket.emit('animal-check', this.id);
        inputCheckedId = this.id;
    });
    
    /**
     * Send Event when an animal leaves the input box
     */
    $('.animal').bind('blur', function () {
        socket.emit('animal-uncheck', this.id);
    });

    /**
     * Send Event when an animal leaves the site or f5 page.
     */
    $(window).bind('beforeunload', function () {
        socket.emit('animal-uncheck', inputCheckedId);
    });
});