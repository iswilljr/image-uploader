import { Title, Button, Text, Progress } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useRef, useState } from "react";
import { useUpload } from "./hooks/use-upload";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import Dropzone from "./components/Dropzone";

function App() {
  const navigate = useNavigate();
  const { classes, cx, theme } = useStyles();
  const [error, setError] = useState<string>();

  const [file, setFile] = useState<FileWithPath>();
  const dropzoneRef = useRef<() => void>(null);

  const { uploadProggres, error: uploadError, status, data: id } = useUpload({ file });
  const isUploading = status === "uploading";

  useEffect(() => {
    if (status !== "uploaded" || !id) return;
    navigate(`/result/${id}`);
  }, [status]);

  return (
    <div>
      <main className="box">
        <Title className={classes.title} order={1}>
          Image Uploader
        </Title>
        <Title className={classes.text} order={3}>
          Upload your image
        </Title>
        <Dropzone
          className={cx({ [classes.disabled]: isUploading })}
          disabled={isUploading}
          openRef={dropzoneRef}
          onDrop={(files) => {
            setFile(files[0]);
            setError(undefined);
          }}
          onReject={(files) => {
            setError(files[0].errors[0].message);
          }}
        />
        <div className={cx(classes.text, classes.other)}>or</div>
        <Button disabled={isUploading} type="button" onClick={() => dropzoneRef.current?.()} radius="sm">
          Choose a file
        </Button>
        {(error || uploadError) && (
          <Text color="red" style={{ lineBreak: "anywhere", marginTop: 16 }} size="sm">
            {error || uploadError}
          </Text>
        )}
      </main>
      {isUploading && (
        <section className={cx(classes.uploading, "box")}>
          <Text size="md" style={{ marginBottom: theme.spacing.xs }}>
            Uploading...
          </Text>
          <Progress value={uploadProggres} />
        </section>
      )}
    </div>
  );
}

export default App;
