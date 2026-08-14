function Header({ activeTab }) {
  return (
    <div className=" px-10 py-8 ">
      {activeTab === "home" && (
        <>
          <div>
            <p className="text-[24px] font-light">Welcome back,</p>{" "}
            <p className="text-[18px]">Felipe M.</p>
          </div>
        </>
      )}
      {activeTab === "readen" && (
        <>
          <div>
            <p className="text-[24px]">Readen</p>{" "}
            <p className="text-[14px] text-white/70">
              observed for 3 months 14 days{" "}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
