var users = ["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "cretetion", "habathcx", "dreamleague"];
var name, game, logo, description, status, url, content;

$(document).ready(function () {
    setInterval(getData(), 30000);
});

function getData() {
    users.forEach(function (user) {
        $.ajax({
            url: "https://wind-bow.gomix.me/twitch-api/streams/" + user,
            dataType: "jsonp",
            contentType: "application/json",
            success: function (data) {
                if (data.stream === null) {
                    game = "Offline";
                    status = "off";
                } else if (data.stream === undefined) {
                    game = "Account Closed";
                    status = "off";
                } else {
                    game = data.stream.game;
                    status = "on";
                }
            }
        });
        $.ajax({
            url: "https://wind-bow.gomix.me/twitch-api/channels/" + user,
            dataType: "jsonp",
            contentType: "application/json",
            success: function (data) {
                if (data.logo != null) {
                    logo = data.logo;
                } else {
                    logo = "https://res.cloudinary.com/mrwhitenerdy/image/upload/v1478309343/logo_vb0knh.png";
                }

                if (data.display_name != null) {
                    name = data.display_name;
                } else {
                    name = user;
                }

                if (status == "off") {
                    description = "";
                } else {
                    description = data.status;
                }

                url = "https://twitch.tv/" + user;

                content = '<div class="row"><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"><img src="' + logo + '" class="img-responsive img-circle"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"><span>' + game + '</span> <span>' + description + '</span></div></div>';
                $(".container").append(content);
            }
        });
    });
}