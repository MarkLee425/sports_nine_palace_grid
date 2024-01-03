import Link from "./Link";

const Navbar = () => {
  return (
    <nav className="border border-black text-black w-full fixed h-[60px] flex justify-between items-center px-3">
      <Link href="https://www.riccihall.com/">
        <img src="/ricci.png" width={"60px"} loading="lazy" />
      </Link>
      <div>2</div>
      <div>3</div>
    </nav>
  );
};

export default Navbar;
