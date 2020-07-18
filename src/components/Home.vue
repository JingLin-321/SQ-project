<template>
  <div class="container3">
    <div class="title">
      <div class="left-box">
        <div class="messDo">
          <img src="../assets/icon_warning.png" alt />
          <div class="gundong">
            <div class="topleft-wz">
              <span class="first-marquee">暂不开放预警提示！</span>
            </div>
          </div>
        </div>
      </div>
      <div class="middle-box">浦东新区智慧水情运维系统</div>
      <div class="right-box">
        <div class="detail-box">{{dealWithTime(date)}}</div>
        <div class="top-backbtn" @click="goback">
          <img src="../assets/back1.png" alt />
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="tab-left">
        <div class="TemBox">
          <div class="box1">
            <div class="box1-1">当前温度</div>
            <div class="box1-2">{{Temp1+"℃"}}</div>
          </div>
          <div class="box1">
            <div class="box1-1">当前湿度</div>
            <div class="box1-2">{{Hum1}}</div>
          </div>
          <div class="box1">
            <div class="box1-1">当前天气</div>
            <div class="box1-2">{{Daya}}</div>
          </div>
        </div>
        <div class="TemBox" style="margin-bottom:5px;">
          <div class="box1">
            <div class="box1-1">机房温度</div>
            <div :class="activeClass3==1?'box1-2-1':'box1-2'">{{Temp+"℃"}}</div>
          </div>
          <div class="box1">
            <div class="box1-1">机房湿度</div>
            <div class="box1-2">{{parseInt(Hum)+"%"}}</div>
          </div>
          <div class="box1">
            <div class="box1-1">机房监控</div>
            <el-popover placement="right" width="500" trigger="click">
              <div class="player">
                <video-player class="video-player vjs-custom-skin" :options="playerOptions"></video-player>
              </div>
              <div class="box1-2" slot="reference">
                <img src="../assets/btn_monitor.png" alt />
              </div>
            </el-popover>
          </div>
        </div>
        <div class="YWQY">
          <div class="shuxian">
            <img src="../assets/shuxian1.png" alt />
          </div>
          <div class="ywqy-wz">运维企业</div>
        </div>
        <div class="ywqy-nb">
          <div class="ywqy-top">北片</div>
          <div class="ywqy-bottom">
            <div class="ywqy-bottom1">
              <div class="bottom-01">测站状况</div>
              <div class="bottom-02" id="myChart" :style="{width: '230px', height: '150px'}"></div>
              <div class="chart-num">
                <div class="chart-Num">{{nData.nstationNumber}}</div>
                <div class="chart-WZ">总站数</div>
              </div>
            </div>
            <div class="ywqy-bottom1">
              <div class="bottom-01">运维情况</div>
              <div class="ryn">
                <div class="ryn-01">
                  <div
                    v-for="(iteam,index) in  dataList"
                    :key="index"
                    :class="activeClass==index+1?'ryn-1 ryn-id':'ryn-1'"
                    @click="goDay1(iteam,index)"
                  >{{iteam}}</div>
                </div>
                <hr style="width: 170px;text-align:center;" />
              </div>
              <div class="ywpd">
                <div class="ypd-1">
                  <div class="num-yw-1">{{nData.nfindNumber}}</div>
                  <div class="wz-yw-1">已发现</div>
                </div>
                <div class="ypd-2">
                  <div class="yw-3">
                    <div class="wz-yw-2">已派单：</div>
                    <div class="num-yz-2">{{nData.nmalNumber}}</div>
                  </div>
                  <div class="yw-1">
                    <div class="wz-yw-3">处理中：</div>
                    <div class="num-yz-3">{{nData.nonResolveNumber}}</div>
                  </div>
                  <div class="yw-2">
                    <div class="wz-yw-4">已处理：</div>
                    <div class="num-yz-4">{{nData.nendResolveNumber}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ywqy-nb" style="margin-bottom:5px;">
          <div class="ywqy-top">南片</div>
          <div class="ywqy-bottom">
            <div class="ywqy-bottom1">
              <div class="bottom-01">测站状况</div>
              <div class="bottom-02" id="myChart1" :style="{width: '230px', height: '150px'}"></div>
              <div class="chart-num1">
                <div class="chart-Num">{{sData.sstationNumber}}</div>
                <div class="chart-WZ">总站数</div>
              </div>
            </div>
            <div class="ywqy-bottom1">
              <div class="bottom-01">运维情况</div>
              <div class="ryn">
                <div class="ryn-01">
                  <div
                    v-for="(iteam,index) in  dataList"
                    :key="index"
                    :class="activeClass1==index+1?'ryn-1 ryn-id':'ryn-1'"
                    @click="goDay2(iteam,index)"
                  >{{iteam}}</div>
                </div>
                <hr style="width: 170px;text-align:center;" />
              </div>
              <div class="ywpd">
                <div class="ypd-1">
                  <div class="num-yw-1">{{sData.sfindNumber}}</div>
                  <div class="wz-yw-1">已发现</div>
                </div>
                <div class="ypd-2">
                  <div class="yw-3">
                    <div class="wz-yw-2">已派单：</div>
                    <div class="num-yz-2">{{sData.smalNumber}}</div>
                  </div>
                  <div class="yw-1">
                    <div class="wz-yw-3">处理中：</div>
                    <div class="num-yz-3">{{sData.sonResolveNumber}}</div>
                  </div>
                  <div class="yw-2">
                    <div class="wz-yw-4">已处理：</div>
                    <div class="num-yz-4">{{sData.sendResolveNumber}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="YWJD">
          <div class="shuxian">
            <img src="../assets/shuxian1.png" alt />
          </div>
          <div class="ywqy-wz">实时运维进度</div>
          <div class="ywjd-qh">
            <div :class="activeClass4==1?'icol1-1':'icol1'" @click="getAllRun">全部</div>
            <div :class="activeClass5==1?'icol1-1':'icol1'" @click="getAllRunS">南片</div>
            <div :class="activeClass6==1?'icol1-1':'icol1'" @click="getAllRunN">北片</div>
          </div>
        </div>
      </div>
      <div class="tab-box">
        <div class="earth" id="earthMap"></div>
        <div class="select-earth">
          <el-select v-model="level" @change="getEarth" placeholder="站点级别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select-earth1">
          <el-select v-model="status" @change="getEarth" placeholder="站点状况">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select-earth2">
          <el-select v-model="snId" @change="getEarth" placeholder="站点所属">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="listLabel">
          <div class="listData">
            <img src="../assets/jux1.png" alt />
            <span class="dataLine">电压</span>
          </div>
          <div class="listData">
            <img src="../assets/jux2.png" alt />
            <span class="dataLine">雨量</span>
          </div>
          <div class="listData">
            <img src="../assets/jux4.png" alt />
            <span class="dataLine">水位</span>
          </div>
          <div class="listData">
            <img src="../assets/jux3.png" alt />
            <span class="dataLine">潮位</span>
          </div>
          <div class="listData">
            <img src="../assets/jux8.png" alt />
            <span class="dataLine">风速</span>
          </div>
          <div class="listData">
            <img src="../assets/jux7.png" alt />
            <span class="dataLine">流速</span>
          </div>
          <div class="listData">
            <img src="../assets/jux6.png" alt />
            <span class="dataLine">风向</span>
          </div>
          <div class="listData">
            <img src="../assets/jux5.png" alt />
            <span class="dataLine">气温</span>
          </div>
          <div class="listData">
            <img src="../assets/jux9.png" alt />
            <span class="dataLine">气压</span>
          </div>
        </div>
      </div>
      <div class="tab-right">
        <div class="ZNFX">
          <div class="shuxian">
            <img src="../assets/shuxian1.png" alt />
          </div>
          <div class="ywqy-wz">智能发现</div>
          <div class="ywjd-qh">
            <div class="htback" @click="goDate1">
              运维统计
              <img src="../assets/enter.png" alt />
            </div>
            <div class="htback" @click="goTable1">
              运维表格
              <img src="../assets/enter.png" alt />
            </div>
            <div class="htback" @click="goManager">
              后台管理
              <img src="../assets/enter.png" alt />
            </div>
          </div>
        </div>
        <div class="right-maintop">
          <div class="right-1">
            <div class="right-top">
              <div class="ywqy-top">数据异常</div>
              <div class="right-mx" @click="getPic">模型</div>
            </div>
            <div class="rightbox-01">
              <div class="rightbox-1">
                累计
                <span>{{errorData.dataErrorNumber}}</span>起
              </div>
              <div class="rightbox-1">
                本月
                <span>{{errorData.dataErrorNumberMonth}}</span>起
              </div>
            </div>
            <div class="rightbox-02">
              <div class="rightbox-2" id="main01">
                <div class="fxfx">数据分析发现</div>
                <div class="fxfx-num">
                  <span>{{errorData.dataAnalystNumber}}</span>起
                </div>
              </div>
              <div class="rightbox-2" id="main02">
                <div class="fxfx">回归模型发现</div>
                <div class="fxfx-num">
                  <span>{{errorData.modelNumber}}</span>起
                </div>
              </div>
            </div>
          </div>
          <div class="right-2">
            <div class="right-top">
              <div class="ywqy-top">设备异常</div>
              <div class="right-mx" @click="getPic1">模型</div>
            </div>
            <div class="rightbox-01">
              <div class="rightbox-1">
                累计
                <span>{{errorData.equipErrorNumber}}</span>起
              </div>
              <div class="rightbox-1">
                本月
                <span>{{errorData.equipErrorNumberMonth}}</span>起
              </div>
            </div>
            <div class="rightbox-02">
              <div class="rightbox-2" id="main03">
                <div class="fxfx">数据分析发现</div>
                <div class="fxfx-num">
                  <span>{{errorData.equipAnalystNumber}}</span>起
                </div>
              </div>
              <div class="rightbox-2" id="main04">
                <div class="fxfx">典型值发现发现</div>
                <div class="fxfx-num">
                  <span>{{errorData.typicalValueNumber}}</span>起
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="CTL">
          <div class="shuxian">
            <img src="../assets/shuxian1.png" alt />
          </div>
          <div class="ywqy-wz">畅通率不达标测站</div>
        </div>
        <div :class="activeClass2==1?'right-bottom right-bottom1':'right-bottom'">
          <div class="r-b-top">
            <div
              v-for="(iteam,index) in  dataList1"
              class="rb01"
              :key="index"
              @click="goSouth1(index)"
            >{{iteam}}</div>
          </div>

          <div class="r-b-bottom">
            <div class="rb-num">
              <span>{{patencyData.UnPatencyNumber}}</span>个
            </div>
            <div class="rb-bottomx">
              <div class="swiper-container swiper-container1">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in CTLData" :key="index">
                    <div class="bb01">
                      <div class="rb-num1">{{item.patencyRate+'%'}}</div>
                      <div class="rbwz1">{{item.stationName}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-bottom">
      <table>
        <thead>
          <tr>
            <th class="th01">站名</th>
            <th class="th01">站址</th>
            <th class="th01">异常类型</th>
            <th class="th01">判断依据</th>
            <th class="th01">维护人员</th>
            <th class="th01">处理备注</th>
            <th class="th02">维护状态</th>
          </tr>
        </thead>
      </table>
      <div class="swiper-container" id="swiper-containerone">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper01-one" v-for="(item,index) in RunData" :key="index">
            <div class="swiperData">
              <div class="swiper01">{{item.stationName}}</div>
              <div
                class="swiper01"
                style="overflow:hidden;text-overflow:ellipsis;
white-space: nowrap;"
              >{{item.stationAddress}}</div>
              <div class="swiper01">{{item.brokenName}}</div>
              <div class="swiper01">{{item.brokenAccording}}</div>
              <div class="swiper01">{{item.resolveUserId}}</div>
              <div class="swiper01">{{item.remark}}</div>
              <div class="swiper02">
                <el-steps :active="item.requestDesignatingStatus" align-center>
                  <el-step title="发现" :description="item.createTime"></el-step>
                  <el-step title="已派单" :description="item.requestDesignatingTime"></el-step>
                  <el-step title="处理中" :description="item.brokenOnResolveTime"></el-step>
                  <el-step title="已处理" :description="item.brokenResolveTime"></el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible1" width="77%" @close="handleClose">
      <div class="dia1" style="text-align: center;">
        <img src="../assets/sjycMx.png" alt />
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="77%" @close="handleClose">
      <div class="dia1" style="text-align: center;">
        <img src="../assets/sbycMx.png" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Swiper from "swiper";
import "videojs-contrib-hls";
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src:
              "http://hls01open.ys7.com/openlive/d08a8b27017045fca195f2a02e8c239a.m3u8"
          }
        ],
        poster: "",
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          fullscreenToggle: true //全屏按钮
        }
      },
      tableData: [],
      currentTemp: "",
      currentSD: "",
      realTime: "",
      activeName: "",
      myDate: new Date(), //时间
      Mymap: null,
      marker: null,
      Temp: "",
      Temp1: "",
      Hum: "",
      Hum1: "",
      infoWindow: null,
      date: new Date(),
      nData: [],
      sData: [],
      dataList: ["本日", "本月", "本年"], //左侧年月日的选项
      dataList1: ["南片", "北片"],
      activeClass: 1, //默认选中的样式
      activeClass1: 1,
      activeClass2: 0,
      activeClass3: 0,
      activeClass4: 1,
      activeClass5: 0,
      activeClass6: 0,
      errorData: [],
      patencyData: [],
      patencyData1: [],
      CTLData1: [],
      RunData: [],
      Daya: "",
      CTLData: [],
      options: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 1,
          label: "国家站"
        },
        {
          value: 0,
          label: "基本站"
        },
        {
          value: 2,
          label: "一般站"
        }
      ],
      options1: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 0,
          label: "离线"
        },
        {
          value: 2,
          label: "异常"
        }
      ],
      options2: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 42,
          label: "北片"
        },
        {
          value: 43,
          label: "南片"
        }
      ],
      level: "",
      status: "",
      snId: "",
      dialogVisible1: false,
      dialogVisible2: false,
      socket: null,
      earthData: [],
      markerArr: null,
      markerArr1: null,
      imgData: [
        require("../assets/1@3x.png"),
        require("../assets/2@3x.png"),
        require("../assets/3@3x.png")
      ],
      currentSD: "",
      id: 0,
      swiperone: null
    };
  },
  computed: {
    //视频播放
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  created() {
    console.log(this.$store.state.defaultActive);
    this.getTem(); //获取机房温度
    this.getNS(); //获取北片运维
    this.getSS(); //获取南片运维
    this.getError(); //获取数据异常
    this.goSouth(); //获取南片畅通率
    this.getTem1(); //获取温湿度
    this.getEarth(); //获取首页地图信息
    this.goRun1(); //底部轮播
  },
  mounted() {
    this.initMap(); //加载地图
    this.initTimeLj(); //时间初始化
    //   //关闭首页地图信息弹窗
    $(".container3").on("click", "#closebtn", e => {
      this.infoWindow.close();
    });
  },
  methods: {
    // initScoke() {
    //   let path=``
    //   if (typeof WebSocket === "undefined") {
    //     alert("您的浏览器不支持socket");
    //   } else {
    //     // 实例化socket
    //     this.socket = new WebSocket("http://10.1.30.210:50081/sq/malfunction/getN?date=1");
    //     // 监听socket连接
    //     this.socket.onopen = this.open;
    //     // 监听socket错误信息
    //     this.socket.onerror = this.error;
    //     // 监听socket消息
    //     this.socket.onmessage = this.getMessage;
    //   }
    // },
    // open() {
    //   console.log("socket连接成功");
    // },
    // error() {
    //   console.log("连接错误");
    // },
    // getMessage(msg) {
    //   console.log(msg.data);
    // },
    // send() {
    //   this.socket.send(params);
    // },
    // close() {
    //   console.log("socket已经关闭");
    // },
    initTimeLj() {
      // 定时器初始化
      this.timer = setInterval(() => {
        this.realTime = this.dealWithTime(new Date()); // 修改数据date
      }, 1000);
      this.$nextTick(() => {
        this.initawiper();
      });
      // 页面加载完后显示当前时间
      this.realTime = this.dealWithTime(new Date());

      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000);
    },
    //加载地图
    initMap() {
      this.Mymap = new AMap.Map("earthMap", {
        center: [121.576977, 31.286239],
        zoom: 12,
        mapStyle: "amap://styles/260b1e53cb580a4dbdb2a6258f0741ad"
      });
      this.Mymap.on("zoomend", e => {
        if (this.Mymap.getZoom() > 12) {
          this.markerArr1.hide();
          this.markerArr.show();
        } else {
          this.markerArr1.show();
          this.markerArr.hide();
        }
      });
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        offset: new AMap.Pixel(12, -13)
      });
      this.markerArr = new AMap.OverlayGroup();
      this.markerArr1 = new AMap.OverlayGroup();
      this.Mymap.add(this.markerArr);
      this.Mymap.add(this.markerArr1);
      new AMap.DistrictSearch({
        extensions: "all",
        subdistrict: 0
      }).search("浦东新区", (status, result) => {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true)
        ];
        //地图分界线
        var holes = result.districtList[0].boundaries;
        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: "#92CCED",
          strokeWeight: 1,
          fillColor: "#0D1635",
          fillOpacity: 0.5
        });
        polygon.setPath(pathArray);
        this.Mymap.add(polygon);
      });
    },
    goManager() {
      this.$store.state.defaultActive = "3-2";
      this.$router.push({ path: "/Data2" });
    },
    goDate1() {
      this.$store.state.defaultActive = "1";
      this.$router.push({ path: "/Total" });
    },
    goTable1() {
      this.$store.state.defaultActive = "3-1";
      this.$router.push({ path: "/Run1" });
    },
    //获取北片运维
    goDay1(row, index) {
      this.activeClass = index + 1;
      this.$fetchGet("malfunction/getN?date=" + this.activeClass)
        .then(response => {
          this.nData = response;
          this.drawLine(this.nData);
          conosle.log(this.nData);
        })
        .catch(error => {});
    },
    //获取南片运维
    goDay2(row, index) {
      this.activeClass1 = index + 1;
      this.$fetchGet("malfunction/getS?date=" + this.activeClass1)
        .then(response => {
          this.sData = response;
          this.drawLine1(this.sData);
        })
        .catch(error => {});
    },
    //轮播图
    initawiper() {
      this.swiperone = new Swiper("#swiper-containerone", {
        loop: true,
        autoplay: 3000,
        direction: "vertical",
        slidesPerView: 2,
        slidesPerGroup: 2,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      new Swiper(".swiper-container1", {
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        autoplay: 3000,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
    //创建点标记
    markerslist(row) {
      // 创建一个 Icon
      let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(17, 17),
        // 图标的取图地址
        image: this.imgData[row.status],
        // 图标所用图片大小
        imageSize: new AMap.Size(17, 17)
      });
      let marker = new AMap.Marker({
        icon: startIcon,
        position: [row.stationGaodeLongitude, row.stationGaodeLatitude],
        offset: new AMap.Pixel(-8, -8),
        extData: row,
        label: {
          offset: new AMap.Pixel(-15, 20), //设置文本标注偏移量
          content: `<div class='info'><div style="text-align:center;">${
            row.stationName
          }</div>
        <div style="display:${
          row.electric !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux1.png")}" alt=""><span style="font-size:14px;">${
            row.electric
          }V</span></div>
        <div style="display:${
          row.rainfall !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux2.png")}" alt=""><span style="font-size:14px;">${
            row.rainfall
          }mm</span></div>
        <div style="display:${
          row.waterLevel !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux4.png")}" alt=""><span style="font-size:14px;">${
            row.waterLevel
          }m</span></div>
        <div style="display:${
          row.tideLevel !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux3.png")}" alt=""><span style="font-size:14px;">${
            row.tideLevel
          }m</span></div>
        <div style="display:${
          row.windSpeed !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux8.png")}" alt=""><span style="font-size:14px;">${
            row.windSpeed
          }m/s</span></div>
        <div style="display:${
          row.flowVelocityX !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux7.png")}" alt=""><span style="font-size:14px;">${
            row.flowVelocityX
          }m/s</span></div>
        <div style="display:${
          row.windDirection !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux6.png")}" alt=""><span style="font-size:14px;">${
            row.windDirectionName
          }${row.windDirection}</span></div>
        <div style="display:${
          row.airTemperature !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux5.png")}" alt=""><span style="font-size:14px;">${
            row.airTemperature
          }℃</span></div>
        <div style="display:${
          row.airPressure !== "" ? "block" : "none"
        }"><img src="${require("../assets/jux9.png")}" alt=""><span style="font-size:14px;">${
            row.airPressure
          }hpa</span></div>
        </div>`, //设置文本标注内容
          direction: "bottom" //设置文本标注方位}
        }
      });
      //实例化信息窗体

      marker.on("click", e => {
        this.infoWindow.setContent(this.setContentsa(row));
        this.infoWindow.open(this.Mymap, [
          row.stationGaodeLongitude,
          row.stationGaodeLatitude
        ]);
      });

      // marker.on("click", e => {
      //   infoWindow.close();
      // });
      // marker.setMap(this.Mymap);
      return marker;
    },
    //创建点标记
    markerslist1(row) {
      // 创建一个 Icon
      let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(17, 17),
        // 图标的取图地址
        image: this.imgData[row.status],
        // 图标所用图片大小
        imageSize: new AMap.Size(17, 17)
      });
      let marker = new AMap.Marker({
        icon: startIcon,
        position: [row.stationGaodeLongitude, row.stationGaodeLatitude],
        offset: new AMap.Pixel(-8, -8),
        extData: row
      });
      //实例化信息窗体

      marker.on("click", e => {
        this.infoWindow.setContent(this.setContentsa(row));
        this.infoWindow.open(this.Mymap, [
          row.stationGaodeLongitude,
          row.stationGaodeLatitude
        ]);
      });

      // marker.on("click", e => {
      //   infoWindow.close();
      // });
      // marker.setMap(this.Mymap);
      return marker;
    },
    setContentsa(row) {
      return `<div class="closebox" style="width:319px;
background:rgba(13,24,58,1);
border:1px solid rgba(0,101,178,1);text-align:left;">
<img id="closebtn" width="15" height="15" style="float:right;" src="${require("../assets/close.png")}" alt="">
<p style="margin-top: 8px;padding-left:40px;">测站名:${row.stationName}</p>
      <p style="margin-top: 8px;padding-left:40px;">上传时间:${row.time}</p>
     <div style="margin-top: 8px; display: flex;
          justify-content: space-between; padding-left: 40px;
          padding-right: 40px;"><span style="display:${
            row.electric !== "" ? "block" : "none"
          }">测站电压:${row.electric}V</span>
     <span style="display:${row.waterLevel !== "" ? "block" : "none"}">水位：${
        row.waterLevel
      }m</span></div>
     <div style="margin-top: 8px; display: flex;
          justify-content: space-between; padding-left: 40px;
          padding-right: 40px;"><span style="display:${
            row.rainfall !== "" ? "block" : "none"
          }">雨量:${row.rainfall}mm</span>
     <span style="display:${row.tideLevel !== "" ? "block" : "none"}">潮位：${
        row.tideLevel
      }m</span></div>
    <div style="margin-top: 8px; display: flex;
          justify-content: space-between; padding-left: 40px;
          padding-right: 40px;"><span style="display:${
            row.windDirection !== "" ? "block" : "none"
          }">风向:${row.windDirectionName}${row.windDirection}</span>
    <span style="display:${row.windSpeed !== "" ? "block" : "none"}">风速：${
        row.windSpeed
      }m/s</span></div>
      <div style="margin-top: 8px; display: flex;
          justify-content: space-between; padding-left: 40px;
          padding-right: 40px;"><span style="display:${
            row.flowVelocityX !== "" ? "block" : "none"
          }">流速X:${row.flowVelocityX}m/s</span>
      <span style="display:${
        row.flowVelocityY !== "" ? "block" : "none"
      }">流速Y：${row.flowVelocityY}m/s</span></div>
       <div style="margin-top: 8px; display: flex;
          justify-content: space-between; padding-left: 40px;
          padding-right: 40px;"><span style="display:${
            row.airTemperature !== "" ? "block" : "none"
          }">气温:${row.airTemperature}℃</span>
       <span style="display:${
         row.airPressure !== "" ? "block" : "none"
       }">气压：${row.airPressure}hpa</span></div>
      </div>`;
    },
    //渲染点
    mapView() {
      this.removeMarkers();
      let points = [];
      let points1 = [];
      this.earthData.forEach(iteam => {
        points.push(this.markerslist(iteam));
        points1.push(this.markerslist1(iteam));
      });
      this.markerArr.addOverlays(points);
      this.markerArr.hide();
      this.markerArr1.addOverlays(points1);
    },
    //清除点标记
    removeMarkers() {
      let arr = this.Mymap.getAllOverlays("marker");
      if (arr.length > 0) {
        this.Mymap.remove(arr);
      }
    },
    //清除定时器
    start() {
      this.time = setInterval(() => {
        if (this.id < this.items.length) {
          this.id += 1;
          this.items.push(this.items[0]);
        } else {
          this.id = 0;
          clearInterval();
        }
      }, 1500);
    },
    //格式化时间
    dealWithTime(data) {
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      formatDateTime =
        Y + "年" + M + "月" + D + "日 " + H + ":" + Min + ":" + S;
      return formatDateTime;
    },
    //获取机房温度
    getTem() {
      this.$fetchGet("haikang/getDeviceConfig")
        .then(response => {
          console.log(response.temperature);
          this.Temp = response.temperature;
          this.Hum = response.humidity;
          if (this.Temp > 25) {
            this.activeClass3 = 1;
          } else {
            this.activeClass3 = 0;
          }
        })
        .catch(error => {});
    },
    //获取温湿度
    getTem1() {
      this.$fetchGet("haikang/getWeather")
        .then(response => {
          this.Temp1 = response.currentTemp;
          this.Hum1 = response.currentShidu;
          this.Daya = response.day.type;
        })
        .catch(error => {});
    },
    //获取首页地图信息
    getEarth() {
      this.$fetchGet("station/getLocation", {
        level: this.level,
        status: this.status,
        snId: this.snId
      })
        .then(response => {
          this.earthData = response;
          this.mapView();
        })
        .catch(error => {});
    },
    //首页默认获取北片运维
    getNS() {
      this.$fetchGet("malfunction/getN?date=" + 1)
        .then(response => {
          this.nData = response;
          this.drawLine(this.nData);
        })
        .catch(error => {});
    },
    //首页默认获取南片运维
    getSS() {
      this.$fetchGet("malfunction/getS?date=" + 1)
        .then(response => {
          this.sData = response;
          this.drawLine1(this.sData);
        })
        .catch(error => {});
    },
    //获取数据异常
    getError() {
      this.$fetchGet("dataEquip/get")
        .then(response => {
          this.errorData = response;
        })
        .catch(error => {});
    },
    handleClose() {
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
    },
    //获取北片畅通率
    getPatency() {
      this.$fetchGet("malfunction/Npatency")
        .then(response => {
          this.patencyData = response;
          this.CTLData = response.List;
        })
        .catch(error => {});
    },
    getPic() {
      this.dialogVisible1 = true;
    },
    getPic1() {
      this.dialogVisible2 = true;
    },
    //畅通率切换按钮
    goSouth1(val) {
      this.activeClass2 = val;
      if (val == 0) {
        this.goSouth();
      } else {
        this.getPatency();
      }
    },
    //获取南片畅通率
    goSouth() {
      this.$fetchGet("malfunction/Spatency")
        .then(response => {
          this.patencyData = response;
          this.CTLData = response.List;
        })
        .catch(error => {});
    },
    //饼图
    drawLine(row) {
      // 基于准备好的dom，初始化echarts实例
      let lixiannum =
        row.nstationNumber -
        row.nabnormalStationNumber -
        row.nnormalStationNumber;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}：{c} "

          // ({d}%)   代表该模块所占圆环比例
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        //环形颜色
        color: ["#FF3C3C", "#0096ff", "#FFA028"],
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {c}代表数据
                formatter: " {b}\n\n{c}"
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 15,
                lineStyle: {
                  color: "#333"
                }
              }
            },
            data: [
              { value: row.nabnormalStationNumber, name: "故障站" },
              { value: row.nnormalStationNumber, name: "正常站" },
              { value: lixiannum, name: "离线站" }
            ]
          }
        ]
      });
      myChart.on("click", param => {
        let status =
          param.data.name == "正常站" ? 1 : param.data.name == "离线站" ? 0 : 2;
        // 可以使用下面的方式进行路由的切换
        this.$fetchGet("station/getLocation", {
          status: status,
          snId: 42
        })
          .then(response => {
            this.earthData = response;
            this.mapView();
          })
          .catch(error => {});
      });
    },
    drawLine1(row) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      let lixilv =
        row.sstationNumber -
        row.sabnormalStationNumber -
        row.snormalStationNumber;
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}：{c} "

          // ({d}%)   代表该模块所占圆环比例
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        //环形颜色
        color: ["#FF3C3C", "#0096ff", "#FFA028"],
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {c}代表数据
                formatter: " {b}\n\n{c}"
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 15,
                lineStyle: {
                  color: "#333"
                }
              }
            },
            data: [
              { value: row.sabnormalStationNumber, name: "故障站" },
              { value: row.snormalStationNumber, name: "正常站" },
              {
                value: lixilv,
                name: "离线站"
              }
            ]
          }
        ]
      });
      myChart.on("click", param => {
        // 可以使用下面的方式进行路由的切换
        let status =
          param.data.name == "正常站" ? 1 : param.data.name == "离线站" ? 0 : 2;
        this.$fetchGet("station/getLocation", {
          status: status,
          snId: 43
        })
          .then(response => {
            this.earthData = response;
            this.mapView();
          })
          .catch(error => {});
      });
    },
    goback() {
      this.$router.push({ path: "/" });
    },
    //底部轮播
    goRun1() {
      this.$fetchGet("malfunction/getLatest10")
        .then(response => {
          this.RunData = response;
        })
        .catch(error => {});
    },
    getAllRun() {
      this.goRun1();
      this.activeClass4 = 1;
      this.activeClass5 = 0;
      this.activeClass6 = 0;
    },
    getAllRunS() {
      this.activeClass4 = 0;
      this.activeClass5 = 1;
      this.activeClass6 = 0;
      this.$fetchGet("malfunction/getLatest10S")
        .then(response => {
          this.RunData = response;
        })
        .catch(error => {});
    },
    getAllRunN() {
      this.activeClass4 = 0;
      this.activeClass5 = 0;
      this.activeClass6 = 1;
      this.$fetchGet("malfunction/getLatest10N")
        .then(response => {
          this.RunData = response;
        })
        .catch(error => {});
    }
  }
};
</script>
<style type="text/css">
.container3 .el-dialog {
  widows: 1440px;
  height: 723px;
}

.container3 .el-dialog__body {
  padding-top: 0px;
  padding-left: 20px;
  background-color: #0d1635;
}
.container3 .dia1 {
  width: 1440px;
}

.container3 .el-dialog__header {
  padding: 0px;
}
</style>
<style lang="scss">
.amap-marker-label {
  background: none;
  border: none;
}
.closebox {
  position: relative;
}
#closebtn {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 10;
  cursor: pointer;
}
.tab-box {
  .select-earth .el-input--suffix .el-input__inner {
    background: none;
    padding: 0px;
    border: none;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .select-earth1 .el-input--suffix .el-input__inner {
    background: none;
    padding: 0px;
    border: none;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .select-earth2 .el-input--suffix .el-input__inner {
    background: none;
    padding: 0px;
    border: none;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .el-scrollbar__wrap {
    background-color: rgba(0, 35, 149, 0.2);
  }
  .el-input__inner {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(159, 206, 255, 1);
  }
}
.container3
  .tab
  .tab-right
  .right-maintop
  .right-1
  .rightbox-02
  .rightbox-2
  .fxfx-num
  span[data-v-8dc7cce2] {
  margin-right: 5px;
}
.container3
  .tab
  .tab-right
  .right-maintop
  .right-2
  .rightbox-02
  .rightbox-2
  .fxfx-num
  span[data-v-8dc7cce2] {
  margin-right: 5px;
}
.container3
  .tab
  .tab-right
  .right-maintop
  .right-2
  .rightbox-01
  .rightbox-1
  span[data-v-8dc7cce2] {
  margin-right: 5px;
}
.container3
  .tab
  .tab-right
  .right-bottom
  .r-b-bottom
  .rb-num
  span[data-v-8dc7cce2] {
  margin-right: 5px;
}
.container3
  .tab-bottom
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .swiperData[data-v-8dc7cce2] {
  height: 79.5px;
}
.tab-bottom .el-step__icon {
  position: absolute;
}
.tab-bottom .el-step__main {
  height: 79.5px;
  line-height: 79.5px;
}
.tab-bottom .el-step__title.is-finish {
  padding-top: 12px;
  padding-left: 20px;
}
.tab-bottom .el-step.is-center .el-step__description {
  padding-left: 64px;
}
.tab-bottom .el-steps--horizontal {
  padding-top: 0px;
}
.tab-bottom .el-step__title.is-process {
  padding-top: 12px;
  padding-left: 20px;
}
.tab-bottom .el-step__title.is-wait {
  padding-top: 12px;
  padding-left: 20px;
}
.ryn .el-tabs__content {
  display: none;
}
.tab-bottom .el-step__title.is-process {
  color: #c0c4cc;
  font-weight: 100;
}
.tab-bottom .el-step__description.is-process {
  color: #c0c4cc;
}
// .tab-bottom .el-step__icon-inner{
//   color: black;
// }
.tab-bottom .el-step__head.is-finish {
  color: #409eff;
}
</style>
<style lang="scss" scoped>
.container3 {
  width: 1920px;
  height: 1080px;
  display: flex;
  color: white;
  background: #0d1635;
  flex-direction: column;
  .title {
    width: 100%;
    height: 90px;
    background: url(../assets/backg.png) no-repeat;
    display: flex;
    flex-direction: row;
    .middle-box {
      width: 452px;
      height: 100%;
      font-size: 36px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(146, 204, 237, 1);
      line-height: 90px;
      background: linear-gradient(
        0deg,
        rgba(87, 181, 255, 1) 0%,
        rgba(0, 90, 255, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 225px;
    }
    .left-box {
      width: 467px;
      height: 45px;
      font-size: 24px;
      font-family: SimHei;
      font-weight: bold;
      color: rgba(230, 152, 46, 1);
      line-height: 42px;
      margin-left: 22px;
      margin-top: 30px;

      .messDo {
        height: 54px;
        line-height: 54px;
        display: flex;
        flex-direction: row;
        img {
          margin-right: 8px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .gundong {
          flex: 1;
          height: 100%;
          line-height: 100%;
          overflow: hidden;
          .topleft-wz {
            height: 100%;
            margin: 0 auto;
            white-space: nowrap;
            position: relative;

            line-height: 100%;
          }
          /* 需要将两个文字内容一样的span放在最右边 */
          .topleft-wz span {
            position: absolute;
            top: 0;
            left: 100%;
            height: 54px;
            line-height: 54px;
          }
          /* 定义第一个span的animation：时长 动画名字 匀速 循环 正常播放 */
          .first-marquee {
            -webkit-animation: 25s first-marquee linear infinite normal;
            animation: 25s first-marquee linear infinite normal;
            padding-right: 70%;
          }

          @keyframes first-marquee {
            0% {
              -webkit-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
            }

            /* 向左移动 */
            100% {
              -webkit-transform: translate3d(-200%, 0, 0);
              transform: translate3d(-200%, 0, 0);
              display: none;
            }
          }
        }
      }
    }
    .right-box {
      width: 310px;
      height: 90px;
      font-size: 24px;
      font-family: SimHei;
      font-weight: 400;
      color: rgba(159, 206, 255, 1);
      line-height: 90px;
      margin-left: 320px;
      position: relative;
      .detail-box {
        width: 310px;
        height: 90px;
        font-size: 24px;
        font-family: SimHei;
        font-weight: 400;
        color: rgba(159, 206, 255, 1);
        line-height: 90px;
      }
      .top-backbtn {
        position: absolute;
        top: 0px;
        left: 385px;
        width: 20px;
        height: 70px;
        cursor: pointer;
        img {
          margin-top: 25px;
        }
      }
    }
  }
  .tab {
    width: 100%;
    height: 780px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin-left: 22px;
    .tab-left {
      width: 467px;
      height: 100%;
      .TemBox {
        width: 467px;
        height: 80px;
        border: 1px solid rgba(0, 144, 255, 0.6);
        background: url(../assets/xg-1.png);
        margin-bottom: 14px;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        .box1 {
          width: 166px;
          height: 80px;
          display: flex;
          flex-direction: column;
          .box1-1 {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 22px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(159, 206, 255, 1);
          }

          .box1-2 {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 28px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(159, 206, 255, 1);
            img {
              cursor: pointer;
            }
          }
          .box1-2-1 {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 28px;
            font-family: SimHei;
            font-weight: 400;
            color: #ea2b17;
            img {
              cursor: pointer;
            }
          }
        }
      }
      .YWQY {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        .shuxian {
          margin-left: 5px;
          height: 25px;
          margin-top: 8px;
        }
        .ywqy-wz {
          width: 92px;
          height: 40px;
          font-size: 22px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-left: 11px;
        }
      }
      .ywqy-nb {
        width: 467px;
        height: 250px;
        background: url(../assets/xg-2.png);
        // background: rgba(14,31,87,0.4);
        border: 1px solid rgba(0, 144, 255, 0.4);
        margin-bottom: 10px;
        box-sizing: border-box;
        .ywqy-top {
          width: 210px;
          height: 41px;
          margin-left: 134px;
          margin-top: 18px;
          background: url(../assets/kuang.png) no-repeat;
          text-align: center;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 41px;
        }
        .ywqy-bottom {
          width: 100%;
          height: 190px;
          display: flex;
          flex-direction: row;
          .ywqy-bottom1 {
            width: 50%;
            height: 100%;
            .bottom-01 {
              width: 100%;
              height: 25px;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(117, 178, 247, 1);
              line-height: 25px;
              text-align: center;
              margin-top: 10px;
            }
            .bottom-02 {
              width: 100%;
              height: 150px;
            }
            .chart-num {
              position: absolute;
              left: 110px;
              top: 451px;
              width: 56px;
              height: 52px;
              text-align: center;
              .chart-Num {
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 30px;
              }
              .chart-WZ {
                font-size: 18px;
                font-family: Microsoft YaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 18px;
              }
            }
            .chart-num1 {
              position: absolute;
              left: 110px;
              top: 712px;
              width: 56px;
              height: 52px;
              text-align: center;
              .chart-Num {
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 30px;
              }
              .chart-WZ {
                font-size: 18px;
                font-family: Microsoft YaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 18px;
              }
            }
            .ryn {
              width: 177px;
              height: 40px;
              margin-left: 26px;
              .ryn-01 {
                width: 177px;
                height: 20px;
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                .ryn-1 {
                  width: 58px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  cursor: pointer;
                }
                .ryn-id {
                  color: #75b2f7;
                  font-weight: bold;
                }
              }
            }
            .ywpd {
              width: 100%;
              height: 110px;
              display: flex;
              flex-direction: row;
              .ypd-1 {
                width: 40%;
                height: 100%;
                .num-yw-1 {
                  width: 100%;
                  height: 50px;
                  font-size: 34px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(255, 114, 0, 1);
                  line-height: 50px;
                  text-align: center;
                }
                .wz-yw-1 {
                  width: 100%;
                  height: 50px;
                  font-size: 18px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #ffffff;
                  line-height: 50px;
                  text-align: center;
                }
              }
              .ypd-2 {
                width: 60%;
                height: 100%;
                .yw-3 {
                  width: 100%;
                  height: 30%;
                  display: flex;
                  flex-direction: row;
                  .wz-yw-2 {
                    width: 100%;
                    height: 100%;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 33px;
                    text-align: center;
                  }
                  .num-yz-2 {
                    width: 100%;
                    height: 100%;
                    font-size: 32px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffcc00;
                    line-height: 33px;
                    text-align: center;
                  }
                }
                .yw-1 {
                  width: 100%;
                  height: 30%;
                  display: flex;
                  flex-direction: row;
                  .wz-yw-3 {
                    width: 100%;
                    height: 100%;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 33px;
                    text-align: center;
                  }
                  .num-yz-3 {
                    width: 100%;
                    height: 100%;
                    font-size: 32px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffcc00;
                    line-height: 33px;
                    text-align: center;
                  }
                }

                .yw-2 {
                  width: 100%;
                  height: 30%;
                  display: flex;
                  flex-direction: row;
                  .wz-yw-4 {
                    width: 100%;
                    height: 100%;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 33px;
                    text-align: center;
                  }
                  .num-yz-4 {
                    width: 100%;
                    height: 100%;
                    font-size: 32px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #0ef9b3;
                    line-height: 33px;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
      .YWJD {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        .shuxian {
          margin-left: 5px;
          height: 25px;
          margin-top: 8px;
        }
        .ywqy-wz {
          width: 150px;
          height: 40px;
          font-size: 22px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-left: 11px;
        }
        .ywjd-qh {
          width: 220px;
          height: 40px;
          display: flex;
          flex-direction: row;
          margin-left: 90px;
          margin-top: 5px;

          .icol1 {
            width: 65px;
            height: 26px;
            margin-right: 5px;
            background: url(../assets/11.png) no-repeat;
            text-align: center;
            line-height: 26px;
            cursor: pointer;
          }
          .icol1-1 {
            width: 65px;
            height: 26px;
            margin-right: 5px;
            background: url(../assets/11.png) no-repeat;
            text-align: center;
            line-height: 26px;
            color: #409eff;
            cursor: pointer;
          }
        }
      }
    }
    .tab-box {
      width: 895px;
      height: 100%;
      .earth {
        width: 100%;
        height: 100%;
      }
      .select-earth {
        z-index: 1;
        position: absolute;
        left: 1111px;
        top: 123px;
        width: 126px;
        height: 34px;
        background: rgba(0, 35, 149, 0.2);
        border: 1px solid rgba(0, 144, 255, 1);
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
      .select-earth1 {
        z-index: 1;
        position: absolute;
        left: 1246px;
        top: 123px;
        width: 126px;
        height: 34px;
        background: rgba(0, 35, 149, 0.2);
        border: 1px solid rgba(0, 144, 255, 1);
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
      .select-earth2 {
        z-index: 1;
        position: absolute;
        left: 975px;
        top: 123px;
        width: 126px;
        height: 34px;
        background: rgba(0, 35, 149, 0.2);
        border: 1px solid rgba(0, 144, 255, 1);
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
      .listLabel {
        z-index: 1;
        position: absolute;
        left: 530px;
        top: 650px;
        width: 110px;
        height: 220px;
        .listData {
          width: 100%;
          margin-bottom: 8px;
          height: 17px;
          line-height: 17px;
        }
        .dataLine {
          height: 17px;
          line-height: 17px;
          font-size: 17px;
          margin-left: 5px;
        }
      }
    }
    .tab-right {
      width: 508px;
      height: 100%;
      .ZNFX {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        .shuxian {
          margin-left: 5px;
          height: 25px;
          margin-top: 8px;
        }
        .ywqy-wz {
          width: 150px;
          height: 40px;
          font-size: 22px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-left: 11px;
        }
        .ywjd-qh {
          width: 400px;
          height: 40px;
          display: flex;
          flex-direction: row;
          margin-top: 7px;
          .htback {
            width: 125px;
            height: 26px;
            margin-right: 5px;
            background: url(../assets/button-frame.png) no-repeat;
            text-align: center;
            line-height: 26px;
            cursor: pointer;
            img {
              margin-left: 10px;
            }
          }
        }
      }
      .right-maintop {
        width: 508px;
        height: 454px;
        background: rgba(14, 31, 87, 0.4);
        border: 1px solid rgba(0, 144, 255, 0.4);
        .right-1 {
          width: 100%;
          height: 200px;
          .right-top {
            width: 100%;
            height: 41px;
            display: flex;
            margin-top: 17px;
            flex-direction: row;
            .ywqy-top {
              width: 210px;
              height: 41px;
              margin-left: 142px;

              background: url(../assets/kuang.png) no-repeat;
              text-align: center;
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 41px;
            }
            .right-mx {
              width: 70px;
              height: 32px;
              background: url(../assets/11.png) no-repeat;
              margin-left: 60px;
              margin-top: 8px;
              text-align: center;
              line-height: 25px;
              cursor: pointer;
            }
          }
          .rightbox-01 {
            width: 450px;
            height: 70px;
            background: url(../assets/right-back.png) no-repeat;
            display: flex;
            flex-direction: row;
            margin-left: 29px;
            .rightbox-1 {
              width: 50%;
              height: 100%;
              line-height: 70px;
              text-align: center;
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(117, 178, 247, 1);

              span {
                font-size: 33px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffc600;
                line-height: 66px;
                margin-right: 5px;
              }
            }
          }
          .rightbox-02 {
            width: 100%;
            height: 80px;
            display: flex;
            flex-direction: row;
            #main01 {
              background: url(../assets/x01.png) no-repeat;
            }
            #main02 {
              background: url(../assets/x02.png) no-repeat;
            }
            .rightbox-2 {
              width: 250px;
              height: 100%;
              background: url(../assets/x01.png) no-repeat;
              margin-left: 16px;
              .fxfx {
                width: 153px;
                height: 30px;
                margin-left: 74px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(117, 178, 247, 1);
                line-height: 30px;
              }
              .fxfx-num {
                width: 153px;
                height: 30px;
                margin-left: 74px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(117, 178, 247, 1);
                line-height: 30px;
                span {
                  height: 30px;
                  font-size: 33px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #0ef9b3;
                  line-height: 30px;
                }
              }
            }
          }
        }
        .right-2 {
          width: 100%;
          height: 200px;
          .right-top {
            width: 100%;
            height: 41px;
            display: flex;
            margin-top: 17px;
            flex-direction: row;
            .ywqy-top {
              width: 210px;
              height: 41px;
              margin-left: 142px;
              background: url(../assets/kuang.png) no-repeat;
              text-align: center;
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 41px;
            }
            .right-mx {
              width: 70px;
              height: 32px;
              background: url(../assets/11.png) no-repeat;
              margin-left: 60px;
              margin-top: 8px;
              text-align: center;
              line-height: 25px;
              cursor: pointer;
            }
          }
          .rightbox-01 {
            width: 450px;
            height: 70px;
            background: url(../assets/right-back.png) no-repeat;
            display: flex;
            flex-direction: row;
            margin-left: 29px;
            .rightbox-1 {
              width: 50%;
              height: 100%;
              line-height: 70px;
              text-align: center;
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(117, 178, 247, 1);

              span {
                font-size: 33px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffc600;
                line-height: 66px;
              }
            }
          }
          .rightbox-02 {
            width: 100%;
            height: 80px;
            display: flex;
            flex-direction: row;

            #main03 {
              background: url(../assets/x01.png) no-repeat;
            }
            #main04 {
              background: url(../assets/x03.png) no-repeat;
            }
            .rightbox-2 {
              width: 250px;
              height: 100%;

              margin-left: 16px;
              .fxfx {
                width: 153px;
                height: 30px;
                margin-left: 74px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(117, 178, 247, 1);
                line-height: 30px;
              }
              .fxfx-num {
                width: 153px;
                height: 30px;
                margin-left: 74px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(117, 178, 247, 1);
                line-height: 30px;
                span {
                  height: 30px;
                  font-size: 33px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #0ef9b3;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
      .CTL {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        .shuxian {
          margin-left: 5px;
          height: 25px;
          margin-top: 8px;
        }
        .ywqy-wz {
          width: 185px;
          height: 40px;
          font-size: 22px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-left: 11px;
        }
      }
      .right-bottom {
        width: 508px;
        height: 229px;
        // border: 1px solid rgba(0, 101, 178, 1);
        background: url("../assets/xg-3.png") no-repeat;
        background-size: 100% 100%;
        .r-b-top {
          width: 100%;
          height: 35px;
          display: flex;
          flex-direction: row;
          .rb01 {
            width: 50%;
            height: 100%;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(117, 178, 247, 1);
            line-height: 35px;
            text-align: center;
            cursor: pointer;
          }
        }
        .r-b-bottom {
          width: 100%;
          height: 193px;
          .rb-num {
            width: 95px;
            height: 34px;
            // background: rgba(13, 24, 58, 0.5);
            // border: 1px solid rgba(33, 109, 253, 1);
            margin-left: 84px;
            font-size: 16px;
            font-family: zcoolqingkehuangyouti;
            font-weight: bold;
            color: #75b2f7;
            line-height: 34px;
            span {
              font-size: 30px;
              font-family: zcoolqingkehuangyouti;
              font-weight: bold;
              color: rgba(255, 60, 60, 1);
              line-height: 30px;
              margin-left: 25px;
            }
          }
          .rb-bottomx {
            width: 100%;
            height: 155px;

            .swiper-container1 {
              width: 508px;
              height: 100%;
              .swiper-wrapper {
                width: 100%;
                height: 100%;

                .swiper-slide {
                  // width: 100%;
                  // height: 100%;
                  // display: flex;
                  // flex-direction: row;
                  .bb01 {
                    width: 165px;
                    background: url(../assets/juxing-01.png) no-repeat;
                    margin-left: 10px;
                    margin-top: 18px;
                    .rb-num1 {
                      width: 100%;
                      height: 95px;
                      text-align: center;
                      line-height: 95px;
                      font-size: 20px;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: rgba(117, 178, 247, 1);
                    }
                    .rbwz1 {
                      width: 100%;
                      height: 28px;
                      text-align: center;
                      line-height: 28px;
                      font-size: 16px;
                      font-family: SimHei;
                      font-weight: 400;
                      color: rgba(159, 206, 255, 1);
                    }
                  }
                }
              }
            }
          }
        }
      }
      .right-bottom1 {
        background: url(../assets/xg-4.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .tab-bottom {
    flex: 1;
    table {
      width: 1871px;
      height: 193px;
      margin-left: 25px;
      border: none;
      border-spacing: 0px;

      thead {
        width: 100%;
        height: 34px;
        background: linear-gradient(
          0deg,
          rgba(26, 41, 194, 1),
          rgba(20, 34, 134, 1)
        );
        box-shadow: 0px 2px 13px 0px rgba(40, 143, 220, 0.9);
        opacity: 0.9;
        tr {
          width: 100%;
          height: 34px;
          .th01 {
            width: 10%;
            height: 100%;
            font-size: 18px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
            border: none;
          }
          .th02 {
            width: 40%;
            height: 100%;
            font-size: 18px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
            border: none;
          }
          .th03 {
            width: 40%;
            height: 100%;
            font-size: 18px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
            border: none;
          }
        }
      }
    }
    .swiper-container {
      width: 1871px;
      height: 159px;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          font-size: 18px;
          font-family: SimHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 80px;
          text-align: center;
          .swiperData {
            width: 100%;
            display: flex;
            flex-direction: row;
            .swiper01 {
              width: 188px;
              text-align: center;
            }
            .swiper02 {
              width: 746px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
