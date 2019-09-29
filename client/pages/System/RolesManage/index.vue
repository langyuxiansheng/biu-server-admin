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
                    <el-button type="text" @click="$router.push(`/System/RolesManage/Settings/${data.row.roleId}`)">
                        权限设置
                    </el-button>
                    <el-button type="text" @click="showDialog({type:'update',data:data.row})">
                        编辑
                    </el-button>
                    <el-button type="text" @click="handleDel(data.row)">
                        删除
                    </el-button>
                </template>
                <template v-else-if="data.col.key === 'avatar'">
                    <img v-if="data.row[data.col.key]" v-image-preview class="app-image-previewer" height="50" :src="data.row[data.col.key]" :alt=" data.row.adminName">
                    <span v-else>
                        -
                    </span>
                </template>
                <template v-else-if="data.col.key === 'status'">
                    {{ data.row[data.col.key] ? '禁用' : '正常' }}
                </template>
                <template v-else-if="data.col.key === 'roleName'">
                    {{ data.row.isAdmin ? '超级管理员' :data.row[data.col.key] || '-' }}
                </template>
                <template v-else>
                    {{ data.row[data.col.key] || '-' }}
                </template>
            </template>
        </app-tables>
        <role-form ref="RoleForm" @refresh="init()" />
    </card-container>
</template>
<script>
import { getSysRoleList, delSysAdminByIds } from '@/http';
import RoleForm from './RoleForm';
export default {
    name: 'RolesMange',
    layout: 'layout',
    components: { RoleForm },
    data () {
        return {
            table: {
                queryData: {
                    keyword: null,
                    page: 1, //获取第几页的数据，默认为1
                    limit: 10//每页数据条数，默认为10
                },
                data: [], //表格数据
                total: 0, //总页数
                tableType: 1, //表格类型
                utils: { //表格工具栏
                    left: [{ label: '', slot: 'add' }],
                    right: [{ label: '', slot: 'search' }],
                    cols: [12, 12]
                },
                cols: [ //表格列配置
                    {
                        key: 'roleName',
                        label: '角色'
                    },
                    {
                        key: 'operation',
                        width: '160px',
                        label: '操作'
                    }
                ]
            }
        };
    },
    created() {
        this.init();
    },

    methods: {

        async init () {
            try {
                const { data: { total, list } } = await this.$axios[getSysRoleList.method](getSysRoleList.url, this.table.queryData);
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
                this.$refs.RoleForm.init({ type, title: '新增角色' });
            } else if (type === 'update') {
                this.$refs.RoleForm.init({ type, data, title: '编辑角色' });
            }
        },

        /**
         * 删除
         */
        handleDel ({ roleId }) {
            this.$confirm(`此操作将会删除此角色,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[delSysAdminByIds.method](delSysAdminByIds.url, { data: { ids: [roleId], isDelete: true } });
                if (code == 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            }).catch(() => {});
        }
    }
};
</script>
