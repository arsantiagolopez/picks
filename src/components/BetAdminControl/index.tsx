import React, { FC, MouseEventHandler, useState } from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { BetEntity } from "../../types";
import { ControlPanelDialog } from "./ControlPanelDialog";

interface Props {
  bet: BetEntity;
  isPanelOpen: boolean;
}

const BetAdminControl: FC<Props> = ({ bet, isPanelOpen }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const { status } = bet;

  // Open control modal
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const controlPanelDialogProps = { isOpen, setIsOpen, bet };

  if (!isPanelOpen) {
    return (
      <div
        onClick={handleClick}
        className="absolute right-1 flex flex-row justify-center items-center h-[90%] w-12 md:w-16 bg-gradient-to-r dark:bg-gradient-to-r dark:from-primary dark:to-tertiary rounded-md transition-all from-white to-gray-50"
      >
        <CgMoreVerticalAlt className="text-3xl text-primary dark:text-white" />

        {/* Control panel dialog */}
        <ControlPanelDialog {...controlPanelDialogProps} />
      </div>
    );
  } else {
    return <></>;
  }
};

export { BetAdminControl };
