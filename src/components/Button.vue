<template>
  <div class="button" :for="id" style="margin: 1px 2px 0px">
    <el-checkbox-button
      style="border-radius: 5px"
      :class="styler"
      :id="id"
      @change="handleClick"
      type="checkbox"
      v-model="checked"
      ref="selectedButton"
      :name="this.name"
    >
      {{ name }}
    </el-checkbox-button>
    <!-- <el-checkbox @change="handleClick" type="checkbox" v-model="checked" :id=id ref="selectedButton" :label="name" border>
      
    </el-checkbox> -->
    <!-- <label class="btn btn-outline-secondary" :for=id>{{name}}</label> -->
  </div>
</template>

<script>
import Ingredient from "./Ingredient.js";
export default {
  name: "Button",
  props: {
    name: String,
    id: String,
    styler: String,
  },
  data: function () {
    return {
      checked: false,
    };
  },
  mounted: function () {
    Ingredient.$on("clear", () => {
      this.checked = false;
    });
  },
  methods: {
    select: function () {
      if (this.$refs.selectedButton.checked == true) {
        //console.log(`select, ${this.id}`);
      }
    },
    handleClick: function () {
      Ingredient.$emit("click-ingredient", [this.name, this.checked]);
      //console.log("emited", this.name, this.checked);
    },
  },
};
</script>

<style>
.el-checkbox-button, .el-checkbox-button__inner {
    width: 100%;
}

.el-checkbox-button__inner {
  border-radius: 1rem !important;
}

.btn-sml span {
  padding: 5px 10px;
  border-radius: 0 !important;
}

label {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>