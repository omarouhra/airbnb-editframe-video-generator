import { Player } from "@editframe/react";
import { useState } from "react";
import "./App.css";
import AirbnbIcon from "./icons/AirbnbIcon";
import PlayIcon from "./icons/PlayIcon";

import { SocialAdConfig } from "./templates/socialAd";
import axios from "axios";
import cheerio from "cheerio";

import SettingsModal from "./components/SettingsModal";
import SettingIcon from "./icons/SettingIcon";
import { listingAdConfig } from "./templates/listingAd";
import { CongratsAdConfig } from "./templates/congrats";

function App() {
  const [videoType, setVideoType] = useState<string>("ad");
  const [videoResolution, setVideoResolution] = useState<string>("mobile");
  const [showModal, setShowModal] = useState(false);
  const [listingUrl, setListingUrl] = useState("");
  const [data, setData] = useState<any>();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function scrapeWithScrapingBee() {
    const API_KEY =
      "BCVV56UBVI0P3L2VH03X135SW2D6Z8CFU9RBDX9C09LCL6XPCCK84EDE5A8S8L3OK1DM9QP21CQXFTD1";
    try {
      const response = await axios.get(
        `https://app.scrapingbee.com/api/v1/?api_key=${API_KEY}&url=${encodeURIComponent(
          listingUrl
        )}`
      );

      if (response.status === 200 && response.data) {
        const htmlContent = response.data;

        const $ = cheerio.load(htmlContent);

        const imageSelector = "img";

        const imageUrls: string[] = [];
        $(imageSelector).each((index, element) => {
          if (index < 10) {
            const imageUrl = $(element).attr("src");
            if (imageUrl) {
              imageUrls.push(imageUrl);
            }
          }
        });

        const firstH1 = $("h1").first();
        const firstH1Content = firstH1.text();
        // @ts-ignore

        setData({
          title: firstH1Content,
          images: imageUrls,
        });

        setShowPlayer(true);
        setIsLoading(false);
      } else {
        console.error("Error: Unable to fetch data from ScrapingBee");
      }
    } catch (error) {
      console.error("Error");
    }
  }

  const video =
    videoType === "ad"
      ? listingAdConfig(data)
      : videoType === "social"
      ? SocialAdConfig(data)
      : CongratsAdConfig(data);

  const mobileConfig = {
    layers: [
      {
        id: 0,
        trim: {
          start: 0,
        },
        type: "audio",
        audio: {
          volume: 1,
        },
        source: video.musicUrl,
        timeline: {
          start: 0,
        },
        transitions: [],
      },
      {
        id: 1,
        html: {
          page: {
            body: video.template,
            styles: video.css,
          },
          selector: "#template",
          withTailwind: true,
          withTransparentBackground: false,
        },
        size: {
          scale: 1,
          width: 1080,
          height: 1920,
          format: "fill",
        },
        trim: {
          start: 0,
        },
        type: "html",
        position: {
          x: 0,
          y: 0,
          z: 0,
          angle: 0,
          angleX: 0,
          angleY: 0,
          origin: "center",
          isRelative: false,
        },
        timeline: {
          start: 0,
        },
        transitions: [],
      },
    ],
    duration: 12,
    metadata: {
      userId: 3,
    },
    extension: "mp4",
    dimensions: {
      width: 1080,
      height: 1920,
    },
    backgroundColor: "#000000FF",
    shouldWatermark: true,
  };
  const desktopConfig = {
    layers: [
      {
        id: 0,
        trim: {
          start: 0,
        },
        type: "audio",
        audio: {
          volume: 1,
        },
        source: video.musicUrl,
        timeline: {
          start: 0,
        },
        transitions: [],
      },
      {
        id: 1,
        html: {
          page: {
            body: video.template,
            styles: video.css,
          },
          selector: "#template",
          withTailwind: true,
          withTransparentBackground: false,
        },
        size: {
          scale: 1,
          width: 2560,
          height: 1440,
          format: "fill",
        },
        trim: {
          start: 0,
        },
        type: "html",
        position: {
          x: 0,
          y: 0,
          z: 0,
          angle: 0,
          angleX: 0,
          angleY: 0,
          origin: "center",
          isRelative: false,
        },
        timeline: {
          start: 0,
        },
        transitions: [],
      },
    ],
    duration: 12,
    metadata: {
      userId: 3,
    },
    extension: "mp4",
    dimensions: {
      width: 2560,
      height: 1440,
    },
    backgroundColor: "#000000FF",
    shouldWatermark: true,
  };

  const handleInputChange = (e: any) => {
    setListingUrl(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    listingUrl.length > 0 && scrapeWithScrapingBee();
  };

  return (
    <div>
      <SettingsModal
        showModal={showModal}
        setShowModal={setShowModal}
        videoType={videoType}
        setVideoType={setVideoType}
        videoResolution={videoResolution}
        setVideoResolution={setVideoResolution}
      />

      <div>
        <div className="items-center justify-center flex flex-col my-4 mb-4 max-w-[800px] mx-auto">
          <div className="flex space-x-2 items-center justify-center">
            <AirbnbIcon />{" "}
            <p className="text-3xl font-medium -translate-y-0.5">
              ads videos generator
            </p>
          </div>
          <p className="font-light text-center">
           <span className="font-bold">Effortlessly</span> Transform Airbnb Listings into Stunning Videos, Ready to Share!
          </p>
          <div className="w-full mt-8">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center"
            >
              <input
                value={listingUrl}
                onChange={handleInputChange}
                placeholder="Airbnb listing url ..."
                type="text"
                className="border-gray-200 bg-gray-50 rounded-l-md dark:bg-black/60 dark:border-gray-700 dark:text-white py-4 outline-none focus:ring-0 w-1/2 text-sm text-gray-500 "
              />

              <button
                type="submit"
                className="py-3.5 rounded-r-md bg-[#FF5A5F] text-white hover:bg-opacity-80 duration-150  border border-[#FF5A5F] w-1/3"
              >
                {isLoading ? (
                  <p className="animate-pulse">Fetching listing data ...</p>
                ) : (
                  <div className="flex items-center space-x-3 justify-center">
                    <p>Generate your video</p> <PlayIcon />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
        {showPlayer && (
          <div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowModal(!showModal)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-md flex items-center space-x-6 text-[#FF5A5F] duration-150 mb-2"
              >
                <p>Customize</p> <SettingIcon />
              </button>
            </div>
            <div className=" flex items-center justify-center border rounded-md bg-gray-50 border-gray-100 dark:bg-transparent dark:border-transparent py-8 shadow-lg">
              <div
                className={` ${
                  videoResolution === "mobile" ? "w-[40%] h-[800px]" : "w-full"
                }  rounded-lg overflow-hidden h-[800px] duration-300 shadow-2xl`}
              >
                <Player
                  config={
                    videoResolution === "mobile" ? mobileConfig : desktopConfig
                  }
                  applicationId="demo"
                  loop={false}
                  host={"https://player.editframe.dev"}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
