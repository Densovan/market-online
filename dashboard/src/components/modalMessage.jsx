import { FiX } from "react-icons/fi";
const ModalMessage = ({ message, onClose }) => {
  return (
    <div className="absolute top-8 right-3 bg-red-200 rounded-md w-80 border-red-400 border-solid border-2">
      <div className="p-2 ">
        <div className="float-right cursor-pointer" onClick={onClose}>
          <FiX />
        </div>
        <p className="mt-3">{message}</p>
      </div>
    </div>
  );
};

export default ModalMessage;
