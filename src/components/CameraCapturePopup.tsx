import { ImageIcon, UploadIcon, VideoIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner, Text } from "@radix-ui/themes";
import React, {
  CSSProperties,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";

type Props = {
  trigger: ReactNode;
  title: string;
  description?: string;
  onUpload: (files: File) => Promise<void>;
};

function CameraCapturePopup({
  trigger,
  title,
  description,
  onUpload,
}: Readonly<Props>) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [isUploadInProgress, setIsUploadInProgress] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, []);

  const handleUploadClick = async () => {
    if (selectedFile) {
      setIsUploadInProgress(true);
      await onUpload(selectedFile);
      setIsUploadInProgress(false);
      stopCapture();
    }
  };

  const startCapture = async () => {
    setSelectedFile(undefined);
    setCapturedMedia(null);
    setIsCapturing(true);
    const constraints = {
      video: true,
      audio: false,
    };
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCapturing(false);
    }
  };

  const stopCapture = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCapturing(false);
    setIsRecording(false);
    setSelectedFile(undefined);
    setCapturedMedia(null);
  };

  const handleCaptureClick = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.png", { type: "image/png" });
            setSelectedFile(file);
            setCapturedMedia(URL.createObjectURL(blob));
          }
        }, "image/png");
      }
    }
    stopCapture();
  };

  const handleRecordVideoClick = () => {
    setSelectedFile(undefined);
    setCapturedMedia(null);
    setIsRecording(true);
    if (mediaStreamRef.current) {
      recordedChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const file = new File([blob], "capture.webm", { type: "video/webm" });
        setSelectedFile(file);
        setCapturedMedia(URL.createObjectURL(blob));
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
    }
  };

  const handleStopRecordingClick = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setIsCapturing(false);
      setIsRecording(false);
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

        <Flex gap="3" mt="4" justify="center">
          <Button
            title="Capture Photo"
            variant="soft"
            onClick={() => {
              setIsVideoMode(false);
              startCapture();
            }}
            style={{ ...styles.button, ...styles.coloredButton }}
          >
            <ImageIcon />
            Capture Photo
          </Button>
          <Button
            title="Capture Video"
            variant="soft"
            onClick={() => {
              setIsVideoMode(true);
              startCapture();
            }}
            style={{ ...styles.button, ...styles.coloredButton }}
          >
            <VideoIcon />
            Capture Video
          </Button>
        </Flex>

        <Flex gap="3" mt="4" justify="center">
          <AlertDialog.Cancel>
            <Button
              title="Cancel"
              variant="soft"
              color="gray"
              style={styles.button}
              onClick={stopCapture}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              title="Upload"
              variant="solid"
              onClick={handleUploadClick}
              disabled={!selectedFile}
              style={{
                ...styles.button,
                ...(!selectedFile ? {} : styles.coloredButton),
              }}
            >
              <UploadIcon />
              Upload
              <Spinner loading={isUploadInProgress} size="2" />
            </Button>
          </AlertDialog.Action>
        </Flex>

        {isCapturing && (
          <div style={styles.cameraContainer}>
            <video ref={videoRef} style={styles.video} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {!isVideoMode && (
              <Button
                title="Capture"
                variant="solid"
                onClick={handleCaptureClick}
                style={{ ...styles.button, ...styles.coloredButton }}
              >
                Capture
              </Button>
            )}
            {isVideoMode && !isRecording && (
              <Button
                title="Record"
                variant="solid"
                onClick={handleRecordVideoClick}
                style={{ ...styles.button, ...styles.coloredButton }}
              >
                Record
              </Button>
            )}
            {isRecording && (
              <>
                <Button
                  title="Stop"
                  variant="solid"
                  onClick={handleStopRecordingClick}
                  style={{ ...styles.button, ...styles.coloredButton }}
                >
                  Stop
                </Button>
                <Text style={styles.text}>Recording...</Text>
              </>
            )}
          </div>
        )}
        {capturedMedia && (
          <div style={styles.previewContainer}>
            {!isVideoMode ? (
              <img src={capturedMedia} alt="Captured" style={styles.preview} />
            ) : (
              <video controls src={capturedMedia} style={styles.preview} />
            )}
          </div>
        )}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

const styles: {
  button: CSSProperties;
  coloredButton: CSSProperties;
  text: CSSProperties;
  cameraContainer: CSSProperties;
  video: CSSProperties;
  previewContainer: CSSProperties;
  preview: CSSProperties;
} = {
  button: {
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat",
    cursor: "pointer",
    boxShadow: "inset 0 0 0 1px #cccccc",
  },
  coloredButton: {
    backgroundColor: "#FFA500",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
  cameraContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
  },
  video: {
    width: "100%",
    maxWidth: "400px",
    transform: "scaleX(-1)",
  },
  previewContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  preview: {
    maxWidth: "100%",
    height: "auto",
  },
};

export default CameraCapturePopup;
