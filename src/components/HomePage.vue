<template>
  <div>
    <router-link to="/json1" class="add-project-button"
      >Add Project +</router-link
    >
    <h2>Projects</h2>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search Project " />
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Province</th>
          <th>Sector</th>
          <th>UID</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects" :key="project.id">
          <td>{{ project.json1?.name }}</td>
          <td>{{ project.json3?.province }}</td>
          <td>{{ project.json1?.sector }}</td>
          <td>{{ project.json1?.uid }}</td>
          <td>{{ project?.json3?.status }}</td>
          <td>
            <button @click="editProject(project.id)">Edit</button>
            <button @click="deleteProject(project.id)">Delete</button>
            <button @click="updateStatus(project.id)">Update Status</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showConfirmDialog" class="confirm-dialog">
      <div class="confirm-dialog-content">
        <h3>Confirm Status Update</h3>
        <p>Are you sure you want to update the project status?</p>
        <button @click="confirmUpdateStatus">Yes</button>
        <button @click="closeConfirmDialog">No</button>
      </div>
    </div>
  </div>
  <div v-if="showEditDialog" class="edit-dialog">
    <div class="edit-dialog-content">
      <h3>Edit Project</h3>
      <form @submit.prevent="submitEdit">
        <label class="form-label">Name:</label>
        <input
          v-model="editingProject.json1.name"
          type="text"
          required
          class="form-input"
        />
        <label class="form-label">Category:</label>
        <select
          v-model="editingProject.json1.category"
          required
          class="form-input"
        >
          <option disabled value="">Please select a category</option>
          <option value="carbon">carbon</option>
          <option value="others">others</option>
        </select>
        <label class="form-label">UID:</label>
        <input
          v-model="editingProject.json1.uid"
          type="text"
          required
          class="form-input"
        />
        <label class="form-label">URL:</label>
        <input
          v-model="editingProject.json1.url"
          type="text"
          required
          class="form-input"
        />
        <label class="form-label">Country:</label>
        <select
          v-model="editingProject.json3.country"
          required
          class="form-input"
        >
          <option disabled value="">Please select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="germany">Germany</option>
          <option value="france">France</option>
          <option value="australia">Australia</option>
          <option value="japan">Japan</option>
          <option value="india">India</option>
        </select>
        <label class="form-label">Province:</label>
        <select
          v-model="editingProject.json3.province"
          required
          class="form-input"
        >
          <option disabled value="">Please select a province</option>
          <option value="california">California</option>
          <option value="ontario">Ontario</option>
          <option value="texas">Texas</option>
          <option value="new-york">New York</option>
          <option value="florida">Florida</option>
          <option value="quebec">Quebec</option>
        </select>
        <div class="icon-container">
          <div
            v-for="(icon, index) in editingProject.json2.icons"
            :key="index"
            class="icon-item"
          >
            <input
              type="checkbox"
              :id="'icon-' + index"
              v-model="icon.selected"
              class="form-input"
            />
            <label :for="'icon-' + index" class="form-label">{{
              icon.name
            }}</label>
          </div>
        </div>
        <label class="form-label">Image:</label>
        <input type="file" @change="onImageChange" class="form-input" />
        <label class="form-label"> Start Duration:</label>
        <input
          type="date"
          v-model="editingProject.json3.startDuration"
          class="form-input"
        />
        <label class="form-label"> End Duration:</label>
        <input
          type="date"
          v-model="editingProject.json3.endDuration"
          class="form-input"
        />

        <button type="submit" class="form-button">Save</button>
        <button @click="closeEditDialog" class="form-button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: [],
      showEditDialog: false, // Dialog visibility
      editingProject: null, // The project being edited
      showConfirmDialog: false,
      confirmingProjectId: null,
      searchQuery: "", // Search query variable
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      axios
        .get("http://localhost:3000/projects")
        .then((response) => {
          this.projects = response.data;
          console.log("Data", this.projects);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    },
    deleteProject(projectId) {
      axios
        .delete(`http://localhost:3000/projects/${projectId}`)
        .then(() => {
          // Remove the project from the local state
          this.projects = this.projects.filter(
            (project) => project.id !== projectId
          );
          console.log("Project deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    },
    editProject(projectId) {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        this.editingProject = { ...project }; // Create a copy to avoid mutating the original project
        this.showEditDialog = true;
      }
    },
    submitEdit() {
      // Update the project in your backend here
      // For example, using axios to send a PUT request
      axios
        .put(
          `http://localhost:3000/projects/${this.editingProject.id}`,
          this.editingProject
        )
        .then(() => {
          // Update the local state
          const index = this.projects.findIndex(
            (p) => p.id === this.editingProject.id
          );
          if (index !== -1) {
            this.projects[index] = this.editingProject;
          }
          this.closeEditDialog();
          console.log("Project updated successfully");
        })
        .catch((error) => {
          console.error("Error updating project:", error);
        });
    },
    updateStatus(projectId) {
      this.confirmingProjectId = projectId;
      this.showConfirmDialog = true;
    },
    confirmUpdateStatus() {
      const project = this.projects.find(
        (p) => p.id === this.confirmingProjectId
      );
      if (project) {
        // Toggle the status locally
        project.json3.status =
          project.json3.status === "active" ? "inactive" : "active";

        // Prepare the updated project data
        const updatedProject = {
          ...project,
          json3: {
            ...project.json3,
            status: project.json3.status, // Ensure the status is updated
          },
        };

        // Send the updated project data to the server
        axios
          .put(
            `http://localhost:3000/projects/${this.confirmingProjectId}`,
            updatedProject
          )
          .then(() => {
            console.log("Project status updated successfully");
            // Optionally, handle the response from the server here
          })
          .catch((error) => {
            console.error("Error updating project status:", error);
            // Handle errors, e.g., by reverting the status change or showing an error message
          });
      }
      this.closeConfirmDialog();
    },

    closeConfirmDialog() {
      this.showConfirmDialog = false;
      this.confirmingProjectId = null;
    },

    closeEditDialog() {
      this.showEditDialog = false;
      this.editingProject = null;
    },
    onImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.editingProject.json3.image = file;
      }
    },
  },
  watch: {
    isEditDialogOpen(newValue) {
      // Toggle body class when edit dialog is opened or closed
      if (newValue) {
        document.body.classList.add("edit-dialog-open");
      } else {
        document.body.classList.remove("edit-dialog-open");
      }
    },
  },
  computed: {
    filteredProjects() {
      // Filter projects based on search query
      return this.projects.filter((project) => {
        const name = project.json1?.name || "";
        const province = project.json3?.province || "";
        const sector = project.json1?.sector || "";
        const uid = project.json1?.uid || "";
        const status = project.json3?.status || "";
        return (
          name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          province.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          sector.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          uid.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          status.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
.search-container input[type="text"] {
  width: 30%; /* Adjust the width as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
}
.icon-container {
  display: flex;
  flex-wrap: wrap;
}

/* Individual icon item */
.icon-item {
  flex: 0 0 calc(33.33% - 10px); /* Adjust width as needed */
  margin-right: 10px;
  margin-bottom: 10px;
}

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
  left: 10px;
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
/* Submit button */
.form-button {
  display: inline-block;
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
.edit-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  z-index: 1000;
}

.edit-dialog-content {
  text-align: center;
}

.edit-dialog-content h3 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group select,
.form-group input[type="file"],
.form-group input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.button-group button {
  margin-right: 10px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #0056b3;
}
/* General styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Table styles */
.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table th {
  background-color: #009879;
  color: white;
}

/* Link styles */
.styled-table a {
  color: #009879;
  text-decoration: none;
}

.styled-table a:hover {
  text-decoration: underline;
}

/* Dialog styles */
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.confirm-dialog-content {
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.add-project-button {
  background-color: #009879;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
  float: right; /* Align button to the right */
  margin-right: 20px; /* Optional: Add some margin for spacing */
  margin-bottom: auto;
}

.add-project-button:hover {
  background-color: #007766;
}

body.edit-dialog-open {
  overflow: hidden;
}

.edit-dialog-open .edit-dialog {
  overflow-y: auto;
  max-height: calc(100vh - 100px); /* Adjust height as needed */
}

.edit-dialog-open .edit-dialog-content {
  padding-right: 20px; /* Adjust padding to accommodate scrollbar width */
}

.edit-dialog-content form {
  overflow-y: auto;
  max-height: calc(100vh - 200px); /* Adjust height as needed */
}
@media screen and (max-width: 600px) {
  .form-input {
    flex-basis: 100%; /* Make inputs take full width on smaller screens */
  }
}
</style>
