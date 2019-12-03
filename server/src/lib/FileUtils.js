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
    },

    /**
     * 获取日志文件列表
     * @param {*} filePath
     */
    async getLogsFileList(logsPath) {
        return new Promise(async(resolve, reject) => {
            try {
                const filePaths = await FileUtils.readdir(logsPath);
                const files = await Promise.all(filePaths.map(async(filePath) => {
                    //获取当前日志文件的文件夹绝对路径
                    const filedir = path.join(logsPath, filePath);
                    const logs = await FileUtils.readdir(filedir);
                    if (logs && logs.length) {
                        for (const file in logs) {
                            const logdir = path.join(filedir, logs[file]);
                            const stat = await FileUtils.getfileStat(logdir);
                            if (stat.isFile) {
                                const subPath = logdir.split('src')[1]; //文件路径
                                const name = logdir.split(path.join(filePath, '/'))[1]; //获取log文件名
                                return { path: subPath, name, size: stat.size };
                            }
                        }
                    } else {
                        return null;
                    }
                }));
                resolve(files);
            } catch (error) {
                reject(new Error({ status: 400, msg: error }));
            }
        });
    },

    /**
     * 读取目录
     * @param {*} path
     */
    async readdir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    console.warn(err);
                    reject(new Error('获取文件列表失败' + err));
                } else {
                    resolve(files);
                }
            });
        });
    },

    /**
     * 获取文件信息
     * @param {*} path
     */
    async getfileStat(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (eror, stats) => {
                if (eror) {
                    reject(new Error('获取文件stats失败' + eror));
                } else {
                    if (stats.isFile()) { //是文件
                        resolve({ isFile: true, path, ...stats });
                    } else if (stats.isDirectory()) {
                        resolve({ isFile: false, path, ...stats });
                    } else {
                        reject(new Error(`未知类型!`));
                    }
                }
            });
        });
    }

};
module.exports = FileUtils;
