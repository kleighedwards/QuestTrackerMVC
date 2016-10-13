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

// Gets Quest By ID and Show Additional Info
// var getQuestByID = function(id) {
//   $.ajax({
//     type: "GET",
//     url: "api/quest/" + id,
//     dataType: "json",
//     success: buildTable
//   }).fail(function(e){
//     console.log(e);
//     console.log("Get Quest By ID Failed!");
//   });
// }

var buildNavBar = function() {
  var $ul = $('<ul>');
  var $liTitle = $('<li>');
  $liTitle.text("Quest Tracker");
  $liTitle.click(function(e) {
    getQuests();
  })

  var $liCreate = $('<li>');
  $liCreate.text("Add A New Quest");

  $liCreate.click(function(e) {
    createQuest();
  })

  $ul.append($liTitle, $liCreate);
  $('#nav-bar').append($ul);
}

var buildTable = function(data) {
  //Empty Divs
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h3 = $('<h3>');
  var totalGold = 0;

  var $table = $('<table>');
  var $thead = $('<thead>');
  var $headRow = $('<tr>');
  var $thFoe = $('<th>');
  $thFoe.text("Foe Defeated");
  var $thLand = $('<th>');
  $thLand.text("Land Where Encountered");
  var $thTale = $('<th>');
  $thTale.text("Recount This Adventure");
  var $thGold = $('<th>');
  $thGold.text("Gold Obtained");
  var $thEdit = $('<th>');
  $thEdit.text("Revise This Tale");
  var $thDelete = $('<th>');
  $thDelete.text("Purge This Conquest");

  $headRow.append($thFoe, $thLand, $thTale, $thGold, $thEdit, $thDelete);
  $thead.append($headRow);
  $table.append($thead);

  var $tbody = $('<tbody>');

  data.forEach(function(quest, index, array) {
    var $tr = $('<tr>');
    for (var variable in quest) {
      if (variable === "foe") {
        var $tdFoe = $('<td>');
        $tdFoe.text(quest[variable]);
        $tdFoe.click(function(e) {
          console.log("Show Quest Clicked For: " + quest.id);
          showQuest(quest);
        })

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
        totalGold += quest[variable];
        $tr.append($tdGold);
      }
    }
    // Create Edit Button For Each Quest
    var $tdEdit = $('<td>');
    $tdEdit.text("Revise");

    $tdEdit.click(function(e) {
      console.log("Edit Clicked For Quest " + quest.id);
      editQuest(quest);
    })


    // Create Delete Button For Each Quest
    var $tdDelete = $('<td>');
    $tdDelete.text("Purge");

    $tdDelete.click(function(e) {
      console.log("Delete Clicked For Quest " + quest.id);
      deleteQuest(quest);
    })

    $tr.append($tdEdit, $tdDelete);
    $tbody.append($tr);
  })
  $table.append($tbody);
  $h3.text("Your Total Riches: " + totalGold);

  $('#data-table').append($h3, $table);
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

// Show Additional Info
var showQuest = function(quest) {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text(quest.foe);

  var $image = $('<img>');
  $image.attr("src", quest.image);

  var $p = $('<p>');
  $p.text(quest.tale);

  $('#data-table').append($h2, $image, $p);
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

    var newQuest = {
      foe : $foe.val(),
      land : $land.val(),
      tale : $tale.val(),
      gold : $gold.val()
      };

    persistQuest(newQuest);
  })

  $form.append($foe, $land, $tale, $gold, $br, $br1, $submit);

  $('#quest-form').append($h2);
  $('#quest-form').append($form);
}

// Edit A Quest
var editQuest = function(quest) {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text("Revise This Latest Quest");

  var $form = $('<form>');
  var $foe = $('<input>');
  $foe.attr("type", "text");
  $foe.attr("placeholder", "Foe Encountered");
  $foe.attr("value", quest.foe);

  var $land = $('<input>');
  $land.attr("type", "text");
  $land.attr("placeholder", "Land Traveled To");
  $land.attr("value", quest.land);

  var $tale = $('<input>');
  $tale.attr("type", "text");
  $tale.attr("placeholder", "Log Your Tale");
  $tale.attr("value", quest.tale);

  var $gold = $('<input>');
  $gold.attr("type", "text");
  $gold.attr("placeholder", "Riches Earned");
  $gold.attr("value", quest.gold);

  var $br = $('<br>');
  var $br1 = $('<br>');

  var $submit = $('<input>');
  $submit.attr("type", "submit");
  $submit.attr("value", "Log This Quest")

  $submit.click(function(e) {
    e.preventDefault();

    var reviseQuest = {
      foe : $foe.val(),
      land : $land.val(),
      tale : $tale.val(),
      gold : $gold.val()
      };

    updateQuest(reviseQuest, quest.id);
  })

  $form.append($foe, $land, $tale, $gold, $br, $br1, $submit);

  $('#quest-form').append($h2);
  $('#quest-form').append($form);
}

// Add Quest to Database
var persistQuest = function(newQuest) {
  var questString = JSON.stringify(newQuest);

  $.ajax({
    type: "POST",
    url: "api/quest",
    contentType: "application/json",
    data: questString,
    success: getQuests
  }).fail(function(e){
    console.log(e);
    console.log("Post New Quest Failed!");
  });
}

// Update Quest in Database
var updateQuest = function(reviseQuest, id) {
  var questString = JSON.stringify(reviseQuest);

  $.ajax({
    type: "PUT",
    url: "api/quest/" + id,
    contentType: "application/json",
    data: questString,
    success: getQuests
  }).fail(function(e){
    console.log(e);
    console.log("Update Quest Failed!");
  });
}
