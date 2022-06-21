<template>
  <div class="fullPanel">
    <div id="left-panel" v-if="showPanel">
      <div style="text-align: right">
        <el-button
          @click="onHide"
          size="small"
          icon="el-icon-caret-left"
          class="hidden-md-and-up"
        ></el-button>
      </div>
      <h5 style="font-weight: bold">Time to cook (minutes)</h5>
      <div style="margin-bottom: 20px">
        <form style="z-index: 1">
          <el-slider
            @change="handleTimeChange"
            v-model="time"
            show-input
            :step="5"
            :max="60"
          >
          </el-slider>
        </form>
      </div>

      <h5 style="font-weight: bold">People need to serve</h5>
      <div style="margin-bottom: 20px">
        <form>
          <el-slider
            @change="handleServingChange"
            v-model="serving"
            show-input
            :max="8"
            :min="1"
          >
          </el-slider>
        </form>
      </div>

      <h5 style="font-weight: bold">Pick the ingredients</h5>

      <div class="ingredients" v-for="item in ingredients" :key="item.type">
        <h6>{{ item.type }}</h6>
        <table
          class="buttons"
          v-for="i in Math.ceil(item.ingredients.length / 4)"
          :key="i"
        >
          <tr>
            <td
              v-for="ind in item.ingredients.slice((i - 1) * 4, i * 4)"
              :key="ind"
            >
              <Button :name="ind" :id="ind" :styler="styler" />
            </td>
          </tr>
        </table>
      </div>
      <div style="display:flex;">
        <el-button
          class="flex-grow-1"
          type="info"
          @click="handleClear"
          plain
          round
          style="margin-bottom: 0px"
          >Clear</el-button
        >
        <el-button
          class="flex-grow-1"
          type="primary"
          @click="handleConfirm"
          round
          >Confirm</el-button
        >
      </div>
    </div>

    <div class="hidePanel" v-if="!showPanel">
      <el-button
        class="show-panel-btn"
        @click="onHide"
        size="small"
        icon="el-icon-caret-right"
      ></el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
import ingredientData from "../../data/mockIngredients.json";
import Ingredient from "../components/Ingredient.js";

export default {
  name: "Home",
  data() {
    return {
      time: 30,
      serving: 3,
      ingredients: [],
      styler: "",
      screenWidth: "",
      showPanel: true,
    };
  },
  created() {
    this.getIngredients();
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    if (this.screenWidth <= 950) {
      this.styler = "btn-sml";
    } else {
      this.styler = "btn";
    }
    window.addEventListener("resize", () => {
      this.screenWidth = document.body.clientWidth;
      //console.log(this.screenWidth);
      //this.screenHeight = document.body.clientHeight;
      if (this.screenWidth <= 950) {
        this.styler = "btn-sml";
      } else {
        this.styler = "btn";
      }
    });
  },
  methods: {
    onHide() {
      this.showPanel = !this.showPanel;
      this.$emit("hidePanel", this.showPanel);
    },
    getIngredients() {
      this.ingredients = ingredientData;
    },
    handleTimeChange() {
      Ingredient.$emit("slider", [this.time, "time"]);
    },
    handleServingChange() {
      Ingredient.$emit("slider", [this.serving, "serving"]);
    },
    handleConfirm() {
      var width = document.body.clientWidth;
      //console.log(width)
      Ingredient.$emit("confirm");
      if (width < 600) {
        this.showPanel = false;
        this.$emit("hidePanel", this.showPanel);
      }
    },
    handleClear() {
      Ingredient.$emit("clear");
    },
  },
  components: {
    Button,
  },
};
</script>
<style>
.el-input--small {
  pointer-events: none !important;
}
.fullPanel {
  height: 100%;
}

.buttons {
  width: 100%;
}

.buttons tr {
  width: 100%;
  display:flex;
}

.buttons td{
    flex: 1 1 0;
}

.buttons label {
  width: 100%;
  margin: 0px;
  padding: 0px;
}
#left-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* min-width: 400px; */
  padding: 0px 20px 20px 20px;
  border-right: 1px solid #ddd;
  box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 40%);
}

#left-panel > * {
  margin: 10px 0;
}

@media (max-width: 968px) {
  #left-panel > * {
    margin: 5px 0;
  }
}

.hidePanel {
  position: relative;
  height: 100%;
  top: 20%;
  /* margin-top: 5px; */
  text-align: left;
  font-size: 16px;
}

.show-panel-btn {
  height: 20%;
  /* width: 5px !important; */
  padding: 0 !important;
  border-radius: 0 10px 10px 0 !important;
}

</style>
