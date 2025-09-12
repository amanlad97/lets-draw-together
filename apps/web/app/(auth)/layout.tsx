const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-black  w-screen h-screen flex item-center justify-center">
      <div className=" flex flex-col justify-center items-center">
        <div className="bg-gray-900 text-white w-md flex rounded-xl p-8 flex-col items-center shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};
export default layout;
