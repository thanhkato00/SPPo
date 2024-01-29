import Navbars from "./Navbars/Navbars";
import Footer from "./Footer/Footer";
import TopPage from "./TopPage/TopPage";

function UseInterfacePage() {
  return (
    <div>
      {" "}
      <div className="spcontainer">
        <Navbars />
      </div>
      <TopPage />
      {/* ở chỗ này tôi muốn hiển thị những sản phẩm bán chạy nhất thì làm thế nào */}
      <Footer/>
    </div>
  );
}

export default UseInterfacePage;
