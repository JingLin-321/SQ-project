<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian"><span>运维记录 /</span>降水量数据比对表（附件七）</div>
    <div class="conMain">
    <div class="heading">上海市水情自动测报系统测站降水量数据比对表</div>
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
    <div class="sectionTable2" style="text-align: center;">
      <div class="tableList" :style="{height:(clientHeight-340)+'px'}">
        <div class="theadtable">
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>
                  <div class="xh">序号</div>
                </th>
                <th>
                  <div class="zm">站名</div>
                </th>
                <th>
                  <div class="jcfs">监测方式</div>
                </th>
                <th v-for="(item,id) in 31" :key="id">
                  <div class="riqi">{{item+'日'}}</div>
                </th>
                <th>
                  <div class="riqi">总计</div>
                </th>
                <th style=""  fixed="right" width="100">
                  <div class="riqi">操作</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="sss">
          <table style="width:1940px;" cellspacing="0" cellpadding="0">
            <tbody>
              <tr v-for="(iteam,index) in lastdata" :key="index">
                <td
                  style="box-sizing: border-box; width:50px;"
                  v-if="iteam.typeName=='自动测报'"
                  rowspan="4"
                >
                  <div class="xh">{{iteam.indexLj}}</div>
                </td>
                <td
                  style="box-sizing: border-box; width:100px;"
                  v-if="iteam.typeName=='自动测报'"
                  rowspan="4"
                >
                  <div class="zm">{{iteam.stationName}}</div>
                </td>
                <td style="box-sizing: border-box;width:100px;">
                  <div class="jcfs">{{iteam.typeName}}</div>
                </td>
                <td
                  class="riqi"
                  v-if="iteam.typeName!=='情况说明'"
                  v-for="(itam,val) in iteam[iteam.typeName]"
                  :key="val"
                >
                  <div>{{Number(itam).toFixed(1)==0.0?" ":Number(itam).toFixed(1)}}</div>
                </td>
                <td class="riqi" v-if="iteam.typeName=='情况说明'" colspan="32">
                  <div>{{iteam[iteam.typeName]}}</div>
                </td>
                <td class="riqi" v-if="iteam.typeName!=='情况说明'">
                  <div
                    class="zj"
                  >{{iteam.typeName=='基本站'?Number(iteam.sum1).toFixed(1):iteam.typeName=='自动测报'?Number(iteam.sum).toFixed(1):Number(iteam.sum2).toFixed(1)}}</div>
                </td>
                <td style="box-sizing: border-box;width:90px;">
                  <!-- 操作按钮 -->
                  <div>
                    <span
                      v-if="iteam.typeName=='基本站'||iteam.typeName=='情况说明'"
                      class="editButton"
                      @click="editclick(iteam)"
                    >编辑</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="reportIdea" style="font-size: 14px;line-height: 15px;">
        <p>说明：1、差值=自动测报数据-基本站数据，结果为正负值，不取绝对值。</p>
        <p>2、出现降水量≤25mm时，差值绝对值>2mm，或者降水量>25mm时，差值范围超过±8%的情况，需及时进行数据校核，并把处理方式及结果记录到“情况说明”栏中；</p>
        <p>3、如有错误数据，应及时进行修正，并将情况记录到附件2中；</p>
        <p>4、如加做雨量计滴水实验，把情况记录到附件6中。</p>
      </div>
    </div>
    <!-- 修改的弹窗 -->
    <el-dialog title="编辑降水量数据" :visible.sync="edit" @close="handleClose" width="30%">
      <p style="fon-size:14px;color:red;text-align:center;">提示：请您输入时最多保留一位小数！默认保留一位小数！</p>
      <el-form label-width="100px" :model="form" ref="form">
        <el-form-item v-for="(item,index) in 31" :key="index" :label="item+'日'">
          <el-input
            type="number"
            style="width:90%;"
            v-model.number="updateData['day'+(index+1)+'Base']"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="edit = false">取消</el-button>
        <el-button type="primary" @click="editDo">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑情况说明" :visible.sync="edit1" @close="handleClose" width="40%">
      <el-form label-width="120px" :model="form" ref="form">
        <el-form-item label="情况说明" required>
          <el-input style="width:90%;" maxlength="300" v-model="remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="edit1 = false">取消</el-button>
        <el-button type="primary" @click="editDo1">保存</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: document.body.clientHeight,
      datename: [],
      edit1: false,
      remark: "",
      updateData: {
        stationName: "",
        typeName: "",
        day1Base: "",
        day2Base: "",
        day3Base: "",
        day4Base: "",
        day5Base: "",
        day6Base: "",
        day7Base: "",
        day8Base: "",
        day9Base: "",
        day10Base: "",
        day11Base: "",
        day12Base: "",
        day13Base: "",
        day14Base: "",
        day15Base: "",
        day16Base: "",
        day17Base: "",
        day18Base: "",
        day19Base: "",
        day20Base: "",
        day21Base: "",
        day22Base: "",
        day23Base: "",
        day24Base: "",
        day25Base: "",
        day26Base: "",
        day27Base: "",
        day28Base: "",
        day29Base: "",
        day30Base: "",
        day31Base: ""
      },
      rows: [],
      datetimes: this.formatDate(new Date()),
      dialogVisible: false,
      edit: false,
      createBy: "",
      dataYearMonth: "",
      lastdata: [],
      form: {}
    };
  },
  computed: {},
  mounted() {
    //适配页面
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  },
  created() {
    this.searchclick();
    let arr = [];
    this.rows.forEach(item => {
      for (let i = 1; i < 31; i++) {
        let dayone = {};
        dayone.name = "name" + i;
        dayone.data = i;
        this.datename.push(dayone);
      }
      for (let key in item) {
        let obj = {};
        obj.name = key;
        obj.remark = 1;
        obj.valuet = item[key];
        arr.push(obj);
      }
    });
  },
  methods: {
    deatlData(data) {
      let arrtest = ["自动测报", "基本站", "差值", "情况说明"];
      data.forEach((iteam, index) => {
        let sum = 0;
        let sum1 = 0;
        let sum2 = 0;
        iteam["差值"] = [];
        iteam["自动测报"].forEach((itam, id) => {
          iteam["差值"].push(itam - iteam["基本站"][id]);
          sum += Number(itam);
        });
        iteam["基本站"].forEach((itam, id) => {
          sum1 += Number(itam);
        });
        iteam["差值"].forEach((itam, id) => {
          sum2 += Number(itam);
        });

        for (let i = 0; i < arrtest.length; i++) {
          let obj = {};
          obj[arrtest[i]] = iteam[arrtest[i]];
          this.lastdata.push(obj);
          obj.sum = sum;
          obj.sum1 = sum1;
          obj.sum2 = sum2;
          obj.indexLj = index + 1;
          obj.typeName = arrtest[i];
          obj.stationName = iteam.stationName;
        }
      });
    },
    //导出excel
    addexcel() {
      window.open("/sq/rainConstrast/getExcel?createTime=" + this.datetimes);
    },
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //单元格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 4 === 0) {
        if (columnIndex === 4) {
          return [1, 32];
        } else if (columnIndex === 2) {
          return [0, 0];
        }
      }
      if (columnIndex === 1 || columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
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
    //获取所有数据的接口
    getAll() {
      this.$fetchGet("rainConstrast/getAll")
        .then(response => {
          this.rows = response;
          this.deatlData();
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //触发编辑按钮
    editclick(iteam) {
      console.log(iteam);
      this.updateData.stationName = iteam.stationName;
      this.updateData.typeName = iteam.typeName;
      if (iteam.typeName == "情况说明") {
        this.edit1 = true;
        this.remark = iteam[iteam.typeName];
      } else {
        this.edit = true;
        iteam[iteam.typeName].forEach((itam, index) => {
          this.updateData[`day${index + 1}Base`] = itam;
        });
        console.log(this.updateData);
      }
    },
    //关闭弹窗
    handleClose(done) {
      this.$refs.addform.resetFields();
    },
    //查询接口
    searchclick() {
      this.lastdata = [];
      this.$fetchGet("rainConstrast/getAll?date=" + this.datetimes)
        .then(response => {
          this.rows = response;
          this.deatlData(this.rows);
        })
        .catch(function(error) {});
    },
    //编辑接口
    editDo() {
      (this.updateData.dataYearMonth = this.datetimes),
        this.$fetchPost("rainConstrast/update", this.updateData, "json")
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
            this.searchclick();
          })
          .catch(function(error) {});
    },
    //情况说明编辑接口
    editDo1() {
      this.$fetchPost(
        "rainConstrast/update",
        {
          stationName: this.updateData.stationName,
          typeName: this.updateData.typeName,
          remark: this.remark,
          dataYearMonth: this.datetimes
        },
        "json"
      )
        .then(response => {
          this.edit1 = false;
          if (response == 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.getAll();
          } else {
            this.$message.error("编辑失败");
          }
          this.searchclick();
        })
        .catch(function(error) {});
    }
  }
};
</script>
<style type="text/css" scoped>
.sectionTable2 {
  width: 100%;
  height: 600px;
}
.sectionTable2 .tableList {
  height: 600px;
  border-collapse: collapse;
  overflow: hidden;
  overflow-x: scroll;
  margin: 0px;
}
.sectionTable2 .theadtable {
  width: 1940px;
  height: 50px;
  background:rgba(228,240,252,1);
}
.sectionTable2 table .xh {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.sectionTable2 .sss {
  width: 1940px;
  height: 690px;
  overflow: scroll;
}
.editButton {
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(2, 85, 243, 1);
  line-height: 40px;
  cursor: pointer;
}
.sectionTable2 table .zm {
  width: 100px;
  height: 50px;
  line-height: 50px;
}
.sectionTable2 table .jcfs {
  width: 100px;
  height: 50px;
  line-height: 50px;
}
.sectionTable2 table .riqi {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.sectionTable2 table .zj {
  width: 50px;
  height: 50px;
  line-height: 50px;
}

.sectionTable2 .tableList td {
  box-sizing: border-box;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}
.sectionTable2 table thead th {
  font-size: 14px;
  height: 50px;
  font-weight: bold;
  line-height: 50px;
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
.sectionTable2 .el-table thead .el-table th,
.el-table tr {
  width: 1547px;
  height: 50px;
  border-radius: 6px;
}
.sectionTable2 .el-table thead {
  border-radius: 6px;
}
.sectionTable2 .el-table thead.is-group th {
  border: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}
.sectionTable2 .el-table--border,
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
.sectionTable2 {
  margin-right: 30px;
}
.sectionTable2 .el-table {
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


