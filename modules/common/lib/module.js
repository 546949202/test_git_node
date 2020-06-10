var path=require('path')
module.exports=function (app,service,module_path) {
    app.set("views",path.join(module_path,'views'));
    app.engine(".html",require('ejs').renderFile);
    app.set('view engine','ejs');
    app.set('view engine','html');
    return app;
}