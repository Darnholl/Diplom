import httpService from "./http.service";

const projectEndpoint = "/Tasks/";

const projectService = {
  get: async () => {
    const { data } = await httpService.get(projectEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(projectEndpoint, payload);
    return data;
  },
  removeProject: async (projId) => {
    const { data } = await httpService.delete(projectEndpoint + projId);
    return data;
  },
  updateProject: async (payload) => {
    const { data } = await httpService.patch(
      projectEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default projectService;
