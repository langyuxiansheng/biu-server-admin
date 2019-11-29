<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" label-width="125px" @submit.native.prevent>
                <el-col :span="12">
                    <el-form-item label="登录账号" prop="account">
                        <el-input v-model="sendData.account" placeholder="请输入登录账号" />
                    </el-form-item>
                    <template v-if="type === 'add'">
                        <el-form-item label="登录密码" prop="pwd">
                            <el-input v-model="sendData.pwd" type="password" placeholder="请输入登录密码" />
                        </el-form-item>
                        <el-form-item label="重复密码" prop="checkPwd">
                            <el-input v-model="sendData.checkPwd" type="password" placeholder="请输入重复密码" />
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名" prop="adminName">
                        <el-input v-model="sendData.adminName" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="用户头像" prop="avatar">
                        <el-input v-model="sendData.avatar" placeholder="请输入用户头像链接" />
                    </el-form-item>
                    <el-form-item label="选择角色">
                        <el-select v-model="sendData.roleId" class="select-block" placeholder="请选择一个角色" @change="handleRoleChange">
                            <el-option
                                v-for="item in roles"
                                :key="item.adminId"
                                :label="item.roleName"
                                :value="item.roleId"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="app-submit-btns">
                        <el-form-item class="app-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">
                                保存
                            </el-button>
                            <el-button @click="resetForm('AppForm')">
                                重置
                            </el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </dialog-container>
</template>
<script type="text/ecmascript-6">
import util from '@/lib/util';
import { addSysAdmin, updateSysAdmin, getSysRoleList } from '@/http';
export default {
    name: 'AdminForm',
    data () {
        //密码
        const validatePass = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请输入密码'));
            } else {
                if (this.sendData.checkPwd !== null) {
                    this.$refs.AppForm.validateField('checkPwd');
                }
                callback();
            }
        };

        //确认密码
        const validateCheckPass = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.sendData.pwd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        const { dialogFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogFormWidth,
                isShow: false,
                center: true,
                title: null
            },
            sendData: {},
            initData: {
                account: null, //用户登录账户
                pwd: null, //密码 password
                checkPwd: null, //密码 password
                adminName: null, //用户名
                avatar: null, //头像
                roleId: null, //角色id
                roleName: null //角色名
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' },
                    { validator: validateCheckPass, trigger: 'blur' }
                ],
                adminName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            type: 'add',
            roles: []
        };
    },
    methods: {

        /**
		 * 初始化
		 */
        async init ({ type, title, data }) {
            this.dialogConf.isShow = true;
            this.type = type;
            if (title) this.dialogConf.title = title;
            try {
                const { data: { list } } = await this.$axios[getSysRoleList.method](getSysRoleList.url);
                this.roles = list || [];
            } catch (error) {
                console.log(error);
            }
            if (type === 'add') {
                this.sendData = util.deepCloneObject(this.initData);
            } else if (type === 'update') {
                this.sendData = util.deepCloneObject(data);
            }
        },

        /**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { account, pwd, adminName, avatar, roleId, roleName } = this.sendData;
                    const send = { account, adminName, avatar, roleId, roleName, password: util.getMD5UC(pwd) };
                    let res = null;
                    try {
                        if (this.type == 'add') { //添加
                            res = await this.$axios[addSysAdmin.method](addSysAdmin.url, send);
                        } else { //编辑
                            res = await this.$axios[updateSysAdmin.method](updateSysAdmin.url, this.sendData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    if (res && res.code == 200) {
                        this.dialogConf.isShow = false;
                        this.$message.success(this.$t('msg.operation_success'));
                        this.resetForm(formName);
                        this.$emit('refresh');
                    };
                } else {
                    this.$message.error('请填写完表单');
                }
            });
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },

        /**
         * 角色选择
         */
        handleRoleChange(roleId) {
            this.roles.forEach(item => {
                if (roleId === item.roleId) {
                    this.sendData.roleName = item.roleName;
                }
            });
        }
    }
};
</script>
