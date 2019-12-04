<template>
    <el-button type="primary" @click="init()">
        <slot>预览</slot>
        <DialogContainer v-if="dialogConf.isShow" :dialog-conf="dialogConf">
            <div v-if="logs && logs.length" class="detail">
                <ul class="sys-logs">
                    <template v-for="(log,index) in logs">
                        <li :key="index">
                            {{ log }}
                        </li>
                    </template>
                </ul>
            </div>
            <p v-else class="no-logs">
                暂无日志信息
            </p>
        </DialogContainer>
    </el-button>
</template>
<script type="text/ecmascript-6">
import { getSysLogContent } from '@/http';
export default {
    name: 'ReadLogDialog',
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
                title: '日志详情',
                closeOnClickModal: true,
                appendToBody: true
            },
            logs: []
        };
    },
    methods: {
        /**
		 * 初始化
		 */
        async init () {
            this.dialogConf.isShow = true;
            this.dialogConf.title = this.title || '日志详情';
            this.logs = [];
            try {
                const { data } = await this.$axios[getSysLogContent.method](getSysLogContent.url, { params: { logPath: this.path } });
                if (data) this.logs = data.split('\r\n');
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
    font-size: 12px;
    .sys-logs{
        max-height: 600px;
        overflow: auto;
        padding: 20px;
        li{
            line-height: 2;
            border-bottom: 1px dashed @app-boder-color;
            padding: 10px 0;
        }
    }
}
.no-logs{
    text-align: center;
}
</style>
