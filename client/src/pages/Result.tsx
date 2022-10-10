import { Button, CopyButton, Text } from "@mantine/core";
import { IconX, IconLoader } from "@tabler/icons";
import { IMAGE } from "../services/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useResultStyles } from "../styles";

export default function Result() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { classes, cx } = useResultStyles();

  const { data: { image } = {}, loading } = useQuery(IMAGE, { variables: { id: id ?? "" } });

  return (
    <div className={cx(classes.control, "box")}>
      {!loading &&
        (image ? (
          <>
            <img className={classes.image} src={image.url} alt={image.filename} />
            <div className={classes.copyUrlWrapper}>
              <Text className={classes.url}>{image.url}</Text>
              <CopyButton value={image.url}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied url" : "Copy url"}
                  </Button>
                )}
              </CopyButton>
            </div>
          </>
        ) : (
          <>
            <div className={cx(classes.icon, { [classes.check]: image, [classes.error]: !image })}>
              <IconX size={40} />
            </div>
            <Text mt="sm" size="xl">
              Image not found
            </Text>
            <Button onClick={() => navigate("/")} mt="sm">
              Go back
            </Button>
          </>
        ))}
      {loading && <IconLoader className={classes.loading} />}
    </div>
  );
}
