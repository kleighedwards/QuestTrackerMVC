$(document).ready(function() {
  getQuests();
})

// Gets All Quests and Builds Table
var getQuests = function() {
  $.ajax({
    type: "GET",
    url: "api/quest",
    dataType: "json",
    success: buildTable
  }).fail(function(e){
    console.log(e);
    console.log("Get Quests Failed!");
  });
}

var buildNavBar = function() {
  var $ul = $('<ul>');
  var $liCreate = $('<li>');
  $liCreate.text("Add A New Quest");

  $liCreate.click(function(e) {
    createQuest();
  })

  $ul.append($liCreate);
  $('#nav-bar').append($ul);
}

var buildTable = function(data) {
  //Empty Divs
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $table = $('<table>');
  var $thead = $('<thead>');
  var $headRow = $('<tr>');
  var $thFoe = $('<th>');
  $thFoe.text("Foe Defeated");
  var $thLand = $('<th>');
  $thLand.text("Land Where Encountered");
  var $thTale = $('<th>');
  $thTale.text("Recount This Tale");
  var $thGold = $('<th>');
  $thGold.text("Gold Obtained");
  var $thDelete = $('<th>');
  $thDelete.text("Purge This Conquest");

  $headRow.append($thFoe, $thLand, $thTale, $thGold, $thDelete);
  $thead.append($headRow);
  $table.append($thead);

  var $tbody = $('<tbody>');

  data.forEach(function(quest, index, array) {
    var $tr = $('<tr>');
    for (var variable in quest) {
      if (variable === "foe") {
        var $tdFoe = $('<td>');
        $tdFoe.text(quest[variable]);
        $tr.append($tdFoe);
      }
      if (variable === "land") {
        var $tdLand = $('<td>');
        $tdLand.text(quest[variable]);
        $tr.append($tdLand);
      }
      if (variable === "tale") {
        var $tdTale = $('<td>');
        $tdTale.text(quest[variable]);
        $tr.append($tdTale);
      }
      if (variable === "gold") {
        var $tdGold = $('<td>');
        $tdGold.text(quest[variable]);
        $tr.append($tdGold);
      }
    }
    // Create Delete Button For Each Quest
    var $tdDelete = $('<td>');
    $tdDelete.text("Purge");

    $tdDelete.click(function(e) {
      console.log("Delete Clicked For Quest " + quest.id);
      deleteQuest(quest);
    })

    $tr.append($tdDelete);
    $tbody.append($tr);
  })
  $table.append($tbody);
  $('#data-table').append($table);
};

// Delete A Quest
var deleteQuest = function(quest) {
  $.ajax({
    type: "DELETE",
    url: "api/quest/" + quest.id,
    success: getQuests
  }).fail(function(e, status){
    console.log(e);
    console.log(status);
    console.log('Delete Quest Failed!');
  });
}

// Create A Quest
var createQuest = function() {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text("Recount Your Latest Quest");

  var $form = $('<form>');
  var $foe = $('<input>');
  $foe.attr("type", "text");
  $foe.attr("placeholder", "Foe Encountered");

  var $land = $('<input>');
  $land.attr("type", "text");
  $land.attr("placeholder", "Land Traveled To");

  var $tale = $('<input>');
  $tale.attr("type", "text");
  $tale.attr("placeholder", "Log Your Tale");

  var $gold = $('<input>');
  $gold.attr("type", "text");
  $gold.attr("placeholder", "Riches Earned");

  var $br = $('<br>');
  var $br1 = $('<br>');

  var $submit = $('<input>');
  $submit.attr("type", "submit");
  $submit.attr("value", "Log This Quest")

  $submit.click(function(e) {
    e.preventDefault();

    var quest = {
      foe : $foe.val(),
      land : $land.val(),
      tale : $tale.val(),
      gold : $gold.val()
      };

    var questString = JSON.stringify(quest);

    $.ajax({
      type: "POST",
      url: "api/quest",
      contentType: "application/json",
      data: questString,
      success: getQuests
    }).fail(function(e){
      console.log(e);
      console.log('Post New Quest Failed!');
    });
  })

  $form.append($foe, $land, $tale, $gold, $br, $br1, $submit);

  $('#quest-form').append($h2);
  $('#quest-form').append($form);
}
