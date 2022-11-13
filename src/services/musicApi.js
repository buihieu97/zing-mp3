import axiosClient from "./axiosClient";

export const musicApi = {
  getTop100: () => {
    const url = `top100`;
    return axiosClient.get(url);
  },
  getSong: (id) => {
    const url = `song/?id=${id}`;
    return axiosClient.get(url);
  },

  getChartHome: () => {
    const url = `charthome`;
    return axiosClient.get(url);
  },

  getSongInfo: (id) => {
    const url = `songinfo/?id=${id}`;
    return axiosClient.get(url);
  },
  getDetailTopRap: (id) => {
    const url = `detailplaylist/?id=${id}`;
    return axiosClient.get(url);
  },
  getArtist: (params) => {
    const url = `artist`;
    return axiosClient.get(url, { params });
  },

  getNewReleaseChart: () => {
    const url = "newReleasechart";
    return axiosClient.get(url);
  },
  getSearch: (params) => {
    const url = `search`;
    return axiosClient.get(url, { params });
  },
};
