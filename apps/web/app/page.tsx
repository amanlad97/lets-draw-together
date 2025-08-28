export default function Home() {
  return (
    <div className="bg-gray-400  w-screen h-screen flex item-center justify-center">
      <div className=" flex flex-col justify-center items-center">
        <div className="bg-gray-50 w-xl flex rounded-xl p-8 flex-col items-center shadow-2xl">
          <h3 className="font-bold text-3xl">login</h3>
          <input
            type="text"
            placeholder="Username"
            className="w-full m-3 p-3 border-x-green-400"
          ></input>
          <input
            type="text"
            placeholder="password"
            className="w-full m-3 p-3 focus:border-green-500"
          ></input>
          <button className="w-full m-3 p-3 bg-green-500 rounded-xl text-white font-bold">
            submit
          </button>
          <h1>
            or maybe we can try{" "}
            <a className=" text-green-700" href="www.google.com">
              signup
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}
