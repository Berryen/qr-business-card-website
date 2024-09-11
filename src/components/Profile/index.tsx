import "helpers/polyfill";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Share2,
  Mail,
  Linkedin,
  Smartphone,
  Phone,
  MapPin,
} from "react-feather";
import { ProfileInfo } from "./props";
import { fetchStrapiAPI } from "helpers/api";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { ErrorStatus } from "components/ErrorStatus";
import { ConnectPopup } from "components/ConnectPopup";
import { QrCodePopup } from "components/QRCodePopup";
import { Meta } from "components/Meta";
import ytl_logo from "assets/ytl_logo.svg";
import bg_other from "assets/bg_other.png";
import Skeleton from "react-loading-skeleton";
import { useYTLStrapiDataHook } from "core/context/YTLStrapiContext";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "helpers/media";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { localeTranslation } from "helpers/locale";
import { motion } from "framer-motion";

// ================= INTERFACES / TYPES
interface ProfileProps {
  profileData: ProfileInfo;
}

export const Profile: React.FC<ProfileProps> = ({
  profileData: profileDataProp,
}) => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const { global } = useYTLStrapiDataHook();
  const globalAttr = global?.attributes;
  const translationAttr = globalAttr?.globalTranslation;

  const getTranslation = (key: string) => {
    const translations = {
      en: translationAttr?.englishTranslation || {},
      bm: translationAttr?.bahasaMelayuTranslation || {},
      vi: translationAttr?.vietnameseTranslation || {},
    };

    const currentTranslation =
      translations[router.locale as keyof typeof translations] ||
      translations.en;

    // If translation is not found, fallback to the key
    return currentTranslation?.[key] || key;
  };

  // ================= STATE
  const [isLoading, setIsLoading] = useState(true);
  const [isSharePopupVisible, setSharePopupVisibility] = useState(false);
  const [isConnectPopupVisible, setConnectPopupVisibility] = useState(false);
  const [profileData, setProfileData] = useState<ProfileInfo | null>(null);
  console.log(profileData?.attributes.profilePhoto.data.attributes.url);

  // ================= HOOKS
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = router.locale ?? "en";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Use pathname or searchParams to extract slug
        const slugFromPathname = pathname.split("/").pop();
        const slugFromSearchParams = searchParams.get("slug");

        const slug = slugFromPathname || slugFromSearchParams;

        if (!slug) {
          throw new Error("Slug not found in pathname or searchParams");
        }
        const { data } = await fetchStrapiAPI(`/profiles/${slug}`, {
          populate: "*",
          locale: localeTranslation(locale),
        });

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [pathname, searchParams]);

  // ================= VARIABLES
  const buttonClass = clsx(
    "w-full",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-4",
    "py-3",
    "text-base",
    "sm:text-lg",
    "rounded-2xl"
  );

  // ================= EVENTS
  const handleShareClick = () => {
    setSharePopupVisibility(!isSharePopupVisible);
  };

  const handleConnectClick = () => {
    setConnectPopupVisibility(!isConnectPopupVisible);
  };

  // Function to construct and download a vCard for the displayed profile
  const saveContact = () => {
    // Check if profileToDisplay is defined
    if (profileData) {
      const formattedLocation = (profileData?.attributes.location || "")
        .replace(/\n/g, " ") // Remove newline characters
        .replace(/\s\s/g, ","); // Replace double spaces with commas
      // Construct vCard content **DO NOT INDENT**
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${profileData?.attributes.name}
N:${profileData?.attributes.name}
ORG:${profileData?.attributes.company}
TITLE:${profileData?.attributes.jobTitle}
TEL;TYPE=CELL,VOICE:${
        profileData?.attributes.mobileNumber
          ? `+${getCountryCode(
              profileData?.attributes.countryCodeMobile
            )} ${formatMalaysianPhoneNumber(
              profileData?.attributes.mobileNumber
            )}`
          : ""
      }
TEL;TYPE=WORK,VOICE:${
        profileData?.attributes.officeNumber
          ? `+${getCountryCode(
              profileData?.attributes.countryCodeOffice
            )} ${formatMalaysianPhoneNumber(
              profileData?.attributes.officeNumber
            )}`
          : ""
      }
EMAIL:${profileData?.attributes.emailId}${profileData?.attributes.domain}
ADR;TYPE=WORK:${formattedLocation};;;;
END:VCARD`;

      // Convert vCard content to Blob
      const blob = new Blob([vCardContent], { type: "text/vcard" });

      // Create data URI for the Blob
      const dataUri = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = dataUri;
      link.download = `${profileData?.attributes.name
        ?.toLowerCase()
        .replace(/\s+/g, "-")}.vcf`;

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to initiate the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
  };

  // Function to get the country code based on the country name
  const getCountryCode = (countryName: string | undefined) => {
    switch (countryName) {
      case "Malaysia (60)":
        return "60";
      case "Singapore (65)":
        return "65";
      case "Vietnam (84)":
        return "84";
      default:
        return countryName;
    }
  };

  // Function to format a Malaysian phone number
  const formatMalaysianPhoneNumber = (phoneNumber: any) => {
    const isSpecialNumber = phoneNumber.startsWith("11");
    const isLandlineNumber = phoneNumber.startsWith("3");

    let segments: number[];

    if (isSpecialNumber) {
      segments = [2, 4, 4];
    } else if (isLandlineNumber) {
      segments = [1, 4, 4];
    } else {
      segments = [2, 3, 4];
    }

    let formattedNumber = "";
    let index = 0;

    segments.forEach((segment) => {
      formattedNumber += phoneNumber.slice(index, index + segment) + " ";
      index += segment;
    });

    return formattedNumber.trim(); // Remove trailing space
  };

  const profileURL = `${process.env.NEXT_PUBLIC_STRAPI_ARI_URL}${profileData?.attributes.profilePhoto.data.attributes.url}`;
  console.log(
    `${process.env.NEXT_PUBLIC_STRAPI_ARI_URL}${profileData?.attributes.profilePhoto.data.attributes.url}`
  );

  // ================= EFFECTS
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Use pathname or searchParams to extract slug
        const slugFromPathname = pathname.split("/").pop();
        const slugFromSearchParams = searchParams.get("slug");

        const slug = slugFromPathname || slugFromSearchParams;

        if (!slug) {
          throw new Error("Slug not found in pathname or searchParams");
        }
        const { data, meta } = await fetchStrapiAPI(`/profiles/${slug}`, {
          populate: "*",
          locale: localeTranslation(locale),
        });

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [pathname, searchParams]);

  // ================= VIEWS
  return (
    <div>
      {/* Pass profileData to Meta component for setting meta information */}
      <Meta profile={profileData} />
      {/* Header */}
      {/* <div className="bg-secondary border-b border-stroke p-2.5 px-5 flex items-center justify-between fixed w-full top-0 z-10">
        <div className="flex w-full items-center justify-between">
          <div>
            <Image src={ytl_logo} alt="YTL Cement" width={48} height={48} />
          </div>
          {globalAttr?.enableLanguageSwitcher && (
            <div className="flex gap-1 text-base sm:text-lg">
              <p
                className={`text-offwhite hover:text-sky cursor-pointer ${
                  router.locale === "en" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  router.push(`/${profileData?.attributes.slug}`, undefined, {
                    locale: "en",
                  })
                }
              >
                EN
              </p>
              |
              <p
                className={`text-offwhite hover:text-sky cursor-pointer ${
                  router.locale === "bm" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  router.push(`/${profileData?.attributes.slug}`, undefined, {
                    locale: "bm",
                  })
                }
              >
                BM
              </p>
              |
              <p
                className={`text-offwhite hover:text-sky cursor-pointer ${
                  router.locale === "vi" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  router.push(`/${profileData?.attributes.slug}`, undefined, {
                    locale: "vi",
                  })
                }
              >
                VN
              </p>
            </div>
          )}
        </div>
      </div> */}
      {isLoading ? (
        <>
          {/* <div className="bg-secondary border-b border-stroke p-2.5 pl-5 flex items-center justify-between shadow-md fixed w-full top-0 z-10">
            <div className="flex items-center">
              <Image src={ytl_logo} alt="YTL Cement" width={48} height={48} />
            </div>
          </div> */}
          {/* Skeleton */}
          <div className="min-h-screen justify-center pb-10 pt-21 sm:pb-12 sm:pt-28 bg-primary bg-cover bg-center">
            <div className="relative min-height min-width max-w-screen md:max-w-xl mx-4 sm:mx-10 md:m-auto sm:p-10 bg-secondary ring-1 ring-stroke sm:shadow-lg sm:rounded-2xl">
              <Skeleton className="flex flex-col bg-primary rounded-2xl h-80" />
              <Skeleton
                count={4}
                className="flex flex-col bg-primary rounded-2xl h-14"
              />
            </div>
          </div>
        </>
      ) : profileData ? (
        <div
          className="min-h-screen justify-center pb-10 pt-21 sm:pb-12 sm:pt-28 bg-primary bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg_other.src})`,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }} // Starting state: invisible
            animate={{ opacity: 1 }} // Ending state: fully visible
            transition={{ duration: 1 }} // Duration of the fade-in effect (1 second)
          >
            <div className="relative min-h-full min-width max-w-screen md:max-w-xl mx-4 sm:mx-10 md:m-auto sm:p-10 bg-secondary ring-1 ring-stroke sm:rounded-2xl">
              <div className="flex flex-col bg-primary items-center rounded-2xl gap-5 p-7 mb-7">
                <div
                  className="absolute top-6 right-5 sm:top-16 sm:right-16 cursor-pointer"
                  onClick={handleShareClick}
                >
                  <Share2 className="w-6 h-6" color="#555557" />
                </div>
                <img
                  className="w-32 h-32 object-cover rounded-full"
                  src={profileURL}
                  alt="Contact Avatar"
                  width={150}
                  height={150}
                />
                <div className="w-full">
                  <div className="flex flex-col items-center gap-2 pb-1">
                    <h1 className="text-lg sm:text-2xl font-medium text-offwhite">
                      {profileData?.attributes.name}
                    </h1>
                    <p className="text-base sm:text-lg text-offwhite">
                      {profileData?.attributes.jobTitle}
                    </p>
                    <p className="text-base sm:text-lg text-offwhite">
                      {profileData?.attributes.company}
                    </p>
                  </div>
                  <div className="w-full flex gap-5 pt-5">
                    <button
                      className={`bg-primarybutton ring-1 ring-stroke text-offwhite ex1 ${buttonClass}`}
                      onClick={saveContact}
                    >
                      Save Contact
                    </button>
                    <button
                      className={`bg-secondary ring-1 ring-stroke text-offwhite ex2  ${buttonClass}`}
                      onClick={handleConnectClick}
                    >
                      Connect
                    </button>

                    {isConnectPopupVisible && (
                      <ConnectPopup
                        onClose={handleConnectClick}
                        profile={profileData}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Popup */}
              {isSharePopupVisible && (
                <QrCodePopup
                  onClose={handleShareClick}
                  profileName={profileData?.attributes?.name}
                />
              )}
              {profileData?.attributes.about && (
                <>
                  <div className="flex flex-col mx-3 mb-7">
                    <h2 className="text-xl sm:text-2xl mb-2 text-offwhite">
                      {getTranslation("About")}
                    </h2>
                    <p className="text-base sm:text-lg text-offwhite">
                      {profileData?.attributes.about}
                    </p>
                  </div>
                </>
              )}
              <div className="flex flex-col mx-3 divide-y divide-stroke">
                <div className="inline-flex">
                  <div className="pl-2 pr-4 self-center">
                    <Mail className="w-6 h-6" color="#555557" />
                  </div>
                  <div className="text-base sm:text-lg text-offwhite py-4 truncate">
                    {profileData?.attributes.emailId}
                    {profileData?.attributes.domain}
                  </div>
                </div>
                {profileData?.attributes.mobileNumber &&
                  profileData?.attributes.countryCodeMobile && (
                    <div className="inline-flex">
                      <div className="pl-2 pr-4 self-center">
                        <Smartphone className="w-6 h-6" color="#555557" />
                      </div>
                      <div className="text-base sm:text-lg text-offwhite py-4 truncate">
                        {profileData?.attributes.mobileNumber
                          ? `(${getCountryCode(
                              profileData?.attributes.countryCodeMobile
                            )}) ${formatMalaysianPhoneNumber(
                              profileData?.attributes.mobileNumber
                            )}`
                          : ""}
                      </div>
                    </div>
                  )}
                {profileData?.attributes.officeNumber &&
                  profileData?.attributes.countryCodeOffice && (
                    <div className="inline-flex">
                      <div className="pl-2 pr-4 self-center">
                        <Phone className="w-6 h-6" color="#555557" />
                      </div>
                      <div className="text-base sm:text-lg text-offwhite py-4 truncate">
                        {profileData?.attributes.officeNumber
                          ? `(${getCountryCode(
                              profileData?.attributes.countryCodeOffice
                            )}) ${formatMalaysianPhoneNumber(
                              profileData?.attributes.officeNumber
                            )}${
                              profileData?.attributes.extensionNumber
                                ? ` ext ${profileData?.attributes.extensionNumber}`
                                : ""
                            }`
                          : ""}
                      </div>
                    </div>
                  )}
                {profileData?.attributes.linkedIn && (
                  <div className="inline-flex">
                    <div className="pl-2 pr-4 pt-3 self-start">
                      <Linkedin className="w-6 h-6" color="#555557" />
                    </div>
                    <div className="text-base sm:text-lg text-offwhite py-4">
                      {profileData?.attributes.linkedIn.replace(
                        /^https?:\/\//,
                        ""
                      )}
                    </div>
                  </div>
                )}
                <div className="inline-flex">
                  <div className="pl-2 pr-4 pt-4 self-start">
                    <MapPin className="w-6 h-6" color="#555557" />
                  </div>
                  <div className="text-base sm:text-lg text-offwhite py-4">
                    <ReactMarkdown>
                      {profileData?.attributes.location}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        // <></>
        <ErrorStatus />
      )}
      {/* Footer */}
      <div className="bg-stroke p-1"></div>
    </div>
  );
};
export default Profile;
