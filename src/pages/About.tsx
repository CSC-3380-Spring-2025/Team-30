import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

export default function Home() {
  return (
    <div className="container">
      <div className="topBox">
        <HamburgerMenu /> 
      </div>
      <div className="content">
        <div className="title">
            SSL Officers
        </div>
      </div>
      <div className="bottomBox">
      <p className={`bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}