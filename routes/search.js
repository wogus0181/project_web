var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var template = require('../lib/template.js');

router.post('/', function(req, res, next) {
    var post = req.body;
    var sql = `select * from vehicle where `;
    var i = 0;
    var n = ['vhcl_nmbr', 'prd_yr', 'mileage', 'used_prc', 'model'];
    while(i < n.length){
        if(post.car === n[i]){
            sql += n[i];
            break;
        }
        i++;
    }
    sql += '=?';

    db.query(sql,[post.srch_wd], function(error, result){
        console.log(result);
        if(result == ''){
            console.log('sql문 실패, 공백');
            html = `
                    <script type="text/javascript">
                        alert("차량이 없습니다.");
                        document.location.href='/';
                    </script>
            `;
            res.send(html);
        }else if(result == undefined){
            console.log('sql문 실패, undefined');
            html = `
                    <script type="text/javascript">
                        alert("차량이 없습니다.");
                        document.location.href='/';
                    </script>
            `;
            res.send(html);
        }else {
            console.log('sql문 성공');
            html = `
                    ${template.topMenu()}
                    <p><a href="/manager/search_page">차량 조회</a></p>
                    <p><a href="/manager/register">차량 등록</a></p>
                    <form action="/search" method="post">
                    ${template.vehicleSearch()}
                    <p>${template.vehicleTable_user(result)}</p>
            `;
            res.send(html);
        }
    });
});

module.exports = router;