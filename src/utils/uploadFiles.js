import { axiosWithAuth } from './axios';

/* eslint-disable */
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append('file', file);

    return axiosWithAuth().post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }

  getFiles() {
    return axiosWithAuth().get('/files');
  }
}

export default new UploadFilesService();
