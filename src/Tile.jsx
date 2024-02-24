export function Tile({ content: Content, flip, state, darkMode, setDarkMode }) {
  switch (state) {
    case "start":
      return (
        <Back
          className={`inline-block h-[21.7%] w-[21.7%] ${!darkMode ? "bg-indigo-300" : "bg-zinc-700" } text-center  m-[1.65%] rounded-lg`}
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className={`inline-block h-[21.7%] w-[21.7%] ${!darkMode ? "bg-indigo-500" : "bg-zinc-800" } text-center ${!darkMode ? "text-white" : "text-zinc-200" } m-[1.65%] rounded-lg`}>
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
			  padding:"11%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className={`inline-block h-[21.7%] w-[21.7%] ${!darkMode ? "text-indigo-200" : "text-zinc-600" } text-center  m-[1.65%] rounded-lg`}>
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
			  padding:"11%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return (
    <div onClick={flip} className={className}>
      
    </div>
  );
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
