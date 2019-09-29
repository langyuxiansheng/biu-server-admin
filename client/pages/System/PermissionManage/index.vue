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
            <template slot="appTable">
                <app-tree-table :data="table.data" :cols="table.cols" border expand-all>
                    <template slot="operation" slot-scope="{data}">
                        <template v-if="data.col.key === 'operation'">
                            <el-button type="text" @click="showDialog({type:'update',data:data.row})">
                                编辑
                            </el-button>
                            <el-button type="text" @click="handleDel(data.row)">
                                删除
                            </el-button>
                        </template>
                    </template>
                </app-tree-table>
            </template>
        </app-tables>
        <permission-form ref="PermissionForm" @refresh="init()" />
    </card-container>
</template>
<script>
import util from '@/lib/util';
import { getSysPermissionList, delSysPermissionByIds } from '@/http';
import PermissionForm from './PermissionForm';
export default {
    name: 'PermissionMange',
    layout: 'layout',
    components: { PermissionForm },
    data () {
        return {
            table: {
                queryData: {
                    page: 1, //获取第几页的数据，默认为1
                    limit: 10//每页数据条数，默认为10
                },
                data: [], //表格数据
                total: 0, //总页数
                tableType: 3, //表格类型
                utils: { //表格工具栏
                    left: [{ label: '', slot: 'add' }],
                    right: [{ label: '', slot: 'search' }],
                    cols: [12, 12]
                },
                cols: [ //表格列配置
                    {
                        key: 'title',
                        label: '菜单名称',
                        align: 'left'
                    },
                    {
                        key: 'name',
                        label: '组件名'
                    },
                    {
                        key: 'path',
                        label: '路径'
                    },
                    {
                        key: 'component',
                        label: '组件'
                    },
                    {
                        key: 'icon',
                        label: '图标'
                    },
                    {
                        key: 'remark',
                        label: '备注'
                    },
                    {
                        key: 'sort',
                        label: '排序'
                    },
                    {
                        key: 'operation',
                        width: '100px',
                        label: '操作',
                        operation: true
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
                const { data: { total, list } } = await this.$axios[getSysPermissionList.method](getSysPermissionList.url, this.table.queryData);
                this.table.data = util.listToTree(list, 'parentId', 'permissionId', 0);
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
                this.$refs.PermissionForm.init({ type, title: '新增系统权限菜单' });
            } else if (type === 'update') {
                if (data.hasOwnProperty('children')) delete data['children'];
                if (data.hasOwnProperty('parent')) delete data['parent'];
                this.$refs.PermissionForm.init({ type, data, title: '编辑系统权限菜单' });
            }
        },

        /**
         * 删除
         */
        handleDel ({ permissionId }) {
            this.$confirm(`此操作将会删除此菜单,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[delSysPermissionByIds.method](delSysPermissionByIds.url, {
                    data: { ids: [permissionId], isDelete: true }
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
