<template>
  <div class="home">
    <HeaderBar />

    <div class="main-container">
      <el-col class="left-panel" :xs="xsLeft" :sm="10" :lg="8">
        <LeftPanel @hidePanel="hidePanel" />
      </el-col>

      <el-col
        class="right-panel"
        :style="cardviewMargin"
        :xs="xsRight"
        :sm="14"
        :lg="16"
      >
        <SearchBar
          v-show="showSearch"
          @search-sent="search"
          :errMsg="errMsg"
          :showError="showError"
        />
        <el-scrollbar style="height: 100%">
          <div class="card-container" v-show="!showError">
            <div
              class="cards"
              v-for="(item, index) in filteredList"
              :key="index"
            >
              <Card :recipe="item" />
            </div>
          </div>
        </el-scrollbar>
      </el-col>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "bootstrap/dist/css/bootstrap.css";
import RecipeData from "/data/mock_data.json";
import LeftPanel from "@/views/LeftPanel.vue";
// Right panel components:
import SearchBar from "@/components/SearchBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Card from "@/components/Card.vue";
import Ingredient from "../components/Ingredient.js";
require("./Home.css");

export default {
  name: "Home",
  components: {
    LeftPanel,
    SearchBar,
    Card,
    HeaderBar,
  },
  data() {
    return {
      xsLeft: 23,
      xsRight: 1,
      showSearch: true,
      showError: false,
      showPanel: true,
      errMsg: "",
      recipeList: {},
      filteredList: {},
      ingredients: new Set(),
      time: 30,
      serving: 3,
      rewardPoints: 0,
      cardviewMargin: "",
      showRight: true,
    };
  },
  created() {
    this.rewardPoints = Number(this.rewardPoints) + 1;
    this.init();
  },
  mounted: function () {
    // filter function reference: https://stackoverflow.com/questions/5072136/javascript-filter-for-objects/37616104
    Object.filter = function (obj, predicate) {
      let result = {},
        key;
      for (key in obj) {
        if (predicate(obj[key])) {
          result[key] = obj[key];
        }
      }
      return result;
    };
    this.screenWidth = document.body.clientWidth;
    if (this.screenWidth <= 768) {
      this.cardviewMargin = "margin: 10px 5px 0";
    } else {
      this.cardviewMargin = "margin: 20px";
    }
    window.addEventListener("resize", () => {
      this.screenWidth = document.body.clientWidth;
      if (this.screenWidth <= 768) {
        this.cardviewMargin = "margin: 5px";
      } else {
        this.cardviewMargin = "margin: 20px";
      }
    });

    this.rewardPoints =
      "rewardPoints" in localStorage
        ? localStorage.getItem("rewardPoints")
        : 10;
    if (this.$cookies.get("popped") != "yes") {
      //cookie 中没有 popped 则赋给他一个值（此时弹框显示）
      document.cookie = "popped = yes";

      // this.$refs['rewardPopup'].show();
      this.$message({
        message: "Login First Time Today! Reward Points +1!",
        type: "success",
      });
      this.$cookies.set("popped", "yes", "1d");
    }
    localStorage.setItem("rewardPoints", this.rewardPoints);

    Ingredient.$on("confirm", () => {
      this.confirm();
    });
    Ingredient.$on("clear", () => {
      this.recipeList = RecipeData;
      this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
      this.ingredients = new Set();
    });
    Ingredient.$on("click-ingredient", (data) => {
      if (data[1] === true) {
        this.ingredients.add(data[0]);
      } else if (this.ingredients.has(data[0])) {
        this.ingredients.delete(data[0]);
      }
      console.log("added", data, "to", this.ingredients);
    });
    Ingredient.$on("slider", (data) => {
      if (data[1] === "time") {
        this.time = data[0];
        // this.filteredList = Object.filter(this.recipeList, (recipe) => recipe.time <= this.time);
      } else {
        this.serving = data[0];
        // this.filteredList = Object.filter(this.recipeList, (recipe) => recipe.serving >= this.serving);
      }
    });
  },
  methods: {
    filterOnTime: function (time) {
      this.filteredList = Object.filter(
        this.filteredList,
        (recipe) => recipe.time <= time
      );
    },
    filterOnServing: function (serving) {
      this.filteredList = Object.filter(
        this.filteredList,
        (recipe) => recipe.serving <= serving
      );
    },
    hidePanel: function (showPanel) {
      if (!showPanel) {
        this.xsLeft = 1;
        this.xsRight = 23;
      } else {
        this.xsLeft = 23;
        this.xsRight = 1;
      }
    },
    init: function () {
      this.recipeList = RecipeData;
      this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
    },
    confirm: function () {
      console.log(this.ingredients, this.ingredients.size);
      if (
        // if input is nothing, show all recipes
        !this.ingredients ||
        this.ingredients.size == 0
      ) {
        this.recipeList = RecipeData;
        this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
        this.filteredList = Object.filter(
          this.filteredList,
          (recipe) => recipe.time <= this.time && recipe.serving <= this.serving
        );
        //console.log("filtered list", this.filteredList);
      } else {
        // if there is a search input, find if there has any matched content
        this.recipeList = {}; // clear the display list
        this.filteredList = {};
        this.ingredients.forEach((d) => {
          const regStr = "(" + d.toLowerCase() + ")([\\s]*)";
          const reg = new RegExp(regStr);
          for (let i in RecipeData) {
            for (let j in RecipeData[i].ingredients) {
              let name = RecipeData[i].ingredients[j].toLowerCase(); // make it match either lowercase / uppercase
              const recs = name.split(" ").join("");
              let regMatch = recs.match(reg);
              if (regMatch !== null) {
                this.$set(this.recipeList, i, RecipeData[i]);
                //console.log("found", this.recipeList); // if matched, add it to the display list
                this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
                //console.log("added", this.filteredList);
              }
            }
          }
        });
        //console.log("final filtered", this.filteredList);
        this.filterOnServing(this.serving);
        this.filterOnTime(this.time);
      }
    },
    search: function (input) {
      console.log("Received serch input:", input);
      this.showError = false; // hide the error alert if it's not hidden yet
      if (
        // if input is nothing, show all recipes
        input.length == 0 ||
        input.split(" ").join("").length == 0 ||
        input == null
      ) {
        this.recipeList = RecipeData;
        this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
      } else {
        // if there is a search input, find if there has any matched content
        this.recipeList = {}; // clear the display list
        let regStr = ""; // 初始化正则表达式
        for (let i = 0; i < input.length; i++) {
          regStr = regStr + "(" + input[i] + ")([\\s]*)"; // 跨字匹配
        }
        let reg = new RegExp(regStr);
        // Start looping all the recipes
        for (let i in RecipeData) {
          let name = RecipeData[i].name.toLowerCase(); // make it match either lowercase / uppercase
          let regMatch = name.match(reg);
          if (regMatch !== null) {
            this.$set(this.recipeList, i, RecipeData[i]); // if matched, add it to the display list
            this.filteredList = JSON.parse(JSON.stringify(this.recipeList));
          }
        }
        // Show message if there's no result found
        if (JSON.stringify(this.recipeList) == "{}") {
          this.showError = true;
          this.errMsg = "Sorry, we didn't find any matched recipes";
        }
      }
    },
  },
};
</script>
<style>
</style>
