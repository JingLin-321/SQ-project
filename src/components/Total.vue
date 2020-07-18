<template>
  <div class="containerfgj">
    <!-- 表格 -->
    <div class="heading">运维统计</div>
    <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
    <div class="operation_one">
      <div class="block">
        <span class="demonstration">所属测站:</span>
        <div class="selectedmonth">
          <el-select v-model="OrgNameInput" filterable placeholder="请选择所属测站">
            <el-option
              v-for="item in orgNameOptions"
              :key="item.stationID"
              :label="item.stationName"
              :value="item.stationName"
            ></el-option>
          </el-select>
        </div>

        <span class="demonstration">维护月份:</span>
        <div class="selectedmonth">
          <el-date-picker
            style=" width:171px;height:30px;"
            size="small"
            :clearable="false"
            v-model="datetimes"
            type="month"
            value-format="yyyy-MM"
            placeholder="请选择查询月份"
            @change="logTime"
          ></el-date-picker>
        </div>

        <el-button class="btcolor" type="text" size="mini">查询</el-button>
      </div>
      <div class="echarts_one"></div>
    </div>
  </div>
</template>
<script>
import { METHODS } from "http";
export default {
  data() {
    return {
      orgNameOptions: [],
      OrgNameInput: "",
      datetimes: this.formatDate(new Date())
    };
  },
  created() {
    this.getselectList();
  },
  mounted() {},
  methods: {
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    getselectList() {
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

    logTime() {
      console.log(this.datetimes);
    }
  }
};
</script>

<style  type="text/css">
.block .el-input__icon {
  height: 30px;
  line-height: 30px;
}
</style>



<style type="text/css" scoped>
.containerfgj {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.heading {
  font-size: 30px;
  font-family: SimHei;
  font-weight: bold;
  color: rgba(0, 71, 157, 1);
  text-align: center;
}
.tableHeading {
  font-size: 18px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(0, 71, 157, 1);
  text-align: center;
  margin-top: 10px;
}
.block {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-left: 355px; */
  margin-bottom: 14px;
  margin-top: 13px;
}

.demonstration {
  /* width: 60px; */
  height: 30px;
  font-size: 20px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(1, 52, 114, 1);
  line-height: 30px;
}
.selectedmonth {
  width: 160px;
  height: 30px;
  margin-right: 25px;
}
.btcolor {
  width: 60px;
  height: 30px;
  /* line-height: 30px; */
  border: 2px solid rgba(60, 98, 192, 1);
  border-radius: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    0deg,
    rgba(1, 111, 221, 1) 0%,
    rgba(9, 57, 168, 1) 100%
  );
}
</style>