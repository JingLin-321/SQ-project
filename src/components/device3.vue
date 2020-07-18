<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian">
      <span>运维记录 /</span>应用程序及设备故障登记表（附件三）
    </div>
    <div class="conMain">
      <div class="heading">上海市水情自动测报系统分中心站应用程序及设备故障登记表</div>
      <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
      <!-- 上方查询按钮 -->
      <div class="block">
        <div class="top-left">
          <div class="demonstration2">应用程序或设备名称:</div>
          <div class="selectedmonth1">
            <el-select
              v-model="input"
              filterable
              clearable
              placeholder="请输入应用程序或设备名称"
              @change="searchclick()"
            >
              <el-option
                v-for="item in rows4"
                :key="item.applicationEquipTypeId"
                :label="item.errorName"
                :value="item.errorName"
              ></el-option>
            </el-select>
          </div>
          <span class="demonstration1">发生时间:</span>
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
      <div class="sectionTable section1" style="text-align: center;">
        <el-table
          :data="rows"
          :height="(clientHeight-360)"
          empty-text="暂无数据"
          border
          style="border-radius:6px;"
        >
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column
            prop="applicationEquipName"
            label="应用程序或设备名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="brokenHappenTime"
            label="发生时间"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{scope.row.brokenHappenTime==undefined?"":scope.row.brokenHappenTime.substr(8,2)+'日'+scope.row.brokenHappenTime.substr(11,2)+'时'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="brokenSituation"
            label="故障现象"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="brokenResponseTime"
            label="故障响应上报时间"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{scope.row.brokenResponseTime==undefined?"":scope.row.brokenResponseTime.substr(8,2)+'日'+scope.row.brokenResponseTime.substr(11,2)+'时'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="brokenResolveTime"
            label="解决时间"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{scope.row.brokenResolveTime==undefined?"":scope.row.brokenResolveTime.substr(8,2)+'日'+scope.row.brokenResolveTime.substr(11,2)+'时'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="brokenResolveCreateTime"
            label="抢修情况上报时间"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{scope.row.brokenResolveCreateTime==undefined?"":scope.row.brokenResolveCreateTime.substr(8,2)+'日'+scope.row.brokenResolveCreateTime.substr(11,2)+'时'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="resolveMethod"
            label="处理方式"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createBy"
            label="故障处理人"
            align="center"
          ></el-table-column>
          <el-table-column prop="remark"  label="备注" align="center"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column  fixed="right" width="100" label="操作"  align="center">
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
        <p>说明：1、如本月无故障发生，请在表格首行填写“无故障发生”。</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2、填写的时间应精确到小时，如：“10日12时”</p>
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
      <el-dialog title="编辑应用程序及设备故障登记数据" :visible.sync="edit" @close="handleClose" width="40%">
        <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="应用程序或设备名称" prop="applicationEquipName">
            <el-select style="width:90%;" v-model="addform.applicationEquipName" placeholder="请选择" @change="EquipName">
              <el-option
                v-for="(item,index) in rows4"
                :key="index"
                :label="item.errorName"
                :value="item.errorName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发生时间" prop="brokenHappenTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenHappenTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="故障现象" prop="brokenSituation">
            <el-input style="width:90%;" maxlength="200" v-model="addform.brokenSituation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="故障响应上报时间" prop="brokenResponseTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResponseTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="解决时间" prop="brokenResolveTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResolveTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="抢修情况上报时间" prop="brokenResolveCreateTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResolveCreateTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="处理方式" prop="resolveMethod">
            <el-input style="width:90%;" maxlength="200" v-model="addform.resolveMethod" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="故障处理人" prop="createBy">
            <el-select style="width:90%;" v-model="addform.createBy" multiple placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input style="width:90%;" v-model="remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="edit = false">取消</el-button>
          <el-button type="primary" @click="editDo">保存</el-button>
        </div>
      </el-dialog>
      <!-- 增加的弹窗 -->
      <el-dialog title="添加应用程序及设备故障登记数据" :visible.sync="add" @close="handleClose" width="40%">
        <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="应用程序或设备名称" prop="applicationEquipName">
            <el-select style="width:90%;" v-model="addform.applicationEquipName" placeholder="请选择" @change="EquipName">
              <el-option
                v-for="(item,index) in rows4"
                :key="index"
                :label="item.errorName"
                :value="item.errorName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发生时间" prop="brokenHappenTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenHappenTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="故障现象" prop="brokenSituation">
            <el-input style="width:90%;" v-model="addform.brokenSituation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="故障响应上报时间" prop="brokenResponseTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResponseTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="解决时间" prop="brokenResolveTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResolveTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="抢修情况上报时间" prop="brokenResolveCreateTime">
            <el-date-picker
            style="width:90%;"
              v-model="addform.brokenResolveCreateTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日 HH 时"
              value-format="yyyy-MM-dd HH"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="处理方式" prop="resolveMethod">
            <el-input style="width:90%;" v-model="addform.resolveMethod" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="故障处理人" prop="createBy">
            <el-select style="width:90%;" v-model="addform.createBy" multiple placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input style="width:90%;" v-model="remark" autocomplete="off"></el-input>
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
        applicationEquipName: [
          {
            required: true,
            message: "请选择应用程序或设备名称",
            trigger: "change"
          }
        ],
        brokenHappenTime: [
          { required: true, message: "请选择发生时间", trigger: "change" }
        ],
        brokenSituation: [
          { required: true, message: "请选择故障现象", trigger: "blur" }
        ],
        brokenResponseTime: [
          {
            required: true,
            message: "请选择故障响应上报时间",
            trigger: "change"
          }
        ],
        brokenResolveTime: [
          { required: true, message: "请选择解决时间", trigger: "change" }
        ],
        brokenResolveCreateTime: [
          {
            required: true,
            message: "请选择抢修情况上报时间",
            trigger: "change"
          }
        ],
        resolveMethod: [
          { required: true, message: "请选择处理方式", trigger: "blur" }
        ],
        createBy: [
          {
            required: true,
            message: "请选择故障处理人",
            trigger: "change"
          }
        ]
      },
      clientHeight: document.body.clientHeight,
      datetimes: this.formatDate(new Date()),
      istime: 1,
      rows3: [],
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
      rows4: [],
      dialogVisible: false,
      add: false,
      edit: false,
      addform: {
        applicationEquipName: "",
        brokenHappenTime: "",
        brokenSituation: "",
        brokenResponseTime: "",
        brokenResolveTime: "",
        brokenResolveCreateTime: "",
        resolveMethod: "",
        createBy: []
      },
      remark: "",
      input: "",
      rows1: [],
      input1: ""
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
    this.goRun();
    this.goEquip();
    this.goFirst();
  },
  methods: {
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //获取所有数据的接口
    getAll() {
      this.$fetchGet("stationBroken/getAll?createDate=" + this.datetimes)
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //设备异常下拉框
    goRun() {
      this.$fetchGet("dropdown/getEqError")
        .then(response => {
          this.rows3 = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //应用设备下拉框
    goEquip() {
      this.$fetchGet("dropdown/getSeError")
        .then(response => {
          this.rows4 = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //触发添加按钮
    addclick(row) {
      this.addform.applicationEquipName = "";
      this.addform.brokenHappenTime = "";
      this.addform.brokenSituation = "";
      this.addform.brokenResponseTime = "";
      this.addform.brokenResolveTime = "";
      this.addform.brokenResolveCreateTime = "";
      this.addform.resolveMethod = "";
      this.addform.createBy = [];
      this.remark = "";
      this.applicationEquipTypeId = "";
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
      this.reportId = row.reportId;
      this.addform.applicationEquipName = row.applicationEquipName;
      this.addform.brokenHappenTime = row.brokenHappenTime;
      this.addform.brokenSituation = row.brokenSituation;
      this.addform.brokenResponseTime = row.brokenResponseTime;
      this.addform.brokenResolveTime = row.brokenResolveTime;
      this.addform.brokenResolveCreateTime = row.brokenResolveCreateTime;
      this.addform.resolveMethod = row.resolveMethod;
      this.addform.createBy = row.createBy.split(",");
      this.remark = row.remark;
      this.applicationEquipTypeId = row.applicationEquipTypeId;
    },
    //删除的接口
    deleteclik() {
      this.$fetchGet(`stationBroken/delete?reportId=${this.reportId}`)
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
    //添加的接口
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
            "stationBroken/insert",
            {
              application_equip_name: this.addform.applicationEquipName,
              broken_happen_time: this.addform.brokenHappenTime,
              broken_situation: this.addform.brokenSituation,
              broken_response_time: this.addform.brokenResponseTime,
              broken_resolve_time: this.addform.brokenResolveTime,
              broken_resolve_create_time: this.addform.brokenResolveCreateTime,
              resolve_method: this.addform.resolveMethod,
              create_by: str,

              application_equip_type_id: this.applicationEquipTypeId,
              remark: this.remark
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
            message: "请完善信息!",
            type: "warning"
          });
          return false;
        }
      });
    },
    //编辑的接口
    editDo() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          this.$fetchPost(
            "stationBroken/update",
            {
              application_equip_name: this.addform.applicationEquipName,
              broken_happen_time: this.addform.brokenHappenTime,
              broken_situation: this.addform.brokenSituation,
              broken_response_time: this.addform.brokenResponseTime,
              broken_resolve_time: this.addform.brokenResolveTime,
              broken_resolve_create_time: this.addform.brokenResolveCreateTime,
              resolve_method: this.addform.resolveMethod,
              create_by: this.addform.createBy.join(","),
              report_id: this.reportId,
              remark: this.remark,

              application_equip_type_id: this.applicationEquipTypeId
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
            message: "请完善信息!",
            type: "warning"
          });
          return false;
        }
      });
    },
    //导出excel
    addexcel() {
      window.open("/sq/stationBroken/getExcel?createDate=" + this.datetimes, {
        params: {
          applicationEquipName: this.input
        }
      });
    },
    //测站信息接口
    goFirst() {
      this.$fetchGet("dropdown/getStation")
        .then(response => {
          this.rows1 = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //选择测站的change事件
    station(e) {
      this.rows1.map((item, i) => {
        if (item.stationName == e) {
          this.stationCode = parseInt(item.stationCode); //传值
        }
      });
    },
    //选择应用设备的change事件
    EquipName(e) {
      this.rows4.map((item, i) => {
        if (item.brokenAccording == e) {
          this.applicationEquipTypeId = item.brokenAccordingId; //传值
        }
      });
    },
    //查询接口
    searchclick() {
      this.$fetchGet("stationBroken/getAll?createDate=" + this.datetimes, {
        applicationEquipName: this.input
      })
        .then(response => {
          this.rows = response;
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
  width: 160px;
  height: 30px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 6px;
}
.block .el-input__inner {
  width: 160px;
  height: 30px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 6px;
}
.sectionTable .el-table thead .el-table th,
.el-table tr {
  height: 50px;
  border-radius: 6px;
}
.sectionTable .el-table thead {
  border-radius: 6px;
}
.sectionTable .el-table td,
.el-table th.is-leaf {
  border: none;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.sectionTable .el-table--border::after,
.el-table--group::after,
.el-table::before {
  display: none;
}
.sectionTable .el-table thead.is-group th {
  background: rgba(228, 240, 252, 1);
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.sectionTable .el-table th, .el-table tr{
background: rgba(228, 240, 252, 1);
}
.sectionTable .el-table--border,
.el-table--group {
  border: none;
}
</style>
<style type="text/css" scoped>
.container123 {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
.sectionTable {
  margin-right: 30px;
}
.section1 .el-table {
  margin-left: 16px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
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
  /* width: 40px; */
  height: 40px;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(246, 89, 82, 1);
  line-height: 40px;
  cursor: pointer;
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
.demonstration2 {
  width: 150px;
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

