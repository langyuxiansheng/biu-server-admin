import util from '@/lib/util';

export default {

    /**
     * 格式化时间 2018-07-02 13:12:12
     * @param {*} value
     */
    formatDateYearMonthDayAndHms(value) {
        return util.formatDateYearMonthDayAndHms(value);
    },

    /**
     * 时长
     * @param {*} value
     */
    formatCountTime(value) {
        if (value) {
            return util.secondToDate(value);
        }
        return '0秒';
    },

    /**
     * 书本状态
     * @param {*} value
     */
    formatBaseBookStatus(value) {
        switch (value) {
        case 1:
            return '已完结';
        case 2:
            return '连载中';
        case 3:
            return '3禁用下架';
        default:
            return '其它';
        }
    },

    /**
     * 格式化文件大小
     * @param {*} value
     */
    formatFileSize(size) {
        let value = Number(size);
        if (size && !isNaN(value)) {
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
            let index = 0;
            let k = value;
            if (value >= 1024) {
                while (k > 1024) {
                    k = k / 1024;
                    index++;
                }
            }
            return `${(k).toFixed(2)}${units[index]}`;
        }
        return '-';
    }

};
