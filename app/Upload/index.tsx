import { FC, useRef, PropsWithChildren } from "react";
import Dragger from "./Dragger";
import "./index.scss";

export interface UploadProps extends PropsWithChildren {
  accept?: string;
  multiple?: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragFileChange: (file: File | null) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const { accept, multiple, children, handleFileChange, handleDragFileChange } =
    props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className="upload-component">
      <div className="upload-input" onClick={handleClick}>
        <Dragger
          onFile={(files: FileList) => {
            const file = files ? files[0] : null;
            handleDragFileChange(file);
          }}
        >
          {children}
        </Dragger>
        <input
          className="upload-file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default Upload;
