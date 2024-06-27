<template>
    <div class="container">
        <h2 class="title">米修在线后台管理系统</h2>
        <el-form :model="loginUser" :rules="loginRules" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item class="loginInput" label="用户名" prop="name">
                <el-input v-model="loginUser.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="loginInput" label="密码" prop="password">
                <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit_btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
            <div class="tiparea">
                <p>还没有账号？现在 <router-link to="/register">注册</router-link> </p>
            </div>
        </el-form>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginUser: {
                name: '',
                password: '',
            },
            loginRules: {
                name: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 30,
                        message: '用户名长度要在2到30个字符之间',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: '长度在6到30之间',
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('http://localhost:5000/api/users/login', this.loginUser)
                        .then(res => {
                            // console.log(res);
                            const { token } = res.data;
                            localStorage.setItem('eleToken', token);
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            })
                            this.$router.push('/index');
                            this.$store.state.loginUser = this.loginUser;
                        })
                        .catch(err => {
                            this.$message({
                                message: err,
                                type: 'error'
                            })
                        })
                }
            });
        }
    }
}
</script>

<style scoped>
.container {
    width: 400px;
    height: 400px;
    position: absolute;
    /* background-color: red; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.loginForm {
    margin-top: 30px;
}

.loginInput {
    width: 350px;
}

.title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.tiparea {
    text-align: center;
}

.submit_btn {
    width: 250px;
}
</style>