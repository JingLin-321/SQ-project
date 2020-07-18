<template>
  <div>
    <div class="containerfgj">
      <!-- 表格 -->
      <div class="fujian"><span>设备配置 /</span>资产配置管理表</div>
      <div class="conMain">
      <!-- <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div> -->
      <div class="heading">资产配置管理表</div>
      <!-- 日期选择器 -->
      <div class="block">
        <div class="top-left">
        <div class="demonstration">设备名称:</div>
        <div class="selectedmonth">
          <!-- <el-input v-model="ModelTypeInput" @change="searchclick1()" placeholder="请输入设备名称"></el-input> -->

          <el-select
            v-model="ModelTypeInput"
            @change="searchclick1()"
            filterable
            placeholder="请选择设备名称"
          >
            <el-option
              v-for="item in typeNameOptions"
              :key="item.sensorTypeID"
              :label="item.sensorTypeName"
              :value="item.sensorTypeName"
            ></el-option>
          </el-select>
        </div>
        <span class="demonstration">所属测站:</span>
        <div class="selectedmonth">
          <!-- <el-input v-model="OrgNameInput" @change="searchclick2()" placeholder="请输入所属测站"></el-input> -->

          <el-select
            v-model="OrgNameInput"
            @change="searchclick2()"
            filterable
            placeholder="请选择所属测站"
          >
            <el-option
              v-for="item in orgNameOptions"
              :key="item.stationID"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </div>
        <span class="demonstration">设备状态:</span>
        <div class="selectedmonth">
          <el-select v-model="statusValue" @change="searchclick3()" placeholder="请选择设备状态">
            <el-option
              v-for="item in statusOptionsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        </div>
         <div class="top-right">
        <el-button class="addmess" type="primary" @click="addclick()">增加信息</el-button>
      </div>
      </div>

      <!-- 表格 -->
      <div class="sectionTable">
        <el-table
          :data="rows"
          border
          stripe
          empty-text="暂无数据"
          style="border-radius:6px;"
        >
          <el-table-column type="index"  label="序号" width="60"></el-table-column>
          <el-table-column prop="propertyCode"  label="资产编号"></el-table-column>
          <el-table-column prop="sensorTypeName"  label="设备名称"></el-table-column>
          <el-table-column prop="sensorCode"  label="设备编号"></el-table-column>
          <el-table-column prop="sensorModelType"  label="设备型号"></el-table-column>
          <el-table-column prop="sensorUseStatus"  label="设备状态">
            <template slot-scope="scope">
              <div v-if="scope.row.sensorUseStatus == 0 ">备品</div>
              <div v-if="scope.row.sensorUseStatus == 1 ">已安装</div>
              <div v-if="scope.row.sensorUseStatus == 2 ">维修中</div>
              <div v-if="scope.row.sensorUseStatus == 3 ">已报废</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="subordinateCompany"
            label="资产归属"
            width="140"
          ></el-table-column>
          <el-table-column prop="manageOrgName"  label="所属测站"></el-table-column>
          <el-table-column prop="createByName"  label="入库人"></el-table-column>
          <el-table-column prop="createTime"  label="入库时间" width="95">
            <template slot-scope="scope">
              <div>{{scope.row.createTime | formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="updateByName"  label="修改人"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="95">
            <template slot-scope="scope">
              <div>{{scope.row.updateTime | formatDate}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="remarks"  label="备注"></el-table-column>

          <!-- 操作按钮 -->
          <el-table-column label="操作" width="100">
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

        <div class="showAll">
          已查询到&nbsp;&nbsp;
          <span>{{showNum}}</span>&nbsp;&nbsp;条数据
        </div>
      </div>
    </div>

    <!-- 增加信息的弹框 -->
    <el-dialog
      title="增加信息"
      :visible.sync="dialogAddFormVisible"
      width="40%"
      @close="dialogAddVisibleClosed"
    >
      <el-form :model="AddForm" label-width="80px" ref="addFormRef" :rules="rulesOne">
        <el-form-item label="资产编号" prop="propertyCode">
          <el-input v-model="AddForm.propertyCode"></el-input>
        </el-form-item>

        <el-form-item label="设备名称" prop="sensorTypeId">
          <el-select v-model="AddForm.sensorTypeId" filterable placeholder="请选择设备名称">
            <el-option
              v-for="item in typeNameOptions"
              :key="item.sensorTypeID"
              :label="item.sensorTypeName"
              :value="item.sensorTypeID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备编号" prop="sensorCode">
          <el-input v-model="AddForm.sensorCode"></el-input>
        </el-form-item>

        <el-form-item label="设备型号" prop="sensorModelType">
          <el-input v-model="AddForm.sensorModelType"></el-input>
        </el-form-item>

        <el-form-item label="设备状态" prop="sensorUseStatus">
          <el-select v-model="AddForm.sensorUseStatus" placeholder="请选择设备状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产归属" prop="subordinateCompany">
          <el-input v-model="AddForm.subordinateCompany"></el-input>
        </el-form-item>

        <el-form-item label="所属测站">
          <el-select v-model="AddForm.manageOrgId" filterable placeholder="请选择所属测站">
            <el-option
              v-for="item in orgNameOptions"
              :key="item.stationID"
              :label="item.stationName"
              :value="item.stationID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model="AddForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFormVisible()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑信息的弹框 -->
    <el-dialog
      title="编辑信息"
      :visible.sync="dialogEditFormVisible"
      width="30%"
      @close="dialogEditVisibleClosed"
    >
      <el-form :model="editForm" label-width="80px" ref="editFormRef" :rules="rulesTwo">
        <el-form-item label="资产编号" prop="propertyCode">
          <el-input v-model="editForm.propertyCode" disabled></el-input>
        </el-form-item>

        <el-form-item label="设备名称" prop="sensorTypeId">
          <el-select v-model="editForm.sensorTypeId" filterable placeholder="请选择设备名称">
            <el-option
              v-for="item in typeNameOptions"
              :key="item.sensorTypeID"
              :label="item.sensorTypeName"
              :value="item.sensorTypeID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备编号" prop="sensorCode">
          <el-input v-model="editForm.sensorCode"></el-input>
        </el-form-item>

        <el-form-item label="设备型号" prop="sensorModelType">
          <el-input v-model="editForm.sensorModelType"></el-input>
        </el-form-item>

        <el-form-item label="设备状态" prop="sensorUseStatus">
          <el-select v-model="editForm.sensorUseStatus" placeholder="请选择设备状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产归属" prop="subordinateCompany">
          <el-input v-model="editForm.subordinateCompany"></el-input>
        </el-form-item>

        <el-form-item label="所属测站">
          <el-select v-model="editForm.manageOrgId" filterable placeholder="请选择所属测站">
            <el-option
              v-for="item in orgNameOptions"
              :key="item.stationID"
              :label="item.stationName"
              :value="item.stationID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditFormVisible()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import { formatDate } from "./data.js";

export default {
  data() {
    return {
      ModelTypeInput: "", //类型搜索input
      OrgNameInput: "", //所属测站搜索input
      statusValue: 0, //设备状态
      typeNameOptions: [],
      statusOptions: [
        {
          value: "0",
          label: "备品"
        },
        {
          value: "1",
          label: "已安装"
        },
        {
          value: "2",
          label: "维修中"
        },
        {
          value: "3",
          label: "已报废"
        }
      ],
      statusOptionsAll: [
        {
          value: 4,
          label: "全部"
        },
        {
          value: 0,
          label: "备品"
        },
        {
          value: 1,
          label: "已安装"
        },
        {
          value: 2,
          label: "维修中"
        },
        {
          value: 3,
          label: "已报废"
        }
      ],
      orgNameOptions: [],
      rows: [], //所有数据
      showNum: 0,
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      AddForm: {
        propertyCode: "",
        sensorTypeId: "",
        sensorCode: "",
        sensorModelType: "",
        sensorUseStatus: "",
        subordinateCompany: "",
        manageOrgId: "",
        remarks: ""
      },

      editForm: {
        propertyCode: "",
        sensorTypeId: "",
        sensorCode: "",
        sensorModelType: "",
        sensorUseStatus: "",
        subordinateCompany: "",
        manageOrgId: "",
        remarks: ""
      },

      //添加校验
      rulesOne: {
        propertyCode: [
          { required: true, message: "请输入资产编号", trigger: "blur" },
          // { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
          {
            pattern: /^([0-9A-Za-z\.\@\!\#\$\%\^\-\&\*\(\)]){1,20}$/,
            message: "格式支持1-20位数字、字母和特殊字符(仅限-!@#$%^&*())",
            trigger: "blur"
          }
        ],
        sensorTypeId: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        sensorCode: [
          { required: false, message: "请输入设备编号", trigger: "blur" },
          {
            pattern: /^([0-9A-Za-z\.\@\!\#\$\%\^\-\&\*\(\)]){1,20}$/,
            message: "格式支持1-20位数字、字母和特殊字符(仅限-!@#$%^&*())",
            trigger: "blur"
          }
        ],
        sensorModelType: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
          { max: 20, message: "长度不得大于 20 个字符", trigger: "blur" }
        ],
        sensorUseStatus: [
          { required: true, message: "请选择设备状态", trigger: "change" }
        ],
        subordinateCompany: [
          { required: true, message: "请输入资产归属", trigger: "blur" },
          //  {
          //   pattern: /^[0-9A-Za-z]{1,20}$/,
          //   message: "格式为 1 到 20 位的字母和数字",
          //   trigger: "blur"
          // }
          { max: 20, message: "长度不得大于 20 个字符", trigger: "blur" }
        ],
        // manageOrgId: [
        //   { required: false, message: '请选择所属测站', trigger: 'change' }
        // ],
        remarks: [
          // { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 100, message: "长度不得大于 100 个字符", trigger: "blur" }
        ]
      },

      //编辑校验
      rulesTwo: {
        propertyCode: [
          { required: true, message: "请输入资产编号", trigger: "blur" },
          // { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
          {
            pattern: /^([0-9A-Za-z\.\@\!\#\$\%\^\-\&\*\(\)]){1,20}$/,
            message: "格式支持1-20位数字、字母和特殊字符(仅限-!@#$%^&*())",
            trigger: "blur"
          }
        ],
        sensorTypeId: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        sensorCode: [
          { required: false, message: "请输入设备编号", trigger: "blur" },
          {
            pattern: /^([0-9A-Za-z\.\@\!\#\$\%\^\-\&\*\(\)]){1,20}$/,
            message: "格式支持1-20位数字、字母和特殊字符(仅限-!@#$%^&*())",
            trigger: "blur"
          }
        ],
        sensorModelType: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
          { max: 20, message: "长度不得大于 20 个字符", trigger: "blur" }
        ],
        sensorUseStatus: [
          { required: true, message: "请选择设备状态", trigger: "change" }
        ],
        subordinateCompany: [
          { required: true, message: "请输入资产归属", trigger: "blur" },
          { max: 20, message: "长度不得大于 20 个字符", trigger: "blur" }
          //  {
          //   pattern: /^[0-9A-Za-z]{1,20}$/,
          //   message: "格式为 1 到 20 位的字母和数字",
          //   trigger: "blur"
          // }
        ],
        // manageOrgId: [
        //   { required: false, message: '请选择所属测站', trigger: 'change' }
        // ],
        remarks: [
          // { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 100, message: "长度不得大于 100 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getAllData();
    this.searchclick3();
    this.getselectList();
  },
  filters: {
    //时间格式自定义
    formatDate(time) {
      // console.log('顶顶顶顶' ,time);
      if (time == undefined) {
        return;
      } else {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    }
  },
  mounted() {},
  methods: {
    //获取所有设备配置的数据
    getAllData() {
      this.$fetchGet("sensorDatabase/getAllAndName")
        .then(res => {
          // console.log("11111", res);
          this.rows = res;
          this.showNum = res.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getselectList() {
      //查找所有“设备类型编号”和“设备名称”
      this.$fetchGet("sensorType/getAllIDAndName")
        .then(res => {
          // console.log("ttt", res.data);
          this.typeNameOptions = res;
        })
        .catch(function(error) {
          console.log(error);
        });
      //查找所有“测站编号”和“测站名称”
      this.$fetchGet("RiverStation/getAllIDAndName")
        .then(res => {
          // console.log("rrr", res.data);
          this.orgNameOptions = res;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    searchclick1() {
      this.OrgNameInput = "";
      this.statusValue = "";
      this.$fetchGet("sensorDatabase/findAllByTypeName", {
        sensorTypeName: this.ModelTypeInput
      })
        .then(res => {
          // console.log("22222", res);
          this.rows = res;
          this.showNum = res.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    searchclick2() {
      this.ModelTypeInput = "";
      this.statusValue = "";
      this.$fetchGet("sensorDatabase/findAllByOrgName", {
        manageOrgName: this.OrgNameInput
      })
        .then(res => {
          // console.log("3333", res);
          this.rows = res;
          this.showNum = res.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    searchclick3() {
      this.ModelTypeInput = "";
      this.OrgNameInput = "";
      if (this.statusValue === 4) {
        this.getAllData();
      } else {
        this.$fetchGet("sensorDatabase/findAllByUseStatus", {
          sensorUseStatus: this.statusValue
        })
          .then(res => {
            // console.log("44444", res.length);
            this.rows = res;
            this.showNum = res.length;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    addclick() {
      this.dialogAddFormVisible = true;
    },

    AddFormVisible() {
      this.$refs.addFormRef.validate(res => {
        if (res) {
          // console.log("res", res);
          // console.log("AddForm", this.AddForm);
          // 1.发送请求
          this.$fetchPost("sensorDatabase/insert", this.AddForm, "json").then(
            res => {
              // console.log("添加成功", res);
              // 2.关闭对话框
              this.dialogAddFormVisible = false;
              this.$refs.addFormRef.resetFields();
              // 3.添加成功的提示信息
              if (res === 1) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 2000
                });
              } else if (res.data === -1) {
                this.$message({
                  message: "添加失败，资产ID重复！",
                  type: "error",
                  duration: 2000
                });
              } else {
                this.$message({
                  message: "添加失败,请仔细检查添加的数据格式",
                  type: "error",
                  duration: 2000
                });
              }
              // 4.重新刷新列表
              this.getAllData();
            }
          );
        } else {
          this.$message({
            message: "添加失败,请仔细检查数据",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },

    EditFormVisible() {
      this.$refs.editFormRef.validate(res => {
        if (res) {
          // console.log("res", res);
          // console.log("AddForm", this.AddForm);
          // 1.发送请求
          this.$fetchPost("sensorDatabase/update", this.editForm, "json").then(
            res => {
              // console.log("编辑成功", res);
              // 2.关闭对话框
              this.dialogEditFormVisible = false;
              // this.$refs.editFormRef.resetFields();
              // 3.编辑成功的提示信息
              if (res === 1) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$message({
                  message: "编辑失败,请仔细检查编辑的数据格式",
                  type: "error",
                  duration: 2000
                });
              }
              // 4.重新刷新列表
              this.getAllData();
            }
          );
        } else {
          this.$message({
            message: "编辑失败,请仔细检查数据",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },

    //点击编辑按钮
    editclick(res) {
      // console.log('编辑',res);
      const {
        propertyCode,
        sensorTypeId,
        sensorCode,
        sensorModelType,
        sensorUseStatus,
        subordinateCompany,
        manageOrgId,
        remarks
      } = res;
      this.editForm.propertyCode = propertyCode;
      this.editForm.sensorTypeId = sensorTypeId;
      this.editForm.sensorCode = sensorCode;
      this.editForm.sensorModelType = sensorModelType;
      this.editForm.sensorUseStatus = sensorUseStatus;
      this.editForm.subordinateCompany = subordinateCompany;
      this.editForm.manageOrgId = manageOrgId;
      this.editForm.remarks = remarks;

      this.dialogEditFormVisible = true;
    },

    // 添加对话框关闭表单校验重置
    dialogAddVisibleClosed() {
      this.$refs.addFormRef.clearValidate();
      this.$refs.addFormRef.resetFields();
    },

    //编辑对话框关闭表单校验重置
    dialogEditVisibleClosed() {
      this.$refs.editFormRef.clearValidate();
      // this.$refs.editFormRef.resetFields();
    },

    deleteclick(res) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let paramsid = res.propertyCode;
          this.$fetchGet("sensorDatabase/delete", {
            propertyCode: paramsid
          }).then(res => {
            // console.log("ssss", res);
            if (res == 1) {
              // 提示删除成功
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1000
              });

              this.getAllData();
            } else {
              this.$message({
                message: "删除失败",
                type: "error",
                duration: 1000
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style type="text/css">
.block .el-input__icon {
  height: 30px;
  line-height: 30px;
}

/* .sectionTable .el-table td,
.el-table th.is-leaf {
  color: #696969;
} */

.containerfgj .sectionTable .el-table td {
  /* .container123 .sectionTable .el-table th.is-leaf { */
  color: #606266;
  font-weight: normal;
}

/* 
.sectionTable .el-table {
  color: #606266;
} */
</style>

<style type="text/css" scoped>
.containerfgj {
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
.demonstration {
  width: 80px;
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
  margin-right: 25px;
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

.showAll {
  font-size: 19px;
  margin-top: 20px;
  margin-left: 40px;
  color: #696969;
}
.showAll > span {
  color: black;
}
</style>