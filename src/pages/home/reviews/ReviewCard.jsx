import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ reviewContent }) => {
  const {
    data,
    delivery_email,
    id,
    parcel_id,
    pick_up_email,
    ratings,
    review,
    userName,
    user_email,
    user_photoURL,
  } = reviewContent;

  return (
    <div className="bg-white p-10 rounded-2xl space-y-4">
      <div>
        <FaQuoteRight size={30} />
      </div>
      <p>{review}</p>
      <hr className="py-4 text-secondary" />
      <div className="flex items-center  gap-4">
        <img src={user_photoURL} alt="" className="w-12 h-12 rounded-full" />
        <div>
          <h4>{userName}</h4>
          <p>{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
