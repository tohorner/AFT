// Load data from csv file to an array of arrays
$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "assets/data/scrcrd_data.csv",
    dataType: "text",
    success: function(data) {
      scrcrd_data = populateTable(data);
      format_table();
    }
  });
});


function populateTable(data) {
  scrcrd = $.csv.toArrays(data)
  for (let i = 0; i < scrcrd.length; i++) {

    let row = $("<tr></tr>").appendTo($('#main-table > tbody'))
    let row_data = scrcrd[i]


    for (let i = 0; i < row_data.length; i++) {
      let datum = row_data[i]
      cell = $('<td></td>').appendTo(row)
      cell.html(parse_datum(datum))
    }

  }

}

function parse_datum(datum) {
  if (datum === '0') {
    return '&#x2715;';
  }
  if (datum === '0.5') {
    return '&#x25D2;';
  }
  if (datum === '1') {
    return '&#x2713;';
  }
  if (datum === '') {
    return '&nbsp;'
  } else return datum;
}

function format_table() {
  $(function() {
    $('tr > td').each(function(index) {

      var scale = [
        ['danger', '\u2715'],
        ['warning', '\u25D2'],
        ['success', '\u2713']
      ];

      var score = $(this).text();
      console.log(score)

      for (var i = 0; i < scale.length; i++) {
        if (score == scale[i][1]) {
          $(this).addClass(scale[i][0]);
        }
      }
    });
  });
}

$('#main-table').stickyTableHeaders();
