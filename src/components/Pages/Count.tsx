import React, { useState, CSSProperties } from "react";
import ReactPlayer from "react-player";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { Media } from "../../constants";
import FileUploadPopup from "../FileUploadPopup";
import { CameraIcon, MixerVerticalIcon, UploadIcon } from "@radix-ui/react-icons";
import CameraCapturePopup from "../CameraCapturePopup";

interface MediaSelectorProps {}

const MediaSelector: React.FC<MediaSelectorProps> = () => {
  const [selectedModel, setSelectedModel] = useState<string>();

  return (
    <Flex
      direction="column"
      justify="center"
      gap="3"
      ml="9"
      mr="9"
      mb="9"
      mt="6"
      p="7"
      style={styles.container}
    >
      <Flex gap="2">
        <Text style={styles.text}>Model:</Text>
        <Select.Root value={selectedModel} onValueChange={setSelectedModel}>
          <Select.Trigger
            placeholder="Select"
            title="Select Model"
            style={{
              ...styles.selectTrigger,
              backgroundColor: !!selectedModel ? "orange" : "#FFE5CF",
            }}
          />
          <Select.Content color="orange">
            <Select.Group>
              <Select.Item value="A">A</Select.Item>
              <Select.Item value="B">B</Select.Item>
              <Select.Item value="C">C</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex gap="2">
        <Text style={styles.text}>Input:</Text>
        <CameraCapturePopup
          trigger={
            <Button
            title="Use Camera"
            onClick={() => {}}
            style={styles.button}
            size="3"
          >
            <CameraIcon />
            Use Camera
            </Button>
          }
          title="Capture the Camera"
          description="Capture the camera for the crowd counting"
          onUpload={async () => {}}
        />
        <FileUploadPopup
          trigger={
            <Button
              title="Upload File"
              onClick={() => {}}
              style={styles.button}
              size="3"
            >
              <UploadIcon />
              Upload File
            </Button>
            // onUpload - upload the photo / video, set media type based on file, set the url, and preview
          }
          title="Upload File"
          description="Upload the photo or video you want to use for the crowd counting"
          accept="image/*,video/*"
          onUpload={async () => {}}
        />
      </Flex>

      <Flex>
        <Button
          title="Count"
          onClick={() => {}}
          style={{ ...styles.button, ...styles.countButton }}
          size="4"
        >
          <MixerVerticalIcon />
          Count
        </Button>
      </Flex>

      <ReactPlayer
        style={styles.preview}
        url={
          "http://127.0.0.1:10000/devstoreaccount1/test/test.mp4?sv=2018-03-28&st=2024-11-16T17%3A09%3A05Z&se=2024-11-17T17%3A24%3A05Z&sr=c&sp=r&sig=jGGYvpl%2B3rQr1RcbCsW6S8nt1WLq0MDe%2FwrD329rMBU%3D"
        }
        controls={true}
        width="60%"
        height="auto"
        muted
        loop
      />
    </Flex>
  );
};

const styles: {
  container: CSSProperties;
  selectTrigger: CSSProperties;
  input: CSSProperties;
  button: CSSProperties;
  countButton: CSSProperties;
  text: CSSProperties;
  preview: CSSProperties;
} = {
  container: {
    border: "2px solid gray",
    borderRadius: "16px",
    boxShadow: "0 0 10px 0 #cccccc",
    backgroundColor: "#faf5ed",
  },
  selectTrigger: {
    height: 40,
    maxWidth: 180,
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  input: {
    marginBottom: 20,
    flexDirection: "row",
  },
  button: {
    fontWeight: "bold",
    backgroundColor: "#FFA500",
    color: "black",
    fontFamily: "Montserrat",
    boxShadow: "inset 0 0 0 1px #cccccc",
    cursor: "pointer",
  },
  countButton: {
    // backgroundColor: "#FF7B1D",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    fontSize: 24,
  },
  preview: {
    alignSelf: "center",
    marginTop: 20,
  },
};

export default MediaSelector;
