<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label class="form-label" for="country">Country:</label>
      <select id="country" v-model="country" class="form-input" required>
        <option value="">Select a country</option>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="germany">Germany</option>
        <option value="france">France</option>
        <option value="australia">Australia</option>
        <option value="japan">Japan</option>
        <option value="india">India</option>
      </select>

      <label class="form-label" for="province">Province:</label>
      <select id="province" v-model="province" class="form-input" required>
        <option value="">Select a province</option>
        <option value="california">California</option>
        <option value="ontario">Ontario</option>
        <option value="texas">Texas</option>
        <option value="new-york">New York</option>
        <option value="florida">Florida</option>
        <option value="quebec">Quebec</option>
      </select>

      <label class="form-label" for="image">Project Image:</label>
      <input
        type="file"
        id="image"
        class="form-input"
        @change="handleImageUpload"
        required
      />

      <label class="form-label" for="start_duration">Start Duration:</label>
      <input
        type="date"
        id="start_duration"
        v-model="startDuration"
        class="form-input"
        required
      />

      <label class="form-label" for="end_duration">End Duration:</label>
      <input
        type="date"
        id="end_duration"
        v-model="endDuration"
        class="form-input"
        required
      />

      <div class="button-group">
        <button type="button" @click="goBack" class="back-button">Back</button>
        <button type="submit" class="form-button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      country: "",
      province: "",
      image: null,
      startDuration: "", // Start duration
      endDuration: "", // End duration
      imageBase64: null, // This will store the Base64 string of the uploaded image
      status: "",
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result;
        // Now, this.imageBase64 contains the Base64 string of the image
      };

      reader.readAsDataURL(file);
    },
    submitForm() {
      // Dispatch the form data to the Vuex store
      this.$store.dispatch("updateFormData", {
        formName: "json3",
        data: {
          country: this.country,
          province: this.province,
          image: this.imageBase64, // Use the Base64 string of the image
          startDuration: this.startDuration,
          endDuration: this.endDuration,
          status: "active",
        },
      });

      // Logic for the final submission or navigation
      // For example, if this is the final form, you might want to log the data or send it to a server
      console.log(this.$data);
      console.log(this.$store.state.formData);
      const formData = this.$store.state.formData; // Assuming this is how you access your form data
      this.saveDataToDbJson(formData);
      // If you have a backend service to submit the data to, you would make an API call here
    },
    goBack() {
      // Go back to the previous route
      this.$router.go(-1);
    },
    saveDataToDbJson(data) {
      axios
        .post("http://localhost:3000/projects", data)
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          this.$router.push({ name: "homepage" });
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
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
}

/* Form labels */
.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Form inputs */
.form-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
}

/* File input */
.form-input[type="file"] {
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button {
  background-color: #009879;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #999;
}

.form-button {
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
</style>
