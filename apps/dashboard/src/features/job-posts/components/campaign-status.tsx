import type { JobPostCampaign } from "@optima/supabase/types";
import { Progress } from "@optima/ui/progress";
import moment from "moment";
export function CampaignStatus({
  campaign,
}: { campaign: JobPostCampaign | undefined }) {
  if (!campaign)
    return (
      <p className="text-sm ">
        <span className="text-secondary-foreground">No campaign found</span>
        <Progress value={100} indicatorBg="destructive" />
      </p>
    );
  const status = campaign.status;

  if (status === "pending") {
    return (
      <>
        <p className="text-sm ">
          <span className="text-secondary-foreground">Launching</span>{" "}
          <span>{moment(campaign.start_date).fromNow()}</span>
        </p>
        <Progress value={100} indicatorBg="warning" />
      </>
    );
  }
  if (status === "active") {
    const daysLeft = moment(campaign.end_date).diff(moment(), "days");
    const progress = (daysLeft / 7) * 100;
    return (
      <>
        <p className="text-sm ">
          <span className="text-secondary-foreground">Deadline:</span>{" "}
          <span>{daysLeft} Days left</span>
        </p>
        <Progress value={progress} indicatorBg="success" />
      </>
    );
  }
  if (status === "completed") {
    return (
      <>
        <p className="text-sm ">
          <span className="text-secondary-foreground">Deadline:</span>{" "}
          <span>Campaign completed</span>
        </p>
        <Progress value={100} indicatorBg="success" />
      </>
    );
  }
  if (status === "paused") {
    return (
      <>
        <p className="text-sm ">Campaign paused</p>
        <Progress value={100} indicatorBg="warning" />
      </>
    );
  }
}
