import { Text } from "@mantine/core";
import { Dropzone as MantineDropzone, DropzoneProps as MantineDropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";

export type DropzoneProps = Omit<MantineDropzoneProps, "children">;

export default function Dropzone(props: DropzoneProps) {
  return (
    <MantineDropzone multiple={false} maxSize={16 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
      <MantineDropzone.Accept>
        <IconUpload size={50} stroke={1.5} />
      </MantineDropzone.Accept>
      <MantineDropzone.Reject>
        <IconX size={50} stroke={1.5} />
      </MantineDropzone.Reject>
      <MantineDropzone.Idle>
        <IconPhoto size={50} stroke={1.5} />
      </MantineDropzone.Idle>
      <Text size="xl">Drag & Drop your image here</Text>
    </MantineDropzone>
  );
}
