import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-center m-4">
          Welcome to the Campaign Manager
        </h1>
        <p className="text-lg text-center m-4 text-gray-400">
          Send personalized emails, set up time for each email, and increase
          your company's sales.
        </p>
        <Link href={"/secuencer"} className="btn btn-lg btn-primary w-1/2">
          Create your next Marketing Campaign
        </Link>
      </div>
    </Layout>
  );
}
