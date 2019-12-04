<template>
    <card-container>
        <app-tables :table="table" :utils="table.utils" @pageChange="handleCurrentChange" @selectionChange="handleSelectionChange">
            <template>
                <el-button
                    v-if="$store.state.permission.includes('delete')"
                    slot="delete"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    :disabled="!deleteData.paths.length"
                    @click="handleDel(deleteData)"
                >
                    批量删除
                </el-button>
            </template>
            <template slot="column" slot-scope="{data}">
                <template v-if="data.col.key === 'operation'">
                    <el-button-group>
                        <read-log-dialog :path="data.row.path" />
                        <el-button v-if="$store.state.permission.includes('delete')" title="删除" type="danger" icon="el-icon-delete" @click="handleDel(data.row)" />
                    </el-button-group>
                </template>
                <template v-else-if="data.col.key === 'size'">
                    {{ data.row[data.col.key] | formatFileSize }}
                </template>
                <template v-else>
                    {{ data.row[data.col.key] || '-' }}
                </template>
            </template>
        </app-tables>
    </card-container>
</template>
<script>
import { getSysLogList, deleteFiles } from '@/http';
import ReadLogDialog from './ReadLogDialog';
export default {
    head: {
        title: '系统日志'
    },
    name: 'LogsManage',
    components: { ReadLogDialog },
    data () {
        return {
            table: {
                queryData: {
                    keyword: null,
                    isDelete: null, //筛选被删除的文件
                    page: 1, //获取第几页的数据，默认为1
                    limit: 10//每页数据条数，默认为10
                },
                data: [], //表格数据
                total: 0, //总页数
                tableType: 1, //表格类型
                utils: { //表格工具栏
                    left: [{ slot: 'delete' }],
                    right: [{ slot: 'search' }],
                    cols: [12, 12]
                },
                cols: [ //表格列配置
                    {
                        key: 'name',
                        label: '日志名称',
                        align: 'left'
                    },
                    {
                        key: 'path',
                        label: '日志路径',
                        align: 'left'
                    },
                    {
                        key: 'size',
                        label: '大小',
                        width: '100px'
                    },
                    {
                        key: 'view',
                        label: '预览',
                        overflow: true,
                        width: '100px'
                    },
                    {
                        key: 'operation',
                        width: '180px',
                        label: '操作'
                    }
                ]
            },
            deleteData: {
                paths: []
            }
        };
    },
    created() {
        this.init();
        console.log(this.$store.state.permission);
    },

    methods: {

        async init () {
            try {
                const { data: { total, list } } = await this.$axios[getSysLogList.method](getSysLogList.url, { params: this.table.queryData });
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
                this.$refs.FileForm.init({ type, title: '上传文件' });
            } else if (type === 'update') {
                this.$refs.FileForm.init({ type, data, title: '编辑文件' });
            }
        },

        /**
         * 删除
         */
        handleDel ({ path, paths }) {
            this.$confirm(`此操作将会删除此日志文件,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[deleteFiles.method](deleteFiles.url, {
                    data: { paths: paths || [path], isDelete: true }
                });
                if (code == 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            }).catch(() => {});
        },

        /**
         * 批量删除
         */
        handleSelectionChange(list) {
            this.deleteData.paths = list.map(item => item.path);
        }
    }
};
</script>
