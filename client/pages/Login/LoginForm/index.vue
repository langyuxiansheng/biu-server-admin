<template>
    <div class="login-form" @keyup.enter="submitForm('Form')">
        <h1 class="title">
            基于Node-Koa2的RestfulAPI服务器
        </h1>
        <div class="login-form-body">
            <el-row>
                <el-col :span="24">
                    <el-form ref="Form" size="medium" :model="sendData" status-icon :rules="rules" class="right-form" @submit.native.prevent>
                        <el-form-item class="user-label" label="" prop="account">
                            <div class="user-input">
                                <el-input v-model="sendData.account" type="text" placeholder="请输入管理员账号" auto-complete="off" />
                            </div>
                        </el-form-item>
                        <el-form-item class="user-label" label="" prop="pwd">
                            <div class="user-input">
                                <el-input v-model="sendData.pwd" type="password" placeholder="请输入管理员密码" auto-complete="off" />
                            </div>
                        </el-form-item>
                        <el-form-item class="user-label" label="" prop="code">
                            <div class="user-input">
                                <el-input v-model="sendData.code" type="password" placeholder="请输入验证码" auto-complete="off">
                                    <template slot="append">
                                        <span title="看不清?点击换一张" class="validate-img" @click="init" v-html="imgUrl" />
                                    </template>
                                </el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="btn-label">
                            <el-button type="primary" class="login-btn" :loading="loading" @click="submitForm('Form')">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import util from '@/lib/util';
import { userLoginForSysAdmin, getImgValidate } from '@/http';
export default {
    name: 'LoginForm',
    data () {
        // 用户账户
        let validateAccount = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入管理员账号'));
            } else {
                callback();
            }
        };
        // 用户密码
        let validatePass = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入管理员密码'));
            } else {
                callback();
            }
        };

        return {
            imgUrl: null,
            loading: false,
            sendData: {
                account: null,
                pwd: null,
                code: null,
                password: null
            },

            rules: {
                account: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { validator: validateAccount, message: '请输入管理员账号', trigger: 'blur' }
                ],

                pwd: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur' },
                    { validator: validatePass, message: '请输入管理员密码', trigger: 'blur' }
                ],

                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
                ]
            }
        };
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            try {
                const { data } = await this.$axios[getImgValidate.method](getImgValidate.url);
                this.imgUrl = data && data.img;
            } catch (error) {
                console.log(error);
            }
        },
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        const { account, code, pwd } = this.sendData;
                        const { data: { jwt, user } } = await this.$axios[userLoginForSysAdmin.method](userLoginForSysAdmin.url, { password: util.getMD5UC(pwd), code, account });
                        if (jwt) util.setCookie('BIU-SERVER-ADMIN-JWT', `Bearer ${jwt}`);
                        if (user) {
                            if (window && window.localStorage) {
                                window.localStorage.setItem('BIU-SERVER-ADMIN-INFO', JSON.stringify(user));
                            } else {
                                alert('你的浏览器不支持localStorage!');
                            }
                        }
                        //插入动画loading动画
                        // document.getElementById('__nuxt').insertAdjacentHTML('afterend', `<div class="lds-css ng-scope">
                        //         <div class="lds-double-ring">
                        //             <div></div>
                        //             <div></div>
                        //             <div class="loading-text">加载中,请稍后...</div>
                        //         </div>
                        //     </div>`);
                        // 进入欢迎页
                        const redirect = this.$route.query.redirect;
                        if (redirect != undefined) {
                            this.$router.push(redirect);
                        } else {
                            this.$router.push(`/Home/Welcome`);
                        }
                    } catch (error) {
                        console.error(error);
                        this.sendData.code = null;
                        this.init();
                    }
                } else {
                    this.$message.error('请输入正确的填写表单!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="less">
.login-form {
    padding: 10px 0;
    width: 500px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    color: #fff;
    .title {
        padding: 20px 10px;
        font-size: 24px;
        border-bottom: 1px solid #eaf0ff;
        text-align: center;
    }
    .login-form-body {
        padding: 68px 0;
        .right-form {
            width: 360px;
            margin: 0 auto;
            .user-label {
                margin-bottom: 28px;
                .validate-img{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }
            .btn-label {
                margin-top: 34px;
                .login-btn {
                    display: block;
                    width: 100%;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
