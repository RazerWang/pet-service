/**
 * Created by Administrator on 2016/12/7.
 */
var express = require("express");
var url = require("url");
var util = require("util");
var mysql  = require('mysql');
var app = express();
// app.use(express.static("public"));//pc
app.use(express.static("public_app"));//app



//注册
app.get("/users/register",function(req,res){
    //var params = util.inspect(url.parse(req.url,true));

    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();
    //获取前端请求的数据
    var username = url.parse(req.url,true).query.username;
    var password = url.parse(req.url,true).query.password;
    var nickname = url.parse(req.url,true).query.nickname;
    var age = url.parse(req.url,true).query.age;
    var sex = url.parse(req.url,true).query.sex;
    var telphone = url.parse(req.url,true).query.telphone;
    var email = url.parse(req.url,true).query.email;

    //插入数据
    var  userAddSql = 'INSERT INTO userinfo(username, password,nickname,age,sex,telphone,email) VALUES(?,?,?,?,?,?,?)';
    var  userAddSql_Params = [username, password,nickname,age,sex,telphone,email];
    connection.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200);
        res.end();
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:',result);
        console.log('-----------------------------------------------------------------\n\n');

    });
    //断开数据库连接
    connection.end();


    //res.writeHead(200,{"contextType":"text/plain"});
    //console.log(params);
});

//查询用户列表
app.all("/users/list",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    //查询数据
    var  userGetSql = 'SELECT * FROM userinfo';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
        //res.end(td);
        res.end(JSON.stringify(result));
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    //断开数据库连接
    connection.end();
});

//删除用户列表数据
app.all("/users/delete",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();


    var id = req.query.id;
    var  userDelSql = 'DELETE FROM userinfo WHERE id='+id+';';
    connection.query(userDelSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        res.writeHead(200);
        res.end();
        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });

    //断开数据库连接
    connection.end();

});

//查询用户列表单条数据
app.all("/users/load",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();


    //查询数据
    var id = req.query.id;
    var  userGetSql = 'SELECT * FROM userinfo WHERE id='+id+';';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
        //res.end(td);
        res.end(JSON.stringify(result));
        console.log('--------------------------LOAD----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    //断开数据库连接
    connection.end();
});

//用户登录
app.all("/users/login",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();


    //查询数据
    var username = req.query.username;
    var password = req.query.password;
    var  userGetSql = 'SELECT * FROM userinfo ';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }else{
            var dataInfo = eval(JSON.stringify(result));
            for(var i=0;i<dataInfo.length;i++){
                if(dataInfo[i].username == username && dataInfo[i].password == password){
                    res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
                    //res.end(td);
                    //res.end(dataInfo[i]);
                    res.end(JSON.stringify(dataInfo[i]));
                    console.log('--------------------------SELECT----------------------------');
                    console.log(result);
                    console.log('-----------------------------------------------------------------\n\n');
                    break;
                }
            }
            console.log('[SELECT ERROR]');
            res.end("error");
        }

    });
    //断开数据库连接
    connection.end();
});

//管理员登录
app.all("/manager/login",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();


    //查询数据
    var managername = req.query.managername;
    var managerpassword = req.query.managerpassword;
    var  userGetSql = 'SELECT * FROM managerinfo ';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }else{
            var dataInfo = eval(JSON.stringify(result));
            for(var i=0;i<dataInfo.length;i++){
                if(dataInfo[i].managername == managername && dataInfo[i].managerpassword == managerpassword){
                    res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
                    //res.end(td);
                    //res.end(dataInfo[i]);
                    res.end(JSON.stringify(dataInfo[i]));
                    console.log('--------------------------SELECT----------------------------');
                    console.log(result);
                    console.log('-----------------------------------------------------------------\n\n');
                    break;
                }
            }
            console.log('[SELECT ERROR]');
            res.end("error");
        }

    });
    //断开数据库连接
    connection.end();
});

//修改用户信息
app.all("/users/update",function(req,res){

    //创建数据库连接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    //修改数据
    var id = req.query.id;
    var username = req.query.username;
    var password = req.query.password;
    var nickname = req.query.nickname;
    var age = req.query.age;
    var sex = req.query.sex;
    var telphone = req.query.telphone;
    var email = req.query.email;

    var userModSql = 'UPDATE userinfo SET username = ?,password = ?,nickname=?,age=?,sex=?,telphone=?,email=? WHERE id = ?';
    var userModSql_Params = [username, password,nickname,age,sex,telphone,email,id];
    connection.query(userModSql,userModSql_Params,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
    res.writeHead(200);
    res.end();
    //断开数据库连接
    connection.end();
});

//提交订单
app.get("/shopping/in",function(req,res){
    //var params = util.inspect(url.parse(req.url,true));

    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();
    //获取前端请求的数据
    var userid = url.parse(req.url,true).query.userid;
    var itemid = url.parse(req.url,true).query.itemid;
    var itemnum = url.parse(req.url,true).query.itemnum;
    var itime = url.parse(req.url,true).query.itime;
    var itemstate = "未处理";
    //插入数据
    var  userAddSql = 'INSERT INTO cart(userid, itemid,itemnum,itemstate,itime) VALUES(?,?,?,?,?)';
    var  userAddSql_Params = [userid, itemid,itemnum,itemstate,itime];
    connection.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200);
        res.end();
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:',result);
        console.log('-----------------------------------------------------------------\n\n');

    });
    //断开数据库连接
    connection.end();
    //res.writeHead(200,{"contextType":"text/plain"});
    //console.log(params);
});

//我的订单
app.all("/shopping/itemlist",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    //查询数据
    var userid = req.query.userid;
    var  userGetSql = 'SELECT * FROM cart WHERE userid='+userid+';';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
        //res.end(td);
        res.end(JSON.stringify(result));
        console.log('--------------------------LOAD----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    //断开数据库连接
    connection.end();
});

//删除某一个订单
app.all("/shopping/delete",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    var id = req.query.id;
    var  userDelSql = 'DELETE FROM cart WHERE id='+id+';';
    connection.query(userDelSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        res.writeHead(200);
        res.end();
        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });

    //断开数据库连接
    connection.end();

});

//查看全部订单
app.all("/shopping/out",function(req,res){
    //创建数据库链接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    //查询数据
    var  userGetSql = 'SELECT * FROM cart;';
    connection.query(userGetSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.writeHead(200,{"Context-type":"text/html;charset=UTF-8"});
        //res.end(td);
        res.end(JSON.stringify(result));
        console.log('--------------------------LOAD----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    //断开数据库连接
    connection.end();
});

//处理订单
app.all("/mangeritem/update",function(req,res){

    //创建数据库连接
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        port: '3306',
        database: 'nodesample',
    });
    connection.connect();

    //修改数据
    var id = req.query.id;
    var userid = req.query.userid;
    var itemid = req.query.itemid;
    var itemnum = req.query.itemnum;
    var itime = req.query.itime;
    var itemstate = req.query.itemstate;

    var userModSql = 'UPDATE cart SET userid = ?,itemid = ?,itemnum=?,itime=?,itemstate=? WHERE id = ?';
    var userModSql_Params = [userid, itemid,itemnum,itime,itemstate,id];
    connection.query(userModSql,userModSql_Params,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
    res.writeHead(200);
    res.end();
    //断开数据库连接
    connection.end();
});

//监听8080端口
app.listen(8080,function(){
    console.log("服务器启动成功");
});