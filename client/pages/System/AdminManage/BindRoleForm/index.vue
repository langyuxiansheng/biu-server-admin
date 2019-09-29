<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="选择角色" prop="roleId">
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
import { getSysRoleList, bindSysAdminRole } from '@/http';
export default {
    name: 'BindRoleForm',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },
            sendData: {},
            initData: {
                adminId: null, //管理员id
                roleId: null, //角色id
                roleName: null //角色名
            },
            rules: {
                roleId: [
                    { required: true, message: '请选择一个角色', trigger: 'change' }
                ]
            },
            roles: []
        };
    },
    methods: {

        /**
		 * 初始化
		 */
        async init ({ title, data }) {
            this.dialogConf.isShow = true;
            if (title) this.dialogConf.title = title;
            try {
                const { data: { list } } = await this.$axios[getSysRoleList.method](getSysRoleList.url);
                this.roles = list || [];
            } catch (error) {
                console.log(error);
            }
            const { adminId, roleName, roleId } = data;
            this.sendData = util.deepCloneObject({ ...this.initData, adminId, roleName, roleId });
        },

        /**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = null;
                    try {
                        res = await this.$axios[bindSysAdminRole.method](bindSysAdminRole.url, this.sendData);
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
