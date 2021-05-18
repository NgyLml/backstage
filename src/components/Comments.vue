<template>
    <el-table :data="result" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="article_id" label="文章ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="content" label="评论内容" width="600"></el-table-column>
        <el-table-column prop="time" label="评论时间" :formatter="dateFormat" width="160"></el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="danger" size="small" @click="commentsDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getCommentsData} from "../network/home";
    import moment from 'moment';
    import axios from 'axios';

    export default {
        created() {
            getCommentsData().then(res => {
                console.log(res);
                this.result = res;
            })
        },
        methods: {
            dateFormat:function(row,column){
                let date = row[column.property];
                if(date == undefined){
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            commentsDelete(row) {
                let _this = this
                this.$confirm('是否确定要删除ID为'+row.id+'的评论？', '删除数据', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8081/backstage/deleteById/'+row.id).then( res => {
                        if(res.data){
                            _this.$alert(row.id+'删除成功！', '删除数据', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    //跳转到/table
                                    location.reload()
                                    console.log(action);
                                }
                            });
                        }
                    })

                }).catch(() => {

                });
            }
        },

        data() {
            return {
                result: {
                    id: "",
                    article_id: '',
                    name: '',
                    content: '',
                    time: ''
                }
            }
        }
    }
</script>
