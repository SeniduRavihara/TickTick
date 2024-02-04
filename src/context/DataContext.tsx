import { ReactNode, createContext, useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, onSnapshot } from "firebase/firestore";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { isPlatform } from "@ionic/react";
import { base64FromPath } from "../utils";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

export const DataContext = createContext<{
  todoList: TodoObj[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoObj[]>>;
}>({ todoList: [], setTodoList: () => {} });


export interface TodoObj {
  id: string;
  todo: string;
  discription: string;
  completed: boolean;
  attachmentImage?: string;
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const exampleData: TodoObj[] = [
  { id: "1", todo: "Task 1", discription: "This is task1", completed: false },
  { id: "2", todo: "Task 2", discription: "This is task1", completed: true },
  { id: "3", todo: "Task 3", discription: "This is task1", completed: false },
  { id: "4", todo: "Task 4", discription: "This is task1", completed: true },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [selectedPhoto, setSelectedPhoto] = useState<UserPhoto | null>(null);
  const [todoList, setTodoList] = useState(exampleData);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(selectedPhoto);
  }, [selectedPhoto]);

  // useEffect(() => {
  //   if (user) {
  //     const collectionRef = collection(db, "users", "notLoggedIn", "todoList");
  //     const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
  //       const todoArr = QuerySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       // console.log(todoArr);
  //       // setTodoList(todoArr);
  //     });

  //     return unsubscribe;
  //   } else {
  //     // saveDataLocally(exampleData, "todos.json");
  //     loadDataLocally("todos.json").then((data) => {
  //       // alert("Hi")
  //       console.log(data);
  //       alert(data[0].text);
  //       setTodoList(data);
  //     });
  //   }
  // }, [user]);

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

      console.log("Data saved locally:", jsonString);
    } catch (error) {
      console.error("Error saving data locally:", error);
      
    }
  };

  // Function to save an image to a local file
  const savePictureLocally = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    let base64Data: string;

    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data as string;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
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

  // Function to read data from a local file
  const loadDataLocally = async (filename: string): Promise<TodoObj[] | null> => {
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

  const value = {
    selectPhoto,
    loadDataLocally,
    saveDataLocally,
    todoList,
    setTodoList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
