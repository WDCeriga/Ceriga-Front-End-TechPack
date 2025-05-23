import { IOrderState } from "@interfaces/bll/order.interface";
import { IParamPreviewOrder } from "@interfaces/order/paramsPreview.interface";

export const mapOrderStateToParams = async (state: IOrderState) => {
  const currentId = state.draftId ?? state._id;
  let links = {
    design: "",
    neck: "",
    label: "",
    package: "",
    frontsize: "",
    backsize: "",
  };
  try {
    const response = await fetch(
      "https://storage.googleapis.com/storage/v1/b/ceriga-storage-bucket/o?prefix=" +
        currentId
    );
    const data = await response.json();
    if (Array.isArray(data.items)) {
      const names: Array<string> =
        data?.items?.map((item: { name: string }) => item.name) || [];
      const findValidLink = (folder: string) => {
        const folderContent = names.filter(
          (name) =>
            name.startsWith(`${currentId}/${folder}/`) &&
            name !== `${currentId}/${folder}/`
        );

        return folderContent.length > 0 ? folderContent[0] : "";
      };

      links.design = findValidLink("designUploads");
      links.neck = findValidLink("neckUploads");
      links.label = findValidLink("labelUploads");
      links.package = findValidLink("packageUploads");
      links.frontsize = findValidLink("frontlogoUploads");
      links.backsize = findValidLink("backlogoUploads");

      Object.keys(links).forEach((key) => {
        const k = key as keyof typeof links;
        if (links[k]) {
          links[
            k
          ] = `https://storage.googleapis.com/ceriga-storage-bucket/${links[k]}`;
        }
      });
    } else {
      console.error(
        "No items found or invalid items structure in the response."
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const data: IParamPreviewOrder[] = [
    {
      title: "Fabrics",
      paramsType: "list",
      subparameters: [
        { title: "Materials", value: state.material.name || "N/A" },
        { title: "GSM", value: state.material.value || "N/A" },
      ],
    },
    {
      title: "Colour",
      paramsType: "list",
      subparameters: [
        { title: "Hex Code", value: state.color.hex || "N/A" },
        { title: "Color Description", value: state.color.description || "N/A" },
        // { title: "Dye style", value: state.dyeStyle || "" },
        // { title: "Extra details", value: state.stitching.description || "" },
      ],
    },
    {
      title: "Printing",
      paramsType: "text",
      subparameters: state.printing ? state.printing.toString() : "N/A",
    },
    {
      title: "Neck label",
      paramsType: "list",
      subparameters: [
        {
          title: "Design",
          isLink: true,
          link: links.neck,
        },
        // {
        //   title: "Design Options",
        //   value: state.neck.additional.material || "",
        // },
        {
          title: "Neck Label",
          value: state.neck.noLabels ? "No Label" : state.neck.type || "N/A",
        },
        // { title: "Neck Label Description", value: state.neckDescription || "N/A" },
        // { title: "Material", value: state.neck.additional.material || "" },
        // { title: "Colour", value: state.neck.additional.color || "" },
      ],
    },
    // {
    //   title: "Care label",
    //   paramsType: "list",
    //   subparameters: [
    //     {
    //       title: "",
    //       isLink: true,
    //       titleStyle: "bold",
    //       link: links.label,
    //     },
    //   ],
    // },
    {
      title: "Design",
      paramsType: "list",
      subparameters: [
        // {
        //   title: "Design",
        //   isLink: true,
        //   titleStyle: "bold",
        //   link: links.design,
        // },
        { title: "Stitching", value: state.stitching.type || "N/A" },
        { title: "Extra Details", value: state.stitching.description || "N/A" },
        // { title: "Custom Stitching", value: "" },
        { title: "Fading", value: state.fading.type || "N/A" },
        // { title: "Custom Fading", value: "" },
      ],
    },
    {
      title: "Packaging",
      paramsType: "list",
      subparameters: [
        {
          title: "Packaging Type",
          value: state.package.isPackage ? "Packaged" : "Unpackage",
        },
        { title: "Extra Details", value: state.package.description || "N/A" },
        {
          title: "Images",
          isLink: true,
          titleStyle: "bold",
          link: links.package,
        },
      ],
    },
    {
      title: "Quantity",
      paramsType: "table",
      subparameters: state.quantity.list.map((item) => ({
        title: item.name,
        value: item.value.toString(),
      })),
    },
    // {
    //   title: "Total Price",
    //   paramsType: "cost",
    //   subparameters: state.totalcost.toString(),
    // },
    {
      title: "Total Price",
      paramsType: "cost",
      subparameters: state.subtotal.toString(),
    },
    {
      title: "Size",
      paramsType: "listsize",
      subparameters: [
        {
          title: "Front Size",
          value: state.logodetails?.frontlogo
            ? state.logodetails?.frontlogo.toString()
            : "",
          issize: true,
        },
        {
          title: "Back Size",
          value: state.logodetails?.backlogo
            ? state.logodetails?.backlogo.toString()
            : "",
          issize: true,
        },
        {
          title: "Extra Details",
          value: state?.logodetails?.description.toString() || "N/A",
        },
        {
          title: "Front Image",
          isLink: true,
          titleStyle: "bold",
          link: links.frontsize,
        },
        {
          title: "Back Image",
          isLink: true,
          titleStyle: "bold",
          link: links.backsize,
        },
      ],
    },
  ];
  return data;
};
