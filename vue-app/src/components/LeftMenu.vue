<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu class="el-menu-vertical-demo" background-color="#324057" text-color="#fff"
                active-text-color="#409eff">
                <router-link to="/home">
                    <el-menu-item>
                        <i class="el-icon-position"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index="citem.path">
                                <span slot="title">{{ citem.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'LeftMenu',
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-money',
                    name: '资金管理',
                    path: 'fund',
                    children: [
                        {
                            path: 'fundlist',
                            name: "资金流水"
                        }
                    ]
                },
                {
                    icon: 'el-icon-setting',
                    name: '信息管理',
                    path: 'info',
                    children: [
                        {
                            path: 'info',
                            name: "个人信息"
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.menu_page {
    width: 200px;
    height: calc(100vh - 70px);
}

.el-menu {
    height: calc(100vh - 70px);
}
</style>