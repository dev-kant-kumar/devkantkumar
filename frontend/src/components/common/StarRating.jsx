import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating, setRating, readOnly = false, size = 20 }) => {
  // If readOnly, display stars based on rating
  if (readOnly) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} size={size} className="text-yellow-400" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} size={size} className="text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} size={size} className="text-gray-300" />);
        }
    }
    return <div className="flex gap-1">{stars}</div>;
  }

  // Interactive mode
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={size}
              className={`transition-colors ${
                ratingValue <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
