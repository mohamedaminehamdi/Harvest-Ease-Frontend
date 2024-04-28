import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const Tip = () => {
  return (
    <div className="max-w-xs rounded-xl shadow-md bg-[#F7FECB]">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <FontAwesomeIcon
              icon={faLeaf}
              size="2x"
              className="mr-3 text-[#4ecb71]"
            />
            <h2 className="text-xl font-bold text-[#154734]">Tip Of The Day</h2>
          </div>
          <EllipsisVerticalIcon className="h-10 w-10" />
        </div>
        <div className="mt-6">
          <p className="text-black">
            Reprehenderit exercitation aute et esse ex adipisicing consequat
            excepteur ad laborum. Aute deserunt irure consequat proident
            occaecat irure duis in. Laborum nisi veniam eu ipsum esse voluptate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tip;
