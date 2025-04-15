import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@redux/store";
import routes from "@routes/index";

const FadingImg: FC = () => {
  const { productType, fading } = useSelector(
    (state: RootState) => state.order
  );
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen,
  );
  const { type } = fading;
  const imageurl = productinfo?.fadingOptions.find(x => x.type == type)?.fadingImgUrl

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
  }
  return (
    <>
      <img

        style={{
          marginTop: "-10vw",
          maxWidth: "100%",
          height: "90%",
        }}
        crossOrigin="anonymous"
        src={`${routes.server.base}${imageurl}`}
        alt={`${productType} - ${type}`}
      />
    </>
  );
};

export default FadingImg;
