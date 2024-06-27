<template>
    <div class="container">
        <h2 class="title">米修在线后台管理系统</h2>
        <el-form :model="registerUser" :rules="registerRules" ref="registerForm" label-width="100px"
            class="registerForm">
            <el-form-item class="registerInput" label="用户名" prop="name">
                <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="registerInput" label="密码" prop="password">
                <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="registerInput" label="确认密码" prop="repassword">
                <el-input type="password" v-model="registerUser.repassword" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="选择身份">
                <el-select v-model="registerUser.identify" placeholder="请选择身份">
                    <el-option label="管理员" value="manager"></el-option>
                    <el-option label="员工" value="employee"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        var validatePassword = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerUser: {
                name: '',
                password: '',
                repassword: '',
                identify: ''
            },
            registerRules: {
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
                repassword: [
                    {
                        required: true,
                        message: '确认密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: '长度在6到30之间',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePassword,
                        trigger: 'blur'
                    }
                ],
                identify: []
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('http://localhost:5000/api/users/register', this.registerUser)
                        .then(res => {
                            this.$message({
                                message: '账号注册成功',
                                type: 'success'
                            })
                        })
                    this.$router.push('/login');
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

.registerForm {
    margin-top: 30px;
}

.registerInput {
    width: 350px;
}

.title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.submit_btn {
    width: 250px;
}
</style>