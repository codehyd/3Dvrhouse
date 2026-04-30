import { Button } from "antd";
import { useNavigate } from "react-router";

/**
 * [2026-04-30] 首页
 *
 * TODO 暂时使用按钮去跳转至看房详情页
 */

function Home() {
  const navigate = useNavigate();

  // 跳转至看房首页 [residential-details] 并且传递参数 id: living_1
  const handleNavToResidentialDetails = () => {
    navigate("/residential-details", { state: { id: "living_1" } });
  };

  return (
    <>
      <Button type="primary" onClick={handleNavToResidentialDetails}>
        点击进入房源1
      </Button>
    </>
  );
}

export default Home;
