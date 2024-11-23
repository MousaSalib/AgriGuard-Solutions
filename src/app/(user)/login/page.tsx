import LoginForm from "@/components/auth/login/LoginForm";
import Head from "next/head";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="container mx-auto my-auto px-4 w-full sm:w-full md:w-2/3 lg:w-1/2 mb-3">
        <div
          className="bg-customGreen rounded-lg py-6 px-4 sm:py-8 sm:px-6 mt-3 "
          style={{
            border: "2px solid #ffff00",
          }}
        >
          <h1
            className="text-2xl sm:text-3xl font-bold text-center mb-3"
            style={{ color: "#ffff00" }}
          >
            Login
          </h1>
          <LoginForm />
          <p className="text-sm mt-4 text-center">
            Don&#39;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
