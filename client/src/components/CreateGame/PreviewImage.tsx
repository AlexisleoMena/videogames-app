import React from "react";
import { useState, useEffect } from "react";
import styles from "./CreateGame.module.css";

interface PreviewImageTypes {
  file: File | Blob;
}

const PreviewImage = ({ file }: PreviewImageTypes) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string);
    } else {
      setPreview("https://i.ibb.co/mGWK9DK/No-image-available.jpg");
    }
  }, [file]);

  return (
    <div className={styles.image_container}>
      <img src={preview} alt="" className={styles.image} />
    </div>
  );
};

export default PreviewImage;
