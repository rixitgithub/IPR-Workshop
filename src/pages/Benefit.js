import { NavLink } from "react-router-dom";
import styles from "../styles/Events.module.scss";
import cx from "classnames";
import { events } from "../data/data";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import benefit from "../media/benefit (1).png";
import SupportLink from "../components/SupportLink";
import { ReactComponent as LinkIcon } from "../media/icons/link.svg";

const Benefits = () => {
  return (
    <motion.div
      className={cx(styles.events, "page-transition", "container")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header className={cx("page-header", styles["page-header"])}>
        <h1 className="heading">
          <span>Promising</span>
          <span>Benefits</span>
        </h1>
        <div className={cx(styles["header-btn-wrapper"])}></div>
        <div className={cx("subtitle", styles["header-subtitle"])}>
          <h2>Offering</h2>
          <div>Various</div>
        </div>
      </header>
      <div>
        <img
          src={benefit}
          style={{ height: "auto", width: "1650px" }}
          alt=""
        ></img>
      </div>
    </motion.div>
  );
};

export default Benefits;
