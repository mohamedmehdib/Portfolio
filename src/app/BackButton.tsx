"use client"
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="text-gray-300 mt-7 ml-7 rounded-full text-2xl fixed bg-zinc-600 h-10 w-10 flex items-center justify-center"
      aria-label="Go Back"
    >
      <i className="uil uil-arrow-left"></i>
    </button>
  );
};

export default BackButton;
