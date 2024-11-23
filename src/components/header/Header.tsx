import { cookies } from "next/headers";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import RightSide from "./RightSide";
import { verifyTokenForPage } from "@/utils/verifyToken";

const Header = () => {
  const token = cookies().get("jwtToken")?.value as string;
  const user = verifyTokenForPage(token);

  return (
    <>
      <header className={styles.header}>
        <Navbar user={user} />
        <RightSide userProfile={user} />
      </header>
    </>
  );
};

export default Header;
