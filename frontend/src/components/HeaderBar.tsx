import React from "react";
import styles from "src/components/HeaderBar.module.css";

const HeaderBar = () => {
  return (
    <div className={styles.headerBar}>
      <img className={styles.logo} width={99} height={48} src="/logo.svg" />
    </div>
  );
};

export default HeaderBar;
