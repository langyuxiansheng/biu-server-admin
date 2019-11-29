<template>
    <div class="app-table">
        <!-- 顶部状态栏 -->
        <slot name="topBar" />
        <!-- 表格工具栏 -->
        <div v-if="utils" class="app-table-utils">
            <el-row :gutter="0">
                <el-form class="app-util-form" :inline="true" @submit.native.prevent>
                    <template v-if="utils.cols && utils.cols[0]">
                        <el-col :span="utils.cols[0]" class="flex-container">
                            <el-form-item v-for="(item,index) in utils.left" :key="index" :label="item.label">
                                <slot :name="item.slot" />
                            </el-form-item>
                        </el-col>
                    </template>
                    <template v-if="utils.cols && utils.cols[1]">
                        <el-col :span="utils.cols[1]" class="flex-container app-text-right">
                            <el-form-item v-for="(item,index) in utils.right" :key="index" :label="item.label">
                                <slot :name="item.slot" />
                            </el-form-item>
                        </el-col>
                    </template>
                </el-form>
            </el-row>
        </div>
        <!-- 表格状态栏 -->
        <slot name="tableBar" />
        <!-- 普通表格 -->
        <el-table
            v-if="table.tableType === 1"
            :data="table.data"
            :border="table.border"
            :stripe="!table.stripe"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                v-if="!table.selection"
                type="selection"
                align="center"
                width="50"
            />
            <el-table-column
                v-for="(col,k) in table.cols"
                :key="k"
                :show-overflow-tooltip="col.key !== 'operation' && !col.overflow"
                :align="col.align || 'center'"
                :width="col.width || 'auto'"
                :label="col.label"
            >
                <template slot-scope="{row}">
                    <slot name="column" :data="{row,col}">
                        <!-- <template v-if="col.key === 'operation'">
                            <el-button type="text">操作按钮</el-button>
                            <el-button type="text">
                                <router-link class="app-link-to" :to="`/peoples/admin/logList`">跳转链接</router-link>
                            </el-button>
                        </template>
                        <template v-else>{{row[col.key] || '-'}} </template> -->
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <!-- 多类型表格 -->
        <el-table
            v-if="table.tableType === 2"
            :data="table.data"
            :border="table.border"
            :stripe="!table.stripe"
        >
            <template v-for="(col,k) in table.cols">
                <el-table-column
                    v-if="col.types && col.types.includes(include)"
                    :key="k"
                    :show-overflow-tooltip="col.key !== 'operation' && !col.overflow"
                    :align="col.align || 'center'"
                    :width="col.width || 'auto'"
                    :label="col.label"
                >
                    <template slot-scope="{row}">
                        <slot name="column" :data="{row,col}">
                            <!-- <template v-if="col.key === 'operation'">
                                <el-button type="text">操作按钮</el-button>
                                <el-button type="text">
                                    <router-link class="app-link-to" :to="`/peoples/admin/logList`">跳转链接</router-link>
                                </el-button>
                            </template>
                            <template v-else>{{row[col.key] || '-'}} </template> -->
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 自定义表格 -->
        <template v-else-if="table.tableType == 3">
            <slot name="appTable" :data="{table}" />
        </template>
        <el-pagination
            v-if="!table.hidePagination"
            class="table-pagination"
            :current-page="table.page"
            :page-size="config.table.pagination.size"
            :page-sizes="config.table.pagination.sizes"
            :layout="config.table.pagination.layout"
            :total="table.total"
            @current-change="handleCurrentChange"
        />
        <!-- 其它组件 如表格的dialog -->
        <slot name="other" />
    </div>
</template>
<script>
export default {
    props: {
        utils: { //表格工具栏
            left: Array,
            right: Array,
            type: Object,
            cols: Object,
            default() {
                return {
                    // left: [{  slot: 'add' }],
                    // right: [{  slot: 'search' }],
                    // cols: [12, 12]
                };
            }
        },
        table: {
            border: false,
            type: Object,
            data: [], //表格数据
            page: 1, //页码索引
            total: 0, //总页数
            cols: [], //表格列配置
            tableType: 1, //1 普通表格 2 多类型表格 3 自定义表格
            hidePagination: true, //隐藏分页器
            hideSelection: false, //是否显示多选框 默认显示
            default() {
                return {
                    data: [],
                    page: 1,
                    total: 0,
                    cols: [{
                        key: '',
                        label: ''
                    }],
                    tableType: 1
                };
            }
        },
        include: {
            type: [String, Number, Object],
            default() {
                return {
                    include: null
                };
            }
        }
    },
    data() {
        return {
            cols: [12, 12],
            demo: { //test params
                table: {
                    queryData: { //查询参数
                        keyWord: null,
                        page: 1,
                        limit: 10
                    },
                    data: [], //表格数据
                    total: 0, //总页数
                    page: 1, //页码索引
                    tableType: 3, //表格类型
                    hidePagination: true, //隐藏分页器
                    utils: { //表格工具栏
                        left: [{ slot: 'add' }],
                        right: [{ slot: 'search' }],
                        cols: [12, 12]
                    },
                    cols: [ //表格列配置
                        {
                            key: 'id',
                            label: '机构名称'
                        },
                        {
                            key: 'operation',
                            width: '200px',
                            label: '操作'
                        }
                    ]
                }
            }
        };
    },
    computed: {
        config() {
            // console.log(this.table);
            return this.$store.state.config;
        }
    },
    methods: {

        /**
         * 翻页
         */
        handleCurrentChange(page) {
            this.$emit(`pageChange`, page);
        },

        /**
         * 多选回调
         */
        handleSelectionChange(val) {
            this.$emit('selectionChange', val);
        }
    }
};
</script>
<style lang="less" scoped>
.table-pagination{
    margin-top: 20px;
}
</style>
