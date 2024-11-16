import { UploadIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import React, {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

type Props = {
  trigger: ReactNode;
  title: string;
  description?: string;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  onUpload: (files: File) => Promise<void>;
};

function FileUploadPopup({
  trigger,
  title,
  description,
  accept,
  onUpload,
}: Readonly<Props>) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploadInProgress, setIsUploadInProgress] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      setIsUploadInProgress(true);
      await onUpload(selectedFile);
      setIsUploadInProgress(false);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title style={styles.text}>{title}</AlertDialog.Title>
        <AlertDialog.Description
          size="2"
          style={{ ...styles.text, fontWeight: undefined }}
        >
          {description ?? ""}
        </AlertDialog.Description>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "16px", ...styles.text }}
          accept={accept}
        />
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              title="Cancel"
              variant="soft"
              color="gray"
              style={styles.button}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Spinner loading={isUploadInProgress} size="3">
              <Button
                title="Upload"
                variant="solid"
                onClick={handleUploadClick}
                disabled={!selectedFile}
                style={{
                  ...styles.button,
                  ...(!selectedFile ? {} : styles.uploadButton),
                }}
              >
                <UploadIcon />
                Upload
              </Button>
            </Spinner>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

const styles: {
  button: CSSProperties;
  uploadButton: CSSProperties;
  text: CSSProperties;
} = {
  button: {
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat",
    cursor: "pointer",
    boxShadow: "inset 0 0 0 1px #cccccc",
  },
  uploadButton: {
    backgroundColor: "#FFA500",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
};

export default FileUploadPopup;
