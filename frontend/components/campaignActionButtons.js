import * as React from "react";
import CardAction from "./cardAction";

export default function CampaignActionButtons({
  addEmailNode,
  addTimeDelayNode,
}) {
  return (
    <div className="flex flex-col divide-y-4 mx-2">
      <div className="h-2/3">
        <div className="font-semibold mb-2">Email</div>
        <CardAction onClick={addEmailNode} name={"Email"} />
        <div className="font-semibold mb-2">Time Interval</div>
        <CardAction onClick={addTimeDelayNode} name={"Time Interval"} />
      </div>
      <div className="flex-grow">
        <div>Other Campaigns</div>
      </div>
    </div>
  );
}
