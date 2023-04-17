import { useState, ChangeEvent } from "react";

export const Convert = () => {
  const [file, setFile] = useState<File>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
    }
  };

  return <input type="file" onChange={onChange} />;
};
