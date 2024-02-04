import { useState } from "react";
import { isPlatform } from "@ionic/react";
import { UserPhoto } from "../context/DataContext";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "../utils";

import { CameraResultType, CameraSource, Camera } from "@capacitor/camera";

function ImageLoad() {
  const [selectedPhoto, setSelectedPhoto] = useState<UserPhoto | null>(null);

  const selectPhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Choose photo from the device's gallery
      });

      const savedPhoto = await savePictureLocally(photo, "selected_photo.jpg");
      setSelectedPhoto(savedPhoto);
    } catch (error) {
      console.error("Error selecting photo:", error);
    }
  };

  const savePictureLocally = async (
    photo: { path?: string; webPath?: string },
    fileName: string
  ): Promise<UserPhoto> => {
    let base64Data: string;

    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid") && photo.path) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      base64Data = file.data as string;
    } else if (photo.webPath) {
      base64Data = await base64FromPath(photo.webPath);
    } else {
      throw new Error("Invalid photo object");
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  return (
    <div>
      <button onClick={selectPhoto}>Select Photo</button>
      {selectedPhoto && (
        <div>
          <img src={selectedPhoto.webviewPath} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default ImageLoad;
