import { axiosWithAuth, axiosWithoutAuth } from 'src/utils/axios';

export default async (url) => {
  try {
    const result = await axiosWithAuth().get(url);
    return result.data;
  } catch (error) {
    console.log(`Error in swr fetcher: ${error}`);
    throw error;
  }
};

export const fetcherWithoutAuth = async (url) => {
  try {
    const result = await axiosWithoutAuth().get(url);
    return result.data;
  } catch (error) {
    console.log(`Error in swr fetcher: ${error}`);
    throw error;
  }
};
