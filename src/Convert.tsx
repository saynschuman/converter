import axios from "axios";
import { ChangeEvent } from "react";

export const Convert = () => {
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Отправка файла на сервер и получение результата
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3001/convert",
          formData,
          {
            responseType: "blob",
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
    }
  };

  return <input type="file" onChange={onChange} />;
};
