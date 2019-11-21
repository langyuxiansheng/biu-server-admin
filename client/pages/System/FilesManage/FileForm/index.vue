<template>
    <dialog-container :dialog-conf="dialogConf">
        <el-row class="app-form" :gutter="$store.state.config.dialogFormGutterWidth">
            <el-form ref="AppForm" :label-position="$store.state.config.labelPosition" label-width="125px" @submit.native.prevent>
                <el-col :span="24">
                    <el-form-item label="上传文件" prop="account">
                        <el-upload
                            class="app-upload"
                            :action="uploadURL"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
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
                                重新填写
                            </el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-form>
        </el-row>
    </dialog-container>
</template>
<script type="text/ecmascript-6">
import util from '@/lib/util';
import { addSysAdmin, updateSysAdmin } from '@/http';
import { FILE_UPLOAD_URL } from '@/http/models/types';
export default {
    name: 'FileForm',
    data () {
        const { dialogSingleFormWidth } = this.$store.state.config;
        return {
            uploadURL: FILE_UPLOAD_URL, //文件上传地址
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
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
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
            const isLt1G = file.size / 1024 / 1024 < 1024;
            if (!isLt1G) {
                this.$message.error('上传文件大小不能超过 1GB!');
            }
            return isLt1G;
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        /**
         * 上传成功回调
         */
        handleSuccess(res, file) {
            console.log(res);
            if (res && res.code == 200) {

            } else {
                this.$message.error(res.msg || '上传失败!');
            }
        },

        /**
		 * 提交表单
		 */
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { account, pwd, adminName, avatar, roleId, roleName } = this.sendData;
                    const send = { account, adminName, avatar, roleId, roleName, password: util.getMD5UC(pwd) };
                    let res = null;
                    try {
                        if (this.type == 'add') { //添加
                            res = await this.$axios[addSysAdmin.method](addSysAdmin.url, send);
                        } else { //编辑
                            res = await this.$axios[updateSysAdmin.method](updateSysAdmin.url, this.sendData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    if (res && res.code == 200) {
                        this.dialogConf.isShow = false;
                        this.$message.success(this.$t('msg.operation_success'));
                        this.resetForm(formName);
                        this.$emit('refresh');
                    };
                } else {
                    this.$message.error('请填写完表单');
                }
            });
        },

        /**
		 * 重置表单
		 * @param formName
		 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }

    }
};
</script>
