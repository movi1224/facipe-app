<template>
  <div class="header-bar">
    <div class="top-left item">
      <router-link to="/">
        <font-awesome-icon icon="fa-solid fa-house" />
      </router-link>
    </div>

    <div class="center item">
      <img class="icon-logo" :src="logoIcon" />
    </div>

    <div class="top-right item">
      <font-awesome-icon icon="fa-solid fa-bowl-food" />
      <font-awesome-icon style="color: #feb202" icon="fa-solid fa-xmark" />
      <span class="reward-point">
        {{ this.rewardPoints }}
      </span>
      <router-link to="/reward">
        <font-awesome-icon icon="fa-solid fa-user-large" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Ingredient from "./Ingredient.js";
export default {
  name: "HeaderBar",
  data() {
    return {
      logoIcon: require("/public/img/icons/logo_tag.svg"),
      rewardPoints: localStorage.getItem("rewardPoints") || 10,
    };
  },
  created: function () {
    Ingredient.$on("reward", () => {
      this.rewardPoints = localStorage.getItem("rewardPoints");
    });
  },
  methods: {},
};
</script>
<style>
.item {
  flex: 1;
}
.top-left {
  text-align: left;
}
.icon-logo {
  height: 100%;
  position: relative;
  top: 0.25rem;
  width: 5rem;
}
.reward-point {
  display: flex;
  align-items: center;
  color: #feb202;
  font-weight: 700;
  font-size: 1.5rem;
  padding-right: 1rem;
}
svg {
  color: #485D6B;
  font-size: 1.5em;
  padding: 0 0.25rem;
}
.header-bar {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
  height: 5vh;
  padding: 0 2%;
  background-color: white;
  overflow: hidden;
}

.top-right {
  display: flex;
  justify-content: right;
  align-items: center;
  font-weight: 700;
}

@media (max-width: 600px) {
  .header-bar {
    padding-left: 20px;
    padding-right: 20px;
    height: 8vh;
  }
  svg {
    font-size: 1rem;
  }
  .reward-point {
    font-weight: 700;
    font-size: 1rem;
    padding-right: 0.5rem;
  }
}
</style>
