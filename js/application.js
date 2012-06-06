function zeroPadding(num, width) {
  var zeroRepeat = '';
  for(var i=0; i<width; i++) { zeroRepeat += '0'; }
  var toSlice = -1 * width;
  return (zeroRepeat + num).slice(toSlice);
}
function formatDateString(dateString) {
  var d       = new Date(Date.parse(dateString));
  var year    = d.getFullYear();
  var month   = zeroPadding(d.getMonth() + 1, 2);
  var date    = zeroPadding(d.getDate(), 2);
  var hours   = zeroPadding(d.getHours(), 2);
  var minutes = zeroPadding(d.getMinutes(), 2);
  return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes;
}
function formatTimeString(dateString) {
  var d       = new Date(Date.parse(dateString));
  var hours   = zeroPadding(d.getHours(), 2);
  var minutes = zeroPadding(d.getMinutes(), 2);
  return hours + ':' + minutes;
}
var apiUrl = 'http://api.atnd.org/events/';
var keyword = 'Akasaka.scala';
var url = apiUrl + '?keyword=' + keyword + '&count=3&format=jsonp';
$.getJSON(url + '&callback=?', function(data){
  $.each(data.events, function(i, event) {
    var link = $('<a/>');
    link.attr('target', '_blank');
    link.attr('href', event.event_url);
    link.text(event.title);

    var startedAt = formatDateString(event.started_at);
    var endAt = formatTimeString(event.ended_at);
    var schedule = startedAt + '～' + endAt;

    var acceptance = event.accepted + ' / ' + event.limit + ' 名';
    var place = event.place;

    $('#eventLoading').remove();
    $('#events').append(
      $('<tr>')
        .append($('<td>').text(schedule))
        .append($('<td>').html(link))
        .append($('<td>').text(acceptance))
        .append($('<td>').text(place))
    );
  });
});


