import { useState, useEffect } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";

const ContactMe = ({ Item, setItem }: any) => {
  const { currentUser } = useUserAuthContext();
  const [whatsapp, setWhatsapp] = useState(Item.whatsapp || "");
  const [telegram, setTelegram] = useState(Item.telegram || "");
  const [phoneNumber, setPhoneNumber] = useState(Item.phoneNumber  || "");

  useEffect(() => {
    const saveToLocalStorage = () => {
      if (currentUser) {
        const updatedItem = {
          ...Item,
          whatsapp,
          telegram,
          phoneNumber: phoneNumber,
        };
        setItem(updatedItem);
        localStorage.setItem(`${currentUser.user_id}`, JSON.stringify(updatedItem));
      }
    };
    
    saveToLocalStorage();
  }, [whatsapp, telegram, phoneNumber]);

  return (
    <>
      <div className="my-mother down-5">
        <span className="ubuntuBold">Contact Me</span>
        <div className="my-mother xs-down-2 down-1">
          <span className="px13 xs-px12 faded-sol ubuntuLight">
            Allow buyers to contact you via one or more of the options
          </span>
        </div>
        <div className="my-mother down-2 xs-down-3">
          <span className="px13 ubuntuBold green">
            Whatsapp Link <i className="fab fa-whatsapp green"></i>
          </span>
          <input
            type="text"
            value={Item?.whatsapp}
            placeholder="paste link here"
            className="InterLight xs-down-1 down-1 px13 input bg-faded-4"
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>
        <div className="my-mother down-2 xs-down-3">
          <span className="px13 ubuntuBold color-code-1">
            Telegram Link <i className="fab fa-telegram"></i>
          </span>
          <input
            type="text"
            value={Item?.telegram}
            placeholder="paste link here"
            className="InterLight xs-down-1 down-1 px13 input bg-faded-4"
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
        <div className="my-mother down-2 xs-down-3">
          <span className="px13 ubuntuBold">
            Call Number <i className="fa px12 fa-phone-alt"></i>
          </span>
          <input
            type="number"
            value={Item?.phoneNumber}
            placeholder="enter phone number"
            className="InterLight down-1 xs-down-1 px13 input bg-faded-4"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ContactMe;
