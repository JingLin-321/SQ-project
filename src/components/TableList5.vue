<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian1"><span>运维记录 /</span>检查维护记录表（附件五）</div>
    <div class="conMain">
    <div class="heading">上海市水情自动测报系统测站检查维护记录表</div>
    <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
    <!-- 上方查询按钮 -->
    
    <div class="block">
      <div class="top-left">
      <div class="demonstration">站名:</div>
      <div class="selectedmonth1">
        <el-select v-model="stationInput" filterable placeholder="请选择" @change="changestation()">
          <el-option
            v-for="item in rows1"
            :key="item.stationId"
            :label="item.stationName"
            :value="item.stationId"
          ></el-option>
        </el-select>
      </div>
       <div class="demonstration1">维护人员:</div>
      <div class="selectedmonth1">
        <el-select v-model="idInput" filterable placeholder="请选择">
          <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
        </el-select>
      </div>
      <span class="demonstration1">维护月份:</span>
      <div class="selectedmonth">
        <el-date-picker
          style=" width:171px;
  height:30px;"
          size="small"
          :clearable="false"
          v-model="datetimes"
          type="month"
          value-format="yyyy-MM"
          @change="changestation()"
          placeholder="请选择查询月份"
        ></el-date-picker>
      </div>
      </div>
      <div class="top-right">
      <el-button class="dc" type="success" @click="addexcel()">导出</el-button>
      <el-button class="add" type="primary" @click="addclick()">保存</el-button>
    </div>
    </div>
    <!-- 表格 -->
    <div class="sectionTable" style="text-align: center;height:100%;overflow: scroll;">
      <table class="fujian" :height="(clientHeight-400)">
        <thead>
          <tr>
            <td class="z1">站名</td>
            <td class="z1">
              <el-input :disabled="true" v-model="rows.stationName" placeholder="请输入内容"></el-input>
            </td>
            <td class="z1">RTU型号</td>
            <td style="width:400px;">
              <el-input maxlength="36" v-model="rows.rtuType" placeholder="请输入内容"></el-input>
            </td>
          </tr>
        </thead>
        <tr>
          <td class="z1" rowspan="2">监测项目</td>
          <td>
            <el-checkbox v-model="rows.checkRainSensor" class="z1">雨量</el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="rows.checkWaterLevelSensor" class="z1">水位</el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="rows.checkSpeedDirectionSensor">风速风向</el-checkbox>
          </td>
        </tr>
        <tr>
          <td>
            <el-checkbox v-model="rows.checkFlowSensor" class="z1">流量</el-checkbox>
          </td>
          <td colspan="2">
            其他
            <el-input maxlength="36" v-model="rows.checkOtherSensor" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="z1">项目</td>
          <td colspan="2">情况记录</td>
          <td>检查内容</td>
        </tr>
        <tr>
          <td class="z1" rowspan="3">数据采集</td>

          <td>
            <el-radio v-model="rows.dataCollectionCorrect" :label="1" border class="z1">已校准</el-radio>
          </td>

          <td>
            <el-radio v-model="rows.dataCollectionCorrect" :label="0" border class="z1">未校准</el-radio>
          </td>

          <td>仪器时钟</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.dataCollectionParameterCheck" :label="1" border class="z1">正确</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.dataCollectionParameterCheck" :label="0" border class="z1">不正确</el-radio>
          </td>

          <td>参数检查：站号、电压、自报时间等</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.dataCollectionNormal" :label="1" border class="z1">正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.dataCollectionNormal" :label="0" border class="z1">不正常</el-radio>
          </td>

          <td>数据正常采集，内存存数</td>
        </tr>
        <tr>
          <td class="z1" rowspan="2">数据通信</td>

          <td>
            <el-radio v-model="rows.dataCommunicateParameterCheck" :label="1" border class="z1">正确</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.dataCommunicateParameterCheck" :label="0" border class="z1">不正确</el-radio>
          </td>

          <td>参数检查：主备信道、回执地址等</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.dataCommunicateChannel" :label="1" border class="z1">正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.dataCommunicateChannel" :label="0" border class="z1">不正常</el-radio>
          </td>

          <td>信道测试：发送测试数据、招测等</td>
        </tr>
        <tr>
          <td class="z1" rowspan="2">电源</td>

          <td>
            <el-radio v-model="rows.solarEnergyVoltageCheck" :label="1" border class="z1">
              正常
              <el-input
              class="xx"
                type="number"
                v-if="rows.solarEnergyVoltageCheck==1?true:false"
                v-model.number="rows.solarEnergyVoltageValue"
                placeholder="请输入内容"
              ></el-input><span v-if="rows.solarEnergyVoltageCheck==1?true:false">V</span>
            </el-radio>
          </td>
          <td>
            <el-radio v-model="rows.solarEnergyVoltageCheck" :label="0" border class="z1">
              不正常
              <el-input
              class="xx"
                type="number"
                v-if="rows.solarEnergyVoltageCheck==0?true:false"
                v-model.number="rows.solarEnergyVoltageValue"
                placeholder="请输入内容"
              ></el-input><span v-if="rows.solarEnergyVoltageCheck==0?true:false">V</span>
            </el-radio>
          </td>

          <td>太阳能/交流电供电电压检查</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.storageBatteryVoltageCheck" :label="1" border class="z1">
              正常
              <el-input
              class="xx"
                type="number"
                v-if="rows.storageBatteryVoltageCheck==1?true:false"
                v-model.number="rows.storageBatteryValue"
                placeholder="请输入内容"
              ></el-input><span v-if="rows.storageBatteryVoltageCheck==1?true:false">V</span>
            </el-radio>
          </td>
          <td>
            <el-radio v-model="rows.storageBatteryVoltageCheck" :label="0" border class="z1">
              不正常
              <el-input
              class="xx"
                type="number"
                v-if="rows.storageBatteryVoltageCheck==0?true:false"
                v-model.number="rows.storageBatteryValue"
                placeholder="请输入内容"
              ></el-input><span v-if="rows.storageBatteryVoltageCheck==0?true:false">V</span>
            </el-radio>
          </td>

          <td>蓄电池电压检查</td>
        </tr>
        <tr>
          <td class="z1" rowspan="3">雨量</td>

          <td>
            <el-radio v-model="rows.rainfallSensorNormal" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.rainfallSensorNormal" :label="0" border>不正常</el-radio>
          </td>

          <td>仪器检查：水平、牢固及雨量模拟测试等</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.rainfallSensorCleanCheck" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.rainfallSensorCleanCheck" :label="0" border>不正常</el-radio>
          </td>

          <td>仪器干净整洁，当清洁度影响数据时应进行清洁</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.rainfallSensorRangeCheck" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.rainfallSensorRangeCheck" :label="0" border>不正常</el-radio>
          </td>

          <td>周边环境检查，确保无遮挡</td>
        </tr>
        <tr>
          <td class="z1" rowspan="5">水位</td>

          <td>
            <el-radio v-model="rows.waterLevelCheckNormal" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.waterLevelCheckNormal" :label="0" border>不正常</el-radio>
          </td>

          <td>仪器检查：水平、牢固等</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.waterLevelCheckShaft" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.waterLevelCheckShaft" :label="0" border>不正常</el-radio>
          </td>

          <td>井筒、水尺倾斜及牢固度检查</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.waterLevelCleanCheck" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.waterLevelCleanCheck" :label="0" border>不正常</el-radio>
          </td>

          <td>水尺干净整洁，当清洁度影响水尺读数时应进行清洁</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.waterLevelAdjust" :label="1" border>已调整</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.waterLevelAdjust" :label="0" border>未调整</el-radio>
          </td>

          <td>
            <div class="ss">
              <div class="ss1">水尺零高：</div>
              <el-input
                type="number"
                v-model.number="rows.waterLevelZeroHeight"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="ss">
              <div class="ss1">水尺读数：</div>
              <el-input
                type="number"
                v-model.number="rows.waterLevelStaffValue"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="ss">
              <div class="ss1">读数时间：</div>
              <el-input maxlength="36" v-model="rows.waterLevelTime" placeholder="请输入内容"></el-input>
            </div>
            <div class="ss">
              <div class="ss1">水位计读数：</div>
              <el-input
                type="number"
                v-model.number="rows.waterLevelIndicatorValue"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="ss">
              <div class="ss1">水位：</div>
              <el-input type="number" v-model.number="rows.waterLevelValue" placeholder="请输入内容"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td
            colspan="3"
          >说明：实际水位与水位计读数误差超过1cm应做调整；当因波浪或开关闸等因素影响无法确定实际水位时，可暂不调整，应选择合适时间再次核实，当确定了实际水位与水位计读数误差超过1cm时，必须进行调整；误差超过4cm时，需把造成误差的原因记录到‘情况说明’栏中。如为设施设备故障造成，请把故障情况填入附件4中。</td>
        </tr>
        <tr>
          <td class="z1" rowspan="2">风速风向</td>

          <td>
            <el-radio v-model="rows.speedDirectionCheckNormal" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.speedDirectionCheckNormal" :label="0" border>不正常</el-radio>
          </td>

          <td>仪器检查：水平、牢固、指北等</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.speedDirectionCheckLightingProtection" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.speedDirectionCheckLightingProtection" :label="0" border>不正常</el-radio>
          </td>

          <td>避雷保护（若无避雷保护，建议加装避雷设施）</td>
        </tr>
        <tr>
          <td class="z1" rowspan="4">流量</td>

          <td>
            <el-radio v-model="rows.flowmeterDataCheckNormal" :label="1" border>完整</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.flowmeterDataCheckNormal" :label="0" border>不完整</el-radio>
          </td>

          <td>数据导出后应检查数据完整性</td>
        </tr>
        <tr>
          <td>
            纵摇：
            <el-input maxlength="36" v-model="rows.flowmeterPitchGesture" placeholder="请输入内容"></el-input>
          </td>
          <td>
            横摇：
            <el-input maxlength="36" v-model="rows.flowmeterRollingGesture" placeholder="请输入内容"></el-input>
          </td>

          <td>查验仪器姿态，建议应小于2度</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.flowmeterSignalStrength" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.flowmeterSignalStrength" :label="0" border>不正常</el-radio>
          </td>

          <td>回波信号强度</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.flowmeterRecordTimeWarp" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.flowmeterRecordTimeWarp" :label="0" border>不正常</el-radio>
          </td>

          <td>测验记录时间，偏差小于1分钟</td>
        </tr>
        <tr>
          <td class="z1">管线</td>

          <td>
            <el-radio v-model="rows.linePipeCheckNormal" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.linePipeCheckNormal" :label="0" border>不正常</el-radio>
          </td>

          <td>室内线应穿管，室外线避免架空、穿管埋地</td>
        </tr>
        <tr>
          <td class="z1" rowspan="2">测站环境</td>

          <td>
            <el-radio v-model="rows.stationEnviroment" :label="1" border>正常</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.stationEnviroment" :label="0" border>不正常</el-radio>
          </td>

          <td>设备防水防潮防盗情况检查</td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="rows.stationCleanCheck" :label="1" border>已打扫</el-radio>
          </td>
          <td>
            <el-radio v-model="rows.stationCleanCheck" :label="0" border>未打扫</el-radio>
          </td>

          <td>打扫测站环境卫生</td>
        </tr>
        <tr>
          <td class="z1">情况说明</td>
          <td colspan="3">
            <el-input maxlength="300" v-model="rows.remark" placeholder="请输入内容"></el-input>
          </td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: document.body.clientHeight,
      stationInput: "",
      station: "",
      idInput:'',
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
      rows: {
        stationName: "",
        rtuType: "",
        checkRainSensor: false,
        checkWaterLevelSensor: false,
        checkSpeedDirectionSensor: false,
        checkFlowSensor: false,
        checkOtherSensor: "",
        dataCollectionCorrect: null,
        dataCollectionParameterCheck: null,
        dataCollectionNormal: null,
        dataCollectionParameterCheck: null,
        dataCommunicateChannel: null,
        solarEnergyVoltageCheck: null,
        solarEnergyVoltageValue: null,
        storageBatteryVoltageCheck: null,
        storageBatteryValue:"",
        rainfallSensorNormal: null,
        rainfallSensorCleanCheck: null,
        rainfallSensorRangeCheck: null,
        waterLevelCheckNormal: null,
        waterCheckShaft: null,
        waterLevelCleanCheck: null,
        waterLevelAdjust: null,
        waterLevelZeroHeight: null,
        waterLevelStaffValue: null,
        solarEnergyVoltageValue: "",
        flowmeterRollingGesture: "",
        waterLevelTime: null,
        waterLevelIndicatorValue: null,
        waterLevelValue: null,
        speedDirectionCheckNormal: null,
        speedDirectionCheckLightingProtection: null,
        flowmeterDataCheckNormal: null,
        flowmeterPitchGesture: null,
        flowmeterSignalStrength: null,
        flowmeterRecordTimeWarp: null,
        linePipeCheckNormal: null,
        stationEnviroment: null,
        stationCleanCheck: null,
        remark: "",
        reportId: null
      },
      rows1: [],
      datetimes: this.formatDate(new Date())
    };
  },
  created() {
    this.goFirst();
  },
  mounted() {
    //页面适配
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  },
  methods: {
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //导出excel
    addexcel() {
      window.open(
        
          "/sq/stationCheck/getExcel?mantainDate=" +
          this.datetimes +
          "&stationId=" +
          this.stationInput
      );
    },
    //获取所有数据的接口
    getAll() {
      this.$fetchGet("stationCheck/getAll", { mantainDate: this.datetimes, stationId: this.stationInput }
        )
        .then(response => {
          if (response) {
            this.idInput = this.options5[0].label
            this.rows = response;
            response.checkFlowSensor == 1
              ? (this.rows.checkFlowSensor = true)
              : (this.rows.checkFlowSensor = false);
            response.checkRainSensor == 1
              ? (this.rows.checkRainSensor = true)
              : (this.rows.checkRainSensor = false);
            response.checkWaterLevelSensor == 1
              ? (this.rows.checkWaterLevelSensor = true)
              : (this.rows.checkWaterLevelSensor = false);
            response.checkSpeedDirectionSensor == 1
              ? (this.rows.checkSpeedDirectionSensor = true)
              : (this.rows.checkSpeedDirectionSensor = false);
          }
        })
        .catch(function(error) {
        });
    },
    //选取日期的change事件
    changestation() {
      console.log(this.stationInput);
      (this.rows = []),
        this.rows1.forEach((iteam, index) => {
          if (this.stationInput == iteam.stationId) {
            console.log(iteam.stationId);
            this.rows.stationName = iteam.stationName;
            console.log(this.rows.stationName);
          }
        });
      this.getAll();
    },
    //测站信息下拉框
    goFirst() {
      this.$fetchGet("dropdown/getStation")
        .then(response => {
          this.rows1 = response;
          this.stationInput = this.rows1[0].stationId;
          this.rows.stationName = this.rows1[0].stationName;
          this.getAll();
        })
        .catch(function(error) {
        });
    },
    //触发保存按钮
    addclick() {
      this.rows.checkFlowSensor == true
        ? (this.rows.checkFlowSensor = 1)
        : (this.rows.checkFlowSensor = 0);
      this.rows.checkRainSensor == true
        ? (this.rows.checkRainSensor = 1)
        : (this.rows.checkRainSensor = 0);
      this.rows.checkWaterLevelSensor == true
        ? (this.rows.checkWaterLevelSensor = 1)
        : (this.rows.checkWaterLevelSensor = 0);
      this.rows.checkSpeedDirectionSensor == true
        ? (this.rows.checkSpeedDirectionSensor = 1)
        : (this.rows.checkSpeedDirectionSensor = 0);
      this.rows.mantainDate = this.datetimes;
      this.rows.stationId = this.stationInput;
      this.$fetchPost("stationCheck/update", this.rows,'json')
        .then(response => {
          if (response == 1) {
             this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getAll();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //触发添加按钮
    addclick1() {
      this.rows.reportId = "";
      this.rows.checkFlowSensor == true
        ? (this.rows.checkFlowSensor = 1)
        : (this.rows.checkFlowSensor = 0);
      this.rows.checkRainSensor == true
        ? (this.rows.checkRainSensor = 1)
        : (this.rows.checkRainSensor = 0);
      this.rows.checkWaterLevelSensor == true
        ? (this.rows.checkWaterLevelSensor = 1)
        : (this.rows.checkWaterLevelSensor = 0);
      this.rows.checkSpeedDirectionSensor == true
        ? (this.rows.checkSpeedDirectionSensor = 1)
        : (this.rows.checkSpeedDirectionSensor = 0);

      this.rows.mantainDate = this.datetimes;
      this.rows.stationId = this.stationInput;
      this.$fetchPost("stationCheck/insert", this.rows,'json')
        .then(response => {
          if (response == 1) {
             this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getAll();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(function(error) {
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
.fujian .el-input__inner {
  height: 30px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: row;
}
.fujian .el-radio.is-bordered {
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.fujian .ss {
  display: flex;
  flex-direction: row;
}
.fujian .ss1 {
  width: 200px;
  margin-left: 100px;
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
.xx{
  width: 110px !important;
}
.xx .el-input__inner{
  width: 100px;
}
.sectionTable .el-table--border,
.el-table--group {
  border: 0;
}
.fujian .el-input__inner {
  text-align: center;
}
</style>
<style type="text/css" scoped>
.container123 {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.fujian1 {
  font-size: 14px;
  font-weight: 400;
  color: #555555;
  line-height: 30px;
  width: 100%;
  height: 20px;
  margin-left: 10px;
}
.fujian1 span {
  font-size: 14px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
  line-height: 30px;
  height: 20px;
}
.sectionTable {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.el-input {
  background: none;
  outline: none;
  border: none;
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

.sectionTable td {
  border: 1px solid black;
  border-collapse: collapse;
  border-spacing: 0;
}
.fujian {
  border-collapse: collapse;
  border-spacing: 0;
}
.sectionTable input {
  background: none;
  outline: none;
  border: none;
}

.add {
  border-radius: 8px;
  font-size: 16px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 3px;
  margin-left: 12px;
}
.z1 {
  width: 200px;
}
</style>
