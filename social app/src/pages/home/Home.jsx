import Topbar from "../../components/topbar/Topbar";

import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
