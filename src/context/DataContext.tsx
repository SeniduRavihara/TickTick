import { ReactNode, createContext, useEffect, useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
// import { isPlatform } from "@ionic/react";
// import { base64FromPath } from "../utils";
// import {
//   Camera,
//   CameraResultType,
//   CameraSource,
//   Photo,
// } from "@capacitor/camera";
// import { Capacitor } from "@capacitor/core";
import { DataContextType, TodoListType, TodoObj } from "../types";
import { INITIAL_DATA_CONTEXT, exampleData } from "../constants";

export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

export function DataProvider({ children }: { children: ReactNode }) {
  // const [selectedPhoto, setSelectedPhoto] = useState<UserPhoto | null>(null);
  const [todoList, setTodoList] = useState<TodoListType>(exampleData);

  useEffect(() => {
    loadDataLocally("todoListData.json").then((data) => {
      const locallySavedTodoList = data?.map((todoObj) => ({
        ...todoObj,
        timestamp: todoObj.timestamp ? new Date(todoObj.timestamp) : undefined,
      }));
      setTodoList(locallySavedTodoList ? locallySavedTodoList : exampleData);
    });
  }, []);

  useEffect(() => {
    // console.log(todoList);
    if (todoList) saveDataLocally(todoList, "todoListData.json");
  }, [todoList]);

  const saveDataLocally = async (data: TodoObj[], filename: string) => {
    try {
      const jsonString = JSON.stringify(data);

      // Use the Filesystem API to write the JSON data to a file
      await Filesystem.writeFile({
        path: filename,
        data: jsonString,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      // console.log("Data saved locally:", jsonString);
    } catch (error) {
      console.error("Error saving data locally:", error);
    }
  };

  // Function to save an image to a local file
  // const savePictureLocally = async (
  //   photo: Photo,
  //   fileName: string
  // ): Promise<UserPhoto> => {
  //   let base64Data: string;

  //   // "hybrid" will detect Cordova or Capacitor;
  //   if (isPlatform("hybrid")) {
  //     const file = await Filesystem.readFile({
  //       path: photo.path!,
  //     });
  //     base64Data = file.data as string;
  //   } else {
  //     base64Data = await base64FromPath(photo.webPath!);
  //   }

  //   const savedFile = await Filesystem.writeFile({
  //     path: fileName,
  //     data: base64Data,
  //     directory: Directory.Data,
  //   });

  //   if (isPlatform("hybrid")) {
  //     // Display the new image by rewriting the 'file://' path to HTTP
  //     // Details: https://ionicframework.com/docs/building/webview#file-protocol
  //     return {
  //       filepath: savedFile.uri,
  //       webviewPath: Capacitor.convertFileSrc(savedFile.uri),
  //     };
  //   } else {
  //     // Use webPath to display the new image instead of base64 since it's
  //     // already loaded into memory
  //     return {
  //       filepath: fileName,
  //       webviewPath: photo.webPath,
  //     };
  //   }
  // };

  // Function to read data from a local file
  const loadDataLocally = async (
    filename: string
  ): Promise<TodoObj[] | null> => {
    try {
      // Use the Filesystem API to read the JSON data from the file
      const result = await Filesystem.readFile({
        path: filename,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      const jsonString = result.data as string;
      const data = JSON.parse(jsonString);

      // console.log("Data loaded locally:", data);

      return data;
    } catch (error) {
      console.error("Error loading data locally:", error);
      return null;
    }
  };

  // const selectPhoto = async () => {
  //   try {
  //     const photo = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: false,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Photos, // Choose photo from the device's gallery
  //     });

  //     const savedPhoto = await savePictureLocally(photo, "selected_photo.jpg");
  //     setSelectedPhoto(savedPhoto);
  //   } catch (error) {
  //     console.error("Error selecting photo:", error);
  //   }
  // };

  const value = {
    // selectPhoto,
    // loadDataLocally,
    // saveDataLocally,
    todoList,
    setTodoList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
