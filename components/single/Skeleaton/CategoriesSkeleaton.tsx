const CategoriesSkeleaton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-4 bg-zinc-700 animate-pulse"
          style={{
            width: "100%",
            maxWidth: `${Math.floor(Math.random() * 20 + 50)}px`,
          }}
        />
      ))}
    </>
  );
};

export default CategoriesSkeleaton;
