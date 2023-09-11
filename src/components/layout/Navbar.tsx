import { useTheme } from "next-themes";
import EditframeIcon from "../../icons/EditframeIcon";
import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "../../icons/SunIcon";

const Navbar = () => {
  const { resolvedTheme, theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-2">
        <EditframeIcon /> <p className="text-lg font-semibold">EditFrame</p>
      </div>
      <button
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
        type="button"
        className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default Navbar;
