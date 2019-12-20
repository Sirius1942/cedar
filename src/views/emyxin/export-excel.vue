<template>
  <div class="app-container">

    <div>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">
        导出记录
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="授课老师">
        <template slot-scope="scope">
          {{ scope.row.teacher }}
        </template>
      </el-table-column>
      <el-table-column label="签到人" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.singner }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签到时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户编码" width="220">
        <template slot-scope="scope">
          {{ scope.row.unid }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="pasesize_ary"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/emexcel'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'
// options components

export default {
  name: 'ExportExcel',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      pasesize_ary: [10, 20, 30, 50, 100, 200]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      console.info('page :', this.listQuery.page)
      console.info('listquery limit :', this.listQuery.limit)
      var reqdata = { 'limit': this.listQuery.limit,
        'offset': (this.listQuery.page - 1) * this.listQuery.limit }
      fetchList(reqdata).then(response => {
        this.list = response.results
        this.listLoading = false
        this.total = response.count
      })
    },
    getList() {
      // 获取数据
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '课程', '授课老师', '签到人', '签到时间', '用户编码']
        const filterVal = ['id', 'title', 'teacher', 'singner', 'created_time', 'unid']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      var i = 0
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'created_time') {
          return parseTime(v[j])
        } else {
          if (j === 'id') {
            i = i + 1
            return i
          } else {
            return v[j]
          }
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
