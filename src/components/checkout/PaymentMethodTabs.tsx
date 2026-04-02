import LnTabs from "../custom/LnTabs";
import BankTransfer from "./BankTransfer";

export default function PaymentMethodTabs() {
  const paymentMethodMenus = [
    {
      label: "QR Code",
      value: "qrcode",
      content: <>TEST QR CODE</>,
    },
    {
      label: "Bank Transfer",
      value: "bank-transfer",
      content: <BankTransfer />,
    },
  ];
  return <LnTabs tabs={paymentMethodMenus} />;
}
