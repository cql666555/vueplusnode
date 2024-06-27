<template>
    <div class="box">
        <div>
            <el-form :inline="true" ref="add_data" :model="searchData">
                <el-form-item label="按照收支类型筛选：">
                    <el-select v-model="searchData.type" placeholder="请选择收支类型">
                        <el-option v-for="(item, index) in format_type_list" :key="index" :label="item"
                            :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch()">筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table max-height="400" border :data="tableData" style="width: 100%;">
                <el-table-column prop="id" label="编号" width="50"></el-table-column>
                <el-table-column prop="type" label="收支类型" width="150"></el-table-column>
                <el-table-column prop="describe" label="收支描述" width="180"></el-table-column>
                <el-table-column prop="income" label="收入" width="170">
                    <template slot-scope="scope">
                        <span style="color: #00d053;">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expend" label="支出" width="170">
                    <template slot-scope="scope">
                        <span style="color: #f56767;">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash" label="账户现金" width="170">
                    <template slot-scope="scope">
                        <span style="color: #4db3ff;">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="220"></el-table-column>
                <el-table-column prop="operation" align="center" fixed="right" width="320" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="warning"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="pagination.page_index" :page-sizes="pagination.page_sizes"
                            :page-size="pagination.page_size" :layout="pagination.layout" :total="pagination.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>

        <Dialog :dialog="dialog" :formData="formData" @update="getProfiles"></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/Dialog.vue'
export default {
    name: 'FundList',
    components: { Dialog },
    data() {
        return {
            pagination: {
                page_index: 1,
                total: 0, //总数
                page_size: 5, //一页显示多少条
                page_sizes: [5, 10, 15, 20],  //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"
            },
            tableData: [],
            filtertableData: [],
            alltableData: [],
            formData: {
                type: '',
                describe: '',
                income: '',
                expend: '',
                cash: '',
                remark: '',
                id: ''
            },
            dialog: {
                show: false,
                title: '',
                option: 'edit'
            },
            format_type_list: [
                '提现',
                '提现手续费',
                '充值',
                '优惠券',
                '充值礼券',
                '转账'
            ],
            searchData: {
                type: ''
            }
        }
    },
    created() {
        this.getProfiles();
    },
    methods: {
        getProfiles() {
            this.$axios.get('http://localhost:5000/api/profile/all')
                .then(res => {
                    this.alltableData = res.data;
                    this.filtertableData = res.data;
                    // 设置分页数据
                    this.setPaginations();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        handleEdit(index, row) {
            // console.log('edit');
            this.dialog = {
                show: true,
                title: '修改资金信息',
                option: 'edit'
            }
            this.formData = {
                ...row
            }
        },
        handleDelete(index, row) {
            // console.log('delete');
            this.$axios.post(`http://localhost:5000/api/profile/delete/${row.id}`)
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getProfiles();
                })
        },
        handleAdd() {
            this.dialog = {
                show: true,
                title: '添加资金信息',
                option: 'add'
            }
            this.formData = {
                type: '',
                describe: '',
                income: '',
                expend: '',
                cash: '',
                remark: '',
                id: ''
            }
        },
        handleSearch() {
            if (!this.searchData.type) {
                this.$message({
                    type: 'warning',
                    message: '请选择收支类型'
                })
                this.getProfiles();
                return;
            }

            const type = this.searchData.type;
            this.alltableData = this.filtertableData.filter(item => {
                return item.type === type;
            })

            // 分页数据
            this.setPaginations();
        },
        handleSizeChange(page_size) {
            // 切换size
            this.pagination.page_index = 1;
            this.pagination.page_size = page_size;
            // 设置分页数据
            this.tableData = this.alltableData.filter((item, index) => {
                return index < page_size;
            })
        },
        handleCurrentChange(page) {
            let index = this.pagination.page_size * (page - 1);
            let nums = this.pagination.page_size * page;
            let tables = [];
            for (let i = index; i < nums; i++) {
                if (this.alltableData[i]) {
                    tables.push(this.alltableData[i]);
                }
            }
            this.tableData = tables;
        },
        setPaginations() {
            // 分页属性设置
            this.pagination.total = this.alltableData.length;
            this.pagination.page_index = 1;
            this.pagination.page_size = 5;
            // 设置默认的分页数据
            this.tableData = this.alltableData.filter((item, index) => {
                return index < this.pagination.page_size;
            })
        }
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    padding: 30px;
}

.btnRight {
    float: right;
}

.pagination {
    margin-top: 30px;
    text-align: right;
}
</style>