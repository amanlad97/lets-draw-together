const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-gray-400  w-screen h-screen flex item-center justify-center">
      <div className=" flex flex-col justify-center items-center">
        <div className="bg-gray-50 w-md flex rounded-xl p-8 flex-col items-center shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};
export default layout;
