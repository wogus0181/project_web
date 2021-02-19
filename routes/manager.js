var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var template = require('../lib/template.js');



router.get('/search_page', function(req, res, next) {   //차량조회 페이지
    db.query(`SELECT * FROM vehicle`, function(error, vehicles){
        var html = `
                ${template.topMenu()}
                <p><a href="/manager/search_page">차량 조회</a></p>
                <p><a href="/manager/register">차량 등록</a></p>
                <form action="/manager/search_process" method="post">
                ${template.vehicleSearch()}
        `;
        res.send(html);
    });
});

router.post('/search_process', function(req, res, next){   //차량조회 프로세스 작업 겸 페이지 출력
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
                        document.location.href='/manager/search_page';
                    </script>
            `;
            res.send(html);
        }else if(result == undefined){
            console.log('sql문 실패, undefined');
            html = `
                    <script type="text/javascript">
                        alert("차량이 없습니다.");
                        document.location.href='/manager/search_page';
                    </script>
            `;
            res.send(html);
        }else {
            console.log('sql문 성공');
            html = `
                    ${template.topMenu()}
                    <p><a href="/manager/search_page">차량 조회</a></p>
                    <p><a href="/manager/register">차량 등록</a></p>
                    <form action="/manager/search_process" method="post">
                        <select name="car">
                            <option value="vhcl_nmbr">차량번호</option>
                            <option value="prd_yr">생산연도</option>
                            <option value="mileage">키로수</option>
                            <option value="used_prc">중고가</option>
                            <option value="model">차종</option>
                        </select>
                        <input type="text" name="srch_wd">
                        <input type="submit" value="검색">
                    </form>
                    <p>${template.vehicleTable_manager(result)}</p>
            `;
            res.send(html);
        }
    });
});

router.get('/register', function(req, res, next){   //차량 등록 페이지
    var html = `
        ${template.topMenu()}
        <p><a href="/manager/search_page">차량 조회</a></p>
        <p><a href="/manager/register">차량 등록</a></p>
        <form action="/manager/register_process" method="post">
            <p><input type="text" name="vhcl_nmbr" placeholder="차량번호"></p>
            <p><input type="date" name="prd_yr" format="YYYY-MM-DD"></p>
            <p><input type="text" name="mileage" placeholder="키로수"></p>
            <p><input type="text" name="used_prc" placeholder="중고가격"></p>
            <p><input type="text" name="model" placeholder="차종 (ex: avante)"></p>
            <p><input type="submit"></p>
        </form>
    `;
    res.send(html);
});

router.post('/register_process', function(req, res, next){  //차량 등록  프로세스
    var post = req.body;
    console.log(post);
    db.query(`INSERT INTO vehicle VALUES(?, ?, ?, ?, ?)`, [post.vhcl_nmbr, post.prd_yr, post.mileage, post.used_prc, post.model], function(error, result){
        res.redirect(`/manager`);
    });
});

router.post('/modify/:pageId', function(req, res, next){ //차량 수정 데이터 입력 페이지
    var post = req.body;
    console.log(post);
    var html = `
        ${template.topMenu()}
        <p><a href="/manager/search_page">차량 조회</a></p>
        <p><a href="/manager/register">차량 등록</a></p>
        <form action="/manager/modify_process" method="post">
            <input type="hidden" name="id" value="${post.vhcl_nmbr}">
            <p><input type="text" name="vhcl_nmbr" value="${post.vhcl_nmbr}"></p>
            <p><input type="date" name="prd_yr" format="YYYY-MM-DD" value="${post.prd_yr}"></p>
            <p><input type="text" name="mileage" value="${post.mileage}"></p>
            <p><input type="text" name="used_prc" value="${post.used_prc}"></p>
            <p><input type="text" name="model" value="${post.model}"></p>
            <p><input type="submit"></p>
        </form>
    `;
    res.send(html);
});

router.post('/modify_process', function(req, res){  //수정 프로세스
    var post = req.body;
    console.log(post);

    db.query(`UPDATE vehicle SET vhcl_nmbr=?, prd_yr=?, mileage=?, used_prc=?, model=? WHERE vhcl_nmbr=?`, 
        [post.vhcl_nmbr, post.prd_yr, post.mileage, post.used_prc, post.model, post.id], function(error, result){
        res.redirect(`/manager`);
    });
});

router.post('/delete_process', function(req, res){  //삭제 프로세스
    var post = req.body;
    db.query(`DELETE FROM vehicle WHERE vhcl_nmbr=?`, [post.vhcl_nmbr]);
    res.redirect(`/manager`);
});

router.get('/', function(req, res, next) {
    db.query(`SELECT * FROM vehicle`, function(error, vehicles){
        var html = `
                ${template.topMenu()}
                <p><a href="/manager/search_page">차량 조회</a></p>
                <p><a href="/manager/register">차량 등록</a></p>
                ${template.vehicleTable_manager(vehicles)}
        `;
        res.send(html);
    });
});

module.exports = router;
