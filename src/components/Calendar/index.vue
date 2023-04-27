<!-- 日历 -->
<template>
  <div id="customizedCalendar" v-loading="calendarLoading">
    <el-calendar :first-day-of-week="7" v-model="value" v-if="showCalendar">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div
          slot="reference"
          :class="{ 'signed-in': !isSignInHandler(date) }"
          style="position: relative; z-index: 10"
          @click="checkSignInInfo(date)"
        >
          <p>{{ data.day.split("-").slice(2).join("-") }}</p>
        </div>
        <!-- <div v-if="data.isSelected" id="selectP"></div> -->
      </template>
    </el-calendar>
    <div id="button">
      <el-button @click="skip('preYear')" type="primary" round size="mini"
        ><i class="el-icon-arrow-left"></i>年
      </el-button>
      <el-button @click="skip('preMonth')" type="warning" round size="mini"
        ><i class="el-icon-arrow-left"></i>月
      </el-button>
      <!-- <el-button @click="skip('preDay')" type="success" round size="mini"><i class="el-icon-arrow-left"></i>日
      </el-button> -->
      <el-button @click="skip('today')" type="info" round size="mini"
        >今天</el-button
      >
      <!-- <el-button @click="skip('postDay')" type="success" round size="mini">日<i class="el-icon-arrow-right"></i>
      </el-button> -->
      <el-button @click="skip('postMonth')" type="warning" round size="mini"
        >月<i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button @click="skip('postYear')" type="primary" round size="mini"
        >年<i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { getSignInInfo } from "@/api/userInfo";
import { awaitWrap, formatTime } from "@/utils";
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      value: new Date(),
      // 已经签到的时间
      signIn: [],
      // 用户的创建时间
      createTime: "",
      nowTime: new Date(),
      // 日历loading
      calendarLoading: false,
      // 是否展示日历
      showCalendar: false,
    };
  },
  created() {
    this.init();
  },
  props: ["userId"],
  methods: {
    // 初始化
    async init() {
      this.calendarLoading = true;
      let result = await awaitWrap(getSignInInfo(this.userId));
      if (result) {
        // 处理一下返回的数据
        this.signIn = result.data.signIn.map((item) => {
          return item.signInTime.split(" ")[0];
        });
        this.createTime = formatTime(result.data.createTime);
      }
      setTimeout(() => {
        this.calendarLoading = false;
        this.showCalendar = true;
      }, 1000);
    },

    // 判断是否已经签到
    isSignInHandler(date) {
      // 0是year 1是month 2是day
      const time = formatTime(date);
      const begin = new Date(this.createTime).getTime();
      const pending = new Date(time).getTime();
      const now = new Date(formatTime(this.nowTime)).getTime();
      // 首先判断这个时间是否大于创建的时间
      // 并且不能超过今天的时间
      if (pending >= begin && pending <= now) {
        // console.log(time,this.createTime)
        // 是大于的 再进行处理
        // 当前这个日期是否再signIn里面
        return !(this.signIn.indexOf(time) > -1);
      } else {
        // 否则直接返回
        return true;
      }
    },

    // 查看签到的信息
    checkSignInInfo(date) {
      // 首先判断点击的是否签到了 如果没有签到 则直接返回
      if(this.isSignInHandler(date)){
        return
      }
      // 签到了 那么寻找签到的信息
      // this.signIn.indexOf(time)
      console.log(this.signIn)
      // const clickDate = moment(date).format("YYYY-MM-DD HH:mm:ss")
      // console.log(clickDate)
    },

    skip(flag) {
      if (flag === "preYear")
        this.value = new Date(
          this.value.setFullYear(this.value.getFullYear() - 1)
        );
      else if (flag === "preMonth")
        this.value = new Date(this.value.setMonth(this.value.getMonth() - 1));
      else if (flag === "preDay")
        this.value = new Date(this.value.setDate(this.value.getDate() - 1));
      else if (flag === "today") this.value = new Date();
      else if (flag === "postDay")
        this.value = new Date(this.value.setDate(this.value.getDate() + 1));
      else if (flag === "postMonth")
        this.value = new Date(this.value.setMonth(this.value.getMonth() + 1));
      else if (flag === "postYear")
        this.value = new Date(
          this.value.setFullYear(this.value.getFullYear() + 1)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
#customizedCalendar {
  width: 100%;
  height: 100%;

  #button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .signed-in {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #15ff2c !important;
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
  }

  #selectP {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
  }

  ::v-deep .el-calendar__header {
    // 修改头部背景颜色
    background-color: #fff;
    padding: 3px 5px;
    border: none;
    display: flex;
    justify-content: center;

    .el-calendar__button-group {
      // 隐藏原生按钮
      display: none;
    }

    .el-calendar__title {
      // 修改头部标题的字体颜色
      // color: white !important;
      color: #000;
      font-size: 18px;
      font-weight: bolder;
    }
  }

  ::v-deep .el-calendar__body {
    // 修改主题部分
    padding: 0;
  }

  ::v-deep .el-calendar-table {
    thead {
      th {
        // 修改头部星期部分
        padding: 0;
        // background-color: #57617c;
        // color: white;
      }
    }

    .is-selected {
      .el-calendar-day {
        // 选中日期颜色
        color: black;
        background: #fff;
      }
    }

    .el-calendar-day {
      // 每天小块样式设置
      padding: 0;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        // 所有日期颜色
        color: black;
        z-index: 1;
        user-select: none;
        display: flex;
      }
    }
  }

  ::v-deep .el-calendar-table__row {
    .prev,
    .next {
      // 修改非本月
      .el-calendar-day {
        p {
          color: #a8a8a8;
        }
      }
    }

    // td {
    //   // 修改每一个日期td标签
    //   &:first-child,
    //   &:last-child {
    //     // background-color: #f5f5f5;
    //   }
    // }
  }

  button {
    padding: 3px 10px;
  }
}
</style>
