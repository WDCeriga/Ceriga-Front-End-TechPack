import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@redux/store";
import routes from "@routes/index";

const StitchingImg: FC = () => {
  const { productType, stitching } = useSelector(
    (state: RootState) => state.order
  );
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen,
  );
  const { type } = stitching;
  const imageurl = productinfo?.stitchingOptions?.find(x => x.type == type)?.stitchingImgUrl
  if (productType === "Sweat Pants") {
    return (
      <>
        <img
          style={{
            marginTop: "-5vw",
            maxWidth: "60%",
            height: "auto",
            marginLeft: "25%"
          }}
          crossOrigin="anonymous"
          src={`${routes.server.base}${imageurl}`}
          alt={`${productType} - ${type}`}
        />
      </>
    );
  } if (productType === "Uncuffed") {
    return (
      <>
        <img
          style={{
            marginTop: "-10vw",
            maxWidth: "60%",
            height: "auto",
            marginLeft: "25%"
          }}
          crossOrigin="anonymous"
          src={`${routes.server.base}${imageurl}`}
          alt={`${productType} - ${type}`}
        />
      </>
    );
  } return (
    <>
      <img
        style={{
          marginTop: "-10vw",
          maxWidth: "100%",
          height: "auto",
        }}
        crossOrigin="anonymous"
        src={`${routes.server.base}${imageurl}`}
        alt={`${productType} - ${type}`}
      />
    </>
  );
};

export default StitchingImg;
