<template>
    <header class="head-nav">
        <div class="left">
            <img src="../assets/logo.png" class="logo" alt="">
            <p class="title">米修在线后台管理系统</p>
        </div>
        <div class="right">
            <img src="../assets/user.png" class="headImg" alt="">
            <div class="userInfo">
                <p>欢迎</p>
                <p class="name">{{ user.name ? user.name : 'admin' }}</p>
            </div>
            <el-dropdown trigger="click" @command="setDialogInfo">
                <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
    name: 'head-nav',
    computed: {
        user() {
            return this.$store.state.loginUser;
        }
    },
    methods: {
        setDialogInfo(comItem) {
            if (comItem === 'info') {
                this.showInfoList();
            }
            else {
                this.logout();
            }
        },
        showInfoList() {
            // console.log('个人信息');
            this.$router.push('/info');
        },
        logout() {
            // console.log('退出');
            localStorage.removeItem('eleToken');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.head-nav {
    width: 100%;
    height: 60px;
    background-color: #324057;
    color: white;
    border-bottom: 1px solid #1f2d3d;
    display: flex;
    justify-content: space-between;
}

.left {
    display: flex;
}

.logo {
    margin: 5px 15px;
    height: 50px;
}

.title {
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    font-weight: bold;
    color: white;
}

.right {
    display: flex;
}

.headImg {
    height: 40px;
    margin-top: 10px;
}

.userInfo {
    height: 100%;
    width: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.name {
    color: #409eff;
    font-weight: bold;
}

.el-dropdown-link i {
    color: white;
    margin-top: 25px;
    margin-right: 15px;
    cursor: pointer;
}
</style>