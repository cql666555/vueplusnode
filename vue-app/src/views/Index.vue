<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div class="main">
            <LeftMenu></LeftMenu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
export default {
    name: 'Index',
    components: { HeadNav, LeftMenu }
}
</script>

<style scoped>
.index {
    width: 100%;
    height: calc(100vh - 65px)
}

.main {
    display: flex;
}
</style>