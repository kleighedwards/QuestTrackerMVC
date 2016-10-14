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
  $('#image').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h3 = $('<h3>');
  $h3.attr("id", "totals");

  var totalGold = 0;
  var foesDefeated = 0;
  var locationArr = [];
  var locationsTraveled = 0;

  var $table = $('<table>');
  var $thead = $('<thead>');
  var $headRow = $('<tr>');
  var $thFoe = $('<th>');
  $thFoe.text("Foe Defeated");
  $thFoe.click(function(e) {
    $('#totals').text("Foes Defeated: " + foesDefeated);
  })

  var $thLand = $('<th>');
  $thLand.text("Land Where Encountered");
  $thLand.click(function(e) {
    $('#totals').text("Lands Traveled To: " + locationsTraveled);
  })

  var $thLoot = $('<th>');
  $thLoot.text("Loot Obtained");
  var $thGold = $('<th>');
  $thGold.text("Gold Obtained");
  $thGold.click(function(e) {
    $('#totals').text("Your Total Riches: " + totalGold);
  })

  var $thEdit = $('<th>');
  $thEdit.text("Revise This Tale");
  var $thDelete = $('<th>');
  $thDelete.text("Purge This Conquest");

  $headRow.append($thFoe, $thLand, $thLoot, $thGold, $thEdit, $thDelete);
  $thead.append($headRow);
  $table.append($thead);

  var $tbody = $('<tbody>');

  data.forEach(function(quest, index, array) {
    var $tr = $('<tr>');
    for (var variable in quest) {
      if (variable === "foe") {
        var $tdFoe = $('<td>');
        $tdFoe.text(quest[variable]);
        foesDefeated++;
        $tdFoe.click(function(e) {
          console.log("Show Quest Clicked For: " + quest.id);
          showQuest(quest);
        })
      }
      if (variable === "land") {
        var $tdLand = $('<td>');
        var land = quest[variable];

        for (var item in land) {
          if (item === "name") {
            $tdLand.text(land[item]);

            $tdLand.click(function(e) {
              showLand(land);
            })

            if(jQuery.inArray(land[item], locationArr) === -1) {
              locationsTraveled++;
              locationArr.push(land[item]);
            }
          }
        }
      }
      if (variable === "loot") {
        var $tdLoot = $('<td>');
        var lootArr = quest[variable];
        var lootNameArr = [];

        lootArr.forEach(function(loot, index, array) {
          for (var item in loot) {
            if (item === "name") {
              lootNameArr.push(loot.name);
              // $tdLoot.text(loot[item]);
              // console.log(loot[item]);
            }
          }
        })
        quest[variable] = lootNameArr.join(", ");
        $tdLoot.text(quest[variable]);
      }
      if (variable === "gold") {
        var $tdGold = $('<td>');
        $tdGold.text(quest[variable]);
        totalGold += quest[variable];
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

    $tr.append($tdFoe, $tdLand, $tdLoot, $tdGold, $tdEdit, $tdDelete);
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
  $('#image').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text(quest.foe);

  var $image = $('<img>');
  $image.attr("src", quest.image);

  var $p = $('<p>');
  $p.text(quest.tale);

  $('#data-table').append($h2);
  $('#image').append($image);
  $('#quest-form').append($p);
}

// Show Info On Land
var showLand = function(land) {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#image').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text(land.name);

  var $image = $('<img>');
  $image.attr("src", land.image);

  var $p = $('<p>');
  $p.text(land.description);

  $('#data-table').append($h2);
  $('#image').append($image);
  $('#quest-form').append($p);
}

// Create A Quest
var createQuest = function() {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#image').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text("Recount Your Latest Quest");

  var $foeHeader = $('<h3>');
  $foeHeader.text("Foe Encountered");
  var $form = $('<form>');
  var $foe = $('<input>');
  $foe.attr("type", "text");
  $foe.attr("placeholder", "Name Your Foe");

  var $tale = $('<input>');
  $tale.attr("type", "text");
  $tale.attr("placeholder", "Describe The Villain");

  var $foeImage = $('<input>');
  $foeImage.attr("type", "text");
  $foeImage.attr("placeholder", "Portrait Of The Defeated");

  var $landHeader = $('<h3>');
  $landHeader.text("Land Traveled To");
  var $landName = $('<input>');
  $landName.attr("type", "text");
  $landName.attr("placeholder", "Name This Land");

  var $landDesc = $('<input>');
  $landDesc.attr("type", "text");
  $landDesc.attr("placeholder", "Describe This Land");

  var $landImage = $('<input>');
  $landImage.attr("type", "text");
  $landImage.attr("placeholder", "Photograph");

  var $spoilsHeader = $('<h3>');
  $spoilsHeader.text("Your Spoils");
  var $gold = $('<input>');
  $gold.attr("type", "text");
  $gold.attr("placeholder", "Riches Earned");

  var $loot = $('<input>');
  $loot.attr("type", "text");
  $loot.attr("placeholder", "Loot Obtained");

  var $br = $('<br>');
  var $br1 = $('<br>');

  var $submit = $('<input>');
  $submit.attr("type", "submit");
  $submit.attr("value", "Log This Quest")

  $submit.click(function(e) {
    e.preventDefault();

    if ($foeImage.val() === "") {
      $foeImage.val('http://i.imgur.com/vRHU5E1.jpg');
    }

    if ($landImage.val() === "") {
      $landImage.val('http://img.wallpaperfolder.com/f/7984DC3F6364/dark-souls-iphone-plus.jpg');
    }

    if ( isNaN($gold.val()) ) {
      alert("What sort of number be this?");
    }

    else {
      var newQuest = {
        foe : $foe.val(),
        land : {
          name : $landName.val(),
          description : $landDesc.val(),
          image : $landImage.val()
        },
        tale : $tale.val(),
        gold : parseInt($gold.val()),
        image : $foeImage.val(),
        loot : [{
            name : $loot.val()
          }]
        };

        persistQuest(newQuest);
      }
  })


  $form.append($foeHeader, $foe, $tale, $foeImage, $('<br>'),
    $spoilsHeader, $gold, $loot, $('<br>'),
    $landHeader, $landName, $landDesc, $landImage, $('<br>'),
    $('<br>'), $('<br>'), $submit);

  $('#quest-form').append($h2);
  $('#quest-form').append($form);
}

// Edit A Quest
var editQuest = function(quest) {
  $('#nav-bar').empty();
  $('#data-table').empty();
  $('#image').empty();
  $('#quest-form').empty();

  buildNavBar();

  var $h2 = $('<h2>');
  $h2.text("Revise This Quest");

  var $foeHeader = $('<h3>');
  $foeHeader.text("Foe Encountered");

  var $form = $('<form>');
  var $foe = $('<input>');
  $foe.attr("type", "text");
  $foe.attr("placeholder", "Foe Encountered");
  $foe.attr("value", quest.foe);

  var $tale = $('<input>');
  $tale.attr("type", "text");
  $tale.attr("placeholder", "Log Your Tale");
  $tale.attr("value", quest.tale);

  var $foeImage = $('<input>');
  $foeImage.attr("type", "text");
  $foeImage.attr("placeholder", "Portrait Of The Defeated");
  $foeImage.attr("value", quest.image);

  var $landHeader = $('<h3>');
  $landHeader.text("Land Traveled To");
  var $landName = $('<input>');
  $landName.attr("type", "text");
  $landName.attr("placeholder", "Name This Land");
  $landName.attr("value", quest.land.name);

  var $landDesc = $('<input>');
  $landDesc.attr("type", "text");
  $landDesc.attr("placeholder", "Describe This Land");
  $landDesc.attr("value", quest.land.description);

  var $landImage = $('<input>');
  $landImage.attr("type", "text");
  $landImage.attr("placeholder", "Photograph");
  $landImage.attr("value", quest.land.image);

  var $spoilsHeader = $('<h3>');
  $spoilsHeader.text("Your Spoils");
  var $gold = $('<input>');
  $gold.attr("type", "text");
  $gold.attr("placeholder", "Riches Earned");
  $gold.attr("value", quest.gold);

  var $submit = $('<input>');
  $submit.attr("type", "submit");
  $submit.attr("value", "Log This Quest")

  $submit.click(function(e) {
    e.preventDefault();

    var reviseQuest = {
      foe : $foe.val(),
      land : {
        name : $landName.val(),
        description : $landDesc.val(),
        image : $landImage.val()
      },
      tale : $tale.val(),
      gold : parseInt($gold.val()),
      image : $foeImage.val()
      };

    updateQuest(reviseQuest, quest.id);
  })

  $form.append($foeHeader, $foe, $tale, $foeImage, $('<br>'),
    $spoilsHeader, $gold, $('<br>'),
    $landHeader, $landName, $landDesc, $landImage, $('<br>'),
    $('<br>'), $('<br>'), $submit);

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
