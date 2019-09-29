const fs = require('fs');
// 图片文件夹路径
const path = require('path');
const request = require('request');
const { SRC_PATH, getFileNameUUID32 } = require(':lib/Utils');
const userAgents = require(':lib/userAgents');
/**
 * 文件操作工具类
 */
const FileUtils = {

    /**
     * 下载图片到本地且返回地址
     * @param {*} imageUrl
     * @param {*} encoding
     */
    async downloadImageToLocal({ imageUrl, encoding, mkdirName, proxyIP }) {
        console.log(`正在下载:${imageUrl},代理IP为: ${proxyIP}`);
        return new Promise(async(resolve, reject) => {
            try {
                const headers = { 'User-Agent': userAgents };
                const options = { pool: false, proxy: proxyIP, headers };
                request.head(imageUrl, options, (err, res) => {
                    if (res) {
                        const ext = imageUrl.split('.').pop(); //获取文件扩展名
                        const filepath = `${SRC_PATH}/public/images`; //保存到书城图片专用文件夹
                        const imgDir = path.join(filepath, mkdirName); //保存到哪里去
                        const filename = getFileNameUUID32(ext); //获取文件名
                        request(imageUrl, options).on('response', () => { // 再次发起请求，写文件
                            console.log(`已下载文件:${imgDir}/${filename}`);
                            resolve({ filename, status: 200 });
                        }).pipe(fs.createWriteStream(path.join(imgDir, filename), {
                            'encoding': encoding || 'utf8'
                        }));
                    } else {
                        console.log(`失败：下载图片=>${imageUrl}`);
                        reject(new Error({ status: 400, msg: err }));
                    }
                });
            } catch (error) {
                reject(new Error({ status: 400, msg: error }));
            }
        });
    }

};
module.exports = FileUtils;
