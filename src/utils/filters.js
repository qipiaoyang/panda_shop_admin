module.exports = {
  userstatus: function(e) {
    const data = {
      "0": "禁用",
      "1": "启用"
    };
    return data[e]
  },
  menustatus: function(e) {
    const data = {
      "0": "启用",
      "1": "禁用"
    };
    return data[e]
  },
  payStatus: function(e) {
    const data = {
      "1": "待付款",
      "2": "已付款",
      "3": "已取消",
      "4": "已完成",
      "5": "退款申请中～",
    };
    return data[e]
  },
  timeStampToYMR: function(timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "年" +
      (d.getMonth() + 1) + "月" +
      (d.getDate()) + "日";
    return date;
  },
  timeStampToYMRDot: function(timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "." +
      (d.getMonth() + 1) + "." +
      (d.getDate());
    return date;
  },
  timeStampToYMRHMS: function(timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" +
      (d.getMonth() + 1) + "-" +
      (d.getDate()) + " " +
      (d.getHours()) + ":" +
      (d.getMinutes()) + ":" +
      (d.getSeconds());
    return date;
  }
}
