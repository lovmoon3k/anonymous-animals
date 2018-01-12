var socket = io("http://localhost:3000");

socket.on('animal-online', (data) => {
    var animal = '<a id="online-' + data.animalId + '" class="list-group-item" style="color: white; background-color: ' + data.animalColor + ';">' + data.animalName + ' ẩn danh.</a>';
    $('#alimals-online').prepend(animal);
});

socket.on('animal-offline', (animalId) => {
    $('#online-' + animalId).remove();
});

socket.on('server-send-check', (data) => {
    $('#' + data.inputId).css('border-color', data.animalColor);
    var tooltip = '<span class="tooltiptext" style="color: white; background-color: ' + data.animalColor + ';">' + data.animalName + ' ẩn danh</span>';
    $('#td-' + data.inputId).append(tooltip);
});

socket.on('server-send-uncheck', (inputId) => {
    $('#' + inputId).css('border-color', '');
    $('#td-' + inputId + '>span').remove();
});

$(document).ready(() => {
    /**
     * Thêm một table có 6 hàng + 6 cột
     */
    for (var i = 0; i < 6; i++) {
        var data = "<tr>";
            for(var j = 0; j < 6; j++) {
                data += "<td class='td-animal' id='td-" + i + j + "'><input type='text' class='animal' id='" + i + j + "' placeholder='check me'></td>";
            }
        data += "</tr>";
        $('#animals-table>tbody').append(data);
    }

    var inputCheckedId;

    $('.animal').bind('click', function () {
        socket.emit('animal-check', this.id);
        inputCheckedId = this.id;
    });
    
    $('.animal').bind('blur', function () {
        socket.emit('animal-uncheck', this.id);
    });

    $(window).bind('beforeunload', function () {
        socket.emit('animal-uncheck', inputCheckedId);
    });
});