<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :label-position="$store.state.config.labelPosition" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="单个文件" prop="account">
                        <el-upload
                            class="app-upload"
                            :action="uploadURL"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :before-remove="handleBeforeRemove"
                            :on-success="handleSuccess"
                            :file-list="fileList"
                            list-type="picture"
                            :headers="headers"
                        >
                            <el-button size="small" type="primary">
                                点击上传
                            </el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传小于1G的文件
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="批量上传" prop="account">
                        <el-upload
                            multiple
                            class="app-upload"
                            :action="uploadsURL"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :before-remove="handleBeforeRemove"
                            :on-success="handleSuccess"
                            :file-list="fileList"
                            list-type="picture"
                            :headers="headers"
                        >
                            <el-button size="small" type="primary">
                                点击上传
                            </el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传小于1G的文件
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="app-submit-btns">
                        <el-form-item class="app-text-center">
                            <el-button type="primary" @click="submitForm('AppForm')">
                                保存
                            </el-button>
                            <el-button @click="resetForm('AppForm')">
                                取消
                            </el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </dialog-container>
</template>
<script type="text/ecmascript-6">
import { deleteFiles } from '@/http';
import util from '@/lib/util';
import { FILE_UPLOAD_URL, FILES_UPLOAD_URL } from '@/http/models/types';
export default {
    name: 'FileForm',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        return {
            uploadURL: FILE_UPLOAD_URL, //文件上传地址
            uploadsURL: FILES_UPLOAD_URL, //文件上传地址
            dialogConf: {
                width: dialogSingleFormWidth,
                isShow: false,
                center: true,
                title: null
            },
            type: 'add',
            headers: {
                Authorization: util.getCookie(`BIU-SERVER-ADMIN-JWT`)
            },
            fileList: []
        };
    },
    methods: {

        /**
		 * 初始化
		 */
        async init ({ type, title, data }) {
            this.dialogConf.isShow = true;
            this.type = type;
            if (title) this.dialogConf.title = title;
        },

        /**
         * 上传限制
         */
        beforeUpload(file) {
            const isMax = file.size / 1024 / 1024 < 200;
            if (!isMax) {
                this.$message.error('上传文件大小不能超过 200M!');
            }
            return isMax;
        },

        /**
         * 上传文件
         */
        handlePreview(file) {
            console.log(file);
        },

        /**
         * 文件改变
         */
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },

        /**
         * 移除文件
         */
        async handleBeforeRemove(file, fileList) {
            try {
                if (file && file.response && file.response.data) {
                    const { code } = await this.$axios[deleteFiles.method](deleteFiles.url, {
                        data: { ids: [file.response.data.fileId], isDelete: true }
                    });
                    if (code == 200) {
                        this.$message.success(this.$t('msg.deleted_success'));
                        return Promise.resolve(true);
                    } else {
                        return Promise.resolve(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        /**
         * 上传成功回调
         */
        handleSuccess(res, file) {
            console.log(res);
            if (res && res.code == 200) {
                this.$message.success('上传成功!');
            } else {
                this.$message.error(res.msg || '上传失败!');
            }
        },

        /**
		 * 提交表单
		 */
        submitForm (formName) {
            this.dialogConf.isShow = false;
            this.$emit('refresh');
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.dialogConf.isShow = false;
            this.$emit('refresh');
            this.$refs[formName].resetFields();
        }

    }
};
</script>
