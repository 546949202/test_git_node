var fs=require('fs');
var path=require('path');
var express=require('express');

function load_module() {
    var module_path=path.join(process.cwd(),"modules");
    var root_app=wujl.root_app;
    var _load_module=function (full_path,root,root_app) {
        var stat=fs.statSync(full_path);
        if(stat.isDirectory()){
            var name=path.basename(full_path);
            var servicePath=path.join(full_path,'service.js');
            if(fs.existsSync(servicePath)){
                wujl[name]=require(servicePath);
            }
            var indexPath=path.join(full_path,'index.js');
            if(fs.existsSync(indexPath)){
                var app=require(indexPath);
                if(typeof app=='function')
                root_app.use(root+name,app);
            }
            var publicPath=path.join(full_path,'public');
            if(fs.existsSync(publicPath)){
                root_app.use(root+name,express.static(publicPath));
            }
        }

    }
    var commonPath=path.join(module_path,"common");
    if(fs.existsSync(commonPath)){
        _load_module(commonPath,'/',root_app);
    }
    fs.readdirSync(module_path).map(function (child) {
        if(child!=="app"&&child!=="common")
        _load_module(path.join(module_path,child),"/",root_app);
    })
}
module.exports=load_module;