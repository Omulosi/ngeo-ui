import { axiosGeneral, axiosWithAuth, axiosWithoutAuth } from 'src/utils/axios';

export default async (url) => {
  const { data } = await axiosWithAuth().get(url);
  return data;
};

export const fetcherWithoutAuth = async (url) => {
  const { data } = await axiosWithoutAuth().get(url);
  return data;
};

export const generalFetcher = async (url) => {
  const { data } = await axiosGeneral().get(url);
  return data;
};

export const addResource = async (url, resource) => {
  const { data } = await axiosWithAuth().post(url, resource);
  return data;
};

export const updateResource = async (url, resource) => {
  const { data } = await axiosWithAuth().patch(url, resource);
  return data;
};

export const uploadFileResource = async (url, file) => {
  const { data } = await axiosWithAuth().post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const deleteResource = async (url, reason) => {
  const { data } = await axiosWithAuth().delete(url, reason);
  return data;
};
