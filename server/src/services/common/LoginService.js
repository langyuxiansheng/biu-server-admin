/**
 * 用户登录
 */
const result = require(':lib/Result');
const { MODELS_PATH, getLC, signJWT, deepCloneObject } = require(':lib/Utils');
const { systemLogger } = require(':lib/logger4');
const { BiuDB } = require(':lib/sequelize');
const AdminBaseModel = BiuDB.import(`${MODELS_PATH}/system/AdminBaseModel`);
module.exports = class {
    /**
     * 管理员登录
     * @param data 登录数据
     * @param cookies cookie
     */
    async userLoginForSysAdmin({ data, cookies }) {
        const cookieCode = cookies.get('IMG-VALIDATE-DATA');
        if (!cookieCode) return result.failed(`验证码已过期!`);
        const { account, password, code } = data;
        if (!account || !password || !code) return result.paramsLack();
        if (getLC(code) !== getLC(cookieCode)) return result.failed(`验证码错误!`);
        let queryData = {
            where: { account, isDelete: false },
            attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime'] }
        };
        try {
            const user = await AdminBaseModel.findOne(queryData);
            if (!user) return result.failed('用户不存在!');
            if (password !== user.password) return result.failed('账号或密码输入错误!'); //对比密码
            if (!user.roleId) return result.failed('账号异常请联系管理员,异常信息:"未设置用户的角色!"');
            const info = deepCloneObject(user);//克隆一个对象
            info['userId'] = user.adminId; //设置通用id名
            info['userName'] = user.adminName; //设置通用用户名
            const jwt = signJWT({
                userId: user.adminId,
                isAdmin: user.isAdmin,
                roleId: user.roleId
            }, '2h'); //验证通过签发jwt,2小时有效!
            return result.success(null, { jwt, user: info });
        } catch (error) {
            systemLogger.error(`管理员登录`, `LoginService.userLoginForSysAdmin`, error);
            return result.failed();
        }
    }
};
