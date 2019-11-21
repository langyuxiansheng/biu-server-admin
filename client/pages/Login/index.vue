<template>
    <div class="login-bg" :style="{backgroundImage:`url(${require(`@/assets/images/login-bg-${bgUrlIndex}.jpg`)})`}">
        <login-form />
        <p class="copyright">
            Copyright ©  狼丶宇先生 | 蜀ICP备17005357号
        </p>
    </div>
</template>
<script type="text/ecmascript-6">
import LoginForm from './LoginForm';
export default {
    name: 'Login',
    layout: 'empty',
    components: { LoginForm },
    data() {
        return {
            bgUrlIndex: 0
        };
    },
    created() {
        this.bgToggle();
    },
    methods: {
        bgToggle() {
            setInterval(() => {
                ++this.bgUrlIndex;
                if (this.bgUrlIndex > 2) this.bgUrlIndex = 0;
            }, 1000 * 5);
        }
    }
};
</script>

<style lang="less">
.login-bg{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:100%;
    background-repeat: no-repeat;
    background-position: 0 0;
    transition: background 2s ease-in-out;
    background-size: 100% 100%;
    .copyright{
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 42px;
        left: 0;
        color: #fff;
    }
}
</style>
