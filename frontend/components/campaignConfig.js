import * as React from "react";
import Link from "next/link";

export default function CampaignConfig({
  setCampaignTitle,
  setCampaignDescription,
  campaignTitle,
  campaignDescription,
  currentCampaign,
  createCampaign,
  runCampaign,
}) {
  return (
    <div>
      <div>Current Campaign {currentCampaign}</div>
      <div className="flex flex-col">
        <label className="input input-bordered flex items-center gap-2 m-2">
          <input
            type="text"
            className="grow"
            placeholder="Campaign Title"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />
        </label>
        <textarea
          className="textarea textarea-primary m-2"
          placeholder="Description"
          value={campaignDescription}
          onChange={(e) => setCampaignDescription(e.target.value)}
        ></textarea>
      </div>
      {currentCampaign !== null ? (
        <div>
          <button className="btn btn-primary m-2" onClick={runCampaign}>
            Run Current Campaign
          </button>
        </div>
      ) : (
        <button className="btn btn-primary m-2" onClick={createCampaign}>
          Create Campaign
        </button>
      )}
      <a
        href={"/secuencer"}
        className="btn btn-primary m-2"
        onClick={() => window.location.reload()}
      >
        Start a New Campaign From Scratch
      </a>
    </div>
  );
}
