import axios from "axios";
import { ChangeEvent } from "react";

export const Convert = () => {
  const convertFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

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
        link.download = `${file.name.split(".")[0]}_converted.mp3`;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Error converting the file");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Создаем массив промисов для каждого файла
      const convertPromises = Array.from(selectedFiles).map((file) =>
        convertFile(file)
      );

      // Выполняем все промисы параллельно
      await Promise.all(convertPromises);
    }
  };

  return <input type="file" multiple onChange={onChange} />;
};
