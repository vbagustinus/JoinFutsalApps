const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
var jwt = require('jsonwebtoken');

const findAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  // console.log(req.picture.data.url);
  return new Promise(function(resolve, reject) {
    User.findOne({
      where: {
        email: req.email
      }
    })
    .then(user => {
      if(!user) {
        let email
        if(!req.email){
          email = `${Math.random().toString(36).substr(2, 5)}@mail.com`
        } else {
          email = req.email
        }

        let obj = {
          name: req.name,
          first_name: req.first_name,
          last_name: req.last_name,
          email: email,
          gender: req.gender,
          photo_profile: req.picture.data.url
        }
        User.create(obj)
        .then((user) => {
          jwt.sign(
          {
            id: user._id,
            name: user.name,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            photo_profile: user.photo_profile
          }, 'estehpurun',(err, token) => {
            if(!err){
              console.log('==>>>>>>>>>>>>>>====',token);
              resolve(token)
            } else{
              reject(err)
            }
          });
        })
        .catch(err => console.log(err))
      } else {
        jwt.sign(
        {
          id: user._id,
          name: user.name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          gender: user.gender,
          photo_profile: user.photo_profile
        }, 'estehpurun',(err, token) => {
          if(!err){
            console.log('==>>>>>>>>>>>>>>====',token);
            resolve(token)
          } else{
            reject(err)
          }
        });
      }
    })
    .catch(err=>{
      console.log(err);
    })
  });
}

const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    user.name = req.body.name || user.name,
    user.first_name = req.body.first_name || user.first_name,
    user.last_name = req.body.last_name || user.last_name,
    user.email = req.body.email || user.email,
    user.gender = req.body.gender || user.gender,
    user.photo_profile = req.body.photo_profile || user.photo_profile
    console.log(user);
    user.save()
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const destroy = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.deleteOne(id)
  .then((user) => res.send(user))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  destroy
};
