<template>
    <el-button type="text" @click="init()">
        <slot>预览</slot>
        <DialogContainer v-if="dialogConf.isShow" :dialog-conf="dialogConf">
            <div v-if="detail" class="detail">
                <el-row class="detail-body" :gutter="130">
                    <el-col :span="12">
                        <div class="item-row">
                            <span class="name">支付单号：</span>
                            <span>{{ detail.transaction_id || '-' }}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">完结流水号：</span>
                            <span>{{ detail.order_id || '-' }}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">完结金额：</span>
                            <font color="#4fe85d">
                                + {{ detail.intoAmount|| '-' }}
                            </font> 元
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="item-row">
                            <span class="name">支付方式：</span>
                            <span>{{ detail.payType | formatElePayType }}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">完结时间：</span>
                            <span>{{ detail.updateTime | formatDateYearMonthDayAndHms }}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">手续费：</span>
                            <font color="#f00">
                                - {{ (detail.serviceChargeAmount + profitsharingAmount).toFixed(2) || '-' }}
                            </font> 元
                        </div>
                    </el-col>
                </el-row>
            </div>
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
            detail: {}
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
                const { data } = await readeFileContent({ filePath: this.path });
                this.detail = data || {};
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style lang="less" scoped>
    .detail-btn{
        margin-right: 10px;
    }
    .detail{
        padding: 0 70px;
        color: #101215;
        font-size: 14px;
        .detail-body{
            .item-row{
                margin-bottom: 26px;
                .name{
                    font-weight: bold;
                }
            }
        }
    }
</style>
