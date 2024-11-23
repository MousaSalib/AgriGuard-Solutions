import Link from "next/link";
import AuthButtons from "./AuthButtons";
import LogoutButton from "./LogoutButton";
import HeaderUsername from "./HeaderUsername";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}
interface RightSideProps {
  userProfile: User | null;
}
const RightSide = ({ userProfile }: RightSideProps) => {
  return (
    <div>
      {userProfile ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold flex items-center justify-between gap-2">
              Welcome,{" "}
              <Link
                href={`/profile/${userProfile.id}`}
                style={{
                  color: "#ffff00",
                }}
              >
                {/* <span
                  className="h-12 w-12 font-bold rounded-full text-customGreen border-2 border-white flex items-center justify-center"
                  style={{ backgroundColor: "#ffff00" }}
                >
                  {userProfile.username.charAt(0).toUpperCase()}
                </span> */}
                <HeaderUsername userId={userProfile?.id.toString()} />
              </Link>
            </h1>
            <LogoutButton />
          </div>
        </>
      ) : (
        <>
          <AuthButtons />
        </>
      )}
    </div>
  );
};

export default RightSide;
