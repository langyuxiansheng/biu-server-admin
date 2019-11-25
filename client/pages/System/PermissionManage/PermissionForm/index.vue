<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :model="sendData" :label-position="$store.state.config.labelPosition" :rules="rules" label-width="125px" @submit.native.prevent>
                <el-col :span="12">
                    <el-form-item label="权限名" prop="title">
                        <el-input v-model="sendData.title" placeholder="请输入权限名" />
                    </el-form-item>
                    <el-form-item label="权限类型" prop="parentId">
                        <el-radio-group v-model="sendData.type">
                            <el-radio label="1">
                                菜单权限
                            </el-radio>
                            <el-radio label="2">
                                按钮权限
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父级菜单" prop="parentId">
                        <el-select v-model="sendData.parentId" class="select-block" placeholder="请选择父级菜单(默认为顶层菜单)" @change="handleNameChange(sendData.component)">
                            <el-option
                                label="顶级菜单"
                                value="0"
                            />
                            <el-option
                                v-for="item in menus"
                                :key="item.permissionId"
                                :label="item.title"
                                :value="item.permissionId"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单值" prop="name">
                        <el-input v-model="sendData.name" placeholder="请输入菜单值(组件name)" />
                    </el-form-item>
                    <template v-if="sendData.type == 1">
                        <el-form-item label="组件" prop="component">
                            <el-input v-model="sendData.component" placeholder="请输入组件值" @change="handleNameChange(sendData.component)" />
                        </el-form-item>
                        <el-form-item label="菜单路径" prop="path">
                            <el-input v-model="sendData.path" placeholder="请输入菜单路径" />
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="12">
                    <template v-if="sendData.type == 1">
                        <el-form-item label="菜单图标">
                            <el-input v-model="sendData.icon" placeholder="请输入菜单图标" />
                        </el-form-item>
                    </template>
                    <el-form-item label="排序">
                        <el-input v-model="sendData.sort" placeholder="请输入序号" />
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="sendData.remark" type="textarea" rows="10" cols="10" placeholder="请输入备注" />
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
import { getSysPermissionList, addSysPermission, updateSysPermission } from '@/http';
export default {
    name: 'PermissionForm',
    data () {
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
                title: null, //菜单名
                type: '1', //权限类型
                path: null, //菜单名路径
                name: null, //菜单name
                component: null, //组件
                parentId: '0', //父级id
                icon: null, //图标
                sort: null, //排序
                remark: null //备注
            },
            rules: {
                title: [
                    { required: true, message: '请输入权限名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '请选择父级菜单', trigger: 'change' }
                ],
                component: [
                    { required: true, message: '请输入组件', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                path: [
                    { required: true, message: '请输入菜单路径', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入菜单name', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ]
            },
            type: 'add',
            menus: []
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
                const { data: { list } } = await this.$axios[getSysPermissionList.method](getSysPermissionList.url);
                this.menus = list || [];
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
                    let res = null;
                    try {
                        if (this.type == 'add') { //添加
                            res = await this.$axios[addSysPermission.method](addSysPermission.url, this.sendData);
                        } else { //编辑
                            res = await this.$axios[updateSysPermission.method](updateSysPermission.url, this.sendData);
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
         * 菜单组件名回调
         */
        handleNameChange(component) {
            const { parentId } = this.sendData;
            this.sendData.name = component;
            this.sendData.path = parentId != 0 ? component : `/${component}`;
        }
    }
};
</script>
