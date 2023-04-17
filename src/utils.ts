import axios from "axios";

export const convertFile = async (
  file: File,
  onProgressUpdate: (progressValue: number) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:3001/convert",
      formData,
      {
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progressValue =
              (progressEvent.loaded / progressEvent.total) * 50;
            onProgressUpdate(progressValue);
          }
        },
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progressValue =
              50 + (progressEvent.loaded / progressEvent.total) * 50;
            onProgressUpdate(progressValue);
          }
        },
      }
    );

    if (response.status === 200) {
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.mp3";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      console.error("Error converting the file");
    }
  } catch (err) {
    console.error(err);
  }
};
