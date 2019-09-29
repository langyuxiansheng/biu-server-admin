<template>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
        <el-table-column v-if="cols.length===0" width="150">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
                <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus" />
                    <i v-else class="el-icon-minus" />
                </span>
                {{ scope.$index }}
            </template>
        </el-table-column>
        <template v-else>
            <template v-for="(col, index) in cols">
                <el-table-column v-if="!col.isHide" :key="index" :label="col.label" :align="col.align || 'center'" :width="col.width || 'auto'">
                    <template slot-scope="scope">
                        <template v-if="col.operation">
                            <slot name="operation" :data="{row:scope.row,col}" />
                        </template>
                        <template v-else>
                            <template v-for="space in scope.row._level">
                                <span v-if="index === 0" :key="space" class="ms-tree-space" />
                            </template>
                            <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                                <i v-if="!scope.row._expanded" class="el-icon-plus" />
                                <i v-else class="el-icon-minus" />
                            </span>
                            {{ scope.row[col.key] || '-' }}
                        </template>
                    </template>
                </el-table-column>
            </template>
        </template>
        <slot />
    </el-table>
</template>
<script>
import treeToArray from './eval';
export default {
    name: 'AppTreeTable',
    props: {
        data: {
            type: [Array, Object],
            required: true
        },
        cols: {
            type: Array,
            default: () => []
        },
        // eslint-disable-next-line vue/require-default-prop
        evalFunc: {
            type: Function
        },
        // eslint-disable-next-line vue/require-default-prop
        evalArgs: Array,
        expandAll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 格式化数据源
        formatData() {
            let tmp;
            if (!Array.isArray(this.data)) {
                tmp = [this.data];
            } else {
                tmp = this.data;
            }
            const func = this.evalFunc || treeToArray;
            const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll];
            return func.apply(null, args);
        }
    },
    methods: {
        showRow(row) {
            const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
            row.row._show = show;
            return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;';
        },

        /**
         * 切换下级是否展开
         */
        toggleExpanded(trIndex) {
            const record = this.formatData[trIndex];
            record._expanded = !record._expanded;
        },

        /**
         * 图标显示
         */
        iconShow(index, record) {
            return (index === 0 && record.children && record.children.length > 0);
        }
    }
};
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
}
@-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>

<style lang="less" rel="stylesheet/scss" scoped>
@color-blue: #2196F3;
@space-width: 18px;
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: @space-width;
    height: 14px;
    &::before {
        content: ""
    }
}
.processContainer{
    width: 100%;
    height: 100%;
}
table td {
    line-height: 26px;
}

.tree-ctrl{
    position: relative;
    cursor: pointer;
    color: @color-blue;
    margin-left: -@space-width;
}
</style>
