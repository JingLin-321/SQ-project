<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian"><span>运维记录 /</span>测站故障情况记录表（附件四）</div>
    <div class="conMain">
    <div class="heading">上海市水情自动测报系统测站故障情况记录表</div>
    <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
    <!-- 日期选择器 -->
    <div class="block">
        <div class="top-left">
      <span class="demonstration">站名:</span>
      <div class="selectedmonth1">
        <el-select v-model="input" filterable clearable placeholder="请输入站名" @change="searchclick()">
          <el-option
            v-for="item in rows1"
            :key="item.stationId"
            :label="item.stationName"
            :value="item.stationName"
          ></el-option>
        </el-select>
      </div>
      <div class="demonstration">月份:</div>
      <div class="selectedmonth">
        <el-date-picker
          style=" width:160px;
            height:30px;"
          size="small"
          v-model="datetimes"
          type="month"
          value-format="yyyy-MM"
          @change="searchclick()"
          placeholder="请选择查询月份"
        ></el-date-picker>
      </div>
        </div>
        <div class="top-right">
      <el-button class="dc" type="success" @click="addexcel()">导出</el-button>
      <el-button class="addmess" type="primary" @click="addclick()">增加信息</el-button>
    </div>
    </div>
    <!-- 表格 -->
    <div class="sectionTable" style="text-align: center;">
      <el-table
        :data="rows"
        :height="(clientHeight-390)"
        empty-text="暂无数据"
        border
        style="border-radius:6px;"
      >
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column prop="stationName" label="站名"  align="center"></el-table-column>
        <el-table-column
          prop="createTime"
          label="发生时间"
          align="center"
        >
          <template slot-scope="scope">
           <div>{{scope.row.createTime==undefined?"":scope.row.createTime.substr(8,2)+'日'+scope.row.createTime.substr(11,2)+'时'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="brokenName"
          label="故障现象"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="brokenResponseTime"
          label="防汛要求故障响应上报时间"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{scope.row.brokenResponseTime==undefined?"":scope.row.brokenResponseTime.substr(8,2)+'日'+scope.row.brokenResponseTime.substr(11,2)+'时'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="brokenAskToResolveTime"
          label="防汛要求解决时间"
          align="center"
        >
          <template slot-scope="scope">
             <div>{{scope.row.brokenAskToResolveTime==undefined?"":scope.row.brokenAskToResolveTime.substr(8,2)+'日'+scope.row.brokenAskToResolveTime.substr(11,2)+'时'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="brokenrRequestReportTime"
          label="防汛要求抢修情况上报时间"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{scope.row.brokenrRequestReportTime==undefined?"":scope.row.brokenrRequestReportTime.substr(8,2)+'日'+scope.row.brokenrRequestReportTime.substr(11,2)+'时'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="resolveMethod"
          label="处理方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="resolveUserId"
          label="故障处理人"
          align="center"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"  align="center"></el-table-column>
        <el-table-column
          prop="brokenAccording"
          label="故障原因"
          align="center"
        ></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column fixed="right" width="130" label="操作">
          <template slot-scope="scope">
            <span class="editButton" @click="editclick(scope.row)">编辑</span>
            <span
              style="
height:40px;
font-size:16px;
font-family:SimHei;
font-weight:bold;
color:#C9C9C9;
line-height:40px;"
            >|</span>
            <span class="editButton1" @click="deleteclick(scope.row)">删除</span>
            <span
              style="
height:40px;
font-size:16px;
font-family:SimHei;
font-weight:bold;
color:#C9C9C9;
line-height:40px;"
            >|</span>
            <span
              class="editButton"
              v-if="scope.row.requestDesignatingStatus==1"
              @click="goPD(scope.row)"
            >派单</span>
            <span
              class="editButton"
              style="color:grey"
              v-if="scope.row.requestDesignatingStatus!==1"
            >派单</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="prev, pager, next,jumper"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>
    <div class="reportIdea" style="font-size: 14px;line-height: 15px;">
      <p>说明：1、如本月无故障发生，请在表格首行填写“无故障发生”。</p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2、填写的时间应精确到小时，如：“10日12时”</p>
    </div>
    <!-- 删除的弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <span>确认删除记录吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteclik(row)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的弹窗 -->
    <el-dialog title="编辑自动测报系统测站故障数据" :visible.sync="edit" @close="handleClose" width="40%">
      <el-form label-width="200px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="站名" prop="stationName">
          <el-select style="width:90%;" v-model="addform.stationName" placeholder="请选择" @change="station">
            <el-option
              v-for="item in rows1"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生时间" prop="createTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.createTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy 年 MM 月 dd 日 HH 时"
            value-format="yyyy-MM-dd HH"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="故障现象" prop="brokenName">
          <el-select style="width:90%;" v-model="addform.brokenName" placeholder="请选择">
            <el-option
              v-for="(item,index) in rows2"
              :key="index"
              :label="item.errorName"
              :value="item.errorName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="防汛要求故障响应上报时间" prop="brokenResponseTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenResponseTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="防汛要求解决时间" prop="brokenAskToResolveTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenAskToResolveTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="防汛要求抢修情况上报时间" prop="brokenrRequestReportTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenrRequestReportTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="处理方式" prop="resolveMethod">
          <el-input style="width:90%;" maxlength="600" v-model="addform.resolveMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障处理人" prop="resolveUserId">
          <el-select style="width:90%;" maxlength="72" v-model="addform.resolveUserId" multiple placeholder="请选择">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:90%;" maxlength="600" v-model="remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障原因">
          <el-select style="width:90%;" v-model="brokenAccording" placeholder="请选择">
            <el-option
              v-for="(item,index) in rows2"
              :key="index"
              :label="item.brokenAccording"
              :value="item.brokenAccording"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="edit = false">取消</el-button>
        <el-button type="primary" @click="editDo">保存</el-button>
      </div>
    </el-dialog>
    <!-- 增加的弹窗 -->
    <el-dialog title="增加自动测报系统测站故障数据" :visible.sync="add" @close="handleClose" width="40%">
      <el-form label-width="200px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="站名" prop="stationName">
          <el-select style="width:90%;" v-model="addform.stationName" placeholder="请选择" @change="station">
            <el-option
              v-for="item in rows1"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生时间" prop="createTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.createTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy 年 MM 月 dd 日 HH 时"
            value-format="yyyy-MM-dd HH"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="故障现象" prop="brokenName">
          <el-select style="width:90%;" v-model="addform.brokenName" placeholder="请选择">
            <el-option
              v-for="(item,index) in rows2"
              :key="index"
              :label="item.errorName"
              :value="item.errorName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="防汛要求故障响应上报时间" prop="brokenResponseTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenResponseTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="防汛要求解决时间" prop="brokenAskToResolveTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenAskToResolveTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="防汛要求抢修情况上报时间" prop="brokenrRequestReportTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.brokenrRequestReportTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="处理方式" prop="resolveMethod">
          <el-input style="width:90%;" maxlength="600" v-model="addform.resolveMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障处理人" prop="resolveUserId">
          <el-select style="width:90%;" maxlength="72" v-model="addform.resolveUserId" multiple placeholder="请选择">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" required>
          <el-input style="width:90%;" maxlength="600" v-model="remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障原因" required>
          <el-select style="width:90%;" v-model="brokenAccording" placeholder="请选择">
            <el-option
              v-for="(item,index) in rows2"
              :key="index"
              :label="item.brokenAccording"
              :value="item.brokenAccording"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="add = false">取消</el-button>
        <el-button type="primary" @click="addDo">保存</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        stationName: [
          { required: true, message: "请选择站名", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "请选择发生时间", trigger: "change" }
        ],
        brokenName: [
          { required: true, message: "请选择故障现象", trigger: "change" }
        ],
        brokenResponseTime: [
          {
            required: true,
            message: "请选择防汛要求故障响应上报时间",
            trigger: "change"
          }
        ],
        brokenAskToResolveTime: [
          {
            required: true,
            message: "请选择防汛要求解决时间",
            trigger: "change"
          }
        ],
        brokenrRequestReportTime: [
          {
            required: true,
            message: "请选择防汛要求抢修情况上报时间",
            trigger: "change"
          }
        ],
        resolveMethod: [
          { required: true, message: "请选择处理方式", trigger: "change" }
        ],
        resolveUserId: [
          { required: true, message: "请选择故障处理人", trigger: "change" }
        ]
      },
      clientHeight: document.body.clientHeight,
      activeClass2: -1,
      brokenAccording: "",
      rows: [],
      input: "",
      pageSize: 12,
      page: 1,
      total: null,
      currentPage: 1,
      dialogVisible: false,
      add: false,
      edit: false,
      rows1: [],
      rows2: [],
      options5: [
        {
          label: "李俊",
          value: 0
        },
        {
          label: "季彩华",
          value: 1
        },
        {
          label: "王辰鹏",
          value: 2
        }
      ],
      addform: {
        stationName: "",
        createTime: "",
        brokenName: "",
        brokenResponseTime: "",
        brokenAskToResolveTime: "",
        brokenrRequestReportTime: "",
        resolveMethod: "",
        resolveUserId: []
      },
      stationId: "",
      reportId: "",
      remark: "",
      brokenAccording: "",
      datetimes: this.formatDate(new Date())
    };
  },
  mounted() {
    //页面适配
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  },
  created() {
    this.searchclick();
    this.goFirst();
    this.goErrorData();
  },
  methods: {
    //分页change事件
    handleCurrentChange(val) {
      this.page = val;
      this.searchclick();
    },
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //故障现象下拉框
    goErrorData() {
      this.$fetchGet("dropdown/getDataError")
        .then(response => {
          this.rows2 = response;
        })
        .catch(function(error) {});
    },
    //测站信息下拉框
    goFirst() {
      this.$fetchGet("dropdown/getStation")
        .then(response => {
          this.rows1 = response;
        })
        .catch(function(error) {});
    },
    //测站选择change事件
    station(e) {
      this.rows1.map((item, i) => {
        if (item.stationName == e) {
          this.stationId = parseInt(item.stationId); //传值
        }
      });
    },
    //获取所有数据接口
    getAll() {
      this.$fetchGet("applicationBroken/getAll?createDate=" + this.datetimes, {
        page: this.page,
        pageSize: this.pageSize
      })
        .then(response => {
          this.rows = response.list;
          this.total = response.total;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //导出excel
    addexcel() {
      window.open(
        "/sq/applicationBroken/getExcel?createTime=" + this.datetimes,
        {
          params: {
            stationName: this.input
          }
        }
      );
    },
    //触发添加按钮
    addclick(row) {
      this.addform.createTime = "";
      this.addform.stationName = "";
      this.addform.brokenName = "";
      this.addform.brokenResponseTime = "";
      this.addform.brokenAskToResolveTime = "";
      this.addform.brokenrRequestReportTime = "";
      this.addform.resolveMethod = "";
      this.addform.resolveUserId = [];
      this.remark = "";
      this.brokenAccording = "";
      this.add = true;
    },
    //触发删除按钮
    deleteclick(row) {
      this.dialogVisible = true;
      this.reportId = row.reportId;
    },
    //派单接口
    goPD(row) {
      this.activeClass2 = row.reportId;
      this.reportId = row.reportId;
      this.$fetchGet("applicationBroken/updateStatus?reportId=" + this.reportId)
        .then(response => {
          if (response == 1) {
           this.$message({
              message: "派单成功",
              type: "success"
            });
            this.searchclick();
          } else {
           this.$message.error("派单失败");
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //触发编辑按钮
    editclick(row) {
      this.edit = true;
      this.addform.stationName = row.stationName;
      this.addform.createTime = row.createTime;
      this.addform.brokenName = row.brokenName;
      this.addform.brokenResponseTime = row.brokenResponseTime;
      this.addform.brokenAskToResolveTime = row.brokenAskToResolveTime;
      this.addform.brokenrRequestReportTime = row.brokenrRequestReportTime;
      this.addform.resolveMethod = row.resolveMethod;
      console.log(row.resolveUserId);
      this.addform.resolveUserId =
        row.resolveUserId == undefined ? "" : row.resolveUserId.split(",");
      this.remark = row.remark;
      this.brokenAccording = row.brokenAccording;
      this.reportId = row.reportId;
      console.log(row.reportId);
    },
    //删除接口
    deleteclik() {
      this.$fetchGet(`applicationBroken/delete?reportId=${this.reportId}`)
        .then(response => {
          this.dialogVisible = false;
          if (response == 1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.searchclick();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(function(error) {});
    },
    //关闭弹窗
    handleClose() {
      this.$refs.addform.resetFields();
    },
    //增加接口
    addDo() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          let str;
          if (this.addform.resolveUserId.length == 0) {
            str = "";
          } else {
            str = this.addform.resolveUserId.join(",");
          }
          this.$fetchPost(
            "applicationBroken/insert",
            {
              broken_name: this.addform.brokenName,
              create_time: this.addform.createTime,
              station_name: this.addform.stationName,
              broken_response_time: this.addform.brokenResponseTime,
              broken_ask_to_resolve_time: this.addform.brokenAskToResolveTime,
              brokenr_request_report_time: this.addform
                .brokenrRequestReportTime,
              resolve_method: this.addform.resolveMethod,
              resolve_user_id: str,
              remark: this.remark,
              broken_according: this.brokenAccording,
              station_id: this.stationId
            },
            "json"
          )
            .then(response => {
              this.add = false;
              if (response == 1) {
                this.$message({
              message: "添加成功",
              type: "success"
            });
                this.searchclick();
              } else {
                this.$message.error("添加失败");
              }
            })
            .catch(function(error) {});
        } else {
          this.$message({
          message: '请完善信息!',
          type: 'warning'
        });
          return false;
        }
      });
    },
    //编辑接口
    editDo() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          this.$fetchPost(
            "applicationBroken/update",
            {
              report_id: this.reportId,
              broken_name: this.addform.brokenName,
              create_time: this.addform.createTime,
              station_name: this.addform.stationName,
              broken_response_time: this.addform.brokenResponseTime,
              broken_ask_to_resolve_time: this.addform.brokenAskToResolveTime,
              brokenr_request_report_time: this.addform
                .brokenrRequestReportTime,
              resolve_method: this.addform.resolveMethod,
              resolve_user_id: this.addform.resolveUserId.join(","),
              remark: this.remark,
              broken_according: this.brokenAccording,
              station_id: this.stationId
            },
            "json"
          )
            .then(response => {
              this.edit = false;
              if (response == 1) {
                  this.$message({
              message: "编辑成功",
              type: "success"
            });
                this.searchclick();
              } else {
               this.$message.error("编辑失败");
              }
              // this.getAll();
            })
            .catch(function(error) {
              // console.log(error);
            });
        } else {
           this.$message({
          message: '请完善信息!',
          type: 'warning'
        });
          return false;
        }
      });
    },
    //查询接口
    searchclick() {
      this.$fetchGet("applicationBroken/getAll?createDate=" + this.datetimes, {
        page: this.page,
        pageSize: this.pageSize,
        stationName: this.input
      })
        .then(response => {
          this.rows = response.list;
          this.total = response.total;
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>
<style type="text/css">

.selectedmonth .el-input--small .el-input__inner {
  width: 171px;
  height: 30px;
 border:1px solid rgba(204,204,204,1);
border-radius:6px;
}
.el-input__inner {
  height: 30px;
}
.sectionTable .el-table thead .el-table th,
.el-table tr {
  /* width: 1547px; */
  height: 50px;
  border-radius: 6px;
}
.sectionTable .el-table thead {
  border-radius: 6px;
}
.sectionTable .el-table thead.is-group th {
  border: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}
.sectionTable .el-table--border,
.el-table--group {
  border: 0;
}
</style>
<style type="text/css" scoped>
.container123 {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.conMain {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.heading {
  width: 100%;
  height: 23px;
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  color: rgba(33, 140, 246, 1);
  line-height: 30px;
  margin-top: 33px;
}
.tableHeading {
  width: 100%;
  height: 25px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
  line-height: 35px;
  margin-top: 10px;
  text-align: center;
}
.block {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  margin-top: 18px;
  box-sizing: border-box;
  padding: 0 30px;
  padding-left: 0;
}
.top-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fujian {
  font-size: 14px;
  font-weight: 400;
  color: #555555;
  line-height: 30px;
  width: 100%;
  height: 20px;
  margin-left: 10px;
}
.fujian span {
  font-size: 14px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
  line-height: 30px;
  height: 20px;
}
.editButton {
  /* width: 40px; */
  height: 40px;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(33, 140, 246, 1);
  line-height: 40px;
  cursor: pointer;
}
.editButton1 {
  height: 40px;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(246, 89, 82, 1);
  line-height: 40px;
  cursor: pointer;
}
.sectionTable {
  margin-right: 30px;
}
.sectionTable .el-table {
  margin-left: 16px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}
.demonstration {
  width: 40px;
  height: 35px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 35px;
  margin-left: 10px;
}
.demonstration1 {
  width: 70px;
  height: 35px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 35px;
  margin-left: 10px;
}
.selectedmonth {
  width: 160px;
  height: 30px;
  margin-right: 20px;
}
.reportIdea {
   flex: 1;
  color: #666666;
  text-align: left;
  margin-left: 20px;
}
.selectedmonth1 {
  width: 160px;
  height: 30px;
  margin-right: 20px;
}
.dc {
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3px;
  text-align: center;
}
.addmess {
  border-radius: 8px;
  font-size: 16px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3px;
  margin-left: 12px;
}
.pag {
  margin-top: 15px;
  text-align: right;
  padding-right: 40px;
}

</style>

