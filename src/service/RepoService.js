import AxiosRequest from "../configs/AxiosRequest";

const RepoService = {};

RepoService.list = (params) => {
  return AxiosRequest.get("/search/repositories", {
    params,
  });
};

RepoService.get = (owner) => {
  return AxiosRequest.get(`/users/${owner}/repos`, {});
};

export default RepoService;
