import LoginForm from "../../components/Forms/LoginForm";
import {
  CloudIcon,
  CarIcon,
  GearIcon,
  GiftIcon,
} from "../../assets/images/SVGIcons";

LandingPageBattery;
import Contact from "./contact";
import Footer from "./footer";
import LandingPageHeader from "./HeroSection";
import { Carousel } from "flowbite-react";
import { LandingPageBattery } from "../../assets/images";

const LandingPage = () => {
  return (
    <div>
      <LandingPageHeader />

      <div id="feature" className="bg-white py-24 px-6 ">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2
                  className="mb-12 section-heading wow fadeInDown font-bold text-xl tracking-wide"
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
                <img src={LandingPageBattery} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="team" className="bg-slate-100 py-24 text-center px-6">
        <h2
          className="mb-12 section-heading wow fadeInDown font-bold text-xl tracking-wide"
          data-wow-delay="0.3s"
        >
          Our Workplace
        </h2>
        <Carousel indicators={false}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
        </Carousel>
      </section>

      <Contact />

      <Footer />
    </div>
  );
};

export default LandingPage;
