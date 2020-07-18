<template>
  <div class="container123" :style="{height:(clientHeight-80)+'px'}">
    <div class="fujian">
      <span>运维记录 /</span>数据修正登记表（附件二）
    </div>
    <div class="conMain">
      <div class="heading">上海市水情自动测报系统数据修正登记表</div>
      <div class="tableHeading">单位名称：（盖章）浦东新区水文水资源管理署</div>
      <!-- 上方查询按钮 -->
      <div class="block">
        <div class="top-left">
          <div class="demonstration">站名:</div>
          <div class="selectedmonth1">
            <el-select
              v-model="input"
              filterable
              clearable
              placeholder="请输入站名"
              @change="searchclick1()"
            >
              <el-option
                v-for="item in rows1"
                :key="item.stationId"
                :label="item.stationName"
                :value="item.stationName"
              ></el-option>
            </el-select>
          </div>
          <span class="demonstration1">检测项目:</span>
          <div class="selectedmonth1">
            <el-select
              v-model="input1"
              filterable
              clearable
              placeholder="请输入检测项目"
              @change="searchclick1()"
            >
              <el-option
                v-for="item in options1"
                :key="item.alterSensorTypeId"
                :label="item.label"
                :value="item.label"
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
      <div class="sectionTable section1">
        <el-table
          :data="rows"
          :height="(clientHeight-420)"
          empty-text="暂无数据"
          style="border-radius:6px;"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="stationName" label="站名"></el-table-column>
          <el-table-column prop="alterDate" label="修改日期">
            <template slot-scope="scope">
              <div>{{scope.row.alterDate==undefined?"":scope.row.alterDate.substr(8,2)+'日'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="alterSensorTypeName" label="检测项目"></el-table-column>
          <el-table-column label="错误数据修正(数据合理性)">
            <el-table-column prop="errorDataReason" width="160" label="数据错误判断依据"></el-table-column>
            <el-table-column prop="errorDataType" label="数据类型">
              <template slot-scope="scope">
                <div>{{getFormate(scope.row.errorDataType)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="errorTimeSpace" width="160" label="错误时段">
              <!-- <template slot-scope="scope">
               <div>{{scope.row.errorTimeSpace==undefined?"":scope.row.errorTimeSpace.substr(8,2)+'日'+scope.row.errorTimeSpace.substr(10,15)}}</div>
              </template>-->
            </el-table-column>
            <el-table-column prop="errorValue" label="错误值"></el-table-column>
            <el-table-column prop="confirValue" label="改正值"></el-table-column>
            <el-table-column prop="errorDataReRun" label="数据返算">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.errorDataReRun)}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="缺测数据插补(数据中断)">
            <el-table-column prop="missDataType" label="数据类型">
              <template slot-scope="scope">
                <div>{{getFormate3(scope.row.missDataType)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="missTimeSpace" label="缺测时段">
              <!-- <template slot-scope="scope">
               <div>{{scope.row.missTimeSpace.substr(5,10)}}</div>
              </template>-->
            </el-table-column>
            <el-table-column prop="missDataReRun" label="数据返算">
              <template slot-scope="scope">
                <div>{{getFormate2(scope.row.missDataReRun)}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="createTime" label="上报时间">
            <template slot-scope="scope">
              <div>{{scope.row.createTime==undefined?"":scope.row.createTime.substr(8,2)+'日'+scope.row.createTime.substr(11,5)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createBy" label="数据修改人"></el-table-column>
          <el-table-column prop="brokenAccordingId" align="center" label="判断依据"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column fixed="right" width="100" label="操作">
            <template slot-scope="scope">
              <div class>
                <span class="editButton" @click="editclick(scope.row)">编辑</span>
                <span
                  style="height:40px;font-size:16px;font-family:SimHei;font-weight:bold;color:#C9C9C9;line-height:40px;"
                >|</span>
                <span class="editButton1" @click="deleteclick(scope.row)">删除</span>
              </div>
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
        <p>说明：1、“监测项目”指水位或雨量等监测项目；“数据类型”指系统实时数据、五分钟数据、小时数据等类型；“数据返算”是指对与修改数据的相关联的处理数据进行返算；“缺测数据插补”指对系统自动测报站未采集到的数据进行插补。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、当出现数据错误但无法修正的情况时，请在本表进行登记，并在“改正值”栏上填写“无法修正”。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、如无修改情况，请在表格首行填写“无数据修改情况”。</p>
      </div>
      <!-- 删除的弹窗 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确认删除记录吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteclik(row)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改的弹窗 -->
      <el-dialog title="编辑自动测报系统数据" :visible.sync="edit" @close="handleClose" width="40%">
        <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="站名" prop="stationName">
            <el-select
              v-model="addform.stationName"
              style="width:90%;"
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
          <el-form-item label="修改日期" prop="alterDate">
            <el-date-picker
              style="width:90%;"
              v-model="addform.alterDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="检测项目" prop="alterSensorTypeName">
            <el-select
              style="width:90%;"
              v-model="addform.alterSensorTypeName"
              placeholder="请选择"
              @change="sensor"
            >
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据错误判断依据" prop="errorDataReason">
            <el-select
              style="width:90%;"
              v-model="addform.errorDataReason"
              @change="datachange()"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in rows2"
                :key="index"
                :label="item.errorName"
                :value="item.errorName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select
              style="width:90%;"
              v-model="errorDataType"
              @change="timechange()"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="错误时段">
            <el-date-picker
              style="width:90%;"
              v-if="errorDataType==2 ||errorDataType==undefined"
              v-model="errorTimeSpace1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              v-if="errorDataType==3"
              v-model="errorTimeSpace"
              value-format="yyyy-MM-dd HH"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              v-if="errorDataType==1"
              v-model="errorTimeSpace"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="错误值">
            <el-input style="width:90%;" maxlength="20" v-model="errorValue" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="改正值">
            <el-input style="width:90%;" maxlength="20" v-model="confirValue" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="数据返算">
            <div class="label-test">
              <el-radio v-model="errorDataReRun" :label="1">返算</el-radio>
              <el-radio v-model="errorDataReRun" :label="0">不返算</el-radio>
            </div>
            <!-- <el-select v-model="errorDataReRun" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select
              style="width:90%;"
              v-model="missDataType"
              @change="timechange1()"
              :disabled="istrue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺测时段">
            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="missDataType==2||missDataType==''||missDataType == undefined"
              v-model="missTimeSpace1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="missDataType==3"
              v-model="missTimeSpace"
              value-format="yyyy-MM-dd HH"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="missDataType==1"
              v-model="missTimeSpace"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="数据返算">
            <div class="label-test">
              <el-radio :disabled="istrue" v-model="missDataReRun" :label="1">返算</el-radio>
              <el-radio :disabled="istrue" v-model="missDataReRun" :label="0">不返算</el-radio>
            </div>
            <!-- <el-select v-model="missDataReRun" :disabled="istrue" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="上报时间" prop="createTime">
            <el-date-picker
              style="width:90%;"
              v-model="addform.createTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数据修改人" prop="createBy">
            <el-select
              style="width:90%;"
              maxlength="72"
              v-model="addform.createBy"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="判断依据">
            <el-select style="width:90%;" v-model="brokenAccordingId" placeholder="请选择">
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
      <el-dialog title="增加自动测报系统数据" :visible.sync="add" @close="handleClose" width="40%">
        <el-form label-width="150px" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="站名" prop="stationName">
            <el-select
              style="width:90%;"
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
          <el-form-item label="修改日期" prop="alterDate">
            <el-date-picker
              style="width:90%;"
              v-model="addform.alterDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="检测项目" prop="alterSensorTypeName">
            <el-select
              style="width:90%;"
              v-model="addform.alterSensorTypeName"
              placeholder="请选择"
              @change="sensor"
            >
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据错误判断依据" prop="errorDataReason">
            <el-select
              style="width:90%;"
              v-model="addform.errorDataReason"
              @change="datachange()"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in rows2"
                :key="index"
                :label="item.errorName"
                :value="item.errorName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select
              style="width:90%;"
              v-model="errorDataType"
              @change="timechange()"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="错误时段">
            <el-date-picker
              style="width:90%;"
              v-if="istime==0"
              v-model="errorTimeSpace1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              v-if="istime==1"
              v-model="errorTimeSpace"
              value-format="yyyy-MM-dd HH"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              v-if="istime==2"
              v-model="errorTimeSpace"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="错误值">
            <el-input style="width:90%;" maxlength="20" v-model="errorValue" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="改正值">
            <el-input style="width:90%;" maxlength="20" v-model="confirValue" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据返算">
            <div class="label-test">
              <el-radio v-model="errorDataReRun" :label="1">返算</el-radio>
              <el-radio v-model="errorDataReRun" :label="0">不返算</el-radio>
            </div>
            <!-- <el-select v-model="errorDataReRun" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select
              style="width:90%;"
              v-model="missDataType"
              @change="timechange1()"
              :disabled="istrue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺测时段">
            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="istime1==0"
              v-model="missTimeSpace1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="istime1==1"
              v-model="missTimeSpace"
              value-format="yyyy-MM-dd HH"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>

            <el-date-picker
              style="width:90%;"
              :disabled="istrue"
              v-if="istime1==2"
              v-model="missTimeSpace"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数据返算">
            <div class="label-test">
              <el-radio :disabled="istrue" v-model="missDataReRun" :label="1">返算</el-radio>
              <el-radio :disabled="istrue" v-model="missDataReRun" :label="0">不返算</el-radio>
            </div>
            <!-- <el-select v-model="missDataReRun" :disabled="istrue" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="上报时间" prop="createTime">
            <el-date-picker
              style="width:90%;"
              v-model="addform.createTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数据修改人" prop="createBy">
            <el-select
              style="width:90%;"
              maxlength="72"
              v-model="addform.createBy"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="判断依据">
            <el-select style="width:90%;" v-model="brokenAccordingId" placeholder="请选择">
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
          <el-button type="primary" @click="addDo()">保存</el-button>
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
      rules: {
        stationName: [
          { required: true, message: "请选择站名", trigger: "change" }
        ],
        alterDate: [
          { required: true, message: "请选择修改日期", trigger: "change" }
        ],
        alterSensorTypeName: [
          { required: true, message: "请选择检测项目", trigger: "change" }
        ],
        errorDataReason: [
          {
            required: true,
            message: "请选择错误情况判断依据",
            trigger: "change"
          }
        ],
        createTime: [
          { required: true, message: "请选择上报时间", trigger: "change" }
        ],
        createBy: [
          { required: true, message: "请选择数据修改人", trigger: "change" }
        ]
      },
      datetimes: this.formatDate(new Date()),
      istime: 1,
      istime1: 1,
      options1: [
        {
          label: "水位",
          alterSensorTypeId: 83
        },
        {
          label: "雨量",
          alterSensorTypeId: 84
        },
        {
          label: "潮位",
          alterSensorTypeId: 81
        }
      ],
      options3: [
        {
          value: 2,
          label: "五分钟"
        },
        {
          value: 3,
          label: "小时"
        },
        {
          value: 1,
          label: "实时"
        }
      ],
      // options4: [
      //   {
      //     label: "√",
      //     value: 1
      //   },
      //   {
      //     label: " ",
      //     value: 0
      //   }
      // ],
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
      istrue: true,
      reportId: "",
      dialogVisible: false,
      add: false,
      edit: false,
      rows1: [],
      rows2: [],
      addform: {
        stationName: "",
        alterDate: "",
        alterSensorTypeName: "",
        createBy: [],
        createTime: "",
        errorDataReason: ""
      },
      page: 1,
      input: "",
      input1: "",
      pageSize: 10,
      total: null,
      currentPage: 1,
      stationCode: null,
      stationId: "",
      errorDataType: null,
      errorTimeSpace: [], //错误时段
      errorTimeSpace1: "", //错误时段5分钟
      errorValue: "",
      errorDataReRun: 1,
      confirValue: "",
      missDataType: "",
      missTimeSpace: [], //缺测时段
      missTimeSpace1: "", //缺测时段5分钟
      missDataReRun: 1,
      alterSensorTypeId: "",
      brokenAccordingId: ""
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
    this.goSecond();
  },
  methods: {
    //时间格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      return y + "-" + m;
    },
    //查询按钮change事件
    searchclick1() {
      this.page = 1;
      this.searchclick();
    },
    //分页change事件
    handleCurrentChange(val) {
      this.page = val;
      this.searchclick();
    },
    //数据中断屏蔽显示
    datachange() {
      // console.log(this.addform.errorDataReason)
      // console.log(this.addform.errorDataReason.includes("中断"))
      if (this.addform.errorDataReason.includes("中断") == true) {
        this.istrue = false;
      } else if (this.addform.errorDataReason.includes("中断") == false) {
        this.missDataType = "";
        this.missTimeSpace = "";
        this.missTimeSpace1 = "";
        this.missDataReRun = "";
        this.istrue = true;
      }
    },
    //数据类型五分钟/小时/实时对应不同时间选择器
    timechange() {
      if (this.errorDataType == "2") {
        this.istime = 0;
      } else if (this.errorDataType == "3") {
        this.istime = 1;
      } else {
        this.istime = 2;
      }
    },
    //缺测类型五分钟/小时/实时对应不同时间选择器
    timechange1() {
      if (this.missDataType == "2") {
        this.istime1 = 0;
      } else if (this.missDataType == "3") {
        this.istime1 = 1;
      } else {
        this.istime1 = 2;
      }
    },
    //获取所有数据的接口
    getAll() {
      this.$fetchGet(
        "manageDataMantain/getByCreateDate?createDate=" + this.datetimes,
        {
          page: this.page,
          pageSize: this.pageSize
        }
      )
        .then(response => {
          this.rows = response.list;
          this.total = response.total;
        })
        .catch(function(error) {});
    },
    //触发添加按钮
    addclick() {
      this.addform.createBy = [];
      this.addform.createTime = "";
      this.reportId = "";
      this.addform.stationName = "";
      this.addform.alterDate = "";
      this.stationCode = "";
      this.addform.errorDataReason = "";
      this.errorDataType = "";
      this.errorTimeSpace = "";
      this.errorTimeSpace1 = "";
      this.addform.alterSensorTypeName = "";
      this.alterSensorTypeId = "";
      this.errorValue = "";
      this.confirValue = "";
      this.errorDataReRun = "";
      this.missDataType = "";
      this.missTimeSpace = "";
      this.missTimeSpace1 = "";
      this.missDataReRun = "";
      this.brokenAccordingId = "";
      this.add = true;
    },
    //导出excel
    addexcel() {
      window.open(
        "/sq/manageDataMantain/getExcel?createTime=" + this.datetimes,
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
    //数据类型页面渲染label,value处理
    getFormate(val) {
      let str = "";
      this.options3.forEach((iteam, index) => {
        if (val == iteam.value) {
          str = iteam.label;
        }
      });
      return str;
    },
    //缺测数据类型页面渲染label,value处理
    getFormate3(val) {
      let strrr = "";
      this.options3.forEach((iteam, index) => {
        if (val == iteam.value) {
          strrr = iteam.label;
        }
      });
      return strrr;
    },
    //数据返算页面渲染label,value处理
    getFormate2(val) {
      let srr = "";
      if (val == 1) {
        srr = "√";
      } else {
        srr = "";
      }
      return srr;
    },
    //修改日期页面渲染label,value处理
    getFormate4(val) {
      let srr = "";
      if (val == 1) {
        srr = "√";
      } else {
        srr = "";
      }
      return srr;
    },
    //触发删除按钮
    deleteclick(row) {
      this.dialogVisible = true;
      this.reportId = row.reportId;
    },
    //触发编辑按钮
    editclick(row) {
      console.log(row.missDataType);
      if (row.errorDataType == undefined) {
        this.errorTimeSpace = row.errorTimeSpace;
      } else {
        if (row.errorDataType == 2) {
          this.errorTimeSpace1 = row.errorTimeSpace;
        } else {
          this.errorTimeSpace = row.errorTimeSpace.split("~");
        }
      }

      if (row.missDataType == undefined) {
        this.missTimeSpace1 = row.missTimeSpace;
      } else {
        if (row.missDataType == 2) {
          this.missTimeSpace1 = row.missTimeSpace;
        } else {
          this.missTimeSpace = row.missTimeSpace.split("~");
        }
      }
      if (row.errorDataReason.includes("中断") == true) {
        this.istrue = false;
      } else {
        this.istrue = true;
      }
      this.edit = true;
      this.reportId = row.reportId;
      this.addform.stationName = row.stationName;
      this.addform.alterDate = row.alterDate;
      this.addform.alterSensorTypeName = row.alterSensorTypeName;
      this.errorDataType = row.errorDataType;
      this.alterSensorTypeId = row.alterSensorTypeId;
      this.addform.errorDataReason = row.errorDataReason;
      this.errorDataReRun = row.errorDataReRun;
      this.errorValue = row.errorValue;
      this.confirValue = row.confirValue;
      this.missDataType = row.missDataType;
      this.missDataReRun = row.missDataReRun;
      this.addform.createTime = row.createTime;
      if (row.createBy !== undefined) {
        this.addform.createBy =
          row.createBy == "" ? [] : row.createBy.split(",");
      }
      this.stationCode = parseInt(row.stationCode);
      this.brokenAccordingId = row.brokenAccordingId;
    },
    //删除接口
    deleteclik() {
      this.$fetchGet(`manageDataMantain/delete?reportId=${this.reportId}`)
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
      (this.addform = {
        stationName: "",
        alterDate: "",
        alterSensorTypeName: "",
        createBy: [],
        createTime: "",
        errorDataReason: ""
      }),
        this.$refs.addform.resetFields();
    },
    //增加接口
    addDo() {
      console.log(this.missDataReRun);
      this.$refs["addform"].validate(valid => {
        if (valid) {
          let str;
          if (this.addform.createBy.length == 0) {
            str = "";
          } else {
            str = this.addform.createBy.join(",");
          }
          let strss1;
          let r1;
          let r2;
          if (this.addform.errorDataReason.includes("中断") == false) {
            r1 = "";
            strss1 = "";
            r2 = "";
          } else {
            if (this.missDataType == 2) {
              r1 = this.missDataType;
              r2 = this.missDataReRun;
              strss1 = this.missTimeSpace1;
            } else {
              r1 = this.missDataType;
              r2 = this.missDataReRun;
              if (this.missTimeSpace !== "") {
                strss1 = this.missTimeSpace.join("~");
              }
            }
          }
          let strss2;
          if (this.errorDataType == 2) {
            strss2 = this.errorTimeSpace1;
          } else {
            if (this.errorTimeSpace !== "") {
              strss2 = this.errorTimeSpace.join("~");
            }
          }
          this.$fetchPost(
            "manageDataMantain/insert",
            {
              alter_sensor_typename: this.addform.alterSensorTypeName,
              station_name: this.addform.stationName,
              create_time: this.addform.createTime,
              create_by: str,
              alter_date: this.addform.alterDate,
              error_data_reason: this.addform.errorDataReason,
              error_data_type: this.errorDataType,
              error_time_space: strss2,
              error_value: this.errorValue,
              confir_value: this.confirValue,
              error_data_re_run: this.errorDataReRun,
              miss_data_type: r1,
              miss_time_space: strss1,
              miss_data_re_run: r2,
              station_code: parseInt(this.stationCode),
              alter_sensor_type_id: this.alterSensorTypeId,
              broken_according_id: this.brokenAccordingId,
              alter_sensor_type_name: this
                .alterSensorTypeNamealterSensorTypeName
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
      console.log(this.missTimeSpace);
      this.$refs["addform"].validate(valid => {
        if (valid) {
          let strss;
          let s1;
          let s2;
          if (this.addform.errorDataReason.includes("中断") == false) {
            s1 = "";
            strss = "";
            s2 = "";
          } else {
            if (this.missDataType == undefined) {
              s1 = "";
              s2 = this.missDataReRun;
            } else {
              s1 = this.missDataType;
              s2 = this.missDataReRun;
              if (this.missDataType == 2) {
                strss = this.missTimeSpace1;
              } else {
                strss =
                  this.missTimeSpace == "" || this.missTimeSpace == undefined
                    ? ""
                    : this.missTimeSpace.join("~");
              }
            }
          }
          let strssr;
          if (this.errorDataType == 2) {
            strssr = this.errorTimeSpace1;
          } else {
            if (
              this.errorTimeSpace !== "" &&
              this.errorTimeSpace !== undefined
            ) {
              strssr = this.errorTimeSpace.join("~");
            }
          }

          this.$fetchPost(
            "manageDataMantain/update",
            {
              report_id: this.reportId,
              station_code: this.stationCode,
              station_name: this.addform.stationName,
              create_time: this.addform.createTime,
              create_by: this.addform.createBy.join(","),
              alter_date: this.addform.alterDate,
              error_data_reason: this.addform.errorDataReason,
              error_data_type: this.errorDataType,
              error_time_space: strssr,
              error_value: this.errorValue,
              confir_value: this.confirValue,
              error_data_re_run: this.errorDataReRun,
              miss_data_type: s1,
              miss_time_space: strss,
              miss_data_re_run: s2,
              station_code: parseInt(this.stationCode),
              alter_sensor_type_id: this.alterSensorTypeId,
              broken_according_id: this.brokenAccordingId,
              alter_sensor_type_name: this.addform.alterSensorTypeName
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
      this.$fetchGet("manageDataMantain/getByCreateDate", {
        page: this.page,
        pageSize: this.pageSize,
        stationName: this.input,
        createDate: this.datetimes,
        alterType: this.input1
      })
        .then(response => {
          this.rows = response.list;
          this.total = response.total;
        })
        .catch(function(error) {});
    },
    //测站站名信息接口
    goFirst() {
      this.$fetchGet("dropdown/getStation")
        .then(response => {
          this.rows1 = response;
        })
        .catch(function(error) {});
    },
    //错误判断依据接口
    goSecond() {
      this.$fetchGet("dropdown/getDictionary")
        .then(response => {
          this.rows2 = response;
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    //选择测站的change事件
    station() {
      this.rows1.map((item, i) => {
        if (item.stationName == this.addform.stationName) {
          this.stationCode = parseInt(item.stationCode); //传值
        }
      });
    },
    //检测项目的change事件
    sensor(e) {
      this.options1.map((item, i) => {
        if (item.label == e) {
          this.alterSensorTypeId = item.alterSensorTypeId; //传值
        }
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
.sectionTable .el-table__row .el-table td,
.el-table th.is-leaf {
  background: rgba(255, 255, 255, 1);
}
.el-input__inner {
  height: 30px;
}
.sectionTable .el-table__row {
  background: rgba(255, 255, 255, 1);
}
.sectionTable .el-table thead {
  border-radius: 6px;
}
.sectionTable .el-table__header-wrapper {
  border: none !important;
}
.sectionTable .el-table td,
.el-table th {
  padding: 0px !important;
}
.sectionTable .el-table thead.is-group th {
  border: 0;
  font-size: 14px;
  font-family: SimHei;
  font-weight: bold;
  line-height: 24px;
}
.label-test {
  text-align: left;
  padding-left: 30px;
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
.section1 .el-table {
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
.pag {
  margin-top: 15px;
  text-align: right;
  padding-right: 40px;
}
</style>

