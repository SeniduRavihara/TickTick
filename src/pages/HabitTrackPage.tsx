// import { useEffect } from "react";
// import "./style.css";

// const HabitTrackPage = () => {
//   useEffect(() => {
//     const colorPalette = [
//       "000000",
//       "FF9966",
//       "6699FF",
//       "99FF66",
//       "CC0000",
//       "00CC00",
//       "0000CC",
//       "333333",
//       "0066FF",
//       "FFFFFF",
//     ];

//     const forePalette = document.querySelector(".fore-palette");
//     const backPalette = document.querySelector(".back-palette");
//     const editor = document.querySelector(".editor");

//     colorPalette.forEach((color) => {
//       forePalette.innerHTML += `<a href="#" data-command="foreColor" data-value="#${color}" style="background-color:#${color};" class="palette-item"></a>`;
//       backPalette.innerHTML += `<a href="#" data-command="backColor" data-value="#${color}" style="background-color:#${color};" class="palette-item"></a>`;
//     });

//     const toolbarButtons = document.querySelectorAll(".toolbar a");
//     toolbarButtons.forEach((button) => {
//       button.addEventListener("click", (e) => {
//         e.preventDefault();
//         const command = button.getAttribute("data-command");
//         let url;

//         switch (command) {
//           case "h1":
//           case "h2":
//           case "p":
//             document.execCommand("formatBlock", false, command);
//             break;
//           case "foreColor":
//           case "backColor":
//             const color = button.getAttribute("data-value");
//             document.execCommand(command, false, color);
//             break;
//           case "removeFormat":
//             document.execCommand(command, false);
//             break;
//           case "createlink":
//           case "insertimage":
//             url = prompt(
//               `Enter the ${command === "createlink" ? "link" : "image URL"}:`,
//               "http://"
//             );
//             if (url !== null && url.trim() !== "") {
//               document.execCommand(command, false, url);
//             }
//             break;
//           default:
//             document.execCommand(command, false);
//         }
//       });
//     });

//     const images = document.querySelectorAll(".editorAria img");
//     images.forEach((image) => {
//       image.addEventListener("click", () => {
//         document.execCommand("enableObjectResizing", false);
//       });
//     });

//     const getHTMLButton = document.getElementById("getHTML");
//     getHTMLButton.addEventListener("click", () => {
//       const editorContent = document.querySelector(".editorAria").innerHTML;
//       alert(editorContent);
//     });
//   }, []);

//   return (
//     <div className="container">
//       <div className="text-right my-3">
//         <button className="btn btn-info" id="getHTML" data-get="editor-1">
//           Get HTML
//         </button>
//       </div>
//       <div className="row align-items-center justify-content-center">
//         <div className="col-md-12 col-lg-8">
//           <div className="editor" id="editor-1">
//             <div className="toolbar">
//               <a
//                 href="#"
//                 data-command="undo"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Undo"
//               >
//                 <i className="fa fa-undo"></i>
//               </a>
//               <a
//                 href="#"
//                 data-command="redo"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Redo"
//               >
//                 <i className="fa fa-redo "></i>
//               </a>
//               <a
//                 href="#"
//                 data-command="removeFormat"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Clear format"
//               >
//                 <i className="fa fa-times "></i>
//               </a>
//               <div className="fore-wrapper">
//                 <i
//                   className="fa fa-font"
//                   data-toggle="tooltip"
//                   data-placement="top"
//                   title="text color"
//                   style={{ color: "#C96" }}
//                 ></i>
//                 <div className="fore-palette"></div>
//               </div>
//               <div className="back-wrapper">
//                 <i
//                   className="fa fa-font"
//                   data-toggle="tooltip"
//                   data-placement="top"
//                   title="Background color"
//                   style={{ background: "#C96" }}
//                 ></i>
//                 <div className="back-palette"></div>
//               </div>
//             </div>
//             <div id="editor" className="editorAria" contentEditable>
//               <h1>Rich Text Editor.</h1>
//               <p>
//                 It is a long established fact that a reader will be distracted
//                 by the readable content of a page when looking at its layout.
//                 The point of using Lorem Ipsum is that it has a more-or-less
//                 normal distribution of letters, as opposed to using 'Content
//                 here, content here', making it look like readable English.
//               </p>
//               <img
//                 src="https://images.pexels.com/photos/2067423/pexels-photo-2067423.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//                 alt="Sample Image"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HabitTrackPage;


const HabitTrackPage = () => {
  return (
    <div>HabitTrackPage</div>
  )
}
export default HabitTrackPage