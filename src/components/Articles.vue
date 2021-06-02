<template>
    <div>
        <div>
            <el-table :data="result.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="title" label="标题" width="400"></el-table-column>
                <el-table-column prop="author" label="作者" width="100"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="publishTime" label="发布时间" :formatter="dateFormat" width="160"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="articleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :pager-count="5"
                :total="result.length">
        </el-pagination>

    </div>

</template>
<script>
    import {articleDelete} from "../network/home";
    import moment from 'moment';
    import axios from 'axios';

    export default {
        created() {
            articleDelete().then(res => {
                console.log(res);
                this.result = res;
            })
        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },
            dateFormat:function(row,column){
                let date = row[column.property];
                if(date == undefined){
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            articleDelete(row) {
                let _this = this
                this.$confirm('是否确定要删除ID为'+row.id+'的文章？', '删除数据', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8081/backstage/deleteArticleById/'+row.id).then( res => {
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
                    title: '',
                    author: '',
                    type: '',
                    publishTime: ''
                },
                currentPage: 1,
                pagesize:5,
            }
        }
    }
</script>
