import "./about.css";

import ProfilePic from "../assets/profile.png";
import { resumeLink } from "../constants";

const AboutWindow = () => {
  const handleClick = () => {
    window.open(resumeLink, "_blank");
  };

  return (
    <>
      <div className="hero-content">
        <div className="hero-text">
          <p>
            Hi! I'm Nathaniel Kemme Nash, a self-taught programmer who is
            passionate about making websites and apps that help people, even if
            it's just one person. I've been coding for about 8 years, and in
            that time, I co-founded a smart meal planning app for campus dining,
            been the technical co-founder of a sports recruiting profiles
            company, released 5 apps with over 2k+ users, developed a
            programming language and an online IDE, an e-commerce store for a
            school, and so much more!
          </p>
        </div>
        <div className="hero-picture">
          <div className="profile-picture">
            <img src={ProfilePic} alt="Nathaniel Kemme Nash" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutWindow;
