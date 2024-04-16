import * as React from "react";
import CardAction from "./cardAction";

export default function CampaignActionButtons({
  addEmailNode,
  addTimeIntervalNode,
}) {
  return (
    <div className="flex flex-col divide-y-4 mx-2">
      <div className="h-2/3">
        <div className="font-semibold">Actions</div>
        <CardAction onClick={addEmailNode} name={"Email"} />
        <div className="font-semibold">Time Interval</div>
        <CardAction onClick={addTimeIntervalNode} name={"Time Interval"} />
      </div>
      <div className="flex-grow">
        <div>Other Campaigns</div>
      </div>
    </div>
  );
}
