$(window).on('load', function() {
  $(".loader").fadeOut("slow");
});

$(document).ready(function() {
  loadData();
  setInterval(loadData, 50000);
});

$('input[type=radio').on('click', function() {
  if (document.getElementById('all').checked) {
    $('.card-panel').show();
  } else if (document.getElementById('online').checked) {
    $('.card-panel').hide();
    $('.green').show();
  } else {
    $('.card-panel').hide();
    $('.light-blue').show();
  }
});

function loadData() {
  $('.output').innerHTML = '';
  const users = ["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "cretetion", "habathcx", "dreamleague"];
  const defaultLogo = "https://res.cloudinary.com/mrwhitenerdy/image/upload/v1478309343/logo_vb0knh.png";

  for (let i = 0; i < users.length; i++) {
    let notFound = false;
    let status, bgColor, game;

    $.ajax({
      url: `https://wind-bow.gomix.me/twitch-api/users/${users[i]}`,
      dataType: 'jsonp',
    }).done((userData) => {
      $.ajax({
        url: `https://wind-bow.gomix.me/twitch-api/channels/${users[i]}`,
        dataType: 'jsonp'
      }).done((channelData) => {
        if (channelData.error) {
          notFound = true;
        }

        if (notFound || channelData.status === null) {
          status = 'Offline';
          bgColor = 'light-blue lighten-3';
        } else {
          status = 'Online: ' + channelData.status;
          bgColor = 'green lighten-3';
        }

        let template = `
          <div class="card-panel ${bgColor}">
            <div class="row valign-wrapper">
              <div class="col s2">
                <img src="${userData.logo ? userData.logo : defaultLogo}" alt="" class="circle responsive-img">
              </div>
              <div class="col s10">
                <h3><a href="${channelData.url}" target="_blank">${userData.display_name ? userData.display_name : users[i]}</a></h3>
                <h5>${status}</h5>
              </div>
            </div>
          </div>
        `;

        document.querySelector('.output').innerHTML += template;
      });
    });
  }
}
