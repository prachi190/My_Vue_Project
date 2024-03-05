<template>
  <div>
    <form @submit.prevent="submitForm" class="form-container">
      <div class="input-group">
        <label for="category">Project Category:</label>
        <div class="radio-options">
          <input
            type="radio"
            id="carbox"
            value="carbox"
            v-model="category"
            required
          />
          <label for="carbox">Carbon</label>
          <input
            type="radio"
            id="others"
            value="others"
            v-model="category"
            required
          />
          <label for="others">Others</label>
        </div>
      </div>

      <div class="input-group">
        <label for="name">Project Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="input-group">
        <label for="uid">Project UID:</label>
        <input type="text" id="uid" v-model="uid" required />
      </div>

      <div class="input-group">
        <label for="url">Project URL:</label>
        <input type="text" id="url" v-model="url" required />
      </div>

      <div class="input-group" style="margin-bottom: 40px">
        <label for="sector">Sector:</label>
        <select id="sector" v-model="sector" required>
          <option value="">Select a sector</option>
          <option value="sector1">Sector 1</option>
          <option value="sector2">Sector 2</option>
          <option value="sector2">Sector 3</option>
          <option value="sector2">Sector 4</option>
          <option value="sector2">Sector 5</option>
          <option value="sector2">Sector 7</option>
          <option value="sector2">Sector 8</option>
          <option value="sector2">Sector 9</option>
          <option value="sector2">Sector 10</option>
        </select>
      </div>

      <button type="submit" class="form-button">Next</button>
      <button type="button" @click="goBack" class="back-button">Back</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: "",
      name: "",
      uid: "",
      url: "",
      sector: "",
    };
  },
  methods: {
    submitForm() {
      // Check if all fields are filled
      if (this.category && this.name && this.uid && this.url && this.sector) {
        this.$store.dispatch("updateFormData", {
          formName: "json1",
          data: this.$data,
        });
        this.$router.push("/json2"); // Navigate to the next form
      } else {
        alert("Please fill in all fields before proceeding.");
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
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
}

/* Form elements */
.input-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
select {
  width: calc(100% - 40px); /* Adjust the width as needed */
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.radio-options {
  display: flex;
  align-items: center;
}

.radio-options input[type="radio"] {
  margin-right: 5px;
}

/* Submit button */
.form-button {
  background-color: #009879;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 20px;
  right: 20px;
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
  background-color: green; /* Darker red color on hover */
}

.form-button:hover {
  background-color: #007766;
}
</style>
