<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian"><span>运维记录 /</span>测站设备变更记录表（附件八）</div>
    <div class="conMain">
    <div class="heading">上海市水情自动测报系统分中心站及测站设备变更记录表</div>
    <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
    <!-- 上方查询按钮 -->
    <div class="block">
      <div class="top-left">
      <div class="demonstration">站名:</div>
      <div class="selectedmonth1">
        <el-select v-model="input" filterable clearable placeholder="请输入站名" @change="searchclick()">
          <el-option v-for="item in rows1" :key="item" :label="item" :value="item"></el-option>
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
    <div class="sectionTable" style="text-align: center;">
      <el-table
        :data="rows"
        :height="(clientHeight-350)"
        empty-text="暂无数据"
        border
        style="border-radius:6px;"
      >
        <el-table-column label="序号" type="index"  align="center"></el-table-column>
        <el-table-column prop="stationName"  label="站名" align="center"></el-table-column>
        <el-table-column prop="replaceDate"  label="日期" align="center"></el-table-column>
        <el-table-column
          prop="originDeviceName"
          label="原设备名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="originDeviceTypeCode"
          label="原设备型号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="originDeviceCode"
          label="原设备编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="originOrgName"
          label="资产归属"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="newDeviceName"
          label="现设备名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="newDeviceCode"
          label="现设备型号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="newDeviceTypeCode"
          label="现设备编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="newOrgName"
          label="资产归属"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="replaceReason"
          label="更换原因"
          align="center"
        ></el-table-column>
        <el-table-column prop="createBy"  label="填报人" align="center"></el-table-column>
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
      <p>说明：1、如当月无设备更换，请在表格首行填写“无设备更换”。</p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2、“原设备编号”“现设备编号”均填写设备自带编号，无编号的设备可不填写编号。</p>
    </div>
    <!-- 删除的弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <span>确认删除记录吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteclik()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的弹窗 -->
    <el-dialog title="编辑测站设备变更数据" :visible.sync="edit" @close="handleClose" width="40%">
      <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="站名">
          <el-select
          style="width:90%;"
            :disabled="istrue"
            v-model="addform.stationName"
            placeholder="请选择"
            @change="goIndex1"
          >
            <el-option v-for="item in rows1" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
          style="width:90%;"
            :disabled="istrue"
            v-model="addform.replaceDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="原设备名称">
          <el-select
          style="width:90%;"
            :disabled="istrue"
            v-model="addform.originDeviceName"
            placeholder="请选择"
            @change="goIndex2"
          >
            <el-option v-for="item in staData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原设备型号">
          <el-input style="width:90%;" :disabled="istrue" v-model="originDeviceTypeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原设备编号">
          <el-input style="width:90%;" :disabled="istrue" v-model="originDeviceCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产归属">
          <el-input style="width:90%;" :disabled="istrue" v-model="originOrgName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现设备名称">
          <el-input style="width:90%;" :disabled="istrue" v-model="newDeviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现设备型号">
          <el-input style="width:90%;" :disabled="istrue" v-model="newDeviceCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现设备编号">
          <el-input style="width:90%;" :disabled="istrue" v-model="newDeviceTypeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产归属">
          <el-input style="width:90%;"  :disabled="istrue" v-model="newOrgName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更换原因" prop="replaceReason">
          <el-input style="width:90%;" maxlength="300" v-model="addform.replaceReason" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="填报人" prop="createBy">
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
    <!-- 增加的弹窗 -->
    <el-dialog title="增加测站设备变更数据" :visible.sync="add" @close="handleClose" width="40%">
      <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
        <el-form-item label="站名" prop="stationName">
          <el-select style="width:90%;" v-model="addform.stationName" placeholder="请选择" @change="goIndex1">
            <el-option v-for="item in rows1" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="replaceDate">
          <el-date-picker
          style="width:90%;"
            v-model="addform.replaceDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="原设备名称" prop="originDeviceName">
          <el-select style="width:90%;" v-model="addform.originDeviceName" placeholder="请选择" @change="goIndex2">
            <el-option v-for="item in staData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原设备资产编号" prop="originDatabaseId">
          <el-select style="width:90%;" v-model="addform.originDatabaseId" placeholder="请选择" @change="goIndex3">
            <el-option
              v-for="item in originData"
              :key="item.propertyCode"
              :label="item.propertyCode"
              :value="item.propertyCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="新设备资产编号" prop="newDatabaseId">
          <el-select style="width:90%;" v-model="addform.newDatabaseId" placeholder="请选择">
            <el-option
              v-for="item in dataBase"
              :key="item.propertyCode"
              :label="item.propertyCode"
              :value="item.propertyCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原设备替换状态" prop="originDatabaseStatus">
          <el-select style="width:90%;" v-model="addform.originDatabaseStatus" placeholder="请选择">
            <el-option
              v-for="item in baseStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更换原因" prop="replaceReason">
          <el-input style="width:90%;" maxlength="300" v-model="addform.replaceReason" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="填报人" prop="createBy">
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
        replaceDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        originDeviceName: [
          { required: true, message: "请选择原设备名称", trigger: "change" }
        ],
        originDatabaseId: [
          {
            required: true,
            message: "请选择原设备资产编号",
            trigger: "change"
          }
        ],
        newDatabaseId: [
          {
            required: true,
            message: "请选择新设备资产编号",
            trigger: "change"
          }
        ],
        originDatabaseStatus: [
          {
            required: true,
            message: "请选择原设备替换状态",
            trigger: "change"
          }
        ],
        replaceReason: [
          {
            required: true,
            message: "请输入更换原因",
            trigger: "blur"
          }
        ],
        createBy: [
          {
            required: true,
            message: "请选择填报人",
            trigger: "change"
          }
        ]
      },
      clientHeight: document.body.clientHeight,
      datetimes: this.formatDate(new Date()),
      baseStatus: [
        {
          label: "备用",
          value: 0
        },
        {
          label: "已使用",
          value: 1
        },
        {
          label: "维修中",
          value: 2
        },
        {
          label: "已报废",
          value: 3
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
      add: false,
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      istrue: true,
      edit: false,
      rows1: [],
      addform: {
        stationName: "",
        originDatabaseStatus: null,
        replaceDate: "",
        originDeviceName: "",
        originDatabaseId: "",
        newDatabaseId: "",
        replaceReason: "",
        createBy: ""
      },
      originDeviceCode: "",
      originDeviceTypeCode: "",
      originOrgName: "",
      newDeviceName: "",
      newDeviceCode: "",
      newDeviceTypeCode: "",
      newOrgName: "",
      staData: [],
      originData: [],
      dataBase: []
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
      this.$fetchGet("recordDevice/getAll")
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    },
    //excel导出
    addexcel() {
      window.open(
        "/sq/recordDevice/getExcel?createDate=" +
          this.datetimes +
          "&stationName = " +
          this.input,
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            stationName: this.input,
            alterType: this.input1
          }
        }
      );
    },
    //测站信息下拉框
    goFirst() {
      this.$fetchGet("dropdown/getDatabaseStationName")
        .then(response => {
          this.rows1 = response;
        })
        .catch(function(error) {});
    },
    //触发添加按钮
    addclick(row) {
      this.addform.stationName = "";
      this.addform.replaceDate = "";
      this.addform.originDeviceName = "";
      this.originDeviceCode = "";
      this.originDeviceTypeCode = "";
      this.addform.originDatabaseStatus = "";
      this.originOrgName = "";
      this.newDeviceName = "";
      this.newDeviceCode = "";
      this.newDeviceTypeCode = "";
      this.newOrgName = "";
      this.addform.replaceReason = "";
      this.addform.originDatabaseId = "";
      this.addform.newDatabaseId = "";
      this.addform.createBy = [];
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
      this.addform.stationName = row.stationName;
      this.addform.replaceDate = row.replaceDate;
      this.addform.originDeviceName = row.originDeviceName;
      this.originDeviceCode = row.originDeviceCode;
      this.addform.originDatabaseStatus = row.originDatabaseStatus;
      this.originDeviceTypeCode = row.originDeviceTypeCode;
      this.originOrgName = row.originOrgName;
      this.newDeviceName = row.newDeviceName;
      this.newDeviceCode = row.newDeviceCode;
      this.newDeviceTypeCode = row.newDeviceTypeCode;
      this.newOrgName = row.newOrgName;
      this.addform.replaceReason = row.replaceReason;
      this.addform.originDatabaseId = row.originDatabaseId;
      this.addform.newDatabaseId = row.newDatabaseId;
      this.addform.createBy = row.createBy == "" ? [] : row.createBy.split(",");
    },
    //删除接口
    deleteclik() {
      this.$fetchGet(`recordDevice/delete?reportId=${this.reportId}`)
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
    //添加接口
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
            "recordDevice/insert",
            {
              station_name: this.addform.stationName,
              replace_date: this.addform.replaceDate,

              origin_device_name: this.addform.originDeviceName,
              origin_device_code: this.originDeviceCode,
              origin_device_type_code: this.originDeviceTypeCode,
              origin_database_status: this.addform.originDatabaseStatus,
              origin_org_name: this.originOrgName,
              new_device_name: this.newDeviceName,
              new_device_code: this.newDeviceCode,
              new_device_type_code: this.newDeviceTypeCode,
              new_org_name: this.newOrgName,
              replace_reason: this.addform.replaceReason,
              origin_database_id: this.addform.originDatabaseId,
              new_database_id: this.addform.newDatabaseId,
              create_by: str
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
    //编辑接口
    editDo() {
      this.$refs["addform"].validate(valid => {
        if (valid) {
          this.$fetchPost(
            "recordDevice/update",
            {
              report_id: this.reportId,
              station_name: this.addform.stationName,
              replace_date: this.addform.replaceDate,

              origin_device_name: this.addform.originDeviceName,
              origin_device_code: this.originDeviceCode,
              origin_device_type_code: this.originDeviceTypeCode,
              origin_database_status: this.addform.originDatabaseStatus,
              origin_org_name: this.originOrgName,
              new_device_name: this.newDeviceName,
              new_device_code: this.newDeviceCode,
              new_device_type_code: this.newDeviceTypeCode,
              new_org_name: this.newOrgName,
              replace_reason: this.addform.replaceReason,
              origin_database_id: this.addform.originDatabaseId,
              new_database_id: this.addform.newDatabaseId,
              create_by: this.addform.createBy.join(",")
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
    //查询接口
    searchclick() {
      this.$fetchGet(
        "recordDevice/getAll?createDate=" +
          this.datetimes +
          "&&stationName=" +
          this.input
      )
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    },
    //选择测站触发的change事件
    goIndex1() {
      this.$fetchGet(
        "dropdown/getSensorTypeName?stationName=" + this.addform.stationName
      )
        .then(response => {
          this.staData = response;
        })
        .catch(function(error) {});
    },
    //选择原设备名称触发的change事件
    goIndex2() {
      this.$fetchGet("recordDevice/getOriginDatabase", {
        originDeviceName: this.addform.originDeviceName,
        manageOrgName: this.addform.stationName
      })
        .then(response => {
          this.originData = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //选择原设备ID触发的change事件
    goIndex3() {
      this.$fetchGet("recordDevice/getNewDatabase")
        .then(response => {
          this.dataBase = response;
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
.sectionTable .el-table td div {
  line-height: 50px;
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
  width: 160px;
  height: 30px;
  margin-right: 20px;
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


