<template>
    <el-dialog
        v-if="dialogConf.isShow"
        :close-on-click-modal="dialogConf.closeOnClickModal || false"
        :width="dialogConf.width"
        :center="dialogConf.center"
        :visible.sync="dialogConf.isShow"
    >
        <span slot="title">
            {{ dialogConf.title }}
        </span>
        <el-row>
            <el-col :span="24">
                <slot />
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'DialogContainer',
    props: {
        dialogConf: {
            type: Object,
            default() {
                return {
                    width: null,
                    isShow: false,
                    center: true,
                    title: null,
                    closeOnClickModal: true
                };
            }
        }
    }
};
</script>
<style lang="less" scoped>

</style>
