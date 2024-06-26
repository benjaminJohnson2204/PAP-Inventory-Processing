import { SingleDetail } from "@/components/VSRIndividual";
import { type VSR } from "@/api/VSRs";
import moment from "moment";
import { VSRIndividualAccordion } from "@/components/VSRIndividual/VSRIndividualAccordion";
import { STATUS_OPTIONS, StatusDropdown } from "@/components/shared/StatusDropdown";
import { StatusChip } from "@/components/shared/StatusChip";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { CircularProgress } from "@mui/material";
import styles from "@/components/VSRIndividual/PageSections/CaseDetails/styles.module.css";

export interface CaseDetailsProp {
  vsr: VSR;
  isEditing: boolean;
  loadingStatus: boolean;
  onUpdateVSRStatus: (status: string) => void;
}

/**
 * Formats a Date object as a string in our desired format, using Moment.js library
 */
const formatDate = (date: Date) => {
  const dateMoment = moment(date);
  // We need to do 2 separate format() calls because Moment treats brackets ("[]") as escape chars
  return `${dateMoment.format("MM-DD-YYYY")} [${dateMoment.format("hh:mm A")}]`;
};

/**
 * The "Case Details" section of the VSR individual page.
 */
export const CaseDetails = ({
  vsr,
  isEditing,
  loadingStatus,
  onUpdateVSRStatus,
}: CaseDetailsProp) => {
  const { isMobile, isTablet } = useScreenSizes();

  const renderStatus = () => {
    if (loadingStatus) {
      return <CircularProgress size={24} />;
    }

    if (vsr.status === "Received" || vsr.status === undefined || isEditing) {
      return (
        <StatusChip
          status={
            STATUS_OPTIONS.find(
              (statusOption) => statusOption.value === (vsr.status ?? "Received"),
            )!
          }
        />
      );
    }
    return (
      <StatusDropdown
        onChanged={onUpdateVSRStatus}
        value={vsr.status != undefined ? vsr.status : "Received"}
        includeAllStatuses={false}
      />
    );
  };

  const valueFontSize = isMobile ? 14 : isTablet ? 18 : 20;

  return (
    <VSRIndividualAccordion
      permanentlyExpanded
      title="Case Details"
      className={isEditing ? styles.blurred : ""}
    >
      <div className={styles.details}>
        <SingleDetail
          title="Date Received:"
          value={formatDate(vsr.dateReceived)}
          valueFontSize={valueFontSize}
          className={styles.singleDetail}
        />
        <SingleDetail
          title="Last Updated:"
          value={formatDate(vsr.lastUpdated)}
          valueFontSize={valueFontSize}
          className={styles.singleDetail}
        />

        <SingleDetail
          title="Status:"
          value={<div className={styles.statusWrapper}>{renderStatus()}</div>}
          className={styles.singleDetail}
        />
      </div>
    </VSRIndividualAccordion>
  );
};
