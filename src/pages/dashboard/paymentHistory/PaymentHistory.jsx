import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="py-10">
      <h3 className="text-3xl text-secondary font-bold">
        payment history: {payments.length}
      </h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount</th>
                <th>Payment time</th>
                <th>Trx Id</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr key={payment._id}>
                  <th>{i + 1}</th>
                  <td>Cy Ganderton</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paidAt}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
