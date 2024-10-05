import React from "react";
import Countdown from "react-countdown";

// Function to extract hours from the location string
const extractHoursFromString = (locationString: string): number => {
  const match = locationString?.match(/(\d+)(?=hrs)/); // Regex to extract the number before "hrs"
  return match ? parseInt(match[0], 10) : 0; // Return the number or 0 if not found
};

interface CountdownProps {
  createdAt: string; // MongoDB createdAt timestamp (ISO format)
  locationString: string; // e.g., "Ilorin Kwara - within 24hrs"
  from:string
}

const DeliveryCountdown: React.FC<CountdownProps> = ({ createdAt, locationString, from }) => {
  // Extract hours from the location string (24, 48, or 72 hours)
  const hoursToAdd = extractHoursFromString(locationString);

  // Calculate the target time by adding hoursToAdd to createdAt
  const targetTime = new Date(createdAt).getTime() + hoursToAdd * 60 * 60 * 1000;

  // Countdown renderer
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return(<>
      {from == 'buyer' && <button className="bg-red white top-3 rad-10 pd-10 ubuntu px12">
          File dispute <i className="fas fa-flag mg-5"></i>
        </button> }
         
      </>)
    } else {
      return (
        <span className="my-mother ">
          {hours}h: {minutes}m: {seconds}s left for delivery
        </span>
      );
    }
  };

  return (
    <div className="">
      <Countdown date={targetTime} renderer={renderer} />
    </div>
  );
};

export default DeliveryCountdown;
