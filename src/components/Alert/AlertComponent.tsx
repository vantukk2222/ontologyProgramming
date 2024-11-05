import React from "react";
import { AlertComponentProps } from "../../utils/interface";


const AlertComponent: React.FC<AlertComponentProps> = (props: AlertComponentProps) => {
  const { onConfirm, content, onCancel, type } = props;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-md">
        <p>{content}</p>
        <div className="flex justify-end mt-4">
          <button
            className={
              type === "danger"
                ? "bg-red-500 text-white px-4 py-2 mr-2 rounded"
                : type === "success"
                ? "bg-green-500 text-white px-4 py-2 mr-2 rounded"
                : "bg-yellow-300 text-white px-4 py-2 mr-2 rounded"
            }
            onClick={onConfirm}>
            Confirm
          </button>
          {onCancel && (
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
