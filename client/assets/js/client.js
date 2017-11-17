// // This is called with the results from from FB.getLoginStatus().
// function statusChangeCallback(response) {
//   console.log('statusChangeCallback');
//   console.log(response);
//   // The response object is returned with a status field that lets the
//   // app know the current login status of the person.
//   // Full docs on the response object can be found in the documentation
//   // for FB.getLoginStatus().
//   if (response.status === 'connected') {
//     // Logged into your app and Facebook.
//     localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
//     getTimeLine()
//   } else {
//     // The person is not logged into your app or we are unable to tell.
//     console.log('You are not login');
//   }
// }

// // This function is called when someone finishes with the Login
// // Button.  See the onlogin handler attached to it in the sample
// // code below.
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }

window.fbAsyncInit = function() {
FB.init({
  appId      : '188495668380652',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});

// Now that we've initialized the JavaScript SDK, we call
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });

};

function FBLogin () {
  FB.login(function(response) {
    FB.getLoginStatus(function(resStatus){
      console.log('RESPONE------- ',resStatus,'=====',response)
      if (resStatus.status === 'connected') {
        localStorage.setItem('fbaccesstoken', resStatus.authResponse.accessToken)
        getTimeline()
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    })

  }, {scope: 'public_profile,email,user_photos,publish_actions,user_posts'});
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getTimeline(){
  console.log('tuturu')
  // window.location = "http://localhost:8080/";
  axios.get('http://localhost:3000/login', {
    headers: {
      accesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then(response => {
    console.log('=======',response)

  })
  .catch(err => console.log(err))
}

function createEvent(dataEvent){
  
  axios.post('http://localhost:3000/events', {
    event : dataEvent
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
