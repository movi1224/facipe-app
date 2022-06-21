<template>
  <div class="container">
    <router-link :to="url">
      <div
        :class="cardBox"
        :style="{
          background:
            'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(' +
            imgsrc +
            ')',
          'background-size': '100%',
        }"
      >
        <div :class="left" style="padding-left: 0px">
          <!-- <img :src="imgsrc" alt="Card-image" class="card-left-img"  /> -->
          <div :class="right">
            <h1 style="font-weight: bold">{{ recipe.name }}</h1>
            <p style="font-weight: bold">Time: {{ recipe.time }} min</p>
            <p style="font-weight: bold">Serving: {{ recipe.serving }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Card",
  data: function () {
    return {
      imgsrc: require("/data/" + this.recipe.cover),
      url: "/recipe/" + this.recipe.name,
      cardBox: "",
      right: "",
      left: "",
    };
  },
  props: {
    recipe: Object,
  },
  mounted: function () {
    var width = document.body.clientWidth;
    if (width <= 438) {
      // this.cardBox = "row card-box-sm";
      // this.left = "col-5 card-left";
      // this.right = "col-7 card-content-sm";
      this.cardBox = " card-box-sm";
      this.left = " card-left";
      this.right = " card-content-sm";
    } else {
      // this.cardBox = "row card-box-lg";
      // this.left = "col-4 card-left";
      // this.right = "col-8 card-content";
      this.cardBox = " card-box-lg";
      this.left = " card-left";
      this.right = " card-content";
    }
    window.addEventListener("resize", () => {
      var width = document.body.clientWidth;
      if (width <= 550) {
        //console.log("变小");
        this.cardBox = " card-box-sm";
        this.left = " card-left";
        this.right = " card-content-sm";
      } else {
        //console.log("变大");
        this.cardBox = " card-box-lg";
        this.left = " card-left";
        this.right = " card-content";
      }
    });
  },
};
</script>

<style>
.container {
  padding: 7px !important;
}
.card-box-lg {
  width: 100%;
  display: flex;
  box-shadow: 6px 8px 6px -8px rgb(0 0 0 / 40%);
  border-radius: 15px;
  margin-bottom: 5px;
  height: 15em;
}

.card-left {
  display: flex;
  width: 100%;
  height: 100%;
}

.card-left-img {
  object-fit: cover;
  width: 100%;
  border-radius: 15px;
  top: 50%;
  left: 50%;
}

.card-box-sm {
  display: flex;
  box-shadow: 6px 8px 6px -8px rgb(0 0 0 / 40%);
  border-radius: 15px;
  height: 8em;
}

h1 {
  margin: 0 0 5px 0;
  font-size: 2rem;
}

p {
  margin: 5px 0;
}

.card-content {
  padding: 15px 20px 15px;
  width: 100%;
  color: white;
  text-align: left;
}

.card-content > * {
  margin-bottom: 5px;
}

.card-content-sm {
  /* padding-left: 0px !important; */
  width: 100%;
  color: white;
  text-align: left;
  padding: 6px 12px 10px;
}
.card-content-sm > * {
  margin-bottom: 0px;
}
.card-content-sm h1 {
  font-weight: 500;
  font-size: 24px;
  margin: 5px 0px 5px;
}
.card-content-sm p {
  font-size: 12px;
  font-weight: 600;
  margin: 0px;
  padding: 0px;
}

@media (min-width: 576px) {
  .container,
  .container-md,
  .container-sm {
    max-width: 880px !important;
  }
}
</style>
