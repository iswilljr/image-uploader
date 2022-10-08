import axios from "axios";
import type { FileWithPath } from "@mantine/dropzone";

interface Upload {
  file: FileWithPath;
  onUploadProgress: (progress: number) => void;
}

export const upload = async ({ file, onUploadProgress }: Upload) => {
  try {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post<string>("http://localhost:4000/api/upload", data, {
      onUploadProgress({ progress }) {
        progress && onUploadProgress(Math.floor(progress * 100));
      },
    });

    return res;
  } catch (err: any) {
    const message = err.message ?? err.response?.data?.message ?? err.response?.data;
    throw new Error(typeof message === "string" ? message : "Failed uploading file");
  }
};
