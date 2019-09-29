/***
 * Created by Simple on 2019年3月25日14:32:25
 * mergedApis模块
 */
import mergedApis from './models';
export default (() => {
    return Object
        .keys(mergedApis)
        .reduce((acc, apiKey) => {
            return {
                ...acc,
                [apiKey]: mergedApis[apiKey]
            };
        }, {});
})();
