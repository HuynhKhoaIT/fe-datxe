import AntdImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import edit from "@assets/icons/edit_icon.png";
function CropImageLink({
  shape,
  url,
  onCompleted,
  onError,
  aspect,
  onModalCancel,
  show,
  name,
  uploadFileThumbnail,
  defaultImage,
  placeholder,
  required,
  className,
  preFix,
  bgColor,
  color,
  showRequired,
  showEditButton,
}: any) {
  return (
    <div className={className}>
      <AntdImgCrop
        cropShape={shape}
        aspect={aspect}
        onModalCancel={onModalCancel}
      >
        <Component
          uploadFileThumbnail={uploadFileThumbnail}
          show={show}
          url={url}
          onError={onError}
          onFinish={onCompleted}
          name={name}
          defaultImage={defaultImage}
          placeholder={placeholder}
          required={required}
          preFix={preFix}
          bgColor={bgColor}
          color={color}
          showRequired={showRequired}
          showEditButton={showEditButton}
        />
      </AntdImgCrop>
    </div>
  );
}

const getFile = () => {
  document.getElementById("image-uploader").click();
};

function Component({
  bgColor,
  preFix,
  beforeUpload,
  onFinish,
  name,
  uploadFileThumbnail,
  defaultImage,
  placeholder,
  required,
  color,
  showRequired,
  showEditButton,
}: any) {
  const [isEdit, setEdit] = useState(defaultImage && defaultImage !== "");
  useEffect(() => {
    if (defaultImage && defaultImage !== "") {
      const imageContainer: any = document.getElementById("image-container");
      imageContainer.style.display = "none";
      const imagePreview: any = document.getElementById("image-result");
      imagePreview.style.display = "block";
    }
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.round}
          id="image-container"
          onClick={getFile}
          style={{ backgroundColor: bgColor, color: color }}
        >
          {preFix && <img src={preFix} alt="" className={styles.preFix} />}

          {placeholder}
        </div>

        {required && showRequired && <Required />}
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg"
        id="image-uploader"
        name={name}
        value=""
        className={styles.imageUploader}
        required={required}
        onChange={async (e: any) => {
          const files = Array.from(e.target.files)[0];
          const filePreview = await beforeUpload(files, []);
          const imagePreview: any = document.getElementById("image-result");
          const imageContainer: any = document.getElementById(
            "image-container"
          );
          if (filePreview) {
            try {
              imagePreview.src = URL.createObjectURL(filePreview);
              imagePreview.style.display = "block";
              uploadFileThumbnail(filePreview);
              imageContainer.style.display = "none";
              setEdit(true);
              onFinish?.(filePreview);
            } catch (error) {
              console.log(error);
            }
          }
        }}
      />
      <div className={styles.imagePreviewContaier}>
        <img
          id="image-result"
          className={styles.imagePreview}
          src={defaultImage}
          height="170"
          alt="Image preview"
          onClick={getFile}
        />
        {/* {showEditButton && isEdit && (
          <img
            src={updateAlliance}
            onClick={getFile}
            className={styles.editButton}
          />
        )} */}
      </div>
    </>
  );
}

const Required = () => {
  return (
    <span style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
      *
    </span>
  );
};

export default CropImageLink;
