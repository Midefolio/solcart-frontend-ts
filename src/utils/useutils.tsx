/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUtils = () => {
  const isSending = (action: boolean, msg?: string) => {
    const btn = document.getElementById("isSending");
    const textCon = document.getElementById("sending-msg");
    if (btn) {
      if (action === true) {
        btn.style.display = "block";
        if (msg && textCon) {
          textCon.innerHTML = msg;
        }
      } else {
        btn.style.display = "none";
      }
    }
  };

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) return "";
    phoneNumber = phoneNumber.replace(/\D/g, "");
    const formattedPhoneNumber = phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1 $2 $3"
    );
    return formattedPhoneNumber;
  };

  const formatNumber = (num: number | string) => {
    if (!num) return "";
    const numString = num.toString().split("");
    const numLength = numString.length;
    const formattedNum: string[] = [];
    for (let i = numLength - 1, j = 0; i >= 0; i--, j++) {
      if (j % 3 === 0 && j !== 0) {
        formattedNum.unshift(",");
      }
      if (j % 9 === 2 && j !== 2) {
        formattedNum.unshift(",");
      }
      formattedNum.unshift(numString[i]);
    }
    return formattedNum.join("") + ".00";
  };

  const formatTransactionTime = (
    transactionTime: string,
    currentTime: string
  ) => {
    const diffInMs = Math.abs(
      new Date(currentTime).getTime() - new Date(transactionTime).getTime()
    );
    const diffInMins = Math.round(diffInMs / (1000 * 60));
    const transactionDate = new Date(transactionTime);
    if (diffInMins < 1) {
      return "just now";
    } else if (
      diffInMins < 1440 &&
      transactionDate.getDate() === new Date(currentTime).getDate()
    ) {
      const hours = transactionDate.getHours();
      const minutes = transactionDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const time = convertTo12HourFormat(hours, minutes);
      return `Today, ${time}`;
    } else if (diffInMins < 2880) {
      const hours = transactionDate.getHours();
      const minutes = transactionDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const time = convertTo12HourFormat(hours, minutes);
      return `Yesterday, ${time}`;
    } else {
      const month = transactionDate.toLocaleString("default", {
        month: "long",
      });
      const day = transactionDate.getDate().toString().padStart(2, "0");
      const year = transactionDate.getFullYear().toString();
      const hours = transactionDate.getHours();
      const minutes = transactionDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const time = convertTo12HourFormat(hours, minutes);
      return `${month} ${day}, ${year} at ${time}`;
    }
  };

  const convertTo12HourFormat = (hours: number, minutes: string) => {
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const makeid = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make it non-editable
    textArea.setAttribute("readonly", "");

    // Set its style to be off-screen
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";

    // Append the text area to the document
    document.body.appendChild(textArea);

    // Select the text in the text area
    textArea.select();

    try {
      // Execute the copy command
      document.execCommand("copy");
      // setToast("copied successfully");
    } catch (err) {
      console.error("Unable to copy text:", err);
    } finally {
      // Remove the temporary text area
      document.body.removeChild(textArea);
    }
  };

  const convertToTwoDecimalPlaces = (value: number) => {
    return value.toFixed(2); // Convert to 2 decimal places
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatDateInWords = (dateString: string) => {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Adjust month to start from 0
    const day = parseInt(dateParts[2], 10);

    const formattedDay = getFormattedDay(day);
    const formattedMonth = months[month];
    const formattedDayOfWeek = getFormattedDayOfWeek(
      new Date(year, month, day).getDay()
    );

    return `${formattedDay}, ${formattedDayOfWeek}, ${formattedMonth}, ${year}`;
  };

  const getFormattedDay = (day: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const suffix =
      (day >= 11 && day <= 13) || day % 10 > 3
        ? suffixes[0]
        : suffixes[day % 10];
    return day + suffix;
  };

  const getFormattedDayOfWeek = (dayOfWeek: number) => {
    return daysOfWeek[dayOfWeek];
  };

  const truncateString = (str: string) => {
    if (str.length > 30) {
      return str.substring(0, 15) + "...";
    } else {
      return str;
    }
  };

  const notifySuccess = (str:string) => {
    toast.success(str, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyError = (str:string) => {
    toast.error(str, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const clickHandler =(dom: any)=> {
    var input = document.getElementById(dom);
    if(input){
     input.click();
    }
   }
  

  return {
    isSending,
    formatPhoneNumber,
    formatNumber,
    formatTransactionTime,
    makeid,
    copyToClipboard,
    convertToTwoDecimalPlaces,
    formatDateInWords,
    truncateString,
    notifySuccess,
    notifyError,
    clickHandler
  };
};

export default useUtils;
