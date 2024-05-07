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

import { LandingPageBattery, KB_1, KB_2, KB_3 } from "../../assets/images";
import Carousel from "../../components/UI/Carousel";

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
                        <h4 className="font-bold text-blue-900">
                          Quality Guarantee
                        </h4>
                        <p>
                          We thoroughly test our batteries to make sure they're
                          reliable and perform well.
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
                        <h4 className="font-bold text-blue-900">
                          Quality Assurance
                        </h4>
                        <p>
                          We thoroughly test our batteries to make sure they're
                          reliable and perform well
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
                        <h4 className="font-bold text-blue-900">
                          Expert Guidance
                        </h4>
                        <p>
                          Our knowledgeable team will help you choose the right
                          battery for your vehicle.
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
                        <h4 className="font-bold text-blue-900">
                          Trusted Partnerships:
                        </h4>
                        <p>
                          We work with top brands to offer you the best quality
                          and service.
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
        <Carousel interval={10000} images={[KB_1, KB_2, KB_3]} />
      </section>

      <Contact />

      <Footer />
    </div>
  );
};

export default LandingPage;
