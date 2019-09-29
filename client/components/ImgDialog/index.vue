<template>
    <span>
        <el-button type="text" @click="detailDialog.isShow = true">
            查看图片
        </el-button>
        <!--图片显示模态框-->
        <el-dialog
            v-if="detailDialog.isShow"
            custom-class="rh-dialog"
            :width="config.dialogDetailWidth"
            :center="detailDialog.center"
            :visible.sync="detailDialog.isShow"
        >
            <span slot="title">
                {{ detailDialog.title }}
            </span>
            <el-row>
                <el-col :span="24">
                    <div v-if="images && images.length > 0" class="img-list">
                        <!-- data-image-preview -->
                        <img v-for="(img,key) in images" :key="key" :src="img" alt="img">
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </span>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default {
    name: 'ImgDialog',

    props: {
        images: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data () {
        return {
            detailDialog: {
                isShow: false,
                center: true,
                title: '查看图片'
            }
        };
    },

    computed: {
        ...mapGetters(['config'])
    }
};
</script>
<style lang="less" scoped>
    .img-list{
        width: 100%;
        max-height: 600px;
        overflow: auto;
        text-align: center;
        img{
            margin:10px 5px;
            display: inline-block;
            max-width: 200px;
            height: auto;
        }
    }
</style>
