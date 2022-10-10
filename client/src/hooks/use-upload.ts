import { upload } from "../services/upload";
import { useEffect, useState } from "react";
import type { FileWithPath } from "@mantine/dropzone";

export function useUpload({ file }: { file?: FileWithPath }) {
  const [uploadProggres, setUploadProgress] = useState(0);
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "uploading" | "uploaded" | "failed">("idle");

  useEffect(() => {
    if (!file) return;

    setStatus("uploading");

    upload({ file, onUploadProgress: setUploadProgress })
      .then((res) => {
        if (res.status >= 200 && res.status < 400) setStatus("uploaded");
        setData(res.data);
      })
      .catch((err) => {
        setStatus("failed");
        setError(err.message);
      });
  }, [file]);

  return {
    data,
    error,
    status,
    uploadProggres,
  };
}
