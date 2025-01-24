import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  isLoading: false,
  projects: null,
  experiences: null,
  education: null,
  skills: null,
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/projects");
      set({ projects: response.data });
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchExperiences: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/experiences");
      set({ experiences: response.data });
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchEducation: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/education");
      set({ education: response.data });
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/skills");
      set({ skills: response.data });
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addProject: async (project) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/projects", project);
      set((state) => ({ projects: [...state.projects, response.data] }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addExperience: async (experience) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/experiences", experience);
      set((state) => ({ experiences: [...state.experiences, response.data] }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addEducation: async (education) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/education", education);
      set((state) => ({ education: [...state.education, response.data] }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addSkill: async (skill) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/skills", skill);
      set((state) => ({ skills: [...state.skills, response.data] }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/api/projects/${id}`);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteExperience: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/api/experiences/${id}`);
      set((state) => ({
        experiences: state.experiences.filter(
          (experience) => experience.id !== id
        ),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEducation: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/api/education/${id}`);
      set((state) => ({
        education: state.education.filter((education) => education.id !== id),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSkill: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/api/skills/${id}`);
      set((state) => ({
        skills: state.skills.filter((skill) => skill.id !== id),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id, project) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/projects/${id}`, project);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? response.data : project
        ),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateExperience: async (id, experience) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/experiences/${id}`, experience);
      set((state) => ({
        experiences: state.experiences.map((experience) =>
          experience.id === id ? response.data : experience
        ),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateEducation: async (id, education) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/education/${id}`, education);
      set((state) => ({
        education: state.education.map((education) =>
          education.id === id ? response.data : education
        ),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSkill: async (id, skill) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/skills/${id}`, skill);
      set((state) => ({
        skills: state.skills.map((skill) =>
          skill.id === id ? response.data : skill
        ),
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
