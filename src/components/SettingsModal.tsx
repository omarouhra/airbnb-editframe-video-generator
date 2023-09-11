import Modal from "./core/Modal";
import { VIDEO_RESOLUTIONS, VIDEO_VARIANTS } from "../utils/contants";
import CloseIcon from "../icons/CloseIcon";

type TModal = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  videoType: string;
  setVideoType: React.Dispatch<React.SetStateAction<string>>;
  videoResolution: string;
  setVideoResolution: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsModal = ({
  setShowModal,
  showModal,
  videoType,
  setVideoType,
  videoResolution,
  setVideoResolution,
}: TModal) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="bg-white dark:bg-black/90 h-screen w-full p-4">
        <div>
          <button onClick={() => setShowModal(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6">
          <div className=" border-gray-200 rounded-md  ">
            {/* <form onSubmit={handleSubmit}>
              <div className="flex flex-col text-sm text-gray-500 dark:text-gray-300">
                <label htmlFor="" className="mb-2">
                  Listing Url
                </label>
                <input
                  value={listingUrl}
                  onChange={handleInputChange}
                  type="text"
                  className="border-gray-200 bg-gray-50 rounded-md dark:bg-black dark:border-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[#FF5A5F] text-white hover:bg-opacity-80 duration-150 flex items-center space-x-3 justify-center mt-4"
              >
                <p>Get Listing content </p> <DataIcon />
              </button>
            </form> */}

            <div>
              <div className="my-8">
                <p className="text-sm text-gray-500 mb-2 dark:text-gray-300">
                  Video Type
                </p>
                <div className="flex flex-col space-y-4">
                  {VIDEO_VARIANTS.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setVideoType(variant.key)}
                    >
                      <div
                        className={`flex items-center space-x-4 border p-4 rounded-md border-gray-200 hover:scale-[0.989] duration-150 dark:border-gray-700 ${
                          videoType === variant.key &&
                          " bg-[#FF5A5F] hover:bg-[#FF5A5F] text-white"
                        }`}
                      >
                        <variant.icon />
                        <p className="text-sm">{variant.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="my-8">
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  Video Resolution
                </p>
                <div className="flex items-center space-x-4 ">
                  {VIDEO_RESOLUTIONS.map((resolution, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setVideoResolution(resolution.key);
                      }}
                    >
                      <div
                        className={`flex  items-center space-x-4 border p-4 rounded-md border-gray-200 hover:scale-[0.989] duration-150 dark:border-gray-700  ${
                          videoResolution === resolution.key &&
                          " bg-[#FF5A5F] hover:bg-[#FF5A5F] text-white"
                        }`}
                      >
                        <resolution.icon />
                        <p className="text-sm">{resolution.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
