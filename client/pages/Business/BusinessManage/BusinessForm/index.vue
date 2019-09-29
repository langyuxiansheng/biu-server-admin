<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" label-width="125px" @submit.native.prevent>
                <el-col :span="12">
                    <el-form-item label="商家名称" prop="company">
                        <el-input v-model="sendData.company" placeholder="请输入商家名称" />
                    </el-form-item>
                    <el-form-item label="法人" prop="director">
                        <el-input v-model="sendData.director" placeholder="请输入法人姓名" />
                    </el-form-item>
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
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model="sendData.phone" placeholder="请输入手机号" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="sendData.address" placeholder="请输入地址" />
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input v-model="sendData.email" placeholder="请输入电子邮箱" />
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="sendData.brief" placeholder="请输入描述" />
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="sendData.sort" placeholder="请输入排序" />
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="sendData.remark" type="textarea" :rows="5" :cols="10" placeholder="请输入备注" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="app-submit-btns">
                        <el-form-item class="app-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">
                                保存
                            </el-button>
                            <el-button @click="resetForm('AppForm')">
                                重新填写
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
import { addBusinessByAdmin, updateBusiness } from '@/http';
export default {
    name: 'BusinessForm',
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
                account: 'shu15689o',
                phone: '18122237766',
                email: 'shu15689o@qq.com',
                address: '四川省成都市锦江区牛市口街道12号附21号',
                pwd: null, //密码 password
                checkPwd: null, //密码 password
                brief: '回复的看帅胡椒粉电饭锅的稿就开始',
                isAuthenticate: false,
                company: '成都风安发打发水务有限公司',
                director: '艾克封',
                logo: null,
                status: 0,
                sort: null,
                remark: null
            },
            rules: {
                company: [
                    { required: true, message: '请输入商家名称', trigger: 'blur' }
                ],
                director: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入请输入地址', trigger: 'blur' }
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
                    let res = null;
                    console.log(this.sendData);

                    if (this.type == 'add') { //添加
                        const { account, pwd, email, phone, address, brief, isAuthenticate, company, director, logo, status, sort, remark } = this.sendData;
                        res = await this.$axios[addBusinessByAdmin.method](addBusinessByAdmin.url,
                            { account, pwd, email, phone, address, brief, isAuthenticate, company, director, logo, status, sort, remark, password: util.getMD5UC(pwd) }
                        );
                    } else { //编辑
                        res = await this.$axios[updateBusiness.method](updateBusiness.url, this.sendData);
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
