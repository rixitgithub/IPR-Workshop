import { NavLink } from "react-router-dom";
import cx from "classnames";
import styles from "../styles/Home.module.scss";

import { ReactComponent as ScheduleIcon } from "../media/icons/schedule.svg";
import { ReactComponent as LinkIcon } from "../media/icons/link.svg";
import Carousel from "../components/Carousel";
import HighlightCard from "../components/HighlightCard";

import { events, highlights } from "../data/data";
import { mainCoordinators, coordinators } from "../data/data";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import Events from "./Events";
import Benefits from "./Benefit";
import SupportLink from "../components/SupportLink";
import Register from "./Register";



const tags = [
  "Lectures",
  "Workshops",
  "Certificates",
  "Learning",
  "Knowledge",
  "Fun",
];

const Home = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <section className={cx(styles["intro-section"], styles["home-section"])}>
        <div className={styles["intro-bg"]}>
          <div className={styles.rail}>
            {tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
          <div className={styles.rail}>
            {tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
        </div>
        <header
          className={cx(styles.introContent, styles.sectionHeader, "container")}
        >
          <h2 className={styles.heading}>
            <span style={{ marginRight: "3ch" }}>RGIPT-IPR</span>
            <span className={styles._ar}>2024</span>
          </h2>
          <p className={styles.subtitle}>
            Patent Workshop at RGIPT is a one-day event introduced this year to
            provide focused education on patent-related matters. Launched by a
            RGIPT, this initiative aims to equip participants with essential
            knowledge and skills in patenting.
          </p>
          <div className={styles["header-btn-wrapper"]}></div>
        </header>
      </section>

      <Events />
      <Benefits />
      <Register />

      <section className={cx(styles["home-section"], styles.coordinators)}>
        <header className={cx(styles.sectionHeader, "container")}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: "3ch" }}>Our</span>
            <span className={styles._ar}>Team</span>
          </h2>
          <div
            className={cx(styles.subtitle, "container")}
            id="coordinatorsList"
          >
            <ul>
              {coordinators
                .filter((val, i) => i <= 22)
                .map((val) => (
                  <li key={val.name}> {val.name}</li>
                ))}
            </ul>
            <ul>
              {coordinators
                .filter((val, i) => i > 22)
                .map((val) => (
                  <li key={val.name}> {val.name}</li>
                ))}
            </ul>
          </div>
        </header>
        <main>
          <Carousel cardsList={mainCoordinators} />
        </main>
      </section>
      <SupportLink />
    </motion.div>
  );
};

export default Home;
