<template>
    <card-container>
        <app-tables :table="table" :utils="table.utils" @pageChange="handleCurrentChange">
            <template>
                <el-button slot="add" type="primary" icon="el-icon-circle-plus" plain @click="showDialog({type:'add'})">
                    上传文件
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
                    <!-- <el-button type="text" @click="showDialog({type:'update',data:data.row})">
                        编辑
                    </el-button> -->
                    <el-button type="text" @click="handleDel(data.row)">
                        删除
                    </el-button>
                </template>
                <template v-else-if="data.col.key === 'size'">
                    {{ data.row[data.col.key] | formatFileSize }}
                </template>
                <template v-else-if="data.col.key === 'view'">
                    <template v-if="['image/jpeg','image/png'].includes(data.row.type)">
                        <img v-image-preview class="app-image-previewer" height="50" :src="data.row.path" :alt="data.row.fileName">
                    </template>
                    <template v-else>
                        暂不支持预览
                    </template>
                </template>
                <template v-else-if="data.col.key === 'status'">
                    {{ data.row[data.col.key] ? '禁用' : '正常' }}
                </template>
                <template v-else>
                    {{ data.row[data.col.key] || '-' }}
                </template>
            </template>
        </app-tables>
        <file-form ref="FileForm" @refresh="init()" />
    </card-container>
</template>
<script>
import { getFiles, deleteFiles } from '@/http';
import FileForm from './FileForm';
export default {
    head: {
        title: '文件管理'
    },
    components: { FileForm },
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
                        key: 'userName',
                        label: '上传用户'
                    },
                    {
                        key: 'fileName',
                        label: '文件名'
                    },
                    {
                        key: 'suffix',
                        label: '后缀名'
                    },
                    {
                        key: 'size',
                        label: '大小'
                    },
                    {
                        key: 'type',
                        label: '类型'
                    },
                    {
                        key: 'view',
                        label: '预览'
                    },
                    {
                        key: 'status',
                        label: '状态'
                    },
                    {
                        key: 'path',
                        label: '路径'
                    },
                    {
                        key: 'aliasName',
                        label: '别名'
                    },
                    {
                        key: 'remark',
                        label: '备注'
                    },
                    {
                        key: 'operation',
                        width: '180px',
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
                const { data: { total, list } } = await this.$axios[getFiles.method](getFiles.url, this.table.queryData);
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
        handleDel ({ fileId }) {
            this.$confirm(`此操作将会删除此文件,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[deleteFiles.method](deleteFiles.url, {
                    data: { ids: [fileId], isDelete: true }
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
