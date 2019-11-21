<template>
    <div class="layout-card-container" :class="[{small:small},...name]">
        <slot />
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'CardContainer',
    props: {
        small: {
            required: false,
            type: Boolean,
            default: false
        },
        name: {
            required: false,
            type: [Array, Object, String],
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .layout-card-container{
        box-sizing: border-box;
        overflow: hidden;
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
    }
    .small{
        padding: 22px 46px;
    }
</style>
