import { FC, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IDelivery } from "@interfaces/Delivery.interface";
import { AppDispatch } from "@redux/store";
import { changeDeliveryForm, loadDelivery } from "@redux/slices/order";
import { saveDeliveryInfo } from "@api/requests/protected";
import InputForm from "@common/Form/Input/Input";
import notification from "@services/notification";
import SelectLCountry from "@common/Form/Select/SelectCountry";
import SelectRegion from "@common/Form/Select/SelectState";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from "@mui/icons-material/Info";

import s from "./form.module.scss";

interface IDeliveryForm {
  delivery: IDelivery;
  validationErrors: Record<string, string>;
}

const DeliveryForm: FC<IDeliveryForm> = ({ delivery, validationErrors }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadDelivery());
  }, [dispatch]);

  const handleChange = (name: keyof IDelivery, value: string | boolean) => {
    dispatch(changeDeliveryForm({ type: name, value }));
  };

  const handleSaveDelivery = async (e: FormEvent) => {
    e.preventDefault();
    const data = await saveDeliveryInfo(delivery);
    notification.success(data.message);
  };

  return (
    <form className={s.form}>
      <div className={s.form_column}>
        <h3 className={s.form_column_title}>Delivery Address</h3>

        <InputForm
          onChange={handleChange}
          label="Company Name*"
          name="companyName"
          initialValue={delivery.companyName}
          error={validationErrors.companyName}
        />
        <InputForm
          onChange={handleChange}
          label="Address Line*"
          name="addressLine"
          initialValue={delivery.addressLine}
          error={validationErrors.addressLine}
        />
        <InputForm
          onChange={handleChange}
          label="Zip Code*"
          name="zipCode"
          initialValue={delivery.zipCode}
          error={validationErrors.zipCode}
        />
        <InputForm
          onChange={handleChange}
          label="Tax Number"
          name="taxNumber"
          initialValue={delivery.taxNumber}
          error={validationErrors.taxNumber}
        />
        <InputForm
          onChange={handleChange}
          label={
            <>
              BOL Number
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip
                    id="tooltip-bolNumber"
                    style={{
                      fontSize: "10px",
                      color: "#fff",
                      backgroundColor: "#e33c12",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      maxWidth: "200px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {"Please enter the BOL number here."}
                    <div
                      style={{
                        content: "''",
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #e33c12",
                      }}
                    />
                  </Tooltip>
                }
              >
                <span
                  style={{
                    marginLeft: 6,
                    cursor: "pointer",
                    verticalAlign: "middle",
                  }}
                >
                  <InfoIcon
                    style={{ fontSize: "14px", color: "#444", marginTop: 5 }}
                  />
                </span>
              </OverlayTrigger>
            </>
          }
          name="bolNumber"
          initialValue={delivery.bolNumber}
          error={validationErrors.bolNumber}
        />
        <SelectLCountry initialValue={delivery.country || null} />
        {delivery.country !== null && (
          <SelectRegion
            onChange={handleChange}
            initialState={delivery.state}
            countryCode={delivery.country?.code}
            error={validationErrors.state}
          />
        )}
        {delivery.state !== null && delivery.state?.length !== 0 && (
          <InputForm
            onChange={handleChange}
            label="City*"
            name="city"
            initialValue={delivery.city}
            error={validationErrors.city}
          />
        )}
        <label className={s.form_column_checkbox}>
          <input
            onChange={(e) => handleChange("sameAsBilling", e.target.checked)}
            className={s.form_column_checkbox_input}
            type="checkbox"
            checked={delivery.sameAsBilling}
          />
          <p className={s.form_column_checkbox_text}>Same as billing address</p>
        </label>
      </div>
      <div className={s.form_column}>
        <h3 className={s.form_column_title}>Contact Information</h3>
        <InputForm
          onChange={handleChange}
          label="Name*"
          name="name"
          initialValue={delivery.name}
          error={validationErrors.name}
        />
        <InputForm
          onChange={handleChange}
          label="Phone Number*"
          name="phoneNumber"
          initialValue={delivery.phoneNumber}
          error={validationErrors.phoneNumber}
        />
        <InputForm
          onChange={handleChange}
          label="Email*"
          name="email"
          initialValue={delivery.email}
          error={validationErrors.email}
        />
        <button onClick={handleSaveDelivery} className={s.form_column_button}>
          Save information
        </button>
      </div>
    </form>
  );
};

export default DeliveryForm;
