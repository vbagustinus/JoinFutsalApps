const Event = require('../models/eventModel')
const ObjectId = require('mongodb').ObjectId
// const short = require('../middlewares/shortUrl')
const FB = require('fb');
const GoogleURL = require( 'google-url' );
googleUrl = new GoogleURL( { key: 'AIzaSyDbNqAiqdRZT-n5EeTC79O4nQUZLpt1ggc' });

const fb = new FB.Facebook({version: 'v2.8'});
const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}
const findAll = (req, res) => {
  Event.find().populate(['creator', 'member'])
  .then(events => res.send(events))
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  // return new Promise(function(resolve, reject) {
    let dataEvent = req.body.event
    let lokasi = dataEvent.location
    console.log('))))))))))))))))))',dataEvent);
    googleUrl.shorten( lokasi, function( err, Url ) {
     if(!err){
       let objEvent = {
         creator: dataEvent.creator || null,
         event_name: dataEvent.event_name,
         event_desc: dataEvent.event_desc,
         location: Url,
         date: new Date(dataEvent.date),
         createdAt: new Date(),
         updateAt: null,
         member: dataEvent.member || null
       }
       // console.log(objEvent);
       Event.create(objEvent)
       .then(newdataEvent => {
         console.log('))))))))))))))))))',newdataEvent);
         res.send(newdataEvent)
       }) //ngga bisa pke nama event
       .catch(err => res.send(err))
     } else {
       console.log(err);
     }
    });
  // });
}

const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Event.findById(id)
  .then(dataEvent => {
    // res.send(dataEvent)
    dataEvent.event_name = req.body.event_name || dataEvent.event_name,
    dataEvent.event_desc = req.body.event_desc || dataEvent.event_desc,
    // dataEvent.location = req.body.location || dataEvent.creatlocationor,
    // dataEvent.date = req.body.date || dataEvent.date,
    dataEvent.updateAt = new Date ()
    // console.log(dataEvent);
    dataEvent.save()
    .then(dataEvent => res.send(dataEvent))
    .catch(err => res.status(500).send())
  })
  .catch(err => res.status(500).send(err))
}

const destroy = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Event.deleteOne(id)
  .then(dataEvent => res.send(dataEvent))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  destroy
};
