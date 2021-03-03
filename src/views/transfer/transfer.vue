<template>
    <div>
        <el-alert
            title="可搜索穿梭框"
            type="success"
            description=""
            show-icon
            :closable='false'
            class="custom-table"
            style="margin-bottom: 20px"
        >
        </el-alert>
        <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入城市拼音"
            :titles="['原数据', '目标数据']"
            v-model="value"
            :data="data"
        >
        </el-transfer>
    </div>
</template>

<script>
export default {
  data() {
    const generateData = (_) => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>