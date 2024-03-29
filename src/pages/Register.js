import { NavLink } from "react-router-dom";
import styles from "../styles/Events.module.scss";
import cx from "classnames";
import { events } from "../data/data";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import qr from "../media/qr.png";
import SupportLink from "../components/SupportLink";
import { ReactComponent as LinkIcon } from "../media/icons/link.svg";

const Register = () => {
  return (
    <motion.div
      className={cx(styles.events, "page-transition", "container")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header className={cx("page-header", styles["page-header"])}>
        <h1 className="heading">
          <span>Register</span>
          <span>Now</span>
        </h1>
        <div className={cx(styles["header-btn-wrapper"])}></div>
        <div className={cx("subtitle", styles["header-subtitle"])}>
          <h2>Dont</h2>
          <div>Wait</div>
        </div>
      </header>
      <div>
        <img src={qr} style={{}} alt=""></img>
      </div>
    </motion.div>
  );
};

export default Register;
