/**
 * Created by Administrator on 2019年4月3日22:51:28
 * 公共插件功能配置文件
 */
const pkg = require('../../package.json');
export default {
    name:"BiuServerAdmin",  //系统名称
    version: `V ${pkg.version}`,   //版本号
    devUrl: 'http://192.168.0.59:8000',
    productionUrl: 'http://192.168.0.59:8000',
    // devUrl: 'https://api.pandaparking.cn',
    // productionUrl: 'https://api.pandaparking.cn',
    table: {
        pagination: {
            size: 10, //默认大小
            layout: 'total,prev, pager, next, jumper', //配置
            sizes: [5, 10, 15, 20] //每页x条
        }
    },
    baseImageURL: "/images/ebook/", //基础图片路径
    size: 'small',
    tableSize: 'mini',
    defaultTime: ['00:00:00', '23:59:59'],
    baiDuMapKey: '3GGKnVpSku9u2S17oalzlU6LmYHZoGLy', //百度地图秘钥
    aMapKey: '58d947beaa66523514fdeffe22dd3c59', //高德地图秘钥
    labelPosition: 'top', //表单对齐方式
    dialogFormWidth: '850px', //表单弹出层宽度
    dialogSingleFormWidth: '500px', //单列表单弹出层宽度
    dialogPrompt: '500px', //弹出输入框
    dialogFormGutterWidth: 82, //表单列间隔
    dialogDetailWidth: '1000px', //详情弹出层宽度
    dialogMapWidth: '1200px', //地图弹出层宽度
    qiNiuURL: 'http://up-z2.qiniu.com', //七牛上传路径
    // qrUrl: 'http://b.bshare.cn/barCode?site=weixin&url=', //二维码链接
    qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=', //二维码链接
    defaultAvatarUrl: "this.src='../../../static/img/default-avatar.png'", //默认头像
    collectorUrl: 'http://collector.pandaparking.cn', //岗亭端链接
    datePrickValueFormat: 'timestamp', //日期选择器的绑定值格式
    monthPrickValueFormat: 'yyyy-MM', //月选择器的绑定值格式
    yearPrickValueFormat: 'yyyy', //年选择器的绑定值格式
    dayPrickValueFormat: 'yyyy-MM-dd', //日选择器的绑定值格式

    //日期选择器配置
    pickerOptions: {
        shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            },
            {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            },
            {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }
        ]
    },
    //月天数
    monthDays() {
        let arr = [];
        for (let i = 1; i < 32; i++) {
            arr.push(i + '日');
        }
        return arr;
    },

    //年月份数
    yearMonths() {
        let arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i + '月');
        }
        return arr;
    },

    //小时数
    hours() {
        let arr = [];
        for (let i = 0; i < 24; i++) {
            i < 10 ? arr.push('0' + i + ':00') : arr.push(i + ':00');
        }
        return arr;
    }
};
