import {
  Group,
  Text,
  rem,
  Image,
  SimpleGrid,
  Card,
  Indicator,
  ThemeIcon,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconSquareX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";
import { useEffect, useState } from "react";

export function BasicDropzone({ setImages, maxFiles, images, props }: any) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Indicator
        key={index}
        inline
        radius="sm"
        size={25}
        label={
          <ThemeIcon size={18} onClick={() => handleDelete(index)}>
            <IconX />
          </ThemeIcon>
        }
      >
        <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
      </Indicator>
    );
  });
  useEffect(() => {
    if (files.length > 0) {
      setImages(files);
    }
  }, [files]);
  return (
    <Card withBorder>
      <Dropzone
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        onReject={(files) => console.log("rejected files", files)}
        maxFiles={maxFiles}
        disabled={files?.length >= maxFiles}
        // maxSize={5 * 1024 ** 2}
        onDrop={(files) => {
          setFiles((prevFiles) => [...prevFiles, ...files]);
        }}
        {...props}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Kéo hình ảnh vào đây hoặc nhấp để chọn
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Đính kèm tối đa 5 file, mỗi file không quá 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
    </Card>
  );
}
