var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  var html = `
              ${template.topMenu()}
              <form action="/search" method="post">
              ${template.vehicleSearch()}
              <ul>
                <li><a href="">국산</a></li>
                <li><a href="">수입</a></li>
                <li><a href="">친환경</a></li>
                <li><a href="">반자율주행</a></li>
              </ul>
              <img src="/images/main.jpg" style="width:1000px; display:block; margin-top:10px;">
  `;
  res.send(html);
});

module.exports = router;
