import { TiTick } from "react-icons/ti";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.hero}>
      <div>
        <h1 className={styles.title}>AgriGuard Solutions</h1>
        <p className={styles.desc}>
          AgriGuard Solutions 🌱💡 – The ultimate platform for precision
          pesticide management 🚜🌾.
        </p>
        <div className={styles.services}>
          <div className={styles.serviceItem}>
            {" "}
            <TiTick /> Precision Pesticide Application
          </div>
          <div className={styles.serviceItem}>
            {" "}
            <TiTick /> Pest Detection and Prevention
          </div>
          <div className={styles.serviceItem}>
            {" "}
            <TiTick /> Data-Driven Agricultural Insights
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
