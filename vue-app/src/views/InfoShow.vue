<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div class="user"></div>
            </el-col>
            <el-col :span="16">
                <div class="userInfo"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.user {
    background-color: white;
}

.userInfo {
    background-color: gray;
}
</style>