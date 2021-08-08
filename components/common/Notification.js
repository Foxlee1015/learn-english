import { useState, useEffect } from "react";
import NotificationStyles from "../../styles/components/common/Notification.module.css";

const Notification = ({ type = "", open = false, setOpen = () => {} }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (type === "loginRequired") {
      setText("Please log in first");
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), 5000);
    }
  }, [open]);

  return (
    <div
      className={`${NotificationStyles.container} ${
        open && NotificationStyles.containerOpen
      }`}
    >
      <p className={NotificationStyles.text}>{text}</p>
    </div>
  );
};

export default Notification;
