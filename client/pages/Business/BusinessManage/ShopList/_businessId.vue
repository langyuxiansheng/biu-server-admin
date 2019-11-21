<template>
    <card-container>
        <app-tables :table="table" :utils="table.utils" @pageChange="handleCurrentChange">
            <template>
                <el-input slot="search" v-model="table.queryData.keyword" placeholder="请输入关键字" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="init()">
                        搜索
                    </el-button>
                </el-input>
            </template>
            <template slot="column" slot-scope="{data}">
                <template v-if="data.col.key === 'operation'">
                    <el-button type="text" @click="handleStatus(data.row)">
                        {{ data.row.status ? '启用' : '禁用' }}
                    </el-button>
                </template>
                <template v-else-if="data.col.key === 'createdTime'">
                    {{ data.row[data.col.key] | formatDateYearMonthDayAndHms }}
                </template>
                <template v-else-if="data.col.key === 'logo'">
                    <img v-if="data.row[data.col.key]" v-image-preview class="app-image-previewer" height="50" :src="data.row[data.col.key]" :alt="data.row.company">
                    <span v-else>
                        -
                    </span>
                </template>
                <template v-else-if="data.col.key === 'isAuthenticate'">
                    {{ data.row[data.col.key] ? '已认证' : '未认证' }}
                </template>
                <template v-else-if="data.col.key === 'status'">
                    <el-tag v-if="data.row[data.col.key]" type="danger">
                        禁用
                    </el-tag>
                    <el-tag v-else type="success">
                        正常
                    </el-tag>
                </template>
                <template v-else>
                    {{ data.row[data.col.key] || '-' }}
                </template>
            </template>
        </app-tables>
    </card-container>
</template>
<script>
import { getBusinessShopListByAdmin } from '@/http';
export default {
    name: 'ShopList',
    data () {
        const { businessId } = this.$route.params;
        return {
            table: {
                queryData: {
                    businessId,
                    keyword: null,
                    page: 1, //获取第几页的数据，默认为1
                    limit: 10//每页数据条数，默认为10
                },
                data: [], //表格数据
                total: 0, //总页数
                tableType: 1, //表格类型
                utils: { //表格工具栏
                    left: [{ slot: 'add' }, { slot: 'search' }],
                    cols: [24]
                },
                cols: [ //表格列配置
                    {
                        key: 'createdTime',
                        label: '创建时间'
                    },
                    {
                        key: 'shopName',
                        label: '店铺名称'
                    },
                    {
                        key: 'account',
                        label: '账号'
                    },
                    {
                        key: 'phone',
                        label: '手机'
                    },
                    {
                        key: 'email',
                        label: '电子邮箱'
                    },
                    {
                        key: 'shopDirector',
                        label: '负责人'
                    },
                    {
                        key: 'address',
                        label: '地址'
                    },
                    {
                        key: 'isAuthenticate',
                        label: '是否认证'
                    },
                    {
                        key: 'status',
                        label: '状态'
                    },
                    {
                        key: 'brief',
                        label: '简介'
                    },
                    {
                        key: 'logo',
                        label: 'LOGO'
                    },
                    {
                        key: 'remark',
                        label: '备注'
                    },
                    {
                        key: 'operation',
                        width: '120px',
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
                const { data: { total, list } } = await this.$axios[getBusinessShopListByAdmin.method](getBusinessShopListByAdmin.url, {
                    params: this.table.queryData
                });
                this.table.data = list;
                this.table.total = total;
            } catch (error) {
                console.log(error);
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
         * 删除
         */
        handleDel ({ businessId }) {
            this.$confirm(`此操作将会删除此账号,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                // const { code } = await this.$axios[delBusinessByIds.method](delBusinessByIds.url, { data: { ids: [businessId], isDelete: true } });
                // if (code == 200) {
                //     this.$message.success(this.$t('msg.deleted_success'));
                //     this.init();
                // }
            }).catch(() => {});
        },

        /**
         * 商家状态
         */
        handleStatus({ businessId, status }) {
            this.$confirm(`此操作将会${status ? `启用` : `禁用`}此账号,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                // const { code } = await this.$axios[updateBusiness.method](updateBusiness.url, { businessId, status: status ? 0 : 1 });
                // if (code == 200) {
                //     this.$message.success(this.$t('msg.operation_success'));
                //     this.init();
                // }
            }).catch(() => {});
        }
    }
};
</script>
