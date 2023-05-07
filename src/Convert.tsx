import { useState, ChangeEvent } from "react";
import { convertFile } from "./utils";

export const Convert = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const updateProgress = (file: File, value: number) => {
    setProgress((prevProgress) => ({ ...prevProgress, [file.name]: value }));
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles([...selectedFiles]);

      await Promise.all(
        Array.from(selectedFiles).map((file) =>
          convertFile(file, (progressValue) => updateProgress(file, progressValue))
        )
      );
    }
  };

  return (
    <>
      <input type="file" accept=".ogg" multiple onChange={onChange} />
      {files.map((file) => (
        <div key={file.name}>
          <div>{file.name}</div>
          <div>
            Converting: {progress[file.name] ? progress[file.name].toFixed(2) : 0}%
          </div>
        </div>
      ))}
    </>
  );
};
