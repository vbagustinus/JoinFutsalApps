const Event = require('../models/eventModel')
const ObjectId = require('mongodb').ObjectId

const findAll = (req, res) => {
  Event.find().populate(['creator', 'member'])
  .then(events => res.send(events))
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  let obj = {
    creator: req.body.creator,
    event_name: req.body.event_name,
    event_desc: req.body.event_desc,
    location: req.body.location,
    date: new Date(req.body.date),
    createdAt: new Date(),
    updateAt: null,
    member: req.body.member
  }

  Event.create(obj)
  .then(dataEvent => res.send(dataEvent)) //ngga bisa pke nama event
  .catch(err => res.status(500).send(err))
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

const join = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Event.findById(id)
  .then(dataEvent => {
    dataEvent.member.push(req.body.member)

    dataEvent.save()
    .then(dataEvent => {res.send(dataEvent)})
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  destroy,
  join
};
