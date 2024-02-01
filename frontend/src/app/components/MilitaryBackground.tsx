import React from "react";
import styles from "src/app/components/MilitaryBackground.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { SingleDetail, ListDetail } from "@/app/components";
import Image from "next/image";

export const MilitaryBackground = () => {
  return (
    <div className={styles.box}>
      <Accordion className={styles.accordian}>
        <AccordionSummary
          className={styles.accordianTitle}
          expandIcon={<Image src="/dropdown.svg" width={16} height={12} alt="dropdown" />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography className={styles.title}>Military Background</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.details}>
            <div className={styles.row}>
              <ListDetail title="Branch" values={["Army"]} />
            </div>
            <div className={styles.row}>
              <ListDetail title="Conflicts" values={["Iraq", "Afganistan", "Irani Crisis"]} />
            </div>
            <div className={styles.row}>
              <SingleDetail title="Other" value="Please list" />
            </div>
            <div className={styles.row}>
              <ListDetail title="Discharge Status" values={["Medical"]} />
            </div>
            <div className={styles.row}>
              <ListDetail title="Service Connected" values={["Yes"]} />
            </div>
            <div className={styles.row}>
              <SingleDetail title="Last Rank" value="Private" />
              <SingleDetail title="Military ID Number" value="1111" />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
