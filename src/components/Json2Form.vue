<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="icon-grid">
        <div v-for="(icon, index) in icons" :key="index" class="icon-container">
          <label :for="'icon' + index" class="icon-label">
            <img :src="icon.url" :alt="icon.name" class="icon-image" />
          </label>
          <input
            type="checkbox"
            :id="'icon' + index"
            v-model="icon.selected"
            class="checkbox"
          />
        </div>
      </div>
      <button type="submit" class="form-button" :disabled="!isAnySelected">
        Next
      </button>
      <button type="button" @click="goBack" class="back-button">Back</button>
      <p v-if="!isAnySelected" class="error-message">
        Please select at least one option.
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          name: "Icon 1",
          selected: false,
          url: require("@/assets/cloud-network.png"),
        },
        {
          name: "Icon 2",
          selected: false,
          url: require("@/assets/rocket.png"),
        },
        { name: "Icon 3", selected: false, url: require("@/assets/video.png") },
        {
          name: "Icon 4",
          selected: false,
          url: require("@/assets/shopping-cart.png"),
        },
        {
          name: "Icon 5",
          selected: false,
          url: require("@/assets/shield.png"),
        },
        { name: "Icon 6", selected: false, url: require("@/assets/idea.png") },
        {
          name: "Icon 7",
          selected: false,
          url: require("@/assets/social-media.png"),
        },
        {
          name: "Icon 8",
          selected: false,
          url: require("@/assets/cloud-network.png"),
        },
        {
          name: "Icon 9",
          selected: false,
          url: require("@/assets/coffee-cup.png"),
        },
      ],
    };
  },
  computed: {
    isAnySelected() {
      // Check if at least one checkbox is selected
      return this.icons.some((icon) => icon.selected);
    },
  },
  methods: {
    submitForm() {
      // Check if at least one checkbox is selected before submitting the form
      if (this.isAnySelected) {
        this.$store.dispatch("updateFormData", {
          formName: "json2",
          data: this.$data,
        });
        this.$router.push("/json3"); // Navigate to the next form
      }
    },
    goBack() {
      // Go back to the previous route
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Form container */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 60px; /* Adjusted padding to prevent overlap */
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
}

/* Icon grid */
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

/* Icon container */
.icon-container {
  position: relative;
  width: calc(33.33% - 10px); /* 3 icons per line with gap between */
}

/* Icon label */
.icon-label {
  display: block;
  cursor: pointer;
  position: relative;
}

/* Icon image */
.icon-image {
  width: 100%; /* Adjust the size as needed */
  height: auto; /* Adjust the size as needed */
}

/* Checkbox */
.checkbox {
  position: absolute;
  top: 5px;
  right: 5px;
}

/* Submit button */
.form-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #009879;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #007766;
}
.back-button {
  background-color: #009879; /* Orange color */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 20px; /* Reduced padding */
  cursor: pointer; /* Cursor style */
  font-size: 14px; /* Redu  ced font size */
  transition: background-color 0.3s; /* Transition effect */
  position: absolute; /* Position absolute for custom positioning */
  bottom: 20px; /* Adjust vertical position */
}

.back-button:hover {
  background-color: #c82333; /* Darker red color on hover */
}
</style>
