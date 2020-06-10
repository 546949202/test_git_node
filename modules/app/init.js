module.exports=function (app) {
    global.wujl={};
    global.wujl.root_app=app;
    require("../common/lib/load_module")();
}