import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { FadeLoader } from "react-spinners";
import { Trash as Delete, CameraPlus } from "@phosphor-icons/react";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";

interface ImageUploaderProps {
  title: string;
  directory: string;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, directory, images, setImages }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const data = new FormData();
    Array.from(files).forEach((file) => data.append("file", file));
    data.append("directory", directory);

    try {
      const res = await axios.post("/api/imageUpload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImages((prev) => [...prev, ...res.data.urls]);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove an image
  const handleRemoveImage = (imageUrl: string) => {
    setImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleSort = (sortedImages: string[]) => {
    setImages(sortedImages);
  }

  return (
    <Box>
      {/* Section Title */}
      <Typography sx={{ m: "15px 0 10px 0", color: "#666" }}>{title}</Typography>

      {/* Image List */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <ReactSortable
          list={images.map((img) => ({ id: img, img }))}
          setList={(newState) => handleSort(newState.map((item) => item.img))}
          style={{ display: "flex", flexWrap: "wrap", gap: 1 }}
        >
          {images.map((link) => (
            <Box key={link} sx={{ position: "relative", width: 96, height: 96, mr: "10px", borderRadius: 2, }}>
              <Paper
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  padding: 1,
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <Image
                  fill
                  src={link}
                  alt="Product Image"
                  style={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" }}
                />
                <IconButton
                  onClick={() => handleRemoveImage(link)}
                  sx={{
                    position: "absolute",
                    top: 1,
                    right: 1,
                    color: "white",
                    backgroundColor: "red",
                    opacity: 0.8,
                    padding: ".2rem",
                    borderRadius: "50%",
                    fontSize: 18,
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Delete size={16} />
                </IconButton>
              </Paper>
            </Box>
          ))}
        </ReactSortable>

        {/* Loader */}
        {isUploading && (
          <Box sx={{ width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FadeLoader />
          </Box>
        )}

        {/* File Input */}
        <label htmlFor={`upload-${directory}`}
          style={{
            width: 96,
            height: 96,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "12px",
          }}
        >
          <input
            style={{ display: "none" }}
            id={`upload-${directory}`}
            type="file"
            multiple
            onChange={handleUploadImages}
          />
          <IconButton
            component="span"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: "12px",
              backgroundColor: "#f0f0f0",
              boxShadow: 1,
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "#e0e0e0" },
              fontSize: 70,
              fontWeight: 100,
            }}
          >
            <CameraPlus size={38} />
          </IconButton>
        </label>
      </Box>
    </Box >
  );
};

export default ImageUploader;
