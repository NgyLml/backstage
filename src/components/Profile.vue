<template>
    <el-form ref="result" :model="result" label-width="80px">

        <el-form-item label="用户名" prop="username"
                      :rules="[
                          { required: true, message: '请输入您的用户名', trigger: 'blur' }
                              ]">
            <el-input v-model="result.username"></el-input>
        </el-form-item>

        <el-form-item label="性别">
            <el-select v-model="result.sex" placeholder="请选择您的性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="出生日期">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="result.birthday" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
        </el-form-item>

        <el-form-item label="联系方式">
            <el-input v-model="result.phone"></el-input>
        </el-form-item>

        <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]">
            <el-input v-model="result.email"></el-input>
        </el-form-item>

        <el-form-item label="所在地">
            <el-input v-model="result.address"></el-input>
        </el-form-item>

        <el-form-item label="职业">
            <el-radio-group v-model="result.career">
                <el-radio label="学生"></el-radio>
                <el-radio label="程序员"></el-radio>
                <el-radio label="销售"></el-radio>
                <el-radio label="建筑师"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="个人简介">
            <el-input type="textarea" v-model="result.info"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('result')">确定修改</el-button>
            <el-button>取消</el-button>
        </el-form-item>

    </el-form>
</template>
<script>

    import {getHomeData} from "../network/home";
    import axios from 'axios';

    export default {
        created() {
            getHomeData().then(res => {
                console.log(res);
                this.result = res;
            })
        },
        data() {
            return {
                result: {
                    username: '',
                    sex: '',
                    birthday: '',
                    email: '',
                    address: '',
                    phone: '',
                    career: '',
                    info: ''
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        axios.put('http://localhost:8081/backstage/update',this.result).then( res => {
                            if(res){
                                _this.$alert("尊敬的用户 "+_this.result.username+' 您的个人信息修改成功！', '修改数据', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        //跳转到/table
                                        _this.$router.push('/profile')
                                        console.log(action);
                                    }
                                });
                            }
                        })
                    }
                });
            }
        }
    }
</script>
