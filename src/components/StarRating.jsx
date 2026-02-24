import { Star } from 'lucide-react';

export default function StarRating({ rating, onRate, size = 'md', readonly = false }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRate?.(star)}
          className={`transition-all duration-150 ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
          }`}
        >
          <Star
            className={`${sizes[size]} transition-colors duration-150 ${
              star <= rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200 fill-gray-200'
            } ${!readonly && star > rating ? 'hover:text-amber-300 hover:fill-amber-300' : ''}`}
          />
        </button>
      ))}
    </div>
  );
}
