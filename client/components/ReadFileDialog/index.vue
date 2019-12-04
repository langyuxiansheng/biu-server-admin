<template>
    <el-button type="primary" @click="init()">
        <slot>预览</slot>
        <DialogContainer v-if="dialogConf.isShow" :dialog-conf="dialogConf">
            <div v-if="detail" class="detail">
                {{ detail }}
            </div>
            <p v-else class="no-logs">
                暂无日志信息
            </p>
        </DialogContainer>
    </el-button>
</template>
<script type="text/ecmascript-6">
import { readeFileContent } from '@/http';
export default {
    name: 'ReadFileDialog',
    props: {
        path: {
            type: [String, Number],
            default: null
        },
        title: {
            type: [String, Number],
            default: null
        }
    },
    data () {
        const { dialogDetailWidth } = this.$store.state.config;
        return {
            dialogConf: {
                width: dialogDetailWidth,
                isShow: false,
                center: true,
                title: '预览详情',
                closeOnClickModal: true,
                appendToBody: true
            },
            detail: null
        };
    },
    methods: {
        /**
		 * 初始化
		 */
        async init () {
            this.dialogConf.isShow = true;
            this.dialogConf.title = this.title || '预览详情';
            try {
                const { data } = await this.$axios[readeFileContent.method](readeFileContent.url, { params: { filePath: this.path } });
                this.detail = data;
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import '~@/assets/styles/common/constant.less';
.detail{
    font-size: 14px;
    color: @app-font-color;
    max-height: 600px;
    overflow: auto;
}
.no-logs{
    text-align: center;
}
</style>
