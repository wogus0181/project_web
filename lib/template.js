module.exports = {
    vehicleTable_manager:function(vehicles){
        var tag = `<table border="1">
                        <tr>
                            <th>차량 번호</th>
                            <th>생산연도</th>
                            <th>키로수</th>
                            <th>중고가</th>
                            <th>차종</th>
                        </tr>
        `;
        var i = 0;
        while(i < vehicles.length){
            tag += `
                    <tr>
                        <td>${vehicles[i].vhcl_nmbr}</td>
                        <td>${vehicles[i].prd_yr}</td>
                        <td>${vehicles[i].mileage}</td>
                        <td>${vehicles[i].used_prc}</td>
                        <td>${vehicles[i].model}</td>
                        <td>
                            <form action="/manager/modify/${vehicles[i].vhcl_nmbr}" method="post">
                                <input type="hidden" name="vhcl_nmbr" value="${vehicles[i].vhcl_nmbr}">
                                <input type="hidden" name="prd_yr" format="YYYY-MM-DD" value="${vehicles[i].prd_yr}" >
                                <input type="hidden" name="mileage" value="${vehicles[i].mileage}">
                                <input type="hidden" name="used_prc" value="${vehicles[i].used_prc}">
                                <input type="hidden" name="model" value="${vehicles[i].model}">
                                <input type="submit" value="수정">
                            </form>
                        </td>
                        <td>
                            <form action="/manager/delete_process" method="post">
                                <input type="hidden" name="vhcl_nmbr" value="${vehicles[i].vhcl_nmbr}">
                                <input type="submit" value="삭제">
                            </form>
                        </td>
                    </tr>
            `
            i++;
        }
        tag += '</table>';
        return tag;
    }, vehicleTable_user:function(vehicles){
        var tag = `<table border="1">
                        <tr>
                            <th>차량 번호</th>
                            <th>생산연도</th>
                            <th>키로수</th>
                            <th>중고가</th>
                            <th>차종</th>
                        </tr>
        `;
        var i = 0;
        while(i < vehicles.length){
            tag += `
                    <tr>
                        <td>${vehicles[i].vhcl_nmbr}</td>
                        <td>${vehicles[i].prd_yr}</td>
                        <td>${vehicles[i].mileage}</td>
                        <td>${vehicles[i].used_prc}</td>
                        <td>${vehicles[i].model}</td>
                    </tr>
            `
            i++;
        }
        tag += '</table>';
        return tag;
    },vehicleSearch:function(){
        return `
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
        `;
    }, topMenu:function(){
        return `
                <a href="">자유게시판</a>
                <a href="">마이 페이지</a>
                <a href="/manager">관리자 페이지</a>
                <h1><a href="/">중고차 사이트</a></h1>
                `;
    }
}