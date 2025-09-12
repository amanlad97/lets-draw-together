export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-3  border-white-50 border-primary border-t-transparent text-white rounded-full animate-spin" />
    </div>
  );
};
