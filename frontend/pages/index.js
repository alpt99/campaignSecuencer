import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout from "../components/layout";
import CardAction from "../components/cardAction";

export default function Home() {
  return (
    <Layout>
      <div className=" m-8">
        This is the home page
        <CardAction />
      </div>
    </Layout>
  );
}
