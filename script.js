const users = ["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "cretetion", "habathcx", "dreamleague"];
const defaultLogo = "https://res.cloudinary.com/mrwhitenerdy/image/upload/v1478309343/logo_vb0knh.png";

for (let i = 0; i < users.length; i++) {
  let notFound = false;
  let status, bgColor;

  fetchJsonp(`https://wind-bow.gomix.me/twitch-api/users/${users[i]}`)
  .then((res) => res.json())
  .then((userData) => {
    fetchJsonp(`https://wind-bow.gomix.me/twitch-api/channels/${users[i]}`)
    .then((res) => res.json())
    .then((channelData) => {
      console.log(userData);
      console.log(channelData);

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
    })
    .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
}
