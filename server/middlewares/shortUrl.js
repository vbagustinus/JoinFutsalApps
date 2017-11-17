const GoogleURL = require( 'google-url' );
googleUrl = new GoogleURL( { key: 'AIzaSyDbNqAiqdRZT-n5EeTC79O4nQUZLpt1ggc' });

function shortUrl(url) {
  googleUrl.shorten( url, function( err, Url ) {
   console.log('================',Url);
  } );
}


module.exports = shortUrl;
