<template>
    <card-container>
        <app-tables :table="table" :utils="table.utils" @pageChange="handleCurrentChange">
            <template>
                <el-button slot="add" type="primary" icon="el-icon-circle-plus" plain @click="showDialog({type:'add'})">
                    添加
                </el-button>
                <!-- <el-button type="text" @click="handleDel({type:1})">
                    删除
                </el-button> -->
                <!-- <el-button slot="export" plain @click="excelAllDownload()">
                    导出
                </el-button> -->
            </template>
            <template slot="column" slot-scope="{data}">
                <template v-if="data.col.key === 'operation'">
                    <template v-if="data.row.isAdmin">
                        无权限
                    </template>
                    <template v-else>
                        <el-button-group>
                            <el-button type="primary" @click="showDialog({type:'bindRole',data:data.row})">
                                绑定角色
                            </el-button>
                            <el-button title="编辑" type="warning" icon="el-icon-edit" @click="showDialog({type:'update',data:data.row})" />
                            <el-button title="删除" type="danger" icon="el-icon-delete" @click="handleDel(data.row)" />
                        </el-button-group>
                    </template>
                </template>
                <template v-else-if="data.col.key === 'avatar'">
                    <img v-if="data.row[data.col.key]" v-image-preview class="app-image-previewer" height="50" :src="data.row[data.col.key]" :alt=" data.row.adminName">
                    <span v-else>
                        -
                    </span>
                </template>
                <template v-else-if="data.col.key === 'status'">
                    <el-tag v-if="data.row[data.col.key]" type="success">
                        禁用
                    </el-tag>
                    <el-tag v-else type="warning">
                        正常
                    </el-tag>
                </template>
                <template v-else-if="data.col.key === 'roleName'">
                    {{ data.row.isAdmin ? '超级管理员' : data.row[data.col.key] || '-' }}
                </template>
                <template v-else>
                    {{ data.row[data.col.key] || '-' }}
                </template>
            </template>
        </app-tables>
        <admin-form ref="AdminForm" @refresh="init()" />
        <bind-role-form ref="BindRoleForm" @refresh="init()" />
    </card-container>
</template>
<script>
import { getSysAdminList, delSysAdminByIds } from '@/http';
import AdminForm from './AdminForm';
import BindRoleForm from './BindRoleForm';
export default {
    head: {
        title: '管理员管理'
    },
    components: { AdminForm, BindRoleForm },
    data () {
        return {
            table: {
                queryData: {
                    page: 1, //获取第几页的数据，默认为1
                    limit: 10//每页数据条数，默认为10
                },
                data: [], //表格数据
                total: 0, //总页数
                tableType: 1, //表格类型
                utils: { //表格工具栏
                    left: [{ slot: 'add' }],
                    right: [{ slot: 'search' }],
                    cols: [12, 12]
                },
                cols: [ //表格列配置
                    {
                        key: 'adminName',
                        label: '管理员名称'
                    },
                    {
                        key: 'account',
                        label: '管理员账号'
                    },
                    {
                        key: 'avatar',
                        label: '头像'
                    },
                    {
                        key: 'status',
                        label: '账号状态'
                    },
                    {
                        key: 'roleName',
                        label: '角色'
                    },
                    {
                        key: 'operation',
                        width: '220px',
                        label: '操作'
                    }
                ]
            }
        };
    },
    created() {
        this.init();
        console.log(this.$route);
    },

    methods: {

        async init () {
            try {
                const { data: { total, list } } = await this.$axios[getSysAdminList.method](getSysAdminList.url, this.table.queryData);
                this.table.data = list;
                this.table.total = total;
            } catch (error) {
                console.error(error);
            }
        },

        /**
         * 分页器回调
         */
        handleCurrentChange(page) {
            this.table.queryData.page = page;
            this.init();
        },

        /**
	     * 弹出层控制
	     */
        showDialog ({ type, data }) {
            if (type === 'add') {
                this.$refs.AdminForm.init({ type, title: '新增系统管理员' });
            } else if (type === 'update') {
                this.$refs.AdminForm.init({ type, data, title: '编辑系统管理员' });
            } else if (type === 'bindRole') {
                this.$refs.BindRoleForm.init({ type, data, title: '绑定角色' });
            }
        },

        /**
         * 删除
         */
        handleDel ({ adminId }) {
            this.$confirm(`此操作将会删除此账号,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[delSysAdminByIds.method](delSysAdminByIds.url, {
                    data: { ids: [adminId], isDelete: true }
                });
                if (code == 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            }).catch(() => {});
        }
    }
};
</script>
