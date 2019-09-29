//https://vuejs.github.io/eslint-plugin-vue/rules/
module.exports = {
    root: true,
    //想要支持的JS语言选项
    parserOptions: {
        parser: 'babel-eslint',
        //启用ES6语法支持(如果支持es6的全局变量{env: {es6: true}}，则默认启用ES6语法支持)
        //此处也可以使用年份命名的版本号：2015
        ecmaVersion: 6,
        //默认为script
        sourceType: 'module',
        //支持其他的语言特性
        ecmaFeatures: {
            //...
        }
    },
    env: {
        browser: true,
        es6: true
    },
    //集成推荐的规则
    extends: ['standard', 'plugin:vue/recommended'],
    plugins: ['html', 'vue'],
    globals: {
        'filterVal': false
    },
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [2, 'always'], //语句强制分号结尾.
        //"indent": ["error", "tab"], //缩进风格
        'indent': [2, 4], //缩进风格
        'no-mixed-spaces-and-tabs': [2, true],
        'vue/max-attributes-per-line': 0,
        'spaced-comment': 0, //注释风格要不要有空格什么的
        'eqeqeq': 0, //必须使用全等
        'no-tabs': 'off', //禁止使用tab
        'no-return-assign': 0, //return 语句中不能有赋值表达式
        'no-extra-parens': 'off', //禁止混用不同的操作符
        'no-mixed-operators': 'off', //禁止混合使用不同的操作符
        'space-before-function-paren': [0, 'always'], //方法空格
        'eol-last': [0, 'always'], //结尾换行
        'vue/html-indent': ['error', 4, { //vue缩进
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/no-multi-spaces': ['error', { //去除多余的空格
            'ignoreProperties': false
        }],
        'vue/component-name-in-template-casing': ['error', 'kebab-case', { //全部使用小写 - 命名
            'ignores': []
        }],
        'vue/no-v-html': 'off', //禁止使用v-html指令
        'vue/require-valid-default-prop': 'off' //需要化有效默认prop
    }
};