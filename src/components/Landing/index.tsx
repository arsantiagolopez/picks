import moment from "moment-timezone";
import { useSession } from "next-auth/react";
import React, { FC, useContext } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { Footer } from "../Footer";
import { Reviews } from "../Reviews";
import { PastPicks } from "./PastPicks";
import { TodaysPicks } from "./TodaysPicks";
import { TomorrowsPicks } from "./TomorrowsPicks";

interface Props {}

const Landing: FC<Props> = () => {
  const { data: session } = useSession();

  const { user } = session || {};

  const { potdReleaseTime } = useContext(PreferencesContext);

  const currentCentralizedTime = moment()
    .tz("America/Chicago")
    .format("h:mm A");

  const isPastPotdReleaseTime = moment(
    moment.utc(currentCentralizedTime, "h:mm A")
  ).isSameOrAfter(moment.utc(potdReleaseTime, "h:mm A"));

  const isTomorrowsPicksVisible = isPastPotdReleaseTime;

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

      <Reviews />

      <PastPicks {...pastPicks} />
      <Footer />
    </div>
  );
};

export { Landing };
