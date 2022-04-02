import { useSession } from "next-auth/react";
import React, { FC, useContext } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { UserSession } from "../../types";
import { Footer } from "../Footer";
import { PastPicks } from "./PastPicks";
import { TodaysPicks } from "./TodaysPicks";
import { TomorrowsPicks } from "./TomorrowsPicks";

interface Props {}

interface Session {
  data: UserSession;
  status: string;
}

const Landing: FC<Props> = () => {
  const { data: session } = useSession() as unknown as Session;

  const { user } = session || {};

  const { potdReleaseTime } = useContext(PreferencesContext);

  // const currentCentralizedTime = moment()
  //   .tz("America/Chicago")
  //   .format("h:mm A");

  // const isPastPotdReleastTime = moment(currentCentralizedTime).isSameOrAfter(
  //   moment(potdReleaseTime, "h:mm A")
  // );

  // const isTomorrowsPicksVisible = isPastPotdReleastTime;
  const isTomorrowsPicksVisible = false;

  const isAdmin = user ? user?.isAdmin : false;

  const tomorrowsPicksProps = { isAdmin, potdReleaseTime };
  const todaysPicksProps = {
    potdReleaseTime,
    isTomorrowsPicksVisible,
    isAdmin,
  };
  const pastPicks = { isAdmin };

  return (
    <div className="flex flex-col items-center">
      {(isAdmin || isTomorrowsPicksVisible) && (
        <TomorrowsPicks {...tomorrowsPicksProps} />
      )}
      <TodaysPicks {...todaysPicksProps} />
      <PastPicks {...pastPicks} />
      <Footer />
    </div>
  );
};

export { Landing };
