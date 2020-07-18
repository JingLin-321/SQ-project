<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian">
      <span>运维记录 /</span>日常维护记录表（附件一）
    </div>
    <div class="conMain">
      <div class="heading">上海市水情自动测报系统分中心站日常维护记录表</div>
      <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
      <!-- 日期选择器 -->
      <div class="block">
        <div class="top-left">
          <span class="demonstration">月份:</span>
          <div class="selectedmonth">
            <el-date-picker
              style=" width:171px;
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
        </div>
      </div>
      <!-- 表格 -->
      <div class="sectionTable">
        <el-table
          :loading="loading"
          :data="rows"
          empty-text="暂无数据"
          border
          :height="(clientHeight-380)"
          :span-method="objectSpanMethod"
          style="border-radius:6px;"
        >
          <el-table-column label="日期" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.mantainMonth | dateFmt('DD')}}日</div>
            </template>
          </el-table-column>
          <el-table-column prop="mantainHour" label="时间" align="center"></el-table-column>
          <el-table-column label="系统硬件情况" align="center">
            <el-table-column prop="tempHuimidityException" label="机房温湿度" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.tempHuimidityException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serverTimeException" label="服务器时间" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.serverTimeException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="databaseServerException" label="数据库服务器" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.databaseServerException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="communicateServerException" label="通信服务器" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.communicateServerException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="applicationServerException" label="应用服务器" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.applicationServerException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="webServerException" label="WEB服务器" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.webServerException)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="workStation" label="工作站" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.workStation)}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="图形、报表及数据情况" align="center">
            <el-table-column label="工况" align="center">
              <el-table-column prop="changtongRateException" label="畅通率表" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.changtongRateException)}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="voltageException" label="电压表" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.voltageException)}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="voltageProcessLineException" label="电压过程线" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.voltageProcessLineException)}}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="雨量" align="center">
              <el-table-column prop="dayRainReportException" label="日雨量报表" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.dayRainReportException)}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="rainBarException" label="雨量棒图" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.rainBarException)}}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="潮水位" align="center">
              <el-table-column prop="daySeaLevelReportException" label="日潮水位表" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.daySeaLevelReportException)}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="seaLeveProcessLineException" label="潮水位过程线" align="center">
                <template slot-scope="scope">
                  <div>{{getFormate2(scope.row.seaLeveProcessLineException)}}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="otherReportException" label="其他图形及报表" align="center">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.otherReportException)}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="createBy" label="签名" align="center"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column fixed="right" width="100" label="操作" align="center">
            <template slot-scope="scope">
              <div class="btn01 vtn" @click="editclick(scope.row)">编辑</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="reportIdea" style="font-size: 14px;line-height: 15px;">
        <p>说明：1、汛期每日检查并填写，非汛期工作日内检查并填写。</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2、情况正常划“√”，出现故障划“×”，情况疑问需要核实划“？”。</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3、对有疑问的情况应及时检查，并判断是否存在故障，若确定为故障，请把处理方式及结果记录到附件2或3中；若确定情况正常，请将检查情况记录到情况说明中。</p>
      </div>
      <!-- 修改的弹窗 -->
      <el-dialog title="编辑日常维护记录数据" :visible.sync="edit" @close="handleClose" width="40%">
        <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="机房温湿度">
            <el-select style="width:90%;" v-model="tempHuimidityException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务器时间">
            <el-select style="width:90%;" v-model="serverTimeException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据库服务器">
            <el-select style="width:90%;" v-model="databaseServerException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通信服务器">
            <el-select style="width:90%;" v-model="communicateServerException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用服务器">
            <el-select style="width:90%;" v-model="applicationServerException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="WEB服务器">
            <el-select style="width:90%;" v-model="webServerException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作站">
            <el-select style="width:90%;" v-model="workStation" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="畅通率表">
            <el-select style="width:90%;" v-model="changtongRateException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电压表">
            <el-select style="width:90%;" v-model="voltageException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电压过程线">
            <el-select style="width:90%;" v-model="voltageProcessLineException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日雨量报表">
            <el-select style="width:90%;" v-model="dayRainReportException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="雨量棒图">
            <el-select style="width:90%;" v-model="rainBarException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日潮水位表">
            <el-select style="width:90%;" v-model="daySeaLevelReportException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="潮水位过程线">
            <el-select style="width:90%;" v-model="seaLeveProcessLineException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他图形及报表">
            <el-select style="width:90%;" v-model="otherReportException" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签名" prop="createBy">
            <el-select style="width:90%;" v-model="addform.createBy" multiple placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="edit = false">取消</el-button>
          <el-button type="primary" @click="editDo">保存</el-button>
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
        createBy: [{ required: true, message: "请选择签名", trigger: "change" }]
      },
      datetimes: this.formatDate(new Date()),
      clientHeight: document.body.clientHeight,
      options: [
        {
          value: 1,
          label: "√"
        },
        {
          value: -1,
          label: "×"
        }
      ],
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
      rows: [],

      dialogVisible: false,
      edit: false,
      tempHuimidityException: null,
      serverTimeException: null,
      databaseServerException: null,
      communicateServerException: null,
      webServerException: null,
      changtongRateException: null,
      applicationServerException: null,
      voltageException: null,
      workStation: null,
      dayRainReportException: null,
      voltageProcessLineException: null,
      rainBarException: null,
      daySeaLevelReportException: null,
      seaLeveProcessLineException: null,
      otherReportException: null,
      addform: {
        createBy: []
      },
      reportId: "",
      loading: false
    };
  },
  mounted() {
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    // dealWithTime(val) {
    //   let formatDateTime;
    //   let D = val.getDate();
    //   formatDateTime =
    //   D + "日 ";
    //   return formatDateTime;
    // },

    // 渲染页面√格式转换
    getFormate2(val) {
      let str = "";
      let str1 = "√";
      let str2 = "×";
      if (val == 1) {
        str = str1;
      } else {
        str = str2;
      }
      return str;
    },
    //时间格式处理
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //获取所有数据接口
    getAll() {
      this.loading = true;
      console.log(this.loading);
      this.$fetchGet("manageMantain/selectByDate?date=" + this.datetimes)
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    },
    //导出excel接口
    addexcel() {
      window.open("/sq/manageMantain/getExcel?date=" + this.datetimes);
    },
    //编辑点击操作
    editclick(row) {
      this.edit = true;
      this.reportId = row.reportId;
      this.tempHuimidityException = row.tempHuimidityException;
      this.serverTimeException = row.serverTimeException;
      this.databaseServerException = row.databaseServerException;
      this.communicateServerException = row.communicateServerException;
      this.webServerException = row.webServerException;
      this.changtongRateException = row.changtongRateException;
      this.applicationServerException = row.applicationServerException;
      this.voltageException = row.voltageException;
      this.dayRainReportException = row.dayRainReportException;
      this.rainBarException = row.rainBarException;
      this.daySeaLevelReportException = row.daySeaLevelReportException;
      this.seaLeveProcessLineException = row.seaLeveProcessLineException;
      this.otherReportException = row.otherReportException;
      this.voltageProcessLineException = row.voltageProcessLineException;
      this.addform.createBy = row.createBy == "" ? [] : row.createBy.split(",");
      this.workStation = row.workStation;
    },
    //关闭弹窗
    handleClose() {
      this.$refs.addform.resetFields();
    },
    //编辑操作接口
    editDo() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          this.$fetchPost(
            "manageMantain/update",
            {
              report_id: this.reportId,
              temp_huimidity_exception: this.tempHuimidityException,
              server_time_exception: this.serverTimeException,
              database_server_exception: this.databaseServerException,
              communicate_server_exception: this.communicateServerException,
              web_server_exception: this.webServerException,
              changtong_rate_exception: this.changtongRateException,
              application_server_exception: this.applicationServerException,
              voltage_exception: this.voltageException,
              day_rain_report_exception: this.dayRainReportException,
              rain_bar_exception: this.rainBarException,
              day_sea_level_report_exception: this.daySeaLevelReportException,
              sea_leve_process_line_exception: this.seaLeveProcessLineException,
              other_report_exception: this.otherReportException,
              voltage_process_line_exception: this.voltageProcessLineException,
              create_by: this.addform.createBy.join(","),
              work_station: this.workStation
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
                this.getAll();
              } else {
                this.$message.error("编辑失败");
              }
              // this.getAll();
            })
            .catch(function(error) {
              // console.log(error);
            });
        } else {
          alert("请完善信息!!");
          return false;
        }
      });
    },
    //查询接口
    searchclick() {
      this.$fetchGet("manageMantain/selectByDate?date=" + this.datetimes)
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    }
  }
};
</script>
<style type="text/css">
.heading {
  font-size: 24px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(0, 71, 157, 1);
}
.tableHeading {
  font-size: 18px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(0, 71, 157, 1);
}
.selectedmonth .el-input--small .el-input__inner {
  width: 171px;
  height: 30px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 6px;
}
.el-input__inner {
  height: 30px;
}
.sectionTable .el-table thead .el-table th,
.el-table tr {
  height: 50px;
  border-radius: 6px;
}
.sectionTable .el-table thead {
  border-radius: 6px;
}
.sectionTable .el-table--enable-row-transition .el-table__body td {
  font-size: 14px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(105, 105, 105, 1);
  line-height: 50px;
  height: 50px;
}
.sectionTable .el-table thead.is-group th {
  border: 1px solid white !important;
  text-align: center !important;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  line-height: 24px;
}
.sectionTable .el-table .cell {
  text-align: center;
  cursor: pointer;
}
.el-table .cell .btn01 {
  width: 35px;
}
.sectionTable .vtn {
  width: 70px !important;
}
.sectionTable tbody .el-table__row tr {
  height: 50px;
}
.sectionTable .el-table__header-wrapper {
  border: 1px solid;
}
.sectionTable .el-table td div {
  height: 50px;
}
.sectionTable .el-table th,
.el-table tr {
  height: 50px !important;
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
.sectionTable {
  width: 100%;
}
.sectionTable .el-table {
  margin-left: 0px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}
.reportIdea {
  flex: 1;
  color: #666666;
  text-align: left;
  margin-left: 20px;
}
.btn01 {
  height: 40px;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(33, 140, 246, 1);
  line-height: 40px;
  cursor: pointer;
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
.demonstration {
  width: 40px;
  height: 35px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 35px;
  margin-left: 10px;
}
.selectedmonth {
  width: 171px;
  height: 30px;
  margin-right: 33px;
}
.dc {
  border-radius: 8px;
  font-size: 16px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3px;
  text-align: center;
}

</style>

