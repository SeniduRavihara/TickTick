export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}

export const formatDateString = (dateString: Date | undefined): string => {
  
  if(dateString){
    const date = new Date(dateString);

     if (isNaN(date.getTime())) {
       throw new Error("Invalid date string");
     }
     const weekdays: string[] = [
       "Sun",
       "Mon",
       "Tue",
       "Wed",
       "Thu",
       "Fri",
       "Sat",
     ];
     const months: string[] = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
     ];
     return `Last ${weekdays[date.getDay()]}, ${date.getDate()} ${
       months[date.getMonth()]
     }`;
  }else{
    return ""
  }

 
};
