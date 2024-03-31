import LoginForm from "../components/Forms/LoginForm";
import {
  CloudIcon,
  CarIcon,
  GearIcon,
  GiftIcon,
} from "../assets/images/SVGIcons";
import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.jpg";
import landing_page_battery from "../assets/images/battery_landing_page.jpg";
import logo from "../assets/images/logo.png";
import Contact from "../components/LandingPage/contact";
import Footer from "../components/LandingPage/footer";
import MyLandingPage from "./home";
import LandingPageHeader from "./LandingPage";
import PageWrapper from "../components/UI/Page";
const LandingPage = () => {
  return (
    <PageWrapper>
      <LandingPageHeader />

      <div id="feature" className="bg-white py-24">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2
                  className="mb-12 section-heading wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  Our Services
                </h2>

                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <CloudIcon />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">
                          Built with TailwindCSS
                        </h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <GiftIcon />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Free to Use</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <GearIcon />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Fully Responsive</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <CarIcon />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Easy to Customize</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div
                className="mx-3 lg:mr-0 lg:ml-3 wow fadeInRight"
                data-wow-delay="0.3s"
              >
                <img src={landing_page_battery} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="team" className="bg-slate-100 py-24 text-center">
        <div className="container">
          <div className="text-center">
            <h2
              className="mb-12 section-heading wow fadeInDown"
              data-wow-delay="0.3s"
            >
              Our Team
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay"></div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">John Doe</h3>
                  <p>UX UI Designer</p>
                </div>
              </div>
            </div>
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay"></div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">John Doe</h3>
                  <p>UX UI Designer</p>
                </div>
              </div>
            </div>
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay">
                    <ul className="flex justify-center">
                      <li className="mx-1"></li>
                      <li className="mx-1"></li>
                      <li className="mx-1"></li>
                    </ul>
                  </div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">Rob Hope</h3>
                  <p>Front-end Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </PageWrapper>
  );
};

export default LandingPage;
