const NotFound = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center font-medium gap-3 px-6">
      <h1 className="text-3xl lg:text-4xl text-gray text-center">
        404 : Page not found
      </h1>
      <div>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDY4aDI0MWNmOG5ma3RpdTlpdnd0dTg3cWhhODNxbWYxdHY2OXd4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ONostKY8aj8bK/giphy.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default NotFound;
