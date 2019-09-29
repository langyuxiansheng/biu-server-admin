<template>
    <div>
        <el-row :gutter="0">
            <el-form class="util-form" :inline="true" :size="config.size" @submit.native.prevent>
                <el-col :span="span[0]" class="flex-container">
                    <el-form-item v-for="(item,index) in utils.left" :key="index" :label="item.label">
                        <slot :name="item.slot"></slot>
                    </el-form-item>
                </el-col>
                <el-col :span="span[1]" class="flex-container rh-text-right">
                    <el-form-item v-for="(item,index) in utils.right" :key="index" :label="item.label">
                        <slot :name="item.slot"></slot>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex';
export default {
    name: 'TableUtil',
    data () {
        return {
            cols: [12, 12]
        };
    },
    props: {
        utils: {
            left: Array,
            right: Array,
            cols: Array,
            type: Object,
            default: {
                left: [{label: '', slot: ''}],
                right: [{label: '', slot: ''}],
                cols: [12, 12]
            }
        }
    },
    computed: {
        span () {
            const {cols, utils} = this;
            return utils.cols || cols;
        },
        ...mapGetters(['config'])
    }
};
</script>
<style lang="less" scoped>
    .util-form{
        .el-form-item{
            // margin-bottom: 0;
        }
    }
</style>
