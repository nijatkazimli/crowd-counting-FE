import React, { useState, CSSProperties, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button, Flex, Select, Spinner, Text } from "@radix-ui/themes";
import { Media, MEDIA_TYPES } from "../../constants";
import FileUploadPopup from "../FileUploadPopup";
import {
  CameraIcon,
  MixerVerticalIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import CameraCapturePopup from "../CameraCapturePopup";
import {
  fetchModels,
  MediaResponse,
  ModelsResponse,
  uploadFile,
} from "../../api";
import { getFileTypeFromExtension } from "../../utils";
import { count } from "../../api/methods";

const Count = () => {
  const [models, setModels] = useState<ModelsResponse>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [media, setMedia] = useState<MediaResponse>();
  const [mediaType, setMediaType] = useState<Media>();
  const [isCountInProgress, setIsCountInProgress] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const modelsResponse = await fetchModels();
        setModels(modelsResponse);
      } catch (error) {
        setModels([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (media?.url) {
      const type = getFileTypeFromExtension(media.url);
      if (type !== "UNKNOWN") {
        setMediaType(type);
      } else {
        setMediaType(undefined);
      }
    }
  }, [media]);

  const handleCountClick = async () => {
    try {
      if (media && selectedModel) {
        setIsCountInProgress(true);
        const countResponse = await count(media.id, Number(selectedModel));
        setMedia(countResponse);
        setIsCountInProgress(false);
      }
    } catch (error) {
      setMedia(undefined);
      setIsCountInProgress(false);
    }
  };

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
              {models.map((model) => (
                <Select.Item key={model.id} value={model.id.toString()}>
                  {model.name}
                </Select.Item>
              ))}
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
              style={styles.button}
              size="3"
            >
              <CameraIcon />
              Use Camera
            </Button>
          }
          title="Capture the Camera"
          description="Capture the camera for the crowd counting"
          setMedia={setMedia}
          onUpload={uploadFile}
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
          }
          title="Upload File"
          description="Upload the photo or video you want to use for the crowd counting"
          accept="image/*,video/*"
          setMedia={setMedia}
          onUpload={uploadFile}
        />
      </Flex>

      <Flex>
        <Button
          title="Count"
          style={{ ...styles.button, ...(selectedModel && media) ? {} : styles.countButton }}
          size="4"
          disabled={!selectedModel || !media}
          onClick={handleCountClick}
        >
          <MixerVerticalIcon />
          Count
          <Spinner loading={isCountInProgress} size="3" />
        </Button>
      </Flex>

      {mediaType && media?.url && (
        <>
          {mediaType === MEDIA_TYPES.IMAGE ? (
            <img
              src={media.url}
              alt="Preview"
              style={styles.preview}
              width="60%"
              height="auto"
            />
          ) : mediaType === MEDIA_TYPES.VIDEO ? (
            <ReactPlayer
              style={styles.preview}
              url={media.url}
              controls
              width="60%"
              height="auto"
              muted
              loop
            />
          ) : (
            <p>Unknown media type</p>
          )}
        </>
      )}
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
    opacity: '60%',
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

export default Count;
