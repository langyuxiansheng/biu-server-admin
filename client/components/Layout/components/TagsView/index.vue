<template>
    <div class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link v-for="tag in Array.from(visitedViews)" ref="tag" :key="tag.path" class="tags-view-item" :class="isActive(tag) ? 'active':''" :to="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
                {{ tag.title }}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <ul v-show="visible" class="contextmenu" :style="{left:left + 'px',top:top+'px'}">
            <li @click="closeSelectedTag(selectedTag)">
                关闭
            </li>
            <li @click="closeOthersTags">
                关闭其它
            </li>
            <li @click="closeAllTags">
                关闭全部
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex';
import ScrollPane from '@/components/ScrollPane';
export default {
    components: { ScrollPane },
    data () {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {}
        };
    },
    computed: {
        ...mapGetters(['visitedViews'])
    },
    watch: {
        $route () {
            this.addViewTags();
            this.moveToCurrentTag();
        },

        /**
		 * 点击任意地方关闭右键菜单
		 *
		 */
        visible (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu);
            } else {
                document.body.removeEventListener('click', this.closeMenu);
            }
        }
    },
    mounted () {
        this.addViewTags();
    },
    methods: {

        /**
		 * 获取当前路由
		 *
		 * */
        generateRoute () {
            if (this.$route) {
                return this.$route;
            }
            return false;
        },

        /**
		 * 当前标签
		 * @param route
		 * @return {boolean}
		 */
        isActive (route) {
            return route.path === this.$route.path;
        },

        /**
		 * 新增标签
		 * @return {boolean}
		 */
        addViewTags () {
            let route = this.generateRoute();
            if (!route) {
                return false;
            }
            this.addVisitedViews(route);
        },

        /**
		 * 切换标签
		 */
        moveToCurrentTag () {
            const tags = this.$refs.tag;
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el);
                        break;
                    }
                }
            });
        },

        /**
		 * 关闭当前
		 * @param view
		 */
        closeSelectedTag (view) {
            this.delVisitedViews(view).then((views) => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView.path);
                    } else {
                        this.$router.push('/Login');
                    }
                }
            });
        },

        /**
		 * 关闭其他
		 */
        closeOthersTags () {
            this.$router.push(this.selectedTag.path);
            this.delOthersViews(this.selectedTag).then(() => {
                this.moveToCurrentTag();
            });
        },

        /**
		 * 关闭全部
		 */
        closeAllTags () {
            this.delAllViews();
            this.$router.push('/Login');
        },

        /**
		 * 打开右键菜单
		 * @param tag
		 * @param e
		 */
        openMenu (tag, e) {
            this.visible = true;
            this.selectedTag = tag;
            this.left = e.clientX;
            this.top = e.clientY;
        },

        /**
		 * 关闭右键菜单
		 */
        closeMenu () {
            this.visible = false;
        },

        ...mapActions([
            'addVisitedViews',
            'delVisitedViews',
            'delOthersViews',
            'delAllViews'
        ])
    }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/common/constant.less';
.tags-view-container {
    padding: 0 20px;
    background: #fff;
    box-shadow: -2px 4px 4px #d7d8fd;
    .tags-view-wrapper {
        height: 36px;
        .tags-view-item {
            display: inline-block;
            position: relative;
            padding: 0 5px 0 10px;
            color: @app-font-color;
            border: 1px solid @app-font-color;
            font-size: 12px;
            line-height: 24px;
            margin: 5px 10px 5px 0;
        }
        & .active {
            color: @app-theme-color;
            border-color: @app-theme-color;
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 2;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: @app-font-color;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                color: @app-theme-color;
                background: #eee;
            }
        }
    }
}

.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: middle;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            & :before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            & :hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
