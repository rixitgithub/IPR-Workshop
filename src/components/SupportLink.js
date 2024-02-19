import styles from "./SupportLink.module.scss";
import cx from "classnames";

const SupportLink = () => (
  <div className={styles.support}>
    For queries and technical support, join the{" "}
    <a
      className={cx("link", styles.link)}
      target="_blank"
      rel="noreferrer"
      href="whatsapp link"
    >
      RGIPT-IPO'24 Whatsapp community
    </a>
  </div>
);

export default SupportLink;
