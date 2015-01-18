var UI = require("ui");
var Vector2 = require("vector2");
var ajax = require("ajax");

var onRefresh = function (commits) {
  var items = [];

  commits.forEach(function (each) {
    items.push({
      title: each.commit.author.name,
      subtitle: each.commit.message
    });
  });

  var menu = new UI.Menu({
    sections: [{
      items: items
    }]
  });

  menu.on("select", function(e) {
    console.log("Selected item #" + e.itemIndex + " of section #" + e.sectionIndex);
    console.log("The item is titled '" + e.item.title + "'");
  });

  menu.show();
};

var onError = function (error) {
  console.log("Error: " + error);
};

var refresh = function (onSuccess, onFail) {
    var options = {
      url: "https://api.github.com/repos/valtech-nas/beta/commits",
      type: "json",
      headers: {
        "user-agent": "pebble"
      }
    };

    ajax(options, onSuccess, onFail);
};
  
var main = new UI.Card({
  title: "Pebble GIT",
  icon: "images/GitHub-Mark-28px.png",
  subtitle: "<SUBTITLE>",
  body: "<BODY>"
});

main.show();

main.on("click", "up", refresh);
