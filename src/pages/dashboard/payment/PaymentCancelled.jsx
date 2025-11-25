import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className=" text-2xl text-red-600">
        Paymnet is cancelled pls try agian
      </h2>
      <Link to={"/dashboard/my-parcels"}>My parcels</Link>
    </div>
  );
};

export default PaymentCancelled;
