import * as qiniu from "qiniu";

function upload(file) {   //file是选择的文件对象
    return new Promise((resolve, reject) => {
        getQiniuToken().then((res) => {    //这是我封装的获取uptoken的方法，自行修改
            let uptoken = res.data;
            let key = new Date().getTime() + Math.random(1000) + file.name;   //这是上船后返回的文件名，这里为了避免重复，加上了时间戳和随机数
            var config = {
                useCdnDomain: true,        //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                region: qiniu.region.z0,      //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。  我这里是华东区
                domain: "https://img.tukzi.cn", //配置好的七牛云域名  如   https://cdn.qniyun.com/
                chunkSize: 100,     //每个分片的大小，单位mb，默认值3
                forceDirect: true    //直传还是断点续传方式，true为直传
            };
            var putExtra = {
                fname: file.name,    //文件原始文件名
                params: {},
                mimeType: [] || null
                // ...config,
            };
            var observable = qiniu.upload(file, key, uptoken, putExtra, config);
            observable.subscribe({
                next: (result) => {
                    //主要用来展示进度
                },
                error: (err) => {
                    //上传错误后触发
                    console.log(err);
                    reject(err)
                },
                complete: (result) => {
                    //上传成功后触发。包含文件地址。
                    console.log(result);
                    resolve(result)
                },
            });
        });
    })
}
export{
    upload
}