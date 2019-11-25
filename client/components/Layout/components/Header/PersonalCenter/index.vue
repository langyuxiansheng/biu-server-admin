<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row v-if="isUpdate" class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="请输入旧密码" prop="pwd">
                        <el-input v-model="sendData.pwd" type="password" placeholder="请输入旧密码" />
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="newPwd">
                        <el-input v-model="sendData.newPwd" type="password" placeholder="请输入新密码" />
                    </el-form-item>
                    <el-form-item label="请确认新密码" prop="checkPwd">
                        <el-input v-model="sendData.checkPwd" type="password" placeholder="请确认新密码" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="plat-submit-box">
                        <el-form-item class="rh-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">
                                确认修改
                            </el-button>
                            <el-button @click="isUpdate = false">
                                取消修改
                            </el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
        <el-row v-else class="app-detail" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-col :span="24">
                <div class="app-row">
                    <span class="app-title">
                        头像
                    </span>
                    <el-upload
                        title="点击更换头像"
                        class="upload-avatar"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-avatar class="avatar" fit="cover" src="\uploads\20191104\BIUXS_WEB_69B09D4F1CE6816CEE4E0C5015B9996C.jpg" />
                    </el-upload>
                </div>
                <div class="app-row">
                    <span class="app-title">
                        账号
                    </span>
                    <span class="app-label">
                        {{ user.account }}
                    </span>
                </div>
                <div class="app-row">
                    <span class="app-title">
                        姓名
                    </span>
                    <span class="app-label">
                        {{ user.adminName }}
                    </span>
                </div>
                <div class="app-row">
                    <span class="app-title">
                        联系方式
                    </span>
                    <span class="app-label">
                        {{ user.phone || '暂无' }}
                    </span>
                </div>
                <div class="app-row">
                    <span class="app-title">
                        角色
                    </span>
                    <span class="app-label">
                        {{ user.roleName }}
                    </span>
                </div>
                <div class="app-row">
                    <el-button class="update-pwd" type="primary" @click="isUpdate = true">
                        修改密码
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </dialog-container>
</template>
<script  type="text/ecmascript-6">
import util from '@/lib/util';
import { updateSysPassword } from '@/http';
export default {
    name: 'PersonalCenter',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        let newPassword = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入密码'));
            } else {
                if (this.sendData.checkPwd !== null) {
                    this.$refs.AppForm.validateField('checkPwd');
                }
                callback();
            }
        };

        let checkNewPasswordVal = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.sendData.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isUpdate: false,

            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },

            //数据
            sendData: {
                pwd: null,
                newPwd: null,
                checkPwd: null
            },

            //验证规则
            rules: {
                pwd: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' },
                    { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, validator: newPassword, trigger: 'blur' },
                    { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, validator: checkNewPasswordVal, trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        user() {
            const { userInfo } = this.$store.getters;
            return userInfo || {};
        }
    },

    methods: {
        /**
         * 初始化
         */
        init ({ title }) {
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
        },

        /**
         * 提交表单
         */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { pwd, newPwd } = this.sendData;
                    const { code } = await this.$axios[updateSysPassword.method](updateSysPassword.url, { password: util.getMD5UC(pwd), newPassword: util.getMD5UC(newPwd) });
                    if (code === 200) {
                        this.$message.error(`您已修改密码,请使用新密码登录系统!`);
                        this.dialogConf.isShow = false;
                        this.$emit('refresh');
                    };
                } else {
                    this.$message.error(this.$t('msg.please_fill_out_the_form'));
                }
            });
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="less" scoped>
    .app-detail{
        font-size: 16px;
        .app-row{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .app-title{
                min-width: 64px;
                font-weight: bold;
                text-align: justify;
                text-align-last: justify;
            }
            .app-label{
                margin-left: 20px;
            }
            .avatar{
                vertical-align: middle;
            }
        }
    }
    .upload-avatar{
        margin-left: 20px;
    }
</style>
