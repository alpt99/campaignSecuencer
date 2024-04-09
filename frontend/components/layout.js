import Navbar from "./navbar";

export default function Layout({ children }) {
  // fixed w-full z-10
  return (
    // <div className="relative">
    <div className="">
      <Navbar className="" />
      <div className="h-[90vh]">{children}</div>
    </div>
  );
}
