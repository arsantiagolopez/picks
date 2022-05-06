import { Dialog, Transition } from "@headlessui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { IoTrashOutline } from "react-icons/io5";
import axios from "../../axios";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity, ParlayBetEntity } from "../../types";
import { refreshScreen } from "../../utils/refreshScreen";
import { useBets } from "../../utils/useBets";
import { useParlayBets } from "../../utils/useParlayBets";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bet: BetEntity | ParlayBetEntity;
  isParlay?: boolean;
}

const ControlPanelDialog: FC<Props> = ({
  isOpen,
  setIsOpen,
  bet,
  isParlay,
}) => {
  const { bets, setBets } = useBets();
  const { bets: parlayBets, setBets: setParlayBets } = useParlayBets();

  const { colorMode } = useContext(PreferencesContext);

  const router = useRouter();

  const redirectToUpdate = () =>
    router.push(
      isParlay
        ? `/admin/update-parlay?id=${bet?._id}`
        : `/admin/update?id=${bet?._id}`
    );

  const handleCancel = () => setIsOpen(false);

  const handleUpdate = async (action: string) => {
    let response: AxiosResponse<any, any> | null = null;

    let updatedBets = bets;
    let updatedParlayBets = parlayBets;

    switch (action) {
      case "DELETE":
        response = await axios.delete(
          isParlay ? `/api/parlayBets/${bet?._id}` : `/api/bets/${bet?._id}`
        );
        if (isParlay) {
          updatedParlayBets = bets.filter(({ _id }) => _id !== bet?._id);
        } else {
          updatedBets = bets.filter(({ _id }) => _id !== bet?._id);
        }
        break;
      case "LOST":
        response = await axios.put(
          isParlay ? `/api/parlayBets/${bet?._id}` : `/api/bets/${bet?._id}`,
          {
            status: "lost",
          }
        );
        if (isParlay) {
          updatedParlayBets = [...bets, { ...response?.data, status: "lost" }];
        } else {
          updatedBets = [...bets, { ...response?.data, status: "lost" }];
        }
        break;
      case "VOID":
        response = await axios.put(
          isParlay ? `/api/parlayBets/${bet?._id}` : `/api/bets/${bet?._id}`,
          {
            status: "void",
          }
        );
        if (isParlay) {
          updatedParlayBets = [...bets, { ...response?.data, status: "void" }];
        } else {
          updatedBets = [...bets, { ...response?.data, status: "void" }];
        }
        break;
      case "WON":
        response = await axios.put(
          isParlay ? `/api/parlayBets/${bet?._id}` : `/api/bets/${bet?._id}`,
          {
            status: "won",
          }
        );
        if (isParlay) {
          updatedParlayBets = [...bets, { ...response?.data, status: "won" }];
        } else {
          updatedBets = [...bets, { ...response?.data, status: "won" }];
        }
        break;
    }

    // Mutate state for better UI
    if (isParlay) setParlayBets(updatedParlayBets);
    else setBets(updatedBets);

    // Refresh screen
    refreshScreen();

    // Close panel
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog
        as="div"
        className="z-50 fixed inset-0 overflow-y-auto backdrop-blur-3xl shadow-2xl font-Basic"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-5" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`inline-block w-full max-w-md p-6 pb-10 md:p-10 md:pt-8 my-8 overflow-hidden align-middle transition-all transform bg-whiteshadow-xl rounded-2xl text-center ${
                colorMode === "dark"
                  ? "bg-primary shadow-2xl shadow-neutral-900"
                  : "bg-white"
              }`}
            >
              <Dialog.Title
                as="h3"
                className={`text-2xl md:text-3xl leading-tight md:leading-normal tracking-tight ${
                  colorMode === "dark" ? "text-white" : "text-primary"
                }`}
              >
                Update bet status
              </Dialog.Title>

              <div className="flex flex-col items-center justify-center">
                {/* Top row */}
                <div className="grid-cols-3 flex flex-row space-x-2 w-full mt-6">
                  <button
                    onClick={() => handleUpdate("LOST")}
                    className="aspect-square rounded-lg bg-red-500 text-white w-full hover:bg-red-700 hover:animate-pulse"
                  >
                    Lost
                  </button>
                  <button
                    onClick={() => handleUpdate("VOID")}
                    className="aspect-square rounded-lg bg-gray-300 text-white w-full hover:bg-gray-500 hover:animate-pulse"
                  >
                    Void
                  </button>
                  <button
                    onClick={() => handleUpdate("WON")}
                    className="aspect-square rounded-lg bg-green-500 text-white w-full hover:bg-green-700 hover:animate-pulse"
                  >
                    Won
                  </button>
                </div>

                {/* Mid row */}
                <div className="grid-cols-3 flex flex-row space-x-2 w-full my-2">
                  <button
                    onClick={() => redirectToUpdate()}
                    className="rounded-lg bg-blue-500 text-white w-full hover:bg-blue-700 hover:animate-pulse p-4"
                  >
                    Update
                  </button>
                </div>

                {/* Bottom row */}
                <div className="flex flex-row w-full space-x-2">
                  <button
                    onClick={() => handleUpdate("DELETE")}
                    className="flex flex-row justify-center items-center rounded-lg bg-red-700 hover:bg-red-900 text-white w-auto p-4 px-6"
                  >
                    <IoTrashOutline className="text-2xl" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`rounded-lg w-full p-2 ${
                      colorMode === "dark"
                        ? "bg-tertiary text-white hover:bg-secondary"
                        : "bg-primary text-white hover:bg-black"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export { ControlPanelDialog };
