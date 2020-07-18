<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian"><span>运维记录 /</span>雨量计滴水实验记录表（附件六）</div>
    <div class="conMain">
    <div class="heading">上海市水情自动测报系统雨量计滴水实验记录表</div>
    <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
    <!-- 上方查询按钮 -->
    <div class="block">
      <div class="top-left">
      <div class="demonstration">站名:</div>
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
      <el-button class="addmess" type="primary" @click="addclick()">增加信息</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="sectionTable">
      <el-table
        :data="rows"
        :height="(clientHeight-320)"
        empty-text="暂无数据"
        border
        style="border-radius:6px;"
      >
        <el-table-column
          prop="stationName"
          label="测站名称"
          align="center"
        ></el-table-column>
        <el-table-column label="实验日期   (年/月/日)" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.createTime.substr(0,10)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceTypeCode"
          label="仪器型号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="deviceCode"
          label="仪器编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间   (时:分:秒)"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{scope.row.startTime.substr(10,18)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间   (时:分:秒)"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{scope.row.endTime.substr(10,18)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="timeDuration"
          label="时间长度   (时:分:秒)"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{scope.row.timeDuration.substr(10,18)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="waterPoll"
          label="注入水量(mm)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="waterPollStrength"
          label="滴水强度(mm/min)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="waterDisplay"
          label="显示水量(mm)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="errorValue"
          label="误差值(%)"
          align="center"
        ></el-table-column>
        <el-table-column prop="createBy" label="记录人" align="center"></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column fixed="right" width="100" label="操作" align="center">
          <template slot-scope="scope">
            <div class>
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
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="reportIdea" style="font-size: 14px;line-height: 15px;">
      <p>说明：汛前、汛后各做一次滴水实验，必要时可加做滴水实验，每次滴水实验要求大、小雨强各做一次。</p>
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
    <el-dialog title="编辑雨量计滴水实验数据" :visible.sync="edit" @close="handleClose" width="40%">
      <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="测站名称" prop="stationName">
          <el-select
          style="width:90%;"
            maxlength="16"
            v-model="addform.stationName"
            placeholder="请选择"
            @change="station"
          >
            <el-option
              v-for="item in rows1"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验日期(年/月/日)" prop="createTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.createTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="仪器型号" prop="deviceTypeCode">
          <el-input style="width:90%;" maxlength="16" v-model="addform.deviceTypeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仪器编号" prop="deviceCode">
          <el-input style="width:90%;" maxlength="16" v-model="addform.deviceCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间(时:分:秒)" prop="startTime">
          <el-time-picker
          style="width:90%;"
            v-model="addform.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间(时:分:秒)" prop="endTime">
          <el-time-picker
          style="width:90%;"
            v-model="addform.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="时间长度(时:分:秒)" prop="timeDuration">
          <el-time-picker
          style="width:90%;"
            v-model="addform.timeDuration"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="注入水量(mm)" prop="waterPoll">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterPoll"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="滴水强度(mm/min)" prop="waterPollStrength">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterPollStrength"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示水量(mm)" prop="waterDisplay">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterDisplay"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="误差值(%)" prop="errorValue">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.errorValue"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="记录人" prop="createBy">
          <el-select style="width:90%;" maxlength="16" v-model="addform.createBy" multiple placeholder="请选择">
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
    <!-- 增加的弹窗 -->
    <el-dialog title="增加雨量计滴水实验数据" :visible.sync="add" @close="handleClose" width="40%">
      <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="测站名称" prop="stationName">
          <el-select
          style="width:90%;"
            maxlength="16"
            v-model="addform.stationName"
            placeholder="请选择"
            @change="station"
          >
            <el-option
              v-for="item in rows1"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验日期(年/月/日)" prop="createTime">
          <el-date-picker
          style="width:90%;"
            v-model="addform.createTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="仪器型号" prop="deviceTypeCode">
          <el-input style="width:90%;" maxlength="16" v-model="addform.deviceTypeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仪器编号" prop="deviceCode">
          <el-input style="width:90%;" maxlength="16" v-model="addform.deviceCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间(时:分:秒)" prop="startTime">
          <el-time-picker
          style="width:90%;"
            v-model="addform.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间(时:分:秒)" prop="endTime">
          <el-time-picker
          style="width:90%;"
            v-model="addform.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="时间长度(时:分:秒)" prop="timeDuration">
          <el-time-picker
          style="width:90%;"
            v-model="addform.timeDuration"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>

        <el-form-item label="注入水量(mm)" prop="waterPoll">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterPoll"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="滴水强度(mm/min)" prop="waterPollStrength">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterPollStrength"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示水量(mm)" prop="waterDisplay">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.waterDisplay"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="误差值(%)" prop="errorValue">
          <el-input
          style="width:90%;"
            type="number"
            v-model.number="addform.errorValue"
            :maxlength="16"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="记录人" prop="createBy">
          <el-select style="width:90%;" maxlength="16" v-model="addform.createBy" multiple placeholder="请选择">
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
        <el-button type="danger" @click="add = false">取消</el-button>
        <el-button type="primary" @click="addDo">保存</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
  </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      clientHeight: document.body.clientHeight,
      rules: {
        stationName: [
          { required: true, message: "请选择站名", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "请选择实验日期", trigger: "change" }
        ],
        deviceTypeCode: [
          { required: true, message: "请选择仪器型号", trigger: "blur" }
        ],
        deviceCode: [
          {
            required: true,
            message: "请选择仪器编号",
            trigger: "blur"
          }
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        timeDuration: [
          { required: true, message: "请选择时间长度", trigger: "change" }
        ],
        waterPoll: [
          {
            required: true,
            type: "number",
            message: "请选择注入水量",
            trigger: "blur"
          },
          { pattern: /^\d{1,100}(\.\d{1,2})?$/, message: "精确到两位小数点" }
        ],
        waterPollStrength: [
          {
            required: true,
            type: "number",
            message: "请选择滴水强度",
            trigger: "blur"
          },
          { pattern: /^\d{1,100}(\.\d{1,2})?$/, message: "精确到两位小数点" }
        ],
        waterDisplay: [
          {
            required: true,
            type: "number",
            message: "请选择显示水量",
            trigger: "blur"
          },
          { pattern: /^\d{1,100}(\.\d{1,2})?$/, message: "精确到两位小数点" }
        ],
        errorValue: [
          {
            required: true,
            type: "number",
            message: "请选择误差值",
            trigger: "blur"
          },
          { pattern: /^\d{1,100}(\.\d{1,2})?$/, message: "精确到两位小数点" }
        ],
        createBy: [
          { required: true, message: "请选择记录人", trigger: "change" }
        ]
      },
      rows: [],
      input: "",
      input1: "",
      reportId: "",
      stationId: null,
      dialogVisible: false,
      add: false,
      edit: false,
      addform: {
        createBy: [],
        createTime: "",
        stationName: "",
        deviceTypeCode: "",
        deviceCode: "",
        startTime: "",
        endTime: "",
        timeDuration: "",
        waterPoll: null,
        waterDisplay: "",
        errorValue: "",
        waterPollStrength: ""
      },
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
      rows1: [],
      datetimes: this.formatDate(new Date())
    };
  },
  mounted() {
    //适配页面
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  },
  created() {
    this.searchclick();
    this.goFirst();
  },
  methods: {
    //选择测站时触发的change事件
    station(e) {
      this.rows1.map((item, i) => {
        if (item.stationName == e) {
          this.stationId = parseInt(item.stationId); //传值
        }
      });
    },
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //获取所有数据的接口
    getAll() {
      this.$fetchGet("hyetometer/getAll", {
        datetimes: this.datetimes
      })
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
      let obj = {
        createTime: this.datetimes
      };
    },
    //触发添加按钮
    addclick(row) {
      this.addform.createBy = [];
      this.addform.createTime = "";
      this.addform.stationName = "";
      this.addform.deviceTypeCode = "";
      this.addform.deviceCode = "";
      this.addform.stationId = "";
      this.addform.startTime = "";
      this.addform.endTime = "";
      this.addform.timeDuration = "";
      this.addform.waterPoll = "";
      this.addform.waterPollStrength = "";
      this.addform.errorValue = "";
      this.addform.waterDisplay = "";
      this.add = true;
    },
    //触发删除按钮
    deleteclick(row) {
      this.dialogVisible = true;
      this.reportId = row.reportId;
    },
    //触发编辑按钮
    editclick(row) {
      this.edit = true;
      this.addform.createBy = row.createBy == "" ? [] : row.createBy.split(",");
      this.addform.createTime = row.createTime;
      this.addform.stationName = row.stationName;
      this.addform.deviceTypeCode = row.deviceTypeCode;
      this.addform.deviceCode = row.deviceCode;
      this.addform.startTime = row.startTime;
      this.addform.endTime = row.endTime;
      this.addform.timeDuration = row.timeDuration;
      this.addform.waterPoll = row.waterPoll;
      this.addform.waterPollStrength = row.waterPollStrength;
      this.addform.errorValue = row.errorValue;
      this.addform.waterDisplay = row.waterDisplay;
      this.reportId = row.reportId;
      this.stationId = parseInt(row.stationId);
    },
    //删除接口
    deleteclik() {
      this.$fetchGet(`hyetometer/deleteBy?reportId=${this.reportId}`)
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
    //导出excel
    addexcel() {
      window.open("/sq/hyetometer/getExcel?createTime=" + this.datetimes, {
        params: {
          stationName: this.input
        }
      });
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
          if (this.addform.createBy.length == 0) {
            str = "";
          } else {
            str = this.addform.createBy.join(",");
          }
          this.$fetchPost(
            "hyetometer/insert",
            {
              create_by: str,
              create_time: this.addform.createTime,
              station_name: this.addform.stationName,
              device_type_code: this.addform.deviceTypeCode,
              device_code: this.addform.deviceCode,
              start_time: this.addform.startTime,
              end_time: this.addform.endTime,
              time_duration: this.addform.timeDuration,
              water_poll: this.addform.waterPoll,
              water_poll_strength: this.addform.waterPollStrength,
              error_value: this.addform.errorValue,
              water_display: this.addform.waterDisplay,
              station_id: parseInt(this.stationId)
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
            "hyetometer/update",
            {
              report_id: this.reportId,
              create_by: this.addform.createBy.join(","),
              create_time: this.addform.createTime,
              station_name: this.addform.stationName,
              device_type_code: this.addform.deviceTypeCode,
              device_code: this.addform.deviceCode,
              start_time: this.addform.startTime,
              end_time: this.addform.endTime,
              time_duration: this.addform.timeDuration,
              water_poll: this.addform.waterPoll,
              water_poll_strength: this.addform.waterPollStrength,
              error_value: this.addform.errorValue,
              water_display: this.addform.waterDisplay,
              station_id: parseInt(this.stationId)
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
    //查询接口
    searchclick() {
      this.$fetchGet("hyetometer/getAll?createTime=" + this.datetimes, {
        stationName: this.input
      })
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    },
    //测站信息下拉框
    goFirst() {
      this.$fetchGet("dropdown/getStation")
        .then(response => {
          this.rows1 = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
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
  border:1px solid rgba(204,204,204,1);
border-radius:6px;
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
.reportIdea {
  flex: 1;
  color: #666666;
  text-align: left;
  margin-left: 20px;
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
  width: 171px;
  height: 30px;
  margin-right: 33px;
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
</style>

